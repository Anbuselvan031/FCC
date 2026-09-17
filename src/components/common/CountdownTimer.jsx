import React, { useState, useEffect } from 'react';

export default function CountdownTimer({ targetDate, compact = false }) {
  const calculateTimeLeft = () => {
    const difference = new Date(targetDate).getTime() - new Date().getTime();
    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, expired: true };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
      expired: false
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  if (timeLeft.expired) {
    return (
      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-bold uppercase tracking-wider animate-pulse">
        <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
        MATCH DAY • LIVE NOW
      </div>
    );
  }

  const units = [
    { label: 'DAYS', value: String(timeLeft.days).padStart(2, '0') },
    { label: 'HOURS', value: String(timeLeft.hours).padStart(2, '0') },
    { label: 'MINUTES', value: String(timeLeft.minutes).padStart(2, '0') },
    { label: 'SECONDS', value: String(timeLeft.seconds).padStart(2, '0') },
  ];

  if (compact) {
    return (
      <div className="flex items-center gap-2 font-mono text-xs">
        {units.map((unit, i) => (
          <React.Fragment key={unit.label}>
            <div className="flex flex-col items-center bg-slate-900/90 px-2 py-1 rounded border border-slate-800">
              <span className="font-bold text-orange-400">{unit.value}</span>
              <span className="text-[8px] text-slate-500 font-sans tracking-tighter">{unit.label[0]}</span>
            </div>
            {i < units.length - 1 && <span className="text-slate-600 font-bold">:</span>}
          </React.Fragment>
        ))}
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center gap-2 sm:gap-3">
      {units.map((unit, i) => (
        <React.Fragment key={unit.label}>
          <div className="flex flex-col items-center min-w-[54px] sm:min-w-[64px] p-2 sm:p-2.5 rounded-xl bg-gradient-to-b from-[#131b2c] to-[#0a0f1a] border border-white/10 shadow-lg shadow-black/40">
            <span className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight">
              {unit.value}
            </span>
            <span className="text-[9px] sm:text-[10px] font-bold text-orange-400 uppercase tracking-widest mt-0.5">
              {unit.label}
            </span>
          </div>
          {i < units.length - 1 && (
            <span className="text-orange-500 font-display text-2xl font-bold -mt-3">:</span>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}
