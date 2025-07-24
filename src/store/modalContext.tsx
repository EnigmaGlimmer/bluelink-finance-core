import { createContext, useContext, useState, ReactNode } from "react";
import { PurchaseStatus } from "@/utils/constants";

// --- Types ---
interface ModalState {
    showPurchaseModal: boolean;
    purchaseStatus: (typeof PurchaseStatus)[keyof typeof PurchaseStatus];
    payMethod: string;
}

interface ModalContextType extends ModalState {
    openPurchaseModal: (payMethod: string) => void;
    closePurchaseModal: () => void;
    updatePurchaseStatus: (status: (typeof PurchaseStatus)[keyof typeof PurchaseStatus]) => void;
}

interface ModalProviderProps {
    children: ReactNode;
}

// --- Create context ---
const ModalContext = createContext<ModalContextType | null>(null);

// --- Initial state ---
const initialState: ModalState = {
    // Purchase Progress Modal
    showPurchaseModal: false,
    purchaseStatus: PurchaseStatus.IDLE,
    payMethod: "",
};

// --- Provider ---
export const ModalProvider = ({ children }: ModalProviderProps) => {
    const [state, setState] = useState<ModalState>(initialState);

    // --- Purchase Progress Modal actions ---
    const openPurchaseModal = (payMethod: string) => {
        setState((prev) => ({
            ...prev,
            showPurchaseModal: true,
            payMethod,
            purchaseStatus: PurchaseStatus.IDLE,
        }));
    };

    const closePurchaseModal = () => {
        setState((prev) => ({
            ...prev,
            showPurchaseModal: false,
            purchaseStatus: PurchaseStatus.IDLE,
        }));
    };

    const updatePurchaseStatus = (status: (typeof PurchaseStatus)[keyof typeof PurchaseStatus]) => {
        setState((prev) => ({
            ...prev,
            purchaseStatus: status,
        }));
    };

    const value: ModalContextType = {
        ...state,
        openPurchaseModal,
        closePurchaseModal,
        updatePurchaseStatus,
    };

    return (
        <ModalContext.Provider value={value}>
            {children}
        </ModalContext.Provider>
    );
};

// --- Custom hook ---
export const useModal = (): ModalContextType => {
    const context = useContext(ModalContext);
    if (!context) {
        throw new Error("useModal must be used within a ModalProvider");
    }
    return context;
};
