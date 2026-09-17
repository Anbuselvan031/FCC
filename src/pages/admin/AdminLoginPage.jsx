import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail, ShieldAlert, ArrowRight, CheckCircle2, PhoneCall, Shield, MessageSquare } from 'lucide-react';
import authService from '../../services/authService';
import teamData from '../../data/teamData';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await authService.login({ email, password });
      navigate('/admin');
    } catch (err) {
      setError(err.message || 'Invalid admin credentials. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center pt-28 pb-16 px-4">
      <div className="w-full max-w-md bg-slate-900/90 border border-slate-800/80 rounded-2xl p-8 backdrop-blur-md shadow-2xl">
        <div className="text-center mb-6">
          <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-500">
            <Lock className="w-7 h-7" />
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800/60 border border-slate-700/50 text-[10px] font-mono tracking-widest text-slate-300 uppercase mb-2">
            AUTHORIZED PERSONNEL ONLY
          </div>
          <h1 className="font-display text-2xl font-bold uppercase tracking-wide text-white">
            FCC ADMIN PORTAL
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Sign in to manage squad, matches, and team records
          </p>
        </div>

        {/* Dedicated Admin Contact Box */}
        <div className="mb-6 p-4 rounded-2xl bg-[#090d16] border border-orange-500/30 text-center space-y-2.5">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-orange-400">
            <Shield className="w-3.5 h-3.5 text-orange-500" />
            <span>CLUB ADMIN CONTACT</span>
          </div>
          <p className="text-sm font-bold text-white">
            Admin: <span className="text-orange-400 uppercase">{teamData.contact.admin.name}</span>
          </p>
          <div className="flex flex-col gap-1.5 text-xs pt-1 border-t border-slate-800">
            <a
              href={`tel:+91${teamData.contact.phone}`}
              className="text-emerald-400 font-mono font-bold hover:underline flex items-center justify-center gap-1.5"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>{teamData.contact.phoneFormatted}</span>
            </a>
            <a
              href={`mailto:${teamData.contact.email}`}
              className="text-slate-300 font-mono text-[11px] hover:text-orange-400 hover:underline flex items-center justify-center gap-1.5 truncate"
            >
              <Mail className="w-3.5 h-3.5 text-orange-400" />
              <span>{teamData.contact.email}</span>
            </a>
          </div>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 flex items-start gap-3 text-red-400 text-xs">
            <ShieldAlert className="w-4 h-4 flex-shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
              Admin Email / Username
            </label>
            <div className="relative">
              <input
                type="text"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@fahrenheitcc.com"
                className="w-full px-4 py-3 pl-11 rounded-xl bg-slate-950/80 border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-orange-500/50 transition-colors"
              />
              <Mail className="w-4 h-4 text-slate-500 absolute left-4 top-3.5" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full px-4 py-3 pl-11 rounded-xl bg-slate-950/80 border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-orange-500/50 transition-colors"
              />
              <Lock className="w-4 h-4 text-slate-500 absolute left-4 top-3.5" />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 py-3 px-6 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg shadow-orange-500/20 transition-all disabled:opacity-50"
          >
            {loading ? 'Authenticating...' : 'Access Dashboard'}
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-slate-800/80 text-center">
          <p className="text-[11px] text-slate-500">
            Fahrenheit Cricket Club Management System &bull; JWT Protected
          </p>
        </div>
      </div>
    </div>
  );
}
