import React, {useEffect, useState} from 'react';
import {Animated, StyleSheet, Text, View, Easing} from 'react-native';
import {Icon} from '../Icon/Icon';
import { useToast } from '../../../hooks/useToast';
import { colors } from '../../../styleVars';

export function Toast() {
  const {
    message,
    visible,
    mode = 'filled',
    color = 'primary',
    icon,
  } = useToast();
  const [show, setShow] = useState(false);

  const [toastPosition] = useState(new Animated.Value(90));

  useEffect(() => {
    if (visible) {
      setShow(true);
      setTimeout(() => {
        setShow(false);
      }, 3500);
    }
  }, [visible]);

  useEffect(() => {
    if (show) {
      Animated.timing(toastPosition, {
        toValue: -56,
        duration: 300,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(toastPosition, {
        toValue: 90,
        duration: 300,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }).start();
    }
  }, [show]);

  const getBgColor = () => {
    switch (mode) {
      case 'filled':
        return colors[color][500];
      case 'outlined':
        return colors.neutral[0];
      case 'transparent':
        return colors.neutral[0];
    }
  };

  const style = StyleSheet.create({
    parentBox: {
      width: '100%',
      paddingHorizontal: 24,
      position: 'absolute',
      bottom: 0,
      transform: [{translateY: toastPosition}],
    },
    box: {
      backgroundColor: getBgColor(),
      borderWidth: 2,
      borderColor:
        mode === 'transparent' ? colors.neutral[0] : colors[color][500],
      padding: 16,
      width: '100%',
      minHeight: 64,
      borderRadius: 8,
      display: 'flex',
      flexGrow: 1,
      flexDirection: 'row',
      gap: 10,
      alignItems: 'center',
    },
    text: {
      fontSize: 16,
      flexWrap: 'wrap',
      display: 'flex',
      flexShrink: 1,
      color: mode === 'filled' ? colors.neutral[0] : colors[color][500],
      fontWeight: '500',
    },
  });

  return (
    visible && (
      <Animated.View style={style.parentBox}>
        <View style={style.box}>
          {icon && (
            <Icon
              type={icon}
              size={24}
              color={mode === 'filled' ? colors.neutral[0] : colors[color][500]}
            />
          )}
          <Text style={style.text}>{message}</Text>
        </View>
      </Animated.View>
    )
  );
}