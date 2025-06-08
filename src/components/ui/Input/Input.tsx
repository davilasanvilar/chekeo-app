import React, {forwardRef, useState} from 'react';
import {StyleSheet, TextInput, TextInputProps} from 'react-native';
import {colors} from '@src/styleVars';

type InputProps = TextInputProps & {
  setValue: (value: string) => void;
  type?: 'text' | 'password';
  disabled?: boolean;
};

export const Input = forwardRef<TextInput, InputProps>((props, ref) => {
  const {
    type = 'text',
    setValue,
    disabled,
    onBlur,
    ...nativeInputProps
  } = props;
  const [isFocused, setIsFocused] = useState(false);

  const style = StyleSheet.create({
    input: {
      borderWidth: 1,
      flex: 1,
      padding: 8,
      backgroundColor: colors.neutral[900],
      borderRadius: 8,
      borderColor: isFocused ? colors.primary[400] : colors.neutral[900],
      color: isFocused ? colors.neutral[100] : colors.neutral[300],
    },
  });

  return (
    <TextInput
      ref={ref}
      onChangeText={e => setValue(e)}
      onFocus={() => setIsFocused(true)}
      onBlur={e => {
        setIsFocused(false);
        if (onBlur) {
          onBlur(e);
        }
      }}
      style={{
        ...style.input,
      }}
      secureTextEntry={type === 'password'}
      selectTextOnFocus={!disabled}
      editable={!disabled}
      {...nativeInputProps}
    />
  );
});
