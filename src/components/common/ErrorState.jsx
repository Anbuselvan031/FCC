import React from 'react';
import { AlertTriangle, RotateCcw } from 'lucide-react';
import Button from './Button';

export default function ErrorState({
  title = "Something went wrong",
  message = "We encountered an issue loading this information. Please try again.",
  onRetry = () => window.location.reload()
}) {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center rounded-2xl bg-red-950/20 border border-red-500/30 my-6">
      <div className="w-14 h-14 rounded-2xl bg-red-500/15 border border-red-500/30 flex items-center justify-center text-red-400 mb-4">
        <AlertTriangle className="w-7 h-7" />
      </div>
      <h3 className="font-display text-xl font-bold uppercase tracking-wider text-white mb-2">
        {title}
      </h3>
      <p className="text-sm text-slate-400 max-w-md mb-6 leading-relaxed">
        {message}
      </p>
      <Button variant="primary" size="sm" onClick={onRetry} icon={RotateCcw}>
        Try Again
      </Button>
    </div>
  );
}
