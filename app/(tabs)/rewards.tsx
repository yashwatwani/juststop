import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { ActivityIndicator, Divider, Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AchievementCard } from '../../components/rewards/AchievementCard';
import { AchievementUnlockedModal } from '../../components/rewards/AchievementUnlockedModal';
import { useAchievements } from '../../hooks/useAchievements';
import { useAnalytics } from '../../hooks/useAnalytics';
import { Achievement } from '../../constants/achievements';
import { achievements } from '../../constants/achievements';

export default function RewardsScreen() {
  const { unlockedAchievements, lockedAchievements, isLoading, checkAchievements } = useAchievements();
  const { stats } = useAnalytics();
  const [newAchievement, setNewAchievement] = useState<Achievement | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  // Check for new achievements when stats change
  useEffect(() => {
    const checkForNewAchievements = async () => {
      const newlyUnlocked = await checkAchievements(stats);
      
      if (newlyUnlocked.length > 0) {
        // Find the first newly unlocked achievement
        const achievementId = newlyUnlocked[0];
        const achievement = achievements.find((a) => a.id === achievementId);
        
        if (achievement) {
          setNewAchievement(achievement);
          setModalVisible(true);
        }
      }
    };
    
    if (stats.currentStreak > 0 || stats.journalEntries > 0) {
      checkForNewAchievements();
    }
  }, [stats]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text variant="headlineMedium">Rewards</Text>
      </View>

      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
          {unlockedAchievements.length > 0 && (
            <>
              <Text variant="titleMedium" style={styles.sectionTitle}>
                Unlocked Achievements
              </Text>
              {unlockedAchievements.map((achievement) => (
                <AchievementCard
                  key={achievement.id}
                  title={achievement.title}
                  description={achievement.description}
                  icon={achievement.icon}
                  unlocked={true}
                  reward={achievement.reward}
                />
              ))}
            </>
          )}

          {unlockedAchievements.length > 0 && lockedAchievements.length > 0 && (
            <Divider style={styles.divider} />
          )}

          {lockedAchievements.length > 0 && (
            <>
              <Text variant="titleMedium" style={styles.sectionTitle}>
                Locked Achievements
              </Text>
              {lockedAchievements.map((achievement) => (
                <AchievementCard
                  key={achievement.id}
                  title={achievement.title}
                  description={achievement.description}
                  icon={achievement.icon}
                  unlocked={false}
                  reward={achievement.reward}
                />
              ))}
            </>
          )}
        </ScrollView>
      )}

      <AchievementUnlockedModal
        visible={modalVisible}
        onDismiss={() => setModalVisible(false)}
        achievement={newAchievement}
      />
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
  sectionTitle: {
    marginBottom: 12,
  },
  divider: {
    marginVertical: 24,
  },
});