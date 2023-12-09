import { create } from "zustand";

interface User {
  isLogin: boolean;
  login: () => void;
  logout: () => void;
}

export const useUser = create<User>()((set) => ({
  isLogin: false,
  login: () => set(() => ({ isLogin: true })),
  logout: () => set(() => ({ isLogin: false })),
}));
