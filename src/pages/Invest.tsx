import AOS from "aos";
import { useAccount } from "wagmi";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowUpRight } from "react-icons/fi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useWatchContractEvent } from "wagmi";

import Logger from "@/utils/Logger";
import {
    getVestingDetails,
    calculateVestingStatus,
    getBLTTransactionHistory,
    releaseTokens,
    config
} from "@/utils/blockchain";
import { getErrorMessage } from "@/utils/errorHandler";
import { waitForTransactionReceipt } from "wagmi/actions";
import { Contracts } from "@/utils/constants";

import Progress from "@/components/TokenSale/Progress";
import ValueSection from "@/components/Invest/ValueSection";
import OverviewSection from "@/components/Invest/OverviewSection";
import TransactionTable from "@/components/Invest/TransactionTable";

import "@/assets/css/home/invest.css";

// Define types for vesting data and transactions

interface VestingData {
    totalAmount: number;
    totalUnlocked: number;
    totalClaimed: number;
    availableToClaim: number;
    unlockStatus: string;
    startDate: Date | null;
    cliffTime: Date | null;
    endDate: Date | null;
    duration: number;
    monthlyUnlock: number;
    progressPercentage: number;
}

interface Transaction {
    hash: string;
    from: string;
    to: string;
    amount: bigint | number;
    type: "Received" | "Sent";
    timestamp: number;
    date: string;
    blockNumber: number;
}

const formatDate = (date: Date | null): string => {
    if (!date) return "N/A";
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
};

