import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  SafeAreaView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router, useNavigation } from 'expo-router';
import AnimatedGradientBackground from '@/components/AnimatedGradientBackground';
import { BlurView } from 'expo-blur';
import Ionicons from '@expo/vector-icons/Ionicons';

const { width } = Dimensions.get('window');
const HEADER_HEIGHT = 280; // 헤더 기본 높이

export default function ProfilePage() {
  const navigation = useNavigation();
  const handleLogout = async () => {
    await AsyncStorage.removeItem('@user_id');
    router.dismissAll();
  };
  const onPressLogout = () =>
    Alert.alert('로그아웃', '정말 로그아웃할까요?', [
      {
        text: '취소',
        style: 'cancel',
      },
      {
        text: '로그아웃',
        onPress: () => handleLogout(),
        style: 'destructive',
      },
    ]);

  return (
    <SafeAreaView style={styles.pageContainer}>
      <View style={styles.profileContainer}>
        <AnimatedGradientBackground />
        <View style={styles.profileInnerContainer}>
          <BlurView style={styles.profileImageContainer}>
            <Image
              style={styles.profileImage}
              source={require('@/assets/images/user_profile.png')}
            />
          </BlurView>
          <Text>세연</Text>
        </View>
      </View>
      <View style={styles.menuTabContainer}>
        <Text style={styles.menuTabText}>공지사항</Text>
        <Ionicons style={styles.menuTabText} name={'chevron-forward'} />
      </View>
      <View style={styles.menuTabContainer}>
        <Text style={styles.menuTabText}>내 정보</Text>
        <Ionicons style={styles.menuTabText} name={'chevron-forward'} />
      </View>
      <View style={styles.menuTabContainer}>
        <Text style={styles.menuTabText}>설정</Text>
        <Ionicons style={styles.menuTabText} name={'chevron-forward'} />
      </View>
      <View style={styles.menuTabContainer}>
        <Text style={styles.menuTabText}>약관 및 정책</Text>
        <Ionicons style={styles.menuTabText} name={'chevron-forward'} />
      </View>
      <TouchableOpacity onPress={onPressLogout}>
        <Text style={styles.logoutText}>로그아웃하기</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    alignItems: 'center',
  },
  profileContainer: {
    width: '100%',
    flexBasis: 200,
  },
  profileInnerContainer: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileImageContainer: {
    width: 100,
    aspectRatio: 1,
    padding: 4,
    borderRadius: 50,
    backgroundColor: 'rgba(255,255,255,0.7)',
    overflow: 'hidden',
  },
  profileImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 50,
    overflow: 'hidden',
  },
  logoutText: {
    marginVertical: 16,
    color: '#d34250',
    fontSize: 18,
    fontWeight: '500',
  },
  menuTabContainer: {
    width: '100%',
    padding: 24,
    borderColor: '#cccccc',
    borderBottomWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  menuTabText: {
    fontSize: 22,
  },
});
