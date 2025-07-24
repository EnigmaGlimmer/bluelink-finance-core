import { Button } from "@/components/ui/button";
import { ArrowRight, TrendingUp, Shield, Globe, ArrowDown } from "lucide-react";

const Hero = () => {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

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
        <p className="text-lg md:text-xl mb-12 max-w-4xl mx-auto text-gray-700 animate-fade-in delay-300 leading-relaxed">
          <span className="text-blue-600 font-semibold">
            BlueLink Blockchain Services{" "}
          </span>{" "}
          presents a regulated ecosystem combining exchange operations,
          tokenized stocks, and blockchain banking infrastructure powered by BLT
          token.
        </p>

        {/* Key Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-5xl mx-auto">
          <div className="bg-white/70 backdrop-blur-lg rounded-2xl p-8 border border-sky-200 animate-fade-in hover:bg-white/80 transition-all duration-300 hover:transform hover:scale-105 shadow-lg">
            <TrendingUp className="h-10 w-10 mx-auto mb-4 text-blue-600" />
            <div className="text-3xl font-bold text-gray-900 mb-2">$56M+</div>
            <div className="text-sm text-gray-600 uppercase tracking-wider">
              Target Raise
            </div>
          </div>
          <div className="bg-white/70 backdrop-blur-lg rounded-2xl p-8 border border-sky-200 animate-fade-in hover:bg-white/80 transition-all duration-300 hover:transform hover:scale-105 shadow-lg">
            <Shield className="h-10 w-10 mx-auto mb-4 text-emerald-500" />
            <div className="text-3xl font-bold text-gray-900 mb-2">
              Regulated
            </div>
            <div className="text-sm text-gray-600 uppercase tracking-wider">
              Dubai & BVI
            </div>
          </div>
          <div className="bg-white/70 backdrop-blur-lg rounded-2xl p-8 border border-sky-200 animate-fade-in hover:bg-white/80 transition-all duration-300 hover:transform hover:scale-105 shadow-lg">
            <Globe className="h-10 w-10 mx-auto mb-4 text-sky-500" />
            <div className="text-3xl font-bold text-gray-900 mb-2">Welcome</div>
            <div className="text-sm text-gray-600 uppercase tracking-wider">
              Early Investors
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="flex flex-col lg:flex-row gap-3 lg:gap-6 justify-center items-center animate-fade-in delay-1000">
          <Button
            size="lg"
            onClick={() => scrollToSection("#Whitelist")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-3000 hover:scale-105 animate-pulse ring-2 ring-blue-400/50"
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
            <a href="https://app.solidproof.io/projects/bluelink" download className="inline-flex items-center justify-center">
              Audit Report
              <ArrowDown className="ml-3 h-5 w-5" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;