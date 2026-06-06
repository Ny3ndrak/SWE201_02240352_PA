// screens/SettingsScreen.tsx - App settings and notification configuration
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Switch,
  Alert,
  TextInput,
  Linking,
} from 'react-native';
import * as Notifications from 'expo-notifications';
import {
  loadNotificationSettings,
  saveNotificationSettings,
  loadPushToken,
  savePushToken,
} from '../services/storageService';
import {
  registerForPushNotificationsAsync,
  getScheduledNotifications,
  cancelAllNotifications,
} from '../services/notificationService';
import { triggerTestNotification } from '../api/backendClient';

export default function SettingsScreen() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [reminderMinutes, setReminderMinutes] = useState('15');
  const [permissionStatus, setPermissionStatus] = useState<string>('unknown');
  const [pushToken, setPushToken] = useState<string | null>(null);
  const [scheduledCount, setScheduledCount] = useState(0);

  useEffect(() => {
    loadSettings();
    checkPermissions();
    loadScheduledCount();
  }, []);

  const loadSettings = async () => {
    const settings = await loadNotificationSettings();
    setNotificationsEnabled(settings.enabled);
    setReminderMinutes(settings.reminderMinutes.toString());

    const token = await loadPushToken();
    setPushToken(token);
  };

  const checkPermissions = async () => {
    const { status } = await Notifications.getPermissionsAsync();
    setPermissionStatus(status);
  };

  const loadScheduledCount = async () => {
    const scheduled = await getScheduledNotifications();
    setScheduledCount(scheduled.length);
  };

  const handleSaveSettings = async () => {
    const minutes = parseInt(reminderMinutes);
    if (isNaN(minutes) || minutes < 1) {
      Alert.alert('Error', 'Please enter a valid number of minutes');
      return;
    }

    await saveNotificationSettings(notificationsEnabled, minutes);
    Alert.alert('Success', 'Settings saved successfully!');
  };

  const handleRegisterPush = async () => {
    const token = await registerForPushNotificationsAsync();
    if (token) {
      await savePushToken(token);
      setPushToken(token);
      Alert.alert('Success', 'Device registered for push notifications!');
    } else {
      Alert.alert(
        'Push Notifications Unavailable', 
        'Remote push notifications require an Expo project. Local scheduled notifications will work perfectly without this! You can still create tasks and receive notifications.'
      );
    }
  };

  const handleTestRemoteNotification = async () => {
    if (!pushToken) {
      Alert.alert('Error', 'Push token not available. Please register first.');
      return;
    }

    const success = await triggerTestNotification(
      pushToken,
      'Test Remote Notification',
      'This is a test notification from the backend!',
      { type: 'test', source: 'settings' }
    );

    if (success) {
      Alert.alert('Success', 'Test notification sent from backend!');
    } else {
      Alert.alert(
        'Error',
        'Failed to send notification. Make sure backend is running and configured correctly.'
      );
    }
  };

  const handleClearAllNotifications = () => {
    Alert.alert(
      'Clear All Notifications',
      'This will cancel all scheduled notifications. Are you sure?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear All',
          style: 'destructive',
          onPress: async () => {
            await cancelAllNotifications();
            setScheduledCount(0);
            Alert.alert('Success', 'All notifications cleared');
          },
        },
      ]
    );
  };

  const openAppSettings = () => {
    Linking.openSettings();
  };

  return (
    <ScrollView style={styles.container}>
      {/* Permission Status */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🔔 Notification Permissions</Text>
        <View style={styles.permissionCard}>
          <View style={styles.permissionRow}>
            <Text style={styles.permissionLabel}>Status:</Text>
            <View
              style={[
                styles.statusBadge,
                permissionStatus === 'granted' ? styles.statusGranted : styles.statusDenied,
              ]}
            >
              <Text style={styles.statusText}>
                {permissionStatus === 'granted' ? 'Granted' : 'Not Granted'}
              </Text>
            </View>
          </View>

          {permissionStatus !== 'granted' && (
            <View style={styles.warningBox}>
              <Text style={styles.warningText}>
                ⚠️ Notifications are disabled. You need to enable them in your device settings.
              </Text>
              <TouchableOpacity style={styles.settingsButton} onPress={openAppSettings}>
                <Text style={styles.settingsButtonText}>Open Settings</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>

      {/* Notification Settings */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>⚙️ Notification Settings</Text>

        <View style={styles.settingRow}>
          <View style={styles.settingInfo}>
            <Text style={styles.settingLabel}>Enable Notifications</Text>
            <Text style={styles.settingDescription}>
              Receive notifications for upcoming tasks
            </Text>
          </View>
          <Switch
            value={notificationsEnabled}
            onValueChange={setNotificationsEnabled}
          />
        </View>

        <View style={styles.settingRow}>
          <View style={styles.settingInfo}>
            <Text style={styles.settingLabel}>Reminder Time</Text>
            <Text style={styles.settingDescription}>
              Minutes before due date to send notification
            </Text>
          </View>
          <TextInput
            style={styles.input}
            value={reminderMinutes}
            onChangeText={setReminderMinutes}
            keyboardType="numeric"
            placeholder="15"
          />
        </View>

        <TouchableOpacity style={styles.saveButton} onPress={handleSaveSettings}>
          <Text style={styles.saveButtonText}>Save Settings</Text>
        </TouchableOpacity>
      </View>

      {/* Push Notifications */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📱 Push Notifications</Text>

        <View style={styles.pushCard}>
          {pushToken ? (
            <>
              <Text style={styles.pushLabel}>✅ Device Registered</Text>
              <Text style={styles.pushToken} numberOfLines={1} ellipsizeMode="middle">
                {pushToken}
              </Text>
              <TouchableOpacity
                style={styles.testButton}
                onPress={handleTestRemoteNotification}
              >
                <Text style={styles.testButtonText}>Send Test Remote Notification</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <Text style={styles.pushLabel}>Device not registered</Text>
              <TouchableOpacity style={styles.registerButton} onPress={handleRegisterPush}>
                <Text style={styles.registerButtonText}>Register for Push Notifications</Text>
              </TouchableOpacity>
            </>
          )}
        </View>

        <Text style={styles.infoText}>
          ℹ️ Remote push notifications require a backend server. Make sure your backend is
          configured and running.
        </Text>
      </View>

      {/* Scheduled Notifications */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📋 Scheduled Notifications</Text>

        <View style={styles.scheduledCard}>
          <Text style={styles.scheduledCount}>{scheduledCount}</Text>
          <Text style={styles.scheduledLabel}>Active Notifications</Text>

          <TouchableOpacity
            style={styles.refreshButton}
            onPress={loadScheduledCount}
          >
            <Text style={styles.refreshButtonText}>Refresh Count</Text>
          </TouchableOpacity>

          {scheduledCount > 0 && (
            <TouchableOpacity
              style={styles.clearButton}
              onPress={handleClearAllNotifications}
            >
              <Text style={styles.clearButtonText}>Clear All Notifications</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* About */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>ℹ️ About</Text>
        <Text style={styles.aboutText}>
          TaskRemind v1.0.0{'\n\n'}
          A task reminder app with push notification support.{'\n\n'}
          Features:{'\n'}
          • Local scheduled notifications{'\n'}
          • Remote push notifications via Expo{'\n'}
          • Task management with priorities{'\n'}
          • Notification customization
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  section: {
    margin: 16,
    marginBottom: 0,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 12,
  },
  permissionCard: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  permissionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  permissionLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1F2937',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  statusGranted: {
    backgroundColor: '#D1FAE5',
  },
  statusDenied: {
    backgroundColor: '#FEE2E2',
  },
  statusText: {
    fontSize: 14,
    fontWeight: '600',
  },
  warningBox: {
    backgroundColor: '#FEF3C7',
    padding: 12,
    borderRadius: 8,
    marginTop: 12,
  },
  warningText: {
    fontSize: 14,
    color: '#92400E',
    marginBottom: 12,
  },
  settingsButton: {
    backgroundColor: '#4F46E5',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  settingsButtonText: {
    color: 'white',
    fontWeight: '600',
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  settingInfo: {
    flex: 1,
    marginRight: 12,
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1F2937',
    marginBottom: 4,
  },
  settingDescription: {
    fontSize: 14,
    color: '#6B7280',
  },
  input: {
    width: 80,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    padding: 8,
    fontSize: 16,
    textAlign: 'center',
  },
  saveButton: {
    backgroundColor: '#4F46E5',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  pushCard: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  pushLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1F2937',
    marginBottom: 8,
  },
  pushToken: {
    fontSize: 12,
    color: '#6B7280',
    fontFamily: 'monospace',
    marginBottom: 12,
  },
  testButton: {
    backgroundColor: '#10B981',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  testButtonText: {
    color: 'white',
    fontWeight: '600',
  },
  registerButton: {
    backgroundColor: '#4F46E5',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  registerButtonText: {
    color: 'white',
    fontWeight: '600',
  },
  infoText: {
    fontSize: 14,
    color: '#6B7280',
    fontStyle: 'italic',
  },
  scheduledCard: {
    backgroundColor: 'white',
    padding: 24,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  scheduledCount: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#4F46E5',
  },
  scheduledLabel: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 16,
  },
  refreshButton: {
    backgroundColor: '#E5E7EB',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    marginBottom: 8,
  },
  refreshButtonText: {
    color: '#1F2937',
    fontWeight: '600',
  },
  clearButton: {
    backgroundColor: '#FEE2E2',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  clearButtonText: {
    color: '#991B1B',
    fontWeight: '600',
  },
  aboutText: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    fontSize: 14,
    color: '#4B5563',
    lineHeight: 22,
  },
});
