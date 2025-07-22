import "@/assets/css/home/sale.css";

interface StatusSectionProps {
    value: string | number;
    label: string;
}

const StatusSection: React.FC<StatusSectionProps> = ({ value, label }) => {
    return (
        <div className="sale-status">
            <p className="status-value">{value}</p>
            <p className="status-label">{label}</p>
        </div>
    );
};

export default StatusSection;
