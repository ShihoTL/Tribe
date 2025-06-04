import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Award, Users } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import ProgressBar from './ProgressBar';

type QuestCardProps = {
  quest: {
    id: string;
    title: string;
    reward: number;
    progress: number;
    tribeId: string;
    tribeName: string;
  };
};

export default function QuestCard({ quest }: QuestCardProps) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.tribeName}>{quest.tribeName}</Text>
        <View style={styles.rewardContainer}>
          <Award size={14} color={Colors.accent.orange} />
          <Text style={styles.rewardText}>{quest.reward} $VIBE</Text>
        </View>
      </View>
      
      <Text style={styles.title}>{quest.title}</Text>
      
      <View style={styles.progressContainer}>
        <View style={styles.progressTextContainer}>
          <Text style={styles.progressText}>Progress</Text>
          <Text style={styles.progressPercentage}>{Math.round(quest.progress * 100)}%</Text>
        </View>
        <ProgressBar progress={quest.progress} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background.secondary,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
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
    fontSize: 18,
    color: Colors.text.primary,
    marginBottom: 16,
  },
  progressContainer: {
    marginTop: 4,
  },
  progressTextContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  progressText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: Colors.text.secondary,
  },
  progressPercentage: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 12,
    color: Colors.text.primary,
  },
});