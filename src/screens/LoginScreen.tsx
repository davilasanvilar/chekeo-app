import {NavigationProp, useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {View} from 'react-native';
import {PublicScreenNavList} from '../types/navProps';
import {notEmptyValidator, useValidator} from '../hooks/useValidator';
import {Input} from '../components/ui/Input/Input';
import {Button} from '../components/ui/Button/Button';
import Logo from '../../assets/logo.svg';
import {Form} from '../components/ui/Form/Form';
import {FormField} from '../components/ui/FormField/FormField';
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
      await auth.authenticate(username, password, true);
    } else {
      showToast({message: 'There are errors in the form', color: 'error'});
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
          e.statusCode === StatusCode.ClientErrorUnauthorized &&
          e.code === ErrorCode.INVALID_CREDENTIALS
        ) {
          showToast({message: 'Wrong credentials', color: 'error'});
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
          </>
        }
        buttons={
          <>
            <Button
              disabled={disabledLoginButton}
              isLoading={isLoading}
              onPress={() => onLogin()}>
              {'Login'}
            </Button>
          </>
        }
      />
    </View>
  );
}
