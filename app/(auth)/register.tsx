import { Link } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { useAuth } from '../../hooks/useAuth';

export default function RegisterScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [validationError, setValidationError] = useState('');
  const { signUp, isLoading, error } = useAuth();

  const handleRegister = async () => {
    setValidationError('');
    
    // Validation
    if (!email || !password || !confirmPassword) {
      setValidationError('Please fill in all fields');
      return;
    }
    
    if (password !== confirmPassword) {
      setValidationError('Passwords do not match');
      return;
    }
    
    await signUp(email, password);
  };

  const displayError = validationError || error;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text variant="headlineLarge" style={styles.title}>
          Create Account
        </Text>
        <Text variant="bodyLarge" style={styles.subtitle}>
          Start your journey to a better life
        </Text>

        {displayError ? <Text style={styles.error}>{displayError}</Text> : null}

        <Input
          label="Email"
          value={email}
          onChangeText={setEmail}
          placeholder="your.email@example.com"
          keyboardType="email-address"
          icon="email"
        />

        <Input
          label="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          icon="lock"
        />

        <Input
          label="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
          icon="lock"
        />

        <Button
          title="Sign Up"
          onPress={handleRegister}
          loading={isLoading}
          disabled={isLoading}
        />

        <View style={styles.links}>
          <Link href="/login" asChild>
            <Text style={styles.link}>Already have an account? Sign In</Text>
          </Link>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  title: {
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: 24,
    opacity: 0.7,
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 16,
  },
  links: {
    marginTop: 24,
    alignItems: 'center',
  },
  link: {
    marginVertical: 8,
    color: '#3498db',
  },
});