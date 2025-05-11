import { useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';

export default function BreathingScreen() {
  const router = useRouter();
  const [phase, setPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale');
  const [count, setCount] = useState(0);
  const [totalCycles, setTotalCycles] = useState(0);
  const animation = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    startBreathingExercise();
    return () => {
      // Clean up animations
      animation.stopAnimation();
    };
  }, []);

  const startBreathingExercise = () => {
    setTotalCycles(0);
    runBreathingCycle();
  };

  const runBreathingCycle = () => {
    // Inhale for 4 seconds
    setPhase('inhale');
    setCount(4);
    
    Animated.timing(animation, {
      toValue: 2,
      duration: 4000,
      useNativeDriver: true,
    }).start();

    const inhaleTimer = setInterval(() => {
      setCount((prev) => {
        if (prev <= 1) {
          clearInterval(inhaleTimer);
          holdBreath();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const holdBreath = () => {
    // Hold for 4 seconds
    setPhase('hold');
    setCount(4);

    const holdTimer = setInterval(() => {
      setCount((prev) => {
        if (prev <= 1) {
          clearInterval(holdTimer);
          exhaleBreath();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const exhaleBreath = () => {
    // Exhale for 6 seconds
    setPhase('exhale');
    setCount(6);

    Animated.timing(animation, {
      toValue: 1,
      duration: 6000,
      useNativeDriver: true,
    }).start();

    const exhaleTimer = setInterval(() => {
      setCount((prev) => {
        if (prev <= 1) {
          clearInterval(exhaleTimer);
          setTotalCycles((prev) => prev + 1);
          
          // Continue for 3 cycles
          if (totalCycles < 2) {
            runBreathingCycle();
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleBackPress = () => {
    router.back();
  };

  const getInstructions = () => {
    switch (phase) {
      case 'inhale':
        return 'Breathe in slowly...';
      case 'hold':
        return 'Hold your breath...';
      case 'exhale':
        return 'Breathe out slowly...';
    }
  };

  const animatedStyle = {
    transform: [{ scale: animation }],
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Feather name="arrow-left" size={24} onPress={handleBackPress} />
        <Text variant="headlineMedium" style={styles.title}>
          Guided Breathing
        </Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.content}>
        <Text variant="bodyLarge" style={styles.subtitle}>
          Follow the circle and breathe with it
        </Text>

        <View style={styles.breathingContainer}>
          <Animated.View style={[styles.breathingCircle, animatedStyle]} />
          <Text variant="headlineLarge" style={styles.countText}>
            {count}
          </Text>
        </View>

        <Text variant="titleLarge" style={styles.instructions}>
          {getInstructions()}
        </Text>

        <Text variant="bodyMedium" style={styles.cycleText}>
          Cycle {totalCycles + 1} of 3
        </Text>

        {totalCycles >= 3 && (
          <View style={styles.completedContainer}>
            <Text variant="titleLarge" style={styles.completedText}>
              Great job!
            </Text>
            <Text variant="bodyMedium" style={styles.completedDescription}>
              How do you feel now?
            </Text>
            <Button mode="contained" onPress={handleBackPress} style={styles.doneButton}>
              I Feel Better
            </Button>
            <Button mode="outlined" onPress={startBreathingExercise} style={styles.againButton}>
              Do It Again
            </Button>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  title: {
    textAlign: 'center',
  },
  content: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
  },
  subtitle: {
    marginBottom: 24,
    textAlign: 'center',
  },
  breathingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 48,
  },
  breathingCircle: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#3498db',
    opacity: 0.7,
  },
  countText: {
    position: 'absolute',
    color: 'white',
    fontWeight: 'bold',
  },
  instructions: {
    marginBottom: 24,
    textAlign: 'center',
  },
  cycleText: {
    opacity: 0.7,
  },
  completedContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  completedText: {
    marginBottom: 8,
  },
  completedDescription: {
    marginBottom: 24,
    textAlign: 'center',
  },
  doneButton: {
    marginBottom: 12,
    width: '100%',
  },
  againButton: {
    width: '100%',
  },
});