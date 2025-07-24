import "@/assets/css/home/tokensale.css";

interface StatisticCardProps {
    value: string | number;
    label: string;
}

const StatisticCard = ({ value, label }: StatisticCardProps) => {
    return (
        <div className="statistic-card">
            <p className="text-base font-semibold text-sky-900 md:text-lg lg:text-xl xl:text-2xl">{value}</p>
            <p className="font-medium max-[425px]:text-[10px]">{label}</p>
        </div>
    );
};

export default StatisticCard;