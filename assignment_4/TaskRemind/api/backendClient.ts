// api/backendClient.ts - HTTP client for backend communication
import axios, { AxiosInstance } from 'axios';

// Configuration - should be moved to .env file
const BACKEND_URL = process.env.BACKEND_URL || 'http://192.168.1.100:3000';
const API_KEY = process.env.API_KEY || 'dev-api-key-12345';

/**
 * Axios instance configured for backend API
 */
const apiClient: AxiosInstance = axios.create({
  baseURL: BACKEND_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'X-API-Key': API_KEY,
  },
});

/**
 * Register device token with backend
 */
export async function registerDeviceToken(
  expoPushToken: string,
  deviceId: string
): Promise<boolean> {
  try {
    const response = await apiClient.post('/api/register-token', {
      expoPushToken,
      deviceId,
      platform: 'mobile',
    });
    console.log('Token registered with backend:', response.data);
    return true;
  } catch (error) {
    console.error('Error registering device token:', error);
    return false;
  }
}

/**
 * Send test notification from backend
 */
export async function triggerTestNotification(
  expoPushToken: string,
  title: string,
  body: string,
  data?: any
): Promise<boolean> {
  try {
    const response = await apiClient.post('/api/send-notification', {
      expoPushToken,
      title,
      body,
      data,
    });
    console.log('Test notification sent:', response.data);
    return true;
  } catch (error) {
    console.error('Error sending test notification:', error);
    return false;
  }
}

/**
 * Notify backend about task creation (backend can schedule reminders)
 */
export async function notifyTaskCreated(
  expoPushToken: string,
  taskId: string,
  title: string,
  dueDate: Date
): Promise<boolean> {
  try {
    const response = await apiClient.post('/api/task-created', {
      expoPushToken,
      taskId,
      title,
      dueDate: dueDate.toISOString(),
    });
    console.log('Backend notified of task creation:', response.data);
    return true;
  } catch (error) {
    console.error('Error notifying backend:', error);
    return false;
  }
}

export default apiClient;
