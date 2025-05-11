import { useEffect } from 'react';
import { useAuthStore } from '../stores/authStore';
import { useRouter, useSegments } from 'expo-router';

export function useAuth() {
  console.log('useAuth');
  const { user, isLoading, error, initialized, signUp, login, logout, initialize } = useAuthStore();
  const segments = useSegments();
  const router = useRouter();

  // Check if the user is authenticated
  const isAuthenticated = !!user;

  // Determine if the user is in an auth group
  const isInAuthGroup = segments[0] === '(auth)';

  // Handle routing based on authentication status
  useEffect(() => {
    if (!initialized) return;

    const isAuthRoute = isInAuthGroup;

    if (isAuthenticated && isAuthRoute) {
      // Redirect to home if user is authenticated but on an auth route
      router.replace('/');
    } else if (!isAuthenticated && !isAuthRoute) {
      // Redirect to login if user is not authenticated and not on an auth route
      router.replace('/login');
    }
  }, [isAuthenticated, isInAuthGroup, initialized]);

  // Initialize auth on mount
  useEffect(() => {
    initialize();
  }, []);

  return {
    user,
    isLoading,
    error,
    isAuthenticated,
    signUp,
    login,
    logout,
    initialize,
    initialized
  };
}