import React from 'react';

export default function LoadingSkeleton({ type = 'card', count = 3 }) {
  const items = Array.from({ length: count });

  if (type === 'card') {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {items.map((_, i) => (
          <div key={i} className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 animate-pulse space-y-4">
            <div className="w-full h-48 bg-slate-800/60 rounded-xl"></div>
            <div className="space-y-2">
              <div className="w-3/4 h-5 bg-slate-800/80 rounded"></div>
              <div className="w-1/2 h-3.5 bg-slate-800/40 rounded"></div>
            </div>
            <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-800/60">
              <div className="h-8 bg-slate-800/50 rounded"></div>
              <div className="h-8 bg-slate-800/50 rounded"></div>
              <div className="h-8 bg-slate-800/50 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (type === 'match') {
    return (
      <div className="space-y-4">
        {items.map((_, i) => (
          <div key={i} className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 animate-pulse space-y-4">
            <div className="flex justify-between items-center">
              <div className="w-32 h-4 bg-slate-800 rounded"></div>
              <div className="w-20 h-4 bg-slate-800 rounded"></div>
            </div>
            <div className="flex items-center justify-between gap-4 py-3">
              <div className="w-1/3 h-12 bg-slate-800 rounded-xl"></div>
              <div className="w-12 h-6 bg-slate-800 rounded-full"></div>
              <div className="w-1/3 h-12 bg-slate-800 rounded-xl"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (type === 'table') {
    return (
      <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 animate-pulse space-y-3">
        <div className="h-10 bg-slate-800 rounded-xl"></div>
        {items.map((_, i) => (
          <div key={i} className="h-12 bg-slate-800/40 rounded-lg"></div>
        ))}
      </div>
    );
  }

  return (
    <div className="w-full h-32 bg-slate-900/60 border border-slate-800 rounded-2xl animate-pulse"></div>
  );
}
