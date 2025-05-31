import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {colors} from '../../../styleVars';

export function FormField({
  input,
  label,
  error,
}: {
  input: React.ReactNode;
  label?: string;
  error?: string;
}) {
  return (
    <View style={style.mainBox}>
      {label && <Text style={style.label}>{label}</Text>}
      {input}
      {error && <Text style={{color: colors.error[500]}}>{error}</Text>}
    </View>
  );
}

const style = StyleSheet.create({
  mainBox: {display: 'flex', flexDirection: 'column', marginBottom: 16, gap: 8},
  label: {color: 'black', fontSize: 16, fontWeight: 'bold'},
});
