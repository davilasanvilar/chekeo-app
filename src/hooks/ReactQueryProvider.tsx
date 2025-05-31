import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import React, {ReactNode, createContext} from 'react';
import {useToast} from './useToast';

interface ReactQueryContext {
  queryClient: QueryClient;
}

export const ReactQueryContext = createContext<ReactQueryContext>(
  {} as ReactQueryContext,
);

//This provider is used to get the queryClient instance from the context and to have the QueryClientProvider
//declaration encapsulated
//We can use the toast too, because from the App.tsx we are not able to use it as its not a child of the ToastProvider
export const ReactQueryProvider = ({children}: {children: ReactNode}) => {
  const {showToast} = useToast();

  const queryClient = new QueryClient({
    queryCache: new QueryCache({
      onError: (_, query) => {
        if (query.meta?.errorInfo) {
          showToast(
            query.meta ? (query.meta.errorInfo as string) : 'An error occurred',
          );
        }
      },
    }),
  });

  const value: ReactQueryContext = {
    queryClient: queryClient,
  };

  return (
    <ReactQueryContext.Provider value={value}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </ReactQueryContext.Provider>
  );
};
