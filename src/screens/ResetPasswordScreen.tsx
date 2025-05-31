import React, {useEffect, useRef, useState} from 'react';
import {TextInput, View} from 'react-native';
import {
  minLength8Validator,
  notEmptyValidator,
  upperLowerCaseValidator,
  useValidator,
} from '../hooks/useValidator';
import {Input} from '../components/ui/Input/Input';
import {Button} from '../components/ui/Button/Button';
import {Form} from '../components/ui/Form/Form';
import {FormField} from '../components/ui/FormField/FormField';
import {useApi} from '../hooks/useApi';
import {useMutation} from '@tanstack/react-query';
import {useToast} from '../hooks/useToast';
import {ApiError, ErrorCode} from '../types/types';
import StatusCode from 'status-code-enum';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {PublicScreenNavList} from '../types/navProps';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

type Props = NativeStackScreenProps<PublicScreenNavList, 'ResetPassword'>;

export function ResetPasswordScreen({route}: Props) {
  const {navigate} = useNavigation<NavigationProp<PublicScreenNavList>>();
  const {showToast} = useToast();
  const {resetPassword} = useApi();
  const [password, setPassword] = useState<string>('');
  const [repeatPassword, setRepeatPassword] = useState<string>('');

  const [
    passwordDirty,
    passwordError,
    passwordMessage,
    passwordValidate,
    setDirtyPassword,
  ] = useValidator(password, [
    notEmptyValidator,
    minLength8Validator,
    upperLowerCaseValidator,
  ]);
  const [passwordMatchError, setPasswordMatchError] = useState<string>('');
  const [passwordMatchDirty, setPasswordMatchDirty] = useState<boolean>(false);

  const [validationCode, setValidationCode] = useState<string>('');
  const [
    validationCodeDirty,
    validationCodeError,
    validationCodeMessage,
    validationCodeValidate,
    setDirtyValidationCode,
  ] = useValidator(validationCode, [notEmptyValidator]);
  const username = route?.params?.username;

  const passwordMatchValidate = () => {
    if (!passwordMatchDirty && (password || repeatPassword)) {
      setPasswordMatchDirty(true);
    }
    if (password === repeatPassword) {
      setPasswordMatchError('');
      return true;
    } else {
      setPasswordMatchError('The passwords do not match');
      return false;
    }
  };

  useEffect(() => {
    passwordMatchValidate();
  }, [password, repeatPassword]);

  const changePassword = async () => {
    const passwordValid = passwordValidate();
    const passwordMatchValid = passwordMatchValidate();
    const validationCodeValid = validationCodeValidate();
    if (passwordValid && passwordMatchValid && validationCodeValid) {
      await resetPassword(username, validationCode, password);
    } else {
      showToast('There are errors in the form', undefined, 'error');
    }
  };
  const {mutate: onChangePassword, isPending: isLoading} = useMutation({
    mutationFn: changePassword,
    onSettled: () => {
      showToast('The password has been changed', undefined, 'success');
      navigate('Login');
    },
    onSuccess: () => {
      showToast('The password has been changed', undefined, 'success');
    },
    onError: e => {
      if (e instanceof ApiError) {
        if (e.statusCode === StatusCode.ClientErrorConflict) {
          showToast('The code has already been used', undefined, 'error');
          return;
        }
        if (e.statusCode === StatusCode.ClientErrorGone) {
          showToast('The code has expired', undefined, 'error');
          return;
        }
        if (
          e.statusCode === StatusCode.ClientErrorUnauthorized &&
          e.code === ErrorCode.INCORRECT_VALIDATION_CODE
        ) {
          showToast('The code is invalid', undefined, 'error');
          return;
        }
      }
      showToast('An internal error occurred', undefined, 'error');
    },
  });

  const disabledButton =
    isLoading || passwordError || passwordMatchError !== '';

  return (
    <View style={{flex: 1}}>
      <Form
        fields={
          <>
            <FormField
              input={
                <Input
                  value={validationCode}
                  setValue={setValidationCode}
                  onBlur={() => setDirtyValidationCode()}
                />
              }
              label="Code"
              error={
                validationCodeDirty && validationCodeError
                  ? validationCodeMessage
                  : undefined
              }
            />
            <FormField
              input={
                <Input
                  value={password}
                  setValue={setPassword}
                  type="password"
                  onBlur={() => setDirtyPassword()}
                />
              }
              label="New password"
              error={
                passwordDirty && passwordError ? passwordMessage : undefined
              }
            />
            <FormField
              input={
                <Input
                  value={repeatPassword}
                  setValue={setRepeatPassword}
                  type="password"
                />
              }
              label="Repeat password"
              error={passwordMatchDirty ? passwordMatchError : undefined}
            />
          </>
        }
        buttons={
          <Button
            disabled={disabledButton}
            isLoading={isLoading}
            onPress={() => onChangePassword()}>
            {'Change password'}
          </Button>
        }
      />
    </View>
  );
}
