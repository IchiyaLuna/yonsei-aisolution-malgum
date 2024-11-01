import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Dimensions,
} from 'react-native';
import { useState } from 'react';
import { router } from 'expo-router';
import Svg, { Path } from 'react-native-svg';
import { FontAwesome5 } from '@expo/vector-icons';
import { useHeaderHeight } from '@react-navigation/elements';
import { fetchData } from '@/api/fetch';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AnimatedGradientBackground from '@/components/AnimatedGradientBackground';

function WavyHeader({ top }: { top: number }) {
  return (
    <View
      style={{
        position: 'absolute',
        width: Dimensions.get('window').width,
      }}
    >
      <View style={{ height: 160 }}>
        <Svg
          height="60%"
          width="100%"
          viewBox="0 0 1440 320"
          style={{ position: 'absolute', top }}
        >
          <Path
            fill="white"
            d={
              'M0,64L120,96C240,128,480,192,720,208C960,224,1200,192,1320,176L1440,160L1440,320L1320,320C1200,320,960,320,720,320C480,320,240,320,120,320L0,320Z'
            }
          />
        </Svg>
      </View>
    </View>
  );
}

export default function HomeScreen() {
  const [focusedInput, setFocusedInput] = useState<number>(0);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!username || !password) return;

    await fetchData(
      'POST',
      'user/login',
      {
        'Content-Type': 'application/json',
      },
      JSON.stringify({
        username,
        password,
      })
    ).then(async (response) => {
      if (response.id) {
        await AsyncStorage.setItem('@user_id', response.id);
        const userId = await AsyncStorage.getItem('@user_id');
        if (userId === response.id) {
          router.replace('/(tabs)');
        }
      }
    });
  };

  const handleRegister = async () => {
    await fetchData(
      'POST',
      'user/create' // FOR DEV ONLY
    ).then((response) => {
      console.log(response);
    });
  };
  // Render
  return (
    <View style={styles.screenContainer}>
      <AnimatedGradientBackground />

      <View style={styles.drawerOuterContainer}>
        <SafeAreaView style={styles.drawerHeaderContainer}>
          <WavyHeader top={130} />
          <Text style={styles.drawerHeaderText}>내일은 맑음</Text>
        </SafeAreaView>
        <SafeAreaView style={styles.drawerInnerContainer}>
          <View style={styles.loginContainer}>
            <FontAwesome5
              name="lock"
              size={42}
              color={'rgba(107,173,232,0.75)'}
            />
            <View style={styles.loginFormContainer}>
              <TextInput
                style={styles.loginTextInput}
                placeholder="유저이름"
                textContentType={'username'}
                value={username}
                onChangeText={setUsername}
                onFocus={() => setFocusedInput(1)}
                onBlur={() => setFocusedInput(0)}
              />
              <TextInput
                style={styles.loginTextInput}
                placeholder="비밀번호"
                textContentType={'password'}
                value={password}
                onChangeText={setPassword}
                onFocus={() => setFocusedInput(2)}
                onBlur={() => setFocusedInput(0)}
              />
              <Text style={[{ opacity: 0 }]}>dd</Text>
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.loginButton}
                activeOpacity={0.7}
                onPress={handleLogin}
              >
                <Text style={styles.loginButtonText}>로그인</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.registerButton}
                activeOpacity={0.7}
                onPress={handleRegister}
              >
                <Text style={styles.registerButtonText}>회원가입</Text>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
  },
  drawerOuterContainer: {
    ...StyleSheet.absoluteFillObject,
    flexDirection: 'column',
  },
  drawerHeaderContainer: {
    flexBasis: '30%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  drawerHeaderText: {
    marginBottom: 32,
    color: 'white',
    fontSize: 52,
    fontWeight: 'black',
    fontFamily: 'IcnEduGrow',
    // drop shadow 설정
    textShadowColor: 'rgba(0, 0, 0, 0.3)', // 드랍쉐도우 색상
    textShadowOffset: { width: 0, height: 0 }, // 드랍쉐도우 위치
    textShadowRadius: 20, // 드랍쉐도우 퍼짐 정도
  },
  drawerInnerContainer: {
    flexGrow: 1,
    backgroundColor: 'white',
  },
  loginContainer: {
    flexGrow: 1,
    paddingTop: 24,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  loginFormContainer: {
    flexGrow: 1,
    width: '100%',
    gap: 8,
    justifyContent: 'center',
  },
  buttonContainer: {
    flexGrow: 1,
    width: '100%',
    gap: 8,
    justifyContent: 'center',
  },
  titleText: {
    color: '#425465',
    fontSize: 38,
    fontWeight: '500',
    alignSelf: 'center',
  },
  loginTextInput: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 25,
    color: 'rgb(77,117,172)',
    borderColor: 'rgba(188,210,234,0.75)',
    borderWidth: 2,
    fontSize: 16,
  },
  loginButton: {
    width: '100%',
    height: 60,
    borderRadius: 25,
    backgroundColor: 'rgba(107,173,232,0.75)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '500',
  },
  registerButton: {
    width: '100%',
    height: 60,
    borderRadius: 25,
    backgroundColor: 'rgba(188,210,234,0.75)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  registerButtonText: {
    color: 'rgb(77,117,172)',
    fontSize: 18,
    fontWeight: '500',
  },
});
