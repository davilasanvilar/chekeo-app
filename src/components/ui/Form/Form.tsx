import {useKeyboardVisible} from '@src/hooks/useKeyboardVisible';
import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';

export function Form({
  fields,
  buttons,
}: {
  fields: React.ReactNode;
  buttons?: React.ReactNode;
}) {
  const isKeyboardVisible = useKeyboardVisible();

  return (
    <View style={style.mainBox}>
      <ScrollView contentContainerStyle={style.fieldsView}>{fields}</ScrollView>
      {!isKeyboardVisible && buttons && (
        <View style={style.buttonsBox}>{buttons}</View>
      )}
    </View>
  );
}

const style = StyleSheet.create({
  mainBox: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    gap: 16,
  },
  fieldsView: {
    display: 'flex',
    flexDirection: 'column',
  },
  buttonsBox: {
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
  },
});
