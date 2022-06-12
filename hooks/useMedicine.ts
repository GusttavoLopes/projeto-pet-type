import { useContext } from "react";
import { MedicineContext } from "../contexts";

export default function useMedicine() {
  const context = useContext(MedicineContext);

  if (!context) {
    throw new Error("useMedicine hook is been called outside MedicineProvider");
  }

  return context;
}
