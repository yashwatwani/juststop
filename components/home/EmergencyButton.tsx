import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text } from 'react-native-paper';
import { Feather } from '@expo/vector-icons';

export function EmergencyButton() {
  const router = useRouter();

  const handlePress = () => {
    router.push('/emergency');
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handlePress} activeOpacity={0.8}>
      <View style={styles.button}>
        <Feather name="alert-circle" size={24} color="white" style={styles.icon} />
        <Text variant="titleMedium" style={styles.text}>
          I'm Struggling Right Now
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
  button: {
    backgroundColor: '#e74c3c',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    elevation: 3,
  },
  icon: {
    marginRight: 12,
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
  },
});