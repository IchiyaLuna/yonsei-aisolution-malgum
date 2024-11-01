import {
  Text,
  type TextProps,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  ImageSourcePropType,
} from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';
import type { PropsWithChildren, ReactElement } from 'react';

type Props = PropsWithChildren<{
  image: ImageSourcePropType;
}>;

export function HomeBanner({ children, image }: Props) {
  return (
    <TouchableOpacity style={styles.bannerContainer} activeOpacity={0.7}>
      <Image style={styles.bannerImage} source={image} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  bannerContainer: {},
  bannerImage: {
    width: '100%',
    borderRadius: 20,
    overflow: 'hidden',
    resizeMode: 'cover',
  },
});
