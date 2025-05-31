import React, {ComponentProps, forwardRef} from 'react';
import {StyleSheet, TextInput, TextInputProps} from 'react-native';

type InputProps = TextInputProps & {
  setValue: (value: string) => void;
  type?: 'text' | 'password';
  disabled?: boolean;
};

export const Input = forwardRef<TextInput, InputProps>((props, ref) => {
  const {type = 'text', setValue, disabled, ...nativeInputProps} = props;
  return (
    <TextInput
      ref={ref}
      onChangeText={e => setValue(e)}
      style={style.input}
      secureTextEntry={type === 'password'}
      selectTextOnFocus={!disabled}
      editable={!disabled}
      {...nativeInputProps}></TextInput>
  );
});

const style = StyleSheet.create({
  input: {borderWidth: 1, borderColor: 'black', padding: 8, color: 'black'},
});
