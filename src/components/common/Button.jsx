import React from 'react';
import { Link } from 'react-router-dom';

export default function Button({
  children,
  to,
  href,
  onClick,
  variant = 'primary', // 'primary', 'secondary', 'outline', 'ghost', 'glow'
  size = 'md', // 'sm', 'md', 'lg'
  icon: Icon,
  iconPosition = 'left',
  className = '',
  disabled = false,
  ...props
}) {
  const sizeStyles = {
    sm: 'px-3 py-1.5 text-xs font-bold gap-1.5 rounded-lg',
    md: 'px-4 py-2 text-xs sm:text-sm font-bold gap-2 rounded-xl',
    lg: 'px-6 py-3 text-sm sm:text-base font-extrabold gap-2.5 rounded-xl',
  };

  const variantStyles = {
    primary:
      'bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500 text-white shadow-lg shadow-orange-950 hover:from-orange-500 hover:to-amber-400 hover:shadow-orange-600/30 active:scale-[0.98]',
    secondary:
      'bg-slate-800/90 text-slate-100 hover:bg-slate-700/90 border border-slate-700/80 active:scale-[0.98]',
    outline:
      'bg-transparent text-slate-200 border border-slate-700 hover:border-orange-500/80 hover:text-orange-400 hover:bg-orange-500/10 active:scale-[0.98]',
    glow:
      'bg-gradient-to-r from-orange-600 to-amber-500 text-white shadow-[0_0_20px_rgba(249,115,22,0.5)] hover:shadow-[0_0_30px_rgba(249,115,22,0.8)] active:scale-[0.98]',
    ghost:
      'bg-transparent text-slate-400 hover:text-white hover:bg-white/5 active:scale-[0.98]'
  };

  const baseClasses = `inline-flex items-center justify-center uppercase tracking-wider transition-all duration-200 focus:outline-none disabled:opacity-50 disabled:pointer-events-none ${
    sizeStyles[size]
  } ${variantStyles[variant]} ${className}`;

  const content = (
    <>
      {Icon && iconPosition === 'left' && <Icon className="w-4 h-4 flex-shrink-0" />}
      <span>{children}</span>
      {Icon && iconPosition === 'right' && <Icon className="w-4 h-4 flex-shrink-0" />}
    </>
  );

  if (to) {
    return (
      <Link to={to} className={baseClasses} {...props}>
        {content}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={baseClasses} {...props}>
        {content}
      </a>
    );
  }

  return (
    <button onClick={onClick} disabled={disabled} className={baseClasses} {...props}>
      {content}
    </button>
  );
}
