import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Animated,
  PanResponder,
  Dimensions,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useTheme } from '../components/ThemeContext';

const { width } = Dimensions.get('window');

/**
 * AnimationDemoScreen Component
 * Demonstrates various animations and gesture interactions
 * Implements: 
 * - Fade animation
 * - Scale/Bounce animation
 * - Slide animation
 * - Rotation animation
 * - Drag gesture (PanResponder)
 * - Progress animation
 */
const AnimationDemoScreen: React.FC = () => {
  const { colors, fontSize } = useTheme();

  // Animation refs
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const slideAnim = useRef(new Animated.Value(0)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const progressAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  // Draggable element
  const pan = useRef(new Animated.ValueXY()).current;
  const [isDragging, setIsDragging] = useState(false);
  const [isFaded, setIsFaded] = useState(false);

  // Pan Responder for drag gesture
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        setIsDragging(true);
        pan.setOffset({
          x: (pan.x as any)._value,
          y: (pan.y as any)._value,
        });
      },
      onPanResponderMove: Animated.event(
        [null, { dx: pan.x, dy: pan.y }],
        { useNativeDriver: false }
      ),
      onPanResponderRelease: () => {
        setIsDragging(false);
        pan.flattenOffset();
        // Bounce back animation
        Animated.spring(pan, {
          toValue: { x: 0, y: 0 },
          friction: 5,
          tension: 40,
          useNativeDriver: false,
        }).start();
      },
    })
  ).current;

  // Animation functions
  const handleFadeToggle = () => {
    const newValue = isFaded ? 1 : 0.2;
    setIsFaded(!isFaded);
    Animated.timing(fadeAnim, {
      toValue: newValue,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const handleBounce = () => {
    Animated.sequence([
      Animated.spring(scaleAnim, {
        toValue: 1.5,
        friction: 3,
        tension: 40,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 3,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handleSlide = () => {
    Animated.sequence([
      Animated.timing(slideAnim, {
        toValue: width - 150,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handleRotate = () => {
    Animated.sequence([
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(rotateAnim, {
        toValue: 0,
        duration: 0,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handleProgress = () => {
    progressAnim.setValue(0);
    Animated.timing(progressAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: false,
    }).start();
  };

  // Continuous pulse animation
  React.useEffect(() => {
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.2,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    );
    pulse.start();
    return () => pulse.stop();
  }, []);

  // Interpolations
  const rotation = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const progressWidth = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  const progressColor = progressAnim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: ['#FF6B6B', '#FFD93D', '#4ECDC4'],
  });

  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.scrollContent}
    >
      {/* Header */}
      <View style={styles.header}>
        <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
          <AntDesign name="star" size={50} color={colors.accent} />
        </Animated.View>
        <Text style={[styles.title, { color: colors.textPrimary, fontSize: fontSize.xxl }]}>
          Animation Gallery
        </Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary, fontSize: fontSize.sm }]}>
          Tap buttons to see animations in action
        </Text>
      </View>

      {/* Fade Animation */}
      <View style={[styles.demoSection, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <Text style={[styles.demoTitle, { color: colors.textPrimary, fontSize: fontSize.lg }]}>
          Fade In/Out
        </Text>
        <Text style={[styles.demoDescription, { color: colors.textSecondary, fontSize: fontSize.sm }]}>
          Smooth opacity transition
        </Text>
        <Animated.View style={[styles.demoBox, { backgroundColor: '#4A90E2', opacity: fadeAnim }]}>
          <AntDesign name="star" size={40} color="#FFFFFF" />
        </Animated.View>
        <TouchableOpacity 
          style={[styles.button, { backgroundColor: colors.primary }]}
          onPress={handleFadeToggle}
        >
          <Text style={[styles.buttonText, { fontSize: fontSize.md }]}>Toggle Fade</Text>
        </TouchableOpacity>
      </View>

      {/* Scale/Bounce Animation */}
      <View style={[styles.demoSection, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <Text style={[styles.demoTitle, { color: colors.textPrimary, fontSize: fontSize.lg }]}>
          Scale & Bounce
        </Text>
        <Text style={[styles.demoDescription, { color: colors.textSecondary, fontSize: fontSize.sm }]}>
          Spring-based scale animation
        </Text>
        <Animated.View 
          style={[
            styles.demoBox, 
            { backgroundColor: '#7B68EE', transform: [{ scale: scaleAnim }] }
          ]}
        >
          <AntDesign name="heart" size={40} color="#FFFFFF" />
        </Animated.View>
        <TouchableOpacity 
          style={[styles.button, { backgroundColor: colors.primary }]}
          onPress={handleBounce}
        >
          <Text style={[styles.buttonText, { fontSize: fontSize.md }]}>Bounce</Text>
        </TouchableOpacity>
      </View>

      {/* Slide Animation */}
      <View style={[styles.demoSection, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <Text style={[styles.demoTitle, { color: colors.textPrimary, fontSize: fontSize.lg }]}>
          Slide Animation
        </Text>
        <Text style={[styles.demoDescription, { color: colors.textSecondary, fontSize: fontSize.sm }]}>
          Horizontal movement with return
        </Text>
        <View style={styles.slideContainer}>
          <Animated.View 
            style={[
              styles.demoBox, 
              { backgroundColor: '#FF6B6B', transform: [{ translateX: slideAnim }] }
            ]}
          >
            <AntDesign name="rocket" size={40} color="#FFFFFF" />
          </Animated.View>
        </View>
        <TouchableOpacity 
          style={[styles.button, { backgroundColor: colors.primary }]}
          onPress={handleSlide}
        >
          <Text style={[styles.buttonText, { fontSize: fontSize.md }]}>Slide</Text>
        </TouchableOpacity>
      </View>

      {/* Rotation Animation */}
      <View style={[styles.demoSection, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <Text style={[styles.demoTitle, { color: colors.textPrimary, fontSize: fontSize.lg }]}>
          Rotation
        </Text>
        <Text style={[styles.demoDescription, { color: colors.textSecondary, fontSize: fontSize.sm }]}>
          360-degree rotation animation
        </Text>
        <Animated.View 
          style={[
            styles.demoBox, 
            { backgroundColor: '#4ECDC4', transform: [{ rotate: rotation }] }
          ]}
        >
          <AntDesign name="sync" size={40} color="#FFFFFF" />
        </Animated.View>
        <TouchableOpacity 
          style={[styles.button, { backgroundColor: colors.primary }]}
          onPress={handleRotate}
        >
          <Text style={[styles.buttonText, { fontSize: fontSize.md }]}>Rotate</Text>
        </TouchableOpacity>
      </View>

      {/* Progress Animation */}
      <View style={[styles.demoSection, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <Text style={[styles.demoTitle, { color: colors.textPrimary, fontSize: fontSize.lg }]}>
          Progress Bar
        </Text>
        <Text style={[styles.demoDescription, { color: colors.textSecondary, fontSize: fontSize.sm }]}>
          Animated loading indicator with color change
        </Text>
        <View style={[styles.progressContainer, { backgroundColor: colors.border }]}>
          <Animated.View 
            style={[
              styles.progressBar,
              { 
                width: progressWidth,
                backgroundColor: progressColor,
              }
            ]}
          />
        </View>
        <TouchableOpacity 
          style={[styles.button, { backgroundColor: colors.primary }]}
          onPress={handleProgress}
        >
          <Text style={[styles.buttonText, { fontSize: fontSize.md }]}>Start Progress</Text>
        </TouchableOpacity>
      </View>

      {/* Drag Gesture */}
      <View style={[styles.demoSection, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <Text style={[styles.demoTitle, { color: colors.textPrimary, fontSize: fontSize.lg }]}>
          Drag Gesture
        </Text>
        <Text style={[styles.demoDescription, { color: colors.textSecondary, fontSize: fontSize.sm }]}>
          Drag the element around (it bounces back!)
        </Text>
        <View style={styles.dragArea}>
          <Animated.View
            style={[
              styles.draggable,
              {
                transform: pan.getTranslateTransform(),
                backgroundColor: isDragging ? colors.accent : '#FFD93D',
                elevation: isDragging ? 10 : 5,
              },
            ]}
            {...panResponder.panHandlers}
          >
            <AntDesign name="arrows-alt" size={40} color="#FFFFFF" />
          </Animated.View>
        </View>
        <Text style={[styles.gestureHint, { color: colors.textSecondary, fontSize: fontSize.xs }]}>
          👆 Touch and drag the element above
        </Text>
      </View>

      {/* Info Footer */}
      <View style={styles.footer}>
        <AntDesign name="info-circle" size={20} color={colors.accent} />
        <Text style={[styles.footerText, { color: colors.textSecondary, fontSize: fontSize.sm }]}>
          All animations use React Native Animated API
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
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  title: {
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
  },
  subtitle: {
    textAlign: 'center',
  },
  demoSection: {
    marginHorizontal: 15,
    marginBottom: 20,
    padding: 20,
    borderRadius: 15,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  demoTitle: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  demoDescription: {
    marginBottom: 15,
  },
  demoBox: {
    width: 100,
    height: 100,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginVertical: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  slideContainer: {
    width: '100%',
    alignItems: 'flex-start',
  },
  button: {
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  progressContainer: {
    height: 30,
    borderRadius: 15,
    overflow: 'hidden',
    marginVertical: 20,
  },
  progressBar: {
    height: '100%',
    borderRadius: 15,
  },
  dragArea: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  draggable: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  gestureHint: {
    textAlign: 'center',
    fontStyle: 'italic',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  footerText: {
    marginLeft: 8,
    textAlign: 'center',
  },
});

export default AnimationDemoScreen;
