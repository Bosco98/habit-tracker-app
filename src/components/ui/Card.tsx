import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { theme } from '../../theme';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  variant?: 'default' | 'flat';
  onPress?: () => void;
}

export const Card: React.FC<CardProps> = ({ children, style, variant = 'default', onPress }) => {
  return (
    <View
      style={[
        styles.card,
        {
          borderColor: theme.colors.border,
          borderWidth: 2,
          borderRadius: theme.borderRadius.lg,
          padding: theme.spacing.md,
          backgroundColor: theme.colors.surface,
          shadowColor: theme.shadows.default.shadowColor,
          shadowOffset: variant === 'flat' ? { width: 0, height: 0 } : theme.shadows.default.shadowOffset,
          shadowOpacity: variant === 'flat' ? 0 : 1,
          shadowRadius: 0,
          elevation: variant === 'flat' ? 0 : 4,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: theme.spacing.md,
  },
});
