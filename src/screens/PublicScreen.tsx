import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {LoginScreen} from './LoginScreen';
import {RegisterScreen} from './RegisterScreen';
import {ForgottenPasswordScreen} from './ForgottenPasswordScreen';
import {ValidationScreen} from './ValidationScreen';
import {PublicScreenNavList} from '../types/navProps';
import {ResetPasswordScreen} from './ResetPasswordScreen';

const Stack = createNativeStackNavigator<PublicScreenNavList>();

export function PublicScreen() {
  return (
    <Stack.Navigator
      screenOptions={{
        contentStyle: {backgroundColor: 'transparent'},
        headerShadowVisible: false,
      }}>
      <Stack.Screen
        options={{headerShown: false}}
        name="Login"
        component={LoginScreen}
      />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen
        name="ForgottenPassword"
        component={ForgottenPasswordScreen}
      />
      <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
      <Stack.Screen name="Validation" component={ValidationScreen} />
    </Stack.Navigator>
  );
}
