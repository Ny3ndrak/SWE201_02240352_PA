import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useTheme } from '../components/ThemeContext';
import HomeScreen from '../screens/HomeScreen';
import BottomTabs from './BottomTabs';
import ContactDetailScreen from '../screens/ContactDetailScreen';

/**
 * Navigation type definitions for type-safe navigation
 */
export type RootStackParamList = {
  Home: undefined;
  MainTabs: { screen?: string } | undefined;
  ContactDetail: { 
    name: string; 
    role: string; 
    phone: string; 
    email: string; 
    office?: string;
  };
};

export type TabParamList = {
  Contacts: undefined;
  Schedule: undefined;
  Notice: undefined;
  CampusMap: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

/**
 * AppNavigator Component
 * Main navigation container combining Stack Navigator and Bottom Tabs
 * Implements navigation requirements: Stack navigator + Bottom tabs
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
            title: 'Campus Companion',
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
        
        {/* Contact Detail Screen - Demonstrates parameter passing between screens */}
        <Stack.Screen 
          name="ContactDetail" 
          component={ContactDetailScreen}
          options={{ 
            title: 'Contact Details',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
