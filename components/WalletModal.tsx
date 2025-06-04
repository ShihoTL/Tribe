import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import { Wallet, X, ExternalLink } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import Button from './Button';

type WalletModalProps = {
  visible: boolean;
  onClose: () => void;
  onConnect: () => void;
};

export function WalletModal({ visible, onClose, onConnect }: WalletModalProps) {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <View style={styles.modalContent}>
              <View style={styles.header}>
                <Text style={styles.title}>Connect Wallet</Text>
                <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                  <X size={20} color={Colors.text.secondary} />
                </TouchableOpacity>
              </View>

              <View style={styles.walletOptions}>
                <TouchableOpacity
                  style={styles.walletOption}
                  onPress={onConnect}
                >
                  <View style={styles.walletIconContainer}>
                    <Wallet size={24} color={Colors.accent.orange} />
                  </View>
                  <View style={styles.walletInfo}>
                    <Text style={styles.walletName}>Phantom</Text>
                    <Text style={styles.walletDescription}>
                      Connect to Phantom Wallet
                    </Text>
                  </View>
                  <ExternalLink size={16} color={Colors.text.secondary} />
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.walletOption}
                  onPress={onConnect}
                >
                  <View style={styles.walletIconContainer}>
                    <Wallet size={24} color={Colors.accent.blue} />
                  </View>
                  <View style={styles.walletInfo}>
                    <Text style={styles.walletName}>Solflare</Text>
                    <Text style={styles.walletDescription}>
                      Connect to Solflare Wallet
                    </Text>
                  </View>
                  <ExternalLink size={16} color={Colors.text.secondary} />
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.walletOption}
                  onPress={onConnect}
                >
                  <View style={styles.walletIconContainer}>
                    <Wallet size={24} color="#3396FF" />
                  </View>
                  <View style={styles.walletInfo}>
                    <Text style={styles.walletName}>WalletConnect</Text>
                    <Text style={styles.walletDescription}>
                      Scan with WalletConnect
                    </Text>
                  </View>
                  <ExternalLink size={16} color={Colors.text.secondary} />
                </TouchableOpacity>
              </View>

              <View style={styles.footer}>
                <Text style={styles.footerText}>
                  By connecting, you agree to our Terms of Service
                </Text>
                <Button
                  title="Create a Wallet"
                  onPress={onConnect}
                  variant="outline"
                  style={styles.createWalletButton}
                />
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '85%',
    backgroundColor: Colors.background.primary,
    borderRadius: 16,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: Colors.text.primary,
  },
  closeButton: {
    padding: 4,
  },
  walletOptions: {
    marginBottom: 20,
  },
  walletOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background.secondary,
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
  },
  walletIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.background.tertiary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  walletInfo: {
    flex: 1,
  },
  walletName: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    color: Colors.text.primary,
  },
  walletDescription: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: Colors.text.secondary,
  },
  footer: {
    alignItems: 'center',
  },
  footerText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: Colors.text.secondary,
    textAlign: 'center',
    marginBottom: 16,
  },
  createWalletButton: {
    width: '100%',
  },
});
