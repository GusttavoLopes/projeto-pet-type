import api from "./api";
import { PaymentResponse, PaymentType } from "../ts/types";

async function paymentCreate(payment: PaymentType): Promise<PaymentResponse> {
  const { idpet, description, value } = payment;
  try {
    const { data } = await api.post("/payment/create", {
      idpet,
      description,
      value,
    });
    console.log("Payment Response", data);
    return data;
  } catch (e) {
    return { error: e.message };
  }
}

async function paymentList(idpet: string): Promise<PaymentResponse> {
  try {
    const { data } = await api.post("/payment/list", { idpet });
    return data;
  } catch (e) {
    return { error: e.message };
  }
}

async function paymentRemove(idpayment: string): Promise<PaymentResponse> {
  try {
    const { data } = await api.delete("/payment/remove", {
      data: { idpayment: idpayment },
    });
    return data;
  } catch (e) {
    return { error: e.message };
  }
}

export { paymentCreate, paymentList, paymentRemove };
