"use client";
import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  PlayCircle,
  StopCircle,
  Volume2,
  Volume2 as Volume2Off,
  X,
  Zap,
  ZapOff,
} from "lucide-react";
import {
  CardBackStyle,
  cardBackStyles,
  CardStyle,
  cardStyles,
  GameCustomization,
  TableStyle,
  tableStyles,
} from "@/types/customization";

interface CustomizationPanelProps {
  isOpen: boolean;
  onClose: () => void;
  customization: GameCustomization;
  onCustomizationChange: (customization: Partial<GameCustomization>) => void;
}

type Tab = "game" | "card-backs" | "table-styles" | "card-styles";

export function CustomizationPanel({
  isOpen,
  onClose,
  customization,
  onCustomizationChange,
}: CustomizationPanelProps) {
  const [activeTab, setActiveTab] = useState<Tab>("game");
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [autoCompleteEnabled, setAutoCompleteEnabled] = useState(true);
  const [autoPlayEnabled, setAutoPlayEnabled] = useState(false);

  const tabs: { id: Tab; label: string }[] = [
    { id: "game", label: "Game" },
    { id: "card-backs", label: "Card Backs" },
    { id: "table-styles", label: "Table" },
    { id: "card-styles", label: "Card Style" },
  ];

  const currentTableStyle = tableStyles[customization.table];

  const toggleSetting = (setting: "sound" | "autoComplete" | "autoPlay") => {
    switch (setting) {
      case "sound":
        setSoundEnabled(!soundEnabled);
        break;
      case "autoComplete":
        setAutoCompleteEnabled(!autoCompleteEnabled);
        break;
      case "autoPlay":
        setAutoPlayEnabled(!autoPlayEnabled);
        break;
    }
  };

  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: isOpen ? 0 : "100%" }}
      transition={{ type: "spring", damping: 20 }}
      className="fixed right-0 top-0 bottom-0 w-96 bg-white shadow-xl z-50"
    >
      <div className="h-full flex flex-col">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">Settings</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="border-b">
          <div className="flex">
            {tabs.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`
                  flex-1 py-3 px-4 text-center
                  text-sm font-medium transition-colors relative
                  ${
                    activeTab === id
                      ? "text-emerald-600"
                      : "text-gray-500 hover:text-gray-900"
                  }
                `}
              >
                {label}
                {activeTab === id && (
                  <motion.div
                    layoutId="active-tab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-600"
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto">
          <AnimatePresence mode="wait">
            {activeTab === "game" && (
              <motion.div
                key="game"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="p-4 space-y-4"
              >
                <div className="space-y-4">
                  <button
                    onClick={() => toggleSetting("sound")}
                    className="w-full flex items-center justify-between p-4 rounded-lg border border-gray-200 hover:border-emerald-200 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      {soundEnabled ? (
                        <Volume2 className="w-5 h-5 text-emerald-600" />
                      ) : (
                        <Volume2Off className="w-5 h-5 text-gray-400" />
                      )}
                      <span className="font-medium">Sound Effects</span>
                    </div>
                    <div
                      className={`w-11 h-6 rounded-full transition-colors ${
                        soundEnabled ? "bg-emerald-600" : "bg-gray-200"
                      }`}
                    >
                      <div
                        className={`w-5 h-5 rounded-full bg-white shadow transform transition-transform ${
                          soundEnabled ? "translate-x-6" : "translate-x-1"
                        } mt-0.5`}
                      />
                    </div>
                  </button>

                  <button
                    onClick={() => toggleSetting("autoComplete")}
                    className="w-full flex items-center justify-between p-4 rounded-lg border border-gray-200 hover:border-emerald-200 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      {autoCompleteEnabled ? (
                        <Zap className="w-5 h-5 text-emerald-600" />
                      ) : (
                        <ZapOff className="w-5 h-5 text-gray-400" />
                      )}
                      <span className="font-medium">Auto Complete</span>
                    </div>
                    <div
                      className={`w-11 h-6 rounded-full transition-colors ${
                        autoCompleteEnabled ? "bg-emerald-600" : "bg-gray-200"
                      }`}
                    >
                      <div
                        className={`w-5 h-5 rounded-full bg-white shadow transform transition-transform ${
                          autoCompleteEnabled
                            ? "translate-x-6"
                            : "translate-x-1"
                        } mt-0.5`}
                      />
                    </div>
                  </button>

                  <button
                    onClick={() => toggleSetting("autoPlay")}
                    className="w-full flex items-center justify-between p-4 rounded-lg border border-gray-200 hover:border-emerald-200 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      {autoPlayEnabled ? (
                        <PlayCircle className="w-5 h-5 text-emerald-600" />
                      ) : (
                        <StopCircle className="w-5 h-5 text-gray-400" />
                      )}
                      <span className="font-medium">Auto Play</span>
                    </div>
                    <div
                      className={`w-11 h-6 rounded-full transition-colors ${
                        autoPlayEnabled ? "bg-emerald-600" : "bg-gray-200"
                      }`}
                    >
                      <div
                        className={`w-5 h-5 rounded-full bg-white shadow transform transition-transform ${
                          autoPlayEnabled ? "translate-x-6" : "translate-x-1"
                        } mt-0.5`}
                      />
                    </div>
                  </button>
                </div>
              </motion.div>
            )}

            {activeTab === "card-backs" && (
              <motion.div
                key="card-backs"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="p-4 space-y-4"
              >
                <div className="grid grid-cols-4 gap-4">
                  {(
                    Object.entries(cardBackStyles) as [
                      CardBackStyle,
                      (typeof cardBackStyles)[CardBackStyle],
                    ][]
                  ).map(([style, config]) => (
                    <button
                      key={style}
                      onClick={() => onCustomizationChange({ cardBack: style })}
                      className={`
                        group relative aspect-[2/3] rounded-xl overflow-hidden border-4 border-white
                        ${
                          customization.cardBack === style
                            ? "ring-2 ring-emerald-500"
                            : "hover:ring-2 hover:ring-emerald-200"
                        }
                      `}
                    >
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${config.colors[0]}`}
                      >
                        <div className="absolute inset-2 rounded-lg overflow-hidden backdrop-blur-sm">
                          <div
                            className={`absolute inset-0 grid grid-cols-4 gap-1 p-1 bg-grid-diamond`}
                          >
                            {Array.from({ length: 24 }).map((_, i) => (
                              <div
                                key={i}
                                className={`
                                  aspect-square rounded-sm transform rotate-45
                                  bg-gradient-to-br ${config.colors[1]}
                                `}
                              />
                            ))}
                          </div>
                          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />
                        </div>
                      </div>
                      <div className="absolute inset-x-0 bottom-0 bg-black/50 p-2">
                        <p className="text-xs font-medium text-white text-center">
                          {config.name}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === "table-styles" && (
              <motion.div
                key="table-styles"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="p-4 space-y-4"
              >
                <div className="grid grid-cols-2 gap-4">
                  {(
                    Object.entries(tableStyles) as [
                      TableStyle,
                      (typeof tableStyles)[TableStyle],
                    ][]
                  ).map(([style, config]) => (
                    <button
                      key={style}
                      onClick={() => onCustomizationChange({ table: style })}
                      className={`
                        group relative aspect-video rounded-xl overflow-hidden
                        ${
                          customization.table === style
                            ? "ring-2 ring-emerald-500"
                            : "hover:ring-2 hover:ring-emerald-200"
                        }
                      `}
                    >
                      <div className={`absolute inset-0 ${config.pattern}`}>
                        <div
                          className={`absolute inset-0 bg-gradient-to-br ${config.gradient}`}
                        />
                      </div>
                      <div className="absolute inset-x-0 bottom-0 bg-black/50 p-2">
                        <p className="text-xs font-medium text-white text-center">
                          {config.name}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === "card-styles" && (
              <motion.div
                key="card-styles"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="p-4 space-y-4"
              >
                <div className="grid grid-cols-1 gap-4">
                  {(
                    Object.entries(cardStyles) as [
                      CardStyle,
                      (typeof cardStyles)[CardStyle],
                    ][]
                  ).map(([style, config]) => (
                    <button
                      key={style}
                      onClick={() =>
                        onCustomizationChange({ cardStyle: style })
                      }
                      className={`
                        relative p-4 rounded-xl overflow-hidden
                        ${
                          customization.cardStyle === style
                            ? "ring-2 ring-emerald-500"
                            : "hover:ring-2 hover:ring-emerald-200"
                        }
                      `}
                    >
                      {/* Table background */}
                      <div
                        className={`absolute inset-0 ${currentTableStyle.pattern}`}
                      />
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${currentTableStyle.gradient}`}
                      />

                      {/* Cards container */}
                      <div className="relative flex justify-center items-center gap-2 py-4">
                        {/* Four suits side by side */}
                        {(["♠", "♥", "♦", "♣"] as const).map((suit) => (
                          <div
                            key={suit}
                            className={`
                              w-14 h-20 bg-white rounded-lg border border-gray-200 shadow-lg
                              flex items-center justify-center
                            `}
                          >
                            <div
                              className={`${config.font} text-6xl ${config.colors[suit]}`}
                            >
                              {config.suits[suit]}
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="absolute inset-x-0 bottom-0 bg-black/50 p-2">
                        <p className="text-xs font-medium text-white text-center">
                          {config.name}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
