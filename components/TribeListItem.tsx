import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Users, Award, ChevronRight } from 'lucide-react-native';
import Colors from '@/constants/Colors';

type TribeListItemProps = {
  tribe: {
    id: string;
    name: string;
    members: number;
    quests: number;
    active: boolean;
    imageUrl: string;
  };
  onPress: () => void;
};

export default function TribeListItem({ tribe, onPress }: TribeListItemProps) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image source={{ uri: tribe.imageUrl }} style={styles.image} />
      
      <View style={styles.content}>
        <View style={styles.nameContainer}>
          <Text style={styles.name}>{tribe.name}</Text>
          {tribe.active && <View style={styles.activeBadge} />}
        </View>
        
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Users size={14} color={Colors.text.secondary} />
            <Text style={styles.statText}>{tribe.members} members</Text>
          </View>
          
          <View style={styles.statItem}>
            <Award size={14} color={Colors.text.secondary} />
            <Text style={styles.statText}>{tribe.quests} quests</Text>
          </View>
        </View>
      </View>
      
      <ChevronRight size={20} color={Colors.text.secondary} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background.secondary,
    borderRadius: 16,
    padding: 12,
    marginBottom: 12,
  },
  image: {
    width: 56,
    height: 56,
    borderRadius: 28,
    marginRight: 12,
  },
  content: {
    flex: 1,
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  name: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: Colors.text.primary,
    marginRight: 8,
  },
  activeBadge: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.success,
  },
  statsContainer: {
    flexDirection: 'row',
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
  },
  statText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: Colors.text.secondary,
    marginLeft: 4,
  },
});