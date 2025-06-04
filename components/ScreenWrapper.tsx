import React, { ReactNode } from 'react';
import { View, StyleSheet, Platform, StatusBar } from 'react-native';
import Colors from '@/constants/Colors';

type ScreenWrapperProps = {
  children: ReactNode;
  style?: any;
};

export default function ScreenWrapper({ children, style }: ScreenWrapperProps) {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.content}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.primary,
    paddingTop: Platform.OS === 'ios' ? 47 : StatusBar.currentHeight,
  },
  content: {
    flex: 1,
  },
});
