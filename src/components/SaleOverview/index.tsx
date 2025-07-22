import React from "react";
import SaleSection from "./SaleSection";
import SaleChart from "./SaleChart";

import "@/assets/css/home/sale.css";

const SaleOverview: React.FC = () => {
    return (
        <div className="sale-container">
            <SaleSection />
            <SaleChart />
        </div>
    );
};

export default SaleOverview;
