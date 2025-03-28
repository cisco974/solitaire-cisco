"use client";
import { useEffect, useState } from "react";
import { GameCustomization } from "@/types/customization";

const STORAGE_KEY = "game-customization";

const defaultCustomization: GameCustomization = {
  cardBack: "classic-red",
  table: "emerald-felt",
  cardStyle: "classic",
};

export function useGameCustomization() {
  const [customization, setCustomization] =
    useState<GameCustomization>(defaultCustomization);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load customization AFTER render (client-only)
  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setCustomization(JSON.parse(saved));
      }
    } catch (error) {
      console.error("Error accessing localStorage:", error);
    }
    setIsLoaded(true);
  }, []);

  const updateCustomization = (updates: Partial<GameCustomization>) => {
    const newCustomization = { ...customization, ...updates };
    setCustomization(newCustomization);

    try {
      if (typeof window !== "undefined") {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newCustomization));
      }
    } catch (error) {
      console.error("Error updating localStorage:", error);
    }
  };

  return {
    customization,
    updateCustomization,
    isLoaded,
  };
}
