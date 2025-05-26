
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';

const Tokenomics = () => {
  const allocationData = [
    { name: 'Liquidity Pool', value: 30, color: '#3b82f6' },
    { name: 'Public Sale (IDO)', value: 15, color: '#06b6d4' },
    { name: 'Bonding Curve Pre-Sale', value: 15, color: '#8b5cf6' },
    { name: 'Founder Allocation', value: 13, color: '#10b981' },
    { name: 'Reserve', value: 10, color: '#f59e0b' },
    { name: 'Community & Marketing', value: 5, color: '#ef4444' },
    { name: 'Private Sale', value: 5, color: '#6366f1' },
    { name: 'Staking Rewards', value: 5, color: '#ec4899' },
    { name: 'Team Allocation', value: 2, color: '#84cc16' }
  ];

  const revenueData = [
    { name: 'Reflections', value: 1, color: '#3b82f6' },
    { name: 'Auto-Liquidity', value: 1.5, color: '#06b6d4' },
    { name: 'Burn', value: 0.5, color: '#ef4444' }
  ];

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border rounded-lg shadow-lg">
          <p className="font-semibold">{payload[0].name}</p>
          <p className="text-blue-600">{payload[0].value}%</p>
        </div>
      );
    }
    return null;
  };

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Tokenomics
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Sustainable, community-driven economics designed for long-term value creation 
            and ecosystem growth
          </p>
        </div>

        {/* Token Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 text-center">
            <h3 className="text-2xl font-bold text-blue-600 mb-2">1B</h3>
            <p className="text-gray-700">Total Supply</p>
          </div>
          <div className="bg-gradient-to-br from-cyan-50 to-cyan-100 rounded-xl p-6 text-center">
            <h3 className="text-2xl font-bold text-cyan-600 mb-2">BLINK</h3>
            <p className="text-gray-700">Token Symbol</p>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 text-center">
            <h3 className="text-2xl font-bold text-purple-600 mb-2">3%</h3>
            <p className="text-gray-700">Transaction Tax</p>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 text-center">
            <h3 className="text-2xl font-bold text-green-600 mb-2">ERC-20</h3>
            <p className="text-gray-700">Initial Standard</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Token Allocation Chart */}
          <div className="bg-gray-50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Token Allocation
            </h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={allocationData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={120}
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
            <div className="grid grid-cols-1 gap-2 mt-4">
              {allocationData.map((item, index) => (
                <div key={index} className="flex items-center">
                  <div 
                    className="w-4 h-4 rounded mr-3" 
                    style={{ backgroundColor: item.color }}
                  ></div>
                  <span className="text-sm text-gray-700 flex-1">{item.name}</span>
                  <span className="text-sm font-semibold text-gray-900">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Transaction Tax Breakdown */}
          <div className="bg-gray-50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Transaction Tax (3%)
            </h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={revenueData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                    {revenueData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-4 mt-6">
              <div className="bg-white rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <div className="w-4 h-4 bg-blue-500 rounded mr-3"></div>
                  <span className="font-semibold">Reflections (1%)</span>
                </div>
                <p className="text-sm text-gray-600">Auto-distributed to all BLINK holders proportionally</p>
              </div>
              <div className="bg-white rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <div className="w-4 h-4 bg-cyan-500 rounded mr-3"></div>
                  <span className="font-semibold">Auto-Liquidity (1.5%)</span>
                </div>
                <p className="text-sm text-gray-600">Sent to liquidity pool for deeper trading</p>
              </div>
              <div className="bg-white rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <div className="w-4 h-4 bg-red-500 rounded mr-3"></div>
                  <span className="font-semibold">Burn (0.5%)</span>
                </div>
                <p className="text-sm text-gray-600">Permanently removed from circulation</p>
              </div>
            </div>
          </div>
        </div>

        {/* Vesting Schedule */}
        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Vesting Schedule
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6">
              <h4 className="font-semibold text-gray-900 mb-2">Founder Allocation</h4>
              <p className="text-sm text-gray-600 mb-3">130M BLINK (13%)</p>
              <div className="space-y-1 text-sm">
                <div>• 6-month cliff period</div>
                <div>• Linear vesting over 24 months</div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-6">
              <h4 className="font-semibold text-gray-900 mb-2">Team Allocation</h4>
              <p className="text-sm text-gray-600 mb-3">20M BLINK (2%)</p>
              <div className="space-y-1 text-sm">
                <div>• 6-month cliff period</div>
                <div>• Linear vesting over 24 months</div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-6">
              <h4 className="font-semibold text-gray-900 mb-2">Private Sale</h4>
              <p className="text-sm text-gray-600 mb-3">50M BLINK (5%)</p>
              <div className="space-y-1 text-sm">
                <div>• 3-month cliff period</div>
                <div>• Linear vesting over 6 months</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Tokenomics;
