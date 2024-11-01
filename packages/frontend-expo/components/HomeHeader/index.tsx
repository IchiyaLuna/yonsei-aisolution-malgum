import {
  Text,
  type TextProps,
  StyleSheet,
  View,
  SafeAreaView,
} from 'react-native';

import SunnyIcon from '@/components/HomeHeader/SunnyIcon';
import { BlurView } from 'expo-blur';

export function Index({}) {
  return (
    <SafeAreaView style={styles.headerContainer}>
      <BlurView style={styles.contentContainer}>
        <Text style={styles.titleText}>오늘의 내 날씨는?</Text>
        <View style={styles.contentMainContainer}>
          <SunnyIcon />
          <Text style={styles.emotionText}>즐거움</Text>
        </View>
      </BlurView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    width: '100%',
    alignItems: 'stretch',
    justifyContent: 'center',
    // drop shadow 설정
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 }, // 그림자 위치
    shadowOpacity: 0.2, // 그림자의 투명도
    shadowRadius: 20, // 그림자의 확산 정도
    elevation: 10, // Android 그림자 높이
  },
  contentContainer: {
    aspectRatio: 16 / 9,
    padding: 16,
    marginHorizontal: 16,
    borderRadius: 25,
    backgroundColor: 'rgba(255,255,255,0.9)',
    alignItems: 'center',
    justifyContent: 'space-between',
    overflow: 'hidden',
  },
  titleText: {
    color: '#425465',
    fontSize: 24,
    fontWeight: '500',
  },
  contentMainContainer: {
    flexGrow: 1,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  emotionText: {
    color: '#425465',
    fontSize: 48,
    fontWeight: '500',
  },
});
