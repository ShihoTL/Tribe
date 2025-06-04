import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import {
  Award,
  Filter,
  CircleCheck as CheckCircle,
  Clock,
} from 'lucide-react-native';
import Header from '@/components/Header';
import QuestItem from '@/components/QuestItem';
import Colors from '@/constants/Colors';
import TokenBalance from '@/components/TokenBalance';
import ScreenWrapper from '@/components/ScreenWrapper';

export default function QuestsScreen() {
  const [activeTab, setActiveTab] = useState('active');

  // Dummy data for quests
  const activeQuests = [
    {
      id: '1',
      title: 'Design a Tribe Logo',
      reward: 50,
      progress: 0.7,
      tribeId: '1',
      tribeName: 'SolanaDevs',
      dueDate: '2d 5h left',
      participants: 12,
      tribeImageUrl:
        'https://images.pexels.com/photos/2570059/pexels-photo-2570059.jpeg',
    },
    {
      id: '2',
      title: 'Share Project on X',
      reward: 25,
      progress: 0.3,
      tribeId: '2',
      tribeName: 'NFT Creators',
      dueDate: '1d 2h left',
      participants: 8,
      tribeImageUrl:
        'https://images.pexels.com/photos/3631430/pexels-photo-3631430.jpeg',
    },
    {
      id: '3',
      title: 'Contribute to Codebase',
      reward: 100,
      progress: 0.5,
      tribeId: '3',
      tribeName: 'DAO Masters',
      dueDate: '5d left',
      participants: 15,
      tribeImageUrl:
        'https://images.pexels.com/photos/1616403/pexels-photo-1616403.jpeg',
    },
    {
      id: '4',
      title: 'Test New Features',
      reward: 35,
      progress: 0.2,
      tribeId: '4',
      tribeName: 'GameFi Testers',
      dueDate: '3d left',
      participants: 7,
      tribeImageUrl:
        'https://images.pexels.com/photos/5380642/pexels-photo-5380642.jpeg',
    },
  ];

  const completedQuests = [
    {
      id: '5',
      title: 'Create Project Wiki',
      reward: 40,
      progress: 1.0,
      tribeId: '1',
      tribeName: 'SolanaDevs',
      completedDate: '2 days ago',
      participants: 9,
      tribeImageUrl:
        'https://images.pexels.com/photos/2570059/pexels-photo-2570059.jpeg',
    },
    {
      id: '6',
      title: 'Host Community Call',
      reward: 75,
      progress: 1.0,
      tribeId: '2',
      tribeName: 'NFT Creators',
      completedDate: '1 week ago',
      participants: 22,
      tribeImageUrl:
        'https://images.pexels.com/photos/3631430/pexels-photo-3631430.jpeg',
    },
  ];

  const handleQuestPress = (questId: string) => {
    router.push(`/quest/${questId}`);
  };

  return (
    <ScreenWrapper>
      <Header
        title="Quests"
        rightElement={
          <View style={styles.headerActions}>
            <TokenBalance value={250} />
            <TouchableOpacity style={styles.filterButton}>
              <Filter size={20} color={Colors.text.primary} />
            </TouchableOpacity>
          </View>
        }
      />

      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'active' && styles.activeTab]}
          onPress={() => setActiveTab('active')}
        >
          <Clock
            size={18}
            color={
              activeTab === 'active'
                ? Colors.accent.orange
                : Colors.text.secondary
            }
            style={styles.tabIcon}
          />
          <Text
            style={[
              styles.tabText,
              activeTab === 'active' && styles.activeTabText,
            ]}
          >
            Active
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, activeTab === 'completed' && styles.activeTab]}
          onPress={() => setActiveTab('completed')}
        >
          <CheckCircle
            size={18}
            color={
              activeTab === 'completed'
                ? Colors.accent.orange
                : Colors.text.secondary
            }
            style={styles.tabIcon}
          />
          <Text
            style={[
              styles.tabText,
              activeTab === 'completed' && styles.activeTabText,
            ]}
          >
            Completed
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.questsContainer}
        contentContainerStyle={styles.questsContent}
        showsVerticalScrollIndicator={false}
      >
        {activeTab === 'active' ? (
          activeQuests.length > 0 ? (
            activeQuests.map((quest) => (
              <QuestItem
                key={quest.id}
                quest={quest}
                onPress={() => handleQuestPress(quest.id)}
              />
            ))
          ) : (
            <View style={styles.emptyStateContainer}>
              <Award size={48} color={Colors.text.secondary} />
              <Text style={styles.emptyStateText}>No active quests</Text>
              <Text style={styles.emptyStateSubtext}>
                Join a tribe to find quests
              </Text>
            </View>
          )
        ) : completedQuests.length > 0 ? (
          completedQuests.map((quest) => (
            <QuestItem
              key={quest.id}
              quest={quest}
              completed
              onPress={() => handleQuestPress(quest.id)}
            />
          ))
        ) : (
          <View style={styles.emptyStateContainer}>
            <CheckCircle size={48} color={Colors.text.secondary} />
            <Text style={styles.emptyStateText}>No completed quests</Text>
            <Text style={styles.emptyStateSubtext}>
              Complete quests to see them here
            </Text>
          </View>
        )}
      </ScrollView>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.primary,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  filterButton: {
    marginLeft: 16,
    padding: 4,
  },
  tabsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
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
    flex: 1,
  },
  questsContent: {
    padding: 16,
  },
  emptyStateContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  emptyStateText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: Colors.text.primary,
    marginTop: 16,
  },
  emptyStateSubtext: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: Colors.text.secondary,
    marginTop: 8,
  },
});
