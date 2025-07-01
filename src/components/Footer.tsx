
import { Mail, MessageCircle, Twitter, Globe } from "lucide-react";
import privacyPolicyPdf from '.././assets/BlueLink_Privacy_Policy.pdf';
import termsOfServices from '.././assets/BlueLink_Terms_of_Service.pdf';
import riskDisclosure from '.././assets/BlueLink_Risk_Disclosure.pdf';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-gray-800 via-gray-900 to-slate-900 text-white">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 animate-fade-in">
          {/* Company Info */}
          <div>
            <div className="flex items-center mb-6">
              <img 
                src="/lovable-uploads/73ed770f-97f5-48ce-82da-40ff54317af3.png" 
                alt="BlueLink Logo" 
                className="h-8 w-auto mr-3"
              />  
            </div>
            <p className="text-gray-300 mb-6">
              Redefining global finance through blockchain innovation and regulatory excellence.
            </p>
            <p className="text-sm text-gray-400">
              "Today's Success, Tomorrow's Solution"
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-sky-300">Ecosystem</h3>
            <ul className="space-y-3">
              <li className="text-gray-300 hover:text-sky-300 transition-colors cursor-pointer">BlueLink Exchange</li>
              <li className="text-gray-300 hover:text-sky-300 transition-colors cursor-pointer">BlueLink Blockchain</li>
              <li className="text-gray-300 hover:text-sky-300 transition-colors cursor-pointer">Tokenized Stocks</li>
              <li className="text-gray-300 hover:text-sky-300 transition-colors cursor-pointer">Banking System</li>
              <li className="text-gray-300 hover:text-sky-300 transition-colors cursor-pointer">Staking</li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-sky-300">Resources</h3>
            <ul className="space-y-3">
              <li className="text-gray-300 hover:text-sky-300 transition-colors cursor-pointer">Whitepaper</li>
              <li className="text-gray-300 hover:text-sky-300 transition-colors cursor-pointer">Documentation</li>
              <li className="text-gray-300 hover:text-sky-300 transition-colors cursor-pointer">Audit Reports</li>
              <li className="text-gray-300 hover:text-sky-300 transition-colors cursor-pointer">Roadmap</li>
              <li className="text-gray-300 hover:text-sky-300 transition-colors cursor-pointer">Blog</li>
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-sky-300">Connect</h3>
            <div className="space-y-4">
              <a
              href="mailto:info@bluelinkblockchain.com"
              target="_blank"
              className="flex items-center text-gray-300 hover:text-sky-300 transition-colors">
                <Mail className="h-5 w-5 mr-3" />
                info@bluelinkblockchain.com
              </a>
              <a
              href="https://t.me/bluelinkblockchain"  
              target="_blank"
              className="flex items-center text-gray-300 hover:text-sky-300 transition-colors">
                <MessageCircle className="h-5 w-5 mr-3" />
                Telegram Community
              </a>
              <a
              href="https://x.com/Bluelink2025" 
              target="_blank"
              className="flex items-center text-gray-300 hover:text-sky-300 transition-colors">
                <Twitter className="h-5 w-5 mr-3" />
                BlueLink2025                
              </a>

              <a
             href="https://bluelinkblockchain.com" 
             target="_blank"
              
              className="flex items-center text-gray-300 hover:text-sky-300 transition-colors">
                <Globe className="h-5 w-5 mr-3" />
                www.bluelinkblockchain.com
              </a>
            </div>
          </div>
        </div>

        {/* Legal & Compliance */}
        <div className="border-t border-gray-700 mt-12 pt-8 animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-semibold mb-4 text-sky-300">Legal Structure</h4>
              <div className="text-sm text-gray-300 space-y-2">
                <p>BlueLink Blockchain Services operates under a dual-jurisdiction strategy:</p>
                <p>🇦🇪 Dubai: Operational HQ for exchange development, ecosystem management, and strategic partnerships.</p>
                <p>🇻🇬 BVI: Legal structure optimised for token issuance, governance, and regulatory flexibility.</p>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-sky-300">Regulatory Compliance</h4>
              <div className="text-sm text-gray-300 space-y-2">
                <p>All users subject to KYC/AML verification</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center animate-fade-in">
          <p className="text-gray-300 text-sm">
            © 2025 BlueLink Blockchain Services. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a
            href={privacyPolicyPdf}
            target="_blank"
            className="text-gray-300 hover:text-sky-300 text-sm transition-colors">Privacy Policy</a>
            <a
            href={termsOfServices}
            target="_blank"
            className="text-gray-300 hover:text-sky-300 text-sm transition-colors">Terms of Service</a>
            <a
            href={riskDisclosure} 
            target="_blank"
            className="text-gray-300 hover:text-sky-300 text-sm transition-colors">Risk Disclosure</a>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-8 p-4 bg-gray-800/50 rounded-lg animate-fade-in">
          <p className="text-xs text-gray-400 leading-relaxed">
            <strong>Disclaimer:</strong> This website contains forward-looking statements and projections. 
            BLT tokens may be considered securities in certain jurisdictions. Please consult with legal 
            and financial advisors before participating. Cryptocurrency investments carry significant risk 
            and may result in total loss of capital. Past performance does not guarantee future results.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
