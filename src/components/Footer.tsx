import privacyPolicyPdf from "../assets/docs/BlueLink_Privacy_Policy.pdf";
import termsOfServices from "../assets/docs/BlueLink_Terms_of_Service.pdf";
import riskDisclosure from "../assets/docs/BlueLink_Risk_Disclosure.pdf";;

import {
  RiTwitterLine,
  RiLinkedinLine,
  RiInstagramLine,
  RiGithubLine,
  RiTelegramLine,
  RiDiscordLine,
} from "react-icons/ri";
import { SlGlobe } from "react-icons/sl";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-sky-50 via-sky-100 to-sky-200 text-gray-800">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-fade-in">
          {/* Company Info */}
          <div>
            <div className="flex items-center mb-4">
              <img
                src="/logo.png"
                alt="BlueLink Logo"
                className="h-8 w-auto mr-3"
              />
            </div>
            <p className="text-gray-700 mb-4">
              Redefining global finance through blockchain innovation and
              regulatory excellence.
            </p>
            <p className="text-sm text-sky-600 font-semibold mb-4">
              Today's Success, Tomorrow's Solution
            </p>
            <p className="text-sm text-gray-600">
              🇻🇬 British Virgin Islands | Regulated & Compliant
            </p>

            <div className="flex flex-wrap gap-4 mt-6">
              <a
                href="https://x.com/Bluelink2025"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
              >
                <RiTwitterLine className="text-2xl text-sky-500 hover:text-teal-400 transition" />
              </a>
              <a
                href="https://www.linkedin.com/company/bluelink-blockchain-services"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <RiLinkedinLine className="text-2xl text-sky-500 hover:text-teal-400 transition" />
              </a>
              <a
                href="https://www.instagram.com/bluelinkblockchain/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <RiInstagramLine className="text-2xl text-sky-500 hover:text-teal-400 transition" />
              </a>
              <a
                href="https://github.com/BlueLink-Blockchain-Services"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
              >
                <RiGithubLine className="text-2xl text-sky-500 hover:text-teal-400 transition" />
              </a>
              <a
                href="https://t.me/bluelinkblockchain"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Telegram"
              >
                <RiTelegramLine className="text-2xl text-sky-500 hover:text-teal-400 transition" />
              </a>
              <a
                href="https://discord.gg/88g476WK"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Discord"
              >
                <RiDiscordLine className="text-2xl text-sky-500 hover:text-teal-400 transition" />
              </a>
              <a
                href="https://bluelinkblockchain.com"
                target="_blank"
              >
                <SlGlobe className="text-2xl text-sky-500 hover:text-teal-400 transition" />
              </a>
            </div>
          </div>
        </div>

        {/* Legal Documents & Copyright */}
        <div className="border-t border-sky-300 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center animate-fade-in">
          <p className="text-gray-600 text-sm mb-4 md:mb-0">
            © 2025 BlueLink Blockchain Services. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <a
              href={privacyPolicyPdf}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-blue-600 text-sm transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href={termsOfServices}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-blue-600 text-sm transition-colors"
            >
              Terms of Service
            </a>
            <a
              href={riskDisclosure}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-blue-600 text-sm transition-colors"
            >
              Risk Disclosure
            </a>
          </div>
        </div>

        {/* Legal Disclaimer */}
        <div className="mt-6">
          <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg animate-fade-in">
            <p className="text-xs text-gray-600 text-center leading-relaxed">
              <strong>Investment Risk Warning:</strong> Cryptocurrency
              investments carry significant risk. Digital assets are highly
              volatile and may lose value. Only invest what you can afford to
              lose. Not available to US persons or restricted jurisdictions.
              Please read our Risk Disclosure document before participating.
            </p>
          </div>
        </div>
      </div>
    </footer >
  );
};

export default Footer;
