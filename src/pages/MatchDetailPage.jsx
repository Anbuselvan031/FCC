import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Trophy, ArrowLeft } from 'lucide-react';
import ScorecardView from '../components/matches/ScorecardView';
import matchesData from '../data/matchesData';

export default function MatchDetailPage() {
  const { id } = useParams();
  const match = matchesData.find((m) => String(m.id) === String(id)) || matchesData[0];

  return (
    <div className="pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <ScorecardView match={match} />
    </div>
  );
}
