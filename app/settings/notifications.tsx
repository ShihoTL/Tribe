import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft } from 'lucide-react-native';
import { router } from 'expo-router';
import Colors from '@/constants/Colors';

export default function NotificationsScreen() {
  const [settings, setSettings] = useState({
    questUpdates: true,
    tribeActivity: true,
    rewards: true,
    mentions: true,
    directMessages: true,
    marketingEmails: false,
  });

  const toggleSetting = (key: keyof typeof settings) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <SafeAreaView style={styles.container} edges={['right', 'top', 'left']}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <ChevronLeft size={24} color={Colors.text.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notifications</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quest Notifications</Text>

          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingTitle}>Quest Updates</Text>
              <Text style={styles.settingDescription}>
                Get notified about quest progress and completion
              </Text>
            </View>
            <Switch
              value={settings.questUpdates}
              onValueChange={() => toggleSetting('questUpdates')}
              trackColor={{
                false: Colors.background.tertiary,
                true: Colors.accent.orange + '50',
              }}
              thumbColor={
                settings.questUpdates
                  ? Colors.accent.orange
                  : Colors.text.secondary
              }
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Tribe Notifications</Text>

          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingTitle}>Tribe Activity</Text>
              <Text style={styles.settingDescription}>
                Updates about your tribes' activities and announcements
              </Text>
            </View>
            <Switch
              value={settings.tribeActivity}
              onValueChange={() => toggleSetting('tribeActivity')}
              trackColor={{
                false: Colors.background.tertiary,
                true: Colors.accent.orange + '50',
              }}
              thumbColor={
                settings.tribeActivity
                  ? Colors.accent.orange
                  : Colors.text.secondary
              }
            />
          </View>

          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingTitle}>Rewards</Text>
              <Text style={styles.settingDescription}>
                Notifications about earned rewards and tokens
              </Text>
            </View>
            <Switch
              value={settings.rewards}
              onValueChange={() => toggleSetting('rewards')}
              trackColor={{
                false: Colors.background.tertiary,
                true: Colors.accent.orange + '50',
              }}
              thumbColor={
                settings.rewards ? Colors.accent.orange : Colors.text.secondary
              }
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Social Notifications</Text>

          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingTitle}>Mentions</Text>
              <Text style={styles.settingDescription}>
                When someone mentions you in a comment or post
              </Text>
            </View>
            <Switch
              value={settings.mentions}
              onValueChange={() => toggleSetting('mentions')}
              trackColor={{
                false: Colors.background.tertiary,
                true: Colors.accent.orange + '50',
              }}
              thumbColor={
                settings.mentions ? Colors.accent.orange : Colors.text.secondary
              }
            />
          </View>

          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingTitle}>Direct Messages</Text>
              <Text style={styles.settingDescription}>
                When you receive a direct message
              </Text>
            </View>
            <Switch
              value={settings.directMessages}
              onValueChange={() => toggleSetting('directMessages')}
              trackColor={{
                false: Colors.background.tertiary,
                true: Colors.accent.orange + '50',
              }}
              thumbColor={
                settings.directMessages
                  ? Colors.accent.orange
                  : Colors.text.secondary
              }
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Email Notifications</Text>

          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingTitle}>Marketing Emails</Text>
              <Text style={styles.settingDescription}>
                Receive updates about new features and promotions
              </Text>
            </View>
            <Switch
              value={settings.marketingEmails}
              onValueChange={() => toggleSetting('marketingEmails')}
              trackColor={{
                false: Colors.background.tertiary,
                true: Colors.accent.orange + '50',
              }}
              thumbColor={
                settings.marketingEmails
                  ? Colors.accent.orange
                  : Colors.text.secondary
              }
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.primary,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.background.secondary,
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: Colors.text.primary,
  },
  placeholder: {
    width: 32,
  },
  content: {
    flex: 1,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    color: Colors.text.secondary,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.background.secondary,
    paddingVertical: 16,
    paddingHorizontal: 16,
    marginBottom: 1,
  },
  settingInfo: {
    flex: 1,
    marginRight: 16,
  },
  settingTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: Colors.text.primary,
    marginBottom: 4,
  },
  settingDescription: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: Colors.text.secondary,
  },
});
