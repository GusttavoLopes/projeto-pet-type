import { PaymentType, PaymentResponse } from "../types";

export interface PaymentContextData {
  paymentList: (idpet: string) => Promise<PaymentResponse>;
  paymentCreate: (payment: PaymentType) => Promise<PaymentType | object>;
  paymentRemove: (idpayment: string) => Promise<PaymentResponse>;
}
