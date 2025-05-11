import { useEffect } from 'react';
import { useStreakStore } from '../stores/streakStore';
import { useAuthStore } from '../stores/authStore';

export function useStreak() {
  const { currentStreak, longestStreak, lastCheckIn, isLoading, error, fetchStreak, checkIn, resetStreak } = useStreakStore();
  const { user } = useAuthStore();

  // Fetch streak data when user changes
  useEffect(() => {
    if (user) {
      fetchStreak();
    }
  }, [user]);

  return {
    currentStreak,
    longestStreak,
    lastCheckIn,
    isLoading,
    error,
    checkIn,
    resetStreak
  };
}