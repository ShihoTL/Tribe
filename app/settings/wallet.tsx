import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  ChevronLeft,
  Copy,
  ExternalLink,
  Shield,
  Key,
} from 'lucide-react-native';
import { router } from 'expo-router';
import Colors from '@/constants/Colors';
import Button from '@/components/Button';

export default function WalletSettingsScreen() {
  const walletAddress = '8xzt...3Fgh';
  const connectedWallet = 'Phantom';

  const handleDisconnect = () => {
    // Implement wallet disconnect logic
    router.back();
  };

  const handleCopyAddress = () => {
    // Implement copy to clipboard
  };

  const handleViewExplorer = () => {
    // Open in blockchain explorer
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
        <Text style={styles.headerTitle}>Wallet Settings</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.walletCard}>
          <View style={styles.walletHeader}>
            <Image
              source={{
                uri: 'https://images.pexels.com/photos/7567434/pexels-photo-7567434.jpeg',
              }}
              style={styles.walletIcon}
            />
            <View style={styles.walletInfo}>
              <Text style={styles.walletName}>{connectedWallet}</Text>
              <Text style={styles.walletStatus}>Connected</Text>
            </View>
          </View>

          <View style={styles.addressContainer}>
            <Text style={styles.addressLabel}>Wallet Address</Text>
            <View style={styles.addressActions}>
              <Text style={styles.address}>{walletAddress}</Text>
              <TouchableOpacity
                onPress={handleCopyAddress}
                style={styles.actionButton}
              >
                <Copy size={16} color={Colors.text.secondary} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleViewExplorer}
                style={styles.actionButton}
              >
                <ExternalLink size={16} color={Colors.text.secondary} />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Security</Text>

          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingIcon}>
              <Shield size={20} color={Colors.accent.orange} />
            </View>
            <View style={styles.settingInfo}>
              <Text style={styles.settingTitle}>Transaction Signing</Text>
              <Text style={styles.settingDescription}>
                Manage transaction approval settings
              </Text>
            </View>
            <ChevronLeft
              size={20}
              color={Colors.text.secondary}
              style={styles.chevron}
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingIcon}>
              <Key size={20} color={Colors.accent.blue} />
            </View>
            <View style={styles.settingInfo}>
              <Text style={styles.settingTitle}>Recovery Phrase</Text>
              <Text style={styles.settingDescription}>
                View your secret recovery phrase
              </Text>
            </View>
            <ChevronLeft
              size={20}
              color={Colors.text.secondary}
              style={styles.chevron}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.disconnectContainer}>
          <Button
            title="Disconnect Wallet"
            onPress={handleDisconnect}
            variant="outline"
            style={styles.disconnectButton}
          />
          <Text style={styles.disconnectNote}>
            You can always reconnect your wallet later
          </Text>
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
  walletCard: {
    margin: 16,
    padding: 16,
    backgroundColor: Colors.background.secondary,
    borderRadius: 12,
  },
  walletHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  walletIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  walletInfo: {
    flex: 1,
  },
  walletName: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: Colors.text.primary,
  },
  walletStatus: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: Colors.success,
  },
  addressContainer: {
    backgroundColor: Colors.background.tertiary,
    borderRadius: 8,
    padding: 12,
  },
  addressLabel: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: Colors.text.secondary,
    marginBottom: 4,
  },
  addressActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  address: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    color: Colors.text.primary,
    flex: 1,
  },
  actionButton: {
    padding: 4,
    marginLeft: 8,
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
    backgroundColor: Colors.background.secondary,
    paddingVertical: 16,
    paddingHorizontal: 16,
    marginBottom: 1,
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
  chevron: {
    transform: [{ rotate: '180deg' }],
  },
  disconnectContainer: {
    padding: 16,
  },
  disconnectButton: {
    marginBottom: 8,
  },
  disconnectNote: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: Colors.text.secondary,
    textAlign: 'center',
  },
});
