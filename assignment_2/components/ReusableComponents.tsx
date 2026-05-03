import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ViewStyle, TextStyle } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useTheme } from './ThemeContext';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  onPress?: () => void;
}

/**
 * Card - Reusable Component
 * A styled card container with consistent styling
 * Props:
 * - children: Content to display in card
 * - style: Additional styles
 * - onPress: Optional onPress handler (makes card touchable)
 */
export const Card: React.FC<CardProps> = ({ children, style, onPress }) => {
  const { colors } = useTheme();

  const cardStyle = [
    styles.card,
    { backgroundColor: colors.card, borderColor: colors.border },
    style,
  ];

  if (onPress) {
    return (
      <TouchableOpacity style={cardStyle} onPress={onPress} activeOpacity={0.7}>
        {children}
      </TouchableOpacity>
    );
  }

  return <View style={cardStyle}>{children}</View>;
};

interface IconCardProps {
  icon: keyof typeof AntDesign.glyphMap;
  title: string;
  description?: string;
  iconColor?: string;
  onPress?: () => void;
  style?: ViewStyle;
}

/**
 * IconCard - Reusable Component
 * Card with icon, title, and optional description
 * Props:
 * - icon: AntDesign icon name
 * - title: Card title
 * - description: Optional description text
 * - iconColor: Color for the icon (default: theme accent)
 * - onPress: Optional onPress handler
 * - style: Additional styles
 */
export const IconCard: React.FC<IconCardProps> = ({
  icon,
  title,
  description,
  iconColor,
  onPress,
  style,
}) => {
  const { colors, fontSize } = useTheme();

  return (
    <Card style={style} onPress={onPress}>
      <View style={styles.iconCardContent}>
        <View style={[styles.iconContainer, { backgroundColor: iconColor || colors.accent }]}>
          <AntDesign name={icon} size={28} color="#FFFFFF" />
        </View>
        <View style={styles.textContainer}>
          <Text style={[styles.cardTitle, { color: colors.textPrimary, fontSize: fontSize.md }]}>
            {title}
          </Text>
          {description && (
            <Text style={[styles.cardDescription, { color: colors.textSecondary, fontSize: fontSize.sm }]}>
              {description}
            </Text>
          )}
        </View>
        {onPress && (
          <AntDesign name="right" size={20} color={colors.textSecondary} />
        )}
      </View>
    </Card>
  );
};

interface BadgeProps {
  text: string;
  color?: string;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

/**
 * Badge - Reusable Component
 * Small colored label for categorization
 * Props:
 * - text: Badge text
 * - color: Background color (default: theme primary)
 * - style: Additional container styles
 * - textStyle: Additional text styles
 */
export const Badge: React.FC<BadgeProps> = ({ text, color, style, textStyle }) => {
  const { colors, fontSize } = useTheme();

  return (
    <View style={[styles.badge, { backgroundColor: color || colors.primary }, style]}>
      <Text style={[styles.badgeText, { fontSize: fontSize.xs }, textStyle]}>
        {text}
      </Text>
    </View>
  );
};

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  icon?: keyof typeof AntDesign.glyphMap;
  rightAction?: {
    text: string;
    onPress: () => void;
  };
}

/**
 * SectionHeader - Reusable Component
 * Styled section header with optional icon and action
 * Props:
 * - title: Section title
 * - subtitle: Optional subtitle text
 * - icon: Optional AntDesign icon
 * - rightAction: Optional action button on right side
 */
export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  subtitle,
  icon,
  rightAction,
}) => {
  const { colors, fontSize } = useTheme();

  return (
    <View style={styles.sectionHeader}>
      <View style={styles.sectionHeaderLeft}>
        {icon && (
          <AntDesign name={icon} size={24} color={colors.accent} style={styles.sectionIcon} />
        )}
        <View>
          <Text style={[styles.sectionTitle, { color: colors.textPrimary, fontSize: fontSize.lg }]}>
            {title}
          </Text>
          {subtitle && (
            <Text style={[styles.sectionSubtitle, { color: colors.textSecondary, fontSize: fontSize.sm }]}>
              {subtitle}
            </Text>
          )}
        </View>
      </View>
      {rightAction && (
        <TouchableOpacity onPress={rightAction.onPress}>
          <Text style={[styles.actionText, { color: colors.accent, fontSize: fontSize.sm }]}>
            {rightAction.text}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

interface EmptyStateProps {
  icon: keyof typeof AntDesign.glyphMap;
  title: string;
  description?: string;
  actionText?: string;
  onAction?: () => void;
}

/**
 * EmptyState - Reusable Component
 * Display when there's no content to show
 * Props:
 * - icon: AntDesign icon name
 * - title: Empty state title
 * - description: Optional description text
 * - actionText: Optional action button text
 * - onAction: Optional action button handler
 */
export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  actionText,
  onAction,
}) => {
  const { colors, fontSize } = useTheme();

  return (
    <View style={styles.emptyState}>
      <AntDesign name={icon} size={60} color={colors.textSecondary} />
      <Text style={[styles.emptyTitle, { color: colors.textPrimary, fontSize: fontSize.lg }]}>
        {title}
      </Text>
      {description && (
        <Text style={[styles.emptyDescription, { color: colors.textSecondary, fontSize: fontSize.sm }]}>
          {description}
        </Text>
      )}
      {actionText && onAction && (
        <TouchableOpacity 
          style={[styles.emptyAction, { backgroundColor: colors.primary }]}
          onPress={onAction}
        >
          <Text style={[styles.emptyActionText, { fontSize: fontSize.md }]}>
            {actionText}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    marginBottom: 12,
  },
  iconCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  cardTitle: {
    fontWeight: '600',
    marginBottom: 4,
  },
  cardDescription: {
    lineHeight: 18,
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  badgeText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  sectionIcon: {
    marginRight: 10,
  },
  sectionTitle: {
    fontWeight: 'bold',
  },
  sectionSubtitle: {
    marginTop: 2,
  },
  actionText: {
    fontWeight: '600',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
    paddingHorizontal: 40,
  },
  emptyTitle: {
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 8,
    textAlign: 'center',
  },
  emptyDescription: {
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 20,
  },
  emptyAction: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  emptyActionText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
});
