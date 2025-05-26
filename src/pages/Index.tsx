
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Tokenomics from "@/components/Tokenomics";
import Roadmap from "@/components/Roadmap";
import Features from "@/components/Features";
import Presale from "@/components/Presale";
import About from "@/components/About";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <About />
      <Features />
      <Presale />
      <Tokenomics />
      <Roadmap />
      <FAQ />
      <Footer />
    </div>
  );
};

export default Index;
