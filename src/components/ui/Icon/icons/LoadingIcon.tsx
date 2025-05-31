import React, {useEffect, useRef, useState} from 'react';
import {Animated, Easing, StyleSheet, Text} from 'react-native';
import {colors} from '../../../../styleVars';
import IconLoading from './loading.svg';

export function LoadingIcon({
  size = 16,
  color = colors.primary[500],
}: {
  size?: number;
  color?: string;
}) {
  const [spinValue] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.loop(
      Animated.timing(spinValue, {
        toValue: 360,
        duration: 500,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      {},
    ).start();
  }, []);

  return (
    <Animated.View
      style={{
        transform: [
          {
            rotate: spinValue.interpolate({
              inputRange: [0, 360],
              outputRange: ['0deg', '360deg'],
            }),
          },
        ],
      }}>
      <IconLoading width={size} height={size} color={color} />
    </Animated.View>
  );
}
