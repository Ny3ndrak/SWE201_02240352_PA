import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AntDesign } from '@expo/vector-icons';
import { useTheme } from '../components/ThemeContext';
import TasksScreen from '../screens/TasksScreen';
import ScheduleScreen from '../screens/ScheduleScreen';
import NotesScreen from '../screens/NotesScreen';
import GoalsScreen from '../screens/GoalsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import AnimationDemoScreen from '../screens/AnimationDemoScreen';
import type { TabParamList } from './AppNavigator';

const Tab = createBottomTabNavigator<TabParamList>();

/**
 * BottomTabs Navigator Component
 * Implements Bottom Tab Navigation with student productivity screens
 * Features: Tasks, Schedule, Notes, Goals, AnimationDemo, Profile/Settings
 */
const BottomTabs: React.FC = () => {
  const { colors, fontSize } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={{
        // Header styling - dynamic theme colors
        headerStyle: {
          backgroundColor: colors.primary,
        },
        headerTintColor: colors.textLight,
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: fontSize.lg,
        },
        // Tab bar styling - dynamic theme colors
        tabBarStyle: {
          backgroundColor: colors.card,
          borderTopColor: colors.border,
          borderTopWidth: 1,
          paddingBottom: 5,
          paddingTop: 5,
          height: 60,
        },
        tabBarActiveTintColor: colors.accent,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarLabelStyle: {
          fontSize: fontSize.xs,
          fontWeight: '600',
        },
      }}
    >
      {/* Tasks Tab - Todo list and task management */}
      <Tab.Screen
        name="Tasks"
        component={TasksScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <AntDesign name="check-circle" size={size} color={color} />
          ),
          headerTitle: 'My Tasks',
        }}
      />
      
      {/* Schedule Tab - Study schedule and timetable */}
      <Tab.Screen
        name="Schedule"
        component={ScheduleScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <AntDesign name="calendar" size={size} color={color} />
          ),
          headerTitle: 'Study Schedule',
        }}
      />
      
      {/* Notes Tab - Quick notes and study materials */}
      <Tab.Screen
        name="Notes"
        component={NotesScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <AntDesign name="file-text" size={size} color={color} />
          ),
          headerTitle: 'Quick Notes',
        }}
      />
      
      {/* Goals Tab - Progress tracking and goals */}
      <Tab.Screen
        name="Goals"
        component={GoalsScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <AntDesign name="trophy" size={size} color={color} />
          ),
          headerTitle: 'Study Goals',
        }}
      />
      
      {/* Animation Demo Tab - Showcase of animations and gestures */}
      <Tab.Screen
        name="AnimationDemo"
        component={AnimationDemoScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <AntDesign name="star" size={size} color={color} />
          ),
          headerTitle: 'Animation Demo',
          tabBarLabel: 'Demo',
        }}
      />
      
      {/* Profile Tab - Settings and preferences */}
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <AntDesign name="setting" size={size} color={color} />
          ),
          headerTitle: 'Settings',
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabs;
