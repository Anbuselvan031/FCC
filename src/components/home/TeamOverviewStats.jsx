import React from 'react';
import { Users, Trophy, Award, TrendingUp, AlertCircle, Percent } from 'lucide-react';
import StatCard from '../common/StatCard';
import teamData from '../../data/teamData';

export default function TeamOverviewStats() {
  const stats = teamData.statsSummary || {};

  const cards = [
    {
      title: 'Total Players',
      value: stats.totalPlayers,
      icon: Users,
      accentColor: 'gold',
      description: 'Registered active squad members'
    },
    {
      title: 'Matches Played',
      value: stats.totalMatches,
      icon: Trophy,
      accentColor: 'orange',
      description: 'Competitive fixtures on CricHeroes'
    },
    {
      title: 'Wins',
      value: stats.wins,
      icon: Award,
      accentColor: 'emerald',
      description: 'Confirmed tournament & series victories'
    },
    {
      title: 'Losses',
      value: stats.losses,
      icon: AlertCircle,
      accentColor: 'crimson',
      description: 'Challenged encounters'
    },
    {
      title: 'Win Percentage',
      value: stats.winPercentage,
      suffix: '%',
      icon: TrendingUp,
      accentColor: 'cyan',
      description: 'Overall club winning efficiency'
    }
  ];

  return (
    <section className="relative mt-4 sm:-mt-10 z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 lg:gap-5">
        {cards.map((card) => (
          <StatCard
            key={card.title}
            title={card.title}
            value={card.value ?? '--'}
            suffix={card.suffix || ''}
            icon={card.icon}
            accentColor={card.accentColor}
            description={card.description}
          />
        ))}
      </div>
    </section>
  );
}
