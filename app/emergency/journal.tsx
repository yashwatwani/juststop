import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Chip, Text, TextInput } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { supabase } from '../../services/supabase';
import { useAuthStore } from '../../stores/authStore';

const COMMON_TRIGGERS = [
  'Boredom',
  'Stress',
  'Loneliness',
  'Anxiety',
  'Tiredness',
  'Social Media',
  'Alcohol',
];

export default function EmergencyJournalScreen() {
  const router = useRouter();
  const [notes, setNotes] = useState('');
  const [selectedTriggers, setSelectedTriggers] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useAuthStore();

  const handleBackPress = () => {
    router.back();
  };

  const toggleTrigger = (trigger: string) => {
    if (selectedTriggers.includes(trigger)) {
      setSelectedTriggers(selectedTriggers.filter((t) => t !== trigger));
    } else {
      setSelectedTriggers([...selectedTriggers, trigger]);
    }
  };

  const handleSubmit = async () => {
    if (!user) return;
    
    setIsSubmitting(true);
    try {
      // Save journal entry to database
      await supabase.from('journal_entries').insert({
        user_id: user.id,
        date: new Date().toISOString(),
        mood: 'struggling', // Special mood for emergency entries
        triggers: selectedTriggers,
        notes,
        is_emergency: true,
      });

      // Navigate back to emergency screen with success message
      router.replace({
        pathname: '/emergency',
        params: { success: true },
      });
    } catch (error) {
      console.error('Error saving journal entry:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Feather name="arrow-left" size={24} onPress={handleBackPress} />
        <Text variant="headlineMedium" style={styles.title}>
          Quick Journal
        </Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.content}>
        <Text variant="bodyLarge" style={styles.subtitle}>
          What's happening right now? Writing about your feelings can help reduce their intensity.
        </Text>

        <Text variant="titleMedium" style={styles.sectionTitle}>
          What triggered you?
        </Text>
        <View style={styles.triggersContainer}>
          {COMMON_TRIGGERS.map((trigger) => (
            <Chip
              key={trigger}
              selected={selectedTriggers.includes(trigger)}
              onPress={() => toggleTrigger(trigger)}
              style={styles.chip}
              showSelectedCheck
            >
              {trigger}
            </Chip>
          ))}
        </View>

        <Text variant="titleMedium" style={styles.sectionTitle}>
          How are you feeling?
        </Text>
        <TextInput
          mode="outlined"
          multiline
          numberOfLines={6}
          placeholder="Write your thoughts here..."
          value={notes}
          onChangeText={setNotes}
          style={styles.textInput}
        />

        <Button
          mode="contained"
          onPress={handleSubmit}
          loading={isSubmitting}
          disabled={isSubmitting}
          style={styles.submitButton}
        >
          Save Journal Entry
        </Button>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  title: {
    textAlign: 'center',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  subtitle: {
    marginBottom: 24,
  },
  sectionTitle: {
    marginBottom: 12,
  },
  triggersContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 24,
  },
  chip: {
    margin: 4,
  },
  textInput: {
    marginBottom: 24,
  },
  submitButton: {
    marginTop: 'auto',
    marginBottom: 16,
  },
});