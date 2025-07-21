export const formatNumberWithSuffix = (num: number | null | undefined): string => {
    if (num === null || num === undefined) return '';
    const absNum = Math.abs(num);

    const format = (value: number, suffix: string): string => {
        const formatted = value.toFixed(3);
        // Remove unnecessary trailing zeros and decimal point if needed
        return formatted.replace(/\.?0+$/, '') + suffix;
    };

    if (absNum >= 1.0e+9) {
        return format(num / 1.0e+9, 'B');
    } else if (absNum >= 1.0e+6) {
        return format(num / 1.0e+6, 'M');
    } else if (absNum >= 1.0e+3) {
        return format(num / 1.0e+3, 'K');
    } else {
        return num.toFixed(3).toString();
    }
};

export const formatNumber = (value: string | number | null | undefined): string => {
    if (value === null || value === undefined || value === '') return "";

    const parts = value.toString().replace(/\s/g, "").split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
};
