import { useState, useMemo } from 'react';
import axios from 'axios';
import routes from '../routes.js';
import AuthContext from './index.jsx';

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [username, setUsername] = useState(localStorage.getItem('username'));

  const logIn = (userToken, userName) => {
    localStorage.setItem('token', userToken);
    localStorage.setItem('username', userName);
    setToken(userToken);
    setUsername(userName);
  };

  const logOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    setToken(null);
    setUsername(null);
  };

  const signIn = async (credentials) => {
    try {
      const res = await axios.post(routes.loginPath(), credentials);
      logIn(res.data.token, res.data.username);
      return { success: true };
    }
    catch (err) {
      if (axios.isAxiosError(err) && err.response?.status === 401) {
        return { success: false, type: 'unauthorized' };
      }
      throw err;
    }
  };

  const signUp = async (credentials) => {
    try {
      const res = await axios.post(routes.signUpPath(), credentials);
      logIn(res.data.token, res.data.username);
      return { success: true };
    }
    catch (err) {
      if (axios.isAxiosError(err) && err.response?.status === 409) {
        return { success: false, type: 'userExists' };
      }
      throw err;
    }
  };

  const value = useMemo(() => ({
    loggedIn: !!token,
    logIn,
    logOut,
    signIn,
    signUp,
    username,
    token,
  }), [token, username]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
