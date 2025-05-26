
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Wallet, ArrowRight, Copy, Check } from "lucide-react";

interface PresaleModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PresaleModal = ({ isOpen, onClose }: PresaleModalProps) => {
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState<"USDT" | "ETH">("USDT");
  const [amount, setAmount] = useState("");
  const [walletAddress, setWalletAddress] = useState("");
  const [copied, setCopied] = useState(false);

  const BLTPrice = {
    USDT: 0.085,
    ETH: 0.000028
  };

  const contractAddresses = {
    USDT: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
    ETH: "0x0000000000000000000000000000000000000000"
  };

  const connectWallet = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setWalletAddress(accounts[0]);
        setIsWalletConnected(true);
      } catch (error) {
        console.error('Failed to connect wallet:', error);
      }
    } else {
      alert('Please install MetaMask or another Ethereum wallet');
    }
  };

  const calculateBLTTokens = () => {
    if (!amount) return 0;
    return (parseFloat(amount) / BLTPrice[selectedCurrency]).toFixed(2);
  };

  const copyAddress = () => {
    navigator.clipboard.writeText(contractAddresses[selectedCurrency]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePurchase = () => {
    if (!isWalletConnected || !amount) {
      alert('Please connect wallet and enter amount');
      return;
    }
    // Here you would integrate with actual smart contract
    alert(`Purchase of ${calculateBLTTokens()} BLT tokens initiated!`);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md mx-auto bg-slate-900 border-slate-700 text-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center text-cyan-400">
            Buy BLT Tokens
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Wallet Connection */}
          <div className="space-y-3">
            {!isWalletConnected ? (
              <Button 
                onClick={connectWallet}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3"
              >
                <Wallet className="mr-2 h-5 w-5" />
                Connect Wallet
              </Button>
            ) : (
              <div className="bg-slate-800 p-3 rounded-lg">
                <p className="text-sm text-gray-300">Connected:</p>
                <p className="text-cyan-400 font-mono text-xs">
                  {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
                </p>
              </div>
            )}
          </div>

          {/* Currency Selection */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-gray-300">Payment Currency</label>
            <div className="grid grid-cols-2 gap-3">
              {["USDT", "ETH"].map((currency) => (
                <button
                  key={currency}
                  onClick={() => setSelectedCurrency(currency as "USDT" | "ETH")}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    selectedCurrency === currency
                      ? "border-cyan-400 bg-cyan-400/10"
                      : "border-slate-600 hover:border-slate-500"
                  }`}
                >
                  <div className="font-semibold">{currency}</div>
                  <div className="text-xs text-gray-400">
                    ${BLTPrice[currency as keyof typeof BLTPrice]} per BLT
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Amount Input */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-gray-300">
              Amount ({selectedCurrency})
            </label>
            <Input
              type="number"
              placeholder={`Enter ${selectedCurrency} amount`}
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="bg-slate-800 border-slate-600 text-white"
            />
            {amount && (
              <p className="text-sm text-cyan-400">
                ≈ {calculateBLTTokens()} BLT tokens
              </p>
            )}
          </div>

          {/* Contract Address */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">
              {selectedCurrency} Contract Address
            </label>
            <div className="flex items-center space-x-2 bg-slate-800 p-2 rounded-lg">
              <code className="text-xs text-cyan-400 flex-1 font-mono">
                {contractAddresses[selectedCurrency]}
              </code>
              <Button
                size="sm"
                variant="ghost"
                onClick={copyAddress}
                className="h-8 w-8 p-0"
              >
                {copied ? (
                  <Check className="h-4 w-4 text-green-400" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>

          {/* Purchase Button */}
          <Button
            onClick={handlePurchase}
            disabled={!isWalletConnected || !amount}
            className="w-full bg-cyan-600 hover:bg-cyan-700 text-white py-3 disabled:opacity-50"
          >
            Purchase BLT Tokens
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>

          {/* Disclaimer */}
          <div className="text-xs text-gray-400 text-center">
            <p>Ethereum Network Only • Non-custodial • Secure</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PresaleModal;
