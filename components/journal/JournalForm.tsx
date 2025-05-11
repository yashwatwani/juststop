import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Chip, Dialog, Portal, RadioButton, Text, TextInput } from 'react-native-paper';

interface JournalFormProps {
  visible: boolean;
  onDismiss: () => void;
  onSubmit: (mood: string, triggers: string[], notes: string) => void;
  isLoading: boolean;
}

const MOODS = [
  { value: 'great', label: 'Great' },
  { value: 'good', label: 'Good' },
  { value: 'neutral', label: 'Neutral' },
  { value: 'bad', label: 'Bad' },
  { value: 'terrible', label: 'Terrible' },
];

const COMMON_TRIGGERS = [
  'Boredom',
  'Stress',
  'Loneliness',
  'Anxiety',
  'Tiredness',
  'Social Media',
  'Alcohol',
];

export function JournalForm({ visible, onDismiss, onSubmit, isLoading }: JournalFormProps) {
  const [mood, setMood] = useState('neutral');
  const [triggers, setTriggers] = useState<string[]>([]);
  const [notes, setNotes] = useState('');

  const handleSubmit = () => {
    onSubmit(mood, triggers, notes);
    // Reset form
    setMood('neutral');
    setTriggers([]);
    setNotes('');
  };

  const toggleTrigger = (trigger: string) => {
    if (triggers.includes(trigger)) {
      setTriggers(triggers.filter((t) => t !== trigger));
    } else {
      setTriggers([...triggers, trigger]);
    }
  };

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={onDismiss} style={styles.dialog}>
        <Dialog.Title>New Journal Entry</Dialog.Title>
        <Dialog.ScrollArea style={styles.scrollArea}>
          <View style={styles.content}>
            <Text variant="titleMedium" style={styles.sectionTitle}>
              How are you feeling today?
            </Text>
            <RadioButton.Group onValueChange={setMood} value={mood}>
              <View style={styles.moodContainer}>
                {MOODS.map((m) => (
                  <View key={m.value} style={styles.moodOption}>
                    <RadioButton value={m.value} />
                    <Text>{m.label}</Text>
                  </View>
                ))}
              </View>
            </RadioButton.Group>

            <Text variant="titleMedium" style={styles.sectionTitle}>
              Any triggers today?
            </Text>
            <View style={styles.triggersContainer}>
              {COMMON_TRIGGERS.map((trigger) => (
                <Chip
                  key={trigger}
                  selected={triggers.includes(trigger)}
                  onPress={() => toggleTrigger(trigger)}
                  style={styles.chip}
                  showSelectedCheck
                >
                  {trigger}
                </Chip>
              ))}
            </View>

            <Text variant="titleMedium" style={styles.sectionTitle}>
              Notes
            </Text>
            <TextInput
              mode="outlined"
              multiline
              numberOfLines={4}
              placeholder="How was your day? What's on your mind?"
              value={notes}
              onChangeText={setNotes}
              style={styles.textInput}
            />
          </View>
        </Dialog.ScrollArea>
        <Dialog.Actions>
          <Button onPress={onDismiss}>Cancel</Button>
          <Button mode="contained" onPress={handleSubmit} loading={isLoading} disabled={isLoading}>
            Save
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
}

const styles = StyleSheet.create({
  dialog: {
    maxHeight: '80%',
  },
  scrollArea: {
    paddingHorizontal: 0,
  },
  content: {
    padding: 16,
  },
  sectionTitle: {
    marginBottom: 12,
  },
  moodContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  moodOption: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '50%',
    marginVertical: 4,
  },
  triggersContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  chip: {
    margin: 4,
  },
  textInput: {
    marginBottom: 16,
  },
});