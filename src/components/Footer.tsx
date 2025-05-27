
import { Mail, MessageCircle, Twitter, Globe } from "lucide-react";
import privacyPolicyPdf from '.././assets/BlueLink_Privacy_Policy.pdf';
import termsOfServices from '.././assets/BlueLink_Terms_of_Service.pdf';
import riskDisclosure from '.././assets/BlueLink_Risk_Disclosure.pdf';


const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center mb-6">
              <img 
                src="/lovable-uploads/73ed770f-97f5-48ce-82da-40ff54317af3.png" 
                alt="BlueLink Logo" 
                className="h-8 w-auto mr-3"
              />  
            </div>
            <p className="text-gray-400 mb-6">
              Redefining global finance through blockchain innovation and regulatory excellence.
            </p>
            <p className="text-sm text-gray-500">
              "Today's Success, Tomorrow's Solution"
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Ecosystem</h3>
            <ul className="space-y-3">
              <li className="text-gray-400 hover:text-white transition-colors">BlueLink Exchange</li>
              <li className="text-gray-400 hover:text-white transition-colors">BlueLink Blockchain</li>
              <li className="text-gray-400 hover:text-white transition-colors">Tokenized Stocks</li>
              <li className="text-gray-400 hover:text-white transition-colors">Banking System</li>
              <li className="text-gray-400 hover:text-white transition-colors">Staking</li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Resources</h3>
            <ul className="space-y-3">
              <li className="text-gray-400 hover:text-white transition-colors">Whitepaper</li>
              <li className="text-gray-400 hover:text-white transition-colors">Documentation</li>
              <li className="text-gray-400 hover:text-white transition-colors">Audit Reports</li>
              <li className="text-gray-400 hover:text-white transition-colors">Roadmap</li>
              <li className="text-gray-400 hover:text-white transition-colors">Blog</li>
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Connect</h3>
            <div className="space-y-4">
              <a
              href="mailto:info@bluelinkblockchain.com"
              target="_blank"
              className="flex items-center text-gray-400 hover:text-white transition-colors">
                <Mail className="h-5 w-5 mr-3" />
                info@bluelinkblockchain.com
              </a>
              <a
              href="https://t.me/bluelinkblockchain"  
              target="_blank"
              className="flex items-center text-gray-400 hover:text-white transition-colors">
                <MessageCircle className="h-5 w-5 mr-3" />
                Telegram Community
              </a>
              <a
              href="https://x.com/Bluelink2025" 
              target="_blank"
              className="flex items-center text-gray-400 hover:text-white transition-colors">
                <Twitter className="h-5 w-5 mr-3" />
                BlueLink2025                
              </a>

              <a
             href="https://bluelinkblockchain.com" 
             target="_blank"
              
              className="flex items-center text-gray-400 hover:text-white transition-colors">
                <Globe className="h-5 w-5 mr-3" />
                www.bluelinkblockchain.com
              </a>
            </div>
          </div>
        </div>

        {/* Legal & Compliance */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-semibold mb-4">Legal Structure</h4>
              <div className="text-sm text-gray-400 space-y-2">
                <p>🇦🇪 BlueLink Blockchain Services - Dubai, UAE</p>
                <p>🇰🇾 BlueLink Blockchain Foundation - Cayman Islands</p>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Regulatory Compliance</h4>
              <div className="text-sm text-gray-400 space-y-2">
                <p>All users subject to KYC/AML verification</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2025 BlueLink Blockchain Foundation. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a
            href={privacyPolicyPdf}
            target="_blank"
            className="text-gray-400 hover:text-white text-sm transition-colors">Privacy Policy</a>
            <a
            href={termsOfServices}
            target="_blank"
            className="text-gray-400 hover:text-white text-sm transition-colors">Terms of Service</a>
            <a
            href={riskDisclosure} 
            target="_blank"
            className="text-gray-400 hover:text-white text-sm transition-colors">Risk Disclosure</a>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-8 p-4 bg-gray-800 rounded-lg">
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
