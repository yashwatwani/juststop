import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card } from '../../components/ui/Card';
import { Feather } from '@expo/vector-icons';

export default function EmergencyScreen() {
  const router = useRouter();

  const handleBreathingPress = () => {
    router.push('/emergency/breathing');
  };

  const handleJournalPress = () => {
    router.push('/emergency/journal');
  };

  const handleBackPress = () => {
    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Feather name="arrow-left" size={24} onPress={handleBackPress} />
        <Text variant="headlineMedium" style={styles.title}>
          Emergency Support
        </Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.content}>
        <Text variant="bodyLarge" style={styles.subtitle}>
          You're doing great by reaching out. Choose a tool to help you through this moment:
        </Text>

        <TouchableCard
          title="Guided Breathing"
          icon="wind"
          description="Take a moment to breathe and calm your mind"
          onPress={handleBreathingPress}
          color="#3498db"
        />

        <TouchableCard
          title="Quick Journal"
          icon="edit-2"
          description="Write down what you're feeling right now"
          onPress={handleJournalPress}
          color="#2ecc71"
        />

        <TouchableCard
          title="Contact Support"
          icon="phone"
          description="Reach out to your accountability partner"
          onPress={() => {}}
          color="#9b59b6"
          disabled
          comingSoon
        />
      </View>
    </SafeAreaView>
  );
}

interface TouchableCardProps {
  title: string;
  icon: string;
  description: string;
  onPress: () => void;
  color: string;
  disabled?: boolean;
  comingSoon?: boolean;
}

function TouchableCard({ title, icon, description, onPress, color, disabled, comingSoon }: TouchableCardProps) {
  return (
    <Card onPress={disabled ? undefined : onPress}>
      <View style={styles.cardContent}>
        <View style={[styles.iconContainer, { backgroundColor: color }]}>
          <Feather name={icon} size={24} color="white" />
        </View>
        <View style={styles.cardTextContainer}>
          <Text variant="titleMedium">{title}</Text>
          <Text variant="bodyMedium" style={styles.cardDescription}>
            {description}
          </Text>
          {comingSoon && (
            <Text variant="labelSmall" style={styles.comingSoon}>
              Coming Soon
            </Text>
          )}
        </View>
      </View>
    </Card>
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
  },
  subtitle: {
    marginBottom: 24,
    textAlign: 'center',
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  cardTextContainer: {
    flex: 1,
  },
  cardDescription: {
    opacity: 0.7,
    marginTop: 4,
  },
  comingSoon: {
    marginTop: 4,
    color: '#e74c3c',
  },
});