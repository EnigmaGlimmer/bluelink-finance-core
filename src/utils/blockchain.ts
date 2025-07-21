import {
    formatUnits,
    parseUnits,
    createPublicClient,
    http,
    type Address,
    type Hex,
    type Chain
} from "viem";
import { sepolia, mainnet } from 'wagmi/chains';
import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import {
    readContract,
    writeContract,
    simulateContract,
    waitForTransactionReceipt,
    getPublicClient
} from "wagmi/actions";

import { Contracts, PurchaseStatus } from "@/utils/constants";
import { handleBuyOperation, withErrorHandling } from "@/utils/errorHandler";
import Logger from "@/utils/Logger";

// RainbowKit config
export const config = getDefaultConfig({
    appName: "SafeHaven Exchange",
    projectId: import.meta.env.VITE_PROJECT_ID || "9dc0750c4b599b1dd9aeb9413bc76f94",
    chains: [import.meta.env.VITE_CHAIN_ID === "sepolia" ? sepolia : mainnet],
});

// Public client
const publicClient = createPublicClient({
    chain: sepolia,
    transport: http()
});

export const withdrawFunds = async (): Promise<Hex> => {
    const { request } = await simulateContract(config, {
        address: Contracts.SALE.address,
        abi: Contracts.SALE.abi,
        functionName: "withdrawFunds"
    });
    return writeContract(config, request);
};

export const getTokenAmountForUsd = async (usdtAmount: number): Promise<string> => {
    const price = await readContract(config, {
        address: Contracts.SALE.address,
        abi: Contracts.SALE.abi,
        functionName: "getBltFromUsd",
        args: [parseUnits(usdtAmount.toString(), 6)]
    });
    return formatUnits(price as bigint, 18);
};

export const getTokenAmountForEth = async (ethAmount: number): Promise<string> => {
    const price = await readContract(config, {
        address: Contracts.SALE.address,
        abi: Contracts.SALE.abi,
        functionName: "getBltFromEth",
        args: [parseUnits(ethAmount.toString(), 18)]
    });
    return formatUnits(price as bigint, 18);
};

export const buyWithUSDT = handleBuyOperation(async (
    usdtAmount: number,
    minBltAmount: number,
    onStateChange?: (status: (typeof PurchaseStatus)[keyof typeof PurchaseStatus]) => void,
    userAddress?: Address
): Promise<Hex> => {
    const amountInUsdt = parseUnits(usdtAmount.toString(), 6);
    const bltAmount = parseUnits(minBltAmount.toString(), 18);

    await approvePaymentToken(Contracts.USDT.address, Contracts.SALE.address, amountInUsdt, onStateChange, userAddress!);

    onStateChange?.(PurchaseStatus.PURCHASING);
    const { request } = await simulateContract(config, {
        address: Contracts.SALE.address,
        abi: Contracts.SALE.abi,
        functionName: "buyWithUSDT",
        args: [amountInUsdt, bltAmount]
    });

    return writeContract(config, request);
});

export const buyWithUSDC = handleBuyOperation(async (
    usdcAmount: number,
    minBltAmount: number,
    onStateChange?: (status: (typeof PurchaseStatus)[keyof typeof PurchaseStatus]) => void,
    userAddress?: Address
): Promise<Hex> => {
    const amountInUsdc = parseUnits(usdcAmount.toString(), 6);
    const bltAmount = parseUnits(minBltAmount.toString(), 18);

    onStateChange?.(PurchaseStatus.APPROVING);
    await approvePaymentToken(Contracts.USDC.address, Contracts.SALE.address, amountInUsdc, onStateChange, userAddress!);

    onStateChange?.(PurchaseStatus.APPROVED);
    onStateChange?.(PurchaseStatus.PURCHASING);

    const { request } = await simulateContract(config, {
        address: Contracts.SALE.address,
        abi: Contracts.SALE.abi,
        functionName: "buyWithUSDC",
        args: [amountInUsdc, bltAmount]
    });

    return writeContract(config, request);
});

export const buyWithETH = handleBuyOperation(async (
    ethAmount: number,
    minBltAmount: number,
    onStateChange?: (status: (typeof PurchaseStatus)[keyof typeof PurchaseStatus]) => void
): Promise<Hex> => {
    onStateChange?.(PurchaseStatus.PURCHASING);
    const amountInEth = parseUnits(ethAmount.toString(), 18);
    const bltAmount = parseUnits(minBltAmount.toString(), 18);

    const { request } = await simulateContract(config, {
        address: Contracts.SALE.address,
        abi: Contracts.SALE.abi,
        functionName: "buyWithETH",
        value: amountInEth,
        args: [bltAmount]
    });

    return writeContract(config, request);
});

