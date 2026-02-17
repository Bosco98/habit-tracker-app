import React, { useState } from 'react';
import { TextInput, StyleSheet, View, Text, ViewStyle, TextInputProps, NativeSyntheticEvent, TextInputFocusEventData } from 'react-native';
import { neoTheme } from '../../theme/neo';

interface NeoInputProps extends TextInputProps {
  label?: string;
  error?: string;
  containerStyle?: ViewStyle;
}

export const NeoInput: React.FC<NeoInputProps> = ({
  label,
  error,
  containerStyle,
  style,
  onFocus,
  onBlur,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    setIsFocused(true);
    onFocus?.(e);
  };

  const handleBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    setIsFocused(false);
    onBlur?.(e);
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        style={[
          styles.input,
          isFocused ? styles.inputFocused : {},
          error ? { borderColor: neoTheme.colors.error } : {},
          style,
        ]}
        placeholderTextColor={neoTheme.colors.inputPlaceholder}
        onFocus={handleFocus}
        onBlur={handleBlur}
        {...props}
      />
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: neoTheme.spacing.md,
  },
  label: {
    marginBottom: neoTheme.spacing.sm,
    fontSize: 14,
    fontWeight: '900',
    color: neoTheme.colors.text,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  input: {
    borderWidth: neoTheme.borderWidth.thick,
    borderColor: neoTheme.colors.border,
    borderRadius: 0,
    padding: neoTheme.spacing.md,
    fontSize: 18,
    fontWeight: '700',
    backgroundColor: neoTheme.colors.surfaceLight,
    color: neoTheme.colors.text,
  },
  inputFocused: {
    ...neoTheme.shadows.neo,
  },
  error: {
    marginTop: neoTheme.spacing.xs,
    color: neoTheme.colors.error,
    fontSize: 12,
    fontWeight: '700',
  },
});
