import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { useEffect } from 'react';
import { StyleSheet } from 'react-native';

export default function FadeInLetter({
  letter,
  delay,
}: {
  letter: string;
  delay: number;
}) {
  const opacity = useSharedValue(0);

  useEffect(() => {
    opacity.value = withTiming(1, {
      duration: 750,
      easing: Easing.bezier(0.25, 0.1, 0.25, 1),
    });
  }, [opacity, delay]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <Animated.Text style={[styles.titleText, animatedStyle]}>
      {letter}
    </Animated.Text>
  );
}

const styles = StyleSheet.create({
  titleText: {
    color: 'white',
    fontSize: 44,
    fontWeight: 'black',
    fontFamily: 'IcnEduGrow',
    // drop shadow 설정
    textShadowColor: 'rgba(0, 0, 0, 0.3)', // 드랍쉐도우 색상
    textShadowOffset: { width: 0, height: 0 }, // 드랍쉐도우 위치
    textShadowRadius: 20, // 드랍쉐도우 퍼짐 정도
  },
});
