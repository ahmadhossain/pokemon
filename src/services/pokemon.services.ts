import { PokemonTCG } from "pokemon-tcg-sdk-typescript";

export const getAllSets = async () => {
  const data = await PokemonTCG.getAllSets();
  return data;
};

export const getSet = async (id: string) => {
  const data = await PokemonTCG.findSetByID(id);
  return data;
};

// export const editSetName = async (setId: string, setName: string) => {
//   // const data = await PokemonTCG.findSetByID(setId);
//   console.log("set updated: " + setName);
//   return {
//     message: "name changed",
//   };
// };
