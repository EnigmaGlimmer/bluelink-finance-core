import { useState, useEffect } from "react";

export default function useDebounce<T>(value: T, delay: number = 300): T {
    const [debounceValue, setDebounce] = useState<T>(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebounce(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debounceValue;
}
