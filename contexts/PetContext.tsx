import React, { useState, createContext } from "react";
import * as petService from "../services/pet";
import { ContextProps } from "../ts/types";
import { PetContextData } from "../ts/interfaces";
import { Pet, PetResponse } from "../ts/types";

const PetContext = createContext({} as PetContextData);

// extrai o children em <AuthProdiver> children </AuthProvider>
// no children estarão as rotas definidas por Navigator e Screen
const PetProvider: React.FC<ContextProps> = ({ children }) => {
  const [pet, setPet] = useState<Pet>(null);

  async function petList(): Promise<PetResponse> {
    return await petService.petList();
  }

  async function petCreate(name: string): Promise<PetResponse> {
    return await petService.petCreate(name);
  }

  async function petRemove(idpet: string): Promise<PetResponse> {
    return await petService.petRemove(idpet);
  }

  function selectPet(pet: Pet) {
    return setPet(pet);
  }

  const contextValues: PetContextData = {
    pet,
    selectPet,
    petList,
    petCreate,
    petRemove,
  };

  return (
    <PetContext.Provider value={contextValues}>{children}</PetContext.Provider>
  );
};

export { PetContext, PetProvider };
