import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';

interface TimeLeft {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
}

const CountdownTimer = () => {
    const startDate = new Date('2025-08-13T11:00:00Z').getTime();
    const endDate = new Date('2025-08-20T11:00:00Z').getTime();

    const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    const [phase, setPhase] = useState<'before' | 'during' | 'after'>('before');

    useEffect(() => {
        const timer = setInterval(() => {
            const now = new Date().getTime();

            if (now < startDate) {
                setPhase('before');
                updateTimeLeft(startDate - now);
            } else if (now >= startDate && now < endDate) {
                setPhase('during');
                updateTimeLeft(endDate - now);
            } else {
                setPhase('after');
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
            }
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    function updateTimeLeft(difference: number) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        setTimeLeft({ days, hours, minutes, seconds });
    }

    const timeUnits = [
        { label: 'Days', value: timeLeft.days },
        { label: 'Hours', value: timeLeft.hours },
        { label: 'Minutes', value: timeLeft.minutes },
        { label: 'Seconds', value: timeLeft.seconds },
    ];

    let label = '';
    if (phase === 'before') label = '$BLT PinkSale FairLaunch Starts In';
    else if (phase === 'during') label = '$BLT PinkSale FairLaunch Ends In';
    else label = 'PinkSale Fair Launch Ended';

    return (
        <div className="w-full max-w-2xl mx-auto">
            <div className="text-center mb-6">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-sky-500 via-sky-600 to-sky-700 bg-clip-text text-transparent">
                    {label}
                </h2>
            </div>
            <div className="grid grid-cols-4 gap-3 mb-4">
                {timeUnits.map((unit, index) => (
                    <Card
                        key={unit.label}
                        className="bg-white/90 backdrop-blur-sm border-slate-200 p-4 text-center animate-slide-up shadow-sm hover:shadow-md transition-all"
                        style={{ animationDelay: `${index * 0.1}s` }}
                    >
                        <div className="text-2xl md:text-3xl font-bold text-sky-600 mb-1">
                            {unit.value.toString().padStart(2, '0')}
                        </div>
                        <div className="text-slate-500 text-xs uppercase tracking-wider">
                            {unit.label}
                        </div>
                    </Card>
                ))}
            </div>
            <div className="text-center text-xs text-slate-500">
                <p>Launch Period: Aug 13 - Aug 20, 2025 (11:00 UTC)</p>
            </div>
        </div>
    );
};

export default CountdownTimer;