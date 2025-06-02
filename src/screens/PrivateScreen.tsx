import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {PrivateScreenNavList} from '@src/types/navProps';
import {ProjectsScreen} from './ProjectsScreen';
import { colors } from '@src/styleVars';

export function PrivateScreen() {
  const Stack = createNativeStackNavigator<PrivateScreenNavList>();

  return (
    <Stack.Navigator
      screenOptions={{
        contentStyle: {backgroundColor: colors.neutral[700]},
        headerShadowVisible: false,
      }}>
      <Stack.Screen
        options={{headerShown: false}}
        name="Projects"
        component={ProjectsScreen}
      />
    </Stack.Navigator>
  );
}
