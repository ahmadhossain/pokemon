import { ILegality, Set, SetImage } from "pokemon-tcg-sdk-typescript/dist/sdk";
import { create } from "zustand";

export interface ISet {
  id: string;
  name: string;
  series: string;
  printedTotal: number;
  total: number;
  legalities: ILegality;
  ptcgoCode: string;
  releaseDate: string;
  updatedAt: string;
  images: SetImage;
  count: number;
}

interface Cart {
  cart: Set[];
  addItem: (data: Set) => void;
  deleteItem: (id: string) => void;
}

export const useCart = create<Cart>()((set, get) => ({
  cart: [],
  addItem: (data: Set) =>
    set((state) => ({
      cart: [...state.cart, data],
    })),
  deleteItem: (id) =>
    set((state) => ({
      cart: state.cart.filter((el) => id !== el.id),
    })),
}));
