
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
      // Calculate end time based on current time + initial countdown duration
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
    <section id="presale" className="py-20 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 relative overflow-hidden">
      {/* Professional Background Elements */}
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-20 left-20 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-56 h-56 bg-cyan-400/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            BlueLink Token Presale
          </h2>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
            Join the future of decentralized finance. Get BLT tokens at exclusive presale prices 
            before public launch.
          </p>
        </div>

        {/* Updated Countdown Timer */}
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-10 mb-16 max-w-4xl mx-auto border border-white/20 shadow-2xl">
          <h3 className="text-3xl font-bold text-white text-center mb-8">
            Presale Starts In:
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: "Days", value: timeLeft.days },
              { label: "Hours", value: timeLeft.hours },
              { label: "Minutes", value: timeLeft.minutes },
              { label: "Seconds", value: timeLeft.seconds }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 mb-3 border border-white/30">
                  <div className="text-4xl md:text-5xl font-bold text-white">
                    {item.value.toString().padStart(2, '0')}
                  </div>
                </div>
                <div className="text-gray-300 text-sm uppercase tracking-wider font-medium">
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sale Phases - Professional styling */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 text-center border border-white/20 hover:bg-white/15 transition-all duration-300">
            <div className="text-green-400 text-sm uppercase tracking-wider mb-3 font-semibold">Phase 1</div>
            <h4 className="text-2xl font-bold text-white mb-4">Private Sale</h4>
            <div className="space-y-3 text-gray-200">
              <div className="text-lg">30M BLT</div>
              <div className="text-3xl font-bold text-cyan-300">$0.045 - $0.048</div>
              <div className="text-sm text-gray-400">~$1.4M Target</div>
            </div>
            <div className="mt-6 bg-green-500 text-white px-6 py-3 rounded-full text-sm font-semibold">
              Completed
            </div>
          </div>

          <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-8 text-center border-2 border-cyan-400 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 to-blue-400"></div>
            <div className="text-cyan-300 text-sm uppercase tracking-wider mb-3 font-semibold">Phase 2 - Active</div>
            <h4 className="text-2xl font-bold text-white mb-4">Bonding Curve Pre-Sale</h4>
            <div className="space-y-3 text-gray-200">
              <div className="text-lg">150M BLT</div>
              <div className="text-3xl font-bold text-cyan-300">$0.085 → $0.25</div>
              <div className="text-sm text-gray-400">~$12.75M - $20M</div>
            </div>
            <Button className="mt-6 bg-cyan-500 hover:bg-cyan-600 text-white font-semibold px-8 py-3 rounded-xl">
              Join Now
            </Button>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 text-center border border-white/20 hover:bg-white/15 transition-all duration-300">
            <div className="text-gray-400 text-sm uppercase tracking-wider mb-3 font-semibold">Phase 3</div>
            <h4 className="text-2xl font-bold text-white mb-4">Public Sale (IDO)</h4>
            <div className="space-y-3 text-gray-200">
              <div className="text-lg">150M BLT</div>
              <div className="text-3xl font-bold text-cyan-300">$0.28</div>
              <div className="text-sm text-gray-400">~$42M Target</div>
            </div>
            <div className="mt-6 bg-gray-600 text-white px-6 py-3 rounded-full text-sm font-semibold">
              Coming Soon
            </div>
          </div>
        </div>

        {/* Professional Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
          {[
            { icon: Target, value: "$56M+", label: "Total Raise Target" },
            { icon: DollarSign, value: "1B", label: "Total Supply" },
            { icon: Users, value: "5,000+", label: "Early Supporters" },
            { icon: Clock, value: "Q3 2025", label: "Exchange Launch" }
          ].map((stat, index) => (
            <div key={index} className="text-center bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <stat.icon className="h-10 w-10 text-cyan-400 mx-auto mb-4" />
              <div className="text-2xl md:text-3xl font-bold text-white mb-2">{stat.value}</div>
              <div className="text-gray-300 text-sm leading-tight">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Presale;
