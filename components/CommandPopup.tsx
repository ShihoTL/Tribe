import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Animated,
  PanResponder,
  ScrollView,
} from 'react-native';
import { Heart, Coins, Dice6, Zap, GripHorizontal } from 'lucide-react-native';
import Colors from '@/constants/Colors';

interface Command {
  command: string;
  icon: any;
  description: string;
  needsTarget: boolean;
  needsAmount: boolean;
}

interface CommandPopupProps {
  showCommandPopup: boolean;
  slideAnim: Animated.Value;
  commandStep: number;
  currentCommand: string;
  message: string;
  tipAmount: string;
  setTipAmount: (amount: string) => void;
  handleCommandSelect: (command: Command) => void;
  handleUserSelect: (user: string) => void;
  handleAmountSubmit: () => void;
  getAvailableUsers: () => string[];
}

const commands: Command[] = [
  {
    command: '/cheer',
    icon: Heart,
    description: 'Cheer for a user',
    needsTarget: true,
    needsAmount: false,
  },
  {
    command: '/tip',
    icon: Coins,
    description: 'Tip tokens to a user',
    needsTarget: true,
    needsAmount: true,
  },
  {
    command: '/roll',
    icon: Dice6,
    description: 'Roll a dice',
    needsTarget: false,
    needsAmount: false,
  },
  {
    command: '/boost',
    icon: Zap,
    description: 'Boost a message',
    needsTarget: true,
    needsAmount: false,
  },
];

const CommandPopup: React.FC<CommandPopupProps> = ({
  showCommandPopup,
  slideAnim,
  commandStep,
  currentCommand,
  message,
  tipAmount,
  setTipAmount,
  handleCommandSelect,
  handleUserSelect,
  handleAmountSubmit,
  getAvailableUsers,
}) => {
  const [popupHeight, setPopupHeight] = useState(200); // Default height
  const maxHeight = 400; // Maximum height when fully expanded
  const minHeight = 200; // Minimum height

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        // Only respond to vertical drags on the drag handle area
        return (
          Math.abs(gestureState.dy) > Math.abs(gestureState.dx) &&
          Math.abs(gestureState.dy) > 5
        );
      },
      onPanResponderMove: (evt, gestureState) => {
        // Calculate new height based on drag direction
        const newHeight = popupHeight - gestureState.dy;

        // Constrain height between min and max
        if (newHeight >= minHeight && newHeight <= maxHeight) {
          setPopupHeight(newHeight);
        }
      },
      onPanResponderRelease: (evt, gestureState) => {
        // Snap to nearest size based on drag velocity and distance
        const dragDistance = -gestureState.dy;
        const dragVelocity = -gestureState.vy;

        if (dragDistance > 50 || dragVelocity > 0.5) {
          // Expand to max height
          setPopupHeight(maxHeight);
        } else if (dragDistance < -50 || dragVelocity < -0.5) {
          // Collapse to min height
          setPopupHeight(minHeight);
        } else {
          // Snap to nearest height
          const midpoint = (minHeight + maxHeight) / 2;
          setPopupHeight(popupHeight > midpoint ? maxHeight : minHeight);
        }
      },
    })
  ).current;

  if (!showCommandPopup) return null;

  const availableUsers = getAvailableUsers();
  const filteredCommands = commands.filter(
    (cmd) =>
      cmd.command.toLowerCase().startsWith(message.toLowerCase()) ||
      message === '/'
  );

  const showDragHandle = commandStep === 0 || commandStep === 1; // Show drag handle for command list and user list

  return (
    <Animated.View
      style={[
        styles.commandPopup,
        {
          height: popupHeight,
          transform: [
            {
              translateY: slideAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [200, 0],
              }),
            },
          ],
          opacity: slideAnim,
        },
      ]}
    >
      {showDragHandle && (
        <View {...panResponder.panHandlers} style={styles.dragHandle}>
          <GripHorizontal size={20} color={Colors.text.secondary} />
        </View>
      )}

      <ScrollView
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={true}
        bounces={false}
      >
        {commandStep === 0 && (
          <View>
            <Text style={styles.popupTitle}>Commands</Text>
            {filteredCommands.map((cmd, index) => {
              const IconComponent = cmd.icon;
              return (
                <TouchableOpacity
                  key={index}
                  style={styles.commandItem}
                  onPress={() => handleCommandSelect(cmd)}
                >
                  <IconComponent size={20} color={Colors.accent.blue} />
                  <View style={styles.commandText}>
                    <Text style={styles.commandName}>{cmd.command}</Text>
                    <Text style={styles.commandDescription}>
                      {cmd.description}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        )}

        {commandStep === 1 && (
          <View>
            <Text style={styles.popupTitle}>Select User</Text>
            {availableUsers.map((user, index) => (
              <TouchableOpacity
                key={index}
                style={styles.userItem}
                onPress={() => handleUserSelect(user)}
              >
                <Text style={styles.userName}>@{user}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {commandStep === 2 && (
          <View>
            <Text style={styles.popupTitle}>Enter Amount</Text>
            <TextInput
              style={styles.amountInput}
              placeholder="Enter amount..."
              placeholderTextColor={Colors.text.secondary}
              value={tipAmount}
              onChangeText={setTipAmount}
              keyboardType="numeric"
              autoFocus
            />
            <TouchableOpacity
              style={styles.submitButton}
              onPress={handleAmountSubmit}
            >
              <Text style={styles.submitButtonText}>Send Tip</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  commandPopup: {
    position: 'absolute',
    bottom: 90,
    left: 16,
    right: 16,
    backgroundColor: Colors.background.primary,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
    borderWidth: 1,
    borderColor: Colors.background.secondary,
  },
  dragHandle: {
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.background.secondary,
  },
  scrollContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  popupTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    color: Colors.text.primary,
    marginBottom: 12,
    marginTop: 12,
  },
  commandItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  commandText: {
    marginLeft: 12,
    flex: 1,
  },
  commandName: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    color: Colors.text.primary,
  },
  commandDescription: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: Colors.text.secondary,
    marginTop: 2,
  },
  userItem: {
    paddingVertical: 8,
  },
  userName: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: Colors.accent.blue,
  },
  amountInput: {
    backgroundColor: Colors.background.secondary,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 12,
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: Colors.text.primary,
    marginTop: 12,
  },
  submitButton: {
    backgroundColor: Colors.accent.orange,
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
  },
  submitButtonText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    color: Colors.text.primary,
  },
});

export default CommandPopup;
