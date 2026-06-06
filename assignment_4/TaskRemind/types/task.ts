// types/task.ts - Task entity types
export interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: Date;
  priority: 'low' | 'medium' | 'high';
  completed: boolean;
  notificationsEnabled: boolean;
  notificationId?: string;
  createdAt: Date;
  category?: string;
}

export interface NotificationSettings {
  enabled: boolean;
  reminderMinutes: number; // Minutes before due date to notify
}
