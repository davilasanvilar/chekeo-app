import React from 'react';
import {Body} from './Body';
import {ReactQueryProvider} from './src/hooks/ReactQueryProvider';
import {ToastProvider} from './src/hooks/ToastProvider';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {ApiProvider} from './src/hooks/ApiProvider';
import {AuthProvider} from './src/hooks/AuthProvider';

const App = () => {
  return (
    <ToastProvider>
      <ReactQueryProvider>
        <AuthProvider>
          <ApiProvider>
            <Body />
          </ApiProvider>
        </AuthProvider>
      </ReactQueryProvider>
    </ToastProvider>
  );
};
export default App;
