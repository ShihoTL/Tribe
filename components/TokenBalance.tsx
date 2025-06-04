import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, { useAnimatedStyle, withSpring } from 'react-native-reanimated';
import Colors from '@/constants/Colors';

type TokenBalanceProps = {
  value: number;
};

export default function TokenBalance({ value }: TokenBalanceProps) {
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { scale: withSpring(1.05, { damping: 10, stiffness: 100 }) },
        { scale: withSpring(1, { damping: 10, stiffness: 100 }) }
      ],
    };
  });

  return (
    <View style={styles.container}>
      <Animated.Text style={[styles.value, animatedStyle]}>
        {value}
      </Animated.Text>
      <Text style={styles.symbol}>$VIBE</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background.secondary,
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  value: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    color: Colors.accent.orange,
    marginRight: 4,
  },
  symbol: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: Colors.text.secondary,
  },
});