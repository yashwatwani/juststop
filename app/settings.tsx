import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, StyleSheet, Switch, View } from 'react-native';
import { Button, Divider, List, Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { useAuth } from '../hooks/useAuth';

export default function SettingsScreen() {
  const router = useRouter();
  const { user, logout } = useAuth();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);

  const handleBackPress = () => {
    router.back();
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          onPress: () => logout(),
          style: 'destructive',
        },
      ]
    );
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      'Delete Account',
      'Are you sure you want to delete your account? This action cannot be undone.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: () => {
            // Implement account deletion
            Alert.alert('Not Implemented', 'Account deletion is not implemented yet.');
          },
          style: 'destructive',
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Feather name="arrow-left" size={24} onPress={handleBackPress} />
        <Text variant="headlineMedium" style={styles.title}>
          Settings
        </Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.content}>
        <List.Section>
          <List.Subheader>Account</List.Subheader>
          <List.Item
            title="Email"
            description={user?.email}
            left={(props) => <List.Icon {...props} icon="mail" />}
          />
          <Divider />
          <List.Item
            title="Change Password"
            left={(props) => <List.Icon {...props} icon="lock" />}
            onPress={() => router.push('/change-password')}
          />
        </List.Section>

        <List.Section>
          <List.Subheader>Preferences</List.Subheader>
          <List.Item
            title="Notifications"
            left={(props) => <List.Icon {...props} icon="bell" />}
            right={() => (
              <Switch
                value={notificationsEnabled}
                onValueChange={setNotificationsEnabled}
              />
            )}
          />
          <Divider />
          <List.Item
            title="Dark Mode"
            left={(props) => <List.Icon {...props} icon="moon" />}
            right={() => (
              <Switch
                value={darkModeEnabled}
                onValueChange={setDarkModeEnabled}
              />
            )}
          />
        </List.Section>

        <List.Section>
          <List.Subheader>Support</List.Subheader>
          <List.Item
            title="Help & FAQ"
            left={(props) => <List.Icon {...props} icon="help-circle" />}
            onPress={() => router.push('/help')}
          />
          <Divider />
          <List.Item
            title="Contact Support"
            left={(props) => <List.Icon {...props} icon="message-circle" />}
            onPress={() => router.push('/contact')}
          />
          <Divider />
          <List.Item
            title="Privacy Policy"
            left={(props) => <List.Icon {...props} icon="shield" />}
            onPress={() => router.push('/privacy')}
          />
          <Divider />
          <List.Item
            title="Terms of Service"
            left={(props) => <List.Icon {...props} icon="file-text" />}
            onPress={() => router.push('/terms')}
          />
        </List.Section>

        <View style={styles.buttonContainer}>
          <Button
            mode="outlined"
            onPress={handleLogout}
            style={styles.logoutButton}
          >
            Logout
          </Button>
          <Button
            mode="text"
            textColor="#e74c3c"
            onPress={handleDeleteAccount}
            style={styles.deleteButton}
          >
            Delete Account
          </Button>
        </View>
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
  },
  buttonContainer: {
    padding: 16,
    marginTop: 'auto',
  },
  logoutButton: {
    marginBottom: 8,
  },
  deleteButton: {
    marginTop: 8,
  },
});