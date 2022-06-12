import React, { createContext } from "react";
import * as medicineService from "../services/medicine";
import { ContextProps } from "../ts/types";
import { MedicineContextData } from "../ts/interfaces";
import { MedicineResponse, MedicineType } from "../ts/types";

const MedicineContext = createContext({} as MedicineContextData);

const MedicineProvider: React.FC<ContextProps> = ({ children }) => {
  async function medicineList(idpet: string): Promise<MedicineResponse> {
    return await medicineService.medicineList(idpet);
  }

  async function medicineCreate(
    medicine: MedicineType
  ): Promise<MedicineResponse> {
    return await medicineService.medicineCreate(medicine);
  }

  async function medicineRemove(idpet: string): Promise<MedicineResponse> {
    return await medicineService.medicineRemove(idpet);
  }

  const contextValues: MedicineContextData = {
    medicineCreate,
    medicineList,
    medicineRemove,
  };

  return (
    <MedicineContext.Provider value={contextValues}>
      {children}
    </MedicineContext.Provider>
  );
};

export { MedicineContext, MedicineProvider };
