import React from 'react';
import { GameState } from '../types/cards';

interface GameStatsProps {
  stats: Pick<GameState, 'gamesPlayed' | 'gamesWon' | 'bestScores' | 'difficulty'>;
}

export function GameStats({ stats }: GameStatsProps) {
  const winRate = stats.gamesPlayed > 0 
    ? Math.round((stats.gamesWon / stats.gamesPlayed) * 100) 
    : 0;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {/* Games Played */}
      <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl p-6 text-white shadow-lg transform hover:scale-105 transition-transform">
        <h3 className="text-emerald-100 text-sm font-medium mb-1">Games Played</h3>
        <p className="text-3xl font-bold tracking-tight">{stats.gamesPlayed}</p>
        <div className="absolute top-2 right-2 opacity-10">
          <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
            <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
          </svg>
        </div>
      </div>

      {/* Games Won */}
      <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white shadow-lg transform hover:scale-105 transition-transform">
        <h3 className="text-blue-100 text-sm font-medium mb-1">Games Won</h3>
        <p className="text-3xl font-bold tracking-tight">{stats.gamesWon}</p>
        <div className="absolute top-2 right-2 opacity-10">
          <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z" clipRule="evenodd" />
          </svg>
        </div>
      </div>

      {/* Win Rate */}
      <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white shadow-lg transform hover:scale-105 transition-transform">
        <h3 className="text-purple-100 text-sm font-medium mb-1">Win Rate</h3>
        <p className="text-3xl font-bold tracking-tight">{winRate}%</p>
        <div className="absolute top-2 right-2 opacity-10">
          <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
            <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
          </svg>
        </div>
      </div>

      {/* Best Score */}
      <div className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl p-6 text-white shadow-lg transform hover:scale-105 transition-transform">
        <h3 className="text-amber-100 text-sm font-medium mb-1">Best Score ({stats.difficulty})</h3>
        <p className="text-3xl font-bold tracking-tight">{stats.bestScores[stats.difficulty]}</p>
        <div className="absolute top-2 right-2 opacity-10">
          <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5 3a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V5a2 2 0 00-2-2H5zm9 4a1 1 0 10-2 0v6a1 1 0 102 0V7zm-3 2a1 1 0 10-2 0v4a1 1 0 102 0V9zm-3 3a1 1 0 10-2 0v1a1 1 0 102 0v-1z" clipRule="evenodd" />
          </svg>
        </div>
      </div>
    </div>
  );
}