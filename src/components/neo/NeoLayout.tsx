import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { neoTheme } from '../../theme/neo';
import { Svg, Defs, Pattern, Circle, Rect } from 'react-native-svg';

interface NeoLayoutProps {
  children: React.ReactNode;
}

const { width, height } = Dimensions.get('window');

export const NeoLayout: React.FC<NeoLayoutProps> = ({ children }) => {
  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      {/* Background Pattern */}
      <View style={StyleSheet.absoluteFill}>
        <Svg height="100%" width="100%">
          <Defs>
            <Pattern
              id="dotPattern"
              x="0"
              y="0"
              width="20"
              height="20"
              patternUnits="userSpaceOnUse"
            >
              <Circle cx="1" cy="1" r="1" fill="#d1d5db" />
            </Pattern>
          </Defs>
          <Rect x="0" y="0" width="100%" height="100%" fill="url(#dotPattern)" />
        </Svg>
      </View>

      {/* Decorative Shapes */}
      <View style={styles.circleTopLeft} />
      <View style={styles.circleBottomRight} />

      <SafeAreaView style={styles.safeArea}>
        <View style={styles.content}>
          {children}
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: neoTheme.colors.backgroundLight,
    overflow: 'hidden',
  },
  safeArea: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: neoTheme.spacing.lg,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  circleTopLeft: {
    position: 'absolute',
    top: -20,
    left: -20,
    width: 128,
    height: 128,
    borderRadius: 64,
    backgroundColor: neoTheme.colors.secondary,
    borderWidth: 4,
    borderColor: neoTheme.colors.border,
    zIndex: 0,
  },
  circleBottomRight: {
    position: 'absolute',
    bottom: 40,
    right: -30,
    width: 192,
    height: 192,
    borderRadius: 96,
    backgroundColor: neoTheme.colors.accent,
    borderWidth: 4,
    borderColor: neoTheme.colors.border,
    zIndex: 0,
  },
});
