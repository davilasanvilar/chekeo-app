import React from 'react';
import {Body} from './Body';
import {ReactQueryProvider} from './src/hooks/ReactQueryProvider';
import {ToastProvider} from './src/hooks/ToastProvider';
import {ApiProvider} from './src/hooks/ApiProvider';
import {AuthProvider} from './src/hooks/AuthProvider';
import {ErrorProvider} from './src/hooks/ErrorProvider';

const App = () => {
  return (
    <ToastProvider>
      <ErrorProvider>
        <ReactQueryProvider>
          <AuthProvider>
            <ApiProvider>
              <Body />
            </ApiProvider>
          </AuthProvider>
        </ReactQueryProvider>
      </ErrorProvider>
    </ToastProvider>
  );
};
export default App;
