import React from 'react';
import {StyleSheet, Text, TextProps} from 'react-native';
import {colors} from '../../../styleVars';

export function Link(props: TextProps) {
  return (
    <Text style={style.link} {...props}>
      {props.children}
    </Text>
  );
}

const style = StyleSheet.create({
  link: {color: colors.primary[500], fontWeight: 'bold'},
});
