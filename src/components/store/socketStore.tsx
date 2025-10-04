import { create } from "zustand";
import { persist } from "zustand/middleware";
import { io, Socket } from "socket.io-client";
import { toast } from "sonner";
import Notif from "../icons/notif";
import type { NotificationData, SocketStore } from "@/types/socket";

const notificationSound = new Audio("/sound/bellCustomer.mp3");

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

const MAX_NOTIFICATIONS = 10;
const authStore = (window as any)._AUTH_STORE_;

const useSocketStore = create<SocketStore>()(
  persist(
    (set, get) => ({
      socket: null as Socket | null,
      isConnected: false,
      notifications: [] as NotificationData[],
      reconectAttempts: 0,

      initSocket: () => {
        // Disconnect existing socket first
        if (get().socket) {
          get().socket?.removeAllListeners();
          get().socket?.disconnect();
        }

        const socket = io(API_URL, {
          withCredentials: true,
          reconnectionAttempts: 5,
          reconnectionDelay: 1000,
          transports: ["websocket", "polling"], // Coba websocket dulu
        });

        socket.on("connect", () => {
          set({ isConnected: true });

          // Ping server untuk verify connection
          socket.emit("ping");
        });

        socket.on("disconnect", (reason) => {
          set({ isConnected: false });

          if (
            reason !== "io server disconnect" &&
            reason !== "io client disconnect"
          ) {
            setTimeout(() => {
              // Check if we're still logged in before reconnecting
              if (authStore?.getState().isLoggedIn) {
                get().initSocket();
              }
            }, 3000);
          }
          const attempts = get().reconectAttempts;
          if (authStore?.getState().isLoggedIn && attempts < 5) {
            set({ reconectAttempts: attempts + 1 });
            
            setTimeout(() => {
              get().initSocket();
            }, 3000 * (attempts + 1)); // Exponential backoff
          } else if (attempts >= 5) {
            toast.error("Koneksi terputus. Silakan refresh halaman.");
          }
        });

        // IMPORTANT: Setup notification listener
        socket.on("notification", (data: NotificationData) => {

          // Play sound
          try {
            notificationSound.play()
          } catch (error) {
            toast.error("Error playing notification sound");
          }

          // Show toast
          toast(data.title, {
            className: "my-classname",
            description: data.message,
            duration: 5000,
            icon: <Notif className="size-4 text-primary" />,
          });

          // Save to state
          set((state) => ({
            notifications: [
              { ...data, id: data.id || Date.now() },
              ...state.notifications,
            ].slice(0, MAX_NOTIFICATIONS),
          }));
        });

        socket.on("connect_error", (err) => {
          set({ isConnected: false });

          const attempts = get().reconectAttempts;
          if (attempts === 0) {
            if (
              err.message.includes("Authentication") ||
              err.message.includes("Unauthorized")
            ) {
              // Token might be expired, let auto-refresh handle it
              toast.error("Sesi Anda telah berakhir");
            }
          }
        });

        socket.on("auth_error", () => {
          toast.error("Sesi Anda telah berakhir");
          authStore?.getState().logout();
        });

        // Save socket to state
        set({ socket });
      },

      clearNotifications: () => {
        set({ notifications: [] });
      },

      removeNotification: (id: number) => {
        set((state) => ({
          notifications: state.notifications.filter((n) => n.id !== id),
        }));
      },

      disconnectSocket: () => {
        const { socket } = get();
        if (socket) {
          socket.removeAllListeners();
          socket.disconnect();
          set({ socket: null, isConnected: false });
        }
      },
    }),
    {
      name: "opak-kopi-notifications",
      partialize: (state) => ({
        // Hanya menyimpan notifications ke localStorage, bukan socket
        notifications: state.notifications,
      }),
    }
  )
);

export default useSocketStore;
