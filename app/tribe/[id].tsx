import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft, Users, Award, MessageSquare, Info, Share2 } from 'lucide-react-native';
import Button from '@/components/Button';
import QuestCard from '@/components/QuestCard';
import Colors from '@/constants/Colors';

export default function TribeDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('quests');
  const [joined, setJoined] = useState(false);
  
  // Dummy tribe data (in a real app, you'd fetch this based on the ID)
  const tribe = {
    id,
    name: 'SolanaDevs',
    description: 'A community of passionate Solana developers building the future of decentralized applications. Join us to collaborate, learn, and earn rewards through exciting quests!',
    members: 328,
    quests: 5,
    coverImageUrl: 'https://images.pexels.com/photos/3913025/pexels-photo-3913025.jpeg',
    profileImageUrl: 'https://images.pexels.com/photos/2570059/pexels-photo-2570059.jpeg',
    tags: ['Solana', 'Development', 'Web3', 'Community'],
    isNftGated: true,
    activeQuests: [
      { id: '1', title: 'Design a Tribe Logo', reward: 50, progress: 0.7, tribeId: id, tribeName: 'SolanaDevs' },
      { id: '2', title: 'Contribute to Codebase', reward: 100, progress: 0.5, tribeId: id, tribeName: 'SolanaDevs' },
      { id: '3', title: 'Test New Features', reward: 35, progress: 0.2, tribeId: id, tribeName: 'SolanaDevs' },
    ],
    members: [
      { id: '1', name: 'CryptoVibeMaster', avatarUrl: 'https://images.pexels.com/photos/7567434/pexels-photo-7567434.jpeg' },
      { id: '2', name: 'SolanaWizard', avatarUrl: 'https://images.pexels.com/photos/1270076/pexels-photo-1270076.jpeg' },
      { id: '3', name: 'DevNinja', avatarUrl: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg' },
      { id: '4', name: 'CryptoQueen', avatarUrl: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg' },
      { id: '5', name: 'DAOmaster', avatarUrl: 'https://images.pexels.com/photos/1587009/pexels-photo-1587009.jpeg' },
    ],
  };
  
  const handleBack = () => {
    router.back();
  };
  
  const handleJoinTribe = () => {
    setJoined(true);
  };
  
  const handleQuestPress = (questId: string) => {
    router.push(`/quest/${questId}`);
  };
  
  const handleChatPress = () => {
    router.push('/chat');
  };
  
  const handleSharePress = () => {
    // Implement share functionality
  };

  return (
    <SafeAreaView style={styles.container} edges={['right', 'top', 'left']}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <ChevronLeft size={24} color={Colors.text.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Tribe Profile</Text>
        <View style={styles.placeholder} />
      </View>
      
      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.coverContainer}>
          <Image source={{ uri: tribe.coverImageUrl }} style={styles.coverImage} />
        </View>
        
        <View style={styles.tribeInfoContainer}>
          <View style={styles.profileImageContainer}>
            <Image source={{ uri: tribe.profileImageUrl }} style={styles.profileImage} />
          </View>
          
          <Text style={styles.tribeName}>{tribe.name}</Text>
          
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Users size={16} color={Colors.text.secondary} />
              <Text style={styles.statText}>{tribe.members.length} members</Text>
            </View>
            <View style={styles.statItem}>
              <Award size={16} color={Colors.text.secondary} />
              <Text style={styles.statText}>{tribe.activeQuests.length} active quests</Text>
            </View>
          </View>
          
          {tribe.isNftGated && (
            <View style={styles.nftGatedBadge}>
              <Text style={styles.nftGatedText}>NFT-Gated</Text>
            </View>
          )}
          
          <Text style={styles.description}>{tribe.description}</Text>
          
          <View style={styles.tagsContainer}>
            {tribe.tags.map((tag, index) => (
              <View key={index} style={styles.tagBadge}>
                <Text style={styles.tagText}>{tag}</Text>
              </View>
            ))}
          </View>
          
          {!joined ? (
            <Button
              title="Join Tribe"
              onPress={handleJoinTribe}
              style={styles.joinButton}
            />
          ) : (
            <View style={styles.actionButtons}>
              <TouchableOpacity style={styles.actionButton} onPress={handleChatPress}>
                <MessageSquare size={20} color={Colors.accent.blue} />
                <Text style={styles.actionButtonText}>Chat</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.actionButton} onPress={() => {}}>
                <Info size={20} color={Colors.text.secondary} />
                <Text style={styles.actionButtonText}>About</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.actionButton} onPress={handleSharePress}>
                <Share2 size={20} color={Colors.accent.orange} />
                <Text style={styles.actionButtonText}>Share</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
        
        <View style={styles.tabsContainer}>
          <TouchableOpacity 
            style={[
              styles.tab, 
              activeTab === 'quests' && styles.activeTab
            ]}
            onPress={() => setActiveTab('quests')}
          >
            <Award 
              size={18} 
              color={activeTab === 'quests' ? Colors.accent.orange : Colors.text.secondary} 
              style={styles.tabIcon}
            />
            <Text 
              style={[
                styles.tabText, 
                activeTab === 'quests' && styles.activeTabText
              ]}
            >
              Quests
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[
              styles.tab, 
              activeTab === 'members' && styles.activeTab
            ]}
            onPress={() => setActiveTab('members')}
          >
            <Users 
              size={18} 
              color={activeTab === 'members' ? Colors.accent.orange : Colors.text.secondary} 
              style={styles.tabIcon}
            />
            <Text 
              style={[
                styles.tabText, 
                activeTab === 'members' && styles.activeTabText
              ]}
            >
              Members
            </Text>
          </TouchableOpacity>
        </View>
        
        {activeTab === 'quests' ? (
          <View style={styles.questsContainer}>
            {tribe.activeQuests.map(quest => (
              <TouchableOpacity key={quest.id} onPress={() => handleQuestPress(quest.id)}>
                <QuestCard quest={quest} />
              </TouchableOpacity>
            ))}
          </View>
        ) : (
          <View style={styles.membersContainer}>
            {tribe.members.map(member => (
              <View key={member.id} style={styles.memberItem}>
                <Image source={{ uri: member.avatarUrl }} style={styles.memberAvatar} />
                <Text style={styles.memberName}>{member.name}</Text>
              </View>
            ))}
          </View>
        )}
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
  scrollContainer: {
    flex: 1,
  },
  coverContainer: {
    height: 160,
  },
  coverImage: {
    width: '100%',
    height: '100%',
  },
  tribeInfoContainer: {
    padding: 20,
    marginTop: 40,
  },
  profileImageContainer: {
    position: 'absolute',
    top: -60,
    left: 20,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: Colors.background.primary,
  },
  tribeName: {
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
    color: Colors.text.primary,
    marginBottom: 8,
  },
  statsContainer: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  statText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: Colors.text.secondary,
    marginLeft: 4,
  },
  nftGatedBadge: {
    backgroundColor: Colors.accent.blue + '20', // With opacity
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
    marginBottom: 12,
  },
  nftGatedText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 12,
    color: Colors.accent.blue,
  },
  description: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: Colors.text.secondary,
    lineHeight: 22,
    marginBottom: 16,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 24,
  },
  tagBadge: {
    backgroundColor: Colors.background.secondary,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
    marginBottom: 8,
  },
  tagText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: Colors.text.secondary,
  },
  joinButton: {
    borderRadius: 12,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 8,
  },
  actionButton: {
    alignItems: 'center',
    padding: 8,
  },
  actionButtonText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: Colors.text.secondary,
    marginTop: 4,
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
  questsContainer: {
    padding: 20,
  },
  membersContainer: {
    padding: 20,
  },
  memberItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  memberAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  memberName: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: Colors.text.primary,
  },
});