import { FontAwesome } from '@expo/vector-icons';
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {
  CameraCapturedPicture,
  CameraView,
  useCameraPermissions,
} from 'expo-camera';
import { useIsFocused } from '@react-navigation/native';
import { fetchData } from '@/api/fetch';

type Props = {};

export type HeaderRef = {
  getPhoto: () => Promise<CameraCapturedPicture | null>;
};

export const MessageHeader = forwardRef<HeaderRef>(({}: Props, ref) => {
  // Check is focused
  const focused = useIsFocused();
  // Camera
  const [permission, requestPermission] = useCameraPermissions();
  // Ref
  const cameraRef = useRef<CameraView | null>(null);

  useImperativeHandle(ref, () => ({
    async getPhoto() {
      if (!permission) return null;
      if (!cameraRef.current) return null;
      const photo = await cameraRef.current.takePictureAsync({
        skipProcessing: false,
        quality: 0.7,
        imageType: 'jpg',
      });
      console.log(photo);
      return photo || null;
    },
  }));

  // Render
  return focused ? (
    <View style={styles.headerContainer}>
      <CameraView
        ref={cameraRef}
        facing={'front'}
        style={{ display: 'none' }}
      />
      <Text>감정 인식 사용 중</Text>
    </View>
  ) : null;
});

const styles = StyleSheet.create({
  headerContainer: {
    borderColor: '#dddddd',
    borderBottomWidth: 1,
    alignItems: 'center',
    padding: 8,
  },
});
