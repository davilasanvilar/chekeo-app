import {
  NavigationProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
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
import {useApi} from '../hooks/useApi';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

type Props = NativeStackScreenProps<PublicScreenNavList, 'Validation'>;

export function ValidationScreen({route}: Props) {
  const {navigate} = useNavigation<NavigationProp<PublicScreenNavList>>();
  const username = route?.params?.username;
  const auth = useAuth();
  const {sendValidationCode, validateAccount} = useApi();
  const {setError} = useError(navigate);
  const {showToast} = useToast();

  const [validationCode, setValidationCode] = useState<string>('');
  const [
    validationCodeDirty,
    validationCodeError,
    validationCodeMessage,
    validationCodeValidate,
    setDirtyValidationCode,
  ] = useValidator(validationCode, [notEmptyValidator]);

  const [validationSuccess, setValidationSuccess] = useState<boolean>(false);

  const resendCode = async () => {
    await sendValidationCode(username);
  };

  const {mutate: onResendCode} = useMutation({
    mutationFn: resendCode,
    onSuccess: () => {
      showToast('The code was succesfully sent!', undefined, 'success');
    },
    onError: e => {
      if (e instanceof ApiError) {
        if (e.statusCode === StatusCode.ClientErrorConflict) {
          showToast('The account is already validated', undefined, 'error');
          return;
        }
      }
      if (e instanceof Error) {
        setError(e);
      }
    },
  });

  const validate = async () => {
    await validateAccount(username, validationCode);
  };

  const {mutate: onValidateAccount, isPending: isValidationLoading} =
    useMutation({
      mutationFn: validate,
      onSuccess: () => {
        setValidationSuccess(true);
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

  const disabledValidateButton = isValidationLoading || validationCodeError;

  return (
    <View style={{flex: 1}}>
      {!validationSuccess ? (
        <Form
          fields={
            <>
              <Text style={{color: colors.neutral[900], fontWeight: 'bold'}}>
                {'Your account has not been validated'}
              </Text>
              <Text style={{color: colors.neutral[800]}}>
                {'Insert the code sent to your email to validate it'}
              </Text>
              <Input
                value={validationCode}
                setValue={setValidationCode}
                onBlur={() => setDirtyValidationCode()}
              />
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  gap: 8,
                  alignItems: 'center',
                }}>
                <Text style={{color: 'black'}}>
                  {'You did not receive the code?'}
                </Text>
                <Button variant="ghost" onPress={() => onResendCode()}>
                  {'Resend code'}
                </Button>
              </View>
            </>
          }
          buttons={
            <Button
              onPress={() => onValidateAccount()}
              isLoading={isValidationLoading}
              disabled={disabledValidateButton}>
              {'Validate'}
            </Button>
          }
        />
      ) : (
        <View style={{gap: 16, alignItems: 'center'}}>
          <Text style={{color: colors.success[900], fontWeight: 'bold'}}>
            {'Your account has been validated'}
          </Text>
          <View style={{flexDirection: 'row'}}>
            <Text style={{color: colors.neutral[800]}}>{'You can now '}</Text>
            <Link onPress={() => navigate('Login')}>login</Link>
          </View>
        </View>
      )}
    </View>
  );
}
