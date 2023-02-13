import React, { createContext, useEffect, useState } from 'react';
import api from '../api';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    api.getMe().then((res) => {
      setUser(res.data);
    })
    .catch((error) => {
      setUser(null);
    });
  }, []);

  const loginUpdate = () => {
    setUser(true)
  }

  const logoutUpdate = () => {
    localStorage.removeItem("token");
    setUser(false)
  }

  return (
    <AuthContext.Provider
      value={{ signed: Boolean(user), loginUpdate, logoutUpdate }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;