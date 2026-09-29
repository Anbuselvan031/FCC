import React, { useEffect, useState } from 'react';

export default function StatCard({
  title,
  value,
  suffix = '',
  prefix = '',
  icon: Icon,
  description,
  accentColor = 'orange', // 'orange', 'emerald', 'gold', 'cyan', 'crimson'
  trend = null
}) {
  const isNumeric = typeof value === 'number';
  const [displayValue, setDisplayValue] = useState(value ?? '--');

  useEffect(() => {
    if (value === undefined || value === null || value === '--') {
      setDisplayValue('--');
      return;
    }

    const numVal = typeof value === 'number' ? value : parseFloat(String(value).replace(/,/g, ''));
    if (isNaN(numVal)) {
      setDisplayValue(value);
      return;
    }

    const duration = 1200; // ms
    const startTime = performance.now();
    const isFloat = String(value).includes('.');

    let animationFrameId;
    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const current = numVal * easeProgress;

      if (isFloat) {
        setDisplayValue(current.toFixed(1));
      } else {
        setDisplayValue(Math.round(current).toLocaleString());
      }

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        setDisplayValue(typeof value === 'number' ? value.toLocaleString() : value);
      }
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [value]);

  const colorStyles = {
    orange: {
      border: 'border-orange-500/25 hover:border-orange-500/60',
      bg: 'from-orange-500/15 via-[#0e1628] to-[#0a0f1d]',
      text: 'text-orange-400',
      iconBg: 'bg-orange-500/15 text-orange-400',
      glow: 'hover:shadow-[0_10px_30px_rgba(249,115,22,0.25)]'
    },
    emerald: {
      border: 'border-emerald-500/25 hover:border-emerald-500/60',
      bg: 'from-emerald-500/15 via-[#0e1628] to-[#0a0f1d]',
      text: 'text-emerald-400',
      iconBg: 'bg-emerald-500/15 text-emerald-400',
      glow: 'hover:shadow-[0_10px_30px_rgba(16,185,129,0.25)]'
    },
    gold: {
      border: 'border-amber-500/25 hover:border-amber-500/60',
      bg: 'from-amber-500/15 via-[#0e1628] to-[#0a0f1d]',
      text: 'text-amber-400',
      iconBg: 'bg-amber-500/15 text-amber-400',
      glow: 'hover:shadow-[0_10px_30px_rgba(245,158,11,0.25)]'
    },
    cyan: {
      border: 'border-cyan-500/25 hover:border-cyan-500/60',
      bg: 'from-cyan-500/15 via-[#0e1628] to-[#0a0f1d]',
      text: 'text-cyan-400',
      iconBg: 'bg-cyan-500/15 text-cyan-400',
      glow: 'hover:shadow-[0_10px_30px_rgba(6,182,212,0.25)]'
    },
    crimson: {
      border: 'border-red-500/25 hover:border-red-500/60',
      bg: 'from-red-500/15 via-[#0e1628] to-[#0a0f1d]',
      text: 'text-red-400',
      iconBg: 'bg-red-500/15 text-red-400',
      glow: 'hover:shadow-[0_10px_30px_rgba(239,68,68,0.25)]'
    }
  };

  const style = colorStyles[accentColor] || colorStyles.orange;

  return (
    <div
      className={`relative p-5 rounded-2xl bg-gradient-to-br ${style.bg} border ${style.border} transition-all duration-300 transform hover:-translate-y-1 ${style.glow} group shine-sweep cursor-default animate-scale-in`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-1">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 font-sans">
            {title}
          </p>
          <div className="flex items-baseline gap-1">
            <span className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white group-hover:scale-105 transition-transform duration-200">
              {prefix}{displayValue}{suffix}
            </span>
            {trend && (
              <span className={`text-[11px] font-semibold ${trend > 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                {trend > 0 ? `+${trend}%` : `${trend}%`}
              </span>
            )}
          </div>
          {description && (
            <p className="text-[11px] text-slate-500 pt-1 leading-tight">
              {description}
            </p>
          )}
        </div>

        {Icon && (
          <div className={`p-2.5 rounded-xl ${style.iconBg} flex-shrink-0 transition-transform duration-300 group-hover:rotate-6`}>
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>

      {/* Card bottom highlight line */}
      <div className="absolute bottom-0 left-6 right-6 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
    </div>
  );
}
