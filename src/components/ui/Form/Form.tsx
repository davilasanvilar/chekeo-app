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
    <ScrollView contentContainerStyle={style.mainBox}>
      <View style={style.fieldsView}>{fields}</View>
      {buttons && <View style={style.buttonsBox}>{buttons}</View>}
    </ScrollView>
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
