import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft, MessageSquare, Book, Mail } from 'lucide-react-native';
import { router } from 'expo-router';
import Colors from '@/constants/Colors';

export default function HelpScreen() {
  const helpOptions = [
    {
      icon: Book,
      title: 'Documentation',
      description: 'Learn how to use TribeVibe',
      action: () => {},
    },
    {
      icon: MessageSquare,
      title: 'Chat with Support',
      description: 'Get help from our team',
      action: () => {},
    },
    {
      icon: Mail,
      title: 'Contact Us',
      description: 'Send us an email',
      action: () => {},
    },
  ];

  return (
    <SafeAreaView style={styles.container} edges={['right', 'top', 'left']}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <ChevronLeft size={24} color={Colors.text.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Help Center</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content}>
        <Text style={styles.subtitle}>How can we help you?</Text>

        {helpOptions.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={styles.helpOption}
            onPress={option.action}
          >
            <View style={styles.iconContainer}>
              <option.icon size={24} color={Colors.accent.orange} />
            </View>
            <View style={styles.optionContent}>
              <Text style={styles.optionTitle}>{option.title}</Text>
              <Text style={styles.optionDescription}>{option.description}</Text>
            </View>
          </TouchableOpacity>
        ))}

        <View style={styles.faqSection}>
          <Text style={styles.faqTitle}>Frequently Asked Questions</Text>

          <View style={styles.faqItem}>
            <Text style={styles.faqQuestion}>What is TribeVibe?</Text>
            <Text style={styles.faqAnswer}>
              TribeVibe is a community platform that connects web3 enthusiasts
              through collaborative quests and rewards.
            </Text>
          </View>

          <View style={styles.faqItem}>
            <Text style={styles.faqQuestion}>How do I earn rewards?</Text>
            <Text style={styles.faqAnswer}>
              Complete quests, participate in tribe activities, and contribute
              to your community to earn $VIBE tokens and NFT rewards.
            </Text>
          </View>

          <View style={styles.faqItem}>
            <Text style={styles.faqQuestion}>How do I create a tribe?</Text>
            <Text style={styles.faqAnswer}>
              Navigate to the Tribes tab and click on "Create Tribe". Follow the
              setup process to establish your community.
            </Text>
          </View>
        </View>
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
    borderBottomWidth: 1,
    borderBottomColor: Colors.background.secondary,
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
  content: {
    flex: 1,
    padding: 16,
  },
  subtitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 24,
    color: Colors.text.primary,
    marginBottom: 24,
  },
  helpOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background.secondary,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.background.tertiary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  optionContent: {
    flex: 1,
  },
  optionTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: Colors.text.primary,
    marginBottom: 4,
  },
  optionDescription: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: Colors.text.secondary,
  },
  faqSection: {
    marginTop: 32,
  },
  faqTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: Colors.text.primary,
    marginBottom: 16,
  },
  faqItem: {
    backgroundColor: Colors.background.secondary,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  faqQuestion: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: Colors.text.primary,
    marginBottom: 8,
  },
  faqAnswer: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: Colors.text.secondary,
    lineHeight: 20,
  },
});
