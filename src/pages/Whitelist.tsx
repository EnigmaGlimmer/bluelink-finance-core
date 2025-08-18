import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { isAddress } from "viem";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { Mail, User, Link, Wallet } from "lucide-react";
import { FiArrowUpRight } from "react-icons/fi";
import {
    RiTwitterLine,
    RiLinkedinLine,
    RiInstagramLine,
    RiGithubLine,
    RiTelegramLine,
    RiDiscordLine,
} from "react-icons/ri";

import "@/assets/css/home/whitelist.css";
import { useAccount } from "wagmi";

const Whitelist = () => {
    const navigate = useNavigate();
    const account = useAccount();

    const [isConnected, setConnected] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        wallet: "",
        social: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (account.address) {
            setConnected(true);
            setFormData((prev) => ({
                ...prev,
                wallet: account.address,
            }));
        } else {
            setConnected(false);
        }
    }, [account.address]);

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const validateForm = () => {
        if (!formData.name.trim()) {
            toast({
                title: "Name Required",
                description: "Please enter your full name.",
                variant: "destructive",
                duration: 2000
            });
            return false;
        }

        if (!formData.email.trim()) {
            toast({
                title: "Email Required",
                description: "Please enter your email address.",
                variant: "destructive",
                duration: 2000
            });
            return false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email.trim())) {
            toast({
                title: "Invalid Email",
                description: "Please enter a valid email address.",
                variant: "destructive",
                duration: 2000
            });
            return false;
        }

        if (!formData.wallet.trim()) {
            toast({
                title: "Wallet Required",
                description: "Please enter your wallet address.",
                variant: "destructive",
                duration: 2000
            });
            return false;
        }

        if (!isAddress(formData.wallet.trim())) {
            toast({
                title: "Invalid Wallet",
                description: "Please enter a valid EVM wallet address.",
                variant: "destructive",
                duration: 2000
            });
            return false;
        }

        if (!formData.social.trim()) {
            toast({
                title: "Social Required",
                description: "Please enter your social links.",
                variant: "destructive",
                duration: 2000
            });
            return false;
        }

        return true;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) return;

        setIsSubmitting(true);

        try {
            const response = await fetch(import.meta.env.VITE_WHITELIST_GOOGLE_SCRIPT_URL, {
                method: "POST",
                body: JSON.stringify(formData),
            });

            const result = await response.json();

            if (result.result === "success") {
                setFormData({ name: "", email: "", wallet: "", social: "" });
                toast({
                    title: "Success!",
                    description:
                        "You've been added to our Whitelist. We'll be in touch soon!",
                    duration: 2000
                });
            } else if (result.result === "already_registered") {
                toast({
                    title: "Already Registered",
                    description: "This email is already on our Whitelist.",
                    variant: "destructive",
                    duration: 2000
                });
            } else {
                throw new Error(result.message || "Unknown error");
            }
        } catch (error) {
            console.log(error);
            toast({
                title: "Success!",
                description:
                    "You've been added to our Whitelist. We'll be in touch soon!",
                duration: 2000
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleLogoClick = () => {
        navigate("/");
    };

    return (
        <section
            id="Whitelist"
            className="col-center py-20 bg-gradient-to-br from-sky-50 via-white to-sky-100"
        >
            <div className="w-full max-w-[1440px] between-center px-6 py-3 border-b border-sky-700/30 fixed z-50 top-0 backdrop-blur-xl max-lg:px-6 max-lg:py-4">
                <img
                    src="/logo.png"
                    alt="Bluelink Blockchain"
                    className="transition-animation h-10"
                    onClick={handleLogoClick}
                />

                <ConnectButton.Custom>
                    {({
                        account,
                        chain,
                        openAccountModal,
                        openChainModal,
                        openConnectModal,
                        authenticationStatus,
                        mounted,
                    }) => {
                        const ready = mounted && authenticationStatus !== "loading";
                        const connected =
                            ready &&
                            account &&
                            chain &&
                            (!authenticationStatus || authenticationStatus === "authenticated");

                        return (
                            <div
                                {...(!ready && {
                                    "aria-hidden": true,
                                    style: {
                                        opacity: 0,
                                        pointerEvents: "none",
                                        userSelect: "none",
                                        height: "100%",
                                    },
                                })}
                            >
                                {(() => {
                                    if (!connected) {
                                        return (
                                            <button
                                                onClick={openConnectModal}
                                                type="button"
                                                className="connect-button w-full h-full"
                                            >
                                                Connect Wallet
                                                <FiArrowUpRight className={`${isConnected ? "hidden" : ""}`} />
                                            </button>
                                        );
                                    }

                                    if (chain.unsupported) {
                                        return (
                                            <button onClick={openChainModal} type="button">
                                                Wrong network
                                            </button>
                                        );
                                    }

                                    return (
                                        <div
                                            style={{
                                                display: "flex",
                                                justifyContent: "center",
                                                alignItems: "center",
                                                gap: 8,
                                            }}
                                        >
                                            <button
                                                onClick={openChainModal}
                                                className="transition-animation icon-chain"
                                                type="button"
                                            >
                                                {chain.hasIcon && chain.iconUrl && (
                                                    <img
                                                        alt={chain.name ?? "Chain icon"}
                                                        src={chain.iconUrl}
                                                        className="icon-chain"
                                                    />
                                                )}
                                            </button>

                                            <button
                                                onClick={openAccountModal}
                                                type="button"
                                                className="connect-button"
                                            >
                                                {account.displayName}
                                                {account.displayBalance && `(${account.displayBalance})`}
                                            </button>
                                        </div>
                                    );
                                })()}
                            </div>
                        );
                    }}
                </ConnectButton.Custom>
            </div>

            <div className="container mx-auto px-6 mt-8">
                <div className="text-center mb-8 animate-fade-in">
                    <h2
                        className="text-4xl font-bold text-sky-600 mb-4 animate-pulse"
                    >
                        {" "}
                        Join Our Exclusive Whitelist
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Be among the first to access BlueLink Blockchain Services Ltd ecosystem.
                        Get early investor opportunities and exclusive updates.
                    </p>
                </div>

                <div className="row-center gap-4 mb-8 max-sm:grid max-sm:grid-cols-2">
                    <div className="whitelist-btn" onClick={() => { window.open("https://www.bluelinkblockchain.com/", "_blank") }}>
                        Website
                    </div>
                    <div className="whitelist-btn" onClick={() => { window.open("https://exchange.bluelinkblockchain.com/", "_blank") }}>
                        Exchange
                    </div>
                    <div className="whitelist-btn" onClick={() => { window.open("https://test-explorer.bluelinkblockchain.com/", "_blank") }}>
                        Blockchain Testnet
                    </div>
                    <div className="whitelist-btn" onClick={() => { window.open("https://test-faucet.bluelinkblockchain.com/", "_blank") }}>
                        Testnet Faucet
                    </div>
                </div>

                <div className="max-w-2xl mx-auto animate-scale-in">
                    <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
                        <CardHeader className="text-center pb-8">
                            <CardTitle className="text-2xl text-gray-900">
                                Early Access Registration
                            </CardTitle>
                            <CardDescription className="text-gray-600">
                                Secure your spot in the future of digital finance
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <InputField
                                    icon={User}
                                    id="name"
                                    label="Full Name *"
                                    name="name"
                                    type="text"
                                    placeholder="Enter your full name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    disabled={isSubmitting}
                                />
                                <InputField
                                    icon={Mail}
                                    id="email"
                                    label="Email Address *"
                                    name="email"
                                    type="email"
                                    placeholder="Enter your email address"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    disabled={isSubmitting}
                                />
                                <InputField
                                    icon={Wallet}
                                    id="wallet"
                                    label="Wallet Address *"
                                    name="wallet"
                                    placeholder="Enter your wallet address"
                                    type="text"
                                    value={formData.wallet}
                                    onChange={handleInputChange}
                                    disabled={isSubmitting}
                                />
                                <InputField
                                    icon={Link}
                                    id="social"
                                    label="Social Links *"
                                    name="social"
                                    type="text"
                                    placeholder="LinkedIn, Twitter, Telegram, etc."
                                    value={formData.social}
                                    onChange={handleInputChange}
                                    disabled={isSubmitting}
                                />

                                <Button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed animate-fade-in"
                                >
                                    {isSubmitting ? "Submitting..." : "Join Whitelist"}
                                </Button>
                            </form>

                            <div className="mt-6 text-center animate-fade-in">
                                <p className="text-sm text-gray-500">
                                    By joining our Whitelist, you agree to receive updates about
                                    BlueLink Blockchain Services Ltd.
                                </p>
                            </div>

                            <div className="row-center gap-4 mt-6">
                                <a
                                    href="https://x.com/Bluelink2025"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Twitter"
                                >
                                    <RiTwitterLine className="text-2xl text-sky-500 hover:text-teal-400 transition" />
                                </a>
                                <a
                                    href="https://www.linkedin.com/company/bluelink-blockchain-services"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="LinkedIn"
                                >
                                    <RiLinkedinLine className="text-2xl text-sky-500 hover:text-teal-400 transition" />
                                </a>
                                <a
                                    href="https://www.instagram.com/bluelinkblockchain/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Instagram"
                                >
                                    <RiInstagramLine className="text-2xl text-sky-500 hover:text-teal-400 transition" />
                                </a>
                                <a
                                    href="https://github.com/BlueLink-Blockchain-Services"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="GitHub"
                                >
                                    <RiGithubLine className="text-2xl text-sky-500 hover:text-teal-400 transition" />
                                </a>
                                <a
                                    href="https://t.me/bluelinkblockchain"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Telegram"
                                >
                                    <RiTelegramLine className="text-2xl text-sky-500 hover:text-teal-400 transition" />
                                </a>
                                <a
                                    href="https://discord.gg/GNMtz5Jz"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Discord"
                                >
                                    <RiDiscordLine className="text-2xl text-sky-500 hover:text-teal-400 transition" />
                                </a>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>
    );
};

// Reusable Form Input
const InputField = ({ icon: Icon, ...props }: any) => (
    <div className="space-y-2 animate-fade-in">
        <Label
            htmlFor={props.id}
            className="text-sm font-medium text-gray-700 flex items-center"
        >
            <Icon className="h-4 w-4 mr-2" />
            {props.label}
        </Label>
        <Input
            {...props}
            className="h-12 border-sky-200 focus:border-blue-500 focus:ring-blue-500 bg-white"
        />
    </div>
);

export default Whitelist;
