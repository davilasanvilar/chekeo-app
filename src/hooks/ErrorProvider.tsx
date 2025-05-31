import { createContext, ReactNode, useState } from 'react';

export interface ErrorContext {
    error: Error | undefined;
    setError: React.Dispatch<React.SetStateAction<Error | undefined>>;
}

export const ErrorContext = createContext<ErrorContext>({} as ErrorContext);

export const ErrorProvider = ({ children }: { children: ReactNode }) => {
    const [error, setError] = useState<Error | undefined>(undefined);

    const value: ErrorContext = {
        error,
        setError
    };

    return (
        <ErrorContext.Provider value={value}>{children}</ErrorContext.Provider>
    );
};
