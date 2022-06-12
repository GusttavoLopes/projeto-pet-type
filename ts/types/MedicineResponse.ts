import { MedicineType } from "../types";

export type MedicineResponse = {
  count?: number;
  medicines?: MedicineType[];
  medicine?: MedicineType;
  idmedicine?: string;
  error?: string;
};
