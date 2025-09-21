import { create } from "zustand";
import type { User } from "@/types/user";


type AuthState = {
  isLoggedIn: boolean;
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
  restore: () => void;
};

const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn: false,
  user: null,
  login: (userData) => {
    set({ isLoggedIn: true, user: userData });
    localStorage.setItem("auth", JSON.stringify({ isLoggedIn: true, user: userData }));
  },
  logout: () => {
    set({ isLoggedIn: false, user: null });
    localStorage.removeItem("auth");
  },
  restore: () => {
    const auth = localStorage.getItem("auth");
    if (auth) {
      const { isLoggedIn, user } = JSON.parse(auth);
      set({ isLoggedIn, user });
    }
  },
}));

export default useAuthStore;