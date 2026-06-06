// services/notificationService.ts - Core notification service using Expo Notifications
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { Platform } from 'react-native';
import Constants from 'expo-constants';

/**
 * Configure how notifications are handled when app is in foreground
 */
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

/**
 * Request notification permissions from the user
 * Handles platform-specific permission flows
 */
export async function requestNotificationPermissions(): Promise<boolean> {
  if (!Device.isDevice) {
    console.warn('Push notifications only work on physical devices');
    return false;
  }

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  // Request permissions if not already granted
  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== 'granted') {
    console.warn('Notification permission not granted');
    return false;
  }

  // Configure Android notification channel
  if (Platform.OS === 'android') {
    await setupAndroidChannel();
  }

  return true;
}

/**
 * Setup Android notification channel with appropriate settings
 * Required for Android 8.0+ (API level 26+)
 */
async function setupAndroidChannel() {
  await Notifications.setNotificationChannelAsync('task-reminders', {
    name: 'Task Reminders',
    importance: Notifications.AndroidImportance.HIGH,
    vibrationPattern: [0, 250, 250, 250],
    lightColor: '#4F46E5',
    sound: 'default',
    enableVibrate: true,
    enableLights: true,
    lockscreenVisibility: Notifications.AndroidNotificationVisibility.PUBLIC,
    bypassDnd: false,
  });

  // Additional channel for high priority tasks
  await Notifications.setNotificationChannelAsync('urgent-tasks', {
    name: 'Urgent Task Alerts',
    importance: Notifications.AndroidImportance.MAX,
    vibrationPattern: [0, 500, 250, 500],
    lightColor: '#EF4444',
    sound: 'default',
    enableVibrate: true,
    enableLights: true,
    lockscreenVisibility: Notifications.AndroidNotificationVisibility.PUBLIC,
    bypassDnd: true,
  });
}

/**
 * Register device and get Expo Push Token for remote notifications
 */
export async function registerForPushNotificationsAsync(): Promise<string | null> {
  if (!Device.isDevice) {
    alert('Must use physical device for Push Notifications');
    return null;
  }

  try {
    const permissionGranted = await requestNotificationPermissions();
    if (!permissionGranted) {
      return null;
    }

    // Get Expo Push Token
    const projectId = Constants.expoConfig?.extra?.eas?.projectId ?? Constants.easConfig?.projectId;
    
    if (!projectId || projectId === 'a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d') {
      console.log('⚠️ No valid Expo project configured. Remote push notifications disabled.');
      console.log('📱 Local scheduled notifications will work without a project ID.');
      return null;
    }

    const token = await Notifications.getExpoPushTokenAsync({
      projectId: projectId,
    });

    console.log('Expo Push Token:', token.data);
    return token.data;
  } catch (error) {
    console.log('⚠️ Could not get push token (this is OK for local notifications):', error);
    return null;
  }
}

/**
 * Schedule a local notification for a task
 * @param task - Task to schedule notification for
 * @param reminderMinutes - Minutes before due date to send notification
 * @returns Notification identifier for cancellation
 */
export async function scheduleTaskNotification(
  taskId: string,
  title: string,
  description: string,
  dueDate: Date,
  priority: 'low' | 'medium' | 'high',
  reminderMinutes: number = 15
): Promise<string> {
  const trigger = new Date(dueDate);
  trigger.setMinutes(trigger.getMinutes() - reminderMinutes);

  // Determine channel based on priority
  const channelId = priority === 'high' ? 'urgent-tasks' : 'task-reminders';

  const notificationId = await Notifications.scheduleNotificationAsync({
    content: {
      title: `📋 ${title}`,
      body: description || `Task due in ${reminderMinutes} minutes`,
      data: { 
        taskId,
        type: 'task-reminder',
        priority 
      },
      sound: priority === 'high' ? 'default' : undefined,
      priority: priority === 'high' 
        ? Notifications.AndroidNotificationPriority.MAX 
        : Notifications.AndroidNotificationPriority.HIGH,
      badge: 1,
    },
    trigger: trigger > new Date() ? trigger : null, // null = show immediately if past
  });

  return notificationId;
}

/**
 * Cancel a scheduled notification
 */
export async function cancelNotification(notificationId: string): Promise<void> {
  await Notifications.cancelScheduledNotificationAsync(notificationId);
}

/**
 * Cancel all scheduled notifications
 */
export async function cancelAllNotifications(): Promise<void> {
  await Notifications.cancelAllScheduledNotificationsAsync();
}

/**
 * Get all scheduled notifications
 */
export async function getScheduledNotifications(): Promise<Notifications.NotificationRequest[]> {
  return await Notifications.getAllScheduledNotificationsAsync();
}

/**
 * Send immediate notification (for testing)
 */
export async function sendImmediateNotification(
  title: string,
  body: string,
  data?: any
): Promise<string> {
  return await Notifications.scheduleNotificationAsync({
    content: {
      title,
      body,
      data: data || {},
      sound: true,
    },
    trigger: null, // null = immediate
  });
}
