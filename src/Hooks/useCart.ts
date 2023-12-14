import { ILegality, Set, SetImage } from "pokemon-tcg-sdk-typescript/dist/sdk";
import { create } from "zustand";

interface Cart {
  cart: ISet[];
  addItem: (data: Set) => void;
  deleteItem: (id: string, indx: number) => void;
  addAll: (data: ISet[]) => void;
}
interface ISet extends Set {
  count: number;
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
    const cart = get().cart;
    const i = cart.findIndex((el) => el.id === id);
    if (i === -1) {
      set((state) => ({
        cart: state.cart.filter((el, index) => id !== el.id && index !== indx),
      }));
    } else
      set((state) => ({
        cart: state.cart.filter((el, index) => id !== el.id && index !== indx),
      }));
    localStorage.setItem("cart", JSON.stringify(get().cart));
  },
  addAll: (sets: ISet[]) =>
    set((state) => ({
      cart: sets,
    })),
}));
