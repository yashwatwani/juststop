import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, Text } from 'react-native-paper';
import { Feather } from '@expo/vector-icons';

interface AchievementCardProps {
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  reward?: string;
}

export function AchievementCard({
  title,
  description,
  icon,
  unlocked,
  reward,
}: AchievementCardProps) {
  return (
    <Card style={[styles.card, !unlocked && styles.lockedCard]}>
      <Card.Content style={styles.content}>
        <View style={[styles.iconContainer, unlocked ? styles.unlockedIcon : styles.lockedIcon]}>
          <Feather name={icon} size={24} color={unlocked ? 'white' : '#bdc3c7'} />
        </View>
        <View style={styles.textContainer}>
          <Text variant="titleMedium" style={unlocked ? styles.title : styles.lockedTitle}>
            {title}
          </Text>
          <Text variant="bodySmall" style={unlocked ? styles.description : styles.lockedDescription}>
            {description}
          </Text>
          {reward && unlocked && (
            <Text variant="bodySmall" style={styles.reward}>
              Reward: {reward}
            </Text>
          )}
        </View>
        {unlocked && (
          <View style={styles.badgeContainer}>
            <Feather name="check-circle" size={20} color="#2ecc71" />
          </View>
        )}
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginVertical: 8,
    borderRadius: 12,
  },
  lockedCard: {
    opacity: 0.7,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  unlockedIcon: {
    backgroundColor: '#f1c40f',
  },
  lockedIcon: {
    backgroundColor: '#ecf0f1',
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontWeight: 'bold',
  },
  lockedTitle: {
    fontWeight: 'bold',
    color: '#7f8c8d',
  },
  description: {
    opacity: 0.7,
  },
  lockedDescription: {
    color: '#95a5a6',
  },
  reward: {
    marginTop: 4,
    color: '#f1c40f',
    fontWeight: 'bold',
  },
  badgeContainer: {
    marginLeft: 8,
  },
});