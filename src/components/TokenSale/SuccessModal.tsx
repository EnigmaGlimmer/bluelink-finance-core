// SuccessModal.tsx
import Modal from "./Modal";

interface SuccessModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const SuccessModal: React.FC<SuccessModalProps> = ({ isOpen, onClose }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className="text-center">
                <div className="w-12 h-12 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center">
                    <svg
                        className="w-6 h-6 text-green-600"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                </div>
                <h2 className="text-lg font-semibold text-sky-950 mb-2">Message Sent Successfully</h2>
                <p className="text-sm text-sky-900/70 mb-6">Thank you for sharing your thoughts with BlueLink!</p>
                <button
                    onClick={onClose}
                    className="bg-sky-500 hover:bg-sky-600 text-white font-medium px-6 py-2 rounded-lg transition"
                >
                    Okay
                </button>
            </div>
        </Modal>
    );
};

export default SuccessModal;
