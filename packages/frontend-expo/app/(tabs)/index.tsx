import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, {
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import { Index } from '@/components/HomeHeader';
import { LinearGradient } from 'expo-linear-gradient';
import { HomeBanner } from '@/components/HomeBanner/HomeBanner';

const HEADER_HEIGHT = 280; // 헤더 기본 높이

export default function HomeScreen() {
  const scrollY = useSharedValue(0);

  // 스크롤 이벤트 핸들러
  const scrollHandler = useAnimatedScrollHandler((event) => {
    scrollY.value = event.contentOffset.y;
  });

  // 헤더 애니메이션 스타일
  const headerAnimatedStyle = useAnimatedStyle(() => {
    const height = interpolate(
      scrollY.value,
      [0, HEADER_HEIGHT],
      [HEADER_HEIGHT, 60]
    );
    const opacity = interpolate(
      scrollY.value,
      [0, HEADER_HEIGHT / 1.5],
      [1, 0]
    );
    const scale = interpolate(scrollY.value, [0, HEADER_HEIGHT], [1, 0.8]);

    return {
      height,
      opacity,
      transform: [{ scale }],
    };
  });

  return (
    <LinearGradient
      style={styles.container}
      colors={[
        'rgba(107,173,232,0.75)',
        'rgba(107,173,232,0.75)',
        '#fff',
        '#fff',
      ]}
      locations={[0, 0.25, 0.75, 1]}
    >
      {/* 헤더 이미지 */}
      <Animated.View style={[styles.header, headerAnimatedStyle]}>
        <Index />
      </Animated.View>

      {/* 스크롤 가능 콘텐츠 */}
      <Animated.ScrollView
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        contentContainerStyle={styles.contentContainer}
      >
        <View style={styles.content}>
          <HomeBanner image={require('@/assets/images/banner_chat.png')} />
          <HomeBanner image={require('@/assets/images/banner_center.png')} />
          <HomeBanner image={require('@/assets/images/banner_diary.png')} />
          <HomeBanner image={require('@/assets/images/banner_music.png')} />
        </View>
      </Animated.ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(107,173,232,0.75)',
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    zIndex: 0, // 콘텐츠 위에 오도록 설정
    overflow: 'hidden',
  },
  headerImage: {
    width: '100%',
    height: '100%',
  },
  contentContainer: {
    paddingTop: HEADER_HEIGHT, // 콘텐츠가 헤더 아래에서 시작되도록 설정
  },
  content: {
    flex: 1,
    padding: 16,
    gap: 16,
    backgroundColor: '#fafafa',
  },
  text: {
    fontSize: 18,
    marginVertical: 10,
  },
});
