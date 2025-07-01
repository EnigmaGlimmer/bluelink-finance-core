
import { Button } from "@/components/ui/button";
import { Clock, DollarSign, Users, Target } from "lucide-react";
import { useState, useEffect } from "react";
import { usePresaleData } from "@/hooks/usePresaleData";

const Presale = () => {
  const { data: presaleData, loading, error } = usePresaleData();
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    if (!presaleData.endDate) return;

    const updateCountdown = () => {
      const endTime = new Date(presaleData.endDate!).getTime();
      const now = new Date().getTime();
      const distance = endTime - now;

      if (distance <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);

    return () => clearInterval(timer);
  }, [presaleData.endDate]);

  if (loading) {
    return (
      <section id="presale" className="py-16 bg-gradient-to-br from-sky-50 via-sky-100 to-sky-200">
        <div className="container mx-auto px-6 text-center">
          <div className="animate-pulse">
            <div className="h-8 bg-sky-300 rounded w-64 mx-auto mb-4"></div>
            <div className="h-4 bg-sky-200 rounded w-96 mx-auto"></div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="presale" className="py-16 bg-gradient-to-br from-sky-50 via-sky-100 to-sky-200">
        <div className="container mx-auto px-6 text-center">
          <p className="text-red-600">Error loading presale data. Please try again later.</p>
        </div>
      </section>
    );
  }

  return (
    <section id="presale" className="py-16 bg-gradient-to-br from-sky-50 via-sky-100 to-sky-200 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-40 h-40 bg-sky-400/10 rounded-full blur-2xl animate-pulse delay-1000"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            BlueLink Token Presale
          </h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Join the future of decentralized finance. Get BLT tokens at exclusive presale prices.
          </p>
        </div>

        {/* Dynamic Countdown Timer */}
        {presaleData.endDate && (
          <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-8 mb-12 max-w-3xl mx-auto border border-sky-200 shadow-lg animate-scale-in">
            <h3 className="text-2xl font-bold text-gray-900 text-center mb-6">
              {presaleData.phase || 'Presale'} Ends In:
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: "Days", value: timeLeft.days },
                { label: "Hours", value: timeLeft.hours },
                { label: "Minutes", value: timeLeft.minutes },
                { label: "Seconds", value: timeLeft.seconds }
              ].map((item, index) => (
                <div key={index} className="text-center animate-fade-in" style={{animationDelay: `${index * 100}ms`}}>
                  <div className="bg-gradient-to-br from-blue-500 to-sky-500 rounded-xl p-4 mb-2 shadow-md">
                    <div className="text-2xl md:text-3xl font-bold text-white">
                      {item.value.toString().padStart(2, '0')}
                    </div>
                  </div>
                  <div className="text-gray-600 text-xs uppercase tracking-wider font-medium">
                    {item.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Current Phase Info */}
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-8 mb-12 max-w-2xl mx-auto text-center border border-sky-200 shadow-lg animate-fade-in">
          <div className="text-blue-600 text-sm uppercase tracking-wider mb-2 font-semibold">
            {presaleData.phase || 'Current Phase'}
          </div>
          <h4 className="text-2xl font-bold text-gray-900 mb-4">Active Presale</h4>
          <div className="space-y-3 text-gray-700">
            <div className="text-3xl font-bold text-blue-600">
              {presaleData.price || '$0.085 → $0.25'}
            </div>
            <div className="text-sm text-gray-600">
              Target: {presaleData.target || '$20M'}
            </div>
            {presaleData.raised && (
              <div className="text-sm text-green-600 font-semibold">
                Raised: {presaleData.raised}
              </div>
            )}
          </div>
          <Button className="mt-6 bg-blue-500 hover:bg-blue-600 text-white font-semibold px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            Join Presale
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {[
            { icon: Target, value: "$56M+", label: "Total Target" },
            { icon: DollarSign, value: "1B", label: "Total Supply" },
            { icon: Users, value: "Welcome", label: "Early Investors" },
            { icon: Clock, value: "Q4 2025", label: "Launch" }
          ].map((stat, index) => (
            <div key={index} className="text-center bg-white/70 backdrop-blur-sm rounded-xl p-4 border border-sky-200 animate-fade-in shadow-md hover:shadow-lg transition-all duration-300" style={{animationDelay: `${index * 150}ms`}}>
              <stat.icon className="h-8 w-8 text-blue-500 mx-auto mb-3" />
              <div className="text-xl md:text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
              <div className="text-gray-600 text-xs leading-tight">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Presale;
