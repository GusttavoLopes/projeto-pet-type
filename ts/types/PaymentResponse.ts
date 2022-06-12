import { PaymentType } from "../types";

export type PaymentResponse = {
  count?: number;
  payments?: PaymentType[];
  idpayment?: string;
  payment?: PaymentType;
  error?: string;
};
