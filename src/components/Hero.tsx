
import { Button } from "@/components/ui/button";
import { ArrowRight, TrendingUp, Shield, Globe } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-400"></div>
      <div className="absolute inset-0 bg-black/10"></div>
      
      {/* Animated Background Shapes */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-300/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      
      <div className="relative z-10 container mx-auto px-6 text-center text-white">
        {/* Logo */}
        <div className="mb-8 flex justify-center">
          <img 
            src="/lovable-uploads/73ed770f-97f5-48ce-82da-40ff54317af3.png" 
            alt="BlueLink Logo" 
            className="h-20 w-auto animate-fade-in"
          />
        </div>

        {/* Main Heading */}
        <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
          The Future of
          <span className="block bg-gradient-to-r from-cyan-300 to-white bg-clip-text text-transparent">
            Digital Finance
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90 animate-fade-in delay-300">
          BlueLink combines regulated exchange operations, tokenized stocks, and blockchain banking 
          into one unified ecosystem powered by BLINK token.
        </p>

        {/* Key Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto">
          <div className="bg-white/20 backdrop-blur-md rounded-xl p-6 animate-fade-in delay-500">
            <TrendingUp className="h-8 w-8 mx-auto mb-3 text-cyan-300" />
            <div className="text-2xl font-bold">$57M+</div>
            <div className="text-sm opacity-80">Target Raise</div>
          </div>
          <div className="bg-white/20 backdrop-blur-md rounded-xl p-6 animate-fade-in delay-700">
            <Shield className="h-8 w-8 mx-auto mb-3 text-cyan-300" />
            <div className="text-2xl font-bold">Regulated</div>
            <div className="text-sm opacity-80">Dubai & Cayman</div>
          </div>
          <div className="bg-white/20 backdrop-blur-md rounded-xl p-6 animate-fade-in delay-900">
            <Globe className="h-8 w-8 mx-auto mb-3 text-cyan-300" />
            <div className="text-2xl font-bold">10,000+</div>
            <div className="text-sm opacity-80">TPS Blockchain</div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in delay-1000">
          <Button size="lg" className="bg-cyan-500 hover:bg-cyan-600 text-white px-8 py-4 text-lg">
            Join Presale
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 text-lg">
            Read Whitepaper
          </Button>
        </div>

        {/* Tagline */}
        <p className="mt-8 text-lg font-medium opacity-90 animate-fade-in delay-1200">
          "Today's Success, Tomorrow's Solution"
        </p>
      </div>
    </section>
  );
};

export default Hero;
