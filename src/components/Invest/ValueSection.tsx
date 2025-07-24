import "@/assets/css/home/invest.css";

interface ValueSectionProps {
    label: string;
    value: string | number | null | undefined;
}

const ValueSection: React.FC<ValueSectionProps> = ({ label, value }) => {
    return (
        <div className="value-section">
            <p className="opacity-70">{label}</p>
            <p>{value}</p>
        </div>
    );
};

export default ValueSection;
