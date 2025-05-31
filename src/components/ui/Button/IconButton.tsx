import React, {useState} from 'react';
import {StyleSheet, Pressable, Text} from 'react-native';
import {LoadingIcon} from '../Icon/icons/LoadingIcon';
import {colors} from '../../../styleVars';
import {Icon, SystemIcons} from '../Icon/Icon';

export type ButtonVariant = 'solid' | 'outlined' | 'ghost';

type IconButtonProps = {
  onPress: () => void;
  variant?: ButtonVariant;
  disabled?: boolean;
  isLoading?: boolean;
  icon: SystemIcons;
  fontColor?: string;
  size?: number;
  iconSize?: number;
};

export function IconButton(props: IconButtonProps) {
  const {
    onPress,
    variant = 'solid',
    disabled = false,
    isLoading = false,
    icon,
    fontColor,
    size,
    iconSize,
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

  const styles = StyleSheet.create({
    box: {
      paddingHorizontal: 16,
      paddingVertical: 8,
      width: size ? size : 40,
      height: size ? size : 40,
      borderRadius: 100,
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
        <LoadingIcon size={iconSize ? iconSize : 16} color={getFontColor()} />
      ) : (
        <Icon
          size={iconSize ? iconSize : 16}
          type={icon}
          color={getFontColor()}
        />
      )}
    </Pressable>
  );
}
