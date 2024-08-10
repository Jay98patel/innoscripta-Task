import React, { createContext, useContext, useState, ReactNode } from "react";

interface ErrorContextType {
  hasError: boolean;
  setError: (hasError: boolean) => void;
}

export const ErrorContext = createContext<ErrorContextType>({
  hasError: false,
  setError: () => {},
});

export const useError = () => useContext(ErrorContext);

interface Props {
  children: ReactNode;
}

export const ErrorProvider: React.FC<Props> = ({ children }) => {
  const [hasError, setHasError] = useState(false);

  const setError = (error: boolean) => {
    setHasError(error);
  };

  return (
    <ErrorContext.Provider value={{ hasError, setError }}>
      {children}
    </ErrorContext.Provider>
  );
};
