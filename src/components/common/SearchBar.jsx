import React from 'react';
import { Search, X } from 'lucide-react';

export default function SearchBar({
  value,
  onChange,
  placeholder = "Search...",
  onClear,
  totalResults = null
}) {
  return (
    <div className="relative flex-1 min-w-[240px]">
      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
        <Search className="w-4 h-4" />
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-10 pr-10 py-2 sm:py-2.5 rounded-xl bg-slate-900/90 border border-slate-800 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-orange-500/60 focus:ring-2 focus:ring-orange-500/20 transition-all"
      />
      {value && (
        <button
          onClick={onClear || (() => onChange(''))}
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-white"
        >
          <X className="w-4 h-4" />
        </button>
      )}
      {totalResults !== null && !value && (
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-slate-500 text-xs">
          {totalResults} items
        </div>
      )}
    </div>
  );
}
