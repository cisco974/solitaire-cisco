"use client";
import { useState } from "react";
import { BarChart as ChartBar, Menu, Settings2, Share2 } from "lucide-react";

import { CustomizationPanel } from "@components/CustomizationPanel";
import { GameDescription } from "@components/GameDescription";
import { KlondikeContent } from "@components/KlondikeContent";
import { ShareModal } from "@components/ShareModal";
import { StatsModal } from "@components/StatsModal";
import NewGameModal from "@components/NewGameModal";
import { useGameCustomization } from "@/hooks/useGameCustomization";
import { useGameState } from "@/hooks/useGameState";
import { tableStyles } from "@/types/customization";
import { KlondikeMode } from "@/types/cards";
import Link from "next/link";
import { KlondikeGame } from "@components/KlondikeGame";

export default function KlondikePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [customizationOpen, setCustomizationOpen] = useState(false);
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [statsModalOpen, setStatsModalOpen] = useState(false);
  const [newGameModalOpen, setNewGameModalOpen] = useState(false);
  const { customization, updateCustomization } = useGameCustomization();
  const { gameState, setMode, setDifficulty } = useGameState();
  const [gameKey, setGameKey] = useState(0);

  const handleNewGame = (
    mode: string,
    newDifficulty: "easy" | "medium" | "hard",
  ) => {
    setMode(mode as KlondikeMode);
    setDifficulty(newDifficulty);
    setNewGameModalOpen(false);
    setGameKey((prev) => prev + 1);
  };

  const currentTableStyle = tableStyles[customization.table];

  return (
    <div className="flex-1">
      {/* Header */}
      <header
        className={`bg-gradient-to-br ${currentTableStyle.gradient} border-b border-white/10`}
      >
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {/* Logo */}
              <Link href="/" className="flex items-center space-x-4">
                <div className="hidden sm:flex space-x-1">
                  <div className="w-8 h-10 bg-white rounded-md flex items-center justify-center text-red-600 shadow-lg">
                    ♥
                  </div>
                  <div className="w-8 h-10 bg-white rounded-md flex items-center justify-center text-red-600 shadow-lg">
                    ♦
                  </div>
                  <div className="w-8 h-10 bg-white rounded-md flex items-center justify-center text-gray-900 shadow-lg">
                    ♠
                  </div>
                  <div className="w-8 h-10 bg-white rounded-md flex items-center justify-center text-gray-900 shadow-lg">
                    ♣
                  </div>
                </div>
                <h1 className="text-xl sm:text-2xl font-bold text-white">
                  SLTR.com
                </h1>
              </Link>
            </div>

            <div className="flex items-center space-x-2">
              {/* Game Mode Tabs */}
              <div className="hidden md:flex space-x-1">
                <Link
                  href="/"
                  className="px-4 py-2 rounded-lg bg-white/20 text-white"
                >
                  Klondike
                </Link>
                <Link
                  href="/spider"
                  className="px-4 py-2 rounded-lg text-white/70 hover:text-white hover:bg-white/10"
                >
                  Spider
                </Link>
                <Link
                  href="/freecell"
                  className="px-4 py-2 rounded-lg text-white/70 hover:text-white hover:bg-white/10"
                >
                  FreeCell
                </Link>
              </div>

              {/* Stats Button */}
              <button
                onClick={() => setStatsModalOpen(true)}
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors text-white"
                title="Statistics"
              >
                <ChartBar className="w-5 h-5" />
              </button>

              {/* Share Button */}
              <button
                onClick={() => setShareModalOpen(true)}
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors text-white"
                title="Share"
              >
                <Share2 className="w-5 h-5" />
              </button>

              {/* Settings Button */}
              <button
                onClick={() => setCustomizationOpen(true)}
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors text-white"
                title="Settings"
              >
                <Settings2 className="w-5 h-5" />
              </button>

              {/* New Game Button */}
              <button
                onClick={() => setNewGameModalOpen(true)}
                className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded-lg transition-colors"
              >
                New Game
              </button>

              {/* Mobile menu button */}
              <button
                className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <Menu className="w-6 h-6 text-white" />
              </button>
            </div>
          </div>

          {/* Mobile menu */}
          {mobileMenuOpen && (
            <div className="md:hidden pt-4 pb-2 space-y-1">
              <Link
                href="/"
                className="block w-full text-left px-4 py-2 rounded-lg bg-white/20 text-white"
              >
                Klondike
              </Link>
              <Link
                href="/spider"
                className="block w-full text-left px-4 py-2 rounded-lg text-white/70 hover:text-white hover:bg-white/10"
              >
                Spider
              </Link>
              <Link
                href="/freecell"
                className="block w-full text-left px-4 py-2 rounded-lg text-white/70 hover:text-white hover:bg-white/10"
              >
                FreeCell
              </Link>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <div className="max-w-4xl mx-auto px-2 sm:px-4 py-4 sm:py-8">
          <div className="rounded-xl p-2 sm:p-6 relative overflow-hidden">
            <div className={`absolute inset-0 ${currentTableStyle.pattern}`} />
            <div
              className={`absolute inset-0 bg-gradient-to-br ${currentTableStyle.gradient}`}
            />
            <div className="relative z-10">
              <KlondikeGame
                key={`klondike-${gameKey}`}
                customization={customization}
                mode={gameState.mode}
              />
            </div>
          </div>

          {/* Game Description and Content */}
          <div className="mt-8">
            <GameDescription gameType="klondike" />
            <div className="mt-16">
              <KlondikeContent />
            </div>
          </div>
        </div>
      </main>

      {/* Modals */}
      <ShareModal
        isOpen={shareModalOpen}
        onClose={() => setShareModalOpen(false)}
      />

      <StatsModal
        isOpen={statsModalOpen}
        onClose={() => setStatsModalOpen(false)}
        gameType="klondike"
        stats={gameState}
      />

      <NewGameModal
        isOpen={newGameModalOpen}
        onClose={() => setNewGameModalOpen(false)}
        onNewGame={handleNewGame}
        currentGame="klondike"
        initialMode={gameState.mode}
      />

      <CustomizationPanel
        isOpen={customizationOpen}
        onClose={() => setCustomizationOpen(false)}
        customization={customization}
        onCustomizationChange={updateCustomization}
      />
    </div>
  );
}
