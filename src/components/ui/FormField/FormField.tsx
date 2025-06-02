import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {colors} from '../../../styleVars';
import {Typography} from '@components/ui/Typography/Typography';

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
      {<Typography variant="label">{label}</Typography>}
      {input}
      {error && <Text style={{color: colors.error[500]}}>{error}</Text>}
    </View>
  );
}

const style = StyleSheet.create({
  mainBox: {display: 'flex', flexDirection: 'column', marginBottom: 16, gap: 4},
  label: {
    color: colors.neutral[300],
    fontSize: 16,
    fontFamily: 'Rasa-Regular',
  },
});
