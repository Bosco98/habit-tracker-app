import React from 'react';
import { View, Pressable, StyleSheet, Dimensions } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { theme } from '../../theme';
import { Home, List, Users, User } from 'lucide-react-native';

const icons: Record<string, any> = {
  tracker: Home,
  programs: List,
  cohorts: Users,
  profile: User,
};

export const TabBar: React.FC<BottomTabBarProps> = ({ state, descriptors, navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
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
              navigation.navigate(route.name);
            }
          };

          const Icon = icons[route.name] || Home;

          return (
            <Pressable
              key={route.key}
              onPress={onPress}
              style={[
                styles.tabItem,
                isFocused && styles.tabItemFocused
              ]}
            >
              {isFocused && <View style={styles.activeIndicator} />}
              <Icon
                size={24}
                color={isFocused ? '#000000' : '#9CA3AF'} // Black active, Gray inactive
                strokeWidth={isFocused ? 2.5 : 2}
              />
            </Pressable>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 40, // Pill shape
    borderWidth: 3,
    borderColor: '#000000',
    paddingVertical: 10,
    paddingHorizontal: 20,
    width: Dimensions.get('window').width - 40, // dynamic width with margins
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 5,
  },
  tabItem: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabItemFocused: {
    // Lift active item slightly?
    transform: [{ translateY: -15 }],
  },
  activeIndicator: {
    position: 'absolute',
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: theme.colors.buttonYellow, // Yellow
    borderWidth: 2,
    borderColor: '#000000',
    zIndex: -1,
    shadowColor: '#000000',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 0,
  }
});
