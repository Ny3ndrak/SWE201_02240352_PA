// services/storageService.ts - AsyncStorage wrapper for task persistence
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Task } from '../types/task';

const TASKS_KEY = '@tasks';
const SETTINGS_KEY = '@notification_settings';
const PUSH_TOKEN_KEY = '@push_token';

/**
 * Save tasks to AsyncStorage
 */
export async function saveTasks(tasks: Task[]): Promise<void> {
  try {
    const jsonValue = JSON.stringify(tasks);
    await AsyncStorage.setItem(TASKS_KEY, jsonValue);
  } catch (error) {
    console.error('Error saving tasks:', error);
    throw error;
  }
}

/**
 * Load tasks from AsyncStorage
 */
export async function loadTasks(): Promise<Task[]> {
  try {
    const jsonValue = await AsyncStorage.getItem(TASKS_KEY);
    if (jsonValue != null) {
      const tasks = JSON.parse(jsonValue);
      // Convert date strings back to Date objects
      return tasks.map((task: any) => ({
        ...task,
        dueDate: new Date(task.dueDate),
        createdAt: new Date(task.createdAt),
      }));
    }
    return [];
  } catch (error) {
    console.error('Error loading tasks:', error);
    return [];
  }
}

/**
 * Save notification settings
 */
export async function saveNotificationSettings(enabled: boolean, reminderMinutes: number): Promise<void> {
  try {
    const settings = { enabled, reminderMinutes };
    await AsyncStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  } catch (error) {
    console.error('Error saving notification settings:', error);
  }
}

/**
 * Load notification settings
 */
export async function loadNotificationSettings(): Promise<{ enabled: boolean; reminderMinutes: number }> {
  try {
    const jsonValue = await AsyncStorage.getItem(SETTINGS_KEY);
    if (jsonValue != null) {
      return JSON.parse(jsonValue);
    }
    return { enabled: true, reminderMinutes: 15 };
  } catch (error) {
    console.error('Error loading notification settings:', error);
    return { enabled: true, reminderMinutes: 15 };
  }
}

/**
 * Save Expo Push Token
 */
export async function savePushToken(token: string): Promise<void> {
  try {
    await AsyncStorage.setItem(PUSH_TOKEN_KEY, token);
  } catch (error) {
    console.error('Error saving push token:', error);
  }
}

/**
 * Load Expo Push Token
 */
export async function loadPushToken(): Promise<string | null> {
  try {
    return await AsyncStorage.getItem(PUSH_TOKEN_KEY);
  } catch (error) {
    console.error('Error loading push token:', error);
    return null;
  }
}
