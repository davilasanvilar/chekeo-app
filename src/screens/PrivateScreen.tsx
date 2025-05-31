import React from 'react';
import {Text, View} from 'react-native';
import {useAuth} from '../hooks/useAuth';
import { Button } from '../components/ui/Button/Button';

export function PrivateScreen() {
  const {user, logout} = useAuth();

  return (
    <View>
      <Text style={{color: 'black'}}>WELCOME</Text>
      <Text style={{color: 'black'}}>{user?.username}</Text>
      <Button onPress={logout}>Logout</Button>
    </View>
  );
}
