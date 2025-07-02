
import { Mail, MessageCircle, Twitter, Globe } from "lucide-react";
import privacyPolicyPdf from '.././assets/BlueLink_Privacy_Policy.pdf';
import termsOfServices from '.././assets/BlueLink_Terms_of_Service.pdf';
import riskDisclosure from '.././assets/BlueLink_Risk_Disclosure.pdf';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-sky-50 via-sky-100 to-sky-200 text-gray-800">
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
              Redefining global finance through blockchain innovation and regulatory excellence.
            </p>
            <p className="text-sm text-blue-600 font-semibold">
              "Today's Success, Tomorrow's Solution"
            </p>
          </div>

          {/* Legal & Resources */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-blue-700">Legal & Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href={privacyPolicyPdf} target="_blank" className="text-gray-700 hover:text-blue-600 transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href={termsOfServices} target="_blank" className="text-gray-700 hover:text-blue-600 transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href={riskDisclosure} target="_blank" className="text-gray-700 hover:text-blue-600 transition-colors">
                  Risk Disclosure
                </a>
              </li>
              <li className="text-gray-700 hover:text-blue-600 transition-colors cursor-pointer">Whitepaper</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-blue-700">Contact</h3>
            <div className="space-y-3 text-sm">
              <a
                href="mailto:info@bluelinkblockchain.com"
                target="_blank"
                className="flex items-center text-gray-700 hover:text-blue-600 transition-colors">
                <Mail className="h-4 w-4 mr-2" />
                info@bluelinkblockchain.com
              </a>
              <a
                href="https://t.me/bluelinkblockchain"  
                target="_blank"
                className="flex items-center text-gray-700 hover:text-blue-600 transition-colors">
                <MessageCircle className="h-4 w-4 mr-2" />
                Telegram
              </a>
              <a
                href="https://x.com/Bluelink2025" 
                target="_blank"
                className="flex items-center text-gray-700 hover:text-blue-600 transition-colors">
                <Twitter className="h-4 w-4 mr-2" />
                @BlueLink2025                
              </a>
              <a
                href="https://bluelinkblockchain.com" 
                target="_blank"
                className="flex items-center text-gray-700 hover:text-blue-600 transition-colors">
                <Globe className="h-4 w-4 mr-2" />
                Website
              </a>
            </div>
          </div>
        </div>

        {/* Legal Jurisdiction */}
        <div className="border-t border-sky-300 mt-8 pt-6 animate-fade-in">
          <div className="text-center mb-4">
            <p className="text-sm text-gray-600 mb-2">
              🇻🇬 British Virgin Islands Jurisdiction | Regulated & Compliant
            </p>
            <p className="text-xs text-gray-500">
              BlueLink Blockchain Services is incorporated in the British Virgin Islands
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-sky-300 mt-6 pt-6 text-center animate-fade-in">
          <p className="text-gray-600 text-sm">
            © 2025 BlueLink Blockchain Services. All rights reserved.
          </p>
        </div>

        {/* Legal Disclaimers */}
        <div className="mt-6 space-y-4">
          {/* Investment Warning */}
          <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg animate-fade-in">
            <p className="text-xs text-gray-600 text-center leading-relaxed">
              <strong>Investment Risk Warning:</strong> Cryptocurrency investments carry significant risk of loss. 
              Digital assets are highly volatile and may lose substantial value. Only invest what you can afford to lose.
            </p>
          </div>

          {/* Regulatory Disclaimer */}
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg animate-fade-in">
            <p className="text-xs text-gray-600 text-center leading-relaxed">
              <strong>Regulatory Notice:</strong> This token offering may not be available to residents of certain jurisdictions. 
              Please consult with legal and financial advisors before participating. Not available to US persons.
            </p>
          </div>

          {/* General Disclaimer */}
          <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg animate-fade-in">
            <p className="text-xs text-gray-500 text-center leading-relaxed">
              <strong>General Disclaimer:</strong> This website and token offering are for informational purposes only and do not constitute 
              investment advice, financial advice, trading advice, or any other sort of advice. Please conduct your own research and 
              consult with qualified professionals before making any investment decisions.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
