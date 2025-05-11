import React, { useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { ActivityIndicator, FAB, Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { JournalEntry } from '../../components/journal/JournalEntry';
import { JournalForm } from '../../components/journal/JournalForm';
import { useJournal } from '../../hooks/useJournal';

export default function JournalScreen() {
  const { entries, isLoading, error, addEntry, deleteEntry } = useJournal();
  const [formVisible, setFormVisible] = useState(false);

  const handleAddEntry = (mood: string, triggers: string[], notes: string) => {
    addEntry({
      date: new Date().toISOString(),
      mood,
      triggers,
      notes,
      is_emergency: false,
    });
    setFormVisible(false);
  };

  const handleDeleteEntry = (id: string) => {
    deleteEntry(id);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text variant="headlineMedium">Journal</Text>
      </View>

      {isLoading && entries.length === 0 ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" />
        </View>
      ) : error ? (
        <View style={styles.errorContainer}>
          <Text variant="bodyLarge" style={styles.errorText}>
            {error}
          </Text>
        </View>
      ) : entries.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text variant="bodyLarge" style={styles.emptyText}>
            No journal entries yet. Tap the + button to add your first entry.
          </Text>
        </View>
      ) : (
        <FlatList
          data={entries}
          renderItem={({ item }) => (
            <JournalEntry entry={item} onDelete={handleDeleteEntry} />
          )}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
        />
      )}

      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => setFormVisible(true)}
      />

      <JournalForm
        visible={formVisible}
        onDismiss={() => setFormVisible(false)}
        onSubmit={handleAddEntry}
        isLoading={isLoading}
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
  listContent: {
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  errorText: {
    textAlign: 'center',
    color: '#e74c3c',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  emptyText: {
    textAlign: 'center',
    opacity: 0.7,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});