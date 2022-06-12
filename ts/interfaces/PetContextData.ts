import { Pet, PetResponse } from "../types";

export interface PetContextData {
  pet: Pet;
  selectPet: (pet: Pet) => void;
  petList: () => Promise<PetResponse>;
  petCreate: (name: string) => Promise<PetResponse>;
  petRemove: (idpet: string) => Promise<PetResponse>;
}
