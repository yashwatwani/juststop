export interface Achievement {
    id: string;
    title: string;
    description: string;
    icon: string;
    condition: (stats: AchievementStats) => boolean;
    reward?: string;
  }
  
  export interface AchievementStats {
    currentStreak: number;
    longestStreak: number;
    totalCleanDays: number;
    journalEntries: number;
  }
  
  export const achievements: Achievement[] = [
    {
      id: 'first_day',
      title: 'First Step',
      description: 'Complete your first day clean',
      icon: 'award',
      condition: (stats) => stats.currentStreak >= 1,
    },
    {
      id: 'one_week',
      title: 'One Week Strong',
      description: 'Maintain a 7-day streak',
      icon: 'calendar',
      condition: (stats) => stats.currentStreak >= 7,
      reward: 'Unlock daily motivational quotes',
    },
    {
      id: 'two_weeks',
      title: 'Two Week Warrior',
      description: 'Maintain a 14-day streak',
      icon: 'shield',
      condition: (stats) => stats.currentStreak >= 14,
    },
    {
      id: 'one_month',
      title: 'Monthly Milestone',
      description: 'Maintain a 30-day streak',
      icon: 'star',
      condition: (stats) => stats.currentStreak >= 30,
      reward: 'Unlock advanced analytics',
    },
    {
      id: 'three_months',
      title: 'Quarterly Champion',
      description: 'Maintain a 90-day streak',
      icon: 'trophy',
      condition: (stats) => stats.currentStreak >= 90,
      reward: 'Unlock personalized recovery plan',
    },
    {
      id: 'journal_starter',
      title: 'Journal Starter',
      description: 'Create your first journal entry',
      icon: 'book',
      condition: (stats) => stats.journalEntries >= 1,
    },
    {
      id: 'journal_regular',
      title: 'Regular Reflector',
      description: 'Create 10 journal entries',
      icon: 'edit-3',
      condition: (stats) => stats.journalEntries >= 10,
    },
    {
      id: 'journal_master',
      title: 'Journaling Master',
      description: 'Create 30 journal entries',
      icon: 'edit',
      condition: (stats) => stats.journalEntries >= 30,
      reward: 'Unlock mood pattern insights',
    },
  ];