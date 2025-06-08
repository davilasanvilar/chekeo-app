import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {PrivateScreenNavList} from '@src/types/navProps';
import {ProjectsScreen} from './ProjectsScreen';
import {colors} from '@src/styleVars';
import {AddProjectScreen} from './AddProjectScreen';

export function PrivateScreen() {
  const Stack = createNativeStackNavigator<PrivateScreenNavList>();

  return (
    <Stack.Navigator
      screenOptions={{
        animation:'none',
        animationDuration: 10,
        contentStyle: {
          backgroundColor: colors.neutral[700],
        },
        headerShadowVisible: false,
      }}>
      <Stack.Screen
        options={{headerShown: false}}
        name="Projects"
        component={ProjectsScreen}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="AddProject"
        component={AddProjectScreen}
      />
    </Stack.Navigator>
  );
}
