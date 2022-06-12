import { useContext } from "react";
import { PaymentContext } from "../contexts";

export default function usePayment() {
  const context = useContext(PaymentContext);

  if (!context) {
    throw new Error("usePayment hook is been called outside PaymentProvider");
  }

  return context;
}
