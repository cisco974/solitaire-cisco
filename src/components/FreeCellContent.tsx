import React from "react";
import { Award, Brain, Trophy, Vibrate as Strategy } from "lucide-react";

export function FreeCellContent() {
  return (
    <div className="prose prose-lg max-w-none">
      {/* Game Modes */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">
          FreeCell Difficulty Levels
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-2xl shadow-sm p-8">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              Easy Mode
            </h3>
            <div className="space-y-4 text-gray-600">
              <p>
                Perfect for learning FreeCell mechanics with more forgiving
                gameplay and helpful features.
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li>Move suggestions available</li>
                <li>Unlimited undos</li>
                <li>Simpler card arrangements</li>
                <li>Auto-complete available earlier</li>
              </ul>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-8">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              Standard Mode
            </h3>
            <div className="space-y-4 text-gray-600">
              <p>
                The classic FreeCell experience with balanced difficulty and
                strategic depth.
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li>Traditional game rules</li>
                <li>Limited move suggestions</li>
                <li>Standard card distribution</li>
                <li>Regular auto-complete rules</li>
              </ul>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-8">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              Challenge Mode
            </h3>
            <div className="space-y-4 text-gray-600">
              <p>
                Test your skills with more complex arrangements and stricter
                gameplay rules.
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li>No move suggestions</li>
                <li>Limited undos</li>
                <li>Complex initial layouts</li>
                <li>Strict auto-complete conditions</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* About FreeCell */}
      <section className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">
          About FreeCell
        </h2>

        <div className="mb-12">
          <h3 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Trophy className="w-6 h-6 text-emerald-600" />
            History and Significance
          </h3>
          <div className="space-y-4 text-gray-600">
            <p>
              FreeCell was created by Paul Alfille in 1978 for the PLATO
              computer system. It gained widespread recognition through
              Microsoft Windows, where it was included as a standard game from
              Windows 95 to Windows 7.
            </p>
            <p>
              Unlike most solitaire games, FreeCell is almost always winnable,
              with only one known impossible deal out of the original 32,000
              Microsoft deals. This makes it unique among solitaire variants.
            </p>
          </div>
        </div>

        <div className="mb-12">
          <h3 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Strategy className="w-6 h-6 text-emerald-600" />
            Advanced Techniques
          </h3>
          <div className="space-y-4 text-gray-600">
            <p>Improve your FreeCell mastery with these expert strategies:</p>
            <ul className="list-disc list-inside space-y-2">
              <li>Plan sequences using free cells strategically</li>
              <li>Keep empty columns for maximum flexibility</li>
              <li>Calculate maximum movable cards</li>
              <li>Build foundations evenly</li>
              <li>Use supermoves efficiently</li>
            </ul>
          </div>
        </div>

        <div className="mb-12">
          <h3 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Brain className="w-6 h-6 text-emerald-600" />
            Game Facts
          </h3>
          <div className="space-y-4 text-gray-600">
            <ul className="list-disc list-inside space-y-2">
              <li>99.999% of deals are solvable</li>
              <li>World record solve time: 25 seconds</li>
              <li>Original Microsoft collection: 32,000 games</li>
              <li>Modern versions: over 1 million unique deals</li>
            </ul>
          </div>
        </div>

        <div>
          <h3 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Award className="w-6 h-6 text-emerald-600" />
            Key Concepts
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-600">
            <div>
              <dl className="space-y-4">
                <div>
                  <dt className="font-medium text-gray-900">Free Cells</dt>
                  <dd>Four cells for temporary card storage</dd>
                </div>
                <div>
                  <dt className="font-medium text-gray-900">Home Cells</dt>
                  <dd>Foundation piles for final card placement</dd>
                </div>
                <div>
                  <dt className="font-medium text-gray-900">Cascade</dt>
                  <dd>Eight columns of cards in play</dd>
                </div>
              </dl>
            </div>
            <div>
              <dl className="space-y-4">
                <div>
                  <dt className="font-medium text-gray-900">Supermove</dt>
                  <dd>Moving multiple cards using empty spaces</dd>
                </div>
                <div>
                  <dt className="font-medium text-gray-900">Safe Move</dt>
                  <dd>Guaranteed beneficial card placement</dd>
                </div>
                <div>
                  <dt className="font-medium text-gray-900">Parent Card</dt>
                  <dd>Card that a sequence builds upon</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
