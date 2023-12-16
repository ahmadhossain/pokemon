import { Set } from "pokemon-tcg-sdk-typescript/dist/sdk";
import { create } from "zustand";

interface Cart {
  cart: Set[];
  addItem: (data: Set) => void;
  deleteItem: (id: string, indx: number) => void;
  addAll: (data: Set[]) => void;
}

export const useCart = create<Cart>()((set, get) => ({
  cart: [],
  addItem: (data: Set) => {
    set((state) => ({
      cart: [...state.cart, data],
    })),
      localStorage.setItem("cart", JSON.stringify(get().cart));
  },
  deleteItem: (id, indx) => {
    set((state) => ({
      cart: state.cart.filter((set, index) => id !== set.id || index !== indx),
    }));
    localStorage.setItem("cart", JSON.stringify(get().cart));
  },
  addAll: (sets: Set[]) =>
    set((state) => ({
      cart: sets,
    })),
}));
