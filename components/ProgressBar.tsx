import React from 'react';
import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';
import Colors from '@/constants/Colors';

type ProgressBarProps = {
  progress: number;
  style?: StyleProp<ViewStyle>;
  color?: string;
  backgroundColor?: string;
};

export default function ProgressBar({
  progress,
  style,
  color = Colors.accent.orange,
  backgroundColor = Colors.background.secondary,
}: ProgressBarProps) {
  // Ensure progress is between 0 and 1
  const safeProgress = Math.min(Math.max(progress, 0), 1);
  
  const animatedWidth = useAnimatedStyle(() => {
    return {
      width: `${withTiming(safeProgress * 100, { duration: 300 })}%`,
    };
  });

  return (
    <View style={[styles.container, { backgroundColor }, style]}>
      <Animated.View
        style={[
          styles.progressFill,
          { backgroundColor: color },
          animatedWidth,
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 6,
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
});