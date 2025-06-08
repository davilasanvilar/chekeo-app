import React, {createRef, useContext} from 'react';
import {StyleSheet, View} from 'react-native';
import {Button} from '../ui/Button/Button';
import {CheckForm, CheckValidationRef} from '../molecules/CheckForm';
import {ChecksContext} from '@src/screens/AddProjectScreen';

export function ChecksCreator() {
  const {checks, setChecks, checkRefs, setCheckRefs} =
    useContext(ChecksContext);
  const onAddCheck = () => {
    setChecks(oldState => [
      ...oldState,
      {name: '', url: '', frequency: 0, frequencyType: 'h'},
    ]);
    setCheckRefs(oldState => [...oldState, createRef<CheckValidationRef>()]);
  };

  return (
    <View style={style.mainBox}>
      {checks.map((check, index) => (
        <CheckForm
          key={index}
          ref={checkRefs[index]}
          position={index}
          checkForm={check}
        />
      ))}
      <Button variant="ghost" onPress={onAddCheck} iconLeft="add">
        {'Add check'}
      </Button>
    </View>
  );
}

const style = StyleSheet.create({
  mainBox: {},
});
