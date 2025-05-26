
import { Button } from "@/components/ui/button";
import { ArrowRight, TrendingUp, Shield, Globe } from "lucide-react";

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Professional Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800"></div>
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.03"%3E%3Ccircle cx="30" cy="30" r="1"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
      </div>
      
      {/* Subtle animated elements */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyan-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      
      <div className="relative z-10 container mx-auto px-6 text-center text-white">
        {/* Company Logo */}
        <div className="mb-8 flex justify-center">
          <img 
            src="/lovable-uploads/73ed770f-97f5-48ce-82da-40ff54317af3.png" 
            alt="BlueLink Logo" 
            className="h-24 w-auto animate-fade-in drop-shadow-lg"
          />
        </div>

        {/* Main Heading */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 animate-fade-in leading-tight">
          The Future of
          <span className="block bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
            Digital Finance
          </span>
        </h1>

        {/* Highlighted Tagline */}
        <div className="mb-8 animate-fade-in delay-200">
          <p className="text-xl md:text-2xl font-semibold text-blue-300 mb-2">
            "Today's Success, <span className="text-cyan-300 font-bold">Tomorrow's Solution</span>"
          </p>
        </div>

        {/* Professional Subtitle */}
        <p className="text-lg md:text-xl mb-12 max-w-4xl mx-auto text-gray-200 animate-fade-in delay-300 leading-relaxed">
          BlueLink Blockchain Foundation presents a regulated ecosystem combining exchange operations, 
          tokenized stocks, and blockchain banking infrastructure powered by BLINK token.
        </p>

        {/* Key Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-5xl mx-auto">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 animate-fade-in delay-500 hover:bg-white/15 transition-all duration-300">
            <TrendingUp className="h-10 w-10 mx-auto mb-4 text-blue-400" />
            <div className="text-3xl font-bold text-white mb-2">$57M+</div>
            <div className="text-sm text-gray-300 uppercase tracking-wider">Target Raise</div>
          </div>
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 animate-fade-in delay-700 hover:bg-white/15 transition-all duration-300">
            <Shield className="h-10 w-10 mx-auto mb-4 text-green-400" />
            <div className="text-3xl font-bold text-white mb-2">Regulated</div>
            <div className="text-sm text-gray-300 uppercase tracking-wider">Dubai & Cayman</div>
          </div>
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 animate-fade-in delay-900 hover:bg-white/15 transition-all duration-300">
            <Globe className="h-10 w-10 mx-auto mb-4 text-cyan-400" />
            <div className="text-3xl font-bold text-white mb-2">10,000+</div>
            <div className="text-sm text-gray-300 uppercase tracking-wider">TPS Blockchain</div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-fade-in delay-1000">
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
            Join Presale
            <ArrowRight className="ml-3 h-5 w-5" />
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="border-2 border-white/30 text-white hover:bg-white/10 px-10 py-4 text-lg font-semibold rounded-xl backdrop-blur-sm transition-all duration-300"
          >
            Read Whitepaper
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
