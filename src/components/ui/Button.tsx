import React, { useState } from 'react';
import { Pressable, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { theme } from '../../theme';

interface ButtonProps {
  onPress?: () => void;
  title: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  style?: ViewStyle;
  textStyle?: TextStyle;
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  onPress,
  title,
  variant = 'primary',
  size = 'md',
  style,
  textStyle,
  disabled,
}) => {
  const [isPressed, setIsPressed] = useState(false);

  const getBackgroundColor = () => {
    if (disabled) return '#E5E7EB';
    if (variant === 'primary') return theme.colors.primary;
    if (variant === 'secondary') return theme.colors.secondary;
    if (variant === 'outline') return 'transparent';
    if (variant === 'ghost') return 'transparent';
    return theme.colors.primary;
  };

  const getTextColor = () => {
    if (disabled) return '#9CA3AF';
    if (variant === 'primary') return '#FFFFFF';
    if (variant === 'secondary') return '#FFFFFF';
    if (variant === 'outline') return theme.colors.text;
    if (variant === 'ghost') return theme.colors.text;
    return '#FFFFFF';
  };

  const getBorderColor = () => {
    if (variant === 'ghost') return 'transparent';
    if (disabled) return '#D1D5DB';
    return theme.colors.border;
  };

  const getShadow = () => {
    if (variant === 'ghost' || disabled) return theme.shadows.none;
    return isPressed ? theme.shadows.pressed : theme.shadows.default;
  };

  return (
    <Pressable
      onPress={onPress}
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
      disabled={disabled}
      style={[
        styles.base,
        {
          backgroundColor: getBackgroundColor(),
          borderColor: getBorderColor(),
          borderWidth: variant === 'ghost' ? 0 : 2,
          paddingVertical: size === 'sm' ? 8 : size === 'md' ? 12 : 16,
          paddingHorizontal: size === 'sm' ? 16 : size === 'md' ? 24 : 32,
          opacity: disabled ? 0.7 : 1,
          ...getShadow(),
        },
        style,
      ]}
    >
      <Text
        style={[
          styles.text,
          {
            color: getTextColor(),
            fontSize: size === 'sm' ? 14 : size === 'md' ? 16 : 18,
          },
          textStyle,
        ]}
      >
        {title}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  base: {
    borderRadius: theme.borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontWeight: '700',
    fontFamily: 'System', // Use default font for now
  },
});
