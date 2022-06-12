import { MedicineType, MedicineResponse } from "../types";

export interface MedicineContextData {
  medicineList: (idpet: string) => Promise<MedicineResponse>;
  medicineCreate: (medicine: MedicineType) => Promise<MedicineType | object>;
  medicineRemove: (idpet: string) => Promise<MedicineResponse>;
}
