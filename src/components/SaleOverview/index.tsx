import React from "react";
import { useNavigate } from "react-router-dom";
import SaleSection from "./SaleSection";
import SaleChart from "./SaleChart";

import "@/assets/css/home/sale.css";

const SaleOverview: React.FC = () => {
    const navigate = useNavigate();

    const handleInvestClick = () => {
        navigate("/vesting");
    };

    return (
        <div className="sale-container">
            <SaleSection />
            <SaleChart />
            <div
                className="text-center mt-8 text-sky-900 cursor-pointer hover:text-sky-500 transition-colors"
                onClick={handleInvestClick}
            >
                <span className="text-lg font-medium">View Your Bluelink Assets →</span>
            </div>
        </div>
    );
};

export default SaleOverview;
