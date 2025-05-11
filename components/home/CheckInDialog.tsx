import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Dialog, Portal, Text, TextInput } from 'react-native-paper';

interface CheckInDialogProps {
  visible: boolean;
  onDismiss: () => void;
  onCheckIn: (isClean: boolean, notes?: string) => void;
}

export function CheckInDialog({ visible, onDismiss, onCheckIn }: CheckInDialogProps) {
  const [notes, setNotes] = useState('');

  const handleSuccess = () => {
    onCheckIn(true, notes);
    setNotes('');
  };

  const handleFailure = () => {
    onCheckIn(false, notes);
    setNotes('');
  };

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={onDismiss}>
        <Dialog.Title>Daily Check-in</Dialog.Title>
        <Dialog.Content>
          <Text variant="bodyMedium" style={styles.question}>
            Did you stay clean today?
          </Text>
          <TextInput
            label="Notes (optional)"
            value={notes}
            onChangeText={setNotes}
            multiline
            numberOfLines={3}
            style={styles.input}
          />
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={handleFailure} textColor="#e74c3c">No</Button>
          <Button onPress={handleSuccess} mode="contained">Yes</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
}

const styles = StyleSheet.create({
  question: {
    marginBottom: 16,
  },
  input: {
    marginBottom: 8,
  },
});