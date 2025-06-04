// TabBarIcon.tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, { useAnimatedStyle, withSpring } from 'react-native-reanimated';

type TabBarIconProps = {
  icon: React.ComponentType<{ size?: number; color?: string }>;
  color: string;
  size: number;
  focused?: boolean;
};

export default function TabBarIcon({ icon: IconComponent, color, size, focused }: TabBarIconProps) {
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { 
          scale: withSpring(focused ? 1.2 : 1, { 
            damping: 10, 
            stiffness: 100 
          }) 
        }
      ],
    };
  });

  if (!IconComponent) {
  console.error('IconComponent is undefined');
  return null;
}
  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <IconComponent size={size} color={color} />
      {focused && <View style={[styles.dot, { backgroundColor: color }]} />}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    marginTop: 4,
  },
});
