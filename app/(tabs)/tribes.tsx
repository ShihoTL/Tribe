import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { router } from 'expo-router';
import { Search, Plus, Users, Filter } from 'lucide-react-native';
import ScreenWrapper from '@/components/ScreenWrapper';
import Header from '@/components/Header';
import TribeListItem from '@/components/TribeListItem';
import Button from '@/components/Button';
import Colors from '@/constants/Colors';

export default function TribesScreen() {
  const [activeFilter, setActiveFilter] = useState('trending');

  // Dummy data for the tribes
  const tribes = [
    {
      id: '1',
      name: 'SolanaDevs',
      members: 328,
      quests: 5,
      active: true,
      imageUrl:
        'https://images.pexels.com/photos/2570059/pexels-photo-2570059.jpeg',
    },
    {
      id: '2',
      name: 'NFT Creators',
      members: 215,
      quests: 3,
      active: true,
      imageUrl:
        'https://images.pexels.com/photos/3631430/pexels-photo-3631430.jpeg',
    },
    {
      id: '3',
      name: 'DAO Masters',
      members: 172,
      quests: 7,
      active: false,
      imageUrl:
        'https://images.pexels.com/photos/1616403/pexels-photo-1616403.jpeg',
    },
    {
      id: '4',
      name: 'Metaverse Builders',
      members: 153,
      quests: 4,
      active: true,
      imageUrl:
        'https://images.pexels.com/photos/1633578/pexels-photo-1633578.jpeg',
    },
    {
      id: '5',
      name: 'DeFi Explorers',
      members: 134,
      quests: 2,
      active: false,
      imageUrl:
        'https://images.pexels.com/photos/3622517/pexels-photo-3622517.jpeg',
    },
    {
      id: '6',
      name: 'Solana GameFi',
      members: 112,
      quests: 6,
      active: true,
      imageUrl:
        'https://images.pexels.com/photos/5380642/pexels-photo-5380642.jpeg',
    },
  ];

  const handleCreateTribe = () => {
    router.push('/tribes/create');
  };

  const handleTribePress = (tribeId: string) => {
    router.push(`/tribe/${tribeId}`);
  };

  return (
    <ScreenWrapper>
      <Header
        title="Tribes"
        rightElement={
          <TouchableOpacity style={styles.filterButton}>
            <Filter size={20} color={Colors.text.primary} />
          </TouchableOpacity>
        }
      />

      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Search size={20} color={Colors.text.secondary} />
          <Text style={styles.searchText}>Search tribes...</Text>
        </View>
      </View>

      <View style={styles.filtersContainer}>
        <TouchableOpacity
          style={[
            styles.filterTab,
            activeFilter === 'trending' && styles.activeFilterTab,
          ]}
          onPress={() => setActiveFilter('trending')}
        >
          <Text
            style={[
              styles.filterText,
              activeFilter === 'trending' && styles.activeFilterText,
            ]}
          >
            Trending
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.filterTab,
            activeFilter === 'new' && styles.activeFilterTab,
          ]}
          onPress={() => setActiveFilter('new')}
        >
          <Text
            style={[
              styles.filterText,
              activeFilter === 'new' && styles.activeFilterText,
            ]}
          >
            New
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.filterTab,
            activeFilter === 'nftGated' && styles.activeFilterTab,
          ]}
          onPress={() => setActiveFilter('nftGated')}
        >
          <Text
            style={[
              styles.filterText,
              activeFilter === 'nftGated' && styles.activeFilterText,
            ]}
          >
            NFT-Gated
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.filterTab,
            activeFilter === 'myTribes' && styles.activeFilterTab,
          ]}
          onPress={() => setActiveFilter('myTribes')}
        >
          <Text
            style={[
              styles.filterText,
              activeFilter === 'myTribes' && styles.activeFilterText,
            ]}
          >
            My Tribes
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.tribesContainer}
        contentContainerStyle={styles.tribesContent}
        showsVerticalScrollIndicator={false}
      >
        {tribes.map((tribe) => (
          <TribeListItem
            key={tribe.id}
            tribe={tribe}
            onPress={() => handleTribePress(tribe.id)}
          />
        ))}
      </ScrollView>

      <View style={styles.createButtonContainer}>
        <Button
          title="Create Tribe"
          onPress={handleCreateTribe}
          icon={<Plus size={20} color="#FFF" />}
          style={styles.createButton}
        />
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  filterButton: {
    padding: 8,
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
  filtersContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  filterTab: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginRight: 8,
    borderRadius: 20,
    backgroundColor: Colors.background.secondary,
  },
  activeFilterTab: {
    backgroundColor: Colors.accent.orange + '20',
  },
  filterText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: Colors.text.secondary,
  },
  activeFilterText: {
    fontFamily: 'Poppins-SemiBold',
    color: Colors.accent.orange,
  },
  tribesContainer: {
    flex: 1,
  },
  tribesContent: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  createButtonContainer: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: Colors.background.primary,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: Colors.background.secondary,
  },
  createButton: {
    borderRadius: 12,
  },
});
