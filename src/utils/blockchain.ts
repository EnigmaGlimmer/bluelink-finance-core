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
import { getLogs } from "viem/actions";

import { Contracts, PurchaseStatus } from "@/utils/constants";
import { handleBuyOperation, withErrorHandling } from "@/utils/errorHandler";
import Logger from "@/utils/Logger";

// RainbowKit config
export const config = getDefaultConfig({
    appName: "Bluelink Blockchain",
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

    return Number(result);
};

export const getSaleEndTime = async (): Promise<number> => {
    const result = await readContract(config, {
        address: Contracts.SALE.address,
        abi: Contracts.SALE.abi,
        functionName: "saleEndTime"
    });

    return Number(result);
};

export const getInvestorInfo = withErrorHandling(async (
    address: Address
): Promise<any> => {
    return readContract(config, {
        address: Contracts.VESTING.address,
        abi: Contracts.VESTING.abi,
        functionName: "getInvestorInfo",
        args: [address]
    });
});

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

export const releaseTokens = withErrorHandling(async (address: Address, userAddress?: Address): Promise<any> => {
    const hash = await writeContract(config, {
        address: Contracts.VESTING.address,
        abi: Contracts.VESTING.abi,
        functionName: "releaseTokens",
        args: [address],
        chain: sepolia, // or your chain variable
        account: userAddress, // pass the correct user address
    });

    return hash;
});

interface VestingSchedule {
    totalAmount: bigint;
    releasedAmount: bigint;
    start: bigint;
    cliff: bigint;
    duration: bigint;
}

interface VestingStatus {
    totalAmount: number;
    totalUnlocked: number;
    totalClaimed: number;
    availableToClaim: number;
    unlockStatus: "No Vesting" | "Fully Locked" | "Partially Unlocked" | "Fully Unlocked";
    startDate: Date | null;
    cliffTime: Date | null;
    endDate: Date | null;
    duration: number; // in months
    monthlyUnlock: number;
    progressPercentage: number;
}

export const calculateVestingStatus = (vestingSchedules: VestingSchedule[] = []): VestingStatus => {
    if (!vestingSchedules || vestingSchedules.length === 0) {
        return {
            totalAmount: 0,
            totalUnlocked: 0,
            totalClaimed: 0,
            availableToClaim: 0,
            unlockStatus: "No Vesting",
            startDate: null,
            cliffTime: null,
            endDate: null,
            duration: 0,
            monthlyUnlock: 0,
            progressPercentage: 0
        };
    }

    const currentTime = Math.floor(Date.now() / 1000);
    let totalAmount = 0;
    let totalUnlocked = 0;
    let totalClaimed = 0;
    let availableToClaim = 0;

    let earliestCliffTime = Infinity;
    let latestEndTime = 0;
    let earliestStartTime = Infinity;

    vestingSchedules.forEach(schedule => {
        const { totalAmount: amount, releasedAmount, start, cliff, duration } = schedule;

        totalAmount += Number(formatUnits(amount, 18));
        totalClaimed += Number(formatUnits(releasedAmount, 18));

        const startTime = Number(start);
        const cliffTime = Number(cliff);
        const endTime = cliffTime + Number(duration);

        earliestStartTime = Math.min(earliestStartTime, startTime);
        earliestCliffTime = Math.min(earliestCliffTime, cliffTime);
        latestEndTime = Math.max(latestEndTime, endTime);

        if (currentTime >= cliffTime) {
            const cliffDay = Math.floor(cliffTime / 86400);
            const currentDay = Math.floor(currentTime / 86400);
            const totalDays = Math.floor(Number(duration) / 86400);
            let elapsedDays = currentDay - cliffDay;

            if (elapsedDays > totalDays) elapsedDays = totalDays;

            const vested = (Number(formatUnits(amount, 18)) * elapsedDays) / totalDays;
            totalUnlocked += vested;
        }
    });

    availableToClaim = Math.max(0, totalUnlocked - totalClaimed);

    let unlockStatus: VestingStatus["unlockStatus"] = "Fully Locked";
    if (totalAmount === 0) {
        unlockStatus = "No Vesting";
    } else if (totalUnlocked > 0 && totalUnlocked < totalAmount) {
        unlockStatus = "Partially Unlocked";
    } else if (totalUnlocked >= totalAmount) {
        unlockStatus = "Fully Unlocked";
    }

    const startDate = earliestStartTime !== Infinity ? new Date(earliestStartTime * 1000) : null;
    const endDate = latestEndTime > 0 ? new Date(latestEndTime * 1000) : null;
    const cliffDate = earliestCliffTime !== Infinity ? new Date(earliestCliffTime * 1000) : null;

    const duration =
        earliestCliffTime !== Infinity && latestEndTime > 0
            ? (latestEndTime - earliestCliffTime) / (30 * 24 * 60 * 60)
            : 0;

    const monthlyUnlock = duration > 0.01 ? 100 / duration : 100;
    const progressPercentage = totalAmount > 0 ? (totalUnlocked / totalAmount) * 100 : 0;

    return {
        totalAmount,
        totalUnlocked,
        totalClaimed,
        availableToClaim,
        unlockStatus,
        startDate,
        cliffTime: cliffDate,
        endDate,
        duration,
        monthlyUnlock,
        progressPercentage
    };
};

interface TransferLog {
    transactionHash: string;
    blockNumber: bigint;
    args: {
        from: string;
        to: string;
        value: bigint;
    };
}

interface BLTTransaction {
    hash: string;
    from: string;
    to: string;
    amount: string;
    type: 'Received' | 'Sent';
    timestamp: number;
    date: string;
    blockNumber: bigint;
}

// Define the function with type-safe parameters
export const getBLTTransactionHistory = withErrorHandling(
    async (address: string, fromBlock: bigint = 8620077n): Promise<BLTTransaction[]> => {
        const currentBlock = await publicClient.getBlockNumber();

        const transferLogs: TransferLog[] = [];
        let fromBlockNumber = fromBlock;

        while (fromBlockNumber < currentBlock) {
            const logs = await publicClient.getLogs({
                address: Contracts.TOKEN.address,
                event: {
                    type: 'event',
                    name: 'Transfer',
                    inputs: [
                        { type: 'address', name: 'from', indexed: true },
                        { type: 'address', name: 'to', indexed: true },
                        { type: 'uint256', name: 'value', indexed: false }
                    ]
                },
                args: {
                    to: address as `0x${string}`
                },
                fromBlock: fromBlockNumber,
                toBlock: fromBlockNumber + 10000n
            });

            transferLogs.push(...(logs as TransferLog[]));
            fromBlockNumber += 10000n;
        }

        const transactions: BLTTransaction[] = await Promise.all(
            transferLogs.map(async (log) => {
                const { from, to, value } = log.args;
                const amount = formatUnits(value, 18);
                const isIncoming = to.toLowerCase() === address.toLowerCase();

                let timestamp = Date.now();
                try {
                    const block = await publicClient.getBlock({ blockNumber: log.blockNumber });
                    timestamp = Number(block.timestamp) * 1000;
                } catch (error) {
                    Logger.error("Error getting block timestamp:", error);
                }

                return {
                    hash: log.transactionHash,
                    from,
                    to,
                    amount: `${Number(amount).toLocaleString()} BLT`,
                    type: isIncoming ? "Received" : "Sent",
                    timestamp,
                    date: new Date(timestamp).toLocaleDateString(),
                    blockNumber: log.blockNumber
                };
            })
        );

        return transactions.sort((a, b) => b.timestamp - a.timestamp);
    }
);