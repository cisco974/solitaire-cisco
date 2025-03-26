import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import { User } from '../types/admin';

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
  loading: true,
  error: null,
  signIn: async (username: string, password: string) => {
    try {
      set({ loading: true, error: null });

      // Special case for admin credentials
      if (username === 'sltr' && password === 'operationsltr2025') {
        const { data: userData, error: userError } = await supabase
          .from('users')
          .select()
          .eq('email', 'sltr')
          .single();

        if (userError || !userData) {
          throw new Error('User not found');
        }

        set({ user: userData, loading: false, error: null });
        return;
      }

      throw new Error('Invalid credentials');
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'An error occurred',
        loading: false 
      });
      throw error;
    }
  },
  signOut: async () => {
    set({ loading: true });
    await supabase.auth.signOut();
    set({ user: null, loading: false });
  },
  checkAuth: async () => {
    try {
      set({ loading: true });
      
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select()
        .eq('email', 'sltr')
        .single();

      if (userError) {
        set({ user: null, loading: false });
        return;
      }

      set({ user: userData, loading: false });
    } catch (error) {
      console.error('Auth check error:', error);
      set({ user: null, loading: false });
    }
  },
  clearError: () => set({ error: null })
}));