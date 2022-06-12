import React, { createContext } from "react";
import * as paymentService from "../services/payment";
import { ContextProps } from "../ts/types";
import { PaymentContextData } from "../ts/interfaces";
import { PaymentResponse, PaymentType } from "../ts/types";

const PaymentContext = createContext({} as PaymentContextData);

const PaymentProvider: React.FC<ContextProps> = ({ children }) => {
  async function paymentCreate(payment: PaymentType): Promise<PaymentResponse> {
    return await paymentService.paymentCreate(payment);
  }

  async function paymentList(idpet: string): Promise<PaymentResponse> {
    return await paymentService.paymentList(idpet);
  }

  async function paymentRemove(idpayment: string): Promise<PaymentResponse> {
    return await paymentService.paymentRemove(idpayment);
  }

  const contextValues: PaymentContextData = {
    paymentCreate,
    paymentList,
    paymentRemove,
  };

  return (
    <PaymentContext.Provider value={contextValues}>
      {children}
    </PaymentContext.Provider>
  );
};

export { PaymentContext, PaymentProvider };
