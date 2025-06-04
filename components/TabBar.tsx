import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { Link, usePathname } from 'expo-router';
import Animated, {
  useAnimatedStyle,
  withSpring,
  withTiming,
  useSharedValue,
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

const tabs = [
  { href: '/', label: 'Chat', icon: IconMessageCircle },
  { href: '/tribes', label: 'Tribes', icon: IconUsers },
  { href: '/explore', label: 'Explore', icon: IconCompass },
  { href: '/quests', label: 'Quests', icon: IconAward },
  { href: '/profile', label: 'Profile', icon: IconUser },
];

export default function TabBar() {
  const insets = useSafeAreaInsets();
  const pathname = usePathname();
  const tabWidth = screenWidth / tabs.length;
  const dotSize = 6;

  const indicatorPosition = useSharedValue(0);

  // Find active tab index
  const activeIndex = tabs.findIndex((tab) => pathname === tab.href);

  React.useEffect(() => {
    const containerPadding = 8;
    const tabMargin = 2;
    const effectiveTabWidth =
      (screenWidth - containerPadding * 2) / tabs.length;

    const centeredPosition =
      containerPadding +
      activeIndex * effectiveTabWidth +
      effectiveTabWidth / 2 -
      dotSize / 2;

    indicatorPosition.value = withSpring(centeredPosition, {
      damping: 15,
      stiffness: 150,
    });
  }, [activeIndex, dotSize]);

  const indicatorStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: indicatorPosition.value }],
  }));

  const renderTab = (tab: (typeof tabs)[0], index: number) => {
    const isActive = pathname === tab.href;
    const Icon = tab.icon;

    const animatedIconStyle = useAnimatedStyle(() => ({
      transform: [
        {
          scale: withSpring(isActive ? 1.1 : 1, {
            damping: 12,
            stiffness: 200,
          }),
        },
        {
          translateY: withSpring(isActive ? -2 : 0, {
            damping: 12,
            stiffness: 200,
          }),
        },
      ],
    }));

    const animatedTextStyle = useAnimatedStyle(() => ({
      opacity: withTiming(isActive ? 1 : 0.7, { duration: 200 }),
      transform: [
        {
          scale: withSpring(isActive ? 1 : 0.9, {
            damping: 12,
            stiffness: 200,
          }),
        },
      ],
    }));

    const animatedContainerStyle = useAnimatedStyle(() => ({
      backgroundColor: isActive ? `${Colors.accent.orange}15` : 'transparent',
    }));

    const color = isActive ? Colors.accent.orange : Colors.text.secondary;

    return (
      <Link key={tab.href} href={tab.href} asChild>
        <TouchableOpacity style={styles.tabItem} activeOpacity={0.7}>
          <Animated.View style={[styles.tabItemInner, animatedContainerStyle]}>
            <Animated.View style={[styles.iconContainer, animatedIconStyle]}>
              <Icon size={22} color={color} stroke={color} />
            </Animated.View>

            <Animated.Text style={[styles.label, { color }, animatedTextStyle]}>
              {tab.label}
            </Animated.Text>
          </Animated.View>
        </TouchableOpacity>
      </Link>
    );
  };

  return (
    <View style={[styles.wrapper, { paddingBottom: insets.bottom }]}>
      <View style={styles.container}>
        {/* Animated dot indicator */}
        <Animated.View
          style={[
            styles.indicator,
            indicatorStyle,
            {
              width: dotSize,
              height: dotSize,
              borderRadius: dotSize / 2,
            },
          ]}
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
    backgroundColor: 'transparent',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  container: {
    backgroundColor: Colors.background.primary,
    borderTopColor: Colors.background.secondary,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowOffset: { width: 0, height: -5 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 15,
    overflow: 'hidden',
  },
  tabContainer: {
    flexDirection: 'row',
    height: 70,
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingTop: 8,
    backgroundColor: `${Colors.background.primary}95`,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  tabItem: {
    flex: 1,
  },
  tabItemInner: {
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
    top: 6,
    backgroundColor: Colors.accent.orange,
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
