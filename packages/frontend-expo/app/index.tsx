import {
  Image,
  StyleSheet,
  Platform,
  Animated,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import AnimatedGradientBackground from '@/components/AnimatedGradientBackground';
import {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { useEffect, useState } from 'react';
import FadeInLetter from '@/components/FadeInLetter';
import { router } from 'expo-router';
import { BlurView } from 'expo-blur';

export default function LoginScreen() {
  const [letters, setLetters] = useState<string[]>([]);
  const fullText = '우리의 내일은 맑을 거야';

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setLetters((prev) => [...prev, fullText[index]]);
      index++;
      if (index >= fullText.length) {
        clearInterval(interval);
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);
  return (
    <View style={styles.screenContainer}>
      <AnimatedGradientBackground />
      <SafeAreaView style={styles.contentContainer}>
        <View style={styles.contentMainContainer}>
          <View style={styles.titleTextContainer}>
            {letters.map((letters, index) => (
              <FadeInLetter key={index} letter={letters} delay={0} />
            ))}
          </View>
        </View>

        <TouchableOpacity
          style={styles.startButtonOuter}
          activeOpacity={0.7}
          onPress={() => router.push('/login')}
        >
          <BlurView style={styles.startButtonInner}>
            <Text style={styles.startButtonText}>시작하기</Text>
          </BlurView>
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    position: 'relative',
  },
  contentContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'space-between',
  },
  contentMainContainer: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleTextContainer: {
    width: '100%',
    height: 42,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  startButtonOuter: {
    marginHorizontal: 16,
    borderRadius: 25,

    // drop shadow 설정
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 }, // 그림자 위치
    shadowOpacity: 0.2, // 그림자의 투명도
    shadowRadius: 20, // 그림자의 확산 정도
    elevation: 10, // Android 그림자 높이
  },
  startButtonInner: {
    height: 60,
    borderRadius: 25,
    backgroundColor: 'rgba(255,255,255,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  startButtonText: {
    color: '#425465',
    fontSize: 19,
    fontWeight: '500',
  },
});
