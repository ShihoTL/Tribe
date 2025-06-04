// ChatScreen.tsx
import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Animated,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  ChevronUp,
  ChevronDown,
  X,
  Trash2,
  Forward,
  Copy,
  Reply,
} from 'lucide-react-native';
import { Image } from 'react-native';
import Header from '@/components/Header';
import Colors from '@/constants/Colors';
import ChatBubble from '@/components/ChatBubble';
import CommandPopup from '@/components/CommandPopup';
import InputBox from '@/components/InputBox';
import { activeTribes, messages, Tribe, Message } from '@/data/ChatData';
import ScreenWrapper from '@/components/ScreenWrapper';

export default function ChatScreen() {
  const [message, setMessage] = useState('');
  const [replyingTo, setReplyingTo] = useState<Message['replyTo']>(null);
  const [showCommandPopup, setShowCommandPopup] = useState(false);
  const [currentCommand, setCurrentCommand] = useState('');
  const [currentCommandObj, setCurrentCommandObj] = useState<{
    command: string;
    needsTarget?: boolean;
    needsAmount?: boolean;
  } | null>(null);
  const [commandStep, setCommandStep] = useState(0);
  const [selectedUser, setSelectedUser] = useState('');
  const [tipAmount, setTipAmount] = useState('');
  const [isSelectionMode, setIsSelectionMode] = useState(false);
  const [selectedMessages, setSelectedMessages] = useState<string[]>([]);
  const [messagesState, setMessages] = useState<Message[]>(messages);
  const [activeTribesState, setActiveTribes] = useState<Tribe[]>(activeTribes);
  const [activeTribe, setActiveTribe] = useState<string>('1');
  const [isTribesCollapsed, setIsTribesCollapsed] = useState(false);

  const flatListRef = useRef<FlatList>(null);
  const slideAnim = useRef(new Animated.Value(0)).current;

  const getAvailableUsers = () => {
    const currentTribeMessages = messagesState.filter(
      (m) => m.tribeId === activeTribe
    );
    const users = [...new Set(currentTribeMessages.map((m) => m.sender))];
    return users.filter((user) => user !== 'You');
  };

  useEffect(() => {
    if (showCommandPopup) {
      Animated.spring(slideAnim, {
        toValue: 1,
        useNativeDriver: true,
        tension: 100,
        friction: 8,
      }).start();
    } else {
      Animated.spring(slideAnim, {
        toValue: 0,
        useNativeDriver: true,
        tension: 100,
        friction: 8,
      }).start();
    }
  }, [showCommandPopup]);

  const handleInputChange = (text: string) => {
    setMessage(text);
    if (text.startsWith('/')) {
      if (!showCommandPopup) {
        setShowCommandPopup(true);
        setCommandStep(0);
      }
    } else if (showCommandPopup && !text.startsWith('/')) {
      setShowCommandPopup(false);
      resetCommandState();
    }
  };

  const resetCommandState = () => {
    setCurrentCommand('');
    setCurrentCommandObj(null);
    setCommandStep(0);
    setSelectedUser('');
    setTipAmount('');
  };

  // Inside ChatScreen.tsx
  const scrollToMessage = (messageId: string) => {
    const index = messagesState.findIndex((msg) => msg.id === messageId);
    if (index !== -1) {
      flatListRef.current?.scrollToIndex({
        index,
        animated: true,
        viewPosition: 0.5, // Center the message in the view
      });
    }
  };

  const handleCommandSelect = (command: {
    command: string;
    needsTarget?: boolean;
    needsAmount?: boolean;
  }) => {
    setCurrentCommand(command.command);
    setCurrentCommandObj(command);
    setMessage(command.command + ' ');
    if (command.needsTarget) {
      setCommandStep(1);
    } else {
      executeCommand(command.command, '', '');
    }
  };

  const handleUserSelect = (user: string) => {
    setSelectedUser(user);
    if (currentCommandObj && currentCommandObj.needsAmount) {
      setCommandStep(2);
      setMessage(`${currentCommand} @${user} `);
    } else {
      executeCommand(currentCommand, user, '');
    }
  };

  const handleAmountSubmit = () => {
    if (tipAmount.trim()) {
      executeCommand(currentCommand, selectedUser, tipAmount);
    }
  };

  const executeCommand = (command: string, target: string, amount: string) => {
    let commandText = command;
    let commandData: Partial<Message> = {
      isCommand: true,
      commandType: command.replace('/', ''),
    };

    if (target) {
      commandText += ` @${target}`;
      commandData.target = target;
    }

    if (amount) {
      commandText += ` ${amount} $VIBE`;
      commandData.amount = parseInt(amount);
    }

    if (command === '/roll') {
      const rollResult = Math.floor(Math.random() * 6) + 1;
      commandData.result = rollResult.toString();
      commandText = '/roll';
    }

    const newMessage: Message = {
      id: (messagesState.length + 1).toString(),
      text: commandText,
      sender: 'You',
      time: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
      tribeId: activeTribe,
      replyTo: replyingTo,
      ...commandData,
    };

    setMessages([...messagesState, newMessage]);
    setMessage('');
    setReplyingTo(null);
    setShowCommandPopup(false);
    resetCommandState();

    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  const handleReply = (messageToReply: Message) => {
    setReplyingTo({
      id: messageToReply.id,
      text: messageToReply.text,
      sender: messageToReply.sender,
    });
  };

  const handleLike = (messageId: string) => {
    console.log('Liked message:', messageId);
  };

  const handleMessageSelect = (messageId: string) => {
    if (!isSelectionMode) {
      setIsSelectionMode(true);
      setSelectedMessages([messageId]);
    } else {
      setSelectedMessages((prev) => {
        if (prev.includes(messageId)) {
          const newSelection = prev.filter((id) => id !== messageId);
          if (newSelection.length === 0) {
            setIsSelectionMode(false);
          }
          return newSelection;
        } else {
          return [...prev, messageId];
        }
      });
    }
  };

  const exitSelectionMode = () => {
    setIsSelectionMode(false);
    setSelectedMessages([]);
  };

  const handleDeleteMessages = () => {
    Alert.alert(
      'Delete Messages',
      `Are you sure you want to delete ${selectedMessages.length} message${
        selectedMessages.length > 1 ? 's' : ''
      }?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            setMessages((prev) =>
              prev.filter((msg) => !selectedMessages.includes(msg.id))
            );
            exitSelectionMode();
          },
        },
      ]
    );
  };

  const handleForwardMessages = () => {
    Alert.alert('Forward', 'Forward functionality would be implemented here');
    exitSelectionMode();
  };

  const handleCopyMessages = () => {
    const selectedMsgs = messagesState.filter((msg) =>
      selectedMessages.includes(msg.id)
    );
    const textToCopy = selectedMsgs
      .map((msg) => `${msg.sender}: ${msg.text}`)
      .join('\n');
    Alert.alert(
      'Copied',
      `${selectedMessages.length} message${
        selectedMessages.length > 1 ? 's' : ''
      } copied to clipboard`
    );
    exitSelectionMode();
  };

  const handleReplyToSelected = () => {
    if (selectedMessages.length === 1) {
      const messageToReply = messagesState.find(
        (msg) => msg.id === selectedMessages[0]
      );
      if (messageToReply) {
        handleReply(messageToReply);
        exitSelectionMode();
      }
    }
  };

  const cancelReply = () => {
    setReplyingTo(null);
  };

  const handleSend = () => {
    if (message.trim() === '') return;
    if (message.startsWith('/') && showCommandPopup) {
      return;
    }

    const newMessage: Message = {
      id: (messagesState.length + 1).toString(),
      text: message,
      sender: 'You',
      time: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
      tribeId: activeTribe,
      isCommand: false,
      replyTo: replyingTo,
    };

    setMessages([...messagesState, newMessage]);
    setMessage('');
    setReplyingTo(null);

    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  const switchTribe = (tribeId: string) => {
    setActiveTribe(tribeId);
    setReplyingTo(null);
    setShowCommandPopup(false);
    resetCommandState();
    exitSelectionMode();

    setActiveTribes((tribes) =>
      tribes.map((tribe) =>
        tribe.id === tribeId
          ? { ...tribe, hasUnread: false, unreadCount: 0 }
          : tribe
      )
    );
  };

  const toggleTribesCollapse = () => {
    setIsTribesCollapsed(!isTribesCollapsed);
  };

  const getActiveTribeName = () => {
    const tribe = activeTribesState.find((t) => t.id === activeTribe);
    return tribe ? tribe.name : '';
  };

  const renderSelectionHeader = () => {
    if (!isSelectionMode) return null;

    return (
      <View style={styles.selectionHeader}>
        <View style={styles.selectionHeaderLeft}>
          <TouchableOpacity
            onPress={exitSelectionMode}
            style={styles.selectionCloseButton}
          >
            <X size={24} color={Colors.text.primary} />
          </TouchableOpacity>
          <Text style={styles.selectionCount}>
            {selectedMessages.length} selected
          </Text>
        </View>

        <View style={styles.selectionActions}>
          {selectedMessages.length === 1 && (
            <TouchableOpacity
              onPress={handleReplyToSelected}
              style={styles.selectionActionButton}
            >
              <Copy size={20} color={Colors.text.primary} />
            </TouchableOpacity>
          )}

          <TouchableOpacity
            onPress={handleForwardMessages}
            style={styles.selectionActionButton}
          >
            <Forward size={20} color={Colors.text.primary} />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleDeleteMessages}
            style={styles.selectionActionButton}
          >
            <Trash2 size={20} color={Colors.accent.orange} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderReplyBar = () => {
    if (!replyingTo) return null;

    const truncateText = (text: string, maxLength = 45) => {
      if (text.length <= maxLength) return text;
      return text.substring(0, maxLength).trim() + '...';
    };

    return (
      <TouchableOpacity
        onPress={() => scrollToMessage(replyingTo.id)}
        activeOpacity={0.7}
      >
        <View style={styles.replyBar}>
          <View style={styles.replyBarContent}>
            <View style={styles.replyBarLeft}>
              <View style={styles.replyBarLine} />
              <View style={styles.replyBarText}>
                <Text style={styles.replyBarSender}>
                  Replying to {replyingTo.sender}
                </Text>
                <Text style={styles.replyBarMessage} numberOfLines={1}>
                  {truncateText(replyingTo.text)}
                </Text>
              </View>
            </View>
            <TouchableOpacity
              onPress={cancelReply}
              style={styles.replyBarClose}
            >
              <X size={20} color={Colors.text.secondary} />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.keyboardAvoidingView}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : -70}
    >
      <ScreenWrapper>
        {isSelectionMode ? (
          renderSelectionHeader()
        ) : (
          <Header
            title={getActiveTribeName()}
            rightElement={
              <TouchableOpacity onPress={toggleTribesCollapse}>
                {isTribesCollapsed ? (
                  <ChevronDown size={24} color={Colors.text.primary} />
                ) : (
                  <ChevronUp size={24} color={Colors.text.primary} />
                )}
              </TouchableOpacity>
            }
          />
        )}

        {!isTribesCollapsed && !isSelectionMode && (
          <View style={styles.tribesContainer}>
            <FlatList
              horizontal
              data={activeTribesState}
              keyExtractor={(item) => item.id}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.tribesList}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.tribeItem,
                    activeTribe === item.id && styles.activeTribeItem,
                  ]}
                  onPress={() => switchTribe(item.id)}
                >
                  <View style={styles.tribeImageContainer}>
                    <Image
                      source={{ uri: item.imageUrl }}
                      style={styles.tribeImage}
                    />
                    {item.hasUnread && (
                      <View style={styles.unreadBadge}>
                        <Text style={styles.unreadText}>
                          {item.unreadCount}
                        </Text>
                      </View>
                    )}
                  </View>
                  <Text
                    style={[
                      styles.tribeName,
                      activeTribe === item.id && styles.activeTribeName,
                    ]}
                    numberOfLines={1}
                  >
                    {item.name}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>
        )}

        <View style={styles.contentContainer}>
          {/* // In ChatScreen.tsx, inside the render return */}
          <FlatList
            ref={flatListRef}
            style={styles.chatContainer}
            data={messagesState.filter((m) => m.tribeId === activeTribe)}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={[
              styles.chatContent,
              isSelectionMode && styles.chatContentSelection,
            ]}
            renderItem={({ item }) => (
              <ChatBubble
                message={item}
                onReply={handleReply}
                onLike={handleLike}
                onSelect={handleMessageSelect}
                isSelected={selectedMessages.includes(item.id)}
                isSelectionMode={isSelectionMode}
                onReplyPreviewPress={scrollToMessage} // Add new prop
              />
            )}
            onLayout={() => {
              flatListRef.current?.scrollToEnd({ animated: true });
            }}
            onScrollToIndexFailed={(info) => {
              // Handle cases where the index is out of range
              console.warn('Scroll to index failed:', info);
            }}
          />
          {!isSelectionMode && renderReplyBar()}
          {!isSelectionMode && (
            <CommandPopup
              showCommandPopup={showCommandPopup}
              slideAnim={slideAnim}
              commandStep={commandStep}
              currentCommand={currentCommand}
              message={message}
              tipAmount={tipAmount}
              setTipAmount={setTipAmount}
              handleCommandSelect={handleCommandSelect}
              handleUserSelect={handleUserSelect}
              handleAmountSubmit={handleAmountSubmit}
              getAvailableUsers={getAvailableUsers}
            />
          )}
          {!isSelectionMode && (
            <InputBox
              message={message}
              setMessage={setMessage}
              replyingTo={replyingTo}
              onSend={handleSend}
              onInputChange={handleInputChange}
              showCommandPopup={showCommandPopup}
              onReplyPreviewPress={scrollToMessage} // Add new prop
            />
          )}
        </View>
      </ScreenWrapper>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  keyboardAvoidingView: {
    flex: 1,
    backgroundColor: Colors.background.primary,
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    marginBottom: 50,
  },
  selectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: Colors.background.secondary,
    borderBottomWidth: 1,
    borderBottomColor: Colors.background.tertiary,
  },
  selectionHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectionCloseButton: {
    padding: 4,
    marginRight: 12,
  },
  selectionCount: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: Colors.text.primary,
  },
  selectionActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectionActionButton: {
    padding: 8,
    marginLeft: 8,
  },
  tribesContainer: {
    height: 90,
    borderBottomWidth: 1,
    borderBottomColor: Colors.background.secondary,
  },
  tribesList: {
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  tribeItem: {
    alignItems: 'center',
    marginRight: 16,
    width: 70,
  },
  activeTribeItem: {},
  tribeImageContainer: {
    position: 'relative',
  },
  tribeImage: {
    width: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: 2,
    borderColor: Colors.background.secondary,
  },
  unreadBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: Colors.accent.orange,
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  unreadText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 10,
    color: Colors.text.primary,
  },
  tribeName: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: Colors.text.secondary,
    marginTop: 4,
    textAlign: 'center',
  },
  activeTribeName: {
    fontFamily: 'Poppins-SemiBold',
    color: Colors.text.primary,
  },
  chatContainer: {
    flex: 1,
  },
  chatContent: {
    padding: 16,
    paddingBottom: 8,
  },
  chatContentSelection: {
    paddingLeft: 56,
  },
  replyBar: {
    backgroundColor: Colors.background.secondary,
    borderTopWidth: 1,
    borderTopColor: Colors.background.tertiary,
  },
  replyBarContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 10,
    minHeight: 50,
  },
  replyBarLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 12,
  },
  replyBarLine: {
    width: 3,
    height: 32,
    backgroundColor: Colors.accent.blue,
    borderRadius: 1.5,
    marginRight: 12,
  },
  replyBarSender: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 12,
    color: Colors.accent.blue,
    marginBottom: 2,
    lineHeight: 16,
  },
  replyBarMessage: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: Colors.text.secondary,
    lineHeight: 16,
    opacity: 0.8,
  },
  replyBarClose: {
    padding: 4,
  },
});
