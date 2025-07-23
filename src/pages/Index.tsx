
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Tokenomics from "@/components/Tokenomics";
import Roadmap from "@/components/Roadmap";
import Features from "@/components/Features";
import Presale from "@/components/Presale";
import About from "@/components/About";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import Whitelist from "@/components/Whitelist";
import SaleOverview from "@/components/SaleOverview";
import PurchaseProgressModal from "@/components/TokenSale/PurchaseProgressModal";
import { useModal } from "@/store/modalContext";
import { PurchaseStatus, PaymentMethods } from "@/utils/constants";

const Index = () => {
  const {
    showPurchaseModal,
    purchaseStatus,
    payMethod,
    closePurchaseModal,
  } = useModal();

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <SaleOverview />
      <About />
      <Features />
      <Presale />
      <Whitelist />
      <Tokenomics />
      <Roadmap />
      <FAQ />
      <Footer />

      <PurchaseProgressModal
        isOpen={showPurchaseModal}
        status={purchaseStatus as keyof typeof PurchaseStatus}
        payMethod={payMethod as keyof typeof PaymentMethods}
        onClose={closePurchaseModal}
      />
    </div>
  );
};

export default Index;
