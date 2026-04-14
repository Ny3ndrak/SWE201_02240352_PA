import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AntDesign } from '@expo/vector-icons';
import { useTheme } from '../components/ThemeContext';
import ContactScreen from '../screens/ContactScreen';
import ScheduleScreen from '../screens/ScheduleScreen';
import NoticeScreen from '../screens/NoticeScreen';
import CampusMapScreen from '../screens/CampusMapScreen';
import type { TabParamList } from './AppNavigator';

const Tab = createBottomTabNavigator<TabParamList>();

/**
 * BottomTabs Navigator Component
 * Implements Bottom Tab Navigation with 3 main screens
 * Uses dynamic theme colors and responsive sizing
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
      {/* Contacts Tab - List of important campus contacts */}
      <Tab.Screen
        name="Contacts"
        component={ContactScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <AntDesign name="contacts" size={size} color={color} />
          ),
          headerTitle: 'Important Contacts',
        }}
      />
      
      {/* Schedule Tab - Weekly class timetable */}
      <Tab.Screen
        name="Schedule"
        component={ScheduleScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <AntDesign name="calendar" size={size} color={color} />
          ),
          headerTitle: 'My Schedule',
        }}
      />
      
      {/* Notice Tab - Campus announcements and notices */}
      <Tab.Screen
        name="Notice"
        component={NoticeScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <AntDesign name="filetext1" size={size} color={color} />
          ),
          headerTitle: 'Notice Board',
          tabBarLabel: 'Notices',
        }}
      />
      
      {/* Campus Map Tab - Maps and locations */}
      <Tab.Screen
        name="CampusMap"
        component={CampusMapScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <AntDesign name="enviromento" size={size} color={color} />
          ),
          headerTitle: 'Campus Map',
          tabBarLabel: 'Map',
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabs;
