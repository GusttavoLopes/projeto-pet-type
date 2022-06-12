import api from "./api";
import { MedicineResponse, MedicineType } from "../ts/types";

async function medicineCreate(
  medicine: MedicineType
): Promise<MedicineResponse> {
  const { idpet, name } = medicine;
  try {
    const { data } = await api.post("/medicine/create", { idpet, name });
    return data;
  } catch (e) {
    return { error: e.message };
  }
}

async function medicineList(idpet: string): Promise<MedicineResponse> {
  try {
    const { data } = await api.post("/medicine/list", { idpet });
    return data;
  } catch (e) {
    return { error: e.message };
  }
}

async function medicineRemove(idmedicine: string): Promise<MedicineResponse> {
  try {
    const { data } = await api.delete("/medicine/remove", {
      data: { idmedicine: idmedicine },
    });
    return data;
  } catch (e) {
    return { error: e.message };
  }
}

export { medicineCreate, medicineRemove, medicineList };
