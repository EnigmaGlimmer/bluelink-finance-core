
import { Calendar, CheckCircle, Clock, Star } from "lucide-react";

const Roadmap = () => {
  const quarters = [
    {
      quarter: "Q2 2025",
      title: "Foundation & Development",
      status: "in-progress",
      items: [
        "Finalize system architecture and modular design",
        "Complete smart contract and infrastructure audits",
        "Deploy ERC-20 launch infrastructure",
        "Set up legal, regulatory, and compliance framework"
      ]
    },
    {
      quarter: "Q3 2025",
      title: "Pre-Launch Execution",
      status: "upcoming",
      items: [
        "Conduct Private and Pre-Sale fundraising",
        "Launch BlueLink Exchange Testnet (Alpha)",
        "Deploy Blockchain Testnet with validator onboarding",
        "Initiate airdrop program and global marketing"
      ]
    },
    {
      quarter: "Q4 2025",
      title: "Mainnet & Public Launch",
      status: "planned",
      items: [
        "Deploy Mainnet with validator consensus",
        "Conduct IDO and finalize token distribution",
        "Launch tokenized stock exchange",
        "Migrate BLT to BlueLink Coin",
        "Launch fiat banking suite with debit integration",
        "Enable staking, slashing, and delegation"
      ]
    },
    {
      quarter: "Q1 2026",
      title: "Ecosystem Optimization",
      status: "future-1",
      items: [
        "Expand validator and staking participation",
        "Stock option utilities",
        "Launch DAO Grant Program for developers",
        "Global regulatory expansion",
        "Roll out core DeFi (lending, farming, swaps)",
        "Publish DAO treasury and governance dashboard"
      ]
    },
        {
      quarter: "Q2 2026+",
      title: "Product & Institutional Expansion",
      status: "future-2",
      items: [
        "Launch mobile app with full fiat-crypto features",
        "Support RWAs: real estate, bonds, and assets",
        "Launch DAO Grant Program for developers",
        "Release BlueLink Launchpad for startups",
        "Integrate institutional APIs and trading tools",
        "Publish DAO treasury and governance dashboard"
      ]
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "in-progress": return "bg-blue-500";
      case "upcoming": return "bg-orange-500";
      case "planned": return "bg-purple-500";
      case "future-1": return "bg-blue-400";
      case "future-2": return "bg-green-300";
      default: return "bg-gray-400";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "in-progress": return <Clock className="h-5 w-5" />;
      case "upcoming": return <Star className="h-5 w-5" />;
      case "planned": return <Calendar className="h-5 w-5" />;
      case "future": return <CheckCircle className="h-5 w-5" />;
      default: return <Calendar className="h-5 w-5" />;
    }
  };

  return (
    <section id="roadmap" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Development Roadmap
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our strategic timeline for building the future of decentralized finance, 
            from foundation to global ecosystem
          </p>
        </div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-500 to-purple-500 rounded-full hidden lg:block"></div>

          <div className="space-y-12">
            {quarters.map((quarter, index) => (
              <div key={index} className={`flex flex-col lg:flex-row items-center ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>
                {/* Content Card */}
                <div className={`w-full lg:w-5/12 ${index % 2 === 0 ? 'lg:pr-8' : 'lg:pl-8'}`}>
                  <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 hover:scale-105">
                    <div className="flex items-center mb-4">
                      <div className={`w-12 h-12 ${getStatusColor(quarter.status)} rounded-full flex items-center justify-center text-white mr-4`}>
                        {getStatusIcon(quarter.status)}
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900">{quarter.quarter}</h3>
                        <p className="text-lg font-semibold text-gray-600">{quarter.title}</p>
                      </div>
                    </div>
                    <ul className="space-y-3">
                      {quarter.items.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-start">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                          <span className="text-gray-700">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Timeline Node */}
                <div className="w-4 h-4 bg-white border-4 border-blue-500 rounded-full z-10 my-4 lg:my-0 hidden lg:block"></div>

                {/* Spacer */}
                <div className="w-full lg:w-5/12"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Vision Statement */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 md:p-12 text-center text-white">
          <h3 className="text-3xl font-bold mb-4">Our Long-term Vision</h3>
          <p className="text-xl mb-6 max-w-4xl mx-auto">
            "To merge the strengths of Binance and Nasdaq into a next-generation Web3 financial ecosystem, 
            empowering users with seamless access to traditional and digital assets."
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="bg-white/20 backdrop-blur-md rounded-lg p-6">
              <h4 className="text-lg font-semibold mb-2">Global Reach</h4>
              <p className="text-sm opacity-90">Regulatory-compliant operations across major markets</p>
            </div>
            <div className="bg-white/20 backdrop-blur-md rounded-lg p-6">
              <h4 className="text-lg font-semibold mb-2">Innovation First</h4>
              <p className="text-sm opacity-90">Cutting-edge blockchain technology and user experience</p>
            </div>
            <div className="bg-white/20 backdrop-blur-md rounded-lg p-6">
              <h4 className="text-lg font-semibold mb-2">Community Driven</h4>
              <p className="text-sm opacity-90">Decentralized governance and transparent decision-making</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Roadmap;
