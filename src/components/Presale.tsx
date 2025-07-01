
import { Button } from "@/components/ui/button";
import { Clock, DollarSign, Users, Target } from "lucide-react";
import { useState, useEffect } from "react";

const Presale = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 45,
    hours: 12,
    minutes: 30,
    seconds: 15
  });

  useEffect(() => {
    const savedEndTime = localStorage.getItem('presaleEndTime');
    let endTime: number;

    if (savedEndTime) {
      endTime = parseInt(savedEndTime, 10);
    } else {
      const now = new Date().getTime();
      endTime = now + (
        45 * 24 * 60 * 60 * 1000 + 
        12 * 60 * 60 * 1000 + 
        30 * 60 * 1000 + 
        15 * 1000
      );
      localStorage.setItem('presaleEndTime', endTime.toString());
    }

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = endTime - now;

      if (distance <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        localStorage.removeItem('presaleEndTime');
        clearInterval(timer);
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section id="presale" className="py-20 bg-gradient-to-br from-sky-100 via-sky-50 to-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-20 left-20 w-40 h-40 bg-blue-500/5 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-56 h-56 bg-sky-400/5 rounded-full blur-3xl animate-pulse delay-1000"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            BlueLink Token Presale
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Join the future of decentralized finance. Get BLT tokens at exclusive presale prices 
            before public launch.
          </p>
        </div>

        {/* Countdown Timer */}
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-10 mb-16 max-w-4xl mx-auto border border-sky-200 shadow-xl animate-scale-in">
          <h3 className="text-3xl font-bold text-gray-900 text-center mb-8">
            Presale Starts In:
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: "Days", value: timeLeft.days },
              { label: "Hours", value: timeLeft.hours },
              { label: "Minutes", value: timeLeft.minutes },
              { label: "Seconds", value: timeLeft.seconds }
            ].map((item, index) => (
              <div key={index} className="text-center animate-fade-in" style={{animationDelay: `${index * 100}ms`}}>
                <div className="bg-gradient-to-br from-blue-500 to-sky-500 rounded-2xl p-6 mb-3 border border-sky-200 shadow-lg">
                  <div className="text-4xl md:text-5xl font-bold text-white">
                    {item.value.toString().padStart(2, '0')}
                  </div>
                </div>
                <div className="text-gray-600 text-sm uppercase tracking-wider font-medium">
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sale Phases */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white/60 backdrop-blur-lg rounded-2xl p-8 text-center border border-sky-200 hover:bg-white/80 transition-all duration-300 animate-fade-in shadow-lg">
            <div className="text-green-600 text-sm uppercase tracking-wider mb-3 font-semibold">Phase 1</div>
            <h4 className="text-2xl font-bold text-gray-900 mb-4">Private Sale</h4>
            <div className="space-y-3 text-gray-700">
              <div className="text-lg">30M BLT</div>
              <div className="text-3xl font-bold text-blue-600">$0.045 - $0.048</div>
              <div className="text-sm text-gray-500">~$1.4M Target</div>
            </div>
            <div className="mt-6 bg-green-500 text-white px-6 py-3 rounded-full text-sm font-semibold">
              In Progress
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-8 text-center border-2 border-blue-400 relative overflow-hidden animate-scale-in shadow-xl">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 to-sky-400"></div>
            <div className="text-blue-600 text-sm uppercase tracking-wider mb-3 font-semibold">Phase 2 - Active</div>
            <h4 className="text-2xl font-bold text-gray-900 mb-4">Bonding Curve Pre-Sale</h4>
            <div className="space-y-3 text-gray-700">
              <div className="text-lg">150M BLT</div>
              <div className="text-3xl font-bold text-blue-600">$0.085 → $0.25</div>
              <div className="text-sm text-gray-500">~$12.75M - $20M</div>
            </div>
            <Button className="mt-6 bg-blue-500 hover:bg-blue-600 text-white font-semibold px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
              Join Now
            </Button>
          </div>

          <div className="bg-white/60 backdrop-blur-lg rounded-2xl p-8 text-center border border-sky-200 hover:bg-white/80 transition-all duration-300 animate-fade-in shadow-lg">
            <div className="text-gray-500 text-sm uppercase tracking-wider mb-3 font-semibold">Phase 3</div>
            <h4 className="text-2xl font-bold text-gray-900 mb-4">Public Sale (IDO)</h4>
            <div className="space-y-3 text-gray-700">
              <div className="text-lg">150M BLT</div>
              <div className="text-3xl font-bold text-blue-600">$0.28</div>
              <div className="text-sm text-gray-500">~$42M Target</div>
            </div>
            <div className="mt-6 bg-gray-400 text-white px-6 py-3 rounded-full text-sm font-semibold">
              Coming Soon
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
          {[
            { icon: Target, value: "$56M+", label: "Total Raise Target" },
            { icon: DollarSign, value: "1B", label: "Total Supply" },
            { icon: Users, value: "Welcome", label: "Early Investors" },
            { icon: Clock, value: "Q4 2025", label: "Exchange Launch" }
          ].map((stat, index) => (
            <div key={index} className="text-center bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-sky-200 animate-fade-in shadow-lg hover:shadow-xl transition-all duration-300" style={{animationDelay: `${index * 150}ms`}}>
              <stat.icon className="h-10 w-10 text-blue-500 mx-auto mb-4" />
              <div className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
              <div className="text-gray-600 text-sm leading-tight">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Presale;
