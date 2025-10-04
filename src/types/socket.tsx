
export interface NotificationData {
  id: number;
  type: string;
  title: string;
  message: string;
  data: {
    orderId?: number;
    orderNumber?: string;
    reservationId?: number;
    reservationCode?: string;
    status?: string;
    timestamp: Date | string;
    [key: string]: any;
  };
}

export interface SocketStore {
  socket: any | null;
  isConnected: boolean;
  notifications: NotificationData[];
  reconectAttempts: number;
  initSocket: () => void;
  clearNotifications: () => void;
  removeNotification: (id: number) => void;
  disconnectSocket: () => void;
}