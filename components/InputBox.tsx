// InputBox.tsx
import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Send, Gift, Image as ImageIcon, Smile } from 'lucide-react-native';
import Colors from '@/constants/Colors';

interface InputBoxProps {
  message: string;
  setMessage: (text: string) => void;
  replyingTo: { id: string; text: string; sender: string } | null;
  onSend: () => void;
  onInputChange: (text: string) => void;
  showCommandPopup: boolean;
  onReplyPreviewPress?: (messageId: string) => void;
}

export default function InputBox({
  message,
  setMessage,
  replyingTo,
  onSend,
  onInputChange,
  showCommandPopup,
}: InputBoxProps) {
  return (
    <View style={styles.inputContainer}>
      <View style={styles.inputActions}>
        <TouchableOpacity style={styles.inputActionButton}>
          <ImageIcon size={20} color={Colors.text.secondary} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.inputActionButton}>
          <Gift size={20} color={Colors.text.secondary} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.inputActionButton}>
          <Smile size={20} color={Colors.text.secondary} />
        </TouchableOpacity>
      </View>

      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder={
            replyingTo
              ? `Reply to ${replyingTo.sender}...`
              : 'Type a message or /'
          }
          placeholderTextColor={Colors.text.secondary}
          value={message}
          onChangeText={(text) => {
            setMessage(text);
            onInputChange(text);
          }}
          multiline
        />

        <TouchableOpacity
          style={[
            styles.sendButton,
            message.trim() === '' && styles.sendButtonDisabled,
          ]}
          onPress={onSend}
          disabled={message.trim() === '' || showCommandPopup}
        >
          <Send size={20} color={Colors.text.primary} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    borderTopWidth: 1,
    borderTopColor: Colors.background.secondary,
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 24,
    backgroundColor: Colors.background.primary,
  },
  inputActions: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  inputActionButton: {
    marginRight: 16,
    padding: 4,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    backgroundColor: Colors.background.secondary,
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 8,
    maxHeight: 100,
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: Colors.text.primary,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.accent.orange,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 12,
  },
  sendButtonDisabled: {
    backgroundColor: Colors.background.secondary,
  },
});
