import StatusSection from "./StatusSection";
import { useTokenSale } from "@/store/tokenSale";
import { formatNumberWithSuffix } from "@/utils/formatNumber";

import "@/assets/css/home/sale.css";

interface SaleDetail {
    value: string | number;
    label: string;
}

const SaleSection = () => {
    const {
        totalSold,
        initialAmount,
        tokenPrice
    } = useTokenSale();

    const saleDetails: SaleDetail[] = [
        { value: tokenPrice, label: "CURRENT PRICE" },
        {
            value: `$${formatNumberWithSuffix(Number(tokenPrice) * Number(initialAmount))}`,
            label: "FULLY DILUTED VALUE"
        },
        {
            value: formatNumberWithSuffix(Number(initialAmount)) + " $BLT",
            label: "TOKEN SUPPLY"
        },
        {
            value: formatNumberWithSuffix(Number(totalSold)) + " $BLT",
            label: "TOTAL SOLD"
        }
    ];

    return (
        <div className="sale-stat">
            <p className="sale-heading">$BLT Presale</p>
            <div className="sale-statuses">
                {saleDetails.map((saleDetail, index) => (
                    <StatusSection
                        value={saleDetail.value}
                        label={saleDetail.label}
                        key={index}
                    />
                ))}
            </div>
        </div>
    );
};

export default SaleSection;
