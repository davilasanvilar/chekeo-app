import React, {Dispatch, SetStateAction} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {Icon} from '../Icon/Icon';

export function Checkbox({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: Dispatch<SetStateAction<boolean>>;
  label: string;
}) {
  return (
    <Pressable
      style={style.mainBox}
      onPress={() => onChange(checked => !checked)}>
      <View style={[style.checkbox, checked && style.checked]}>
        {checked && <Icon type="check" size={16} color="white" />}
      </View>
      <Text style={style.label}>{label}</Text>
    </Pressable>
  );
}

const style = StyleSheet.create({
  mainBox: {
    display: 'flex',
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  checkbox: {
    width: 20,
    height: 20,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: 'white',
  },
  checked: {backgroundColor: 'black'},
  label: {color: 'black', fontSize: 16, fontWeight: 'bold'},
});
