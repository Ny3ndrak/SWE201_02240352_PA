import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, ViewStyle } from 'react-native';

interface FadeInViewProps {
  children: React.ReactNode;
  duration?: number;
  delay?: number;
  style?: ViewStyle;
}

/**
 * FadeInView - Reusable Animated Component
 * Automatically fades in children when mounted
 * Props:
 * - children: Content to animate
 * - duration: Animation duration in ms (default: 800)
 * - delay: Delay before animation starts in ms (default: 0)
 * - style: Additional styles
 */
export const FadeInView: React.FC<FadeInViewProps> = ({ 
  children, 
  duration = 800, 
  delay = 0,
  style 
}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration,
      delay,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim, duration, delay]);

  return (
    <Animated.View style={[style, { opacity: fadeAnim }]}>
      {children}
    </Animated.View>
  );
};

interface ScaleInViewProps {
  children: React.ReactNode;
  duration?: number;
  delay?: number;
  initialScale?: number;
  style?: ViewStyle;
}

/**
 * ScaleInView - Reusable Animated Component
 * Scales children from small to normal size when mounted
 * Props:
 * - children: Content to animate
 * - duration: Animation duration in ms (default: 600)
 * - delay: Delay before animation starts in ms (default: 0)
 * - initialScale: Starting scale value (default: 0.3)
 * - style: Additional styles
 */
export const ScaleInView: React.FC<ScaleInViewProps> = ({ 
  children, 
  duration = 600,
  delay = 0,
  initialScale = 0.3,
  style 
}) => {
  const scaleAnim = useRef(new Animated.Value(initialScale)).current;

  useEffect(() => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      tension: 50,
      friction: 7,
      delay,
      useNativeDriver: true,
    }).start();
  }, [scaleAnim, delay]);

  return (
    <Animated.View style={[style, { transform: [{ scale: scaleAnim }] }]}>
      {children}
    </Animated.View>
  );
};

interface SlideInViewProps {
  children: React.ReactNode;
  direction?: 'left' | 'right' | 'top' | 'bottom';
  duration?: number;
  delay?: number;
  distance?: number;
  style?: ViewStyle;
}

/**
 * SlideInView - Reusable Animated Component
 * Slides children in from specified direction when mounted
 * Props:
 * - children: Content to animate
 * - direction: Direction to slide from (default: 'bottom')
 * - duration: Animation duration in ms (default: 500)
 * - delay: Delay before animation starts in ms (default: 0)
 * - distance: Distance to slide from in pixels (default: 50)
 * - style: Additional styles
 */
export const SlideInView: React.FC<SlideInViewProps> = ({ 
  children, 
  direction = 'bottom',
  duration = 500,
  delay = 0,
  distance = 50,
  style 
}) => {
  const slideAnim = useRef(new Animated.Value(distance)).current;

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration,
      delay,
      useNativeDriver: true,
    }).start();
  }, [slideAnim, duration, delay]);

  const getTransform = () => {
    switch (direction) {
      case 'left':
        return [{ translateX: slideAnim.interpolate({
          inputRange: [0, distance],
          outputRange: [0, -distance],
        }) }];
      case 'right':
        return [{ translateX: slideAnim }];
      case 'top':
        return [{ translateY: slideAnim.interpolate({
          inputRange: [0, distance],
          outputRange: [0, -distance],
        }) }];
      case 'bottom':
      default:
        return [{ translateY: slideAnim }];
    }
  };

  return (
    <Animated.View style={[style, { transform: getTransform() }]}>
      {children}
    </Animated.View>
  );
};

interface PulseViewProps {
  children: React.ReactNode;
  minScale?: number;
  maxScale?: number;
  duration?: number;
  style?: ViewStyle;
}

/**
 * PulseView - Reusable Animated Component
 * Creates a continuous pulsing animation (scale up/down)
 * Props:
 * - children: Content to animate
 * - minScale: Minimum scale value (default: 1)
 * - maxScale: Maximum scale value (default: 1.1)
 * - duration: Duration of one pulse cycle in ms (default: 1000)
 * - style: Additional styles
 */
export const PulseView: React.FC<PulseViewProps> = ({ 
  children, 
  minScale = 1,
  maxScale = 1.1,
  duration = 1000,
  style 
}) => {
  const pulseAnim = useRef(new Animated.Value(minScale)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: maxScale,
          duration,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: minScale,
          duration,
          useNativeDriver: true,
        }),
      ])
    );
    animation.start();
    return () => animation.stop();
  }, [pulseAnim, minScale, maxScale, duration]);

  return (
    <Animated.View style={[style, { transform: [{ scale: pulseAnim }] }]}>
      {children}
    </Animated.View>
  );
};

interface BounceButtonProps {
  onPress: () => void;
  children: React.ReactNode;
  style?: ViewStyle;
}

/**
 * BounceButton - Reusable Animated Component
 * Button that bounces when pressed
 * Props:
 * - onPress: Function to call when pressed
 * - children: Button content
 * - style: Additional styles
 */
export const BounceButton: React.FC<BounceButtonProps> = ({ 
  onPress, 
  children, 
  style 
}) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start(() => {
      onPress();
    });
  };

  return (
    <Animated.View 
      style={[style, { transform: [{ scale: scaleAnim }] }]}
      onTouchStart={handlePressIn}
      onTouchEnd={handlePressOut}
    >
      {children}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  // No styles needed for these generic components
});
