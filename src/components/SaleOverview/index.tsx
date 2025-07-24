import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SaleSection from "./SaleSection";
import SaleChart from "./SaleChart";
import TokenSale from "../TokenSale";
import TimeBar from "../TokenSale/TimeBar";
import StatisticCard from "../TokenSale/StatisticCard";

import Logger from "@/utils/Logger";
import { getSaleStartTime, getSaleEndTime } from "@/utils/blockchain";
import { SaleStatus } from "@/utils/constants";
import { useTokenSale } from "@/store/tokenSale";
import { formatNumber, formatNumberWithSuffix } from "@/utils/formatNumber";

import "@/assets/css/home/sale.css";

const SaleOverview: React.FC = () => {
    const navigate = useNavigate();

    const {
        totalSold,
        initialAmount,
        totalFunds,
        holders,
        tokenPrice,
        getPriceForAmount,
        triggerRefresh
    } = useTokenSale();

    const handleInvestClick = () => {
        navigate("/vesting");
    };

    const [currentTime, setCurrentTime] = useState(Math.floor(Date.now() / 1000));
    const [startTime, setStartTime] = useState(0);
    const [endTime, setEndTime] = useState(0);
    const [saleStatus, setSaleStatus] = useState(SaleStatus.NOT_STARTED);

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

    const soldOut = Number(totalSold) > 0 ? Number(totalSold) / Number(initialAmount) * 100 : 0;

    return (
        <div className="bg-opacity-10 bg-gradient-to-br from-sky-50 to-sky-100 px-2 sm:px-4 lg:px-6 xl:px-12 py-8 sm:py-12 lg:py-16 xl:py-24">
            <div className="flex justify-center mb-8 lg:mb-12">
                <TimeBar startTime={startTime} endTime={endTime} saleStatus={saleStatus} />
            </div>
            <div className="sale-container">
                <div className="max-sm:w-fit drop-shadow-[0px_12px_24px_rgba(12,74,110,0.8)]">
                    <TokenSale />
                </div>
                <div className="w-full h-fit p-4 flex items-center">
                    <SaleChart />
                </div>
            </div>
            <div className="statistics">
                <div className="sm:col-auto col-span-2">
                    <StatisticCard
                        value={holders}
                        label="Token Holders"
                    />
                </div>
                <StatisticCard
                    value={`$${formatNumberWithSuffix(Number(Number(totalFunds).toFixed(3)))}`}
                    label="Total Raised"
                />
                <StatisticCard
                    value={`${formatNumberWithSuffix(Number(Number(totalSold).toFixed(3)))} $BLT`}
                    label="Total Sold"
                />
                <StatisticCard
                    value={`${formatNumberWithSuffix(Number(Number(initialAmount).toFixed(3)))} $BLT`}
                    label="Total Supply"
                />
                <StatisticCard
                    value={`${soldOut.toFixed(3)}%`}
                    label="Sold Out"
                />
            </div>
            <div
                className="text-center mt-4 md:mt-8 xl:mt-12 text-sky-900 cursor-pointer hover:text-sky-500 transition-colors"
                onClick={handleInvestClick}
            >
                <span className="text-lg font-medium">Your Bluelink Assets →</span>
            </div>
        </div>
    );
};

export default SaleOverview;
