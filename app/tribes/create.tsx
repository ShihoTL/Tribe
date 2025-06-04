import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { IconArrowLeft, IconUpload, IconLock } from '@tabler/icons-react-native';
import Colors from '@/constants/Colors';
import Button from '@/components/Button';

export default function CreateTribeScreen() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);
  
  const handleBack = () => {
    router.back();
  };
  
  const handleCreate = () => {
    // Implement tribe creation logic
    router.back();
  };

  return (
    <SafeAreaView style={styles.container} edges={['right', 'top', 'left']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <IconArrowLeft size={24} color={Colors.text.primary} stroke={Colors.text.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Create New Tribe</Text>
        <View style={styles.placeholder} />
      </View>
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <TouchableOpacity style={styles.imageUpload}>
          <IconUpload size={32} color={Colors.text.secondary} stroke={Colors.text.secondary} />
          <Text style={styles.uploadText}>Upload Tribe Image</Text>
          <Text style={styles.uploadHint}>Tap to choose a photo</Text>
        </TouchableOpacity>
        
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Tribe Name</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Enter tribe name"
            placeholderTextColor={Colors.text.secondary}
          />
        </View>
        
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={description}
            onChangeText={setDescription}
            placeholder="Describe your tribe's mission"
            placeholderTextColor={Colors.text.secondary}
            multiline
            numberOfLines={4}
          />
        </View>
        
        <TouchableOpacity
          style={styles.privacyOption}
          onPress={() => setIsPrivate(!isPrivate)}
        >
          <View style={[styles.checkbox, isPrivate && styles.checkboxChecked]}>
            <IconLock 
              size={16} 
              color={isPrivate ? Colors.text.primary : Colors.text.secondary}
              stroke={isPrivate ? Colors.text.primary : Colors.text.secondary}
            />
          </View>
          <View style={styles.privacyText}>
            <Text style={styles.privacyTitle}>Private Tribe</Text>
            <Text style={styles.privacyDescription}>
              Only invited members can join this tribe
            </Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
      
      <View style={styles.footer}>
        <Button
          title="Create Tribe"
          onPress={handleCreate}
          disabled={!name || !description}
        />
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
  content: {
    flex: 1,
    padding: 16,
  },
  imageUpload: {
    height: 200,
    backgroundColor: Colors.background.secondary,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  uploadText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: Colors.text.primary,
    marginTop: 12,
  },
  uploadHint: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: Colors.text.secondary,
    marginTop: 4,
  },
  inputContainer: {
    marginBottom: 24,
  },
  label: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    color: Colors.text.primary,
    marginBottom: 8,
  },
  input: {
    backgroundColor: Colors.background.secondary,
    borderRadius: 12,
    padding: 12,
    color: Colors.text.primary,
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
  },
  textArea: {
    height: 120,
    textAlignVertical: 'top',
  },
  privacyOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background.secondary,
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  checkbox: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.background.tertiary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  checkboxChecked: {
    backgroundColor: Colors.accent.orange,
  },
  privacyText: {
    flex: 1,
  },
  privacyTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: Colors.text.primary,
    marginBottom: 4,
  },
  privacyDescription: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: Colors.text.secondary,
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: Colors.background.secondary,
  },
});