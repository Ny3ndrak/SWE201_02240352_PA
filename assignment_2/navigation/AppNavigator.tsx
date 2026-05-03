import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useTheme } from '../components/ThemeContext';
import HomeScreen from '../screens/HomeScreen';
import BottomTabs from './BottomTabs';
import TaskDetailScreen from '../screens/TaskDetailScreen';

/**
 * Navigation type definitions for type-safe navigation
 */
export type RootStackParamList = {
  Home: undefined;
  MainTabs: { screen?: string } | undefined;
  TaskDetail: { 
    title: string; 
    description: string;
    completed: boolean;
    priority: string;
    category: string;
    dueDate: string;
  };
};

export type TabParamList = {
  Tasks: undefined;
  Schedule: undefined;
  Notes: undefined;
  Goals: undefined;
  AnimationDemo: undefined;
  Profile: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

/**
 * AppNavigator Component
 * Main navigation container for Student Planner app
 * Implements: Stack Navigator (Home → Tabs → Details) + Bottom Tabs (6 screens)
 */
const AppNavigator: React.FC = () => {
  const { colors, isDark } = useTheme();

  return (
    <NavigationContainer
      theme={{
        dark: isDark,
        colors: {
          primary: colors.primary,
          background: colors.background,
          card: colors.card,
          text: colors.textPrimary,
          border: colors.border,
          notification: colors.accent,
        },
      }}
    >
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: colors.textLight,
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerBackTitleVisible: false,
        }}
      >
        {/* Home Screen - Landing page with navigation entry points */}
        <Stack.Screen 
          name="Home" 
          component={HomeScreen}
          options={{ 
            title: 'Student Planner',
            headerShown: true,
          }}
        />
        
        {/* Main Tabs - Bottom Tab Navigator with all main screens */}
        <Stack.Screen 
          name="MainTabs" 
          component={BottomTabs}
          options={{ 
            headerShown: false,
          }}
        />
        
        {/* Task Detail Screen - Demonstrates parameter passing between screens */}
        <Stack.Screen 
          name="TaskDetail" 
          component={TaskDetailScreen}
          options={{ 
            title: 'Task Details',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
