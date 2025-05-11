import { create } from 'zustand';
import { supabase } from '../services/supabase';
import { useAuthStore } from './authStore';

interface StreakState {
  currentStreak: number;
  longestStreak: number;
  lastCheckIn: Date | null;
  isLoading: boolean;
  error: string | null;
  
  fetchStreak: () => Promise<void>;
  checkIn: (isClean: boolean) => Promise<void>;
  resetStreak: () => Promise<void>;
}
console.log('useStreakStore loaded');
export const useStreakStore = create<StreakState>((set, get) => ({
   // currentStreak, longestStreak, lastCheckIn, isLoading, error, fetchStreak, checkIn, resetStreak
  currentStreak: 0,
  longestStreak: 0,
  lastCheckIn: null,
  isLoading: false,
  error: null,

  fetchStreak: async () => {
    const user = useAuthStore.getState().user;
    if (!user) return;

    set({ isLoading: true, error: null });
    try {
      // Get the user's streak from Supabase
      const { data, error } = await supabase
        .from('streaks')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error) throw error;

      if (data) {
        set({
          currentStreak: data.current_days,
          longestStreak: data.longest_streak,
          lastCheckIn: data.last_check_in ? new Date(data.last_check_in) : null,
        });
      } else {
        // Create a new streak record if none exists
        await supabase.from('streaks').insert({
          user_id: user.id,
          current_days: 0,
          longest_streak: 0,
          start_date: new Date().toISOString(),
        });
        
        set({
          currentStreak: 0,
          longestStreak: 0,
          lastCheckIn: null,
        });
      }
    } catch (error) {
      console.error('Error fetching streak:', error);
      set({ error: 'Failed to load streak data' });
    } finally {
      set({ isLoading: false });
    }
  },

  checkIn: async (isClean: boolean) => {
    const user = useAuthStore.getState().user;
    if (!user) return;

    set({ isLoading: true, error: null });
    try {
      const now = new Date();
      let { currentStreak, longestStreak } = get();
      
      // Update streak count based on check-in result
      if (isClean) {
        currentStreak += 1;
        if (currentStreak > longestStreak) {
          longestStreak = currentStreak;
        }
      } else {
        // Reset streak on relapse
        currentStreak = 0;
      }

      // Update streak in database
      const { error } = await supabase
        .from('streaks')
        .update({
          current_days: currentStreak,
          longest_streak: longestStreak,
          last_check_in: now.toISOString(),
          end_date: isClean ? null : now.toISOString(), // Set end date on relapse
        })
        .eq('user_id', user.id);

      if (error) throw error;

      // Log check-in
      await supabase.from('checkins').insert({
        user_id: user.id,
        date: now.toISOString(),
        status: isClean,
      });

      set({
        currentStreak,
        longestStreak,
        lastCheckIn: now,
      });
    } catch (error) {
      console.error('Error updating streak:', error);
      set({ error: 'Failed to update streak' });
    } finally {
      set({ isLoading: false });
    }
  },

  resetStreak: async () => {
    const user = useAuthStore.getState().user;
    if (!user) return;

    set({ isLoading: true, error: null });
    try {
      const now = new Date();
      
      // Reset streak in database
      const { error } = await supabase
        .from('streaks')
        .update({
          current_days: 0,
          end_date: now.toISOString(),
          last_check_in: now.toISOString(),
        })
        .eq('user_id', user.id);

      if (error) throw error;

      // Log relapse
      await supabase.from('checkins').insert({
        user_id: user.id,
        date: now.toISOString(),
        status: false,
        notes: 'Manual reset',
      });

      set({
        currentStreak: 0,
        lastCheckIn: now,
      });
    } catch (error) {
      console.error('Error resetting streak:', error);
      set({ error: 'Failed to reset streak' });
    } finally {
      set({ isLoading: false });
    }
  },
}));