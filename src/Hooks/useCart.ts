import { Set } from "pokemon-tcg-sdk-typescript/dist/sdk";
import { create } from "zustand";

interface Cart {
  count: number;
  cart: Set[];
  addItem: (data: Set) => void;
  deleteItem: (id: string) => void;
  //   getAllItems: () => void;
}

export const useCart = create<Cart>()((set, get) => ({
  count: 0,
  cart: [],
  addItem: (data: Set) =>
    set((state) => ({
      cart: [...state.cart, data],
      count: state.count + 1,
    })),
  deleteItem: (id) =>
    set((state) => ({
      cart: state.cart.filter((el) => id !== el.id),
      count: state.count - 1,
    })),
  //   getAllItems: () => get((state) => ({state})),
}));
