import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Colors from '@/constants/Colors';

export default function LoadingScreen() {
  return (
    <LinearGradient
      colors={[Colors.background.primary, Colors.gradient.dark]}
      style={styles.container}
    >
      <View style={styles.content}>
        <Text style={styles.title}>TribeVibe</Text>
        <Text style={styles.subtitle}>Unite, Quest, Earn in Web3!</Text>
        <ActivityIndicator 
          size="large" 
          color={Colors.accent.orange} 
          style={styles.loader}
        />
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: 32,
    color: Colors.text.primary,
  },
  subtitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: Colors.text.secondary,
    marginTop: 8,
    marginBottom: 32,
  },
  loader: {
    marginTop: 16,
  },
});