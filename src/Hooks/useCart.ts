import { ILegality, Set, SetImage } from "pokemon-tcg-sdk-typescript/dist/sdk";
import { create } from "zustand";

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
