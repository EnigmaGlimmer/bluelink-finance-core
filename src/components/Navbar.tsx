
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, ArrowRight } from "lucide-react";
import PresaleModal from "./PresaleModal";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPresaleModalOpen, setIsPresaleModalOpen] = useState(false);

  const navItems = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Features", href: "#features" },
    { name: "Presale", href: "#presale" },
    { name: "Whitelist", href: "#Whitelist" },
    { name: "Tokenomics", href: "#tokenomics" },
    { name: "Roadmap", href: "#roadmap" },
    { name: "FAQ", href: "#faq" },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsOpen(false);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-blue-100 backdrop-blur-md border-b border-slate-200 shadow-sm">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <a href="#">
              <img 
                src="/image/73ed770f-97f5-48ce-82da-40ff54317af3.png" 
                alt="BlueLink Logo" 
                className="h-10 w-auto"
              />
              </a>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className="text-slate-700 hover:text-blue-600 font-medium transition-colors duration-200"
                >
                  {item.name}
                </button>
              ))}
            </div>

            {/* CTA Button */}
            <div className="hidden lg:flex">
              <Button 
                onClick={()=>scrollToSection('#presale')}
                className="bg-blue-500 hover:bg-blue-600 text-white shadow-md hover:shadow-lg transition-all duration-200"
              >
                Join Presale
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 text-slate-700"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isOpen && (
            <div className="lg:hidden py-4 border-t border-slate-200">
              <div className="flex flex-col space-y-4">
                {navItems.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => scrollToSection(item.href)}
                    className="text-left text-slate-700 hover:text-blue-600 font-medium py-2"
                  >
                    {item.name}
                  </button>
                ))}
                <Button 
                  onClick={()=>scrollToSection('#presale')}
                  className="bg-blue-600 hover:bg-blue-700 text-white mt-4"
                >
                  Join Presale
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Presale Modal */}
      <PresaleModal 
        isOpen={isPresaleModalOpen} 
        onClose={() => setIsPresaleModalOpen(false)} 
      />
    </>
  );
};

export default Navbar;
