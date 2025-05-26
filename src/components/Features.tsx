
import { Coins, TrendingUp, Lock, Users } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: Coins,
      title: "Tokenized Stock Trading",
      description: "Trade real-world stocks as blockchain tokens, backed 1:1 by actual shares with T+0 settlement",
      highlight: "BLINK-Only Trading"
    },
    {
      icon: TrendingUp,
      title: "Multi-Asset Exchange",
      description: "Trade top cryptocurrencies with advanced order types and institutional-grade security",
      highlight: "0.1% Trading Fees"
    },
    {
      icon: Lock,
      title: "Staking Rewards",
      description: "Earn rewards through validator staking with tiered APR based on amount and lock duration",
      highlight: "Up to 15% APY"
    },
    {
      icon: Users,
      title: "DAO Governance",
      description: "Participate in protocol decisions through decentralized governance with quadratic voting",
      highlight: "Community-Driven"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Ecosystem Features
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience the full power of integrated blockchain finance with our comprehensive suite of tools and services
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group"
            >
              <div className="flex items-start">
                <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mr-4 group-hover:bg-blue-200 transition-colors">
                  <feature.icon className="h-6 w-6 text-blue-600" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-semibold text-gray-900">{feature.title}</h3>
                    <span className="bg-cyan-100 text-cyan-700 px-3 py-1 rounded-full text-sm font-medium">
                      {feature.highlight}
                    </span>
                  </div>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Regulatory Compliance Section */}
        <div className="mt-16 bg-white rounded-2xl p-8 md:p-12 shadow-lg">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Regulatory Excellence
            </h3>
            <p className="text-lg text-gray-600">
              Built from the ground up with compliance and legal clarity as our foundation
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <h4 className="text-xl font-semibold text-gray-900">Supported Regions</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="text-green-600 font-semibold">✓ Europe</div>
                  <div className="text-sm text-gray-600">Full compliance</div>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="text-green-600 font-semibold">✓ Asia-Pacific</div>
                  <div className="text-sm text-gray-600">Regulatory aligned</div>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="text-green-600 font-semibold">✓ Middle East</div>
                  <div className="text-sm text-gray-600">Dubai licensed</div>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="text-green-600 font-semibold">✓ Latin America</div>
                  <div className="text-sm text-gray-600">Growth markets</div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <h4 className="text-xl font-semibold text-gray-900">Excluded Jurisdictions</h4>
              <div className="bg-red-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600 mb-3">
                  For regulatory clarity, we exclude high-risk jurisdictions:
                </p>
                <div className="text-red-600 text-sm space-y-1">
                  <div>• United States</div>
                  <div>• China</div>
                  <div>• Japan</div>
                  <div>• Canada</div>
                  <div>• India</div>
                  <div>• Thailand</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
