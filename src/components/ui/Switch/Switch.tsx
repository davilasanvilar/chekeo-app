import React, {Dispatch, SetStateAction} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Typography} from '../Typography/Typography';
import {colors} from '@src/styleVars';

export interface SwitchOption {
  label: string;
  value: string;
}

export function Switch({
  value,
  setValue,
  options,
}: {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  options: SwitchOption[];
}) {
  return (
    <View style={style.mainBox}>
      {options.map((option, index) => (
        <TouchableOpacity
          key={index}
          style={[
            getStyle(index === 0, index === options.length - 1).optionBox,
            option.value === value && style.optionSelectedBox,
          ]}
          onPress={() => setValue(option.value)}>
          <Typography>{option.label}</Typography>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const getStyle = (isFirst?: boolean, isLast?: boolean) =>
  StyleSheet.create({
    optionBox: {
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderTopLeftRadius: isFirst ? 8 : 0,
      borderBottomLeftRadius: isFirst ? 8 : 0,
      borderTopRightRadius: isLast ? 8 : 0,
      borderBottomRightRadius: isLast ? 8 : 0,
      minHeight: 40,
      display: 'flex',
      justifyContent: 'center',
      gap: 8,
      alignItems: 'center',
      borderWidth: 1,
      borderColor: colors.primary[500],
    },
  });

const style = StyleSheet.create({
  mainBox: {
    flexDirection: 'row',
  },
  optionSelectedBox: {
    backgroundColor: colors.primary[500],
  },
});
