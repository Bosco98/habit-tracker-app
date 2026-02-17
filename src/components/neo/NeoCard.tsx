import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { neoTheme } from '../../theme/neo';

interface NeoCardProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

export const NeoCard: React.FC<NeoCardProps> = ({ children, style }) => {
  return (
    <View style={[styles.card, style]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: neoTheme.colors.surfaceLight,
    borderWidth: neoTheme.borderWidth.thick,
    borderColor: neoTheme.colors.border,
    borderRadius: neoTheme.borderRadius.xl,
    padding: neoTheme.spacing.lg,
    ...neoTheme.shadows.neoLg,
  },
});
