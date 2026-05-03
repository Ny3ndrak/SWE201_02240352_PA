import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useColorScheme, Platform } from 'react-native';

/**
 * Theme object containing color values for light and dark modes
 */
export type Theme = {
  background: string;
  backgroundSecondary: string;
  card: string;
  text: string;
  subText: string;
  primary: string;
  primaryLight: string;
  border: string;
  borderLight: string;
  tabBar: string;
  tabBarInactive: string;
  textPrimary: string;
  textLight: string;
  textSecondary: string;
  accent: string;
  info: string;
};

/**
 * Font sizes for consistent typography across the app
 */
export type FontSize = {
  xxs: number;
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  xxl: number;
};

/**
 * Shadow styles for cards and elevated elements
 */
export type Shadows = {
  small: object;
  medium: object;
  large: object;
};

/**
 * Spacing scale for consistent margins and padding
 */
export type Spacing = {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  xxl: number;
};

/**
 * Standard font size scale
 */
const fontSize: FontSize = {
  xxs: 10,
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 22,
  xxl: 28,
};

/**
 * Shadow styles for iOS and Android
 */
const shadows: Shadows = {
  small: Platform.select({
    ios: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
    },
    android: {
      elevation: 2,
    },
  }) || {},
  medium: Platform.select({
    ios: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.15,
      shadowRadius: 4,
    },
    android: {
      elevation: 4,
    },
  }) || {},
  large: Platform.select({
    ios: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 8,
    },
    android: {
      elevation: 8,
    },
  }) || {},
};

/**
 * Spacing scale (in pixels)
 */
const spacing: Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

/**
 * Light theme color palette
 */
const lightTheme: Theme = {
  background: '#F5F5F5',
  backgroundSecondary: '#E8E8E8',
  card: '#FFFFFF',
  text: '#333333',
  subText: '#666666',
  primary: '#007AFF',
  primaryLight: '#4DA6FF',
  border: '#E0E0E0',
  borderLight: '#F0F0F0',
  tabBar: '#FFFFFF',
  tabBarInactive: '#8E8E93',
  textPrimary: '#333333',
  textLight: '#FFFFFF',
  textSecondary: '#666666',
  accent: '#007AFF',
  info: '#007AFF',
};

/**
 * Dark theme color palette
 */
const darkTheme: Theme = {
  background: '#1C1C1E',
  backgroundSecondary: '#2C2C2E',
  card: '#2C2C2E',
  text: '#FFFFFF',
  subText: '#EBEBF5',
  primary: '#0A84FF',
  primaryLight: '#3D9FFF',
  border: '#38383A',
  borderLight: '#48484A',
  tabBar: '#1C1C1E',
  tabBarInactive: '#8E8E93',
  textPrimary: '#FFFFFF',
  textLight: '#FFFFFF',
  textSecondary: '#EBEBF5',
  accent: '#0A84FF',
  info: '#0A84FF',
};

type ThemeContextType = {
  theme: Theme;
  colors: Theme;
  fontSize: FontSize;
  shadows: Shadows;
  spacing: Spacing;
  isDark: boolean;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

/**
 * ThemeProvider component that manages light/dark theme state
 * and provides theme values to child components
 */
export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const systemColorScheme = useColorScheme();
  const [isDark, setIsDark] = useState(systemColorScheme === 'dark');

  const toggleTheme = () => {
    setIsDark((prev) => !prev);
  };

  const themeColors = isDark ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider 
      value={{ 
        theme: themeColors, 
        colors: themeColors, 
        fontSize, 
        shadows,
        spacing,
        isDark, 
        toggleTheme 
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

/**
 * Custom hook to access theme context
 * Throws error if used outside ThemeProvider
 */
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
