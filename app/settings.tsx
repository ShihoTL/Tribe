import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  ChevronRight,
  Bell,
  Shield,
  Wallet,
  HelpCircle,
  LogOut,
  ChevronLeft,
} from 'lucide-react-native';
import { router } from 'expo-router';
import Header from '@/components/Header';
import Colors from '@/constants/Colors';

export default function SettingsScreen() {
  const settingsGroups = [
    {
      title: 'Account',
      items: [
        {
          icon: Bell,
          label: 'Notifications',
          route: '/settings/notifications',
        },
        {
          icon: Shield,
          label: 'Privacy & Security',
          route: '/settings/privacy',
        },
        { icon: Wallet, label: 'Wallet Settings', route: '/settings/wallet' },
      ],
    },
    {
      title: 'Support',
      items: [
        { icon: HelpCircle, label: 'Help Center', route: '/settings/help' },
      ],
    },
  ];

  const handleLogout = () => {
    // Implement logout logic
    router.replace('/onboarding');
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <SafeAreaView style={styles.container} edges={['right', 'top', 'left']}>
      <Header
        title="Settings"
        leftElement={
          <TouchableOpacity onPress={handleBack} style={styles.backButton}>
            <ChevronLeft size={24} color={Colors.text.primary} />
          </TouchableOpacity>
        }
      />

      <ScrollView style={styles.content}>
        {settingsGroups.map((group, index) => (
          <View key={index} style={styles.group}>
            <Text style={styles.groupTitle}>{group.title}</Text>

            {group.items.map((item, itemIndex) => (
              <TouchableOpacity
                key={itemIndex}
                style={styles.settingItem}
                onPress={() => router.push(item.route)}
              >
                <View style={styles.settingContent}>
                  <item.icon size={20} color={Colors.text.primary} />
                  <Text style={styles.settingLabel}>{item.label}</Text>
                </View>
                <ChevronRight size={20} color={Colors.text.secondary} />
              </TouchableOpacity>
            ))}
          </View>
        ))}

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <LogOut size={20} color={Colors.error} />
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>

        <Text style={styles.version}>Version 1.0.0</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.primary,
  },
  content: {
    flex: 1,
  },
  backButton: {
    padding: 4,
  },
  group: {
    marginBottom: 24,
  },
  groupTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    color: Colors.text.secondary,
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: Colors.background.secondary,
    marginBottom: 1,
  },
  settingContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingLabel: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: Colors.text.primary,
    marginLeft: 12,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: Colors.background.secondary,
    marginTop: 24,
  },
  logoutText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: Colors.error,
    marginLeft: 12,
  },
  version: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: Colors.text.secondary,
    textAlign: 'center',
    marginTop: 24,
    marginBottom: 32,
  },
});
