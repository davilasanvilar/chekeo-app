import React, {ReactNode} from 'react';
import {StyleProp, Text, TextStyle} from 'react-native';
import {colors} from '../../../styleVars';

export type TypographyVariant =
  | 'h1'
  | 'h2'
  | 'important'
  | 'button'
  | 'body'
  | 'label'
  | 'error';

const getFontSize = (variant: TypographyVariant) => {
  switch (variant) {
    case 'h1':
      return 36;
    case 'h2':
      return 24;
    case 'important':
      return 16;
    case 'button':
      return 16;
    case 'label':
      return 16;
    default:
      return 14;
  }
};

const getFontFamily = (variant: TypographyVariant) => {
  switch (variant) {
    case 'h1':
      return 'Rasa-Regular';
    case 'h2':
      return 'Rasa-Regular';
    default:
      return 'Rasa-Regular';
  }
};

const getColor = (variant: TypographyVariant) => {
  switch (variant) {
    case 'label':
      return colors.neutral[300];
    case 'error':
      return colors.error[500];
    default:
      return colors.neutral[100];
  }
};

const getLineHeight = (variant: TypographyVariant) => {
  switch (variant) {
    case 'body':
      return 20;
    case 'important':
      return 24;
    default:
      return undefined;
  }
};

export function Typography({
  variant = 'body',
  style,
  nLines,
  children,
}: {
  variant?: TypographyVariant;
  style?: StyleProp<TextStyle>;
  nLines?: number;
  children: ReactNode;
}) {
  return (
    <Text
      numberOfLines={nLines}
      style={[
        {
          color: getColor(variant),
          fontFamily: getFontFamily(variant),
          fontSize: getFontSize(variant),
          lineHeight: getLineHeight(variant),
          textTransform: variant === 'button' ? 'uppercase' : 'none',
        },
        style,
      ]}>
      {children}
    </Text>
  );
}
