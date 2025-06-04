import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft, Users, Clock, Award, Share2, MessageSquare } from 'lucide-react-native';
import Button from '@/components/Button';
import ProgressBar from '@/components/ProgressBar';
import Colors from '@/constants/Colors';
import { LinearGradient } from 'expo-linear-gradient';

export default function QuestDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [joined, setJoined] = useState(false);
  
  // Dummy quest data (in a real app, you'd fetch this based on the ID)
  const quest = {
    id,
    title: 'Design a Tribe Logo',
    description: 'Create a unique, vibrant logo for the SolanaDevs tribe that represents our community values: innovation, collaboration, and web3 excellence. The winning design will be used as our official tribe emblem.',
    reward: 50,
    progress: 0.7,
    tribeId: '1',
    tribeName: 'SolanaDevs',
    tribeImageUrl: 'https://images.pexels.com/photos/2570059/pexels-photo-2570059.jpeg',
    dueDate: '2d 5h left',
    participants: 12,
    tasks: [
      { id: '1', title: 'Submit logo design', completed: false, reward: 20 },
      { id: '2', title: 'Get 5 community votes', completed: false, reward: 15 },
      { id: '3', title: 'Present your design rationale', completed: false, reward: 15 },
    ],
  };
  
  const handleBack = () => {
    router.back();
  };
  
  const handleJoinQuest = () => {
    setJoined(true);
  };
  
  const handleChatPress = () => {
    router.push('/chat');
  };
  
  const handleShare = () => {
    // Implement share functionality
  };

  return (
    <SafeAreaView style={styles.container} edges={['right', 'top', 'left']}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <ChevronLeft size={24} color={Colors.text.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Quest Details</Text>
        <View style={styles.placeholder} />
      </View>
      
      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.questHeader}>
          <LinearGradient
            colors={[Colors.background.secondary, Colors.background.primary]}
            style={styles.questHeaderGradient}
          >
            <View style={styles.tribeInfo}>
              <Image source={{ uri: quest.tribeImageUrl }} style={styles.tribeImage} />
              <Text style={styles.tribeName}>{quest.tribeName}</Text>
            </View>
            
            <Text style={styles.questTitle}>{quest.title}</Text>
            
            <View style={styles.questMetrics}>
              <View style={styles.metricItem}>
                <Users size={16} color={Colors.text.secondary} />
                <Text style={styles.metricText}>{quest.participants} participants</Text>
              </View>
              <View style={styles.metricItem}>
                <Clock size={16} color={Colors.text.secondary} />
                <Text style={styles.metricText}>{quest.dueDate}</Text>
              </View>
              <View style={styles.metricItem}>
                <Award size={16} color={Colors.accent.orange} />
                <Text style={styles.metricText}>{quest.reward} $VIBE</Text>
              </View>
            </View>
          </LinearGradient>
        </View>
        
        <View style={styles.questContent}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Description</Text>
            <Text style={styles.descriptionText}>{quest.description}</Text>
          </View>
          
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Progress</Text>
            <View style={styles.progressContainer}>
              <View style={styles.progressTextContainer}>
                <Text style={styles.progressText}>Overall Completion</Text>
                <Text style={styles.progressPercentage}>{Math.round(quest.progress * 100)}%</Text>
              </View>
              <ProgressBar progress={quest.progress} style={styles.progressBar} />
            </View>
          </View>
          
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Tasks</Text>
            {quest.tasks.map((task, index) => (
              <View key={task.id} style={styles.taskItem}>
                <View style={styles.taskCheckbox}>
                  {joined ? (
                    <TouchableOpacity style={styles.checkbox}>
                      {task.completed && (
                        <View style={styles.checkboxInner} />
                      )}
                    </TouchableOpacity>
                  ) : (
                    <View style={styles.taskNumber}>
                      <Text style={styles.taskNumberText}>{index + 1}</Text>
                    </View>
                  )}
                </View>
                
                <View style={styles.taskContent}>
                  <Text style={styles.taskTitle}>{task.title}</Text>
                  <View style={styles.taskReward}>
                    <Award size={12} color={Colors.accent.orange} />
                    <Text style={styles.taskRewardText}>{task.reward} $VIBE</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
      
      <View style={styles.actionBar}>
        {!joined ? (
          <Button 
            title="Join Quest" 
            onPress={handleJoinQuest} 
            style={styles.joinButton}
          />
        ) : (
          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.actionButton} onPress={handleChatPress}>
              <MessageSquare size={20} color={Colors.accent.blue} />
              <Text style={styles.actionButtonText}>Chat</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.actionButton} onPress={handleShare}>
              <Share2 size={20} color={Colors.accent.orange} />
              <Text style={styles.actionButtonText}>Share</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
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
  questHeader: {
    height: 200,
  },
  questHeaderGradient: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  tribeInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  tribeImage: {
    width: 28,
    height: 28,
    borderRadius: 14,
    marginRight: 8,
  },
  tribeName: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    color: Colors.text.secondary,
  },
  questTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
    color: Colors.text.primary,
    marginBottom: 16,
  },
  questMetrics: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  metricItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
    marginBottom: 4,
  },
  metricText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: Colors.text.secondary,
    marginLeft: 4,
  },
  questContent: {
    padding: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: Colors.text.primary,
    marginBottom: 12,
  },
  descriptionText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: Colors.text.secondary,
    lineHeight: 22,
  },
  progressContainer: {
    marginTop: 4,
  },
  progressTextContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  progressText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: Colors.text.secondary,
  },
  progressPercentage: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    color: Colors.text.primary,
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  taskCheckbox: {
    marginRight: 12,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: Colors.accent.orange,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: Colors.accent.orange,
  },
  taskNumber: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: Colors.background.secondary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  taskNumberText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 12,
    color: Colors.text.secondary,
  },
  taskContent: {
    flex: 1,
  },
  taskTitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: Colors.text.primary,
    marginBottom: 4,
  },
  taskReward: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  taskRewardText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: Colors.accent.orange,
    marginLeft: 4,
  },
  actionBar: {
    borderTopWidth: 1,
    borderTopColor: Colors.background.secondary,
    padding: 16,
  },
  joinButton: {
    borderRadius: 12,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
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
});