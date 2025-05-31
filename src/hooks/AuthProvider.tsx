import {createContext, ReactNode, useEffect, useState} from 'react';
import {User} from '../types/entities';
import {ApiError, ApiResponse} from '../types/types';
import {useQuery} from '@tanstack/react-query';
import EncryptedStorage from 'react-native-encrypted-storage';
import {conf} from '../conf';

export interface AuthContext {
  user?: User;
  csrf?: string;
  authenticate: (email: string, password: string) => void;
  logout: () => void;
  isLoadingUserInfo: boolean;
}

export const AuthContext = createContext<AuthContext>({} as AuthContext);

export const AuthProvider = ({children}: {children: ReactNode}) => {
  const [isInit, setIsInit] = useState(false);
  const [csrf, setCsrf] = useState<string | undefined>(undefined);
  const apiUrl = conf.apiUrl;

  const storeSession = async (csrf: string) => {
    try {
      await EncryptedStorage.setItem(
        'csrf',
        JSON.stringify({
          csrf,
        }),
      );
    } catch (error) {}
  };
  const retrieveSession = async () => {
    try {
      const session = await EncryptedStorage.getItem('csrf');
      const parsedSession = session ? JSON.parse(session) : undefined;

      if (parsedSession !== undefined && parsedSession.csrf !== undefined) {
        setCsrf(parsedSession.csrf);
      }
    } catch (error) {
    } finally {
      setIsInit(true);
    }
  };

  const removeSession = async () => {
    const session = await EncryptedStorage.removeItem('csrf');
  };

  useEffect(() => {
    if (csrf === undefined) {
      retrieveSession();
    }
  }, []);

  useEffect(() => {
    reloadUserInfo();
  }, [csrf]);

  const self = async (): Promise<User | undefined> => {
    if (csrf) {
      const url = `${apiUrl}self`;
      const options: RequestInit = {
        method: 'GET',
        headers: new Headers({
          'X-API-CSRF': csrf ? csrf : '',
        }),
        credentials: 'include',
      };
      const res = await fetch(url, options);
      const result: ApiResponse<User> = await res.json();
      if (!res.ok) {
        throw new ApiError({
          statusCode: res.status,
          message: result.errorMessage,
          code: result.errorCode,
        });
      }
      return result.data;
    } else {
      throw new Error('No csrf token');
    }
  };
  const {
    data: user,
    isLoading: isLoadingUserInfo,
    refetch: reloadUserInfo,
  } = useQuery<User | undefined>({
    queryKey: ['getUserInfo', csrf],
    queryFn: self,
    retry: false,
  });

  const login = async (username: string, password: string): Promise<string> => {
    const url = `${apiUrl}public/login`;
    const options: RequestInit = {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify({username, password}),
      headers: new Headers({
        'content-type': 'application/json',
      }),
    };
    const res = await fetch(url, options);
    const result: ApiResponse<string> = await res.json();
    if (!res.ok) {
      throw new ApiError({
        statusCode: res.status,
        message: result.errorMessage,
        code: result.errorCode,
      });
    }
    return result.data;
  };

  const authenticate = async (
    email: string,
    password: string,
    // rememberMe: boolean,
  ) => {
    const csrf = await login(email.toLowerCase().trim(), password);
    setCsrf(csrf);
    // if (rememberMe) {
    storeSession(csrf);
    // }
  };

  const logout = () => {
    cleanUserParams();
  };

  const cleanUserParams = () => {
    removeSession();
    setCsrf('');
  };

  const value: AuthContext = {
    user,
    csrf,
    authenticate,
    logout,
    isLoadingUserInfo,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
