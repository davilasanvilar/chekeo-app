import React from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {PublicScreen} from './src/screens/PublicScreen';
import {Toast} from './src/components/ui/Toast/Toast';
import {useAuth} from './src/hooks/useAuth';
import {PrivateScreen} from './src/screens/PrivateScreen';
import {colors} from './src/styleVars';
import {useKeyboardVisible} from './src/hooks/useKeyboardVisible';

export const Body = () => {
  const {authToken} = useAuth();
  const isKeyboardVisible = useKeyboardVisible();

  const style = StyleSheet.create({
    safeViewLayout: {
      flex: 1,
      backgroundColor: colors.neutral[700],
    },
    content: {
      flex: 1,
      backgroundColor: 'transparent',
      paddingHorizontal: 16,
      paddingTop: 32,
      paddingBottom: isKeyboardVisible ? 0 : 32,
    },
  });

  return (
    <SafeAreaView style={style.safeViewLayout}>
      <View style={style.content}>
        <NavigationContainer>
          {authToken ? <PrivateScreen /> : <PublicScreen />}
        </NavigationContainer>
      </View>
      <Toast />
    </SafeAreaView>
  );
};
