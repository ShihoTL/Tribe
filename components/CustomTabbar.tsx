import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  withSpring,
  withTiming,
  interpolate,
  useSharedValue,
  runOnJS,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  IconMessageCircle,
  IconUsers,
  IconCompass,
  IconAward,
  IconUser,
} from '@tabler/icons-react-native';
import Colors from '@/constants/Colors';

const { width: screenWidth } = Dimensions.get('window');

interface TabItem {
  key: string;
  title: string;
  icon: React.ComponentType<{ size?: number; color?: string; stroke?: string }>;
}

const tabs: TabItem[] = [
  { key: 'index', title: 'Chat', icon: IconMessageCircle },
  { key: 'tribes', title: 'Tribes', icon: IconUsers },
  { key: 'explore', title: 'Explore', icon: IconCompass },
  { key: 'quests', title: 'Quests', icon: IconAward },
  { key: 'profile', title: 'Profile', icon: IconUser },
];

interface CustomTabBarProps {
  state: any;
  descriptors: any;
  navigation: any;
}

const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity);

export default function CustomTabBar({
  state,
  descriptors,
  navigation,
}: CustomTabBarProps) {
  const insets = useSafeAreaInsets();
  const tabWidth = screenWidth / tabs.length;

  const indicatorPosition = useSharedValue(0);

  React.useEffect(() => {
    indicatorPosition.value = withSpring(state.index * tabWidth, {
      damping: 15,
      stiffness: 150,
    });
  }, [state.index, tabWidth]);

  const indicatorStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: indicatorPosition.value }],
  }));

  const renderTab = (tab: TabItem, index: number) => {
    const { options } = descriptors[state.routes[index].key];
    const isFocused = state.index === index;

    const onPress = () => {
      const event = navigation.emit({
        type: 'tabPress',
        target: state.routes[index].key,
        canPreventDefault: true,
      });

      if (!isFocused && !event.defaultPrevented) {
        navigation.navigate(state.routes[index].name);
      }
    };

    const onLongPress = () => {
      navigation.emit({
        type: 'tabLongPress',
        target: state.routes[index].key,
      });
    };

    const animatedIconStyle = useAnimatedStyle(() => ({
      transform: [
        {
          scale: withSpring(isFocused ? 1.1 : 1, {
            damping: 12,
            stiffness: 200,
          }),
        },
        {
          translateY: withSpring(isFocused ? -2 : 0, {
            damping: 12,
            stiffness: 200,
          }),
        },
      ],
    }));

    const animatedTextStyle = useAnimatedStyle(() => ({
      opacity: withTiming(isFocused ? 1 : 0.7, { duration: 200 }),
      transform: [
        {
          scale: withSpring(isFocused ? 1 : 0.9, {
            damping: 12,
            stiffness: 200,
          }),
        },
      ],
    }));

    const animatedContainerStyle = useAnimatedStyle(() => ({
      backgroundColor: isFocused ? `${Colors.accent.orange}15` : 'transparent',
    }));

    return (
      <AnimatedTouchableOpacity
        key={tab.key}
        accessibilityRole="button"
        accessibilityState={isFocused ? { selected: true } : {}}
        accessibilityLabel={options.tabBarAccessibilityLabel}
        testID={options.tabBarTestID}
        onPress={onPress}
        onLongPress={onLongPress}
        style={[styles.tabItem, animatedContainerStyle]}
        activeOpacity={0.7}
      >
        <Animated.View style={[styles.iconContainer, animatedIconStyle]}>
          <tab.icon
            size={22}
            color={isFocused ? Colors.accent.orange : Colors.text.secondary}
            stroke={isFocused ? Colors.accent.orange : Colors.text.secondary}
          />
        </Animated.View>

        <Animated.Text
          style={[
            styles.label,
            {
              color: isFocused ? Colors.accent.orange : Colors.text.secondary,
            },
            animatedTextStyle,
          ]}
        >
          {tab.title}
        </Animated.Text>
      </AnimatedTouchableOpacity>
    );
  };

  return (
    <View style={[styles.wrapper, { paddingBottom: insets.bottom }]}>
      <View style={styles.container}>
        {/* Animated indicator */}
        <Animated.View
          style={[styles.indicator, indicatorStyle, { width: tabWidth }]}
        />

        {/* Tab items */}
        <View style={styles.tabContainer}>
          {tabs.map((tab, index) => renderTab(tab, index))}
        </View>

        {/* Bottom accent line */}
        <View style={styles.accentLine} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: Colors.background.secondary,
  },
  container: {
    backgroundColor: 'transparent',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: Colors.accent.blue,
    shadowOffset: { width: 0, height: -5 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 15,
    overflow: 'hidden',
  },
  backgroundBlur: {
    display: 'none',
  },
  tabContainer: {
    flexDirection: 'row',
    height: 70,
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingTop: 8,
    backgroundColor: Colors.background.secondary,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 4,
    borderRadius: 16,
    marginHorizontal: 2,
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  label: {
    fontFamily: 'Poppins-Medium',
    fontSize: 10,
    fontWeight: '500',
    textAlign: 'center',
  },
  indicator: {
    position: 'absolute',
    top: 12,
    height: 3,
    backgroundColor: Colors.accent.orange,
    borderRadius: 2,
    shadowColor: Colors.accent.orange,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 4,
    elevation: 5,
  },
  accentLine: {
    height: 1,
    backgroundColor: `${Colors.accent.orange}20`,
    marginHorizontal: 20,
    marginBottom: 4,
  },
});
