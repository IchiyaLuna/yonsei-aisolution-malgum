import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function SunnyIcon() {
  const rotation = useSharedValue(0); // 회전 각도를 저장하는 애니메이션 값

  // 컴포넌트가 마운트될 때 회전 애니메이션 시작
  useEffect(() => {
    rotation.value = withRepeat(
      withTiming(360, {
        duration: 6 * 1000, // 2초에 한 번 회전
        easing: Easing.linear,
      }),
      -1, // 무한 반복
      false
    );
  }, []);

  // 회전 애니메이션 스타일
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${rotation.value}deg` }],
    };
  });

  return (
    <View style={styles.container}>
      <Animated.View style={animatedStyle}>
        <Ionicons name="sunny-outline" size={100} color="#FFD700" />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
