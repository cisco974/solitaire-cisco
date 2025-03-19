'use client';

import React, { useState } from 'react';
import { Trophy, Sparkles, Brain, Zap, Target, Star, Award, ChevronDown, ChevronUp } from 'lucide-react';

interface GameDescriptionProps {
  gameType: 'klondike' | 'spider' | 'freecell';
}

export function GameDescription({ gameType }: GameDescriptionProps) {
  const [showTerminology, setShowTerminology] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [showStrategy, setShowStrategy] = useState(false);

  const gameData = {
    klondike: {
      title: 'Classic Solitaire',
      subtitle: 'The World\'s Most Popular Card Game',
      overview: {
        title: 'Master the Classic',
        icon: Trophy,
        description: 'Experience the timeless appeal of Klondike Solitaire, where strategy meets luck in perfect harmony. Build foundation piles from Ace to King while managing your resources and planning ahead.'
      },
      features: [
        'Draw 1 or 3 cards mode for different challenge levels',
        'Smart auto-complete feature for endgame optimization',
        'Unlimited undos to perfect your strategy',
        'Multiple scoring systems for competitive play'
      ],
      howToPlay: [
        {
          title: 'Setup',
          description: 'The game begins with seven tableau piles, with the top card of each pile face up. The remaining cards form the stock pile.'
        },
        {
          title: 'Building Rules',
          description: 'Create descending sequences with alternating colors in the tableau. Build foundation piles up from Ace to King in each suit.'
        },
        {
          title: 'Stock Usage',
          description: 'Draw cards from the stock when you need them. The stock can be recycled when depleted, giving you multiple chances to win.'
        },
        {
          title: 'Victory',
          description: 'Complete all four foundation piles to win. Use the auto-complete feature when all cards are face up for a quick finish.'
        }
      ]
    },
    spider: {
      title: 'Spider Solitaire',
      subtitle: 'A Web of Strategic Possibilities',
      overview: {
        title: 'Eight-Suit Challenge',
        icon: Target,
        description: 'Dive into Spider Solitaire, where mastering multiple suits and complex sequences leads to victory. Choose your difficulty level and test your skills against one of solitaire\'s most engaging variants.'
      },
      features: [
        'Three difficulty modes: 1, 2, or 4 suits',
        'Progressive dealing system for dynamic gameplay',
        'In-game move suggestions and hints',
        'Advanced scoring based on efficiency'
      ],
      howToPlay: [
        {
          title: 'Initial Layout',
          description: 'Start with ten tableau piles and multiple decks. The number of suits in play determines the game\'s complexity.'
        },
        {
          title: 'Sequence Building',
          description: 'Create descending sequences regardless of suit. Moving grouped cards requires them to be of the same suit.'
        },
        {
          title: 'Dealing New Cards',
          description: 'When stuck, deal a new card to each tableau pile. Plan carefully as all cards must be dealt to win.'
        },
        {
          title: 'Completing Sequences',
          description: 'Remove completed suit sequences (King to Ace) automatically. Complete eight sequences to win the game.'
        }
      ]
    },
    freecell: {
      title: 'FreeCell Solitaire',
      subtitle: 'Pure Strategy, Perfect Challenge',
      overview: {
        title: 'Strategic Mastery',
        icon: Star,
        description: 'Welcome to FreeCell, where every game is solvable and victory depends purely on skill. With all cards visible from the start, plan your moves carefully and use the free cells wisely.'
      },
      features: [
        'All cards visible from the start',
        'Four free cells for temporary storage',
        'Multiple difficulty levels',
        'Advanced move validation system'
      ],
      howToPlay: [
        {
          title: 'Free Cell Usage',
          description: 'Use the four free cells as temporary storage to create new opportunities and solve complex situations.'
        },
        {
          title: 'Moving Rules',
          description: 'The number of cards you can move depends on available free cells and empty columns. Plan your moves carefully.'
        },
        {
          title: 'Building Strategy',
          description: 'Create descending sequences with alternating colors in the tableau. Build foundation piles up from Ace to King.'
        },
        {
          title: 'Winning Approach',
          description: 'Clear all cards to the foundation piles to win. Every game can be solved with the right strategy.'
        }
      ]
    }
  };

  const game = gameData[gameType];

  return (
    <div className="prose prose-lg max-w-none text-gray-600">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold tracking-tight text-gray-900 mb-2">
          {game.title}
        </h2>
        <p className="text-xl text-gray-600">{game.subtitle}</p>
      </div>

      {/* Overview Section */}
      <div className="rounded-2xl p-8 mb-12 bg-gradient-to-br from-emerald-50/50 to-emerald-100/50">
        <div className="flex items-start gap-6">
          <game.overview.icon className="w-12 h-12 text-emerald-600 flex-shrink-0" />
          <div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              {game.overview.title}
            </h3>
            <p className="text-gray-600 leading-relaxed">
              {game.overview.description}
            </p>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="mb-12">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-emerald-600" />
          Key Features
        </h3>
        <ul className="space-y-3">
          {game.features.map((feature, index) => (
            <li key={index} className="flex items-center gap-3 text-gray-600">
              <span className="w-2 h-2 bg-emerald-600 rounded-full flex-shrink-0" />
              {feature}
            </li>
          ))}
        </ul>
      </div>

      {/* How to Play Section */}
      <div className="rounded-2xl p-8 bg-gradient-to-br from-gray-50/50 to-gray-100/50">
        <h3 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
          <Brain className="w-6 h-6 text-emerald-600" />
          How to Play
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {game.howToPlay.map((step, index) => (
            <div key={index} className="rounded-xl p-6 bg-white/50">
              <div className="flex items-start gap-3 mb-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-medium">
                  {index + 1}
                </div>
                <h4 className="font-medium text-gray-900 mt-1">{step.title}</h4>
              </div>
              <p className="text-gray-600 pl-11">{step.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Collapsible Sections */}
      <div className="mt-8 space-y-4">
        {/* Terminology Section */}
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <button
            onClick={() => setShowTerminology(!showTerminology)}
            className="w-full px-6 py-4 flex items-center justify-between bg-white/50 hover:bg-white/75 transition-colors"
          >
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-emerald-600" />
              <span className="font-medium text-gray-900">Game Terminology</span>
            </div>
            {showTerminology ? (
              <ChevronUp className="w-5 h-5 text-gray-400" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-400" />
            )}
          </button>
          {showTerminology && (
            <div className="px-6 py-4 bg-white/30">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <dl className="space-y-4">
                  <div>
                    <dt className="font-medium text-gray-900">Tableau</dt>
                    <dd>The main playing area with card columns</dd>
                  </div>
                  <div>
                    <dt className="font-medium text-gray-900">Foundation</dt>
                    <dd>Final piles where cards are built up by suit</dd>
                  </div>
                </dl>
                <dl className="space-y-4">
                  <div>
                    <dt className="font-medium text-gray-900">Stock</dt>
                    <dd>Unused cards available for drawing</dd>
                  </div>
                  <div>
                    <dt className="font-medium text-gray-900">Waste</dt>
                    <dd>Cards drawn from the stock pile</dd>
                  </div>
                </dl>
              </div>
            </div>
          )}
        </div>

        {/* History Section */}
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <button
            onClick={() => setShowHistory(!showHistory)}
            className="w-full px-6 py-4 flex items-center justify-between bg-white/50 hover:bg-white/75 transition-colors"
          >
            <div className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-emerald-600" />
              <span className="font-medium text-gray-900">History</span>
            </div>
            {showHistory ? (
              <ChevronUp className="w-5 h-5 text-gray-400" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-400" />
            )}
          </button>
          {showHistory && (
            <div className="px-6 py-4 bg-white/30">
              <p className="text-gray-600">
                The game originated in the late 18th century and gained widespread popularity
                through its inclusion in Microsoft Windows in the 1990s. It has since become
                one of the most played computer games in history.
              </p>
            </div>
          )}
        </div>

        {/* Strategy Section */}
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <button
            onClick={() => setShowStrategy(!showStrategy)}
            className="w-full px-6 py-4 flex items-center justify-between bg-white/50 hover:bg-white/75 transition-colors"
          >
            <div className="flex items-center gap-2">
              <Target className="w-5 h-5 text-emerald-600" />
              <span className="font-medium text-gray-900">Strategy Tips</span>
            </div>
            {showStrategy ? (
              <ChevronUp className="w-5 h-5 text-gray-400" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-400" />
            )}
          </button>
          {showStrategy && (
            <div className="px-6 py-4 bg-white/30">
              <ul className="space-y-2">
                <li>• Always try to reveal face-down cards first</li>
                <li>• Keep empty columns available for temporary storage</li>
                <li>• Build foundations evenly across all suits</li>
                <li>• Plan several moves ahead</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}