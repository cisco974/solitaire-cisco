"use client";
import React from "react";

import { useGameCustomization } from "@/hooks/useGameCustomization";
import { tableStyles } from "@/types/customization";
import Link from "next/link";

interface StandardPageProps {
  title: string;
  children: React.ReactNode;
}

export function StandardPage({ title, children }: StandardPageProps) {
  const { customization } = useGameCustomization();
  const currentTableStyle = tableStyles[customization.table];

  return (
    <div className="flex-1">
      {/* Hero Section with Background Image */}
      <div className="relative h-[200px] overflow-hidden">
        <div className={`absolute inset-0 ${currentTableStyle.pattern}`} />
        <div
          className={`absolute inset-0 bg-gradient-to-br ${currentTableStyle.gradient}`}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/20" />

        {/* Navigation */}
        <div className="relative z-10">
          <header className="bg-gray-900/80 backdrop-blur-sm border-b border-gray-800">
            <div className="max-w-6xl mx-auto px-4 py-4">
              <div className="flex items-center justify-between">
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

                {/* Navigation Links */}
                <nav className="flex items-center space-x-6">
                  <Link
                    href="/?game=klondike"
                    className="text-white/70 hover:text-white transition-colors"
                  >
                    Klondike
                  </Link>
                  <Link
                    href="/?game=spider"
                    className="text-white/70 hover:text-white transition-colors"
                  >
                    Spider
                  </Link>
                  <Link
                    href="/?game=freecell"
                    className="text-white/70 hover:text-white transition-colors"
                  >
                    FreeCell
                  </Link>
                </nav>
              </div>
            </div>
          </header>

          {/* Page Title */}
          <div className="flex items-center justify-center h-[120px]">
            <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
              {title}
            </h1>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 py-12">
        <div className="max-w-4xl mx-auto px-4">
          <div className="prose prose-lg prose-gray">{children}</div>
        </div>
      </main>
    </div>
  );
}
