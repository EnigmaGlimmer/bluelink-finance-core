import { Mail, MessageCircle, Twitter, Globe } from "lucide-react";
<<<<<<< HEAD
import privacyPolicyPdf from ".././assets/BlueLink_Privacy_Policy.pdf";
import termsOfServices from ".././assets/BlueLink_Terms_of_Service.pdf";
import riskDisclosure from ".././assets/BlueLink_Risk_Disclosure.pdf";
=======
>>>>>>> 6720a2b495d36d334d75ce52185420d94ac01677

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-sky-50 via-sky-100 to-sky-200 text-gray-800">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-fade-in">
          {/* Company Info */}
          <div>
            <div className="flex items-center mb-4">
              <img
                src="/lovable-uploads/73ed770f-97f5-48ce-82da-40ff54317af3.png"
                alt="BlueLink Logo"
                className="h-8 w-auto mr-3"
              />
            </div>
<<<<<<< HEAD
            <p className="text-gray-700 mb-4 text-sm">
              Redefining global finance through blockchain innovation and
              regulatory excellence.
=======
            <p className="text-gray-700 mb-4">
              Redefining global finance through blockchain innovation and regulatory excellence.
>>>>>>> 6720a2b495d36d334d75ce52185420d94ac01677
            </p>
            <p className="text-sm text-blue-600 font-semibold mb-4">
              "Today's Success, Tomorrow's Solution"
            </p>
            <p className="text-sm text-gray-600">
              🇻🇬 British Virgin Islands | Regulated & Compliant
            </p>
          </div>

          {/* Contact */}
          <div>
<<<<<<< HEAD
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
=======
            <h3 className="text-lg font-semibold mb-4 text-blue-700">Contact Us</h3>
            <div className="space-y-3">
>>>>>>> 6720a2b495d36d334d75ce52185420d94ac01677
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

<<<<<<< HEAD
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
=======
        {/* Copyright */}
        <div className="border-t border-sky-300 mt-8 pt-6 text-center animate-fade-in">
          <p className="text-gray-600 text-sm">
            © 2025 BlueLink Blockchain Services. All rights reserved.
          </p>
        </div>

        {/* Essential Legal Disclaimer */}
        <div className="mt-6">
          <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg animate-fade-in">
            <p className="text-xs text-gray-600 text-center leading-relaxed">
              <strong>Investment Risk Warning:</strong> Cryptocurrency investments carry significant risk. 
              Digital assets are highly volatile and may lose value. Only invest what you can afford to lose. 
              Not available to US persons or restricted jurisdictions.
            </p>
          </div>
>>>>>>> 6720a2b495d36d334d75ce52185420d94ac01677
        </div>
      </div>
    </footer>
  );
};

export default Footer;
