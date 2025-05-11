import { create } from 'zustand';
import { supabase } from '../services/supabase';
import { useAuthStore } from './authStore';

export interface JournalEntry {
  id: string;
  date: string;
  mood: string;
  triggers: string[];
  notes: string;
  is_emergency: boolean;
}

interface JournalState {
  entries: JournalEntry[];
  isLoading: boolean;
  error: string | null;
  
  fetchEntries: () => Promise<void>;
  addEntry: (entry: Omit<JournalEntry, 'id'>) => Promise<void>;
  deleteEntry: (id: string) => Promise<void>;
}

export const useJournalStore = create<JournalState>((set, get) => ({
  entries: [],
  isLoading: false,
  error: null,

  fetchEntries: async () => {
    const user = useAuthStore.getState().user;
    if (!user) return;

    set({ isLoading: true, error: null });
    try {
      const { data, error } = await supabase
        .from('journal_entries')
        .select('*')
        .eq('user_id', user.id)
        .order('date', { ascending: false });

      if (error) throw error;

      set({ entries: data || [] });
    } catch (error) {
      console.error('Error fetching journal entries:', error);
      set({ error: 'Failed to load journal entries' });
    } finally {
      set({ isLoading: false });
    }
  },

  addEntry: async (entry) => {
    const user = useAuthStore.getState().user;
    if (!user) return;

    set({ isLoading: true, error: null });
    try {
      const { data, error } = await supabase
        .from('journal_entries')
        .insert({
          ...entry,
          user_id: user.id,
        })
        .select();

      if (error) throw error;

      // Add the new entry to the state
      if (data && data.length > 0) {
        set({ entries: [data[0], ...get().entries] });
      }
    } catch (error) {
      console.error('Error adding journal entry:', error);
      set({ error: 'Failed to save journal entry' });
    } finally {
      set({ isLoading: false });
    }
  },

  deleteEntry: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const { error } = await supabase
        .from('journal_entries')
        .delete()
        .eq('id', id);

      if (error) throw error;

      // Remove the deleted entry from the state
      set({ entries: get().entries.filter(entry => entry.id !== id) });
    } catch (error) {
      console.error('Error deleting journal entry:', error);
      set({ error: 'Failed to delete journal entry' });
    } finally {
      set({ isLoading: false });
    }
  },
}));