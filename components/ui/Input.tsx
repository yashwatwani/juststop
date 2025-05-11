import React from 'react';
import { StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';

interface InputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  error?: string;
  placeholder?: string;
  icon?: string;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
}

export function Input({
  label,
  value,
  onChangeText,
  secureTextEntry = false,
  error,
  placeholder,
  icon,
  keyboardType = 'default',
}: InputProps) {
  return (
    <TextInput
      label={label}
      value={value}
      onChangeText={onChangeText}
      secureTextEntry={secureTextEntry}
      error={!!error}
      placeholder={placeholder}
      left={icon ? <TextInput.Icon icon={icon} /> : undefined}
      style={styles.input}
      keyboardType={keyboardType}
      mode="outlined"
    />
  );
}

const styles = StyleSheet.create({
  input: {
    marginVertical: 8,
  },
});