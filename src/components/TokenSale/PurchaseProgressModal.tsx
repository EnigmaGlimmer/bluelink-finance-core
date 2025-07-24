import Modal from "./Modal";
import { Assets } from "@/assets";
import { PaymentMethods, PurchaseStatus } from "@/utils/constants";

const LoadingSpinner = () => (
    <div className="animate-spin w-8 h-8 border-2 border-sky-950/80 border-t-transparent rounded-full" />
);

interface PurchaseProgressModalProps {
    isOpen: boolean;
    status: keyof typeof PurchaseStatus;
    payMethod: keyof typeof PaymentMethods;
    onClose: () => void;
}

const PurchaseProgressModal: React.FC<PurchaseProgressModalProps> = ({
    isOpen,
    status,
    payMethod,
    onClose
}) => {
    const getStatusContent = () => {
        switch (status) {
            case PurchaseStatus.RESET_APPROVAL:
                return {
                    title: "Requesting Approval Reset",
                    message: `Please approve the transaction to reset ${payMethod} approval.`,
                    icon: PaymentMethods[payMethod]?.icon || Assets.bltIcon,
                    showSpinner: true
                };
            case PurchaseStatus.RESETTING:
                return {
                    title: "Allowing Approval Reset Transaction",
                    message: "Processing allowance reset for BLT token purchase",
                    icon: Assets.bltIcon,
                    showSpinner: true
                };
            case PurchaseStatus.APPROVING:
                return {
                    title: "Requesting Approval",
                    message: `Please approve the transaction to send ${payMethod}`,
                    icon: PaymentMethods[payMethod]?.icon || Assets.bltIcon,
                    showSpinner: true
                };
            case PurchaseStatus.APPROVED:
                return {
                    title: "Allowing Transaction",
                    message: "Processing allowance for BLT token purchase",
                    icon: Assets.bltIcon,
                    showSpinner: true
                };
            case PurchaseStatus.PURCHASING:
                return {
                    title: "Processing Purchase",
                    message: "Please confirm the transaction to spend gas fee in ETH to purchase BLT token.",
                    icon: Assets.bltIcon,
                    showSpinner: true
                };
            case PurchaseStatus.SUCCESS:
                return {
                    title: "Purchase Successful!",
                    message: "Your tokens will be available after vesting period.",
                    icon: Assets.bltIcon,
                    showSpinner: false
                };
            default:
                return {
                    title: "Processing",
                    message: "Please wait while we process your transaction...",
                    icon: Assets.bltIcon,
                    showSpinner: true
                };
        }
    };

    const content = getStatusContent();

    const isPending = status === PurchaseStatus.APPROVING || status === PurchaseStatus.PURCHASING;

    return (
        <Modal isOpen={isOpen} onClose={onClose} preventClose={isPending}>
            <div className="col-center gap-6 text-center">
                {/* Header */}
                <div className="col-center gap-3">
                    <div className="relative">
                        <img
                            src={content.icon}
                            alt="Token"
                            className="w-12 h-12 max-[425px]:w-10 max-[425px]:h-10"
                        />
                    </div>
                    <div className="flex items-center gap-3">
                        <h3 className="text-xl font-semibold max-[425px]:text-lg">
                            {content.title}
                        </h3>
                        {content.showSpinner && <LoadingSpinner />}
                    </div>
                </div>

                {/* Message */}
                <p className="text-foreground/80 text-sm max-[425px]:text-xs leading-relaxed">
                    {content.message}
                </p>

                {/* Pending progress */}
                {isPending && (
                    <div className="w-full">
                        <div className="w-full bg-foreground/10 rounded-full h-2">
                            <div className="bg-primary-400 h-2 rounded-full animate-pulse" style={{ width: "60%" }}></div>
                        </div>
                        <p className="text-xs text-foreground/60 mt-2">
                            Please check your wallet for the transaction
                        </p>
                        <div className="mt-3 p-3 bg-foreground/5 rounded-lg border border-foreground/10">
                            <p className="text-xs text-foreground/70">
                                ⏱️ <strong>Transaction Time:</strong> Typically 12-15 seconds, may take up to 2-3 minutes due to Ethereum network congestion
                            </p>
                        </div>
                    </div>
                )}

                {/* Success state */}
                {status === PurchaseStatus.SUCCESS && (
                    <div className="col-center gap-3">
                        <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center">
                            <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <button
                            onClick={onClose}
                            className="cursor-pointer px-6 py-2 bg-sky-900 text-black rounded-lg font-medium hover:bg-sky-700 transition-colors"
                        >
                            Close
                        </button>
                    </div>
                )}
            </div>
        </Modal>
    );
};

export default PurchaseProgressModal;
