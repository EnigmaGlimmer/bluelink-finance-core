import { useNavigate } from 'react-router-dom';

import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import CountdownTimer from './CountdownTimer';

import {
    RiTwitterLine,
    RiTelegramLine,
    RiDiscordLine,
} from "react-icons/ri";
import { ExternalLink, Shield, Users, Lock, CheckCircle, Globe, Search } from 'lucide-react';

import { Assets } from '@/assets';

const FairLaunch = () => {
    const navigate = useNavigate();

    const features = [
        {
            icon: <Users className="h-5 w-5" />,
            title: "No Whitelist",
            description: "Open to everyone — equal access for all"
        },
        {
            icon: <CheckCircle className="h-5 w-5" />,
            title: "Fixed Entry Price",
            description: "Same price for all participants"
        },
        {
            icon: <Lock className="h-5 w-5" />,
            title: "Liquidity Locked",
            description: "51% locked for 10 years (3650 days)"
        },
        {
            icon: <Shield className="h-5 w-5" />,
            title: "Audited & KYC",
            description: "Fully certified by SolidProof"
        }
    ];

    const handleInvestClick = () => {
        navigate("/vesting");
    };

    return (
        <div id="pinksale" className="min-h-screen bg-background relative overflow-hidden bg-opacity-10 bg-gradient-to-br from-sky-50 to-sky-100 py-8">
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-hero opacity-30" />

            <div className="relative z-10 container mx-auto px-4 py-12">
                {/* Countdown Timer */}
                <div className="mb-12">
                    <CountdownTimer />
                </div>

                {/* CTA Section with PinkSale */}
                <div className="text-center mb-12">
                    <Card className="inline-block p-6 bg-gradient-to-br from-sky-50 to-sky-50 backdrop-blur-sm border-sky-200/50 shadow-xl max-w-md mx-auto">
                        <div className="flex items-center justify-center gap-2 mb-4">
                            <img src={Assets.pinkIcon} className='w-8 h-8' />
                            <h3 className="text-xl font-bold text-sky-800">
                                Join FairLaunch
                            </h3>
                        </div>
                        <p className="text-slate-600 mb-5 text-sm">
                            Participate in the most transparent and fair token launch in DeFi
                        </p>
                        <a
                            href="https://www.pinksale.finance/launchpad/ethereum/0x1f9c5a008c55Ede9D55b35Bae0d2e6deEDC60291"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover-scale text-sm"
                        >
                            <ExternalLink className="h-4 w-4" />
                            Launch on PinkSale
                        </a>
                        <div className="mx-auto flex flex-row gap-3 justify-center mt-4">
                            <a
                                href="https://x.com/Bluelink2025"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Twitter"
                            >
                                <RiTwitterLine className="text-2xl text-sky-500 hover:text-teal-400 transition" />
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
                    </Card>
                </div>

                {/* Verification & Products Section */}
                <div className="grid grid-cols-[1fr_1fr] gap-12 max-w-5xl mx-auto mb-8">
                    {/* Company Registration & Audit */}
                    <Card className="p-6 bg-white/95 backdrop-blur-sm border-sky-200 shadow-lg w-full">
                        <div className="flex items-center justify-center gap-2 mb-5">
                            <Shield className="h-5 w-5 text-green-600" />
                            <h3 className="text-lg font-bold text-slate-800">
                                Verified & Audited
                            </h3>
                        </div>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="text-center">
                                <div className="flex items-center gap-2 justify-center mb-2">
                                    <Globe className="h-4 w-4 text-blue-600" />
                                    <p className="font-medium text-slate-700 text-sm">Company Registration</p>
                                </div>
                                <a
                                    href="https://www.bvifsc.vg/certificate-validation?qrCode=18590ACEDB"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1 px-3 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-md transition-colors duration-200 text-sm story-link"
                                >
                                    BVI License Validation <ExternalLink className="h-3 w-3" />
                                </a>
                            </div>
                            <div className="text-center">
                                <div className="flex items-center gap-2 justify-center mb-2">
                                    <Shield className="h-4 w-4 text-green-600" />
                                    <p className="font-medium text-slate-700 text-sm">Security Audit</p>
                                </div>
                                <a
                                    href="https://app.solidproof.io/projects/bluelink"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1 px-3 py-2 bg-green-50 hover:bg-green-100 text-green-700 rounded-md transition-colors duration-200 text-sm story-link"
                                >
                                    SolidProof Audit & KYC <ExternalLink className="h-3 w-3" />
                                </a>
                            </div>
                        </div>
                    </Card>

                    {/* Live Products */}
                    <Card className="p-6 bg-white/95 backdrop-blur-sm border-sky-200 shadow-lg w-full">
                        <div className="flex items-center justify-center gap-2 mb-5">
                            <Search className="h-5 w-5 text-purple-600" />
                            <h3 className="text-lg font-bold text-slate-800">
                                Live Products on Testnet
                            </h3>
                        </div>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="text-center">
                                <div className="flex items-center gap-2 justify-center mb-2">
                                    <ExternalLink className="h-4 w-4 text-purple-600" />
                                    <p className="font-medium text-slate-700 text-sm">BlueLink Exchange</p>
                                </div>
                                <a
                                    href="https://exchange.bluelinkblockchain.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1 px-3 py-2 bg-purple-50 hover:bg-purple-100 text-purple-700 rounded-md transition-colors duration-200 text-sm story-link"
                                >
                                    Try Live Exchange <ExternalLink className="h-3 w-3" />
                                </a>
                            </div>
                            <div className="text-center">
                                <div className="flex items-center gap-2 justify-center mb-2">
                                    <Search className="h-4 w-4 text-indigo-600" />
                                    <p className="font-medium text-slate-700 text-sm">Blockchain Explorer</p>
                                </div>
                                <a
                                    href="https://test-explorer.bluelinkblockchain.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1 px-3 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-md transition-colors duration-200 text-sm story-link"
                                >
                                    Explore Testnet <ExternalLink className="h-3 w-3" />
                                </a>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Features Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12 max-w-6xl mx-auto">
                    {features.map((feature, index) => (
                        <Card
                            key={feature.title}
                            className="p-4 bg-white/90 backdrop-blur-sm border-sky-200 hover:bg-white hover:shadow-md transition-all duration-300 animate-slide-up"
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            <div className="flex items-center gap-2 mb-2">
                                <div className="text-blue-600">
                                    {feature.icon}
                                </div>
                                <h3 className="font-semibold text-slate-800 text-sm">{feature.title}</h3>
                            </div>
                            <p className="text-xs text-slate-600">{feature.description}</p>
                        </Card>
                    ))}
                </div>

                <div
                    className="text-center mt-4 md:mt-8 xl:mt-12 text-sky-900 cursor-pointer hover:text-sky-500 transition-colors"
                    onClick={handleInvestClick}
                >
                    <span className="text-lg font-medium">Your Bluelink Assets →</span>
                </div>
            </div>
        </div >
    );
};

export default FairLaunch;
