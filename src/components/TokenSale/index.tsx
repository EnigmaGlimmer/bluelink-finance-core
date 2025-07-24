import { useState, useEffect } from "react";
import { useAccount, usePublicClient, useBalance } from "wagmi";
import useDebounce from "@/hooks/useDebounce";

import PriceCard from "./PriceCard";
import StatisticCard from "./StatisticCard";
import TimeBar from "./TimeBar";
import Progress from "./Progress";
import {
    getTokenAmountForEth,
    getTokenAmountForUsd,
    buyWithETH,
    buyWithUSDT,
    buyWithUSDC,
    getSaleStartTime,
    getSaleEndTime
} from "@/utils/blockchain";
import { Assets } from "@/assets";
import Logger from "@/utils/Logger";
import { useTokenSale } from "@/store/tokenSale";
import { useModal } from "@/store/modalContext";
import { getErrorMessage } from "@/utils/errorHandler";
import { Contracts, PurchaseStatus, MAX_SLIPPAGE } from "@/utils/constants";
import { formatNumber, formatNumberWithSuffix } from "@/utils/formatNumber";
import { MAX_BLT_TOKENS, PaymentMethods, SaleStatus, MIN_BLT_TOKENS } from "@/utils/constants";

import "@/assets/css/home/tokensale.css";

