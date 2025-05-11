import { useEffect } from 'react';
import { useAchievementStore } from '../stores/achievementStore';
import { useAuthStore } from '../stores/authStore';
import { achievements, Achievement } from '../constants/achievements';

export function useAchievements() {
  const { unlockedAchievements, isLoading, error, fetchAchievements, checkAchievements } = useAchievementStore();
  const { user } = useAuthStore();

  // Fetch achievements when user changes
  useEffect(() => {
    if (user) {
      fetchAchievements();
    }
  }, [user]);

  // Get all achievements with unlocked status
  const allAchievements = achievements.map((achievement) => ({
    ...achievement,
    unlocked: unlockedAchievements.includes(achievement.id),
  }));

  // Get only unlocked achievements
  const unlocked = allAchievements.filter((achievement) => achievement.unlocked);

  // Get locked achievements
  const locked = allAchievements.filter((achievement) => !achievement.unlocked);

  return {
    achievements: allAchievements,
    unlockedAchievements: unlocked,
    lockedAchievements: locked,
    isLoading,
    error,
    checkAchievements,
  };
}