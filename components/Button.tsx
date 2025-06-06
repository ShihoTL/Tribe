import React, { ReactNode } from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';
import Colors from '@/constants/Colors';

type ButtonProps = {
  title: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  disabled?: boolean;
  loading?: boolean;
  icon?: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
};

export default function Button({
  title,
  onPress,
  style,
  textStyle,
  disabled = false,
  loading = false,
  icon,
  variant = 'primary',
}: ButtonProps) {
  const getButtonStyle = () => {
    if (disabled) return styles.disabledButton;

    switch (variant) {
      case 'secondary':
        return styles.secondaryButton;
      case 'outline':
        return styles.outlineButton;
      default:
        return styles.primaryButton;
    }
  };

  const getTextStyle = () => {
    if (disabled) return styles.disabledButtonText;

    switch (variant) {
      case 'secondary':
        return styles.secondaryButtonText;
      case 'outline':
        return styles.outlineButtonText;
      default:
        return styles.primaryButtonText;
    }
  };

  return (
    <TouchableOpacity
      style={[styles.button, getButtonStyle(), style]}
      onPress={onPress}
      disabled={disabled || loading}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={
            variant === 'outline' ? Colors.accent.orange : Colors.text.primary
          }
        />
      ) : (
        <>
          {icon && <>{icon}</>}
          <Text
            style={[
              styles.buttonText,
              getTextStyle(),
              icon ? styles.buttonTextWithIcon : null,
              textStyle,
            ]}
          >
            {title}
          </Text>
        </>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 15,
  },
  primaryButton: {
    backgroundColor: Colors.accent.orange,
  },
  secondaryButton: {
    backgroundColor: Colors.accent.blue,
  },
  outlineButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: Colors.accent.orange,
  },
  disabledButton: {
    backgroundColor: Colors.background.secondary,
  },
  buttonText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
  },
  buttonTextWithIcon: {
    marginLeft: 8,
  },
  primaryButtonText: {
    color: Colors.text.primary,
  },
  secondaryButtonText: {
    color: Colors.text.primary,
  },
  outlineButtonText: {
    color: Colors.accent.orange,
  },
  disabledButtonText: {
    color: Colors.text.secondary,
  },
});
