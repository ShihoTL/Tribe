import React, { ReactNode } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Colors from '@/constants/Colors';

type HeaderProps = {
  title: string;
  leftElement?: ReactNode;
  rightElement?: ReactNode;
};

export default function Header({
  title,
  leftElement,
  rightElement,
}: HeaderProps) {
  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>{leftElement}</View>

      <Text style={styles.title}>{title}</Text>

      <View style={styles.rightContainer}>{rightElement}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.background.secondary,
  },
  leftContainer: {
    width: 40,
    alignItems: 'flex-start',
  },
  title: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 20,
    color: Colors.text.primary,
  },
  rightContainer: {
    width: 40,
    alignItems: 'flex-end',
  },
});
