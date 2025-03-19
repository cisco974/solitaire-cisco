'use client';

import React from 'react';
import { Trophy, Vibrate as Strategy, Brain, Target } from 'lucide-react';

export function KlondikeContent() {
  return (
    <div className="prose prose-lg max-w-none">
      {/* Game Modes */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Klondike Game Modes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-sm p-8">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Draw 1 Card</h3>
            <div className="space-y-4 text-gray-600">
              <p>
                The classic Klondike mode, perfect for beginners and those who prefer
                complete control over their game.
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li>One card drawn at a time</li>
                <li>Clearer view of available options</li>
                <li>Approximately 80% win rate</li>
                <li>Perfect for learning basic strategies</li>
              </ul>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-8">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Draw 3 Cards</h3>
            <div className="space-y-4 text-gray-600">
              <p>
                A more challenging version that requires deeper thinking and better
                resource management.
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li>Three cards drawn simultaneously</li>
                <li>Higher scoring for victories</li>
                <li>Approximately 50% win rate</li>
                <li>Recommended for experienced players</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* About Klondike */}
      <section className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">About Klondike</h2>

        <div className="mb-12 max-w-3xl mx-auto">
          <h3 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Trophy className="w-6 h-6 text-emerald-600 flex-shrink-0" />
            History of Klondike
          </h3>
          <div className="space-y-4 text-gray-600">
            <p>
              Klondike Solitaire gets its name from the Klondike region of Yukon, Canada,
              where it was popular among gold prospectors in the late 19th century. Its
              worldwide popularity exploded when Microsoft included it in Windows 3.0
              in 1990.
            </p>
            <p>
              This version of solitaire has become so iconic that it's often considered
              synonymous with solitaire itself, representing over 80% of all solitaire
              games played worldwide.
            </p>
          </div>
        </div>

        <div className="mb-12 max-w-3xl mx-auto">
          <h3 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Strategy className="w-6 h-6 text-emerald-600 flex-shrink-0" />
            Advanced Strategies
          </h3>
          <div className="space-y-4 text-gray-600">
            <p>
              To excel at Klondike, master these advanced techniques:
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li>Prioritize revealing face-down cards</li>
              <li>Keep columns balanced in height</li>
              <li>Create empty spaces strategically</li>
              <li>Avoid building Aces too early</li>
              <li>Use the stock pile efficiently</li>
            </ul>
          </div>
        </div>

        <div className="mb-12 max-w-3xl mx-auto">
          <h3 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Brain className="w-6 h-6 text-emerald-600 flex-shrink-0" />
            Statistics and Records
          </h3>
          <div className="space-y-4 text-gray-600">
            <ul className="list-disc list-inside space-y-2">
              <li>Over 35 billion games played on Windows</li>
              <li>Record time for a win: 30 seconds</li>
              <li>Highest recorded score: 24,800 points</li>
              <li>Average win rate: 80% in Draw 1 mode</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}