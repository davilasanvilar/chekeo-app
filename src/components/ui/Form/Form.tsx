import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';

export function Form({
  fields,
  buttons,
}: {
  fields: React.ReactNode;
  buttons?: React.ReactNode;
}) {
  return (
    <View style={style.mainBox}>
      <ScrollView style={style.fieldsScrollView}>{fields}</ScrollView>
      {buttons && <View style={style.buttonsBox}>{buttons}</View>}
    </View>
  );
}

const style = StyleSheet.create({
  mainBox: {
    display: 'flex',
    flex:1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    gap: 16,
  },
  fieldsScrollView: {
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
  },
  buttonsBox: {
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
  },
});
