import { useContext } from "react";
import { PetContext } from "../contexts";

export default function usePet() {
  const context = useContext(PetContext);

  if (!context) {
    throw new Error("usePet hook is been called outside PetProvider");
  }

  return context;
}
