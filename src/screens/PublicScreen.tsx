import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {LoginScreen} from './LoginScreen';
import {PublicScreenNavList} from '../types/navProps';
import {colors} from '@src/styleVars';

const Stack = createNativeStackNavigator<PublicScreenNavList>();

export function PublicScreen() {
  return (
    <Stack.Navigator
      screenOptions={{
        contentStyle: {
          backgroundColor: colors.neutral[700],
        },
        headerShadowVisible: false,
      }}>
      <Stack.Screen
        options={{headerShown: false}}
        name="Login"
        component={LoginScreen}
      />
    </Stack.Navigator>
  );
}
