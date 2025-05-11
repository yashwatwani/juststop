import { StyleSheet, View } from 'react-native';
import { IconButton, Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '../../components/ui/Button';
import { useAuth } from '../../hooks/useAuth';
import { StreakCounter } from '../../components/home/StreakCounter';
import { useStreak } from '../../hooks/useStreak';
import { CheckInDialog } from '../../components/home/CheckInDialog';
import { useState } from 'react';
import { EmergencyButton } from '../../components/home/EmergencyButton';
import { useRouter } from 'expo-router';
import { DailyQuote } from '../../components/home/DailyQuote';

export default function HomeScreen() {
  const router = useRouter();
  const { user } = useAuth();
  const { currentStreak, lastCheckIn, checkIn } = useStreak();
  const [checkInVisible, setCheckInVisible] = useState(false);

  const handleCheckInPress = () => {
    setCheckInVisible(true);
  };

  const handleCheckInDismiss = () => {
    setCheckInVisible(false);
  };

  const handleCheckInSubmit = (isClean: boolean, notes?: string) => {
    checkIn(isClean);
    setCheckInVisible(false);
  };

  const handleSettingsPress = () => {
    router.push('/settings');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text variant="headlineMedium">Home</Text>
        <IconButton
          icon="settings"
          size={24}
          onPress={handleSettingsPress}
        />
      </View>
      
      <View style={styles.content}>
        <View style={styles.streakContainer}>
          <StreakCounter 
            days={currentStreak} 
            onCheckIn={handleCheckInPress}
            lastCheckIn={lastCheckIn}
          />
        </View>
        
        <DailyQuote />
        
        <EmergencyButton />
      </View>

      <CheckInDialog
        visible={checkInVisible}
        onDismiss={handleCheckInDismiss}
        onCheckIn={handleCheckInSubmit}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  streakContainer: {
    marginVertical: 16,
  },
});