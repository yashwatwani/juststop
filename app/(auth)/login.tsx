import { Link } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { useAuth } from '../../hooks/useAuth';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, isLoading, error } = useAuth();

  const handleLogin = async () => {
    if (!email || !password) {
      return; // Form validation would be better here
    }
    
    await login(email, password);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text variant="headlineLarge" style={styles.title}>
          Welcome Back
        </Text>
        <Text variant="bodyLarge" style={styles.subtitle}>
          Sign in to continue your journey
        </Text>

        {error ? <Text style={styles.error}>{error}</Text> : null}

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

        <Button
          title="Sign In"
          onPress={handleLogin}
          loading={isLoading}
          disabled={isLoading}
        />

        <View style={styles.links}>
          <Link href="/forgot-password" asChild>
            <Text style={styles.link}>Forgot Password?</Text>
          </Link>
          
          <Link href="/register" asChild>
            <Text style={styles.link}>Don't have an account? Sign Up</Text>
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