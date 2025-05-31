import React, {ReactNode, useState} from 'react';
import {StyleSheet, Pressable, Text} from 'react-native';
import {Icon, SystemIcons} from '../Icon/Icon';
import {colors} from '../../../styleVars';
import {LoadingIcon} from '../Icon/icons/LoadingIcon';

export type ButtonVariant = 'solid' | 'outlined' | 'ghost';

type ButtonProps = {
  children: string;
  onPress: () => void;
  variant?: ButtonVariant;
  disabled?: boolean;
  isLoading?: boolean;
  iconLeft?: SystemIcons;
  iconRight?: SystemIcons;
  fontColor?: string;
};

export function Button(props: ButtonProps) {
  const {
    children,
    onPress,
    variant = 'solid',
    disabled = false,
    isLoading = false,
    iconLeft,
    iconRight,
    fontColor,
  } = props;

  const [pressed, setPressed] = useState(false);

  const getBgColor = () => {
    switch (variant) {
      case 'solid':
        return disabled
          ? colors.neutral[200]
          : pressed
          ? colors.primary[700]
          : colors.primary[500];
      case 'outlined':
        return disabled
          ? colors.neutral[0]
          : pressed
          ? colors.neutral[100]
          : 'transparent';
      case 'ghost':
        return pressed && !disabled ? colors.neutral[100] : 'transparent';
    }
  };

  const getBorderColor = () => {
    switch (variant) {
      case 'solid':
        return disabled ? colors.neutral[200] : colors.primary[500];
      case 'outlined':
        return disabled ? colors.neutral[200] : colors.primary[500];
      case 'ghost':
        return 'transparent';
    }
  };

  const getFontColor = () => {
    if (fontColor) {
      return fontColor;
    }
    switch (variant) {
      case 'solid':
        return disabled ? colors.neutral[400] : colors.neutral[0];
      case 'outlined':
        return disabled ? colors.neutral[400] : colors.primary[500];
      case 'ghost':
        return disabled ? colors.neutral[400] : colors.primary[500];
    }
  };

  const styles = StyleSheet.create({
    box: {
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 8,
      minHeight: 40,
      backgroundColor: getBgColor(),
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      gap: 8,
      alignItems: 'center',
      borderWidth: 1,
      borderColor: getBorderColor(),
    },
    text: {
      textAlign: 'center',
      color: getFontColor(),
      fontSize: 16,
      fontWeight: '700',
    },
  });

  return (
    <Pressable
      style={styles.box}
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
      onPress={onPress}
      disabled={disabled || isLoading}>
      {isLoading ? (
        <LoadingIcon size={16} color={getFontColor()} />
      ) : (
        <>
          {iconLeft ? (
            <Icon size={16} type={iconLeft} color={getFontColor()} />
          ) : (
            <></>
          )}
          <Text style={styles.text}>{children}</Text>
          {iconRight && (
            <Icon size={16} type={iconRight} color={getFontColor()} />
          )}
        </>
      )}
    </Pressable>
  );
}
