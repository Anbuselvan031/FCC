import React, { useState } from 'react';
import statsData from '../../data/statsData';

export default function TeamAnalyticsCharts() {
  const analytics = statsData.analytics || {};
  const [activeChart, setActiveChart] = useState('runs'); // 'runs', 'wickets', 'winloss', 'toss'

  const winLoss = analytics.winLossDistribution || [];
  const tossDecisions = analytics.tossDecisions || [];
  const topRunScorers = analytics.runsByTopPlayers || [];
  const topWicketTakers = analytics.wicketsByTopPlayers || [];
  const recentForm = analytics.recentFormMatches || [];

  // Max calculations for clean progress bar scale
  const maxRuns = Math.max(...topRunScorers.map((p) => p.runs), 1);
  const maxWkts = Math.max(...topWicketTakers.map((p) => p.wickets), 1);
  const maxMatchRuns = Math.max(...recentForm.map((m) => Math.max(m.scored, m.conceded)), 1);

  return (
    <div className="space-y-8">
      {/* Chart Selector Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2 p-1 rounded-xl bg-slate-900 border border-slate-800">
          <button
            onClick={() => setActiveChart('runs')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
              activeChart === 'runs'
                ? 'bg-orange-500 text-white shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Runs by Player
          </button>
          <button
            onClick={() => setActiveChart('wickets')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
              activeChart === 'wickets'
                ? 'bg-amber-500 text-slate-950 shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Wickets by Player
          </button>
          <button
            onClick={() => setActiveChart('winloss')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
              activeChart === 'winloss'
                ? 'bg-emerald-500 text-white shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Wins vs Losses
          </button>
          <button
            onClick={() => setActiveChart('toss')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
              activeChart === 'toss'
                ? 'bg-cyan-500 text-slate-950 shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Toss Decisions
          </button>
        </div>

        <span className="text-xs text-slate-400 font-mono">
          Interactive Analytics • 319 Matches Recorded
        </span>
      </div>

      {/* Chart Canvas Area */}
      <div className="p-6 sm:p-8 rounded-2xl bg-[#0d1424] border border-slate-800 shadow-xl">
        {/* CHART 1: Runs by Top Players */}
        {activeChart === 'runs' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-display text-xl font-bold uppercase text-white tracking-wide">
                  Top Run Scorers Distribution
                </h4>
                <p className="text-xs text-slate-400 mt-0.5">
                  Verified CricHeroes career runs for Fahrenheit Cricket Club
                </p>
              </div>
              <span className="text-xs text-orange-400 font-bold uppercase px-3 py-1 bg-orange-500/10 rounded-full border border-orange-500/30">
                Orange Cap Tier
              </span>
            </div>

            <div className="space-y-4 pt-2">
              {topRunScorers.map((p, idx) => {
                const pct = Math.round((p.runs / maxRuns) * 100);
                return (
                  <div key={p.name} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs sm:text-sm font-sans">
                      <span className="font-bold text-white flex items-center gap-2">
                        <span className="text-xs text-slate-500 font-mono">#{idx + 1}</span>
                        {p.name}
                      </span>
                      <span className="font-mono font-bold text-orange-400">
                        {p.runs.toLocaleString()} runs
                      </span>
                    </div>

                    <div className="w-full h-3.5 rounded-full bg-slate-900 border border-slate-800 overflow-hidden p-0.5">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-orange-600 to-amber-400 transition-all duration-1000 shadow-[0_0_12px_rgba(249,115,22,0.4)]"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* CHART 2: Wickets by Top Players */}
        {activeChart === 'wickets' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-display text-xl font-bold uppercase text-white tracking-wide">
                  Top Wicket Takers Distribution
                </h4>
                <p className="text-xs text-slate-400 mt-0.5">
                  Verified CricHeroes career wickets for Fahrenheit Cricket Club
                </p>
              </div>
              <span className="text-xs text-amber-400 font-bold uppercase px-3 py-1 bg-amber-500/10 rounded-full border border-amber-500/30">
                Purple Cap Tier
              </span>
            </div>

            <div className="space-y-4 pt-2">
              {topWicketTakers.map((p, idx) => {
                const pct = Math.round((p.wickets / maxWkts) * 100);
                return (
                  <div key={p.name} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs sm:text-sm font-sans">
                      <span className="font-bold text-white flex items-center gap-2">
                        <span className="text-xs text-slate-500 font-mono">#{idx + 1}</span>
                        {p.name}
                      </span>
                      <span className="font-mono font-bold text-amber-400">
                        {p.wickets} wickets
                      </span>
                    </div>

                    <div className="w-full h-3.5 rounded-full bg-slate-900 border border-slate-800 overflow-hidden p-0.5">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-amber-500 to-yellow-300 transition-all duration-1000 shadow-[0_0_12px_rgba(245,158,11,0.4)]"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* CHART 3: Wins vs Losses */}
        {activeChart === 'winloss' && (
          <div className="space-y-6">
            <div>
              <h4 className="font-display text-xl font-bold uppercase text-white tracking-wide">
                Match Result Ratio
              </h4>
              <p className="text-xs text-slate-400 mt-0.5">
                Official CricHeroes record: 319 fixtures played since 24 August 2023
              </p>
            </div>

            {/* Visual Multi-segment Progress Bar */}
            <div className="space-y-3">
              <div className="w-full h-7 rounded-xl bg-slate-900 border border-slate-800 flex overflow-hidden p-0.5 gap-1">
                {winLoss.map((item) => (
                  <div
                    key={item.label}
                    className="h-full rounded-lg transition-all duration-1000 flex items-center justify-center text-[10px] font-black text-slate-950 font-mono truncate"
                    style={{
                      width: `${item.percentage}%`,
                      backgroundColor: item.color
                    }}
                    title={`${item.label}: ${item.count} (${item.percentage}%)`}
                  >
                    {item.percentage > 5 ? `${item.percentage}%` : ''}
                  </div>
                ))}
              </div>

              {/* Legend Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4">
                {winLoss.map((item) => (
                  <div
                    key={item.label}
                    className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className="w-3.5 h-3.5 rounded-full"
                        style={{ backgroundColor: item.color }}
                      />
                      <div>
                        <p className="text-xs font-bold text-white uppercase">{item.label}</p>
                        <p className="text-[11px] text-slate-400 font-mono">{item.percentage}% Share</p>
                      </div>
                    </div>
                    <span className="font-display text-2xl font-bold text-white font-mono">
                      {item.count}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* CHART 4: Toss Decisions */}
        {activeChart === 'toss' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-display text-xl font-bold uppercase text-white tracking-wide">
                  Toss Decisions Breakdown (159 Tosses Won)
                </h4>
                <p className="text-xs text-slate-400 mt-0.5">
                  Official distribution of Bat First vs Field First
                </p>
              </div>
            </div>

            <div className="space-y-4 pt-2">
              <div className="w-full h-7 rounded-xl bg-slate-900 border border-slate-800 flex overflow-hidden p-0.5 gap-1">
                {tossDecisions.map((item) => (
                  <div
                    key={item.label}
                    className="h-full rounded-lg transition-all duration-1000 flex items-center justify-center text-[10px] font-black text-slate-950 font-mono truncate"
                    style={{
                      width: `${item.percentage}%`,
                      backgroundColor: item.color
                    }}
                  >
                    {item.label} ({item.count})
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {tossDecisions.map((item) => (
                  <div
                    key={item.label}
                    className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className="w-3.5 h-3.5 rounded-full"
                        style={{ backgroundColor: item.color }}
                      />
                      <div>
                        <p className="text-xs font-bold text-white uppercase">{item.label}</p>
                        <p className="text-[11px] text-slate-400 font-mono">{item.percentage}% of Toss Wins</p>
                      </div>
                    </div>
                    <span className="font-display text-2xl font-bold text-white font-mono">
                      {item.count}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
