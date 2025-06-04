//ChatBubble.tsx
import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  PanResponder,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import { Award, Dice1 as Dice, Gift, Reply, Heart } from 'lucide-react-native';
import Colors from '@/constants/Colors';

type ChatBubbleProps = {
  message: {
    id: string;
    text: string;
    sender: string;
    time: string;
    isCommand: boolean;
    commandType?: string;
    target?: string;
    amount?: number;
    result?: string;
    replyTo?: {
      id: string;
      text: string;
      sender: string;
    };
    isLiked?: boolean;
    likeCount?: number;
  };
  onReply?: (message: any) => void;
  onLike?: (messageId: string) => void;
  onSelect?: (messageId: string) => void;
  isSelected?: boolean;
  isSelectionMode?: boolean;
  onReplyPreviewPress?: (messageId: string) => void; // Add new prop
};

export default function ChatBubble({
  message,
  onReply,
  onLike,
  onSelect,
  isSelected = false,
  isSelectionMode = false,
  onReplyPreviewPress,
}: ChatBubbleProps) {
  const isCurrentUser = message.sender === 'You';
  const translateX = useRef(new Animated.Value(0)).current;
  const replyIconOpacity = useRef(new Animated.Value(0)).current;
  const selectionScale = useRef(new Animated.Value(1)).current;
  const [isLiked, setIsLiked] = useState(message.isLiked || false);
  const [likeCount, setLikeCount] = useState(message.likeCount || 0);

  // Double tap detection for all messages (not just current user)
  const lastTap = useRef<number | null>(null);
  const longPressTimer = useRef<NodeJS.Timeout | null>(null);
  const DOUBLE_TAP_DELAY = 300;
  const LONG_PRESS_DELAY = 500;

  // Selection animation
  React.useEffect(() => {
    Animated.spring(selectionScale, {
      toValue: isSelected ? 0.95 : 1,
      useNativeDriver: true,
      tension: 150,
      friction: 8,
    }).start();
  }, [isSelected]);

  const handlePressIn = () => {
    if (isSelectionMode) return;

    // Start long press timer
    longPressTimer.current = setTimeout(() => {
      handleLongPress();
    }, LONG_PRESS_DELAY);
  };

  const handlePressOut = () => {
    // Clear long press timer
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
    }
  };

  const handlePress = () => {
    // Clear long press timer if still active
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
    }

    if (isSelectionMode) {
      // In selection mode, toggle selection
      if (onSelect) {
        onSelect(message.id);
      }
      return;
    }

    // Handle double tap for all messages (like functionality)
    const now = Date.now();
    if (lastTap.current && now - lastTap.current < DOUBLE_TAP_DELAY) {
      // Double tap detected
      handleLike();
      lastTap.current = null;
    } else {
      lastTap.current = now;
    }
  };

  const handleLongPress = () => {
    if (onSelect) {
      onSelect(message.id);
    }
  };

  const handleLike = () => {
    const newLikedState = !isLiked;
    setIsLiked(newLikedState);
    setLikeCount((prevCount) =>
      newLikedState ? prevCount + 1 : Math.max(0, prevCount - 1)
    );

    if (onLike) {
      onLike(message.id);
    }
  };

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) => {
        // Don't allow swipe in selection mode
        if (isSelectionMode) return false;

        // Only respond to horizontal swipes
        return (
          Math.abs(gestureState.dx) > Math.abs(gestureState.dy) &&
          Math.abs(gestureState.dx) > 10
        );
      },
      onPanResponderGrant: () => {
        // Clear long press timer when starting swipe
        if (longPressTimer.current) {
          clearTimeout(longPressTimer.current);
          longPressTimer.current = null;
        }
        // Set initial values when gesture starts
        translateX.setOffset(0);
      },
      onPanResponderMove: (_, gestureState) => {
        // Only allow right swipe (positive dx)
        const dx = Math.max(0, gestureState.dx);
        translateX.setValue(dx);

        // Show reply icon when dragging
        const opacity = Math.min(dx / 80, 1);
        replyIconOpacity.setValue(opacity);
      },
      onPanResponderRelease: (_, gestureState) => {
        const dx = Math.max(0, gestureState.dx);

        // If dragged far enough (80px), trigger reply
        if (dx > 80 && onReply) {
          onReply(message);
        }

        // Spring back to original position
        translateX.flattenOffset();
        Animated.parallel([
          Animated.spring(translateX, {
            toValue: 0,
            useNativeDriver: true,
            tension: 100,
            friction: 8,
          }),
          Animated.timing(replyIconOpacity, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true,
          }),
        ]).start();
      },
    })
  ).current;

  const renderCommandContent = () => {
    switch (message.commandType) {
      case 'cheer':
        return (
          <View style={styles.commandContent}>
            <Text style={styles.commandAction}>
              <Text style={styles.senderName}>{message.sender}</Text> cheered
              for <Text style={styles.targetName}>@{message.target}</Text>
            </Text>
            <View style={styles.cheerEmojis}>
              <Text style={styles.emoji}>🎉</Text>
              <Text style={styles.emoji}>👏</Text>
              <Text style={styles.emoji}>🔥</Text>
            </View>
          </View>
        );
      case 'roll':
        return (
          <View style={styles.commandContent}>
            <Text style={styles.commandAction}>
              <Text style={styles.senderName}>{message.sender}</Text> rolled the
              dice
            </Text>
            <View style={styles.rollResult}>
              <Dice size={20} color={Colors.accent.blue} />
              <Text style={styles.rollValue}>{message.result}</Text>
            </View>
          </View>
        );
      case 'tip':
        return (
          <View style={styles.commandContent}>
            <Text style={styles.commandAction}>
              <Text style={styles.senderName}>{message.sender}</Text> tipped{' '}
              <Text style={styles.targetName}>@{message.target}</Text>
            </Text>
            <View style={styles.tipAmount}>
              <Gift size={16} color={Colors.accent.orange} />
              <Text style={styles.tipValue}>{message.amount} $VIBE</Text>
            </View>
          </View>
        );
      default:
        return <Text style={styles.messageText}>{message.text}</Text>;
    }
  };

  const renderReplyPreview = () => {
    if (!message.replyTo) return null;

    // Truncate the reply text to keep it concise
    const truncateText = (text: string, maxLength: number = 60) => {
      if (text.length <= maxLength) return text;
      return text.substring(0, maxLength).trim() + '...';
    };

    return (
      <TouchableOpacity
        onPress={() => onReplyPreviewPress?.(message.replyTo!.id)}
        activeOpacity={0.7}
      >
        <View style={styles.replyPreview}>
          <View style={styles.replyLine} />
          <View style={styles.replyContent}>
            <Text style={styles.replySender}>{message.replyTo.sender}</Text>
            <Text style={styles.replyText} numberOfLines={1}>
              {truncateText(message.replyTo.text)}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const renderLikeButton = () => {
    if (message.isCommand || isSelectionMode) return null;

    // For current user messages, show like below the bubble if liked
    if (isCurrentUser) {
      if (!isLiked && likeCount === 0) return null;

      return (
        <View style={styles.currentUserLikeContainer}>
          <TouchableOpacity
            style={styles.likeButton}
            onPress={handleLike}
            activeOpacity={0.7}
          >
            <Heart
              size={14}
              color={isLiked ? Colors.accent.orange : Colors.text.secondary}
              fill={isLiked ? Colors.accent.orange : 'transparent'}
            />
            {likeCount > 0 && (
              <Text
                style={[styles.likeCount, isLiked && styles.likeCountActive]}
              >
                {likeCount}
              </Text>
            )}
          </TouchableOpacity>
        </View>
      );
    }

    // For other users, keep the existing positioning
    return (
      <View style={styles.otherUserLikeContainer}>
        <TouchableOpacity
          style={styles.likeButton}
          onPress={handleLike}
          activeOpacity={0.7}
        >
          <Heart
            size={14}
            color={isLiked ? Colors.accent.orange : Colors.text.secondary}
            fill={isLiked ? Colors.accent.orange : 'transparent'}
          />
          {likeCount > 0 && (
            <Text style={[styles.likeCount, isLiked && styles.likeCountActive]}>
              {likeCount}
            </Text>
          )}
        </TouchableOpacity>
      </View>
    );
  };

  const renderSelectionIndicator = () => {
    if (!isSelectionMode) return null;

    return (
      <View style={styles.selectionIndicator}>
        <View
          style={[
            styles.selectionCircle,
            isSelected && styles.selectionCircleSelected,
          ]}
        >
          {isSelected && <View style={styles.selectionCheckmark} />}
        </View>
      </View>
    );
  };

  if (message.isCommand) {
    return (
      <TouchableWithoutFeedback
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={handlePress}
      >
        <Animated.View
          style={[
            styles.commandContainer,
            { transform: [{ scale: selectionScale }] },
            isSelected && styles.selectedMessage,
          ]}
        >
          {renderSelectionIndicator()}
          <Text style={styles.commandText}>{message.text}</Text>
          {renderCommandContent()}
          <Text style={styles.timeText}>{message.time}</Text>
        </Animated.View>
      </TouchableWithoutFeedback>
    );
  }

  const swipeableContent = (
    <TouchableWithoutFeedback
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={handlePress}
    >
      <Animated.View
        style={[
          styles.container,
          isCurrentUser
            ? styles.currentUserContainer
            : styles.otherUserContainer,
          { transform: [{ scale: selectionScale }] },
          isSelected && styles.selectedMessage,
        ]}
      >
        {renderSelectionIndicator()}

        {!isCurrentUser && (
          <Text style={styles.senderName}>{message.sender}</Text>
        )}

        <View style={styles.messageWrapper}>
          <View
            style={[
              styles.bubble,
              isCurrentUser ? styles.currentUserBubble : styles.otherUserBubble,
              // Apply minimum width for messages with replies
              message.replyTo && styles.bubbleWithReply,
            ]}
          >
            {renderReplyPreview()}
            <Text
              style={[
                styles.messageText,
                isCurrentUser ? styles.currentUserText : styles.otherUserText,
              ]}
            >
              {message.text}
            </Text>
          </View>

          {/* Render like button for other users (positioned on bubble) */}
          {!isCurrentUser && renderLikeButton()}
        </View>

        {/* Render like button for current user (positioned below bubble) */}
        {isCurrentUser && renderLikeButton()}

        <Text style={styles.timeText}>{message.time}</Text>
      </Animated.View>
    </TouchableWithoutFeedback>
  );

  // Only allow swipe for incoming messages (not current user's messages) and not in selection mode
  if (isCurrentUser || !onReply || isSelectionMode) {
    return swipeableContent;
  }

  return (
    <View style={styles.swipeContainer}>
      {/* Reply icon background */}
      <Animated.View
        style={[styles.replyIconContainer, { opacity: replyIconOpacity }]}
      >
        <Reply size={24} color={Colors.accent.blue} />
      </Animated.View>

      {/* Swipeable message */}
      <Animated.View
        style={[styles.swipeableMessage, { transform: [{ translateX }] }]}
        {...panResponder.panHandlers}
      >
        {swipeableContent}
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  swipeContainer: {
    position: 'relative',
  },
  replyIconContainer: {
    position: 'absolute',
    right: 16,
    top: '50%',
    transform: [{ translateY: -12 }],
    zIndex: 1,
  },
  swipeableMessage: {
    backgroundColor: 'transparent',
  },
  container: {
    marginBottom: 16,
    maxWidth: '80%',
    position: 'relative',
  },
  currentUserContainer: {
    alignSelf: 'flex-end',
    alignItems: 'flex-end',
  },
  otherUserContainer: {
    alignSelf: 'flex-start',
    alignItems: 'flex-start',
  },
  selectedMessage: {
    backgroundColor: Colors.accent.blue + '15',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginHorizontal: -8,
    marginVertical: -4,
  },
  selectionIndicator: {
    position: 'absolute',
    left: -32,
    top: '50%',
    transform: [{ translateY: -12 }],
    zIndex: 2,
  },
  selectionCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: Colors.text.secondary,
    backgroundColor: Colors.background.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectionCircleSelected: {
    backgroundColor: Colors.accent.blue,
    borderColor: Colors.accent.blue,
  },
  selectionCheckmark: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.background.primary,
  },
  senderName: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 12,
    color: Colors.text.secondary,
    marginBottom: 4,
  },
  messageWrapper: {
    position: 'relative',
  },
  bubble: {
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 8,
    minWidth: 60, // Ensure minimum width for readability
  },
  // New style for bubbles containing reply previews
  bubbleWithReply: {
    minWidth: 200, // Set a comfortable minimum width for reply bubbles
  },
  currentUserBubble: {
    backgroundColor: Colors.accent.orange,
    borderBottomRightRadius: 4,
  },
  otherUserBubble: {
    backgroundColor: Colors.background.secondary,
    borderBottomLeftRadius: 4,
  },
  replyPreview: {
    flexDirection: 'row',
    marginBottom: 8,
    paddingBottom: 6,
    paddingTop: 2,
    borderBottomWidth: 1,
    borderBottomColor: Colors.text.secondary + '20',
    minHeight: 36, // Ensure consistent height
  },
  replyLine: {
    width: 3,
    backgroundColor: Colors.accent.blue,
    borderRadius: 1.5,
    marginRight: 8,
    minHeight: 32,
  },
  replyContent: {
    flex: 1,
    justifyContent: 'center',
  },
  replySender: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 11,
    color: Colors.accent.blue,
    marginBottom: 2,
    lineHeight: 14,
  },
  replyText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: Colors.text.primary,
    fontStyle: 'italic',
    lineHeight: 16,
    opacity: 0.8,
  },
  messageText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    lineHeight: 20,
  },
  currentUserText: {
    color: Colors.text.primary,
  },
  otherUserText: {
    color: Colors.text.primary,
  },
  timeText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 10,
    color: Colors.text.secondary,
    marginTop: 4,
  },
  // Like container for current user messages (positioned below bubble)
  currentUserLikeContainer: {
    alignSelf: 'flex-end',
    backgroundColor: Colors.background.primary,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.background.secondary,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    marginTop: 4,
    marginBottom: -4, // Adjust spacing with timestamp
  },
  // Like container for other user messages (positioned on bubble)
  otherUserLikeContainer: {
    position: 'absolute',
    top: -6,
    right: -8,
    backgroundColor: Colors.background.primary,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.background.secondary,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  likeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  likeCount: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 10,
    marginLeft: 4,
    color: Colors.text.secondary,
    minWidth: 8,
  },
  likeCountActive: {
    color: Colors.accent.orange,
  },
  commandContainer: {
    alignSelf: 'center',
    alignItems: 'center',
    marginVertical: 12,
    width: '90%',
    position: 'relative',
  },
  commandText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: Colors.text.secondary,
    marginBottom: 8,
  },
  commandContent: {
    backgroundColor: Colors.background.secondary,
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    width: '100%',
  },
  commandAction: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: Colors.text.primary,
    marginBottom: 8,
    textAlign: 'center',
  },
  targetName: {
    fontFamily: 'Poppins-SemiBold',
    color: Colors.accent.blue,
  },
  cheerEmojis: {
    flexDirection: 'row',
    marginTop: 4,
  },
  emoji: {
    fontSize: 20,
    marginHorizontal: 4,
  },
  rollResult: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background.tertiary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    marginTop: 4,
  },
  rollValue: {
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
    color: Colors.accent.blue,
    marginLeft: 8,
  },
  tipAmount: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background.tertiary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    marginTop: 4,
  },
  tipValue: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    color: Colors.accent.orange,
    marginLeft: 6,
  },
});
