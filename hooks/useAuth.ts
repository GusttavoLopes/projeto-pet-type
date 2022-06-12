import { useContext } from "react";
import { AuthContext } from "../contexts";

// useAuth é um hook que definimos
// ele retorna as propriedades do value do AuthContext.Provider
export default function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("hook useAuth está sendo chamado fora do AuthProvider");
  }

  return context;
}
