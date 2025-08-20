import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { ArrowRight, TrendingUp, Shield, Globe, ArrowDown, ExternalLink } from "lucide-react";
import { FiArrowRight } from "react-icons/fi";

const Hero = () => {
  const navigate = useNavigate();

  const handleVestingClick = () => {
    navigate("/vesting");
  }

  return (
    <section
      id="home"
      className="pb-12 relative min-h-screen flex items-center justify-center overflow-hidden pt-16 bg-gradient-to-br from-sky-50 via-sky-100 to-sky-200"
    >
      {/* Subtle animated elements */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-sky-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>

      <div className="relative z-10 container mx-auto px-6 text-center">
        {/* Main Heading */}
        <h1 className="text-4xl text-sky-300 md:text-6xl lg:text-7xl font-bold mb-6 animate-fade-in leading-tight text-gray-900">
          The Future of
          <span className="block bg-gradient-to-r from-blue-600 to-sky-200 bg-clip-text text-transparent">
            Digital Finance
          </span>
        </h1>

        {/* Highlighted Tagline */}
        <div className="mb-8 animate-fade-in delay-200">
          <p className="text-xl md:text-2xl font-semibold text-blue-700 mb-2">
            "<span className="text-blue-600 font-bold">Today's Success</span>,{" "}
            <span className="text-sky-600 font-bold">Tomorrow's Solution</span>"
          </p>
        </div>

        {/* Professional Subtitle */}
        <p className="text-lg md:text-xl mb-8 max-w-4xl mx-auto text-gray-700 animate-fade-in delay-300 leading-relaxed">
          <span className="text-blue-600 font-semibold">
            BlueLink Blockchain Services Ltd{" "}
          </span>{" "}
          presents a regulated ecosystem combining exchange operations,
          tokenized stocks, and blockchain banking infrastructure powered by BLT
          token.
        </p>

        {/* Key Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-5xl mx-auto">
          <div className="flex flex-col items-center justify-center bg-white/70 backdrop-blur-lg rounded-2xl p-8 border border-sky-200 animate-fade-in hover:bg-white/80 transition-all duration-300 hover:transform shadow-lg">
            <TrendingUp className="h-6 w-10 mx-auto mb-4 text-blue-600" />
            <div className="text-3xl font-bold text-gray-900 mb-2">$56M+</div>
            <div className="text-sm text-gray-600 uppercase tracking-wider">
              Target Raise
            </div>
          </div>
          <div className="bg-white/70 flex flex-col items-center justify-center backdrop-blur-lg rounded-2xl p-8 border border-sky-200 animate-fade-in hover:bg-white/80 transition-all duration-300 hover:transform shadow-lg">
            <Shield className="h-6 w-10 mx-auto mb-4 text-emerald-500" />
            <div className="text-3xl font-bold text-gray-900 mb-4">
              Regulated
            </div>
            <div className="text-sm text-gray-600 uppercase tracking-wider">
              BVI Registered
            </div>
          </div>
          <div className="flex flex-col items-center justify-center bg-white/70 backdrop-blur-lg rounded-2xl p-8 border border-sky-200 animate-fade-in hover:bg-white/80 transition-all duration-300 hover:transform shadow-lg">
            <Globe className="h-6 w-10 mx-auto mb-4 text-sky-500" />
            <div className="text-3xl font-bold text-gray-900 mb-2">Welcome</div>
            <div className="text-sm text-gray-600 uppercase tracking-wider">
              Early Investors
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="flex flex-col lg:flex-row gap-3 lg:gap-6 justify-center items-center animate-fade-in delay-1000 mb-8">
          <Button
            size="lg"
            onClick={() => { navigate("/whitelist") }}
            className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 text-lg font-semibold rounded-xl shadow-xl hover:shadow-2xl transition-all duration-3000 hover:scale-105 animate-pulse ring-4 ring-blue-400/50"
          >
            Join Whitelist
            <ArrowRight className="ml-3 h-5 w-5" />
          </Button>
          <Button
            size="lg"
            rel="noopener noreferrer"
            className="whitespace-nowrap border-2 bg-white border-sky-200 text-sky-700 hover:bg-sky-50 px-10 py-4 text-lg font-semibold rounded-xl backdrop-blur-sm transition-all duration-300 hover:border-sky-300 shadow-md"
          >
            <a href="/BlueLink_Whitepaper.pdf" download className="inline-flex items-center justify-center">
              White Paper
              <ArrowDown className="ml-3 h-5 w-5" />
            </a>
          </Button>
          <Button
            size="lg"
            rel="noopener noreferrer"
            className="whitespace-nowrap border-2 bg-white border-sky-200 text-sky-700 hover:bg-sky-50 px-10 py-4 text-lg font-semibold rounded-xl backdrop-blur-sm transition-all duration-300 hover:border-sky-300 shadow-md"
          >
            <a href="https://app.solidproof.io/projects/bluelink" target="_blank" className="inline-flex items-center justify-center">
              Audit Report
              <ArrowDown className="ml-3 h-5 w-5" />
            </a>
          </Button>
        </div>

        <div className="flex justify-center">
          <div className="flex flex-col lg:flex-row gap-3 lg:gap-6 justify-center items-center rounded-xl bg-sky-100 backdrop-blur-2xl w-fit px-10 py-5 border border-sky-200">
            <a
              href="https://www.bvifsc.vg/certificate-validation?qrCode=18590ACEDB"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 px-3 py-2 bg-blue-50 hover:bg-blue-100 border-blue-100 border text-blue-700 rounded-md transition-colors duration-200 text-sm story-link"
            >
              BVI License Validation <ExternalLink className="h-3 w-3" />
            </a>

            <a
              href="https://app.solidproof.io/projects/bluelink"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 px-3 py-2 bg-green-50 hover:bg-green-100 border-green-100 border text-green-700 rounded-md transition-colors duration-200 text-sm story-link"
            >
              SolidProof Audit & KYC <ExternalLink className="h-3 w-3" />
            </a>

            <a
              href="https://exchange.bluelinkblockchain.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 px-3 py-2 bg-purple-50 hover:bg-purple-100 border-purple-100 border text-purple-700 rounded-md transition-colors duration-200 text-sm story-link"
            >
              Try Live Exchange <ExternalLink className="h-3 w-3" />
            </a>

            <a
              href="https://test-explorer.bluelinkblockchain.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 px-3 py-2 bg-indigo-50 hover:bg-indigo-100 border border-indigo-100 text-indigo-700 rounded-md transition-colors duration-200 text-sm story-link"
            >
              Explore Testnet <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </div>
        <div
          className="text-center mt-4 md:mt-8 text-sky-900 cursor-pointer hover:text-sky-500 transition-colors"
          onClick={handleVestingClick}
        >
          <span className="text-lg font-semibold flex items-center justify-center gap-2">
            Your Bluelink Assets
            <FiArrowRight className="w-4 h-4" />
          </span>
        </div>
      </div>
    </section>
  );
};

export default Hero;