import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Modal, Portal, Text } from 'react-native-paper';
import { Feather } from '@expo/vector-icons';
import { Achievement } from '../../constants/achievements';
import LottieView from 'lottie-react-native';

interface AchievementUnlockedModalProps {
  visible: boolean;
  onDismiss: () => void;
  achievement: Achievement | null;
}

export function AchievementUnlockedModal({
  visible,
  onDismiss,
  achievement,
}: AchievementUnlockedModalProps) {
  if (!achievement) return null;

  return (
    <Portal>
      <Modal visible={visible} onDismiss={onDismiss} contentContainerStyle={styles.container}>
        <View style={styles.content}>
          <LottieView
            source={require('../../assets/animations/confetti.json')}
            autoPlay
            loop={false}
            style={styles.animation}
          />
          
          <Text variant="headlineSmall" style={styles.title}>
            Achievement Unlocked!
          </Text>
          
          <View style={styles.iconContainer}>
            <Feather name={achievement.icon} size={40} color="white" />
          </View>
          
          <Text variant="titleLarge" style={styles.achievementTitle}>
            {achievement.title}
          </Text>
          
          <Text variant="bodyMedium" style={styles.description}>
            {achievement.description}
          </Text>
          
          {achievement.reward && (
            <View style={styles.rewardContainer}>
              <Text variant="bodySmall" style={styles.rewardLabel}>
                Reward Unlocked:
              </Text>
              <Text variant="bodyMedium" style={styles.reward}>
                {achievement.reward}
              </Text>
            </View>
          )}
          
          <Button mode="contained" onPress={onDismiss} style={styles.button}>
            Continue
          </Button>
        </View>
      </Modal>
    </Portal>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    margin: 24,
    borderRadius: 16,
    overflow: 'hidden',
  },
  content: {
    padding: 24,
    alignItems: 'center',
  },
  animation: {
    width: 200,
    height: 200,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  title: {
    marginBottom: 24,
    textAlign: 'center',
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#f1c40f',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  achievementTitle: {
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  description: {
    textAlign: 'center',
    marginBottom: 24,
    opacity: 0.7,
  },
  rewardContainer: {
    backgroundColor: '#f9f9f9',
    padding: 16,
    borderRadius: 8,
    width: '100%',
    marginBottom: 24,
    alignItems: 'center',
  },
  rewardLabel: {
    marginBottom: 4,
    opacity: 0.7,
  },
  reward: {
    fontWeight: 'bold',
    color: '#f1c40f',
    textAlign: 'center',
  },
  button: {
    width: '100%',
  },
});