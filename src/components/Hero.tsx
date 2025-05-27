
import { Button } from "@/components/ui/button";
import { ArrowRight, TrendingUp, Shield, Globe, ArrowDown } from "lucide-react";
import { useState } from "react";
import PresaleModal from "./PresaleModal";
import whitepaper from ".././assets/BlueLink_Whitepaper_v12.pdf"

const Hero = () => {
  const [isPresaleModalOpen, setIsPresaleModalOpen] = useState(false);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Modern Professional Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900"></div>
      <div className="absolute inset-0">
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}></div>
      </div>
      
      {/* Subtle animated elements */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-indigo-400/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
      
      <div className="relative z-10 container mx-auto px-6 text-center text-white">
        {/* Company Logo */}
        {/* <div className="mb-8 flex justify-center">
          <img 
            src="/lovable-uploads/73ed770f-97f5-48ce-82da-40ff54317af3.png" 
            alt="BlueLink Logo" 
            className="h-24 w-auto animate-fade-in drop-shadow-2xl"
          />
        </div> */}

        {/* Main Heading */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 animate-fade-in leading-tight">
          The Future of
          <span className="block bg-gradient-to-r text-blue-300 bg-clip-text ">
            Digital Finance
          </span>
        </h1>

        {/* Highlighted Tagline */}
        <div className="mb-8 animate-fade-in delay-200">
          <p className="text-xl md:text-2xl font-semibold text-blue-200 mb-2">
            "<span className="text-blue-300 font-bold">Today's Success</span>, <span className="text-indigo-300 font-bold">Tomorrow's Solution</span>"
          </p>
        </div>

        {/* Professional Subtitle */}
        <p className="text-lg md:text-xl mb-12 max-w-4xl mx-auto text-gray-300 animate-fade-in delay-300 leading-relaxed">
          <span className="text-blue-400">BlueLink Blockchain Foundation </span> presents a regulated ecosystem combining exchange operations, 
          tokenized stocks, and blockchain banking infrastructure powered by BLT token.
        </p>

        {/* Key Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-5xl mx-auto">
          <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 animate-fade-in hover:bg-white/10 transition-all duration-300 hover:transform hover:scale-105">
            <TrendingUp className="h-10 w-10 mx-auto mb-4 text-blue-400" />
            <div className="text-3xl font-bold text-white mb-2">$56M+</div>
            <div className="text-sm text-gray-300 uppercase tracking-wider">Target Raise</div>
          </div>
          <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 animate-fade-in hover:bg-white/10 transition-all duration-300 hover:transform hover:scale-105">
            <Shield className="h-10 w-10 mx-auto mb-4 text-emerald-400" />
            <div className="text-3xl font-bold text-white mb-2">Regulated</div>
            <div className="text-sm text-gray-300 uppercase tracking-wider">Dubai & Cayman</div>
          </div>
          <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 animate-fade-in hover:bg-white/10 transition-all duration-300 hover:transform hover:scale-105">
            <Globe className="h-10 w-10 mx-auto mb-4 text-indigo-400" />
            <div className="text-3xl font-bold text-white mb-2">10,000+</div>
            <div className="text-sm text-gray-300 uppercase tracking-wider">TPS Blockchain</div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-fade-in delay-1000">
          <Button 
            size="lg" 
            // onClick={() => setIsPresaleModalOpen(true)}
            onClick={()=>scrollToSection('#presale')}
            className="bg-blue-500 hover:bg-blue-600 text-white px-10 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:transform hover:scale-105"
          >
            Join Presale
            <ArrowRight className="ml-3 h-5 w-5" />
          </Button>
          <a 
            href={whitepaper}
            target="_blank" 
            rel="noopener noreferrer"
            download
            className="inline-flex items-center bg-white justify-center border-2 border-white/20 text-black hover:bg-white/10 px-10 py-4 text-lg font-semibold rounded-xl backdrop-blur-sm transition-all duration-300 hover:border-white/40"          >
            Whitepaper
            <ArrowDown className="ml-3 h-5 w-5" />

          </a>
          <a
          href="#"
          onClick={(e) => e.preventDefault()} // prevents navigation
          className="inline-flex items-center justify-center border-2 border-white/20 text-black bg-white/30 text-opacity-50 cursor-not-allowed px-10 py-4 text-lg font-semibold rounded-xl backdrop-blur-sm transition-all duration-300"
          >
          Audit Report
         <ArrowDown className="ml-3 h-5 w-5" />
        </a>
        </div>
      </div>

      {/* Presale Modal */}
      <PresaleModal 
        isOpen={isPresaleModalOpen} 
        onClose={() => setIsPresaleModalOpen(false)} 
      />
    </section>
  );
};

export default Hero;
