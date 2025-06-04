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
import { ChevronLeft, Key, Shield, Eye, Lock } from 'lucide-react-native';
import { router } from 'expo-router';
import Colors from '@/constants/Colors';
import Button from '@/components/Button';

export default function PrivacyScreen() {
  const [settings, setSettings] = useState({
    twoFactor: false,
    publicProfile: true,
    activityVisible: true,
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
        <Text style={styles.headerTitle}>Privacy & Security</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Security</Text>

          <TouchableOpacity style={styles.settingButton}>
            <View style={styles.settingIcon}>
              <Key size={20} color={Colors.accent.orange} />
            </View>
            <View style={styles.settingInfo}>
              <Text style={styles.settingTitle}>Change Password</Text>
              <Text style={styles.settingDescription}>
                Update your account password
              </Text>
            </View>
          </TouchableOpacity>

          <View style={styles.settingItem}>
            <View style={styles.settingContent}>
              <View style={styles.settingIcon}>
                <Shield size={20} color={Colors.accent.blue} />
              </View>
              <View style={styles.settingInfo}>
                <Text style={styles.settingTitle}>
                  Two-Factor Authentication
                </Text>
                <Text style={styles.settingDescription}>
                  Add an extra layer of security
                </Text>
              </View>
            </View>
            <Switch
              value={settings.twoFactor}
              onValueChange={() => toggleSetting('twoFactor')}
              trackColor={{
                false: Colors.background.tertiary,
                true: Colors.accent.orange + '50',
              }}
              thumbColor={
                settings.twoFactor
                  ? Colors.accent.orange
                  : Colors.text.secondary
              }
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Privacy</Text>

          <View style={styles.settingItem}>
            <View style={styles.settingContent}>
              <View style={styles.settingIcon}>
                <Eye size={20} color={Colors.accent.orange} />
              </View>
              <View style={styles.settingInfo}>
                <Text style={styles.settingTitle}>Public Profile</Text>
                <Text style={styles.settingDescription}>
                  Allow others to view your profile
                </Text>
              </View>
            </View>
            <Switch
              value={settings.publicProfile}
              onValueChange={() => toggleSetting('publicProfile')}
              trackColor={{
                false: Colors.background.tertiary,
                true: Colors.accent.orange + '50',
              }}
              thumbColor={
                settings.publicProfile
                  ? Colors.accent.orange
                  : Colors.text.secondary
              }
            />
          </View>

          <View style={styles.settingItem}>
            <View style={styles.settingContent}>
              <View style={styles.settingIcon}>
                <Lock size={20} color={Colors.accent.blue} />
              </View>
              <View style={styles.settingInfo}>
                <Text style={styles.settingTitle}>Activity Visibility</Text>
                <Text style={styles.settingDescription}>
                  Show your activity to other users
                </Text>
              </View>
            </View>
            <Switch
              value={settings.activityVisible}
              onValueChange={() => toggleSetting('activityVisible')}
              trackColor={{
                false: Colors.background.tertiary,
                true: Colors.accent.orange + '50',
              }}
              thumbColor={
                settings.activityVisible
                  ? Colors.accent.orange
                  : Colors.text.secondary
              }
            />
          </View>
        </View>

        <View style={styles.dangerZone}>
          <Text style={styles.dangerTitle}>Danger Zone</Text>
          <Text style={styles.dangerDescription}>
            These actions are permanent and cannot be undone
          </Text>

          <Button
            title="Delete Account"
            onPress={() => {}}
            style={styles.deleteButton}
            textStyle={styles.deleteButtonText}
            variant="outline"
          />
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
  settingButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background.secondary,
    paddingVertical: 16,
    paddingHorizontal: 16,
    marginBottom: 1,
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
  settingContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.background.tertiary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
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
  dangerZone: {
    margin: 16,
    padding: 16,
    backgroundColor: Colors.background.secondary,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.error + '40',
  },
  dangerTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: Colors.error,
    marginBottom: 8,
  },
  dangerDescription: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: Colors.text.secondary,
    marginBottom: 16,
  },
  deleteButton: {
    backgroundColor: 'transparent',
    borderColor: Colors.error,
  },
  deleteButtonText: {
    color: Colors.error,
  },
});
