import { Pet } from "../types";

export type PetResponse = {
  count?: number;
  pets?: Pet[];
  idpet?: string;
  error?: string;
};
