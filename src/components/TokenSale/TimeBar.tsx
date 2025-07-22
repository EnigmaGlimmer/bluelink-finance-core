import { useEffect, useState } from "react";
import { SaleStatus } from "@/utils/constants";

interface TimeBarProps {
    startTime: number;      // UNIX timestamp in seconds
    endTime: number;        // UNIX timestamp in seconds
    saleStatus: (typeof SaleStatus)[keyof typeof SaleStatus]; // enum type imported
}

const TimeBar: React.FC<TimeBarProps> = ({ startTime, endTime, saleStatus }) => {
    const [currentTime, setCurrentTime] = useState<number>(Math.floor(Date.now() / 1000));
    const [message, setMessage] = useState<string>("");
    const [period, setPeriod] = useState<string>("");

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(Math.floor(Date.now() / 1000));
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        const calculateCountdown = () => {
            if (saleStatus === SaleStatus.NOT_STARTED) {
                setMessage("Sale Not Started.");
                setPeriod("");
            } else if (saleStatus === SaleStatus.STARTED) {
                const timeLeft = startTime - currentTime;
                const days = Math.floor(timeLeft / (24 * 60 * 60));
                const hours = Math.floor((timeLeft % (24 * 60 * 60)) / (60 * 60));
                const minutes = Math.floor((timeLeft % (60 * 60)) / 60);
                const seconds = timeLeft % 60;
                setMessage("Sale Starts in: ");
                setPeriod(`${days}d ${hours}h ${minutes}m ${seconds}s`);
            } else if (saleStatus === SaleStatus.IN_PROGRESS) {
                const timeLeft = endTime - currentTime;
                const days = Math.floor(timeLeft / (24 * 60 * 60));
                const hours = Math.floor((timeLeft % (24 * 60 * 60)) / (60 * 60));
                const minutes = Math.floor((timeLeft % (60 * 60)) / 60);
                const seconds = timeLeft % 60;
                setMessage("Sale Ends in: ");
                setPeriod(`${days}d ${hours}h ${minutes}m ${seconds}s`);
            } else {
                setMessage("Sale Ended!");
                setPeriod("");
            }
        };

        calculateCountdown();
    }, [currentTime, startTime, endTime, saleStatus]);

    return (
        <p className="text-2xl text-sky-950 font-medium max-lg:text-xl max-md:text-lg max-[425px]:text-base">
            {message}
            {period && <span className="font-semibold text-sky-700 ml-2">{period}</span>}
        </p>
    );
};

export default TimeBar;
