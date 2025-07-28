import Modal from "./Modal";
import SuccessModal from "./SuccessModal"; // ← new modal component
import { Assets } from "@/assets";
import { PaymentMethods, PurchaseStatus } from "@/utils/constants";
import { useState, useEffect } from "react";
import { useAccount } from "wagmi";

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
    onClose,
}) => {
    const { address } = useAccount();

    const [isFormVisible, setIsFormVisible] = useState(false);
    const [isAgreed, setIsAgreed] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false); // ← control success modal
    const [formData, setFormData] = useState({
        email: "",
        social: "",
        wallet: "",
        messageType: "",
        message: "",
        updatesOptIn: false,
    });

    useEffect(() => {
        if (isFormVisible && address && !formData.wallet) {
            setFormData((prev) => ({
                ...prev,
                wallet: address,
            }));
        }
    }, [isFormVisible, address, formData.wallet]);

    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => {
        const { name, value, type } = e.target;
        const checked =
            e.target instanceof HTMLInputElement ? e.target.checked : false;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await fetch(
                import.meta.env.VITE_PURCHASE_GOOGLE_SCRIPT_URL,
                {
                    method: "POST",
                    body: JSON.stringify(formData),
                }
            );
            if (response.ok) {
                setSubmitted(true);
                setIsFormVisible(false);
                setFormData({
                    email: "",
                    social: "",
                    wallet: "",
                    messageType: "",
                    message: "",
                    updatesOptIn: false,
                });
                setShowSuccessModal(true); // ← show success modal
            } else {
                console.error("Submission failed");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const isButtonDisabled = () => !isAgreed;

    const getStatusContent = () => {
        switch (status) {
            case PurchaseStatus.RESET_APPROVAL:
                return {
                    title: "Requesting Approval Reset",
                    message: `Please approve the transaction to reset ${payMethod} approval.`,
                    icon: PaymentMethods[payMethod]?.icon || Assets.bltIcon,
                    showSpinner: true,
                };
            case PurchaseStatus.RESETTING:
                return {
                    title: "Allowing Approval Reset Transaction",
                    message: "Processing allowance reset for BLT token purchase",
                    icon: Assets.bltIcon,
                    showSpinner: true,
                };
            case PurchaseStatus.APPROVING:
                return {
                    title: "Requesting Approval",
                    message: `Please approve the transaction to send ${payMethod}`,
                    icon: PaymentMethods[payMethod]?.icon || Assets.bltIcon,
                    showSpinner: true,
                };
            case PurchaseStatus.APPROVED:
                return {
                    title: "Allowing Transaction",
                    message: "Processing allowance for BLT token purchase",
                    icon: Assets.bltIcon,
                    showSpinner: true,
                };
            case PurchaseStatus.PURCHASING:
                return {
                    title: "Processing Purchase",
                    message:
                        "Please confirm the transaction to spend gas fee in ETH to purchase BLT token.",
                    icon: Assets.bltIcon,
                    showSpinner: true,
                };
            case PurchaseStatus.SUCCESS:
                return {
                    title: "Purchase Successful!",
                    message: "Your tokens will be available after vesting period.",
                    icon: Assets.bltIcon,
                    showSpinner: false,
                };
            default:
                return {
                    title: "Processing",
                    message: "Please wait while we process your transaction...",
                    icon: Assets.bltIcon,
                    showSpinner: true,
                };
        }
    };

    const content = getStatusContent();
    const isPending =
        status === PurchaseStatus.APPROVING || status === PurchaseStatus.PURCHASING;

    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose} preventClose={isPending}>
                <div className="flex flex-col gap-6 text-center">
                    <div className="row-center gap-3">
                        {status !== PurchaseStatus.SUCCESS ? (
                            <img
                                src={content.icon}
                                alt="Token"
                                className="w-12 h-12 max-[425px]:w-10 max-[425px]:h-10"
                            />
                        ) : (
                            <div className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center">
                                <svg
                                    className="w-6 h-6 text-green-500"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M5 13l4 4L19 7"
                                    />
                                </svg>
                            </div>
                        )}
                        <div className="flex items-center gap-3">
                            <h3 className="text-xl text-sky-950 font-semibold max-[425px]:text-lg">
                                {content.title}
                            </h3>
                            {content.showSpinner && <LoadingSpinner />}
                        </div>
                    </div>

                    <p className="text-sky-950/80 text-sm max-[425px]:text-xs leading-relaxed">
                        {status === PurchaseStatus.SUCCESS && (
                            <>Thank you for your supporting the BlueLink ecosystem<br /></>
                        )}
                        {content.message}
                    </p>

                    {status === PurchaseStatus.SUCCESS && (
                        <div className="flex flex-col justify-start">
                            <label className="flex items-start space-x-2 text-sky-900 font-semibold text-sm max-[425px]:text-xs leading-relaxed mb-3">
                                <input
                                    type="checkbox"
                                    checked={isFormVisible}
                                    onChange={() => setIsFormVisible(!isFormVisible)}
                                    className="mt-1 form-checkbox h-4 w-4 text-sky-500"
                                />
                                <span>
                                    I want to share my contact info and message with BlueLink.
                                </span>
                            </label>

                            {isFormVisible && (
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="Email address"
                                        className="amount-input"
                                    />

                                    <input
                                        type="text"
                                        name="social"
                                        value={formData.social}
                                        onChange={handleChange}
                                        placeholder="Social link (e.g., Twitter, Telegram)"
                                        className="amount-input"
                                    />

                                    <input
                                        type="text"
                                        name="wallet"
                                        value={formData.wallet}
                                        disabled
                                        placeholder="Wallet address"
                                        className="amount-input"
                                    />

                                    <select
                                        name="messageType"
                                        value={formData.messageType}
                                        onChange={handleChange}
                                        className="amount-input"
                                    >
                                        <option value="">Select message type</option>
                                        <option value="general">General Question</option>
                                        <option value="feedback">Feedback / Suggestion</option>
                                        <option value="bug">Bug / Technical Issue</option>
                                        <option value="token">Token Purchase Support</option>
                                        <option value="business">Business / Listing Inquiry</option>
                                    </select>

                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        placeholder="Your message, feedback, or question..."
                                        rows={4}
                                        className="amount-input"
                                    ></textarea>

                                    <label className="flex items-start space-x-2 text-sky-900 font-semibold text-sm max-[425px]:text-xs leading-relaxed">
                                        <input
                                            type="checkbox"
                                            name="updatesOptIn"
                                            checked={isAgreed}
                                            onChange={() => setIsAgreed(!isAgreed)}
                                            className="mt-1 form-checkbox h-4 w-4 text-sky-500"
                                        />
                                        <span>
                                            I agree to receive BlueLink ecosystem updates and news.
                                        </span>
                                    </label>

                                    <div className="text-xs text-gray-500">
                                        By submitting, you agree to our{" "}
                                        <a
                                            href="/BlueLink_Terms_of_Service.pdf"
                                            target="_blank"
                                            className="underline"
                                        >
                                            Terms
                                        </a>{" "}
                                        and{" "}
                                        <a
                                            href="/BlueLink_Privacy_Policy.pdf"
                                            target="_blank"
                                            className="underline"
                                        >
                                            Privacy Policy
                                        </a>
                                        .
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isButtonDisabled()}
                                        className={`bg-sky-500 hover:bg-sky-700 text-white font-bold py-3 px-6 rounded-xl w-full transition-colors duration-300 ease-in-out ${isButtonDisabled()
                                            ? "opacity-50 cursor-not-allowed"
                                            : ""
                                            }`}
                                    >
                                        Send Message
                                    </button>
                                </form>
                            )}
                        </div>
                    )}

                    {isPending && (
                        <div className="w-full">
                            <div className="w-full bg-sky-300/10 rounded-full h-2">
                                <div
                                    className="bg-primary-400 h-2 rounded-full animate-pulse"
                                    style={{ width: "60%" }}
                                ></div>
                            </div>
                            <p className="text-xs text-sky-950/60 mt-2">
                                Please check your wallet for the transaction
                            </p>
                            <div className="mt-3 p-3 bg-sky-300/5 rounded-lg border border-sky-300/10">
                                <p className="text-xs text-foreground/70">
                                    ⏱️ <strong>Transaction Time:</strong> Typically 12–15 seconds,
                                    may take up to 2–3 minutes due to Ethereum network congestion
                                </p>
                            </div>
                        </div>
                    )}

                    {(status === PurchaseStatus.SUCCESS && !isFormVisible) && (
                        <div className="flex justify-end gap-3">
                            <button
                                onClick={onClose}
                                className="cursor-pointer px-6 py-2 bg-sky-900/10 text-sky-950 rounded-lg font-medium hover:bg-sky-900/30 focus:bg-sky-900/35 transition-colors duration-300 ease-in-out"
                            >
                                Okay
                            </button>
                        </div>
                    )}
                </div>
            </Modal>

            {/* ✅ Show Success Modal above if form submit succeeded */}
            <SuccessModal
                isOpen={showSuccessModal}
                onClose={() => { setShowSuccessModal(false); onClose(); }}
            />
        </>
    );
};

export default PurchaseProgressModal;
