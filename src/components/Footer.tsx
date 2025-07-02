import { Mail, MessageCircle, Twitter, Globe } from "lucide-react";
import privacyPolicyPdf from ".././assets/BlueLink_Privacy_Policy.pdf";
import termsOfServices from ".././assets/BlueLink_Terms_of_Service.pdf";
import riskDisclosure from ".././assets/BlueLink_Risk_Disclosure.pdf";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-sky-100 via-sky-200 to-sky-300 text-gray-800">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-fade-in">
          {/* Company Info */}
          <div className="md:col-span-1">
            <div className="flex items-center mb-4">
              <img
                src="/lovable-uploads/73ed770f-97f5-48ce-82da-40ff54317af3.png"
                alt="BlueLink Logo"
                className="h-8 w-auto mr-3"
              />
            </div>
            <p className="text-gray-700 mb-4 text-sm">
              Redefining global finance through blockchain innovation and
              regulatory excellence.
            </p>
            <p className="text-sm text-blue-600 font-semibold">
              "Today's Success, Tomorrow's Solution"
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-blue-700">
              Resources
            </h3>
            <ul className="space-y-2 text-sm">
              <li className="text-gray-700 hover:text-blue-600 transition-colors cursor-pointer">
                Whitepaper
              </li>
              <li className="text-gray-700 hover:text-blue-600 transition-colors cursor-pointer">
                Documentation
              </li>
              <li className="text-gray-700 hover:text-blue-600 transition-colors cursor-pointer">
                Audit Reports
              </li>
              <li className="text-gray-700 hover:text-blue-600 transition-colors cursor-pointer">
                Roadmap
              </li>
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-blue-700">
              Connect
            </h3>
            <div className="space-y-3 text-sm">
              <a
                href="mailto:info@bluelinkblockchain.com"
                target="_blank"
                rel="noopener noreferrer"
                title="Email Us"
                className="flex items-center hover:text-blue-600 transition-colors"
              >
                <Mail className="h-4 w-4 mr-2" />
                info@bluelinkblockchain.com
              </a>

              <a
                href="https://t.me/bluelinkblockchain"
                target="_blank"
                rel="noopener noreferrer"
                title="Join us on Telegram"
                className="flex items-center hover:text-blue-600 transition-colors"
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                Telegram
              </a>

              <a
                href="https://x.com/Bluelink2025"
                target="_blank"
                rel="noopener noreferrer"
                title="Follow us on X (Twitter)"
                className="flex items-center hover:text-blue-600 transition-colors"
              >
                <Twitter className="h-4 w-4 mr-2" />X (Twitter)
              </a>

              <a
                href="https://bluelinkblockchain.com"
                target="_blank"
                rel="noopener noreferrer"
                title="Visit our Website"
                className="flex items-center hover:text-blue-600 transition-colors"
              >
                <Globe className="h-4 w-4 mr-2" />
                Website
              </a>
            </div>
          </div>
        </div>

        {/* Legal Notice */}
        <div className="border-t border-sky-300 mt-8 pt-6 animate-fade-in">
          <div className="text-center mb-4">
            <p className="text-sm text-gray-600 mb-2">
              🇦🇪 Dubai Operations | 🇻🇬 BVI Legal Structure | Regulated &
              Compliant
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-sky-300 mt-6 pt-6 flex flex-col md:flex-row justify-between items-center animate-fade-in">
          <p className="text-gray-600 text-sm mb-4 md:mb-0">
            © 2025 BlueLink Blockchain Services. All rights reserved.
          </p>
          <div className="flex space-x-4">
            <a
              href={privacyPolicyPdf}
              target="_blank"
              className="text-gray-600 hover:text-blue-600 text-sm transition-colors"
            >
              Privacy
            </a>
            <a
              href={termsOfServices}
              target="_blank"
              className="text-gray-600 hover:text-blue-600 text-sm transition-colors"
            >
              Terms
            </a>
            <a
              href={riskDisclosure}
              target="_blank"
              className="text-gray-600 hover:text-blue-600 text-sm transition-colors"
            >
              Risk Disclosure
            </a>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-6 p-4 bg-white/50 rounded-lg animate-fade-in">
          <p className="text-xs text-gray-500 text-center leading-relaxed">
            <strong>Disclaimer:</strong> Cryptocurrency investments carry
            significant risk. Please consult with legal and financial advisors
            before participating.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
