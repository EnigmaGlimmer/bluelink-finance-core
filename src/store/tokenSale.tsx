import { createContext, useContext, useState, useCallback, useEffect, ReactNode } from "react";
import {
    getTotalTokensSold,
    getTokenPrice,
    getInitialTokenAmount,
    getTotalFundsRaised,
    getNumberOfTokenHolders
} from "@/utils/blockchain";
import Logger from "@/utils/Logger";

// Define the context state type
interface TokenSaleState {
    totalSold: string;
    initialAmount: string;
    totalFunds: string;
    holders: string;
    tokenPrice: string;
    estimatedAmount: string;
}

// Define the full context value type
interface TokenSaleContextType extends TokenSaleState {
    getPriceForAmount: (amount: number) => Promise<string>;
    triggerRefresh: () => void;
}

// Initial state
const initialState: TokenSaleState = {
    totalSold: "0",
    initialAmount: "0",
    totalFunds: "0",
    holders: "0",
    tokenPrice: "0",
    estimatedAmount: "0"
};

// Create context with a default of undefined (to enforce use within Provider)
const TokenSaleContext = createContext<TokenSaleContextType | undefined>(undefined);

// Props for provider
interface TokenSaleProviderProps {
    children: ReactNode;
}

// Provider component
export const TokenSaleProvider = ({ children }: TokenSaleProviderProps) => {
    const [state, setState] = useState<TokenSaleState>(initialState);
    const [refreshTrigger, setRefreshTrigger] = useState<number>(0);

    // Fetch all blockchain data
    const fetchAllData = useCallback(async () => {
        try {
            const [totalSold, initialAmount, totalFunds, holders, tokenPrice] = await Promise.all([
                getTotalTokensSold(),
                getInitialTokenAmount(),
                getTotalFundsRaised(),
                getNumberOfTokenHolders(),
                getTokenPrice(0),
            ]);

            setState(prev => ({
                ...prev,
                totalSold,
                initialAmount,
                totalFunds,
                holders,
                tokenPrice
            }));
        } catch (err) {
            Logger.error("Error fetching token sale data:", err);
            setState(prev => ({
                ...prev,
                totalSold: "0",
                initialAmount: "0",
                totalFunds: "0",
                holders: "0",
                tokenPrice: "0"
            }));
        }
    }, []);

    // Get token price for amount
    const getPriceForAmount = useCallback(async (amount: number): Promise<string> => {
        try {
            const price = await getTokenPrice(amount);
            setState(prev => ({
                ...prev,
                estimatedAmount: amount.toString()
            }));
            return price;
        } catch (err) {
            Logger.error("Error getting token price:", err);
            setState(prev => ({
                ...prev,
                tokenPrice: "0"
            }));
            return "0";
        }
    }, []);

    // Trigger refresh
    const triggerRefresh = useCallback(() => {
        setRefreshTrigger(prev => prev + 1);
    }, []);

    // Fetch data when refresh trigger changes
    useEffect(() => {
        fetchAllData();
    }, [refreshTrigger, fetchAllData]);

    const value: TokenSaleContextType = {
        ...state,
        getPriceForAmount,
        triggerRefresh
    };

    return (
        <TokenSaleContext.Provider value={value}>
            {children}
        </TokenSaleContext.Provider>
    );
};

// Custom hook to use the token sale context
export const useTokenSale = (): TokenSaleContextType => {
    const context = useContext(TokenSaleContext);
    if (!context) {
        throw new Error("useTokenSale must be used within a TokenSaleProvider");
    }
    return context;
};
