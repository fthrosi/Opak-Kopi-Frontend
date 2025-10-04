import { create } from "zustand";
import type { User } from "@/types/user";
import { persist } from "zustand/middleware";

type AuthState = {
  isLoggedIn: boolean;
  isCheckingAuth: boolean;
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
  restore: () => void;
  updateUserData: (newUserData: User) => void;
  setCheckingAuth: (val: boolean) => void;
};

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isLoggedIn: false,
      isCheckingAuth: false,
      setCheckingAuth: (val) => set({ isCheckingAuth: val }),
      login: (userData) => {
        set({ isLoggedIn: true, user: userData });
        localStorage.setItem(
          "auth",
          JSON.stringify({ isLoggedIn: true, user: userData })
        );
      },
      logout: () => {
        set({ isLoggedIn: false, user: null });
        localStorage.removeItem("auth");
      },
      updateUserData: (newUserData: User) => {
        set({ user: newUserData });
        // Update localStorage dengan data terbaru
        const currentAuth = JSON.parse(localStorage.getItem("auth") || "{}");
        localStorage.setItem(
          "auth",
          JSON.stringify({
            ...currentAuth,
            user: newUserData,
          })
        );
      },
      restore: async () => {
        set({ isCheckingAuth: true }); // ⬅️ mulai cek

        try {
          const auth = localStorage.getItem("auth");
          if (auth) {
            const { isLoggedIn, user } = JSON.parse(auth);
            set({ isLoggedIn, user });
          }
        } catch (error) {
          localStorage.removeItem("auth");
          set({ isLoggedIn: false, user: null });
        } finally {
          set({ isCheckingAuth: false }); // ⬅️ selesai cek
        }
      },
    }),
    {
      name: "opak-kopi-auth",
    }
  )
);

export default useAuthStore;