export const approvePaymentToken = async (
    tokenAddress: Address,
    spenderAddress: Address,
    amount: bigint,
    onStateChange?: (status: (typeof PurchaseStatus)[keyof typeof PurchaseStatus]) => void,
    userAddress?: Address
): Promise<Hex | void> => {
    onStateChange?.(PurchaseStatus.APPROVING);

    const currentAllowance = await getStableCoinAllowance(tokenAddress, userAddress!);
    if (currentAllowance >= amount) return;

    if (currentAllowance > 0n) {
        await resetAllowance(tokenAddress, spenderAddress, onStateChange, userAddress!);
    }

    const hash = await writeContract(config, {
        address: tokenAddress,
        abi: Contracts.TOKEN.abi,
        functionName: "approve",
        args: [spenderAddress, amount],
        chain: sepolia, // or your chain variable
        account: userAddress, // or the correct account variable
    });

    onStateChange?.(PurchaseStatus.APPROVED);
    await waitForTransactionReceipt(config, { hash });

    return hash;
};

export const resetAllowance = async (
    tokenAddress: Address,
    spenderAddress: Address,
    onStateChange?: (status: (typeof PurchaseStatus)[keyof typeof PurchaseStatus]) => void,
    userAddress?: Address
): Promise<Hex> => {
    onStateChange?.(PurchaseStatus.RESET_APPROVAL);

    const hash = await writeContract(config, {
        address: tokenAddress,
        abi: Contracts.TOKEN.abi,
        functionName: "approve",
        args: [spenderAddress, 0n],
        chain: sepolia, // or your chain variable
        account: userAddress, // pass the correct user address
    });

    onStateChange?.(PurchaseStatus.RESETTING);
    await waitForTransactionReceipt(config, { hash });

    return hash;
};

export const getStableCoinAllowance = async (
    tokenAddress: Address,
    userAddress: Address
): Promise<bigint> => {
    return await readContract(config, {
        address: tokenAddress,
        abi: Contracts.TOKEN.abi,
        functionName: "allowance",
        args: [userAddress, Contracts.SALE.address]
    }) as bigint;
};

export const getTokenPrice = async (amount: number): Promise<string> => {
    const price = await readContract(config, {
        address: Contracts.SALE.address,
        abi: Contracts.SALE.abi,
        functionName: "getTokenPrice",
        args: [parseUnits(amount.toString(), 18)]
    });
    return formatUnits(price as bigint, 6);
};

export const getTotalTokensSold = async (): Promise<string> => {
    const result = await readContract(config, {
        address: Contracts.SALE.address,
        abi: Contracts.SALE.abi,
        functionName: "totalTokensSold"
    });
    return formatUnits(result as bigint, 18);
};

export const getTotalFundsRaised = async (): Promise<string> => {
    const result = await readContract(config, {
        address: Contracts.SALE.address,
        abi: Contracts.SALE.abi,
        functionName: "totalFundsRaised"
    });
    return formatUnits(result as bigint, 6);
};

export const getInitialTokenAmount = async (): Promise<string> => {
    const result = await readContract(config, {
        address: Contracts.SALE.address,
        abi: Contracts.SALE.abi,
        functionName: "getInitialTokenAmount"
    });
    return formatUnits(result as bigint, 0);
};

export const getNumberOfTokenHolders = async (): Promise<string> => {
    const result = await readContract(config, {
        address: Contracts.SALE.address,
        abi: Contracts.SALE.abi,
        functionName: "numberOfHolders"
    });
    return formatUnits(result as bigint, 0);
};

export const getSaleStartTime = async (): Promise<number> => {
    const result = await readContract(config, {
        address: Contracts.SALE.address,
        abi: Contracts.SALE.abi,
        functionName: "saleStartTime"
    });

    console.log(result);

    return Number(result);
};

export const getSaleEndTime = async (): Promise<number> => {
    const result = await readContract(config, {
        address: Contracts.SALE.address,
        abi: Contracts.SALE.abi,
        functionName: "saleEndTime"
    });
    
    console.log(result);

    return Number(result);
};

// export const getInvestorInfo = withErrorHandling(async (
//     address: Address
// ): Promise<any> => {
//     return readContract(config, {
//         address: Contracts.VESTING.address,
//         abi: Contracts.VESTING.abi,
//         functionName: "getInvestorInfo",
//         args: [address]
//     });
// });

export const getVestingDetails = withErrorHandling(async (
    address: Address
): Promise<any> => {
    return readContract(config, {
        address: Contracts.VESTING.address,
        abi: Contracts.VESTING.abi,
        functionName: "getVestingDetails",
        args: [address]
    });
});
