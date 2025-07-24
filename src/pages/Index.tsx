
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Tokenomics from "@/components/Tokenomics";
import Roadmap from "@/components/Roadmap";
import Features from "@/components/Features";
import Presale from "@/components/Presale";
import About from "@/components/About";
import Team from "@/components/Team";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import Whitelist from "@/components/Whitelist";

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <About />
      <Features />
      <Presale />
      <Whitelist />
      <Tokenomics />
      <Roadmap />
      <Team/>
      <FAQ />
      <Footer />
    </div>
  );
};

export default Index;
