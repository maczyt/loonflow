import { ajax } from './request';

export const login = (username: string, password: string) => {
  return ajax.post('/api/v1.0/login', {
    username,
    password,
  });
};
