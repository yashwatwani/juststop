import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { Card } from '../ui/Card';
import { Feather } from '@expo/vector-icons';

interface StatItemProps {
  label: string;
  value: string | number;
  icon: string;
  color: string;
}

function StatItem({ label, value, icon, color }: StatItemProps) {
  return (
    <View style={styles.statItem}>
      <View style={[styles.iconContainer, { backgroundColor: color }]}>
        <Feather name={icon} size={20} color="white" />
      </View>
      <View style={styles.statContent}>
        <Text variant="titleLarge">{value}</Text>
        <Text variant="bodySmall" style={styles.statLabel}>
          {label}
        </Text>
      </View>
    </View>
  );
}

interface StatsCardProps {
  currentStreak: number;
  longestStreak: number;
  totalCleanDays: number;
  journalEntries: number;
}

export function StatsCard({
  currentStreak,
  longestStreak,
  totalCleanDays,
  journalEntries,
}: StatsCardProps) {
  return (
    <Card>
      <View style={styles.container}>
        <Text variant="titleMedium" style={styles.title}>
          Your Stats
        </Text>
        <View style={styles.statsGrid}>
          <StatItem
            label="Current Streak"
            value={currentStreak}
            icon="zap"
            color="#3498db"
          />
          <StatItem
            label="Longest Streak"
            value={longestStreak}
            icon="award"
            color="#f1c40f"
          />
          <StatItem
            label="Total Clean Days"
            value={totalCleanDays}
            icon="calendar"
            color="#2ecc71"
          />
          <StatItem
            label="Journal Entries"
            value={journalEntries}
            icon="book"
            color="#9b59b6"
          />
        </View>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  statItem: {
    width: '50%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  statContent: {
    flex: 1,
  },
  statLabel: {
    opacity: 0.7,
  },
});