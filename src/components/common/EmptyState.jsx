import React from 'react';
import { ShieldAlert, RefreshCw } from 'lucide-react';
import Button from './Button';

export default function EmptyState({
  title = "No Data Found",
  message = "No items match your criteria at this time.",
  icon: Icon = ShieldAlert,
  actionText = null,
  onAction = null
}) {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center rounded-2xl bg-[#0d131f]/60 border border-slate-800/80 my-6">
      <div className="w-14 h-14 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400 mb-4 shadow-inner">
        <Icon className="w-7 h-7" />
      </div>
      <h3 className="font-display text-xl font-bold uppercase tracking-wider text-white mb-2">
        {title}
      </h3>
      <p className="text-sm text-slate-400 max-w-md mb-6 leading-relaxed">
        {message}
      </p>
      {actionText && onAction && (
        <Button variant="outline" size="sm" onClick={onAction} icon={RefreshCw}>
          {actionText}
        </Button>
      )}
    </div>
  );
}
