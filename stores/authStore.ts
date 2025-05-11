import { create } from 'zustand';
import { getCurrentUser, signIn, signOut, signUp } from '../services/auth';
import { User } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  initialized: boolean;
  signUp: (email: string, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  initialize: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  isLoading: false,
  error: null,
  initialized: false,

  initialize: async () => {
    set({ isLoading: true });
    try {
      const { data, error } = await getCurrentUser();
      if (error) {
        if (error.message && error.message.includes('Auth session missing')) {
          set({ user: null, error: null });
        } else {
          set({ error: error.message });
        }
      } else {
        set({ user: data.user });
      }
    } catch (error) {
      if (error instanceof Error && error.message.includes('Auth session missing')) {
        set({ user: null, error: null });
      } else {
        set({ error: 'Unexpected error during initialization' });
        console.error('Unexpected error during initialization:', error);
      }
    } finally {
      set({ isLoading: false, initialized: true });
    }
  },

  signUp: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const { data, error } = await signUp(email, password);
      if (error) {
        set({ error: error.message });
      } else {
        set({ user: data.user });
        
        // Mark that the user needs to complete onboarding
        await AsyncStorage.setItem('hasCompletedOnboarding', 'false');
      }
    } catch (error) {
      set({ error: 'An unexpected error occurred' });
      console.error('Signup error:', error);
    } finally {
      set({ isLoading: false });
    }
  },

  login: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const { data, error } = await signIn(email, password);
      if (error) {
        set({ error: error.message });
      } else {
        set({ user: data.user });
      }
    } catch (error) {
      set({ error: 'An unexpected error occurred' });
      console.error('Login error:', error);
    } finally {
      set({ isLoading: false });
    }
  },

  logout: async () => {
    set({ isLoading: true, error: null });
    try {
      const { error } = await signOut();
      if (error) {
        set({ error: error.message });
      } else {
        set({ user: null });
      }
    } catch (error) {
      set({ error: 'An unexpected error occurred' });
      console.error('Logout error:', error);
    } finally {
      set({ isLoading: false });
    }
  },
}));