import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeInRight, FadeOutLeft } from 'react-native-reanimated';
import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const slides = [
  {
    title: 'Welcome to JustStop',
    description: 'Your journey to overcome pornography addiction starts here. We\'re here to support you every step of the way.',
    icon: 'heart',
    color: '#3498db',
  },
  {
    title: 'Track Your Progress',
    description: 'Monitor your streak, journal your thoughts, and see your improvement over time.',
    icon: 'trending-up',
    color: '#2ecc71',
  },
  {
    title: 'Emergency Support',
    description: 'When urges hit, use our emergency tools to help you through difficult moments.',
    icon: 'alert-circle',
    color: '#e74c3c',
  },
  {
    title: 'Earn Achievements',
    description: 'Stay motivated with achievements that celebrate your milestones and progress.',
    icon: 'award',
    color: '#f1c40f',
  },
];

export default function OnboardingScreen() {
  const router = useRouter();
  const [currentSlide, setCurrentSlide] = useState(0);

  const completeOnboarding = async () => {
    try {
      await AsyncStorage.setItem('hasCompletedOnboarding', 'true');
      router.replace('/(tabs)');
    } catch (error) {
      console.error('Error saving onboarding status:', error);
    }
  };

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      // Onboarding complete
      completeOnboarding();
    }
  };

  const handleSkip = () => {
    completeOnboarding();
  };

  const slide = slides[currentSlide];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.skipContainer}>
        <Button onPress={handleSkip}>Skip</Button>
      </View>

      <Animated.View 
        key={currentSlide}
        style={styles.slideContainer}
        entering={FadeInRight}
        exiting={FadeOutLeft}
      >
        <View style={[styles.iconContainer, { backgroundColor: slide.color }]}>
          <Feather name={slide.icon} size={60} color="white" />
        </View>

        <Text variant="headlineMedium" style={styles.title}>
          {slide.title}
        </Text>

        <Text variant="bodyLarge" style={styles.description}>
          {slide.description}
        </Text>
      </Animated.View>

      <View style={styles.footer}>
        <View style={styles.pagination}>
          {slides.map((_, index) => (
            <View
              key={index}
              style={[
                styles.paginationDot,
                index === currentSlide && styles.paginationDotActive,
                { backgroundColor: index === currentSlide ? slide.color : '#e0e0e0' },
              ]}
            />
          ))}
        </View>

        <Button 
          mode="contained" 
          onPress={handleNext}
          style={[styles.nextButton, { backgroundColor: slide.color }]}
        >
          {currentSlide === slides.length - 1 ? 'Get Started' : 'Next'}
        </Button>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  skipContainer: {
    alignItems: 'flex-end',
    padding: 16,
  },
  slideContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  iconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32,
  },
  title: {
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  description: {
    textAlign: 'center',
    opacity: 0.7,
  },
  footer: {
    padding: 32,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 24,
  },
  paginationDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 4,
  },
  paginationDotActive: {
    width: 20,
  },
  nextButton: {
    borderRadius: 8,
  },
});