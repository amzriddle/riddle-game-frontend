import React, { createContext, useEffect, useState } from "react";
import api from "../api";

interface AuthContextData {
  signed: boolean;
  loginUpdate(): void;
  logoutUpdate(): void;
}

interface Props {
  children: React.ReactNode;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<Props> = ({ children }) => {
  const [user, setUser] = useState<boolean>(false);

  useEffect(() => {
    api
      .getMe()
      .then((res: any) => {
        setUser(res.data);
      })
      .catch((error: any) => {
        setUser(false);
      });
  }, []);

  const loginUpdate = () => {
    setUser(true);
  };

  const logoutUpdate = () => {
    localStorage.removeItem("token");
    setUser(false);
  };

  return (
    <AuthContext.Provider value={{ signed: user, loginUpdate, logoutUpdate }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
