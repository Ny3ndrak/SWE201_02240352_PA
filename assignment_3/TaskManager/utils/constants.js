// App-wide constants

// Task status options
export const TASK_STATUS = {
  PENDING: 'pending',
  IN_PROGRESS: 'in-progress',
  DONE: 'done',
};

export const TASK_STATUS_OPTIONS = [
  { label: 'Pending', value: TASK_STATUS.PENDING },
  { label: 'In Progress', value: TASK_STATUS.IN_PROGRESS },
  { label: 'Done', value: TASK_STATUS.DONE },
];

// Filter options
export const STATUS_FILTERS = ['all', 'pending', 'in-progress', 'done'];

// Priority levels
export const PRIORITY_LEVELS = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
};

export const PRIORITY_OPTIONS = [
  { label: 'Low', value: PRIORITY_LEVELS.LOW },
  { label: 'Medium', value: PRIORITY_LEVELS.MEDIUM },
  { label: 'High', value: PRIORITY_LEVELS.HIGH },
];

// Colors
export const COLORS = {
  PRIMARY: '#4F46E5',
  SECONDARY: '#10B981',
  DANGER: '#EF4444',
  WARNING: '#F59E0B',
  INFO: '#3B82F6',
  GRAY: '#6B7280',
  LIGHT_GRAY: '#D1D5DB',
  WHITE: '#FFFFFF',
  BLACK: '#111827',
};

// API Error Messages
export const ERROR_MESSAGES = {
  NETWORK: 'Network error. Please check your connection.',
  UNAUTHORIZED: 'Session expired. Please login again.',
  NOT_FOUND: 'Resource not found.',
  SERVER_ERROR: 'Server error. Please try again later.',
  DEFAULT: 'Something went wrong. Please try again.',
};
