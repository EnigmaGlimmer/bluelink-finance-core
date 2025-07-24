import "@/assets/css/home/tokensale.css";

interface PriceCardProps {
    label: string;
    price: number | string;
}

const PriceCard: React.FC<PriceCardProps> = ({ label, price }) => {
    return (
        <div className="price-card">
            <p className="text-sky-700 font-black text-sm max-xl:text-xs max-lg:text-[10px] max-[425px]:text-[8px]">
                {label}
            </p>
            <p className="text-xl text-sky-700 font-semibold max-xl:text-xl max-lg:text-base max-[425px]:text-sm">
                <span className="text-sky-950 font-bold">$BLT</span> = ${price}
            </p>
        </div>
    );
};

export default PriceCard;
