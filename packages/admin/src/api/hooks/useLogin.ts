import { useEffect, useRef } from 'react';
import { login } from '../system';
import { CancelFn } from './types';

export const useLogin = () => {
  const cancelRef = useRef<CancelFn>();
  const loginRequest = async (username: string, password: string) => {
    const [request, cancel] = login(username, password);
    cancelRef.current = cancel;
    return request;
  };

  useEffect(() => {
    return () => {
      cancelRef.current?.();
    };
  }, []);

  return {
    loginRequest,
  } as const;
};
