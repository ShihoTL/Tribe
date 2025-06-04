import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link } from 'expo-router';
import { Search, Bell, TrendingUp, Zap, Star } from 'lucide-react-native';
import Header from '@/components/Header';
import TribeCard from '@/components/TribeCard';
import QuestCard from '@/components/QuestCard';
import TokenBalance from '@/components/TokenBalance';
import Colors from '@/constants/Colors';
import ScreenWrapper from '@/components/ScreenWrapper';

export default function ExploreScreen() {
  // Dummy data for the app
  const trendingTribes = [
    {
      id: '1',
      name: 'SolanaDevs',
      members: 328,
      quests: 5,
      imageUrl:
        'https://images.pexels.com/photos/2570059/pexels-photo-2570059.jpeg',
    },
    {
      id: '2',
      name: 'NFT Creators',
      members: 215,
      quests: 3,
      imageUrl:
        'https://images.pexels.com/photos/3631430/pexels-photo-3631430.jpeg',
    },
    {
      id: '3',
      name: 'DAO Masters',
      members: 172,
      quests: 7,
      imageUrl:
        'https://images.pexels.com/photos/1616403/pexels-photo-1616403.jpeg',
    },
  ];

  const hotQuests = [
    {
      id: '1',
      title: 'Design a Tribe Logo',
      reward: 50,
      progress: 0.7,
      tribeId: '1',
      tribeName: 'SolanaDevs',
    },
    {
      id: '2',
      title: 'Share Project on X',
      reward: 25,
      progress: 0.3,
      tribeId: '2',
      tribeName: 'NFT Creators',
    },
    {
      id: '3',
      title: 'Contribute to Codebase',
      reward: 100,
      progress: 0.5,
      tribeId: '3',
      tribeName: 'DAO Masters',
    },
  ];

  return (
    <ScreenWrapper>
      <View style={styles.content}>
        <Header
          title="Explore"
          rightElement={
            <View style={styles.headerActions}>
              <TokenBalance value={250} />
              <TouchableOpacity style={styles.iconButton}>
                <Bell size={24} color={Colors.text.primary} />
              </TouchableOpacity>
            </View>
          }
        />

        <ScrollView
          style={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.searchContainer}>
            <TouchableOpacity style={styles.searchBar}>
              <Search size={20} color={Colors.text.secondary} />
              <Text style={styles.searchText}>
                Find tribes, quests, or users...
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.sectionContainer}>
            <View style={styles.sectionHeader}>
              <View style={styles.sectionTitleContainer}>
                <TrendingUp size={20} color={Colors.accent.orange} />
                <Text style={styles.sectionTitle}>Trending Tribes</Text>
              </View>
              <Link href="/tribes" asChild>
                <TouchableOpacity>
                  <Text style={styles.viewAllText}>See All</Text>
                </TouchableOpacity>
              </Link>
            </View>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.horizontalList}
            >
              {trendingTribes.map((tribe) => (
                <Link key={tribe.id} href={`/tribe/${tribe.id}`} asChild>
                  <TouchableOpacity>
                    <TribeCard tribe={tribe} />
                  </TouchableOpacity>
                </Link>
              ))}

              <Link href="/tribes/create" asChild>
                <TouchableOpacity style={styles.createTribeCard}>
                  <View style={styles.createTribeContent}>
                    <View style={styles.createTribeIconContainer}>
                      <Zap size={24} color={Colors.accent.orange} />
                    </View>
                    <Text style={styles.createTribeText}>Create a Tribe</Text>
                  </View>
                </TouchableOpacity>
              </Link>
            </ScrollView>
          </View>

          <View style={styles.sectionContainer}>
            <View style={styles.sectionHeader}>
              <View style={styles.sectionTitleContainer}>
                <Star size={20} color={Colors.accent.orange} />
                <Text style={styles.sectionTitle}>Hot Quests</Text>
              </View>
              <Link href="/quests" asChild>
                <TouchableOpacity>
                  <Text style={styles.viewAllText}>See All</Text>
                </TouchableOpacity>
              </Link>
            </View>

            <View style={styles.questsList}>
              {hotQuests.map((quest) => (
                <Link key={quest.id} href={`/quest/${quest.id}`} asChild>
                  <TouchableOpacity style={styles.questCardWrapper}>
                    <QuestCard quest={quest} />
                  </TouchableOpacity>
                </Link>
              ))}
            </View>
          </View>
        </ScrollView>
      </View>
    </ScreenWrapper>
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
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    marginLeft: 16,
    padding: 4,
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  searchContainer: {
    paddingHorizontal: 16,
    marginTop: 8,
    marginBottom: 16,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background.secondary,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
  },
  searchText: {
    marginLeft: 8,
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: Colors.text.secondary,
  },
  sectionContainer: {
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  sectionTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionTitle: {
    marginLeft: 8,
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: Colors.text.primary,
  },
  viewAllText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: Colors.accent.blue,
  },
  horizontalList: {
    paddingLeft: 16,
    paddingRight: 8,
  },
  createTribeCard: {
    width: 160,
    height: 200,
    backgroundColor: Colors.background.secondary,
    borderRadius: 16,
    marginRight: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: Colors.accent.orange + '40', // With opacity
  },
  createTribeContent: {
    alignItems: 'center',
  },
  createTribeIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: Colors.background.tertiary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  createTribeText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    color: Colors.accent.orange,
    textAlign: 'center',
  },
  questsList: {
    paddingHorizontal: 16,
  },
  questCardWrapper: {
    marginBottom: 12,
  },
});
