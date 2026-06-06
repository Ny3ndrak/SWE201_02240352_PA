// screens/HomeScreen.tsx - Main dashboard screen
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  Platform,
} from 'react-native';
import * as Notifications from 'expo-notifications';
import { useNavigation } from '@react-navigation/native';
import { loadTasks, loadPushToken } from '../services/storageService';
import {
  registerForPushNotificationsAsync,
  requestNotificationPermissions,
} from '../services/notificationService';
import { registerDeviceToken } from '../api/backendClient';
import { Task } from '../types/task';

export default function HomeScreen() {
  const navigation = useNavigation();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [permissionStatus, setPermissionStatus] = useState<string>('unknown');
  const [pushToken, setPushToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadData();
    checkPermissionStatus();
  }, []);

  // Check current notification permission status
  const checkPermissionStatus = async () => {
    const { status } = await Notifications.getPermissionsAsync();
    setPermissionStatus(status);
  };

  const loadData = async () => {
    const loadedTasks = await loadTasks();
    setTasks(loadedTasks);
    const token = await loadPushToken();
    setPushToken(token);
  };

  // Request permissions and register for push notifications
  const handleRequestPermissions = async () => {
    setLoading(true);
    try {
      const granted = await requestNotificationPermissions();
      if (granted) {
        setPermissionStatus('granted');
        Alert.alert('Success', 'Notification permissions granted! You can now create tasks and receive local notifications.');
        
        // Try to register for push notifications (optional)
        const token = await registerForPushNotificationsAsync();
        if (token) {
          setPushToken(token);
          // Register with backend
          await registerDeviceToken(token, Platform.OS);
        }
        // Note: Push token failure is silently handled - local notifications still work
      } else {
        setPermissionStatus('denied');
        Alert.alert(
          'Permission Denied',
          'You need to enable notifications in your device settings to receive task reminders.'
        );
      }
    } catch (error) {
      console.error('Error requesting permissions:', error);
      Alert.alert('Error', 'Failed to request permissions');
    } finally {
      setLoading(false);
    }
  };

  const overdueTasks = tasks.filter(
    (task) => !task.completed && new Date(task.dueDate) < new Date()
  ).length;

  const todayTasks = tasks.filter((task) => {
    const today = new Date();
    const taskDate = new Date(task.dueDate);
    return (
      !task.completed &&
      taskDate.toDateString() === today.toDateString()
    );
  }).length;

  const upcomingTasks = tasks.filter(
    (task) => !task.completed && new Date(task.dueDate) > new Date()
  ).length;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>📋 TaskRemind</Text>
        <Text style={styles.subtitle}>Stay on top of your tasks</Text>
      </View>

      {/* Permission Status Card */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>🔔 Notifications</Text>
          <View
            style={[
              styles.statusBadge,
              permissionStatus === 'granted' ? styles.statusGranted : styles.statusDenied,
            ]}
          >
            <Text style={styles.statusText}>
              {permissionStatus === 'granted' ? 'Enabled' : 'Disabled'}
            </Text>
          </View>
        </View>

        {permissionStatus !== 'granted' && (
          <View style={styles.warningBox}>
            <Text style={styles.warningText}>
              ⚠️ Notifications are disabled. Enable them to receive task reminders.
            </Text>
            <TouchableOpacity
              style={styles.enableButton}
              onPress={handleRequestPermissions}
              disabled={loading}
            >
              <Text style={styles.enableButtonText}>
                {loading ? 'Requesting...' : 'Enable Notifications'}
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {permissionStatus === 'granted' && pushToken && (
          <Text style={styles.tokenText}>
            ✅ Device registered for remote notifications
          </Text>
        )}
      </View>

      {/* Stats Cards */}
      <View style={styles.statsContainer}>
        <View style={[styles.statCard, styles.overdueCard]}>
          <Text style={styles.statNumber}>{overdueTasks}</Text>
          <Text style={styles.statLabel}>Overdue</Text>
        </View>

        <View style={[styles.statCard, styles.todayCard]}>
          <Text style={styles.statNumber}>{todayTasks}</Text>
          <Text style={styles.statLabel}>Due Today</Text>
        </View>

        <View style={[styles.statCard, styles.upcomingCard]}>
          <Text style={styles.statNumber}>{upcomingTasks}</Text>
          <Text style={styles.statLabel}>Upcoming</Text>
        </View>
      </View>

      {/* Quick Actions */}
      <View style={styles.actionsContainer}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => navigation.navigate('Tasks' as never)}
        >
          <Text style={styles.actionIcon}>📝</Text>
          <Text style={styles.actionText}>View All Tasks</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => navigation.navigate('Settings' as never)}
        >
          <Text style={styles.actionIcon}>⚙️</Text>
          <Text style={styles.actionText}>Settings</Text>
        </TouchableOpacity>
      </View>

      {/* Recent Tasks Preview */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Recent Tasks</Text>
        {tasks.slice(0, 3).map((task) => (
          <TouchableOpacity
            key={task.id}
            style={styles.taskItem}
            onPress={() =>
              navigation.navigate('TaskDetail' as never, { taskId: task.id } as never)
            }
          >
            <Text style={styles.taskTitle}>{task.title}</Text>
            <Text style={styles.taskDue}>
              Due: {new Date(task.dueDate).toLocaleDateString()}
            </Text>
          </TouchableOpacity>
        ))}
        {tasks.length === 0 && (
          <Text style={styles.emptyText}>No tasks yet. Create one to get started!</Text>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  header: {
    padding: 24,
    backgroundColor: '#4F46E5',
    paddingTop: 60,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#E0E7FF',
  },
  card: {
    backgroundColor: 'white',
    margin: 16,
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 8,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusGranted: {
    backgroundColor: '#D1FAE5',
  },
  statusDenied: {
    backgroundColor: '#FEE2E2',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  warningBox: {
    backgroundColor: '#FEF3C7',
    padding: 12,
    borderRadius: 8,
    marginTop: 8,
  },
  warningText: {
    fontSize: 14,
    color: '#92400E',
    marginBottom: 12,
  },
  enableButton: {
    backgroundColor: '#4F46E5',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  enableButtonText: {
    color: 'white',
    fontWeight: '600',
  },
  tokenText: {
    fontSize: 12,
    color: '#059669',
    marginTop: 8,
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 12,
  },
  statCard: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  overdueCard: {
    backgroundColor: '#FEE2E2',
  },
  todayCard: {
    backgroundColor: '#DBEAFE',
  },
  upcomingCard: {
    backgroundColor: '#D1FAE5',
  },
  statNumber: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  statLabel: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
  },
  actionsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 12,
    marginTop: 16,
  },
  actionButton: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  actionIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  actionText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
  },
  taskItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1F2937',
    marginBottom: 4,
  },
  taskDue: {
    fontSize: 14,
    color: '#6B7280',
  },
  emptyText: {
    fontSize: 14,
    color: '#9CA3AF',
    textAlign: 'center',
    paddingVertical: 20,
  },
});
