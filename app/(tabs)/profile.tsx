import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Settings,
  CreditCard as Edit,
  Award,
  Image as ImageIcon,
  CreditCard,
} from 'lucide-react-native';
import { router } from 'expo-router';
import Header from '@/components/Header';
import Colors from '@/constants/Colors';
import TokenBalance from '@/components/TokenBalance';
import ProgressBar from '@/components/ProgressBar';
import Button from '@/components/Button';

export default function ProfileScreen() {
  const [activeTab, setActiveTab] = useState('nfts');

  // Dummy user data
  const user = {
    name: 'CryptoVibeMaster',
    walletAddress: '8xzt...3Fgh',
    avatarUrl:
      'https://images.pexels.com/photos/7567434/pexels-photo-7567434.jpeg',
    coverUrl:
      'https://images.pexels.com/photos/3913025/pexels-photo-3913025.jpeg',
    level: 4,
    xp: 780,
    nextLevelXp: 1000,
    stats: {
      questsCompleted: 12,
      vibeEarned: 850,
      tribesJoined: 3,
      nftsOwned: 5,
    },
  };

  // Dummy NFT data
  const nfts = [
    {
      id: '1',
      name: 'Tribe Champion',
      imageUrl:
        'https://images.pexels.com/photos/3889742/pexels-photo-3889742.jpeg',
      rarity: 'Rare',
    },
    {
      id: '2',
      name: 'Quest Master',
      imageUrl:
        'https://images.pexels.com/photos/4100130/pexels-photo-4100130.jpeg',
      rarity: 'Epic',
    },
    {
      id: '3',
      name: 'Early Adopter',
      imageUrl:
        'https://images.pexels.com/photos/3913025/pexels-photo-3913025.jpeg',
      rarity: 'Common',
    },
    {
      id: '4',
      name: 'Solana Builder',
      imageUrl:
        'https://images.pexels.com/photos/3116372/pexels-photo-3116372.jpeg',
      rarity: 'Legendary',
    },
  ];

  // Dummy transaction data
  const transactions = [
    {
      id: '1',
      type: 'reward',
      amount: 50,
      description: 'Quest Completion: Design a Tribe Logo',
      date: '2 days ago',
    },
    {
      id: '2',
      type: 'tip',
      amount: 25,
      description: 'Tip from DevNinja',
      date: '3 days ago',
    },
    {
      id: '3',
      type: 'purchase',
      amount: -100,
      description: 'NFT Purchase: Tribe Champion',
      date: '1 week ago',
    },
    {
      id: '4',
      type: 'reward',
      amount: 75,
      description: 'Quest Completion: Host Community Call',
      date: '2 weeks ago',
    },
  ];

  const handleSettingsPress = () => {
    router.push('/settings');
  };

  const handleEditProfile = () => {
    // Implement edit profile logic
  };

  return (
    <ScreenWrapper>
      <Header
        title="Profile"
        rightElement={
          <TouchableOpacity onPress={handleSettingsPress}>
            <Settings size={24} color={Colors.text.primary} />
          </TouchableOpacity>
        }
      />

      <ScrollView
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.coverContainer}>
          <Image source={{ uri: user.coverUrl }} style={styles.coverImage} />
          <View style={styles.avatarContainer}>
            <Image
              source={{ uri: user.avatarUrl }}
              style={styles.avatarImage}
            />
            <TouchableOpacity
              style={styles.editAvatarButton}
              onPress={handleEditProfile}
            >
              <Edit size={16} color={Colors.text.primary} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.profileInfoContainer}>
          <Text style={styles.userName}>{user.name}</Text>
          <View style={styles.walletContainer}>
            <Text style={styles.walletAddress}>{user.walletAddress}</Text>
            <TouchableOpacity style={styles.copyButton}>
              <Text style={styles.copyText}>Copy</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.levelContainer}>
            <View style={styles.levelTextContainer}>
              <Text style={styles.levelLabel}>Level {user.level}</Text>
              <Text style={styles.xpText}>
                {user.xp} / {user.nextLevelXp} XP
              </Text>
            </View>
            <ProgressBar
              progress={user.xp / user.nextLevelXp}
              style={styles.levelProgressBar}
            />
          </View>

          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{user.stats.questsCompleted}</Text>
              <Text style={styles.statLabel}>Quests</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{user.stats.vibeEarned}</Text>
              <Text style={styles.statLabel}>$VIBE</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{user.stats.tribesJoined}</Text>
              <Text style={styles.statLabel}>Tribes</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{user.stats.nftsOwned}</Text>
              <Text style={styles.statLabel}>NFTs</Text>
            </View>
          </View>
        </View>

        <View style={styles.tabsContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'nfts' && styles.activeTab]}
            onPress={() => setActiveTab('nfts')}
          >
            <ImageIcon
              size={18}
              color={
                activeTab === 'nfts'
                  ? Colors.accent.orange
                  : Colors.text.secondary
              }
              style={styles.tabIcon}
            />
            <Text
              style={[
                styles.tabText,
                activeTab === 'nfts' && styles.activeTabText,
              ]}
            >
              NFTs
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tab, activeTab === 'rewards' && styles.activeTab]}
            onPress={() => setActiveTab('rewards')}
          >
            <CreditCard
              size={18}
              color={
                activeTab === 'rewards'
                  ? Colors.accent.orange
                  : Colors.text.secondary
              }
              style={styles.tabIcon}
            />
            <Text
              style={[
                styles.tabText,
                activeTab === 'rewards' && styles.activeTabText,
              ]}
            >
              Rewards
            </Text>
          </TouchableOpacity>
        </View>

        {activeTab === 'nfts' ? (
          <View style={styles.nftsContainer}>
            {nfts.map((nft) => (
              <View key={nft.id} style={styles.nftCard}>
                <Image source={{ uri: nft.imageUrl }} style={styles.nftImage} />
                <View style={styles.nftInfo}>
                  <Text style={styles.nftName}>{nft.name}</Text>
                  <View
                    style={[
                      styles.rarityBadge,
                      nft.rarity === 'Common' && styles.commonBadge,
                      nft.rarity === 'Rare' && styles.rareBadge,
                      nft.rarity === 'Epic' && styles.epicBadge,
                      nft.rarity === 'Legendary' && styles.legendaryBadge,
                    ]}
                  >
                    <Text style={styles.rarityText}>{nft.rarity}</Text>
                  </View>
                </View>
              </View>
            ))}

            <TouchableOpacity style={styles.mintNftButton}>
              <View style={styles.mintNftContent}>
                <Award size={24} color={Colors.accent.orange} />
                <Text style={styles.mintNftText}>Mint New Badge</Text>
              </View>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.transactionsContainer}>
            {transactions.map((transaction) => (
              <View key={transaction.id} style={styles.transactionItem}>
                <View style={styles.transactionIconContainer}>
                  {transaction.type === 'reward' && (
                    <Award size={20} color={Colors.success} />
                  )}
                  {transaction.type === 'tip' && (
                    <Gift size={20} color={Colors.accent.blue} />
                  )}
                  {transaction.type === 'purchase' && (
                    <CreditCard size={20} color={Colors.warning} />
                  )}
                </View>

                <View style={styles.transactionDetails}>
                  <Text style={styles.transactionDescription}>
                    {transaction.description}
                  </Text>
                  <Text style={styles.transactionDate}>{transaction.date}</Text>
                </View>

                <Text
                  style={[
                    styles.transactionAmount,
                    transaction.amount > 0
                      ? styles.positiveAmount
                      : styles.negativeAmount,
                  ]}
                >
                  {transaction.amount > 0 ? '+' : ''}
                  {transaction.amount} $VIBE
                </Text>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </ScreenWrapper>
  );
}

// Missing import, adding it
import { Gift } from 'lucide-react-native';
import ScreenWrapper from '@/components/ScreenWrapper';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.primary,
  },
  scrollContainer: {
    flex: 1,
  },
  coverContainer: {
    height: 150,
    position: 'relative',
  },
  coverImage: {
    width: '100%',
    height: '100%',
  },
  avatarContainer: {
    position: 'absolute',
    bottom: -40,
    left: 20,
  },
  avatarImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: Colors.background.primary,
  },
  editAvatarButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: Colors.accent.orange,
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileInfoContainer: {
    marginTop: 48,
    paddingHorizontal: 20,
  },
  userName: {
    fontFamily: 'Poppins-Bold',
    fontSize: 22,
    color: Colors.text.primary,
    marginBottom: 4,
  },
  walletContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  walletAddress: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: Colors.text.secondary,
  },
  copyButton: {
    marginLeft: 8,
    padding: 4,
  },
  copyText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 12,
    color: Colors.accent.blue,
  },
  levelContainer: {
    marginBottom: 16,
  },
  levelTextContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  levelLabel: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    color: Colors.text.primary,
  },
  xpText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: Colors.text.secondary,
  },
  levelProgressBar: {
    height: 8,
    borderRadius: 4,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
    color: Colors.text.primary,
  },
  statLabel: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: Colors.text.secondary,
  },
  tabsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginRight: 12,
    borderRadius: 20,
    backgroundColor: Colors.background.secondary,
  },
  activeTab: {
    backgroundColor: Colors.accent.orange + '20', // With opacity
  },
  tabIcon: {
    marginRight: 6,
  },
  tabText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: Colors.text.secondary,
  },
  activeTabText: {
    fontFamily: 'Poppins-SemiBold',
    color: Colors.accent.orange,
  },
  nftsContainer: {
    padding: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  nftCard: {
    width: '48%',
    marginBottom: 16,
    borderRadius: 12,
    backgroundColor: Colors.background.secondary,
    overflow: 'hidden',
  },
  nftImage: {
    width: '100%',
    height: 140,
  },
  nftInfo: {
    padding: 12,
  },
  nftName: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    color: Colors.text.primary,
    marginBottom: 4,
  },
  rarityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    alignSelf: 'flex-start',
  },
  commonBadge: {
    backgroundColor: Colors.text.secondary + '40',
  },
  rareBadge: {
    backgroundColor: Colors.accent.blue + '40',
  },
  epicBadge: {
    backgroundColor: Colors.accent.orange + '40',
  },
  legendaryBadge: {
    backgroundColor: Colors.success + '40',
  },
  rarityText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: Colors.text.primary,
  },
  mintNftButton: {
    width: '48%',
    height: 184,
    borderRadius: 12,
    backgroundColor: Colors.background.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: Colors.accent.orange + '40', // With opacity
  },
  mintNftContent: {
    alignItems: 'center',
  },
  mintNftText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    color: Colors.accent.orange,
    textAlign: 'center',
    marginTop: 12,
  },
  transactionsContainer: {
    padding: 20,
  },
  transactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.background.secondary,
  },
  transactionIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.background.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  transactionDetails: {
    flex: 1,
  },
  transactionDescription: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: Colors.text.primary,
    marginBottom: 2,
  },
  transactionDate: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: Colors.text.secondary,
  },
  transactionAmount: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
  },
  positiveAmount: {
    color: Colors.success,
  },
  negativeAmount: {
    color: Colors.warning,
  },
});
