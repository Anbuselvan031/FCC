import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldAlert, Home, ArrowLeft } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="min-h-[75vh] flex flex-col items-center justify-center text-center px-4 pt-28 pb-20">
      <div className="w-20 h-20 rounded-3xl bg-orange-500/15 border border-orange-500/30 flex items-center justify-center text-orange-400 mb-6 shadow-2xl">
        <ShieldAlert className="w-10 h-10" />
      </div>

      <h1 className="font-display font-black text-6xl sm:text-8xl text-white tracking-tight">
        404
      </h1>
      <h2 className="font-display text-2xl sm:text-3xl font-bold uppercase text-orange-400 mt-2">
        OUT OF BOUNDS
      </h2>
      <p className="text-sm text-slate-400 max-w-md mt-3 leading-relaxed font-sans">
        The cricket pitch or page you're searching for does not exist or has been shifted in the fixture schedule.
      </p>

      <div className="mt-8 flex items-center gap-4">
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-display text-sm font-bold uppercase tracking-wider text-white bg-gradient-to-r from-orange-600 to-amber-500 hover:from-orange-500 hover:to-amber-400 shadow-xl transition-all"
        >
          <Home className="w-4 h-4" />
          <span>Back to Pavilion (Home)</span>
        </Link>
      </div>
    </div>
  );
}
