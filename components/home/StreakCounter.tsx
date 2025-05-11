import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { Card } from '../ui/Card';
import { Feather } from '@expo/vector-icons';

interface StreakCounterProps {
  days: number;
  onCheckIn?: () => void;
  lastCheckIn?: Date;
}

export function StreakCounter({ days, onCheckIn, lastCheckIn }: StreakCounterProps) {
  // Calculate if check-in is needed today
  const today = new Date();
  const lastCheckInDate = lastCheckIn ? new Date(lastCheckIn) : null;
  const needsCheckIn = !lastCheckInDate || 
    lastCheckInDate.getDate() !== today.getDate() || 
    lastCheckInDate.getMonth() !== today.getMonth() || 
    lastCheckInDate.getFullYear() !== today.getFullYear();

  return (
    <Card>
      <View style={styles.container}>
        <View style={styles.streakContainer}>
          <Feather name="zap" size={24} color="#f1c40f" style={styles.icon} />
          <Text variant="headlineLarge" style={styles.streakCount}>
            {days}
          </Text>
          <Text variant="titleMedium" style={styles.streakLabel}>
            {days === 1 ? 'Day' : 'Days'} Clean
          </Text>
        </View>

        {needsCheckIn && onCheckIn && (
          <View style={styles.checkInContainer}>
            <Text variant="bodyMedium" style={styles.checkInText}>
              Did you stay clean today?
            </Text>
            <View style={styles.buttonContainer}>
              <Feather 
                name="check-circle" 
                size={48} 
                color="#2ecc71" 
                style={styles.checkButton}
                onPress={onCheckIn}
              />
            </View>
          </View>
        )}
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 16,
  },
  streakContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  icon: {
    marginBottom: 8,
  },
  streakCount: {
    fontWeight: 'bold',
    color: '#f1c40f',
  },
  streakLabel: {
    opacity: 0.8,
  },
  checkInContainer: {
    width: '100%',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    paddingTop: 16,
  },
  checkInText: {
    marginBottom: 12,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  checkButton: {
    marginHorizontal: 12,
  },
});