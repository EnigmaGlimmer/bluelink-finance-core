
import { Building, Globe, Shield, Zap } from "lucide-react";

const About = () => {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Redefining Global Finance
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            BlueLink represents the convergence of traditional finance and next-generation 
            decentralized technology — delivering a robust, regulated, and scalable ecosystem.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="text-center group hover:scale-105 transition-transform duration-300">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 transition-colors">
              <Building className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">BlueLink Exchange</h3>
            <p className="text-gray-600">
              Trade cryptocurrencies and tokenized stocks in a fully regulated environment
            </p>
          </div>

          <div className="text-center group hover:scale-105 transition-transform duration-300">
            <div className="bg-cyan-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-cyan-200 transition-colors">
              <Zap className="h-8 w-8 text-cyan-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">BlueLink Blockchain</h3>
            <p className="text-gray-600">
              High-performance Layer 1 with 10,000+ TPS and sub-2 second finality
            </p>
          </div>

          <div className="text-center group hover:scale-105 transition-transform duration-300">
            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-green-200 transition-colors">
              <Shield className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Banking System</h3>
            <p className="text-gray-600">
              FDIC-insured banking with seamless crypto-fiat integration
            </p>
          </div>

          <div className="text-center group hover:scale-105 transition-transform duration-300">
            <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-purple-200 transition-colors">
              <Globe className="h-8 w-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Global Compliance</h3>
            <p className="text-gray-600">
              Regulated in Dubai and British Virgin Islands for maximum legal clarity
            </p>
          </div>
        </div>

        <div className="mt-16 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-8 md:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                Our Vision
              </h3>
              <p className="text-lg text-gray-700 mb-6">
                To become the most trusted and regulatory-aligned blockchain ecosystem — 
                where digital assets, tokenized stocks, fiat banking, and decentralized 
                governance converge into a seamless, secure experience.
              </p>
              <div className="space-y-3">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                  <span className="text-gray-700">Institutional-grade trust and regulation</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-cyan-500 rounded-full mr-3"></div>
                  <span className="text-gray-700">Retail-level accessibility and speed</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                  <span className="text-gray-700">Web3-native utility and transparency</span>
                </div>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-white rounded-xl p-8 shadow-lg">
                <h4 className="text-2xl font-bold text-gray-900 mb-4">Strategic Structure</h4>
                <div className="space-y-4">
                  <div>
                    <div className="text-lg font-semibold text-blue-600">🇦🇪 Dubai Hub</div>
                    <div className="text-sm text-gray-600">Operations & Development</div>
                  </div>
                  <div>
                    <div className="text-lg font-semibold text-blue-600">British Virgin Islands</div>
                    <div className="text-sm text-gray-600">Token Issuance & Governance</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
