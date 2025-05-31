import { createContext, ReactNode, useEffect, useRef, useState } from 'react';
import { LoginResponse, User } from '../types/entities';
import { ApiError, ApiResponse, ErrorCode } from '../types/types';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import EncryptedStorage from 'react-native-encrypted-storage';
import { conf } from '../conf';
import StatusCode from 'status-code-enum';
import { useToast } from './useToast';

export interface AuthContext {
  user?: User;
  authToken?: string;
  authenticate: (username: string, password: string, rememberMe: boolean) => void;
  logout: () => void;
  isLoadingUserInfo: boolean;
  fetchWithAuth: (url: string, options: RequestInit) => Promise<Response>
}

export const AuthContext = createContext<AuthContext>({} as AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isInit, setIsInit] = useState(false);
  const [authToken, setAuthToken] = useState<string | undefined>(undefined);
  const authTokenRef = useRef<string | undefined>(undefined);
  const apiUrl = conf.apiUrl;
  const toast = useToast()
  const queryClient = useQueryClient();



  let refreshingPromise: Promise<string> | null = null


  const storeSessionId = async (sessionId: string) => {
    try {
      await EncryptedStorage.setItem(
        'sessionId',
        JSON.stringify({
          sessionId,
        }),
      );
    } catch (error) { }
  };

  const removeSessionId = async () => {
    await EncryptedStorage.removeItem('sessionId');
  };

  const getSessionId = async () => {
    await EncryptedStorage.getItem('sessionId')
  }

  const refreshToken = async () => {
    const apiUrl = conf.apiUrl
    const refreshTokenOptions: RequestInit = {
      method: 'POST',
      credentials: 'include',
    };
    const refreshTokenResponse = await fetch(`${apiUrl}public/refresh-token`, refreshTokenOptions)
    const refreshTokenResponseObj: ApiResponse<LoginResponse> = await refreshTokenResponse.json()
    //If the refresh token is successful, we try to make the request again
    if (refreshTokenResponse.ok) {
      const newTokensResponse: LoginResponse = refreshTokenResponseObj.data
      setAuthToken(newTokensResponse.authToken)
      authTokenRef.current = newTokensResponse.authToken
      storeSessionId(newTokensResponse.sessionId)
      return newTokensResponse.authToken
    } else {
      if (refreshTokenResponse.status === StatusCode.ClientErrorUnauthorized && [ErrorCode.USER_AGENT_NOT_MATCH,
      ErrorCode.TOKEN_ALREADY_USED, ErrorCode.INVALID_TOKEN].includes(refreshTokenResponseObj.errorCode)) {
        cleanUserParams()
        toast.showToast({
          message: 'Your session has expired. Please log in again',
          mode: 'filled',
          color: 'error'
        })
      }
    }
    return ''
  }

  const fetchWithAuth = async (url: string, options: RequestInit) => {

    if (options.headers === undefined) {
      options.headers = new Headers();
    }
    const headers = options.headers as Headers;
    headers.set('Authorization', `Bearer ${authToken || authTokenRef.current}`)
    options.credentials = 'include'
    const response = await fetch(url, options)
    //If the first response is unauthorized, we try to refresh the token
    if (response.status === StatusCode.ClientErrorUnauthorized) {
      //If the token is already being refreshed, we wait until it is finished
      let newAuthToken = ''
      if (refreshingPromise) {
        newAuthToken = await refreshingPromise
      } else {
        refreshingPromise = refreshToken()
        try {
          newAuthToken = await refreshingPromise
        } catch { }
        finally {
          refreshingPromise = null
        }
      }
      if (newAuthToken) {
        headers.set('Authorization', `Bearer ${newAuthToken}`)
        const secondResponse = await fetch(url, options)
        return secondResponse
        //If the refresh token fails, we clean the user data and return the first response (unauthorized)
      } else {
        return response;
      }
    }
    return response
  }

  const self = async (): Promise<User | undefined> => {
    const url = `${apiUrl}private/self`;
    const options: RequestInit = {
      method: 'GET',
    };
    const res = await fetchWithAuth(url, options);
    const result: ApiResponse<User> = await res.json();
    if (!res.ok) {
      if (res.status !== StatusCode.ClientErrorUnauthorized) {
        throw new ApiError({
          statusCode: res.status,
          message: result.errorMessage,
          code: result.errorCode
        });
      }
    }
    return result.data;
  };

  const {
    data: user,
    isLoading: isLoadingUserInfo,
    refetch: reloadUserInfo,
  } = useQuery<User | undefined>({
    queryKey: ['getUserInfo'],
    queryFn: self,
    retry: false,
    refetchOnWindowFocus: false,
  });

  const login = async (
    username: string,
    password: string,
    rememberMe: boolean
  ): Promise<LoginResponse> => {
    const url = `${apiUrl}public/login`;
    const options: RequestInit = {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify({ username, password, rememberMe }),
      headers: new Headers({
        'content-type': 'application/json'
      })
    };
    const res = await fetch(url, options);
    const result: ApiResponse<LoginResponse> = await res.json();
    if (!res.ok) {
      throw new ApiError({
        statusCode: res.status,
        message: result.errorMessage,
        code: result.errorCode
      });
    }
    return result.data;
  };

  const resetUser = () => {
    queryClient.setQueryData(['getUserInfo'], null);
  }


  const authenticate = async (
    username: string,
    password: string,
    rememberMe: boolean,
  ) => {
    const loginResponse = await login(username.toLowerCase().trim(), password, rememberMe);
    storeSessionId(loginResponse.sessionId)
    setAuthToken(loginResponse.authToken);
    authTokenRef.current = loginResponse.authToken;
    reloadUserInfo();
  };

  const logout = async () => {
    const url = `${apiUrl}logout`;
    const sessionId = await getSessionId()
    const options: RequestInit = {
      method: 'POST',
      headers: new Headers({
        'content-type': 'application/json'
      }),
      body: JSON.stringify({ sessionId }),
      credentials: 'include',
    };
    try {
      await fetchWithAuth(url, options);
    } catch { } finally {
      cleanUserParams();
    }
  };

  const cleanUserParams = () => {
    removeSessionId();
    setAuthToken('');
    resetUser()
  };

  const value: AuthContext = {
    user,
    authToken,
    authenticate,
    logout,
    isLoadingUserInfo,
    fetchWithAuth
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
