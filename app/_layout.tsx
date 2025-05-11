import { Stack, Redirect, useSegments, usePathname } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Provider as PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { theme } from '../constants/theme'; // Ensure this path is correct
import { useAuth } from '../hooks/useAuth';   // Ensure this path is correct
import { ActivityIndicator, View, Text } from 'react-native'; // Added Text for debugging
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';

const HAS_COMPLETED_ONBOARDING_KEY = 'hasCompletedOnboarding';

// This component contains the core logic for loading and redirection
function AppContent() {
  // isLoading from useAuth() indicates if the initial Firebase auth check is done.
  // isAuthenticated is derived from !!user.
  const { isLoading: authIsLoading, isAuthenticated, user } = useAuth();

  // State to track if we've checked AsyncStorage for onboarding status
  const [onboardingStatusChecked, setOnboardingStatusChecked] = useState(false);
  // State to store the actual onboarding status
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false); // Default to false

  const segments = useSegments(); // E.g., ['(auth)', 'login']
  const pathname = usePathname(); // E.g., "/(auth)/login"

  // Log state changes for debugging
  useEffect(() => {
    console.log('[AppContent] State Update:', {
      pathname,
      authIsLoading,
      isAuthenticated: isAuthenticated, // user might be null, so explicitly log derived state
      user: user ? user.id : null, // Log user ID if available (Supabase User uses 'id')
      onboardingStatusChecked,
      hasCompletedOnboarding,
      segments: segments.join('/'),
    });
  });

  // Effect to check onboarding status from AsyncStorage
  // This runs once authIsLoading becomes false (meaning auth state is resolved)
  useEffect(() => {
    if (!authIsLoading) { // Only proceed if Firebase auth check is complete
      console.log('[AppContent] Auth check complete (authIsLoading: false). Checking onboarding status...');
      const checkOnboarding = async () => {
        try {
          const value = await AsyncStorage.getItem(HAS_COMPLETED_ONBOARDING_KEY);
          console.log(`[AppContent] AsyncStorage.getItem('${HAS_COMPLETED_ONBOARDING_KEY}') returned:`, value);
          setHasCompletedOnboarding(value === 'true');
        } catch (error) {
          console.error('[AppContent] Error reading onboarding status from AsyncStorage:', error);
          setHasCompletedOnboarding(false); // Default to false on error
        } finally {
          setOnboardingStatusChecked(true); // Mark that we've attempted to check
          console.log('[AppContent] Onboarding status check finished.');
        }
      };
      checkOnboarding();
    } else {
      console.log('[AppContent] Waiting for auth check to complete (authIsLoading: true)...');
    }
  }, [authIsLoading]); // Dependency: only re-run when authIsLoading changes

  // --- Loading State ---
  // Show a loading indicator until Firebase auth is resolved AND onboarding status has been checked.
  if (authIsLoading || !onboardingStatusChecked) {
    console.log('[AppContent] Showing Loading Indicator because:', { authIsLoading, onboardingStatusChecked });
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: theme.colors.background || '#fff' }}>
        <ActivityIndicator size="large" color={theme.colors.primary || '#0000ff'} />
        <Text style={{ marginTop: 10, color: '#000' }}>
          {authIsLoading ? "Initializing authentication..." : "Checking onboarding status..."}
        </Text>
      </View>
    );
  }

  // --- Redirection Logic ---
  // At this point:
  // - authIsLoading is false (Firebase auth state is known)
  // - onboardingStatusChecked is true (AsyncStorage has been queried)
  // - isAuthenticated and hasCompletedOnboarding hold their resolved values.

  const inAuthGroup = segments[0] === '(auth)';
  // Assuming your onboarding screen is at `app/onboarding.tsx`, so its pathname is `/onboarding`
  const isOnboardingRoute = pathname === '/onboarding';

  console.log('[AppContent] Evaluating redirect conditions:', {
    pathname,
    isAuthenticated,
    hasCompletedOnboarding,
    inAuthGroup,
    isOnboardingRoute,
  });

  // 1. User is NOT Authenticated
  if (!isAuthenticated) {
    if (inAuthGroup) {
      // User is not authenticated but ALREADY on an auth page (e.g., /login, /forget-password).
      // Let them stay. The specific auth screen will render.
      console.log('[AppContent] Decision: Render. Unauthenticated user in auth group.');
    } else {
      // User is not authenticated and NOT on an auth page. Redirect to login.
      console.log('[AppContent] Decision: Redirect to /login. Unauthenticated user, not in auth group.');
      return <Redirect href="/(auth)/login" />;
    }
  }
  // 2. User IS Authenticated
  else {
    if (inAuthGroup) {
      // User is authenticated but somehow landed on an auth page (e.g., pressed back after login).
      // Redirect them out of the auth flow. Check onboarding first.
      console.log('[AppContent] Decision: Authenticated user in auth group. Redirecting out...');
      if (!hasCompletedOnboarding) {
        console.log('[AppContent] --> Redirecting to /onboarding (from auth group).');
        return <Redirect href="/onboarding" />;
      } else {
        console.log('[AppContent] --> Redirecting to /(app)/home (from auth group, already onboarded).');
        return <Redirect href="/(app)/home" />; // Adjust if your main app screen is different
      }
    }

    // User is authenticated and NOT in an auth group. Now, check onboarding status.
    if (!hasCompletedOnboarding) {
      if (isOnboardingRoute) {
        // User is authenticated, not yet onboarded, but IS on the onboarding page.
        // Let them stay to complete onboarding.
        console.log('[AppContent] Decision: Render. Authenticated user, not onboarded, on onboarding page.');
      } else {
        // User is authenticated, not yet onboarded, and NOT on the onboarding page.
        // Redirect them to onboarding.
        console.log('[AppContent] Decision: Redirect to /onboarding. Authenticated user, not onboarded, not on onboarding page.');
        return <Redirect href="/onboarding" />;
      }
    }
    // User is authenticated AND has completed onboarding.
    else {
      if (isOnboardingRoute) {
        // User is authenticated, onboarded, but somehow landed on the onboarding page (e.g., back button).
        // Redirect them to the main app.
        console.log('[AppContent] Decision: Redirect to /(app)/home. Authenticated user, onboarded, but on onboarding page.');
        return <Redirect href="/(app)/home" />; // Adjust if your main app screen is different
      }
      // User is authenticated, onboarded, and not in an auth group or on the onboarding page.
      // This is the normal state for an active user. Let them see the app screen.
      console.log('[AppContent] Decision: Render. Authenticated user, onboarded, in main app.');
    }
  }

  // If none of the redirect conditions above were met, render the current route's content.
  console.log('[AppContent] Rendering <Stack /> for current route:', pathname);
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    />
  );
}

export default function RootLayout() {
  // Note: The AuthProvider from your AuthContext.tsx should wrap your application at a high enough level.
  // If this _layout.tsx is the absolute root of your navigation, AuthProvider should typically wrap
  // the content here or be in a custom App.tsx file if your project has one.
  // Since useAuth() works, it implies AuthProvider is already correctly in the component tree above this.

  return (
    <PaperProvider theme={theme}>
      <SafeAreaProvider>
        <StatusBar style="auto" />
        <AppContent />
      </SafeAreaProvider>
    </PaperProvider>
  );
}