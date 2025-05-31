import React, {useState} from 'react';
import {Text, View} from 'react-native';
import {useError} from '../hooks/useError';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {ApiError, ErrorCode} from '../types/types';
import StatusCode from 'status-code-enum';
import {useMutation} from '@tanstack/react-query';
import {useApi} from '../hooks/useApi';
import {
  emailValidator,
  minLength8Validator,
  notEmptyValidator,
  upperLowerCaseValidator,
  useValidator,
} from '../hooks/useValidator';
import {PublicScreenNavList} from '../types/navProps';
import {Input} from '../components/ui/Input/Input';
import {FormField} from '../components/ui/FormField/FormField';
import {Button} from '../components/ui/Button/Button';
import {useToast} from '../hooks/useToast';
import {Checkbox} from '../components/ui/Checkbox/Checkbox';
import {Form} from '../components/ui/Form/Form';

export function RegisterScreen() {
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [repeatPassword, setRepeatPassword] = useState<string>('');
  const {register} = useApi();

  const {navigate} = useNavigation<NavigationProp<PublicScreenNavList>>();

  const [serviceTermsAccepted, setServiceTermsAccepted] =
    useState<boolean>(false);

  const [
    usernameDirty,
    usernameError,
    usernameMessage,
    usernameValidate,
    setDirtyUsername,
  ] = useValidator(username, [notEmptyValidator]);
  const [emailDirty, emailError, emailMessage, emailValidate, setDirtyEmail] =
    useValidator(email, [notEmptyValidator, emailValidator]);
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
  const [serviceTermsAcceptedDirty, setServiceTermsAcceptedDirty] =
    useState<boolean>(false);
  const [serviceTermsAcceptedError, setServiceTermsAcceptedError] =
    useState<string>('');
  const [, setIsTermsOfServiceOpen] = useState<boolean>(false);

  const {showToast} = useToast();
  const {setError} = useError(navigate);

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

  const serviceTermsAcceptedValidate = () => {
    if (!serviceTermsAcceptedDirty) {
      setServiceTermsAcceptedDirty(true);
    } else {
      if (serviceTermsAccepted) {
        setServiceTermsAcceptedError('');
        return true;
      } else {
        setServiceTermsAcceptedError('You must accepte the terms of service');
        return false;
      }
    }
  };

  const registerUser = async () => {
    const usernameValid = usernameValidate();
    const emailValid = emailValidate();
    const passwordValid = passwordValidate();
    const passwordMatch = passwordMatchValidate();
    const serviceTermsAccepted = serviceTermsAcceptedValidate();
    if (
      usernameValid &&
      emailValid &&
      passwordValid &&
      passwordMatch &&
      serviceTermsAccepted
    ) {
      console.log(
        usernameValid,
        emailValid,
        passwordValid,
        passwordMatch,
        serviceTermsAccepted,
      );
      await register({username, email, password});
      console.log('User registered');
    } else {
      throw new Error('There are errors in the form');
    }
  };

  const {mutate: onRegister, isPending: isLoading} = useMutation({
    mutationFn: registerUser,
    onSuccess: () => {
      showToast('User succesfully registered', undefined, 'success');
      navigate('Login');
    },
    onError: e => {
      if (e instanceof ApiError) {
        if (e.statusCode === StatusCode.ClientErrorConflict) {
          if (e.code === ErrorCode.USERNAME_ALREADY_IN_USE) {
            showToast('The username is already in use', undefined, 'error');
            return;
          }
          if (e.code === ErrorCode.EMAIL_ALREADY_IN_USE) {
            showToast('The email is already in use', undefined, 'error');
            return;
          }
        }
      }
      if (e instanceof Error) {
        setError(e);
      }
    },
  });

  const disabledButton =
    isLoading ||
    emailError ||
    passwordError ||
    passwordMatchError !== '' ||
    usernameError ||
    serviceTermsAcceptedError !== '' ||
    !serviceTermsAccepted;

  return (
    <View style={{flex: 1}}>
      <Text>{'Sign up'}</Text>
      <Form
        fields={
          <>
            <FormField
              label="Username"
              error={
                usernameDirty && usernameError ? usernameMessage : undefined
              }
              input={
                <Input
                  value={username}
                  setValue={setUsername}
                  onBlur={() => setDirtyUsername()}
                />
              }
            />
            <FormField
              label="Email"
              error={emailDirty && emailError ? emailMessage : undefined}
              input={
                <Input
                  value={email}
                  setValue={setEmail}
                  onBlur={() => setDirtyEmail()}
                />
              }
            />
            <FormField
              label="Password"
              error={
                passwordDirty && passwordError ? passwordMessage : undefined
              }
              input={
                <Input
                  value={password}
                  setValue={setPassword}
                  onBlur={() => setDirtyPassword()}
                  type="password"
                />
              }
            />
            <FormField
              label="Repeat Password"
              error={passwordMatchDirty ? passwordMatchError : undefined}
              input={
                <Input
                  value={repeatPassword}
                  setValue={setRepeatPassword}
                  type="password"
                />
              }
            />
            <FormField
              input={
                <Checkbox
                  checked={serviceTermsAccepted}
                  onChange={setServiceTermsAccepted}
                  label="I accept the terms of service"
                />
              }
              error={
                serviceTermsAcceptedDirty && serviceTermsAcceptedError != ''
                  ? serviceTermsAcceptedError
                  : undefined
              }
            />
          </>
        }
        buttons={
          <>
            <Button
              onPress={onRegister}
              isLoading={isLoading}
              variant="solid"
              disabled={disabledButton}>
              {'Register'}
            </Button>
          </>
        }
      />
    </View>
  );
}
