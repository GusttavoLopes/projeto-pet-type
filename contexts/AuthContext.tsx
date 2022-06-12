import React, { useState, useEffect, createContext } from "react";
import * as auth from "../services/auth";
import api from "../services/api";
import * as SecureStore from "expo-secure-store";
import { ContextProps } from "../ts/types";
import { AuthContextData } from "../ts/interfaces";
import { User, UserResponse } from "../ts/types";

const AuthContext = createContext({} as AuthContextData);

// extrai o children em <AuthProdiver> children </AuthProvider>
// no children estarão as rotas definidas por Navigator e Screen
const AuthProvider: React.FC<ContextProps> = ({ children }) => {
  const [token, setToken] = useState<string>(null);
  const [mail, setMail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  // o useEffect que vai ser disparado assim que o AuthProvider for construído em tela
  useEffect(() => {
    async function loadStorageData() {
      const storagedToken = await SecureStore.getItemAsync("token");
      const storagedMail = await SecureStore.getItemAsync("mail");
      //await new Promise((resolve) => setTimeout(resolve, 1000));
      if (storagedToken && storagedMail) {
        api.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${storagedToken}`;
        setMail(storagedMail);
        setToken(storagedToken);
      }
      setLoading(false);
    }

    loadStorageData();
  }, []);

  async function signIn(user: User): Promise<UserResponse> {
    const response: UserResponse = await auth.signIn(user);

    if (response.token && response.mail) {
      api.defaults.headers.common["Authorization"] = `Bearer ${response.token}`;
      await SecureStore.setItemAsync("token", response.token);
      await SecureStore.setItemAsync("mail", response.mail);
      setToken(response.token);
      setMail(response.mail);
    } else {
      return { error: response.error || "Problemas ao executar a operação" };
    }
  }

  async function signOut(): Promise<void> {
    api.defaults.headers.common["Authorization"] = "";
    setToken(null);
    setMail(null);
    SecureStore.deleteItemAsync("token");
    SecureStore.deleteItemAsync("mail");
  }

  async function userCreate(newUser: User): Promise<UserResponse> {
    const response: UserResponse = await auth.userCreate(newUser);

    if (response.token && response.mail) {
      api.defaults.headers.common["Authorization"] = `Bearer ${response.token}`;
      await SecureStore.setItemAsync("token", response.token);
      await SecureStore.setItemAsync("mail", response.mail);
      setToken(response.token);
      setMail(response.mail);
    } else {
      return { error: response.error || "Problemas ao executar a operação" };
    }
  }

  const contextValues: AuthContextData = {
    signIn,
    signOut,
    token,
    mail,
    loading,
    userCreate,
  };

  return (
    <AuthContext.Provider value={contextValues}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
