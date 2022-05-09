import { createContext } from 'react';

export const AuthContext = createContext({
  username: '',
  authenticated: false,
  login: (username) => false,
});
