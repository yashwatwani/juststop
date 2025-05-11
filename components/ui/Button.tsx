import React from 'react';
import { StyleSheet } from 'react-native';
import { Button as PaperButton } from 'react-native-paper';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'text';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  icon?: string;
  loading?: boolean;
  disabled?: boolean;
}

export function Button({
  title,
  onPress,
  variant = 'primary',
  icon,
  loading = false,
  disabled = false,
}: ButtonProps) {
  const getMode = (): 'contained' | 'outlined' | 'text' | 'contained-tonal' => {
    switch (variant) {
      case 'primary':
        return 'contained';
      case 'secondary':
        return 'contained-tonal';
      case 'outline':
        return 'outlined';
      case 'text':
        return 'text';
      default:
        return 'contained';
    }
  };

  return (
    <PaperButton
      mode={getMode()}
      onPress={onPress}
      icon={icon}
      loading={loading}
      disabled={disabled}
      style={styles.button}
    >
      {title}
    </PaperButton>
  );
}

const styles = StyleSheet.create({
  button: {
    marginVertical: 8,
    borderRadius: 8,
  },
});