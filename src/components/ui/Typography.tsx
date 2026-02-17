import React from 'react';
import { Text, StyleSheet, TextStyle } from 'react-native';
import { theme } from '../../theme';

interface TypographyProps {
  children: React.ReactNode;
  style?: TextStyle;
  variant?: 'h1' | 'h2' | 'h3' | 'body' | 'caption';
  color?: string;
  weight?: 'normal' | 'bold' | 'extra-bold' | 'black';
  align?: 'left' | 'center' | 'right';
  numberOfLines?: number;
}

export const Typography: React.FC<TypographyProps> = ({
  children,
  style,
  variant = 'body',
  color,
  weight,
  align,
  numberOfLines,
}) => {
  const getStyle = (): TextStyle => {
    let baseStyle: TextStyle = {};
    switch (variant) {
      case 'h1':
        baseStyle = theme.text.h1;
        break;
      case 'h2':
        baseStyle = theme.text.h2;
        break;
      case 'h3':
        baseStyle = theme.text.h3;
        break;
      case 'body':
        baseStyle = theme.text.body;
        break;
      case 'caption':
        baseStyle = theme.text.caption;
        break;
    }

    if (weight) {
      baseStyle.fontWeight = weight === 'extra-bold' ? '800' : weight === 'black' ? '900' : weight;
    }
    if (align) {
      baseStyle.textAlign = align;
    }

    return {
      ...baseStyle,
      color: color || theme.colors.text,
      ...style,
    };
  };

  return (
    <Text style={getStyle()} numberOfLines={numberOfLines}>
      {children}
    </Text>
  );
};
