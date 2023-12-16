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
    const cart = get().cart;
    const i = cart.findIndex((el) => el.id === data.id);
    if (i === -1) {
      set((state) => ({
        cart: [...state.cart, { ...data, count: 0 }],
      }));
    } else {
      const card = cart.find((el) => el.id === data.id) as Set;
      set((state) => ({
        cart: [...state.cart, { ...card, count: 0 }],
      })),
        localStorage.setItem("cart", JSON.stringify(get().cart));
    }
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
