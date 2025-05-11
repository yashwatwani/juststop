import { create } from 'zustand';
import { supabase } from '../services/supabase';
import { useAuthStore } from './authStore';
import { achievements, Achievement, AchievementStats } from '../constants/achievements';

interface AchievementState {
  unlockedAchievements: string[];
  isLoading: boolean;
  error: string | null;
  
  checkAchievements: (stats: AchievementStats) => Promise<string[]>;
  fetchAchievements: () => Promise<void>;
}

export const useAchievementStore = create<AchievementState>((set, get) => ({
  unlockedAchievements: [],
  isLoading: false,
  error: null,

  checkAchievements: async (stats: AchievementStats) => {
    const user = useAuthStore.getState().user;
    if (!user) return [];

    set({ isLoading: true, error: null });
    try {
      const currentUnlocked = get().unlockedAchievements;
      
      // Check which achievements are newly unlocked
      const newlyUnlocked = achievements
        .filter((achievement) => 
          !currentUnlocked.includes(achievement.id) && 
          achievement.condition(stats)
        )
        .map((achievement) => achievement.id);
      
      if (newlyUnlocked.length > 0) {
        // Save newly unlocked achievements to database
        for (const achievementId of newlyUnlocked) {
          await supabase.from('user_achievements').insert({
            user_id: user.id,
            achievement_id: achievementId,
            unlocked_at: new Date().toISOString(),
          });
        }
        
        // Update state with new achievements
        const updatedAchievements = [...currentUnlocked, ...newlyUnlocked];
        set({ unlockedAchievements: updatedAchievements });
        
        return newlyUnlocked;
      }
      
      return [];
    } catch (error) {
      console.error('Error checking achievements:', error);
      set({ error: 'Failed to check achievements' });
      return [];
    } finally {
      set({ isLoading: false });
    }
  },

  fetchAchievements: async () => {
    const user = useAuthStore.getState().user;
    if (!user) return;

    set({ isLoading: true, error: null });
    try {
      const { data, error } = await supabase
        .from('user_achievements')
        .select('achievement_id')
        .eq('user_id', user.id);

      if (error) throw error;

      const unlockedIds = data?.map((item) => item.achievement_id) || [];
      set({ unlockedAchievements: unlockedIds });
    } catch (error) {
      console.error('Error fetching achievements:', error);
      set({ error: 'Failed to load achievements' });
    } finally {
      set({ isLoading: false });
    }
  },
}));