export const Token_Key_Name = 'user_token';

export const setToken = (token: string) => {
  window.localStorage.setItem(Token_Key_Name, token);
};

export const getToken = () => window.localStorage.getItem(Token_Key_Name);
