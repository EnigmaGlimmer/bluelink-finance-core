import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';

const Tokenomics = () => {
  const allocationData = [
    { name: 'Liquidity Pool', value: 30, color: '#2563eb' },
    { name: 'Public Sale (IDO)', value: 15, color: '#0ea5e9' },
    { name: 'Bonding Curve Pre-Sale', value: 15, color: '#8b5cf6' },
    { name: 'Founder Allocation', value: 13, color: '#10b981' },
    { name: 'Reserve', value: 10, color: '#f59e0b' },
    { name: 'Staking Rewards', value: 7, color: '#ec4899' },
    { name: 'Community & Marketing', value: 5, color: '#ef4444' },
    { name: 'Private Sale', value: 3, color: '#6366f1' },
    { name: 'Team Allocation', value: 2, color: '#84cc16' }
  ];

  const revenueData = [
    { name: 'Reflections', value: 1, color: '#2563eb' },
    { name: 'Auto-Liquidity', value: 1.5, color: '#0ea5e9' },
    { name: 'Burn', value: 0.5, color: '#ef4444' }
  ];

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white/95 backdrop-blur-sm p-4 border border-sky-200 rounded-xl shadow-xl">
          <p className="font-semibold text-gray-900">{payload[0].name}</p>
          <p className="text-blue-600 font-bold">{payload[0].value}%</p>
        </div>
      );
    }
    return null;
  };

  return (
    <section id="tokenomics" className="py-20 bg-gradient-to-br from-sky-50 via-sky-100 to-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Tokenomics
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Sustainable, community-driven economics designed for long-term value creation 
            and ecosystem growth with optimized allocation structure
          </p>
        </div>

        {/* Token Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-8 text-center text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 animate-fade-in">
            <h3 className="text-3xl text-white font-bold mb-2">1B</h3>
            <p className="text-blue-100 font-medium">Total Supply</p>
          </div>
          <div className="bg-gradient-to-br from-sky-500 to-sky-600 rounded-2xl p-8 text-center text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 animate-fade-in">
            <h3 className="text-3xl text-white font-bold mb-2">$BLT</h3>
            <p className="text-sky-100 font-medium">Token Symbol</p>
          </div>
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-8 text-center text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 animate-fade-in">
            <h3 className="text-3xl text-white font-bold mb-2">3%</h3>
            <p className="text-purple-100 font-medium">Transaction Tax</p>
          </div>
          <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl p-8 text-center text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 animate-fade-in">
            <h3 className="text-3xl text-white font-bold mb-2">ERC-20</h3>
            <p className="text-emerald-100 font-medium">Initial Standard</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Token Allocation Chart */}
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-sky-200 animate-scale-in">
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
              Token Allocation Distribution
            </h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={allocationData}
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={130}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {allocationData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-1 gap-3 mt-6">
              {allocationData.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-xl bg-sky-50/80 hover:bg-sky-100/80 transition-colors">
                  <div className="flex items-center">
                    <div 
                      className="w-4 h-4 rounded-full mr-3 shadow-sm" 
                      style={{ backgroundColor: item.color }}
                    ></div>
                    <span className="text-sm font-medium text-gray-700">{item.name}</span>
                  </div>
                  <span className="text-sm font-bold text-gray-900">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Transaction Tax Breakdown */}
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-sky-200 animate-scale-in">
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
              Transaction Tax Breakdown (3%)
            </h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={revenueData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <XAxis 
                    dataKey="name" 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: '#6b7280' }}
                  />
                  <YAxis 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: '#6b7280' }}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                    {revenueData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-4 mt-6">
              <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-4 border border-blue-200">
                <div className="flex items-center mb-2">
                  <div className="w-4 h-4 bg-blue-500 rounded-full mr-3 shadow-sm"></div>
                  <span className="font-semibold text-gray-900">Reflections (1%)</span>
                </div>
                <p className="text-sm text-gray-600">Auto-distributed to all BLT holders proportionally</p>
              </div>
              <div className="bg-gradient-to-r from-cyan-50 to-cyan-100 rounded-xl p-4 border border-cyan-200">
                <div className="flex items-center mb-2">
                  <div className="w-4 h-4 bg-cyan-500 rounded-full mr-3 shadow-sm"></div>
                  <span className="font-semibold text-gray-900">Auto-Liquidity (1.5%)</span>
                </div>
                <p className="text-sm text-gray-600">Sent to liquidity pool for deeper trading</p>
              </div>
              <div className="bg-gradient-to-r from-red-50 to-red-100 rounded-xl p-4 border border-red-200">
                <div className="flex items-center mb-2">
                  <div className="w-4 h-4 bg-red-500 rounded-full mr-3 shadow-sm"></div>
                  <span className="font-semibold text-gray-900">Burn (0.5%)</span>
                </div>
                <p className="text-sm text-gray-600">Permanently removed from circulation</p>
              </div>
            </div>
          </div>
        </div>

        {/* Vesting Schedule */}
        <div className="bg-gradient-to-br from-blue-500 via-sky-500 to-blue-600 rounded-3xl p-10 text-white shadow-2xl animate-fade-in">
          <h3 className="text-3xl font-bold mb-10 text-center text-white">
            Vesting Schedule
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 border border-white/30 hover:bg-white/25 transition-all duration-300">
              <h4 className="font-bold text-white mb-3 text-lg">Founder Allocation</h4>
              <p className="text-blue-100 mb-4 font-medium">130M BLT (13%)</p>
              <div className="space-y-2 text-sm text-blue-50">
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-blue-200 rounded-full mr-2"></span>
                  6-month cliff period
                </div>
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-blue-200 rounded-full mr-2"></span>
                  Linear vesting over 24 months
                </div>
              </div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 border border-white/30 hover:bg-white/25 transition-all duration-300">
              <h4 className="font-bold text-white mb-3 text-lg">Team Allocation</h4>
              <p className="text-emerald-100 mb-4 font-medium">20M BLT (2%)</p>
              <div className="space-y-2 text-sm text-blue-50">
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-emerald-200 rounded-full mr-2"></span>
                  6-month cliff period
                </div>
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-emerald-200 rounded-full mr-2"></span>
                  Linear vesting over 24 months
                </div>
              </div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 border border-white/30 hover:bg-white/25 transition-all duration-300">
              <h4 className="font-bold text-white mb-3 text-lg">Private Sale</h4>
              <p className="text-purple-100 mb-4 font-medium">30M BLT (3%)</p>
              <div className="space-y-2 text-sm text-blue-50">
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-purple-200 rounded-full mr-2"></span>
                  3-month cliff period
                </div>
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-purple-200 rounded-full mr-2"></span>
                  Linear vesting over 6 months
                </div>
              </div>
            </div>
          </div>
          
          {/* Additional Vesting Info */}
          <div className="mt-10 bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <h4 className="font-bold text-white mb-4 text-center">Staking Rewards Program</h4>
            <div className="text-center">
              <p className="text-blue-100 mb-2 font-medium text-lg">70M BLT (7%)</p>
              <p className="text-sm text-blue-50">
                Distributed over 3 years to incentivize long-term holding and network participation
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Tokenomics;
