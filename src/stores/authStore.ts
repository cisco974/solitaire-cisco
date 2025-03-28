import { create } from "zustand";

import { User } from "../types/admin";

// Utilisateur mockée pour simulation
const mockUser: User = {
  id: "1",
  email: "sltr",
  role: "admin",
  created_at: "2023-01-01T00:00:00.000Z",
};

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
  signIn: (username: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  checkAuth: () => Promise<void>;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: false,
  error: null,
  signIn: async (username: string, password: string) => {
    try {
      set({ loading: true, error: null });

      // Simuler un délai d'authentification
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Special case for admin credentials
      if (username === "sltr" && password === "operationsltr2025") {
        set({ user: mockUser, loading: false, error: null });
        return;
      }

      throw new Error("Invalid credentials");
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "An error occurred",
        loading: false,
      });
      throw error;
    }
  },
  signOut: async () => {
    set({ loading: true });

    // Simuler un délai
    await new Promise((resolve) => setTimeout(resolve, 300));

    set({ user: null, loading: false });
  },
  checkAuth: async () => {
    try {
      set({ loading: true });

      // Simuler un délai
      await new Promise((resolve) => setTimeout(resolve, 300));

      // Vérifier si l'utilisateur est déjà connecté (par exemple en vérifiant le localStorage)
      const storedUser = localStorage.getItem("SLTR_AUTH_USER");

      if (storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser);
          set({ user: parsedUser, loading: false });
          return;
        } catch (e) {
          console.error("Error parsing stored user:", e);
        }
      }

      set({ user: null, loading: false });
    } catch (error) {
      console.error("Auth check error:", error);
      set({ user: null, loading: false });
    }
  },
  clearError: () => set({ error: null }),
}));
