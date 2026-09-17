import React from 'react';
import { Calendar, Trophy, Award, MapPin, ChevronRight, CheckCircle2 } from 'lucide-react';
import teamData from '../../data/teamData';

export default function TeamJourney() {
  const milestones = teamData.timeline || [];

  return (
    <section className="py-12">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-orange-400 mb-2">
          <Trophy className="w-3.5 h-3.5 text-orange-500" />
          HISTORICAL MILESTONES
        </div>
        <h2 className="font-display text-3xl sm:text-4xl font-bold uppercase tracking-tight text-white">
          THE TEAM JOURNEY
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 mt-2 leading-relaxed">
          Tracing the relentless rise of Fahrenheit Cricket Club from its registration in August 2023 to competing in 300+ matches in Coimbatore.
        </p>
      </div>

      {/* Responsive Timeline */}
      <div className="relative max-w-4xl mx-auto px-4">
        {/* Central vertical line on desktop */}
        <div className="absolute left-4 sm:left-1/2 top-4 bottom-4 w-0.5 bg-gradient-to-b from-orange-500 via-amber-500/50 to-slate-800 -translate-x-1/2"></div>

        <div className="space-y-8 sm:space-y-12">
          {milestones.map((item, index) => {
            const isEven = index % 2 === 0;
            return (
              <div
                key={index}
                className={`relative flex flex-col sm:flex-row items-start sm:items-center ${
                  isEven ? 'sm:flex-row-reverse' : ''
                } gap-6 sm:gap-10`}
              >
                {/* Timeline Marker Point */}
                <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[#080d18] border-2 border-orange-500 flex items-center justify-center text-orange-400 z-10 shadow-lg shadow-orange-950">
                  <span className="w-2.5 h-2.5 rounded-full bg-orange-400 animate-ping"></span>
                </div>

                {/* Timeline Card */}
                <div className="ml-10 sm:ml-0 sm:w-1/2">
                  <div
                    className={`p-6 rounded-2xl bg-[#0d1424]/90 border border-slate-800 hover:border-orange-500/40 shadow-xl transition-all duration-300 group hover:-translate-y-1.5 hover:shadow-orange-500/10 shine-sweep ${
                      isEven ? 'sm:text-left' : 'sm:text-right'
                    }`}
                  >
                    <div
                      className={`flex items-center gap-2 mb-2 ${
                        isEven ? 'justify-start' : 'sm:justify-end justify-start'
                      }`}
                    >
                      <span className="px-2.5 py-0.5 rounded-full bg-orange-500/15 text-orange-400 text-[10px] font-black uppercase tracking-wider border border-orange-500/20">
                        {item.tag || item.year}
                      </span>
                      <span className="text-xs font-semibold text-slate-400 flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-orange-400" />
                        {item.date}
                      </span>
                    </div>

                    <h3 className="font-display text-xl font-bold uppercase tracking-wide text-white group-hover:text-orange-400 transition-colors">
                      {item.title}
                    </h3>

                    <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>

                {/* Spacer for desktop alignment */}
                <div className="hidden sm:block sm:w-1/2"></div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
