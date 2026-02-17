import React, { useState } from 'react';
import { Pressable, Text, StyleSheet, ViewStyle, TextStyle, View } from 'react-native';
import { neoTheme } from '../../theme/neo';

interface NeoButtonProps {
  onPress?: () => void;
  title: string;
  variant?: 'primary' | 'secondary' | 'google' | 'ghost';
  style?: ViewStyle;
  textStyle?: TextStyle;
  disabled?: boolean;
  icon?: React.ReactNode;
}

export const NeoButton: React.FC<NeoButtonProps> = ({
  onPress,
  title,
  variant = 'primary',
  style,
  textStyle,
  disabled,
  icon,
}) => {
  const [isPressed, setIsPressed] = useState(false);

  const getBackgroundColor = () => {
    if (disabled) return '#E5E7EB';
    if (variant === 'primary') return neoTheme.colors.primary;
    if (variant === 'secondary') return neoTheme.colors.secondary;
    if (variant === 'google') return neoTheme.colors.google;
    if (variant === 'ghost') return 'transparent';
    return neoTheme.colors.primary;
  };

  const getTextColor = () => {
    if (disabled) return '#9CA3AF';
    if (variant === 'primary') return '#FFFFFF';
    if (variant === 'secondary') return '#000000';
    if (variant === 'google') return '#000000';
    if (variant === 'ghost') return neoTheme.colors.text;
    return '#000000';
  };

  const getBorderWidth = () => {
      if (variant === 'ghost') return 0;
      return neoTheme.borderWidth.thick;
  }

  const getShadow = () => {
    if (variant === 'ghost' || disabled) return neoTheme.shadows.none;
    return isPressed ? neoTheme.shadows.none : neoTheme.shadows.neo;
  };

  const getTransform = () => {
      if (variant === 'ghost' || disabled) return [];
      return isPressed ? [{ translateX: 4 }, { translateY: 4 }] : [];
  }

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
          borderColor: neoTheme.colors.border,
          borderWidth: getBorderWidth(),
          ...getShadow(),
          transform: getTransform() as any, // Cast to any to avoid complex type issues with transforms
        },
        style,
      ]}
    >
      <View style={styles.contentContainer}>
        {icon && <View style={styles.iconContainer}>{icon}</View>}
        <Text
          style={[
            styles.text,
            {
              color: getTextColor(),
            },
            textStyle,
          ]}
        >
          {title}
        </Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  base: {
    borderRadius: neoTheme.borderRadius.md,
    paddingVertical: 16,
    paddingHorizontal: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
  },
  iconContainer: {
      marginRight: 12,
  },
  text: {
    ...neoTheme.text.button,
  },
});
