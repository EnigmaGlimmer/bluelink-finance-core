
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
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-20 bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-400 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-black/10"></div>
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-20 left-20 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
        <div className="absolute bottom-20 right-20 w-48 h-48 bg-cyan-300/20 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            BlueLink Token Presale
          </h2>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Join the future of decentralized finance. Get BLINK tokens at exclusive presale prices 
            before public launch.
          </p>
        </div>

        {/* Countdown Timer */}
        <div className="bg-white/20 backdrop-blur-md rounded-2xl p-8 mb-12 max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-white text-center mb-6">
            Presale Ends In:
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Days", value: timeLeft.days },
              { label: "Hours", value: timeLeft.hours },
              { label: "Minutes", value: timeLeft.minutes },
              { label: "Seconds", value: timeLeft.seconds }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="bg-white/30 rounded-lg p-4 mb-2">
                  <div className="text-3xl md:text-4xl font-bold text-white">
                    {item.value.toString().padStart(2, '0')}
                  </div>
                </div>
                <div className="text-white/80 text-sm uppercase tracking-wider">
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sale Phases */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white/20 backdrop-blur-md rounded-xl p-6 text-center">
            <div className="text-gray-300 text-sm uppercase tracking-wider mb-2">Phase 1</div>
            <h4 className="text-xl font-bold text-white mb-3">Private Sale</h4>
            <div className="space-y-2 text-white/90">
              <div>50M BLINK</div>
              <div className="text-2xl font-bold text-cyan-300">$0.045 - $0.048</div>
              <div className="text-sm">~$2.25M Target</div>
            </div>
            <div className="mt-4 bg-green-500 text-white px-4 py-2 rounded-full text-sm">
              Completed
            </div>
          </div>

          <div className="bg-white/30 backdrop-blur-md rounded-xl p-6 text-center border-2 border-cyan-300">
            <div className="text-cyan-200 text-sm uppercase tracking-wider mb-2">Phase 2 - Active</div>
            <h4 className="text-xl font-bold text-white mb-3">Bonding Curve Pre-Sale</h4>
            <div className="space-y-2 text-white/90">
              <div>150M BLINK</div>
              <div className="text-2xl font-bold text-cyan-300">$0.085 → $0.25</div>
              <div className="text-sm">~$12.75M - $20M</div>
            </div>
            <Button className="mt-4 bg-cyan-500 hover:bg-cyan-600 text-white">
              Join Now
            </Button>
          </div>

          <div className="bg-white/20 backdrop-blur-md rounded-xl p-6 text-center">
            <div className="text-gray-300 text-sm uppercase tracking-wider mb-2">Phase 3</div>
            <h4 className="text-xl font-bold text-white mb-3">Public Sale (IDO)</h4>
            <div className="space-y-2 text-white/90">
              <div>150M BLINK</div>
              <div className="text-2xl font-bold text-cyan-300">$0.28</div>
              <div className="text-sm">~$42M Target</div>
            </div>
            <div className="mt-4 bg-gray-500 text-white px-4 py-2 rounded-full text-sm">
              Coming Soon
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          <div className="text-center">
            <Target className="h-8 w-8 text-cyan-300 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">$57M+</div>
            <div className="text-white/80 text-sm">Total Raise Target</div>
          </div>
          <div className="text-center">
            <DollarSign className="h-8 w-8 text-cyan-300 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">1B</div>
            <div className="text-white/80 text-sm">Total Supply</div>
          </div>
          <div className="text-center">
            <Users className="h-8 w-8 text-cyan-300 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">5,000+</div>
            <div className="text-white/80 text-sm">Early Supporters</div>
          </div>
          <div className="text-center">
            <Clock className="h-8 w-8 text-cyan-300 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">Q3 2025</div>
            <div className="text-white/80 text-sm">Exchange Launch</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Presale;
