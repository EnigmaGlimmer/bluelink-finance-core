import { useEffect, useState } from "react";

const BLOCKED_COUNTRIES: string[] = ['US', 'IN', 'CN', 'JP', 'TH', 'CA'];

type IPInfoResponse = {
    country: string;
};

export default function IPDetection(): JSX.Element | null {
    const [isBlocked, setIsBlocked] = useState<boolean | null>(null);

    useEffect(() => {
        async function checkLocation() {
            try {
                const res = await fetch("https://ipinfo.io/json?token=78188d57a397d2");
                const data: IPInfoResponse = await res.json();
                const country = data.country;
                setIsBlocked(BLOCKED_COUNTRIES.includes(country));
            } catch (error) {
                console.error("IP lookup failed", error);
                setIsBlocked(false);
            }
        }

        checkLocation();
    }, []);

    if (isBlocked) {
        return (
            <div className="w-full flex items-center justify-center text-center text-xs text-yellow-500 py-0.5 bg-gradient-to-r from-sky-100 via-yellow-50 to-sky-100">
                Warning: We're sorry, this service is not available in your country.
            </div>
        );
    }

    return null;
}
