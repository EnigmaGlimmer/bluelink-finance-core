
import { Coins, TrendingUp, Lock, Users } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: Coins,
      title: "Tokenized Stock Trading",
      description: "Trade real-world stocks as blockchain tokens, backed 1:1 by actual shares with T+0 settlement",
      highlight: "BLT-Only Trading"
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
    <section id="features" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
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
                <div className="bg-blue-100 w-8 h-8 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center mr-4 group-hover:bg-blue-200 transition-colors">
                  <feature.icon className="w-4 h-4 sm:h-6 sm:w-6 text-blue-600" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-base font-semibold text-gray-900 lg:text-lg sm:text-xl">{feature.title}</h3>
                    <span className="bg-cyan-100 whitespace-nowrap text-cyan-700 px-3 py-1 rounded-full text-xs font-medium">
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
  


   

      </div>
    </section>
  );
};

export default Features;
