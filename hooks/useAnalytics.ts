import { useEffect, useState } from 'react';
import { useJournal } from './useJournal';
import { useStreak } from './useStreak';
import { format, subDays } from 'date-fns';

export function useAnalytics() {
  const { entries } = useJournal();
  const { currentStreak, longestStreak } = useStreak();
  const [streakData, setStreakData] = useState<{ data: number[]; labels: string[] }>({
    data: [],
    labels: [],
  });
  const [moodData, setMoodData] = useState<{ data: number[]; labels: string[] }>({
    data: [],
    labels: [],
  });
  const [triggerData, setTriggerData] = useState<{ name: string; count: number; color: string }[]>([]);
  const [totalCleanDays, setTotalCleanDays] = useState(0);

  useEffect(() => {
    if (entries.length > 0) {
      // Generate streak data for the last 7 days
      const streakHistory = [];
      const streakLabels = [];
      let currentDay = new Date();
      
      for (let i = 6; i >= 0; i--) {
        const day = subDays(currentDay, i);
        const dayStr = format(day, 'MMM d');
        streakLabels.push(dayStr);
        
        // For this example, we'll just use the current streak
        // In a real app, you'd calculate the streak for each day
        streakHistory.push(Math.max(0, currentStreak - i));
      }
      
      setStreakData({
        data: streakHistory,
        labels: streakLabels,
      });

      // Calculate mood distribution
      const moodCounts = {
        great: 0,
        good: 0,
        neutral: 0,
        bad: 0,
        terrible: 0,
      };
      
      entries.forEach((entry) => {
        if (moodCounts.hasOwnProperty(entry.mood)) {
          moodCounts[entry.mood as keyof typeof moodCounts]++;
        }
      });
      
      setMoodData({
        data: [
          moodCounts.great,
          moodCounts.good,
          moodCounts.neutral,
          moodCounts.bad,
          moodCounts.terrible,
        ],
        labels: ['Great', 'Good', 'Neutral', 'Bad', 'Terrible'],
      });

      // Calculate trigger distribution
      const triggerCounts: Record<string, number> = {};
      
      entries.forEach((entry) => {
        if (entry.triggers) {
          entry.triggers.forEach((trigger) => {
            triggerCounts[trigger] = (triggerCounts[trigger] || 0) + 1;
          });
        }
      });
      
      const colors = ['#3498db', '#2ecc71', '#e74c3c', '#f1c40f', '#9b59b6', '#e67e22', '#1abc9c'];
      const sortedTriggers = Object.entries(triggerCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([name, count], index) => ({
          name,
          count,
          color: colors[index % colors.length],
        }));
      
      setTriggerData(sortedTriggers);

      // Calculate total clean days (this is simplified)
      setTotalCleanDays(currentStreak + 10); // Just an example
    }
  }, [entries, currentStreak, longestStreak]);

  return {
    streakData,
    moodData,
    triggerData,
    stats: {
      currentStreak,
      longestStreak,
      totalCleanDays,
      journalEntries: entries.length,
    },
  };
}