import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Award, Users, Clock, Check } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import ProgressBar from './ProgressBar';

type QuestItemProps = {
  quest: {
    id: string;
    title: string;
    reward: number;
    progress: number;
    tribeId: string;
    tribeName: string;
    dueDate?: string;
    completedDate?: string;
    participants: number;
    tribeImageUrl: string;
  };
  completed?: boolean;
  onPress: () => void;
};

export default function QuestItem({ quest, completed = false, onPress }: QuestItemProps) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.header}>
        <View style={styles.tribeInfo}>
          <Image source={{ uri: quest.tribeImageUrl }} style={styles.tribeImage} />
          <Text style={styles.tribeName}>{quest.tribeName}</Text>
        </View>
        
        <View style={styles.rewardContainer}>
          <Award size={14} color={Colors.accent.orange} />
          <Text style={styles.rewardText}>{quest.reward} $VIBE</Text>
        </View>
      </View>
      
      <Text style={styles.title}>{quest.title}</Text>
      
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Users size={14} color={Colors.text.secondary} />
          <Text style={styles.statText}>{quest.participants} participants</Text>
        </View>
        
        <View style={styles.statItem}>
          {completed ? (
            <>
              <Check size={14} color={Colors.success} />
              <Text style={[styles.statText, { color: Colors.success }]}>
                {quest.completedDate}
              </Text>
            </>
          ) : (
            <>
              <Clock size={14} color={Colors.text.secondary} />
              <Text style={styles.statText}>{quest.dueDate}</Text>
            </>
          )}
        </View>
      </View>
      
      {!completed && (
        <View style={styles.progressContainer}>
          <ProgressBar progress={quest.progress} />
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background.secondary,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  tribeInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tribeImage: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginRight: 6,
  },
  tribeName: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: Colors.text.secondary,
  },
  rewardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rewardText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    color: Colors.accent.orange,
    marginLeft: 4,
  },
  title: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: Colors.text.primary,
    marginBottom: 12,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: Colors.text.secondary,
    marginLeft: 4,
  },
  progressContainer: {
    marginTop: 4,
  },
});