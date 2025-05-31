import React, {useRef, useState} from 'react';
import {TextInput, View} from 'react-native';
import {notEmptyValidator, useValidator} from '../hooks/useValidator';
import {Input} from '../components/ui/Input/Input';
import {Button} from '../components/ui/Button/Button';
import {Form} from '../components/ui/Form/Form';
import {FormField} from '../components/ui/FormField/FormField';
import {useApi} from '../hooks/useApi';
import {useMutation} from '@tanstack/react-query';
import {useToast} from '../hooks/useToast';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {PublicScreenNavList} from '../types/navProps';

export function ForgottenPasswordScreen() {
  const {navigate} = useNavigation<NavigationProp<PublicScreenNavList>>();
  const [username, setUsername] = useState<string>('');
  const {forgottenPassword} = useApi();
  const {showToast} = useToast();

  const [
    usernameDirty,
    usernameError,
    usernameMessage,
    usernameValidate,
    setDirtyUsername,
  ] = useValidator(username, [notEmptyValidator]);

  const sendCode = async () => {
    if (usernameValidate()) {
      await forgottenPassword(username);
    } else {
      showToast('There are errors in the form', undefined, 'error');
    }
  };

  const {mutate: onSendCode, isPending: isLoading} = useMutation({
    mutationFn: sendCode,
    onSuccess: () => {
      showToast('The code was succesfully sent!', undefined, 'success');
      navigate('ResetPassword', {username});
    },
    onError: () => {
      showToast('There was an error sending the new code', undefined, 'error');
    },
  });

  const disabledButton = isLoading || usernameError;
  return (
    <View style={{flex: 1}}>
      <Form
        fields={
          <FormField
            input={
              <Input
                value={username}
                setValue={setUsername}
                onBlur={() => setDirtyUsername()}
              />
            }
            label="Username"
            error={usernameDirty && usernameError ? usernameMessage : undefined}
          />
        }
        buttons={
          <Button
            disabled={disabledButton}
            isLoading={isLoading}
            onPress={() => onSendCode()}>
            {'Send code'}
          </Button>
        }
      />
    </View>
  );
}