const Invest: React.FC = () => {
    const navigate = useNavigate();

    const [isConnected, setConnected] = useState(false);
    const [vestingData, setVestingData] = useState<VestingData | null>(null);
    const [transactionHistory, setTransactionHistory] = useState<Transaction[]>([]);
    const [isClaiming, setIsClaiming] = useState(false);
    const [isLoadingVesting, setIsLoadingVesting] = useState(false);
    const [isLoadingTransactions, setIsLoadingTransactions] = useState(false);
    const [vestingError, setVestingError] = useState<string>("");
    const { address } = useAccount();

    const handleLogoClick = () => {
        navigate("/");
    };

    useEffect(() => {
        AOS.init({ duration: 1000, once: true });
        AOS.refresh();
    }, []);

    // Fetch vesting data
    useEffect(() => {
        const fetchVestingData = async () => {
            if (!address) return;

            setIsLoadingVesting(true);
            setVestingError("");

            try {
                const vestingDetails = await getVestingDetails(address);
                const vestingStatus = calculateVestingStatus(vestingDetails);
                setVestingData(vestingStatus);
            } catch (err) {
                Logger.error("Error fetching vesting data:", err);
                setVestingError(getErrorMessage(err));
                setVestingData({
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
                    progressPercentage: 0,
                });
            } finally {
                setIsLoadingVesting(false);
            }
        };

        fetchVestingData();
    }, [address]);

    // Fetch transaction history
    useEffect(() => {
        const fetchTransactionHistory = async () => {
            if (!address) return;

            setIsLoadingTransactions(true);

            try {
                const transactions = await getBLTTransactionHistory(address);
                setTransactionHistory(transactions);
            } catch (err) {
                Logger.error("Error fetching transaction history:", err);
                setTransactionHistory([]);
            } finally {
                setIsLoadingTransactions(false);
            }
        };

        fetchTransactionHistory();
    }, [address]);

    // Watch for token release events to automatically refresh data
    useWatchContractEvent({
        address: Contracts.VESTING.address,
        abi: Contracts.VESTING.abi,
        eventName: 'TokensReleased',
        onLogs: async (logs) => {
            const userLogFound = logs.some(
                (log: any) => log.args && log.args.beneficiary?.toLowerCase() === address?.toLowerCase()
            );
            if (userLogFound) {
                Logger.info("Token release detected, refreshing vesting data");
                try {
                    const vestingDetails = await getVestingDetails(address!);
                    const vestingStatus = calculateVestingStatus(vestingDetails);
                    setVestingData(vestingStatus);
                } catch (err) {
                    Logger.error("Error refreshing vesting data after release:", err);
                }
            }
        },
    });

    // Watch for BLT token transfer events to refresh transaction history
    useWatchContractEvent({
        address: Contracts.TOKEN.address,
        abi: Contracts.TOKEN.abi,
        eventName: 'Transfer',
        onLogs: async (logs) => {
            // If any log is relevant to the user, refetch transaction history
            const userLogFound = logs.some(
                (log: any) => {
                    // Try to use decoded args if present
                    if (log.args) {
                        return (
                            log.args.from?.toLowerCase() === address?.toLowerCase() ||
                            log.args.to?.toLowerCase() === address?.toLowerCase()
                        );
                    }
                    // Otherwise, fallback to false (or implement manual decoding if needed)
                    return false;
                }
            );
            if (userLogFound) {
                Logger.info("BLT token transfer detected, refreshing transaction history");
                // Just refetch the transaction history to ensure type safety
                if (address) {
                    try {
                        const transactions = await getBLTTransactionHistory(address);
                        setTransactionHistory(transactions);
                    } catch (err) {
                        Logger.error("Error refreshing transaction history after transfer:", err);
                    }
                }
            }
        },
    });

    // Handle claim tokens
    const handleClaimTokens = async () => {
        if (!address || !vestingData || vestingData.availableToClaim <= 0 || isClaiming) return;

        setIsClaiming(true);
        try {
            const hash = await releaseTokens(address);
            Logger.info("Claim transaction submitted:", hash);

            await waitForTransactionReceipt(config, { hash });
            Logger.info("Tokens claimed successfully:", hash);

            const vestingDetails = await getVestingDetails(address);
            const vestingStatus = calculateVestingStatus(vestingDetails);
            setVestingData(vestingStatus);
        } catch (err) {
            Logger.error("Error claiming tokens:", err);
        } finally {
            setIsClaiming(false);
        }
    };

    const getVestingProgress = () => {
        if (!vestingData || vestingData.totalAmount === 0) return 0;
        return vestingData.progressPercentage || 0;
    };

    return (
        <div className="col-center bg-gradient-to-br from-sky-50 via-sky-100 to-sky-200">
            <div className="invest-header">
                <img
                    src="/logo.png"
                    alt="Bluelink Blockchain"
                    className="transition-animation h-12 max-[425px]:h-9"
                    onClick={handleLogoClick}
                />

                <ConnectButton.Custom>
                    {({
                        account,
                        chain,
                        openAccountModal,
                        openChainModal,
                        openConnectModal,
                        authenticationStatus,
                        mounted,
                    }) => {
                        const ready = mounted && authenticationStatus !== "loading";
                        const connected =
                            ready &&
                            account &&
                            chain &&
                            (!authenticationStatus || authenticationStatus === "authenticated");

                        useEffect(() => {
                            setConnected(connected);
                        }, [connected]);

                        return (
                            <div
                                {...(!ready && {
                                    "aria-hidden": true,
                                    style: {
                                        opacity: 0,
                                        pointerEvents: "none",
                                        userSelect: "none",
                                        height: "100%",
                                    },
                                })}
                            >
                                {(() => {
                                    if (!connected) {
                                        return (
                                            <button
                                                onClick={openConnectModal}
                                                type="button"
                                                className="connect-button w-full h-full"
                                            >
                                                Connect Wallet
                                                <FiArrowUpRight className={`${isConnected ? "hidden" : ""}`} />
                                            </button>
                                        );
                                    }

                                    if (chain.unsupported) {
                                        return (
                                            <button onClick={openChainModal} type="button">
                                                Wrong network
                                            </button>
                                        );
                                    }

                                    return (
                                        <div
                                            style={{
                                                display: "flex",
                                                justifyContent: "center",
                                                alignItems: "center",
                                                gap: 8,
                                            }}
                                        >
                                            <button
                                                onClick={openChainModal}
                                                className="transition-animation icon-chain"
                                                type="button"
                                            >
                                                {chain.hasIcon && chain.iconUrl && (
                                                    <img
                                                        alt={chain.name ?? "Chain icon"}
                                                        src={chain.iconUrl}
                                                        className="icon-chain"
                                                    />
                                                )}
                                            </button>

                                            <button
                                                onClick={openAccountModal}
                                                type="button"
                                                className="connect-button"
                                            >
                                                {account.displayName}
                                                {account.displayBalance && `(${account.displayBalance})`}
                                            </button>
                                        </div>
                                    );
                                })()}
                            </div>
                        );
                    }}
                </ConnectButton.Custom>
            </div>
            <div
                data-aos="fade-up"
                data-aos-duration="3000"
                className="invest-container"
            >
                <div className="max-md:row-auto justify-center">
                    <h4 className="text-3xl font-bold text-sky-900 max-lg:text-2xl max-md:text-xl">Vesting Overview</h4>
                    {isLoadingVesting ? (
                        <div className="text-center py-4">Loading vesting data...</div>
                    ) : vestingError ? (
                        <div className="text-red-500 text-sm py-2">{vestingError}</div>
                    ) : (
                        <div className="overview-grid">
                            <div className="col-span-2">
                                <OverviewSection heading="Wallet Address" label={address || "Not Connected"} />
                            </div>
                            <OverviewSection
                                heading="Total Vested $BLT"
                                label={vestingData ? `${vestingData.totalAmount.toLocaleString()} $BLT` : "0 $BLT"}
                            />
                            <OverviewSection heading="First Purchase Date" label={formatDate(vestingData?.startDate ?? null)} />
                            <OverviewSection heading="Unlocking Starts" label={formatDate(vestingData?.cliffTime ?? null)} />
                            <OverviewSection heading="Unlocking Ends" label={formatDate(vestingData?.endDate ?? null)} />
                        </div>
                    )}
                </div>

                <div className="flex justify-center">
                    <h4 className="text-3xl font-bold text-sky-900 max-lg:text-2xl max-md:text-xl">Claimable Tokens</h4>
                    {isLoadingVesting ? (
                        <div className="text-center py-4">Loading claimable tokens...</div>
                    ) : (
                        <>
                            <div className="value-grid">
                                <OverviewSection
                                    heading="Amount Unlocked"
                                    label={vestingData ? `${vestingData.totalUnlocked.toLocaleString()} $BLT` : "0 BLT"}
                                />
                                <OverviewSection
                                    heading="Amount Claimed"
                                    label={vestingData ? `${vestingData.totalClaimed.toLocaleString()} $BLT` : "0 BLT"}
                                />
                                <OverviewSection
                                    heading="Available to Claim"
                                    label={vestingData ? `${vestingData.availableToClaim.toLocaleString()} $BLT` : "0 BLT"}
                                />
                            </div>
                            <div className="xy-center">
                                <button
                                    className="purchase-button"
                                    onClick={handleClaimTokens}
                                    disabled={!vestingData || vestingData.availableToClaim <= 0 || isClaiming}
                                >
                                    {isClaiming
                                        ? "Processing..."
                                        : !vestingData || vestingData.availableToClaim <= 0
                                            ? "No Tokens to Claim"
                                            : "Claim Tokens"}
                                </button>
                            </div>
                        </>
                    )}
                </div>

                <div>
                    <h4 className="text-3xl font-bold text-sky-900 max-lg:text-2xl max-md:text-xl">Transactions</h4>
                    {isLoadingTransactions ? (
                        <div className="text-center py-4">Loading transaction history...</div>
                    ) : transactionHistory.length === 0 ? (
                        <div className="text-center py-4 text-gray-500">No transactions found</div>
                    ) : (
                        <TransactionTable transactions={transactionHistory.map(({ date, amount, hash }) => ({
                            date,
                            amount: typeof amount === 'bigint' ? amount.toString() : amount,
                            hash,
                        }))} />
                    )}
                </div>
            </div>
        </div>
    );
};

export default Invest;
