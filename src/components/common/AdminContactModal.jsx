import React, { useState, useEffect } from 'react';
import { Mail, PhoneCall, Instagram, MessageSquare, Shield, X, MapPin, ExternalLink } from 'lucide-react';
import teamData from '../../data/teamData';

export default function AdminContactModal({ isOpen: propsIsOpen, onClose: propsOnClose }) {
  const [internalOpen, setInternalOpen] = useState(false);

  const isOpen = propsIsOpen !== undefined ? propsIsOpen : internalOpen;
  const handleClose = () => {
    if (propsOnClose) propsOnClose();
    setInternalOpen(false);
  };

  useEffect(() => {
    const handleOpenEvent = () => setInternalOpen(true);
    window.addEventListener('open-admin-contact', handleOpenEvent);
    return () => window.removeEventListener('open-admin-contact', handleOpenEvent);
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
      <div className="relative w-full max-w-lg rounded-3xl bg-[#0d1424] border border-orange-500/40 shadow-2xl shadow-orange-950/50 z-10 overflow-hidden transform transition-all animate-scale-in">
        {/* Top Gradient Stripe */}
        <div className="h-1.5 bg-gradient-to-r from-orange-600 via-amber-500 to-orange-400" />

        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/80">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-xs font-black uppercase tracking-widest text-orange-400 font-mono">
              CLUB ADMIN CONTACT DETAILS
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
          {/* Admin Identity Card */}
          <div className="flex items-center gap-4 p-4 rounded-2xl bg-[#090d16] border border-slate-800">
            <div className="relative w-16 h-16 rounded-full p-1 bg-gradient-to-tr from-orange-600 via-amber-500 to-orange-400 flex-shrink-0 shadow-lg shadow-orange-950">
              <img
                src={teamData.logo}
                alt="FCC Crest"
                className="w-full h-full object-cover rounded-full bg-slate-900"
              />
            </div>
            <div>
              <span className="text-[10px] text-slate-500 uppercase tracking-widest font-mono block">
                OFFICIAL CLUB ADMINISTRATOR & CAPTAIN
              </span>
              <h3 className="font-display text-2xl font-bold uppercase text-white tracking-wide">
                {teamData.contact.admin.name}
              </h3>
              <p className="text-xs text-orange-400 font-mono flex items-center gap-1.5 mt-0.5">
                <MapPin className="w-3.5 h-3.5" />
                <span>Coimbatore, Tamil Nadu</span>
              </p>
            </div>
          </div>

          {/* Contact Details List */}
          <div className="space-y-3">
            {/* Phone Number */}
            <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-emerald-500/40 transition-colors">
              <div className="flex items-center justify-between gap-2 mb-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono flex items-center gap-1.5">
                  <PhoneCall className="w-3.5 h-3.5 text-emerald-400" />
                  PHONE NUMBER
                </span>
                <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider">DIRECT LINE</span>
              </div>
              <p className="font-mono text-xl font-black text-white tracking-wide">
                {teamData.contact.phoneFormatted}
              </p>
              <div className="mt-3 flex items-center gap-2">
                <a
                  href={`tel:+91${teamData.contact.phone}`}
                  className="flex-1 py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 border border-slate-700 transition-colors"
                >
                  <PhoneCall className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Call Now</span>
                </a>
                <a
                  href={teamData.contact.whatsappUrl}
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
            <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-orange-500/40 transition-colors">
              <div className="flex items-center justify-between gap-2 mb-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-orange-400" />
                  OFFICIAL EMAIL ADDRESS
                </span>
                <span className="text-[10px] text-orange-400 font-bold uppercase tracking-wider">OFFICIAL</span>
              </div>
              <p className="text-sm sm:text-base font-bold text-white break-all font-mono">
                {teamData.contact.email}
              </p>
              <div className="mt-3">
                <a
                  href={`mailto:${teamData.contact.email}`}
                  className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-orange-600 to-amber-500 hover:from-orange-500 hover:to-amber-400 text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 shadow transition-colors"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Send Mail</span>
                </a>
              </div>
            </div>

            {/* Instagram Profile */}
            <a
              href={teamData.contact.instagram}
              target="_blank"
              rel="noreferrer"
              className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-pink-500/40 transition-all flex items-center justify-between gap-3 group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-pink-500/10 border border-pink-500/20 text-pink-400 flex items-center justify-center group-hover:bg-pink-500 group-hover:text-white transition-colors">
                  <Instagram className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider font-mono block">OFFICIAL INSTAGRAM</span>
                  <span className="text-sm font-bold text-white group-hover:text-pink-400 transition-colors">
                    {teamData.contact.instagramHandle}
                  </span>
                </div>
              </div>
              <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-pink-400 transition-colors" />
            </a>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3.5 bg-slate-950/90 border-t border-slate-800 text-center">
          <p className="text-[11px] text-slate-500 font-sans">
            Fahrenheit Cricket Club &bull; Established 24 August 2023 &bull; Coimbatore
          </p>
        </div>
      </div>
    </div>
  );
}
