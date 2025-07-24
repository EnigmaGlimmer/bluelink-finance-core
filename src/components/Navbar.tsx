
import { useState, useEffect } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Button } from "@/components/ui/button";
import { Menu, X, ArrowRight } from "lucide-react";
import whitepaper from ".././assets/docs/BlueLink_Whitepaper.pdf";
import "@/assets/css/home/navbar.css";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPresaleModalOpen, setIsPresaleModalOpen] = useState(false);
  const [isConnected, setConnected] = useState(false);

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
                  src="/logo.png"
                  alt="BlueLink Logo"
                  className="h-10 w-auto"
                />
              </a>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden xl:flex items-center space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className="text-slate-700 hover:text-blue-600 font-medium transition-colors duration-200"
                >
                  {item.name}
                </button>
              ))}
              <a
                href={whitepaper}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-700 hover:text-blue-600 font-medium transition-colors duration-200"
              >
                White Paper
              </a>
            </div>

            <div className="xy-center gap-3 sm:gap-4">
              <ConnectButton.Custom>
                {({
                  account,
                  chain,
                  openAccountModal,
                  openChainModal,
                  openConnectModal,
                  authenticationStatus,
                  mounted,
                }) => {
                  const ready = mounted && authenticationStatus !== "loading";
                  const connected =
                    ready &&
                    account &&
                    chain &&
                    (!authenticationStatus ||
                      authenticationStatus === "authenticated");

                  useEffect(() => {
                    setConnected(connected);
                  }, [connected]);

                  return (
                    <div
                      {...(!ready && {
                        "aria-hidden": true,
                        style: {
                          opacity: 0,
                          pointerEvents: "none",
                          userSelect: "none",
                          height: "100%",
                        },
                      })}
                    >
                      {(() => {
                        if (!connected) {
                          return (
                            <button
                              onClick={openConnectModal}
                              type="button"
                              className="connect-button w-full h-full"
                            >
                              Connect Wallet
                              <ArrowRight className={`w-3 h-3 lg:w-4 lg:h-4 xl:w-6 xl:h-6 ${isConnected && "hidden"}`} />
                            </button>
                          );
                        }

                        if (chain.unsupported) {
                          return (
                            <button onClick={openChainModal} type="button">
                              Wrong network
                            </button>
                          );
                        }

                        return (
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              gap: 8
                            }}
                          >
                            <button
                              onClick={openChainModal}
                              className="transition-animation icon-chain"
                              type="button"
                            >
                              {chain.hasIcon && (
                                chain.iconUrl && (
                                  <img
                                    alt={chain.name ?? "Chain icon"}
                                    src={chain.iconUrl}
                                    className="icon-chain"
                                  />
                                )
                              )}
                            </button>

                            <button
                              onClick={openAccountModal}
                              type="button"
                              className="connect-button"
                            >
                              {account.displayName}
                              {account.displayBalance
                                && `(${account.displayBalance})`}
                            </button>
                          </div>
                        );
                      })()}
                    </div>
                  );
                }}
              </ConnectButton.Custom>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="xl:hidden text-slate-700"
              >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isOpen && (
            <div className="xl:hidden py-4 border-t border-slate-200">
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
                <a
                  href={whitepaper}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-700 hover:text-blue-600 font-medium transition-colors duration-200"
                >
                  White Paper
                </a>
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
