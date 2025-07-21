import React from "react";

interface ProgressProps {
    value: number;
}

const Progress: React.FC<ProgressProps> = ({ value }) => {
    return (
        <div className="w-full bg-sky-900/10 rounded-full h-2.5 max-[425px]:h-1">
            <div
                className="bg-sky-300 h-2.5 rounded-full max-[425px]:h-1"
                style={{ width: `${value}%` }}
            ></div>
        </div>
    );
};

export default Progress;
