import {NavigationProp, useNavigation} from '@react-navigation/native';
import React, {useRef, useState} from 'react';
import {Text, TextInput, View} from 'react-native';
import {PublicScreenNavList} from '../types/navProps';
import {notEmptyValidator, useValidator} from '../hooks/useValidator';
import {Input} from '../components/ui/Input/Input';
import {Button} from '../components/ui/Button/Button';
import Logo from '../../assets/logo.svg';
import {Form} from '../components/ui/Form/Form';
import {FormField} from '../components/ui/FormField/FormField';
import {colors} from '../styleVars';
import {Link} from '../components/ui/Link/Link';
import {useMutation} from '@tanstack/react-query';
import {useAuth} from '../hooks/useAuth';
import {useReactQuery} from '../hooks/useReactQuery';
import {useToast} from '../hooks/useToast';
import {ApiError, ErrorCode} from '../types/types';
import StatusCode from 'status-code-enum';
import {useError} from '../hooks/useError';

export function LoginScreen() {
  const {navigate} = useNavigation<NavigationProp<PublicScreenNavList>>();
  const auth = useAuth();
  const {setError} = useError(navigate);
  const {showToast} = useToast();
  const {queryClient} = useReactQuery();
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const [
    usernameDirty,
    usernameError,
    usernameMessage,
    usernameValidate,
    setDirtyUsername,
  ] = useValidator(username, [notEmptyValidator]);
  const [
    passwordDirty,
    passwordError,
    passwordMessage,
    passwordValidate,
    setDirtyPassword,
  ] = useValidator(password, [notEmptyValidator]);

  const login = async () => {
    const usernameValid = usernameValidate();
    const passwordValid = passwordValidate();

    if (usernameValid && passwordValid) {
      await auth.authenticate(username, password);
    } else {
      showToast('There are errors in the form');
    }
  };

  const {mutate: onLogin, isPending: isLoading} = useMutation({
    mutationFn: login,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['getUserInfo']});
    },
    onError: e => {
      if (e instanceof ApiError) {
        if (
          e.statusCode === StatusCode.ClientErrorForbidden &&
          e.code === ErrorCode.NOT_VALIDATED_ACCOUNT
        ) {
          navigate('Validation', {username});
          return;
        }
        if (
          e.statusCode === StatusCode.ClientErrorUnauthorized &&
          e.code === ErrorCode.INVALID_CREDENTIALS
        ) {
          showToast('Wrong credentials');
          return;
        }
      }
      if (e instanceof Error) {
        setError(e);
      }
    },
  });

  const disabledLoginButton = isLoading || usernameError || passwordError;

  return (
    <View style={{flex: 1}}>
      <Logo width={'100%'} height={200} />
      <Form
        fields={
          <>
            <FormField
              input={
                <Input
                  value={username}
                  setValue={setUsername}
                  onBlur={() => setDirtyUsername()}
                />
              }
              label="Username"
              error={
                usernameDirty && usernameError ? usernameMessage : undefined
              }
            />
            <FormField
              input={
                <Input
                  value={password}
                  setValue={setPassword}
                  onBlur={() => setDirtyPassword()}
                  type="password"
                />
              }
              label="Password"
              error={
                passwordDirty && passwordError ? passwordMessage : undefined
              }
            />
            <Link onPress={() => navigate('ForgottenPassword')}>
              {'I have forgotten my password'}
            </Link>
            <View style={{flexDirection: 'row', gap: 8, alignItems: 'center'}}>
              <Text style={{color: colors.neutral[900]}}>
                {"Don't have an account yet?"}
              </Text>
              <Button variant="ghost" onPress={() => navigate('Register')}>
                {'Register'}
              </Button>
            </View>
          </>
        }
        buttons={
          <Button
            disabled={disabledLoginButton}
            isLoading={isLoading}
            onPress={() => onLogin()}>
            {'Login'}
          </Button>
        }
      />
    </View>
  );
}
