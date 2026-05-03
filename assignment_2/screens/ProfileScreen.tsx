import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useTheme } from '../components/ThemeContext';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/AppNavigator';

type ProfileScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface Props {
  navigation?: ProfileScreenNavigationProp;
}

/**
 * ProfileScreen Component
 * Settings and preferences screen with theme toggle
 * Implements: App settings, Notifications, Theme switching, User preferences
 */
const ProfileScreen: React.FC<Props> = ({ navigation }) => {
  const { colors, fontSize, isDark, toggleTheme } = useTheme();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(false);
  const [taskReminders, setTaskReminders] = useState(true);
  const [autoSync, setAutoSync] = useState(true);

  const userInfo = {
    name: 'Nyendrak Yoezer Zangmo',
    id: '02240352',
    email: '02240352.cst@rub.edu.bt',
  };

  const settingsOptions = [
    {
      icon: 'notification' as const,
      title: 'Push Notifications',
      value: notificationsEnabled,
      onToggle: setNotificationsEnabled,
    },
    {
      icon: 'clock-circle' as const,
      title: 'Task Reminders',
      value: taskReminders,
      onToggle: setTaskReminders,
    },
    {
      icon: 'sync' as const,
      title: 'Auto Sync',
      value: autoSync,
      onToggle: setAutoSync,
    },
  ];

  const menuOptions = [
    {
      icon: 'pie-chart' as const,
      title: 'Statistics & Analytics',
      onPress: () => console.log('Statistics'),
    },
    {
      icon: 'export' as const,
      title: 'Export Data',
      onPress: () => console.log('Export'),
    },
    {
      icon: 'safety' as const,
      title: 'Privacy & Security',
      onPress: () => console.log('Privacy'),
    },
    {
      icon: 'question-circle' as const,
      title: 'Help & Support',
      onPress: () => console.log('Help'),
    },
    {
      icon: 'info-circle' as const,
      title: 'About Student Planner',
      onPress: () => console.log('About'),
    },
  ];

  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: colors.background }]}
      showsVerticalScrollIndicator={false}
    >
      {/* Profile Header */}
      <View style={[styles.profileHeader, { backgroundColor: colors.primary }]}>
        <View style={styles.avatarLarge}>
          <Text style={[styles.avatarTextLarge, { fontSize: fontSize.xxl }]}>
            {userInfo.name.charAt(0)}
          </Text>
        </View>
        <Text style={[styles.userName, { fontSize: fontSize.xl }]}>
          {userInfo.name}
        </Text>
        <Text style={[styles.userInfo, { fontSize: fontSize.sm }]}>
          {userInfo.id}
        </Text>
      </View>

      {/* User Info Card */}
      <View style={[styles.infoCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <View style={styles.infoRow}>
          <AntDesign name="idcard" size={20} color={colors.accent} />
          <View style={styles.infoContent}>
            <Text style={[styles.infoLabel, { color: colors.textSecondary, fontSize: fontSize.xs }]}>
              Student ID
            </Text>
            <Text style={[styles.infoValue, { color: colors.textPrimary, fontSize: fontSize.md }]}>
              {userInfo.id}
            </Text>
          </View>
        </View>
        <View style={styles.infoRow}>
          <AntDesign name="mail" size={20} color={colors.accent} />
          <View style={styles.infoContent}>
            <Text style={[styles.infoLabel, { color: colors.textSecondary, fontSize: fontSize.xs }]}>
              Email
            </Text>
            <Text style={[styles.infoValue, { color: colors.textPrimary, fontSize: fontSize.md }]}>
              {userInfo.email}
            </Text>
          </View>
        </View>
      </View>

      {/* Theme Toggle */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.textPrimary, fontSize: fontSize.lg }]}>
          Appearance
        </Text>
        <View style={[styles.settingItem, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <View style={styles.settingLeft}>
            <AntDesign name="eye" size={22} color={colors.accent} />
            <Text style={[styles.settingText, { color: colors.textPrimary, fontSize: fontSize.md }]}>
              Dark Mode
            </Text>
          </View>
          <Switch
            value={isDark}
            onValueChange={toggleTheme}
            trackColor={{ false: '#767577', true: colors.accent }}
            thumbColor={isDark ? '#f4f3f4' : '#f4f3f4'}
          />
        </View>
      </View>

      {/* Notifications Settings */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.textPrimary, fontSize: fontSize.lg }]}>
          Notifications
        </Text>
        {settingsOptions.map((option, index) => (
          <View 
            key={index}
            style={[styles.settingItem, { backgroundColor: colors.card, borderColor: colors.border }]}
          >
            <View style={styles.settingLeft}>
              <AntDesign name={option.icon} size={22} color={colors.accent} />
              <Text style={[styles.settingText, { color: colors.textPrimary, fontSize: fontSize.md }]}>
                {option.title}
              </Text>
            </View>
            <Switch
              value={option.value}
              onValueChange={option.onToggle}
              trackColor={{ false: '#767577', true: colors.accent }}
              thumbColor={option.value ? '#f4f3f4' : '#f4f3f4'}
            />
          </View>
        ))}
      </View>

      {/* Menu Options */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.textPrimary, fontSize: fontSize.lg }]}>
          More Options
        </Text>
        {menuOptions.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.menuItem, { backgroundColor: colors.card, borderColor: colors.border }]}
            onPress={option.onPress}
            activeOpacity={0.7}
          >
            <AntDesign name={option.icon} size={22} color={colors.accent} />
            <Text style={[styles.menuText, { color: colors.textPrimary, fontSize: fontSize.md }]}>
              {option.title}
            </Text>
            <AntDesign name="right" size={18} color={colors.textSecondary} />
          </TouchableOpacity>
        ))}
      </View>

      {/* Logout Button */}
      <TouchableOpacity 
        style={[styles.logoutButton, { backgroundColor: colors.card, borderColor: '#FF6B6B' }]}
        activeOpacity={0.7}
      >
        <AntDesign name="logout" size={22} color="#FF6B6B" />
        <Text style={[styles.logoutText, { fontSize: fontSize.md }]}>
          Logout
        </Text>
      </TouchableOpacity>

      {/* Version Info */}
      <View style={styles.versionContainer}>
        <Text style={[styles.versionText, { color: colors.textSecondary, fontSize: fontSize.xs }]}>
          Campus Companion v1.0.0
        </Text>
        <Text style={[styles.versionText, { color: colors.textSecondary, fontSize: fontSize.xs }]}>
          SWE201 Assignment 2
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profileHeader: {
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  avatarLarge: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  avatarTextLarge: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  userName: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  userInfo: {
    color: 'rgba(255, 255, 255, 0.9)',
  },
  infoCard: {
    margin: 15,
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  infoContent: {
    marginLeft: 15,
    flex: 1,
  },
  infoLabel: {
    marginBottom: 3,
    textTransform: 'uppercase',
    fontWeight: '600',
  },
  infoValue: {
    fontWeight: '500',
  },
  section: {
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  sectionTitle: {
    fontWeight: 'bold',
    marginBottom: 12,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingText: {
    marginLeft: 15,
    fontWeight: '500',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
  },
  menuText: {
    flex: 1,
    marginLeft: 15,
    fontWeight: '500',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 15,
    padding: 15,
    borderRadius: 10,
    borderWidth: 2,
    marginBottom: 20,
  },
  logoutText: {
    color: '#FF6B6B',
    fontWeight: '600',
    marginLeft: 10,
  },
  versionContainer: {
    alignItems: 'center',
    paddingBottom: 30,
  },
  versionText: {
    marginBottom: 3,
  },
});

export default ProfileScreen;
