import React, {useContext} from 'react';
import {AuthContext} from './AuthProvider';

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (ctx === null) {
    throw new Error(
      'useAuth() can only be used on the descendants of AuthProvider',
    );
  } else {
    return ctx;
  }
};
