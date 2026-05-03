import { Dimensions, ViewStyle } from 'react-native';

const { width, height } = Dimensions.get('window');

// Guideline sizes are based on standard ~5" screen mobile device
const guidelineBaseWidth = 350;
const guidelineBaseHeight = 680;

/**
 * Width percentage helper function
 */
export const wp = (widthPercent: number | string): number => {
  const elemWidth = typeof widthPercent === 'number' ? widthPercent : parseFloat(widthPercent);
  return (width / 100) * elemWidth;
};

/**
 * Height percentage helper function
 */
export const hp = (heightPercent: number | string): number => {
  const elemHeight = typeof heightPercent === 'number' ? heightPercent : parseFloat(heightPercent);
  return (height / 100) * elemHeight;
};

/**
 * Responsive font size based on screen width
 */
export const scale = (size: number): number => (width / guidelineBaseWidth) * size;

/**
 * Responsive sizing based on screen height
 */
export const verticalScale = (size: number): number => (height / guidelineBaseHeight) * size;

/**
 * Moderate scale - combination of scale and fixed size
 */
export const moderateScale = (size: number, factor: number = 0.5): number => 
  size + (scale(size) - size) * factor;

// Color Types
export interface ColorPalette {
  primary: string;
  primaryLight: string;
  primaryDark: string;
  accent: string;
  accentLight: string;
  accentDark: string;
  white: string;
  black: string;
  gray: string;
  lightGray: string;
  darkGray: string;
  background: string;
  backgroundDark: string;
  textPrimary: string;
  textSecondary: string;
  textLight: string;
  success: string;
  warning: string;
  error: string;
  info: string;
  transparent: string;
  overlay: string;
}

// Color Palette
export const colors: ColorPalette = {
  // Primary Colors
  primary: '#003366',
  primaryLight: '#0055AA',
  primaryDark: '#001A33',
  
  // Accent Colors
  accent: '#D4AF37',
  accentLight: '#FFD700',
  accentDark: '#B8960F',
  
  // Neutral Colors
  white: '#FFFFFF',
  black: '#000000',
  gray: '#808080',
  lightGray: '#D3D3D3',
  darkGray: '#4A4A4A',
  
  // Background Colors
  background: '#F5F5F5',
  backgroundDark: '#E0E0E0',
  
  // Text Colors
  textPrimary: '#212121',
  textSecondary: '#757575',
  textLight: '#FFFFFF',
  
  // Status Colors
  success: '#4CAF50',
  warning: '#FFC107',
  error: '#F44336',
  info: '#2196F3',
  
  // Transparent
  transparent: 'transparent',
  overlay: 'rgba(0, 0, 0, 0.5)',
};

export interface Spacing {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  xxl: number;
}

// Spacing
export const spacing: Spacing = {
  xs: moderateScale(4),
  sm: moderateScale(8),
  md: moderateScale(16),
  lg: moderateScale(24),
  xl: moderateScale(32),
  xxl: moderateScale(48),
};

export interface FontSize {
  xxs: number;
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  xxl: number;
  xxxl: number;
  giant: number;
}

// Font Sizes
export const fontSize: FontSize = {
  xxs: moderateScale(10),
  xs: moderateScale(12),
  sm: moderateScale(14),
  md: moderateScale(16),
  lg: moderateScale(18),
  xl: moderateScale(20),
  xxl: moderateScale(24),
  xxxl: moderateScale(32),
  giant: moderateScale(40),
};

export interface BorderRadius {
  sm: number;
  md: number;
  lg: number;
  xl: number;
  round: number;
  circle: number;
}

// Border Radius
export const borderRadius: BorderRadius = {
  sm: moderateScale(4),
  md: moderateScale(8),
  lg: moderateScale(12),
  xl: moderateScale(16),
  round: moderateScale(50),
  circle: moderateScale(100),
};

export interface ShadowStyle extends ViewStyle {
  shadowColor: string;
  shadowOffset: { width: number; height: number };
  shadowOpacity: number;
  shadowRadius: number;
  elevation: number;
}

export interface Shadows {
  small: ShadowStyle;
  medium: ShadowStyle;
  large: ShadowStyle;
}

// Shadows
export const shadows: Shadows = {
  small: {
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  medium: {
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },
  large: {
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 6,
  },
};

export interface IconSize {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  xxl: number;
}

// Icon Sizes
export const iconSize: IconSize = {
  xs: moderateScale(12),
  sm: moderateScale(16),
  md: moderateScale(24),
  lg: moderateScale(32),
  xl: moderateScale(40),
  xxl: moderateScale(48),
};

export interface Theme {
  colors: ColorPalette;
  spacing: Spacing;
  fontSize: FontSize;
  borderRadius: BorderRadius;
  shadows: Shadows;
  iconSize: IconSize;
  wp: (widthPercent: number | string) => number;
  hp: (heightPercent: number | string) => number;
  scale: (size: number) => number;
  verticalScale: (size: number) => number;
  moderateScale: (size: number, factor?: number) => number;
}

export default {
  colors,
  spacing,
  fontSize,
  borderRadius,
  shadows,
  iconSize,
  wp,
  hp,
  scale,
  verticalScale,
  moderateScale,
};
