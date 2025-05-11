import { useEffect } from 'react';
import { useJournalStore, JournalEntry } from '../stores/journalStore';
import { useAuthStore } from '../stores/authStore';

export function useJournal() {
  const { entries, isLoading, error, fetchEntries, addEntry, deleteEntry } = useJournalStore();
  const { user } = useAuthStore();

  // Fetch journal entries when user changes
  useEffect(() => {
    if (user) {
      fetchEntries();
    }
  }, [user]);

  return {
    entries,
    isLoading,
    error,
    addEntry,
    deleteEntry,
  };
}