import React, { useState, useEffect } from 'react';
import { Mail, PhoneCall, MessageSquare, X, MapPin, Smartphone, Code2, Sparkles } from 'lucide-react';

export default function FreelanceContactModal({ isOpen: propsIsOpen, onClose: propsOnClose }) {
  const [internalOpen, setInternalOpen] = useState(false);

  const isOpen = propsIsOpen !== undefined ? propsIsOpen : internalOpen;
  const handleClose = () => {
    if (propsOnClose) propsOnClose();
    setInternalOpen(false);
  };

  useEffect(() => {
    const handleOpen = () => setInternalOpen(true);
    window.addEventListener('open-work-with-me', handleOpen);
    return () => window.removeEventListener('open-work-with-me', handleOpen);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) handleClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={handleClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-lg rounded-3xl bg-[#0d1424] border border-amber-500/40 shadow-2xl shadow-amber-950/50 z-10 overflow-hidden transform transition-all animate-scale-in">
        {/* Top Gradient Stripe */}
        <div className="h-1.5 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-400" />

        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/90">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
            <span className="text-xs font-black uppercase tracking-widest text-amber-400 font-mono">
              FREELANCE WORK WITH ME • DIRECT CONTACT
            </span>
          </div>
          <button
            onClick={handleClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6">
          {/* Creator Identity Card */}
          <div className="flex items-center gap-4 p-4 rounded-2xl bg-[#090d16] border border-slate-800">
            <div className="w-16 h-16 rounded-full p-1 bg-gradient-to-tr from-amber-500 via-orange-500 to-amber-400 flex items-center justify-center flex-shrink-0 shadow-lg shadow-orange-950">
              <div className="w-full h-full rounded-full bg-slate-950 flex items-center justify-center text-amber-400 font-display font-black text-xl">
                AK
              </div>
            </div>
            <div>
              <span className="text-[10px] text-amber-400 uppercase tracking-widest font-mono font-bold block">
                FREELANCE UI/UX &amp; FRONTEND DEVELOPER
              </span>
              <h3 className="font-display text-2xl font-bold uppercase text-white tracking-wide">
                AKASH
              </h3>
              <p className="text-xs text-slate-400 font-mono flex items-center gap-1.5 mt-0.5">
                <MapPin className="w-3.5 h-3.5 text-orange-400" />
                <span>Coimbatore, Tamil Nadu</span>
              </p>
            </div>
          </div>

          {/* Contact Details List */}
          <div className="space-y-3">
            {/* Phone Number / WhatsApp */}
            <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-emerald-500/40 transition-colors">
              <div className="flex items-center justify-between gap-2 mb-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono flex items-center gap-1.5">
                  <Smartphone className="w-3.5 h-3.5 text-emerald-400" />
                  MOBILE / WHATSAPP
                </span>
                <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider">DIRECT LINE</span>
              </div>
              <p className="font-mono text-xl font-black text-white tracking-wide">
                7708231810
              </p>
              <div className="mt-3 flex items-center gap-2">
                <a
                  href="tel:7708231810"
                  className="flex-1 py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 border border-slate-700 transition-colors"
                >
                  <PhoneCall className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Call Now</span>
                </a>
                <a
                  href="https://wa.me/917708231810?text=Hi%20Akash%2C%20I'd%20like%20to%20discuss%20a%20website%20project."
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 shadow transition-colors"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Email Address */}
            <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-amber-500/40 transition-colors">
              <div className="flex items-center justify-between gap-2 mb-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-amber-400" />
                  DIRECT EMAIL ADDRESS
                </span>
                <span className="text-[10px] text-amber-400 font-bold uppercase tracking-wider">FREELANCE</span>
              </div>
              <p className="text-sm sm:text-base font-bold text-white break-all font-mono">
                akashworkofficial27@gmail.com
              </p>
              <div className="mt-3">
                <a
                  href="mailto:akashworkofficial27@gmail.com?subject=Freelance%20Project%20Inquiry&body=Hi%20Akash%2C%20I%20have%20a%20project%20in%20mind%20and%20would%20like%20to%20discuss%20it%20with%20you."
                  className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-400 hover:from-amber-400 hover:to-orange-300 text-slate-950 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 shadow transition-colors"
                >
                  <Mail className="w-3.5 h-3.5 text-slate-950" />
                  <span>Send Mail</span>
                </a>
              </div>
            </div>

            {/* Services Offered */}
            <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider font-mono block">
                SERVICES OFFERED
              </span>
              <div className="flex flex-wrap gap-1.5 text-[11px] font-medium text-slate-300">
                <span className="px-2.5 py-1 rounded-lg bg-slate-800/80 border border-slate-700/60">UI/UX Design</span>
                <span className="px-2.5 py-1 rounded-lg bg-slate-800/80 border border-slate-700/60">Frontend Development</span>
                <span className="px-2.5 py-1 rounded-lg bg-slate-800/80 border border-slate-700/60">Responsive Websites</span>
                <span className="px-2.5 py-1 rounded-lg bg-slate-800/80 border border-slate-700/60">Figma to Web</span>
                <span className="px-2.5 py-1 rounded-lg bg-slate-800/80 border border-slate-700/60">Bug Fixes &amp; Polish</span>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3.5 bg-slate-950/90 border-t border-slate-800 text-center">
          <p className="text-[11px] text-slate-500 font-sans">
            Designed &amp; Developed by Akash &bull; Available for Freelance Projects
          </p>
        </div>
      </div>
    </div>
  );
}
