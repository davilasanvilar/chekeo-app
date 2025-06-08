import React, {useState} from 'react';
import {StyleSheet, Pressable} from 'react-native';
import {Icon, SystemIcons} from '../Icon/Icon';
import {colors} from '../../../styleVars';
import {LoadingIcon} from '../Icon/icons/LoadingIcon';
import {Typography} from '../Typography/Typography';

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
        return pressed ? colors.primary[700] : colors.primary[500];
      case 'outlined':
        return 'transparent';
      case 'ghost':
        return disabled ? 'transparent' : 'transparent';
    }
  };

  const getBorderColor = () => {
    switch (variant) {
      case 'solid':
        return 'transparent';
      case 'outlined':
        return pressed ? colors.primary[700] : colors.primary[500];
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
        return colors.neutral[0];
      case 'outlined':
        return pressed ? colors.primary[700] : colors.primary[500];
      case 'ghost':
        return pressed ? colors.primary[700] : colors.primary[500];
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
      borderWidth: 2,
      borderColor: getBorderColor(),
      opacity: disabled ? 0.4 : 1,
    }
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
          <Typography style={{color: getFontColor()}} variant="button">
            {children}
          </Typography>
          {iconRight && (
            <Icon size={16} type={iconRight} color={getFontColor()} />
          )}
        </>
      )}
    </Pressable>
  );
}
