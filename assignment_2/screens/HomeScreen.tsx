import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Dimensions,
  ScrollView,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useTheme } from '../components/ThemeContext';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/AppNavigator';

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

interface Props {
  navigation: HomeScreenNavigationProp;
}

const { width } = Dimensions.get('window');

/**
 * HomeScreen Component
 * Dashboard with productivity navigation and animated welcome
 * Implements: Fade-in animation, Scale animation, Staggered card animations
 */
const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const { colors, fontSize } = useTheme();
  
  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.3)).current;
  const cardAnimations = useRef([
    new Animated.Value(0),
    new Animated.Value(0),
    new Animated.Value(0),
    new Animated.Value(0),
    new Animated.Value(0),
  ]).current;

  // Animate on mount
  useEffect(() => {
    // Fade in and scale header
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start();

    // Stagger card animations
    const cardStagger = cardAnimations.map((anim, index) => 
      Animated.timing(anim, {
        toValue: 1,
        duration: 500,
        delay: index * 100,
        useNativeDriver: true,
      })
    );

    Animated.stagger(100, cardStagger).start();
  }, []);

  const navigationCards = [
    {
      title: 'My Tasks',
      icon: 'check-circle' as const,
      color: '#4A90E2',
      onPress: () => navigation.navigate('MainTabs', { screen: 'Tasks' }),
    },
    {
      title: 'Study Schedule',
      icon: 'calendar' as const,
      color: '#7B68EE',
      onPress: () => navigation.navigate('MainTabs', { screen: 'Schedule' }),
    },
    {
      title: 'Quick Notes',
      icon: 'file-text' as const,
      color: '#FF6B6B',
      onPress: () => navigation.navigate('MainTabs', { screen: 'Notes' }),
    },
    {
      title: 'Study Goals',
      icon: 'trophy' as const,
      color: '#4ECDC4',
      onPress: () => navigation.navigate('MainTabs', { screen: 'Goals' }),
    },
    {
      title: 'Animation Demo',
      icon: 'star' as const,
      color: '#FFD93D',
      onPress: () => navigation.navigate('MainTabs', { screen: 'AnimationDemo' }),
    },
  ];

  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.scrollContent}
    >
      {/* Animated Header */}
      <Animated.View
        style={[
          styles.header,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        <AntDesign name="bulb" size={60} color={colors.accent} />
        <Text style={[styles.title, { color: colors.textPrimary, fontSize: fontSize.xxl }]}>
          Student Planner
        </Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary, fontSize: fontSize.md }]}>
          Stay organized, achieve your goals
        </Text>
      </Animated.View>

      {/* Navigation Cards */}
      <View style={styles.cardsContainer}>
        {navigationCards.map((card, index) => {
          const animatedOpacity = cardAnimations[index];
          const animatedTranslateY = animatedOpacity.interpolate({
            inputRange: [0, 1],
            outputRange: [50, 0],
          });

          return (
            <Animated.View
              key={card.title}
              style={{
                opacity: animatedOpacity,
                transform: [{ translateY: animatedTranslateY }],
              }}
            >
              <TouchableOpacity
                style={[
                  styles.card,
                  { backgroundColor: colors.card, borderColor: colors.border },
                ]}
                onPress={card.onPress}
                activeOpacity={0.7}
              >
                <View style={[styles.iconContainer, { backgroundColor: card.color }]}>
                  <AntDesign name={card.icon} size={32} color="#FFFFFF" />
                </View>
                <Text style={[styles.cardTitle, { color: colors.textPrimary, fontSize: fontSize.lg }]}>
                  {card.title}
                </Text>
                <AntDesign name="right" size={20} color={colors.textSecondary} />
              </TouchableOpacity>
            </Animated.View>
          );
        })}
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={[styles.footerText, { color: colors.textSecondary, fontSize: fontSize.sm }]}>
          Made with ❤️ for students
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingVertical: 20,
  },
  header: {
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  title: {
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: 10,
  },
  cardsContainer: {
    paddingHorizontal: 20,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderRadius: 15,
    marginBottom: 15,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  cardTitle: {
    flex: 1,
    fontWeight: '600',
  },
  footer: {
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 20,
  },
  footerText: {
    fontStyle: 'italic',
  },
});

export default HomeScreen;
