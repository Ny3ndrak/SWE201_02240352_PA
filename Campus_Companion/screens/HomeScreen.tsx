import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Switch, StatusBar, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AntDesign } from '@expo/vector-icons';
import { useTheme } from '../components/ThemeContext';

// Navigation types
type RootStackParamList = {
  Home: undefined;
  MainTabs: { screen?: string };
  ContactDetail: undefined;
};

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

interface MenuItem {
  id: number;
  title: string;
  screen: string;
  icon: keyof typeof AntDesign.glyphMap;
}

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const { colors, isDark, toggleTheme, fontSize, shadows } = useTheme();

  const menuItems: MenuItem[] = [
    { id: 1, title: 'Contacts', screen: 'Contacts', icon: 'contacts' },
    { id: 2, title: 'Schedule', screen: 'Schedule', icon: 'calendar' },
    { id: 3, title: 'Notice Board', screen: 'Notice', icon: 'filetext1' },
    { id: 4, title: 'Campus Map', screen: 'CampusMap', icon: 'enviromento' },
  ];

  const handleCardPress = (screen: string): void => {
    navigation.navigate('MainTabs', { screen });
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar 
        barStyle={isDark ? 'light-content' : 'dark-content'}
        backgroundColor={colors.primary}
      />
      
      {/* Header Section */}
      <View style={[styles.header, { backgroundColor: colors.primary }]}>
        <View style={styles.headerContent}>
          {/* College Logo */}
          <Image 
            source={require('../assets/image.png')} 
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={[styles.appTitle, { color: colors.textLight, fontSize: fontSize.xxl }]}>
            Campus Companion
          </Text>
          <Text style={[styles.collegeName, { color: colors.textLight, fontSize: fontSize.md }]}>
            Royal University of Bhutan
          </Text>
        </View>
        
        {/* Theme Toggle */}
        <View style={[styles.themeToggle, { backgroundColor: colors.card }]}>
          <AntDesign 
            name={isDark ? 'bulb1' : 'bulb1'} 
            size={fontSize.md} 
            color={isDark ? colors.accent : colors.textPrimary} 
          />
          <Switch
            value={isDark}
            onValueChange={toggleTheme}
            trackColor={{ false: '#D3D3D3', true: colors.primaryLight }}
            thumbColor={isDark ? colors.accent : '#FFFFFF'}
            ios_backgroundColor="#D3D3D3"
          />
        </View>
      </View>

      {/* Welcome Message */}
      <View style={styles.welcomeSection}>
        <Text style={[styles.welcomeText, { color: colors.textPrimary, fontSize: fontSize.xl }]}>
          Welcome!
        </Text>
        <Text style={[styles.subtitleText, { color: colors.textSecondary, fontSize: fontSize.md }]}>
          What would you like to explore today?
        </Text>
      </View>

      {/* Menu Grid */}
      <View style={styles.gridContainer}>
        <View style={styles.gridRow}>
          {menuItems.slice(0, 2).map((item) => (
            <TouchableOpacity
              key={item.id}
              style={[
                styles.card,
                { 
                  backgroundColor: colors.card,
                  borderColor: colors.border,
                  ...shadows.medium,
                },
              ]}
              onPress={() => handleCardPress(item.screen)}
              activeOpacity={0.7}
            >
              <AntDesign name={item.icon} size={40} color={colors.primary} />
              <Text style={[styles.cardTitle, { color: colors.textPrimary, fontSize: fontSize.lg }]}>
                {item.title}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.gridRow}>
          {menuItems.slice(2, 4).map((item) => (
            <TouchableOpacity
              key={item.id}
              style={[
                styles.card,
                { 
                  backgroundColor: colors.card,
                  borderColor: colors.border,
                  ...shadows.medium,
                },
              ]}
              onPress={() => handleCardPress(item.screen)}
              activeOpacity={0.7}
            >
              <AntDesign name={item.icon} size={40} color={colors.primary} />
              <Text style={[styles.cardTitle, { color: colors.textPrimary, fontSize: fontSize.lg }]}>
                {item.title}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 50,
    paddingBottom: 30,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerContent: {
    alignItems: 'center',
    marginBottom: 15,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 16,
  },
  appTitle: {
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  collegeName: {
    fontWeight: '600',
    textAlign: 'center',
  },
  themeToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 25,
    alignSelf: 'center',
    gap: 10,
  },
  welcomeSection: {
    paddingHorizontal: 20,
    paddingVertical: 24,
  },
  welcomeText: {
    fontWeight: 'bold',
    marginBottom: 6,
  },
  subtitleText: {
    fontWeight: '400',
  },
  gridContainer: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'flex-start',
  },
  gridRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  card: {
    width: '48%',
    aspectRatio: 1,
    borderRadius: 16,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  cardTitle: {
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 12,
  },
});

export default HomeScreen;
