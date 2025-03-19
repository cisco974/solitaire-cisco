import React from 'react';
import { Trophy, Vibrate as Strategy, Brain, Target, Award } from 'lucide-react';

export function SpiderContent() {
  return (
    <div className="prose prose-lg max-w-none">
      {/* Game Modes */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Spider Solitaire Variants</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-2xl shadow-sm p-8">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">One Suit</h3>
            <div className="space-y-4 text-gray-600">
              <p>
                The perfect starting point for Spider Solitaire, using only Spades
                for easier sequence building and strategy learning.
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li>Eight decks of Spades</li>
                <li>Ideal for beginners</li>
                <li>70% win rate possible</li>
                <li>Focus on basic mechanics</li>
              </ul>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-8">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Two Suits</h3>
            <div className="space-y-4 text-gray-600">
              <p>
                A balanced challenge using Hearts and Spades, offering increased
                complexity while maintaining reasonable winning chances.
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li>Four decks of each suit</li>
                <li>Intermediate difficulty</li>
                <li>40% win rate average</li>
                <li>Strategic suit management</li>
              </ul>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-8">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Four Suits</h3>
            <div className="space-y-4 text-gray-600">
              <p>
                The ultimate Spider challenge using all four suits, requiring
                expert-level planning and strategic thinking.
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li>Two decks of each suit</li>
                <li>Expert difficulty level</li>
                <li>15% win rate typical</li>
                <li>Maximum complexity</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* About Spider */}
      <section className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">About Spider Solitaire</h2>

        <div className="mb-12">
          <h3 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Trophy className="w-6 h-6 text-emerald-600" />
            History and Evolution
          </h3>
          <div className="space-y-4 text-gray-600">
            <p>
              Spider Solitaire emerged in 1949 and gained massive popularity when
              Microsoft included it in Windows ME (2000). Its name comes from the
              eight foundation piles needed to win, reminiscent of a spider's eight legs.
            </p>
            <p>
              The game's unique multi-deck format and suit-based gameplay have made
              it a favorite among strategy enthusiasts and puzzle lovers worldwide.
            </p>
          </div>
        </div>

        <div className="mb-12">
          <h3 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Strategy className="w-6 h-6 text-emerald-600" />
            Winning Strategies
          </h3>
          <div className="space-y-4 text-gray-600">
            <p>
              Master these key strategies to improve your Spider Solitaire success rate:
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li>Expose face-down cards whenever possible</li>
              <li>Build same-suit sequences preferentially</li>
              <li>Keep empty columns for maneuvering</li>
              <li>Plan moves before dealing new cards</li>
              <li>Focus on completing one suit at a time</li>
            </ul>
          </div>
        </div>

        <div className="mb-12">
          <h3 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Brain className="w-6 h-6 text-emerald-600" />
            Game Statistics
          </h3>
          <div className="space-y-4 text-gray-600">
            <ul className="list-disc list-inside space-y-2">
              <li>Second most popular solitaire variant globally</li>
              <li>Average game duration: 15-20 minutes</li>
              <li>World record completion time: 3 minutes 2 seconds</li>
              <li>Highest recorded score: 45,982 points</li>
            </ul>
          </div>
        </div>

        <div>
          <h3 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Award className="w-6 h-6 text-emerald-600" />
            Spider Terminology
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-600">
            <div>
              <dl className="space-y-4">
                <div>
                  <dt className="font-medium text-gray-900">Tableau</dt>
                  <dd>The ten columns where cards are played</dd>
                </div>
                <div>
                  <dt className="font-medium text-gray-900">Stock</dt>
                  <dd>Additional cards dealt to all columns</dd>
                </div>
                <div>
                  <dt className="font-medium text-gray-900">Foundation</dt>
                  <dd>Completed sequences removed from play</dd>
                </div>
              </dl>
            </div>
            <div>
              <dl className="space-y-4">
                <div>
                  <dt className="font-medium text-gray-900">Suit Sequence</dt>
                  <dd>King to Ace in the same suit</dd>
                </div>
                <div>
                  <dt className="font-medium text-gray-900">Partial Build</dt>
                  <dd>Incomplete sequence of same-suit cards</dd>
                </div>
                <div>
                  <dt className="font-medium text-gray-900">Web</dt>
                  <dd>All tableau piles collectively</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}