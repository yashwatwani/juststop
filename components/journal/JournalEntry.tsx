import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, Chip, IconButton, Text } from 'react-native-paper';
import { JournalEntry as JournalEntryType } from '../../stores/journalStore';
import { format } from 'date-fns';

interface JournalEntryProps {
  entry: JournalEntryType;
  onDelete: (id: string) => void;
}

const MOOD_COLORS = {
  'great': '#2ecc71',
  'good': '#3498db',
  'neutral': '#f1c40f',
  'bad': '#e67e22',
  'terrible': '#e74c3c',
  'struggling': '#9b59b6',
};

export function JournalEntry({ entry, onDelete }: JournalEntryProps) {
  const moodColor = MOOD_COLORS[entry.mood as keyof typeof MOOD_COLORS] || '#3498db';
  
  return (
    <Card style={styles.card}>
      <Card.Content>
        <View style={styles.header}>
          <View style={styles.dateContainer}>
            <Text variant="titleMedium">
              {format(new Date(entry.date), 'MMM d, yyyy')}
            </Text>
            <Text variant="bodySmall" style={styles.time}>
              {format(new Date(entry.date), 'h:mm a')}
            </Text>
          </View>
          <IconButton
            icon="trash-2"
            size={20}
            onPress={() => onDelete(entry.id)}
          />
        </View>
        
        <View style={styles.moodContainer}>
          <View style={[styles.moodIndicator, { backgroundColor: moodColor }]} />
          <Text variant="titleSmall" style={styles.moodText}>
            Feeling: {entry.mood.charAt(0).toUpperCase() + entry.mood.slice(1)}
          </Text>
          {entry.is_emergency && (
            <Chip compact style={styles.emergencyChip}>
              Emergency
            </Chip>
          )}
        </View>
        
        {entry.triggers && entry.triggers.length > 0 && (
          <View style={styles.triggersContainer}>
            <Text variant="bodySmall" style={styles.triggersLabel}>
              Triggers:
            </Text>
            <View style={styles.chipContainer}>
              {entry.triggers.map((trigger) => (
                <Chip key={trigger} compact style={styles.chip}>
                  {trigger}
                </Chip>
              ))}
            </View>
          </View>
        )}
        
        {entry.notes && (
          <Text variant="bodyMedium" style={styles.notes}>
            {entry.notes}
          </Text>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  dateContainer: {
    flexDirection: 'column',
  },
  time: {
    opacity: 0.6,
  },
  moodContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  moodIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  moodText: {
    marginRight: 8,
  },
  emergencyChip: {
    backgroundColor: '#e74c3c',
    height: 24,
  },
  triggersContainer: {
    marginBottom: 8,
  },
  triggersLabel: {
    marginBottom: 4,
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 2,
    height: 24,
  },
  notes: {
    marginTop: 8,
  },
});