import {ICheck} from '@src/types/entities';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Icon} from '../ui/Icon/Icon';
import {Typography} from '../ui/Typography/Typography';
import {colors} from '@src/styleVars';

export function CheckIndicator({check}: {check: ICheck}) {
  const isOk =
    !check.lastResult ||
    (check.lastResult.status >= 200 && check.lastResult.status < 300);

  return (
    <View style={style.mainBox}>
      <Icon
        type="dot"
        size={20}
        color={isOk ? colors.success[500] : colors.error[500]}
      />
      <Typography variant="label">{check.name}</Typography>
    </View>
  );
}

const style = StyleSheet.create({
  mainBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
});
