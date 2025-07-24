import { Assets } from "@/assets";

import ERC20Abi from "./ERC20.abi.json";
import BltSaleContractAbi from "./BltSaleContract.abi.json";
import BltVestingContractAbi from "./BltVestingContract.abi.json";

export const TooltipPosition = {
    Top: "Top",
    Bottom: "Bottom"
};

export const PaymentMethods = {
    ETH: {
        "name": "ETH",
        "icon": Assets.ethIcon
    },
    USDC: {
        "name": "USDC",
        "icon": Assets.usdcIcon
    },
    USDT: {
        "name": "USDT",
        "icon": Assets.usdtIcon
    },
    // FIAT: {
    //     "name": "FIAT",
    //     "icon": Assets.moonpayIcon
    // }
};

export const MAX_BLT_TOKENS = 1 * 1000 * 1000;
export const MIN_BLT_TOKENS = 100;
export const MAX_SLIPPAGE = 0.05;

export const Contracts = {
    TOKEN: {
        address: import.meta.env.VITE_BLT_TOKEN,
        abi: ERC20Abi
    },
    SALE: {
        address: import.meta.env.VITE_SALE_CONTRACT,
        abi: BltSaleContractAbi
    },
    VESTING: {
        address: import.meta.env.VITE_BLT_VESTING_CONTRACT,
        abi: BltVestingContractAbi
    },
    USDT: {
        address: import.meta.env.VITE_USDT_CONTRACT,
        abi: ERC20Abi
    },
    USDC: {
        address: import.meta.env.VITE_USDC_CONTRACT,
        abi: ERC20Abi
    }
};

export const SaleStatus = {
    NOT_STARTED: "not-started",
    STARTED: "started",
    IN_PROGRESS: "in-progress",
    ENDED: "ended",
};

export const PurchaseStatus = {
    IDLE: "idle",
    SUCCESS: "success",
    APPROVING: "approving",
    APPROVED: "approved",
    RESETTING: "resetting",
    RESET_APPROVAL: "reset-approval",
    PURCHASING: "purchasing",
};