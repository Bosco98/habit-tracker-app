import React from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { neoTheme } from '../../theme/neo';

export function NeoTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom + 20 }]}>
      <View style={styles.pill}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name, route.params);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          return (
            <Pressable
              key={route.key}
              onPress={onPress}
              onLongPress={onLongPress}
              accessibilityRole="button"
              accessibilityLabel={options.title || route.name}
              style={[
                styles.tabItem,
                isFocused && styles.activeTabItem,
              ]}
            >
              {options.tabBarIcon?.({
                focused: isFocused,
                color: isFocused ? neoTheme.colors.text : neoTheme.colors.inputPlaceholder,
                size: 24,
              })}
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    pointerEvents: 'box-none',
  },
  pill: {
    flexDirection: 'row',
    backgroundColor: neoTheme.colors.backgroundLight,
    borderRadius: neoTheme.borderRadius.full,
    borderWidth: neoTheme.borderWidth.thin,
    borderColor: neoTheme.colors.border,
    paddingVertical: 12,
    paddingHorizontal: 12,
    width: '85%',
    justifyContent: 'space-around',
    alignItems: 'center',
    ...neoTheme.shadows.neo,
    pointerEvents: 'auto',
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    width: 50,
    height: 50,
    borderRadius: neoTheme.borderRadius.full,
  },
  activeTabItem: {
    backgroundColor: neoTheme.colors.highlight,
    borderWidth: neoTheme.borderWidth.thin,
    borderColor: neoTheme.colors.border,
    transform: [{ translateY: -20 }],
    shadowColor: neoTheme.colors.shadow,
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 5,
  },
});
