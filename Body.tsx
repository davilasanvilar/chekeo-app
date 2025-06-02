import React from 'react';
import {KeyboardAvoidingView, SafeAreaView, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {PublicScreen} from './src/screens/PublicScreen';
import {Toast} from './src/components/ui/Toast/Toast';
import {useAuth} from './src/hooks/useAuth';
import {PrivateScreen} from './src/screens/PrivateScreen';
import {colors} from './src/styleVars';

export const Body = () => {
  const {authToken} = useAuth();

  return (
    <SafeAreaView style={style.safeViewLayout}>
      <KeyboardAvoidingView behavior="height" style={style.content}>
        <NavigationContainer>
          {authToken ? <PrivateScreen /> : <PublicScreen />}
        </NavigationContainer>
      </KeyboardAvoidingView>
      <Toast />
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  safeViewLayout: {
    flex: 1,
    backgroundColor: colors.neutral[700],
  },
  content: {
    flex: 1,
    backgroundColor: 'transparent',
    paddingHorizontal: 16,
    paddingVertical: 32,
  },
});
