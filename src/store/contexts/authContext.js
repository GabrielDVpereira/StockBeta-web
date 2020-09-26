import React, { createContext, useState, useEffect } from "react";
import SessionService from "../../services/Session";
import { useHistory } from "react-router-dom";

export const AuthContext = createContext();

export default function AuthContextProvider({ children }) {
  const history = useHistory();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userFromLocalStorage = localStorage.getItem("@auth:user");
    if (userFromLocalStorage) {
      setUser(JSON.parse(userFromLocalStorage));
    }
  }, []);

  const signIn = async (email, password) => {
    try {
      const response = await SessionService.login(email, password);
      localStorage.setItem("@auth:token", response.headers["x-auth-token"]);
      localStorage.setItem("@auth:user", JSON.stringify(response.data));
      setUser(response.data);
      history.push("/home");
    } catch (error) {
      alert(
        error?.response?.data?.message || "Não possível realizar o seu login"
      );
    }
  };

  const signUp = async (name, email, password) => {
    try {
      const response = await SessionService.logUp(name, email, password);
      localStorage.setItem("@auth:token", response.headers["x-auth-token"]);
      localStorage.setItem("@auth:user", JSON.stringify(response.data));
      setUser(response.data);
      history.push("/home");
    } catch (error) {
      alert(
        error?.response?.message || "Não foi possível concluir seu cadastro"
      );
    }
  };

  const signout = () => {
    localStorage.clear();
    setUser(null);
    history.push("/");
  };

  return (
    <AuthContext.Provider
      value={{ signIn, signUp, signout, user, isUserLogged: !!user }}
    >
      {children}
    </AuthContext.Provider>
  );
}
