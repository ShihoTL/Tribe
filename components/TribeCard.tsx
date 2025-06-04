import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Users, Award } from 'lucide-react-native';
import Colors from '@/constants/Colors';

type TribeCardProps = {
  tribe: {
    id: string;
    name: string;
    members: number;
    quests: number;
    imageUrl: string;
  };
};

export default function TribeCard({ tribe }: TribeCardProps) {
  return (
    <View style={styles.container}>
      <Image source={{ uri: tribe.imageUrl }} style={styles.image} />
      
      <View style={styles.overlay}>
        <View style={styles.content}>
          <Text style={styles.name} numberOfLines={1}>{tribe.name}</Text>
          
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Users size={14} color={Colors.text.secondary} />
              <Text style={styles.statText}>{tribe.members}</Text>
            </View>
            
            <View style={styles.statItem}>
              <Award size={14} color={Colors.text.secondary} />
              <Text style={styles.statText}>{tribe.quests}</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 160,
    height: 200,
    borderRadius: 16,
    overflow: 'hidden',
    marginRight: 16,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  content: {
    padding: 12,
  },
  name: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: Colors.text.primary,
    marginBottom: 4,
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