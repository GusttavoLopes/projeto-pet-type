import api from "./api";
import { PetResponse } from "../ts/types";

async function petCreate(name: string): Promise<PetResponse> {
  try {
    const { data } = await api.post("/pet/create", { name });
    return data;
  } catch (e) {
    return { error: e.message };
  }
}

async function petList(): Promise<PetResponse> {
  try {
    const { data } = await api.get("/pet/list");
    return data;
  } catch (e) {
    return { error: e.message };
  }
}

async function petRemove(idpet: string): Promise<PetResponse> {
  try {
    const { data } = await api.delete("/pet/remove", {
      data: { idpet },
    });
    return data;
  } catch (e) {
    return { error: e.message };
  }
}

export { petList, petCreate, petRemove };