const TokenSale = () => {
    const { address } = useAccount();
    const publicClient = usePublicClient();
    const {
        totalSold,
        initialAmount,
        totalFunds,
        holders,
        tokenPrice,
        getPriceForAmount,
        triggerRefresh
    } = useTokenSale();

    const {
        openPurchaseModal,
        closePurchaseModal,
        updatePurchaseStatus,
    } = useModal();

    // Get user balances for different payment methods
    const { data: ethBalance } = useBalance({
        address: address,
    });

    const { data: usdtBalance } = useBalance({
        address: address,
        token: Contracts.USDT.address,
    });

    const { data: usdcBalance } = useBalance({
        address: address,
        token: Contracts.USDC.address,
    });

    const [payMethod, setPayMethod] = useState(PaymentMethods.ETH.name);
    const [inputValue, setInputValue] = useState("");
    const [estimatedAmount, setEstimatedAmount] = useState(0);
    const [error, setError] = useState("");
    const [rawError, setRawError] = useState("");
    const [showRawError, setShowRawError] = useState(false);
    const [nextPrice, setNextPrice] = useState(tokenPrice);

    // Debounce the input value to reduce API calls
    const debouncedInputValue = useDebounce(inputValue, 300);

    const [currentTime, setCurrentTime] = useState(Math.floor(Date.now() / 1000));
    const [startTime, setStartTime] = useState(0);
    const [endTime, setEndTime] = useState(0);
    const [saleStatus, setSaleStatus] = useState(SaleStatus.NOT_STARTED);
    const [isCalculatingMax, setIsCalculatingMax] = useState(false);

    const soldOut = Number(totalSold) > 0 ? Number(totalSold) / Number(initialAmount) * 100 : 0;

    useEffect(() => {
        setNextPrice(tokenPrice);
    }, [tokenPrice]);

    useEffect(() => {
        const fetchSaleTimes = async () => {
            try {
                const [start, end] = await Promise.all([
                    getSaleStartTime(),
                    getSaleEndTime()
                ]);
                setStartTime(start);
                setEndTime(end);
            } catch (err) {
                Logger.error("Error fetching sale times:", err);
                // Set default values on error
                setStartTime(0);
                setEndTime(0);
            }
        };

        fetchSaleTimes();
    }, []);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(Math.floor(Date.now() / 1000));
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        if (startTime < 1) {
            setSaleStatus(SaleStatus.NOT_STARTED);
        } else if (currentTime < startTime) {
            setSaleStatus(SaleStatus.STARTED);
        } else if (currentTime >= startTime && currentTime <= endTime) {
            setSaleStatus(SaleStatus.IN_PROGRESS);
        } else {
            setSaleStatus(SaleStatus.ENDED);
        }
    }, [currentTime, startTime, endTime]);

    // Trigger estimation when debounced input value changes
    useEffect(() => {
        if (debouncedInputValue) {
            const cleaned = debouncedInputValue.replace(/[\,\s]/g, "");
            estimateAmount(cleaned, payMethod);
        } else {
            setEstimatedAmount(0);
            setError("");
            setRawError("");
            setShowRawError(false);
        }
    }, [debouncedInputValue, payMethod]);

    useEffect(() => {
        const inputAmount = parseFloat(inputValue.replace(/[\,\s]/g, ""));
        // Check if input value exceeds available balance
        let availableBalance = 0;
        switch (payMethod) {
            case PaymentMethods.ETH.name:
                availableBalance = ethBalance ? Number(ethBalance.formatted) : 0;
                break;
            case PaymentMethods.USDT.name:
                availableBalance = usdtBalance ? Number(usdtBalance.formatted) : 0;
                break;
            case PaymentMethods.USDC.name:
                availableBalance = usdcBalance ? Number(usdcBalance.formatted) : 0;
                break;
            default:
                availableBalance = 0;
        }

        if (isNaN(inputAmount)) {
            setError("");
            setRawError("");
            setShowRawError(false);
            setEstimatedAmount(0);
        } else if (inputAmount > availableBalance) {
            setError(`Insufficient ${payMethod} balance. Available: ${availableBalance.toFixed(payMethod === PaymentMethods.ETH.name ? 4 : 2)} ${payMethod}`);
            setRawError("");
            setShowRawError(false);
        } else if (estimatedAmount > MAX_BLT_TOKENS) {
            setError(`Maximum ${MAX_BLT_TOKENS.toLocaleString()} BLT tokens per transaction`);
            setRawError("");
            setShowRawError(false);
        } else if (estimatedAmount < MIN_BLT_TOKENS) {
            setError(`Minimum ${MIN_BLT_TOKENS.toLocaleString()} BLT tokens per transaction`);
            setRawError("");
            setShowRawError(false);
        } else {
            setError("");
            setRawError("");
            setShowRawError(false);
        }
    }, [estimatedAmount]);

    const cleanInputValue = (value) => {
        let cleaned = value.replace(/[^0-9.]/g, "");
        if (cleaned.startsWith("0") && cleaned.length > 1) {
            if (cleaned[1] === ".") return cleaned;
            cleaned = cleaned.replace(/^0+/, "") || "0";
        }
        const parts = cleaned.split(".");
        if (parts.length > 2) cleaned = parts[0] + "." + parts.slice(1).join("");
        return cleaned;
    };

    const estimateAmount = async (value, method) => {
        if (!value || isNaN(value)) return setEstimatedAmount(0);

        try {
            let amount;
            switch (method) {
                case PaymentMethods.ETH.name:
                    amount = await getTokenAmountForEth(value);
                    break;
                case PaymentMethods.USDT.name:
                    amount = await getTokenAmountForUsd(value);
                    break;
                case PaymentMethods.USDC.name:
                    amount = await getTokenAmountForUsd(value);
                    break;
                default:
                    amount = "0";
            }
            setError("");
            setRawError("");
            setShowRawError(false);

            setEstimatedAmount(amount);
            const _nextPrice = await getPriceForAmount(amount);
            setNextPrice(_nextPrice);
        } catch (err) {
            Logger.error("Error estimating amount:", err);
            setError(getErrorMessage(err));
            setRawError("");
            setShowRawError(false);
        }
    };

    const handleEthClick = () => {
        setPayMethod(PaymentMethods.ETH.name);
        setInputValue("");
        setEstimatedAmount(0);
    };

    const handleUsdtClick = () => {
        setPayMethod(PaymentMethods.USDT.name);
        setInputValue("");
        setEstimatedAmount(0);
    };

    const handleUsdcClick = () => {
        setPayMethod(PaymentMethods.USDC.name);
        setInputValue("");
        setEstimatedAmount(0);
    };

    const handleMaxClick = async () => {
        if (!address) {
            setError("Please connect your wallet first");
            setRawError("");
            setShowRawError(false);

            return;
        }

        if (isCalculatingMax) return; // Prevent multiple clicks

        setIsCalculatingMax(true);

        try {
            let maxAmount = 0;
            let balance = 0;

            switch (payMethod) {
                case PaymentMethods.ETH.name:
                    balance = ethBalance ? Number(ethBalance.formatted) : 0;
                    // Reserve some ETH for gas fees (0.001 ETH)
                    maxAmount = Math.max(0, balance - 0.001);
                    break;
                case PaymentMethods.USDT.name:
                    balance = usdtBalance ? Number(usdtBalance.formatted) : 0;
                    maxAmount = balance;
                    break;
                case PaymentMethods.USDC.name:
                    balance = usdcBalance ? Number(usdcBalance.formatted) : 0;
                    maxAmount = balance;
                    break;
                default:
                    maxAmount = 0;
            }

            if (maxAmount <= 0) {
                setError(`Insufficient ${payMethod} balance`);
                setRawError("");
                setShowRawError(false);

                return;
            }

            // Calculate how many BLT tokens this amount would give
            let estimatedTokens = 0;
            try {
                if (payMethod === PaymentMethods.ETH.name) {
                    estimatedTokens = Number(await getTokenAmountForEth(maxAmount));
                } else {
                    estimatedTokens = Number(await getTokenAmountForUsd(maxAmount));
                }
            } catch (err) {
                Logger.error("Error estimating tokens for max amount:", err);
                setError("Error calculating maximum amount");
                setRawError("");
                setShowRawError(false);

                return;
            }

            // If estimated tokens exceed MAX_BLT_TOKENS, calculate the reverse
            if (Number(estimatedTokens) > MAX_BLT_TOKENS) {
                // Calculate the payment amount needed for MAX_BLT_TOKENS
                // balance * price = estimatedTokens
                // maxAmount = MAX_BLT_TOKENS / price
                let price = estimatedTokens / balance;
                maxAmount = MAX_BLT_TOKENS / price;
                setEstimatedAmount(MAX_BLT_TOKENS);
            } else {
                setEstimatedAmount(estimatedTokens);
            }

            // Set the max amount in the input
            const formattedMaxAmount = formatNumber(maxAmount.toString());
            setInputValue(formattedMaxAmount);
        } catch (err) {
            Logger.error("Error calculating max amount:", err);
            setError(getErrorMessage(err));
            setRawError("");
            setShowRawError(false);

        } finally {
            setIsCalculatingMax(false);
        }
    };

    const handleAmountChange = (e) => {
        const cleaned = cleanInputValue(e.target.value);
        setInputValue(formatNumber(cleaned));
    };

    const handlePurchase = async () => {
        if (!address) {
            setError("Please connect your wallet first");
            setRawError("");
            setShowRawError(false);
            return;
        }

        const value = parseFloat(inputValue.replace(/[\,\s]/g, ""));
        if (isNaN(value)) {
            setError("Please enter a valid amount");
            setRawError("");
            setShowRawError(false);
            return;
        }

        try {
            setError("");
            setRawError("");
            setShowRawError(false);
            openPurchaseModal(payMethod);
            let txHash;

            switch (payMethod) {
                case PaymentMethods.ETH.name:
                    txHash = await buyWithETH(value, estimatedAmount * (1 - MAX_SLIPPAGE), (state) => updatePurchaseStatus(state), address);
                    break;
                case PaymentMethods.USDT.name:
                    txHash = await buyWithUSDT(value, estimatedAmount * (1 - MAX_SLIPPAGE), (state) => updatePurchaseStatus(state), address);
                    break;
                case PaymentMethods.USDC.name:
                    txHash = await buyWithUSDC(value, estimatedAmount * (1 - MAX_SLIPPAGE), (state) => updatePurchaseStatus(state), address);
                    break;
                default:
                    throw new Error("Invalid payment method");
            }

            // Transaction was successful if we got a hash
            if (!txHash) {
                throw new Error("Transaction failed - no transaction hash received");
            }

            // Wait for transaction to be mined and check status
            const receipt = await publicClient.waitForTransactionReceipt({ hash: txHash });
            if (receipt.status === "reverted") {
                throw new Error("Transaction reverted with custom error");
            }

            setInputValue("");
            setEstimatedAmount(0);
            triggerRefresh();
            setError("");
            setRawError("");
            setShowRawError(false);
            updatePurchaseStatus(PurchaseStatus.SUCCESS);

        } catch (err) {
            Logger.error("Purchase error:", err);
            setError(getErrorMessage(err));
            setRawError(err?.originalError?.message || err?.originalError?.toString() || "Unknown error");
            updatePurchaseStatus(PurchaseStatus.IDLE);
            closePurchaseModal();
        }
    };

    const handleErrorClick = () => {
        if (rawError) {
            setShowRawError(!showRawError);
        }
    };

    const isButtonDisabled = () => {
        if (!saleStatus || saleStatus !== SaleStatus.IN_PROGRESS) return true;
        if (!inputValue || parseFloat(inputValue) <= 0) return true;
        if (estimatedAmount > MAX_BLT_TOKENS) return true;
        if (estimatedAmount < MIN_BLT_TOKENS) return true;

        // Check if input value exceeds available balance
        const inputAmount = parseFloat(inputValue.replace(/[\,\s]/g, ""));
        if (isNaN(inputAmount)) return true;

        let availableBalance = 0;
        switch (payMethod) {
            case PaymentMethods.ETH.name:
                availableBalance = ethBalance ? Number(ethBalance.formatted) : 0;
                break;
            case PaymentMethods.USDT.name:
                availableBalance = usdtBalance ? Number(usdtBalance.formatted) : 0;
                break;
            case PaymentMethods.USDC.name:
                availableBalance = usdcBalance ? Number(usdcBalance.formatted) : 0;
                break;
            default:
                availableBalance = 0;
        }

        if (inputAmount > availableBalance) return true;

        return false;
    };

    return (
        <div className="sale-wrapper">
            <div className="sale-form">
                <div className="price-cards">
                    <PriceCard label="Current Price" price={tokenPrice} />
                    <PriceCard label="Next Price" price={nextPrice} />
                </div>

                {/* <p className="text-base text-sky-950 font-semibold max-lg:text-sm max-md:text-xs">
                        Raised: <span className="font-semibold text-primary-400">${formatNumber(Number(totalFunds).toFixed(3))}</span>
                    </p>

                    <div className="flex flex-col gap-1">
                        <Progress value={soldOut} />
                        <div className="between-center text-sm text-sky-950 font-medium max-lg:text-xs max-[425px]:text-[10px]">
                            <p>Token Sold: <span className="text-primary-400">{formatNumberWithSuffix(Number(totalSold))}</span></p>
                            <p>Remaining: <span className="text-primary-400">{formatNumberWithSuffix(Number(initialAmount) - Number(totalSold))}</span></p>
                        </div>
                    </div> */}

                <div className="flex flex-col gap-4 max-md:gap-2">
                    <div className="payment-methods">
                        <button className="payment-button" onClick={handleEthClick}>
                            <img src={PaymentMethods.ETH.icon} alt={PaymentMethods.ETH.name} /> {PaymentMethods.ETH.name}
                        </button>
                        <button className="payment-button" onClick={handleUsdtClick}>
                            <img src={PaymentMethods.USDT.icon} alt={PaymentMethods.USDT.name} /> {PaymentMethods.USDT.name}
                        </button>
                        <button className="payment-button" onClick={handleUsdcClick}>
                            <img src={PaymentMethods.USDC.icon} alt={PaymentMethods.USDC.name} /> {PaymentMethods.USDC.name}
                        </button>
                    </div>
                    {/* <button className="payment-button" onClick={handleFiatClick}>
                            <img src={PaymentMethods.FIAT.icon} width={24} height={24} alt={PaymentMethods.FIAT.name} /> {PaymentMethods.FIAT.name}
                        </button> */}

                    <div className="flex flex-col gap-2 max-md:gap-1">
                        <div className="amount-input">
                            <img
                                src={PaymentMethods[payMethod].icon}
                                className="max-lg:w-4 max-lg:h-4"
                                alt={payMethod}
                            />
                            <input
                                placeholder={payMethod}
                                value={inputValue}
                                className="focus:outline-none w-full bg-transparent"
                                onChange={handleAmountChange}
                            />
                            <button
                                onClick={handleMaxClick}
                                disabled={isCalculatingMax}
                                className={`px-3 py-1 lg:px-4 lg:py-1.5 text-xs font-semibold rounded-md transition-colors duration-200 shadow-sm ${isCalculatingMax
                                    ? 'bg-sky-100 text-sky-300 cursor-not-allowed'
                                    : 'bg-gradient-to-r from-sky-400 to-sky-500 text-white hover:from-sky-500 hover:to-sky-600'
                                    }`}
                            >
                                {isCalculatingMax ? (
                                    <div className="animate-spin w-4 h-4 border-2 border-sky-300 border-t-transparent rounded-full mx-auto" />
                                ) : (
                                    'Max'
                                )}
                            </button>
                        </div>

                        {/* Balance Display */}
                        <div className="text-xs text-sky-950/80 flex justify-between items-center">
                            <span>Available Balance:</span>
                            <span className="font-medium">
                                {payMethod === PaymentMethods.ETH.name && ethBalance ?
                                    `${Number(ethBalance.formatted).toFixed(4)} ETH` :
                                    payMethod === PaymentMethods.USDT.name && usdtBalance ?
                                        `${Number(usdtBalance.formatted).toFixed(2)} USDT` :
                                        payMethod === PaymentMethods.USDC.name && usdcBalance ?
                                            `${Number(usdcBalance.formatted).toFixed(2)} USDC` :
                                            '0.00'
                                }
                            </span>
                        </div>

                        <div className="flex flex-col gap-1">
                            <div className="flex flex-col gap-1 max-lg:text-sm max-md:text-xs">
                                <div className="text-sm font-medium text-sky-950">Estimate to receive:</div>
                                <div className="amount-input">
                                    <img src={Assets.bltIcon} className="w-6 h-6 max-lg:w-4 max-lg:h-4" alt="$BLT" />
                                    <input className="focus:outline-none w-full bg-transparent" placeholder="0" value={formatNumber(Number(estimatedAmount).toFixed(3))} readOnly />
                                </div>
                            </div>
                            {error && (
                                <div
                                    className={`text-red-500 text-xs max-md:text-[10px] [@media(max-width:425px)]:text-[10px] ${rawError ? 'cursor-pointer hover:text-red-400' : ''}`}
                                    onClick={handleErrorClick}
                                    title={rawError ? "Click to view raw error" : ""}
                                >
                                    {error}
                                    {rawError && (
                                        <span className="ml-1 text-[8px] opacity-70">
                                            {showRawError ? "▼" : "▶"}
                                        </span>
                                    )}
                                </div>
                            )}
                            {showRawError && rawError && (
                                <div className="text-red-400 text-[10px] max-md:text-[8px] [@media(max-width:425px)]:text-[8px] bg-red-500/10 p-2 rounded border border-red-500/20 break-all">
                                    <div className="font-semibold mb-1">Raw Error:</div>
                                    {rawError}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="flex flex-col gap-2 items-center">
                        <button
                            className="purchase-button"
                            onClick={handlePurchase}
                            disabled={isButtonDisabled()}
                        >
                            Purchase
                        </button>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default TokenSale;