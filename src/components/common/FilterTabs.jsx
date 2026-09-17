import React from 'react';

export default function FilterTabs({
  tabs = [],
  activeTab,
  onTabChange,
  variant = 'default', // 'default', 'pills', 'sports'
  size = 'md'
}) {
  const sizeClasses = {
    sm: 'px-3 py-1 text-xs',
    md: 'px-4 py-2 text-xs sm:text-sm',
    lg: 'px-5 py-2.5 text-sm sm:text-base'
  };

  return (
    <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-900/90 border border-slate-800 overflow-x-auto max-w-full scrollbar-none">
      {tabs.map((tab) => {
        const tabKey = typeof tab === 'string' ? tab : tab.id;
        const tabLabel = typeof tab === 'string' ? tab : tab.label;
        const count = typeof tab === 'object' ? tab.count : null;
        const isActive = activeTab === tabKey;

        return (
          <button
            key={tabKey}
            onClick={() => onTabChange(tabKey)}
            className={`whitespace-nowrap font-bold tracking-wider uppercase rounded-lg transition-all duration-200 flex items-center gap-1.5 focus:outline-none ${
              sizeClasses[size]
            } ${
              isActive
                ? 'bg-gradient-to-r from-orange-600 to-amber-500 text-white shadow-md shadow-orange-950 font-extrabold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <span>{tabLabel}</span>
            {count !== null && count !== undefined && (
              <span
                className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono ${
                  isActive
                    ? 'bg-white/20 text-white'
                    : 'bg-slate-800 text-slate-400'
                }`}
              >
                {count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
