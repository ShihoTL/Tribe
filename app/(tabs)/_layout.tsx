import { View, StyleSheet } from 'react-native';
import { Slot } from 'expo-router';
import TabBar from '@/components/TabBar';
import Colors from '@/constants/Colors';

export default function TabLayout() {
  return (
    <View style={styles.container}>
      <Slot />
      <TabBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.primary,
  },
});
