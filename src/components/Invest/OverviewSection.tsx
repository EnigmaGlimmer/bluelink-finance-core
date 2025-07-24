import "@/assets/css/home/invest.css";

interface OverviewSectionProps {
    heading: string;
    label: string | number | null | undefined;
}

const OverviewSection: React.FC<OverviewSectionProps> = ({ heading, label }) => {
    return (
        <div className="overview-section">
            <p className="overview-heading">{heading}</p>
            <p className="overview-label">{label}</p>
        </div>
    );
};

export default OverviewSection;
