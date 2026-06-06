// screens/TaskDetailScreen.tsx - Detailed view of a single task with notification management
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  Switch,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Task } from '../types/task';
import { loadTasks, saveTasks, loadNotificationSettings } from '../services/storageService';
import {
  scheduleTaskNotification,
  cancelNotification,
  sendImmediateNotification,
} from '../services/notificationService';

export default function TaskDetailScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { taskId } = route.params as { taskId: string };
  const [task, setTask] = useState<Task | null>(null);

  useEffect(() => {
    loadTaskDetail();
  }, [taskId]);

  const loadTaskDetail = async () => {
    const tasks = await loadTasks();
    const foundTask = tasks.find((t) => t.id === taskId);
    if (foundTask) {
      setTask(foundTask);
    } else {
      Alert.alert('Error', 'Task not found');
      navigation.goBack();
    }
  };

  const toggleNotifications = async () => {
    if (!task) return;

    const updatedTask = { ...task, notificationsEnabled: !task.notificationsEnabled };

    if (updatedTask.notificationsEnabled && !task.completed) {
      // Schedule notification
      const settings = await loadNotificationSettings();
      const notificationId = await scheduleTaskNotification(
        task.id,
        task.title,
        task.description,
        task.dueDate,
        task.priority,
        settings.reminderMinutes
      );
      updatedTask.notificationId = notificationId;
      Alert.alert('Success', 'Notifications enabled for this task');
    } else if (task.notificationId) {
      // Cancel notification
      await cancelNotification(task.notificationId);
      updatedTask.notificationId = undefined;
      Alert.alert('Success', 'Notifications disabled for this task');
    }

    // Save updated task
    const tasks = await loadTasks();
    const updatedTasks = tasks.map((t) => (t.id === task.id ? updatedTask : t));
    await saveTasks(updatedTasks);
    setTask(updatedTask);
  };

  const testNotification = async () => {
    if (!task) return;

    await sendImmediateNotification(
      `Test: ${task.title}`,
      `This is a test notification for your task`,
      { taskId: task.id, type: 'test' }
    );
    Alert.alert('Success', 'Test notification sent!');
  };

  const toggleCompletion = async () => {
    if (!task) return;

    const updatedTask = { ...task, completed: !task.completed };

    // Cancel notification if task is completed
    if (updatedTask.completed && task.notificationId) {
      await cancelNotification(task.notificationId);
    }

    const tasks = await loadTasks();
    const updatedTasks = tasks.map((t) => (t.id === task.id ? updatedTask : t));
    await saveTasks(updatedTasks);
    setTask(updatedTask);
  };

  if (!task) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  const isOverdue = !task.completed && new Date(task.dueDate) < new Date();
  const priorityColor =
    task.priority === 'high' ? '#EF4444' : task.priority === 'medium' ? '#F59E0B' : '#10B981';

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>{task.title}</Text>
          <View style={[styles.priorityBadge, { backgroundColor: priorityColor }]}>
            <Text style={styles.priorityText}>{task.priority.toUpperCase()}</Text>
          </View>
        </View>

        {/* Status Badge */}
        <View style={styles.statusContainer}>
          {task.completed ? (
            <View style={styles.completedBadge}>
              <Text style={styles.completedText}>✓ Completed</Text>
            </View>
          ) : isOverdue ? (
            <View style={styles.overdueBadge}>
              <Text style={styles.overdueText}>⚠️ Overdue</Text>
            </View>
          ) : (
            <View style={styles.activeBadge}>
              <Text style={styles.activeText}>⏰ Active</Text>
            </View>
          )}
        </View>

        {/* Description */}
        {task.description ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Description</Text>
            <Text style={styles.description}>{task.description}</Text>
          </View>
        ) : null}

        {/* Due Date */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Due Date</Text>
          <Text style={styles.dueDate}>
            📅 {new Date(task.dueDate).toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </Text>
          <Text style={styles.dueTime}>
            🕐 {new Date(task.dueDate).toLocaleTimeString('en-US', {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </Text>
        </View>

        {/* Notification Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notifications</Text>
          <View style={styles.notificationRow}>
            <View>
              <Text style={styles.notificationLabel}>Push Notifications</Text>
              <Text style={styles.notificationSublabel}>
                {task.notificationsEnabled
                  ? 'You will be notified before this task is due'
                  : 'No notifications for this task'}
              </Text>
            </View>
            <Switch value={task.notificationsEnabled} onValueChange={toggleNotifications} />
          </View>

          {task.notificationsEnabled && !task.completed && (
            <TouchableOpacity style={styles.testButton} onPress={testNotification}>
              <Text style={styles.testButtonText}>🔔 Send Test Notification</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Metadata */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Details</Text>
          <View style={styles.metadataRow}>
            <Text style={styles.metadataLabel}>Created:</Text>
            <Text style={styles.metadataValue}>
              {new Date(task.createdAt).toLocaleDateString()}
            </Text>
          </View>
          {task.notificationId && (
            <View style={styles.metadataRow}>
              <Text style={styles.metadataLabel}>Notification ID:</Text>
              <Text style={styles.metadataValue}>{task.notificationId.substring(0, 8)}...</Text>
            </View>
          )}
        </View>

        {/* Action Buttons */}
        <View style={styles.actions}>
          <TouchableOpacity
            style={[styles.actionButton, task.completed ? styles.uncompleteButton : styles.completeButton]}
            onPress={toggleCompletion}
          >
            <Text style={styles.actionButtonText}>
              {task.completed ? '↺ Mark as Incomplete' : '✓ Mark as Complete'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionButton, styles.backButton]}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backButtonText}>← Back to Tasks</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  content: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  title: {
    flex: 1,
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1F2937',
    marginRight: 12,
  },
  priorityBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  priorityText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'white',
  },
  statusContainer: {
    marginBottom: 24,
  },
  completedBadge: {
    backgroundColor: '#D1FAE5',
    padding: 12,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  completedText: {
    color: '#065F46',
    fontWeight: '600',
  },
  overdueBadge: {
    backgroundColor: '#FEE2E2',
    padding: 12,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  overdueText: {
    color: '#991B1B',
    fontWeight: '600',
  },
  activeBadge: {
    backgroundColor: '#DBEAFE',
    padding: 12,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  activeText: {
    color: '#1E40AF',
    fontWeight: '600',
  },
  section: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: '#4B5563',
    lineHeight: 24,
  },
  dueDate: {
    fontSize: 16,
    color: '#1F2937',
    marginBottom: 4,
  },
  dueTime: {
    fontSize: 16,
    color: '#1F2937',
  },
  notificationRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  notificationLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1F2937',
    marginBottom: 4,
  },
  notificationSublabel: {
    fontSize: 14,
    color: '#6B7280',
  },
  testButton: {
    backgroundColor: '#4F46E5',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  testButtonText: {
    color: 'white',
    fontWeight: '600',
  },
  metadataRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  metadataLabel: {
    fontSize: 14,
    color: '#6B7280',
  },
  metadataValue: {
    fontSize: 14,
    color: '#1F2937',
    fontWeight: '500',
  },
  actions: {
    gap: 12,
    marginTop: 8,
  },
  actionButton: {
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  completeButton: {
    backgroundColor: '#10B981',
  },
  uncompleteButton: {
    backgroundColor: '#6B7280',
  },
  actionButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  backButton: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#D1D5DB',
  },
  backButtonText: {
    color: '#1F2937',
    fontSize: 16,
    fontWeight: '600',
  },
});
