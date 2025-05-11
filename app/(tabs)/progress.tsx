import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { ActivityIndicator, Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatsCard } from '../../components/progress/StatsCard';
import { StreakChart } from '../../components/progress/StreakChart';
import { MoodChart } from '../../components/progress/MoodChart';
import { TriggerPieChart } from '../../components/progress/TriggerPieChart';
import { useAnalytics } from '../../hooks/useAnalytics';
import { useJournal } from '../../hooks/useJournal';

export default function ProgressScreen() {
  const { isLoading } = useJournal();
  const { streakData, moodData, triggerData, stats } = useAnalytics();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text variant="headlineMedium">Progress</Text>
      </View>

      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
          <StatsCard
            currentStreak={stats.currentStreak}
            longestStreak={stats.longestStreak}
            totalCleanDays={stats.totalCleanDays}
            journalEntries={stats.journalEntries}
          />

          <View style={styles.chartContainer}>
            <StreakChart data={streakData.data} labels={streakData.labels} />
          </View>

          <View style={styles.chartContainer}>
            <MoodChart data={moodData.data} labels={moodData.labels} />
          </View>

          {triggerData.length > 0 && (
            <View style={styles.chartContainer}>
              <TriggerPieChart data={triggerData} />
            </View>
          )}
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 16,
    alignItems: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 16,
    paddingBottom: 32,
  },
  chartContainer: {
    marginTop: 16,
  },
});