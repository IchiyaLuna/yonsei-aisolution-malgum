import React, { useEffect, useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import {
  useSharedValue,
  withRepeat,
  withSpring,
} from 'react-native-reanimated';
import Svg, { Defs, RadialGradient, Rect, Stop } from 'react-native-svg';
import { SpringConfig } from 'react-native-reanimated/lib/typescript/reanimated2/animation/springUtils';

const AnimatedGradientBackground = React.memo(
  function AnimatedGradientBackground() {
    const colors = ['#6e92b1', '#A2CFE4', '#96c4e1', '#b1d1e8', '#A0C0D5'];

    const animatedProps = colors.map(() => ({
      cx: useSharedValue(Math.random()),
      cy: useSharedValue(Math.random()),
      r: useSharedValue(Math.random() * 0.5 + 0.3),
    }));

    useEffect(() => {
      const config = {
        damping: 1,
        stiffness: 250,
        mass: 0.2,
      } as SpringConfig;

      animatedProps.forEach((props) => {
        props.cx.value = withRepeat(
          withSpring(Math.random(), config),
          -1,
          true
        );
        props.cy.value = withRepeat(
          withSpring(Math.random(), config),
          -1,
          true
        );
        props.r.value = withRepeat(
          withSpring(Math.random() * 0.5 + 0.3, config),
          -1,
          true
        );
      });
    }, []);

    return (
      <View style={styles.backgroundContainer}>
        <Svg height={'100%'} width={'100%'}>
          <Defs>
            {colors.map((color, index) => (
              <RadialGradient
                key={index}
                id={`grad${index}`}
                cx={animatedProps[index].cx.value}
                cy={animatedProps[index].cy.value}
                r={animatedProps[index].r.value}
              >
                <Stop offset="0%" stopColor={color} stopOpacity="0.8" />
                <Stop offset="100%" stopColor={color} stopOpacity="0" />
              </RadialGradient>
            ))}
          </Defs>
          <Rect x="0" y="0" width="100%" height="100%" fill="url(#grad0)" />
          {colors.map((_, index) => (
            <Rect
              key={index}
              x="0"
              y="0"
              width="100%"
              height="100%"
              fill={`url(#grad${index})`}
            />
          ))}
        </Svg>
      </View>
    );
  }
);

const styles = StyleSheet.create({
  backgroundContainer: {
    flex: 1,
    backgroundColor: '#7DA2D9',
  },
});
export default AnimatedGradientBackground;
