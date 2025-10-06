import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useSocketStore from '../store/socketStore';
import useAuthStore from '../store/useAuthStore';
import type { NotificationData } from '@/types/socket';
import BellIcon from '../icons/bell';

interface NotificationItemProps {
  notification: NotificationData;
  onClick: () => void;
  onDelete: () => void;
}

const NotificationItem: React.FC<NotificationItemProps> = ({ 
  notification, 
  onClick,
  onDelete 
}) => {
  return (
    <div 
      className="notification-item border-b p-3 hover:bg-gray-50 cursor-pointer transition-colors"
      onClick={onClick}
    >
      <div className="notification-content">
        <h4 className="font-semibold text-sm">{notification.title}</h4>
        <p className="text-xs text-gray-600 mt-1">{notification.message}</p>
        <small className="text-xs text-gray-400">
          {new Date(notification.data.timestamp).toLocaleString('id-ID')}
        </small>
      </div>
      <button 
        className="delete-notification absolute top-2 right-2 text-gray-400 hover:text-red-500"
        onClick={(e) => {
          e.stopPropagation();
          onDelete();
        }}
      >
        <span className="text-lg">&times;</span>
      </button>
    </div>
  );
};

const NotificationList: React.FC = () => {
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const { notifications, clearNotifications, removeNotification, isConnected } = useSocketStore();
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleToggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleClearAll = () => {
    clearNotifications();
  };
  
  const handleNotificationClick = (notification: NotificationData) => {
    setShowDropdown(false);
    
    // Navigate based on notification type and user role
    const { type } = notification;
    const userRole = user?.role?.name;
    
    if (type === 'NEW_ORDER' || type === 'ORDER_STATUS_UPDATE') {
      if (userRole === 'Kasir') {
        navigate('/kasir/pesanan');
      } else if (userRole === 'Owner') {
        navigate('/owner/pesanan');
      } else if (userRole === 'Pelanggan') {
        navigate('/history-order');
      }
    } else if (type === 'NEW_RESERVATION' || type === 'RESERVATION_STATUS_UPDATE') {
      if (userRole === 'Kasir') {
        navigate('/kasir/reservasi');
      } else if (userRole === 'Owner') {
        navigate('/owner/reservasi');
      } else if (userRole === 'Pelanggan') {
        navigate('/history-reservasi');
      }
    }
  };

  return (
    <div className="notification-container relative hidden md:block" ref={dropdownRef}>
      {/* Notification Icon with Badge */}
      <button 
        className="notification-icon relative p-2 hover:bg-gray-100 rounded-full transition-colors" 
        onClick={handleToggleDropdown}
        title={isConnected ? "Connected" : "Disconnected"}
      >
        <BellIcon className={`text-xl size-5 ${isConnected ? 'text-secondary' : 'text-primary'}`} />
        {notifications.length > 0 && (
          <span className="notification-badge absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {notifications.length > 9 ? '9+' : notifications.length}
          </span>
        )}
        {!isConnected && (
          <span className="absolute bottom-0 right-0 w-2 h-2 bg-yellow-500 rounded-full"></span>
        )}
      </button>
      
      {/* Notification Dropdown */}
      {showDropdown && (
        <div className="notification-dropdown absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50 max-h-96 overflow-hidden flex flex-col">
          <div className="notification-header p-3 border-b flex justify-between items-center bg-gray-50">
            <h3 className="font-semibold">Notifikasi ({notifications.length})</h3>
            {notifications.length > 0 && (
              <button 
                onClick={handleClearAll}
                className="text-xs text-blue-600 hover:text-blue-800"
              >
                Clear All
              </button>
            )}
          </div>
          
          <div className="notification-list overflow-y-auto flex-1">
            {notifications.length === 0 ? (
              <div className="no-notifications p-6 text-center text-gray-400">
                Tidak ada notifikasi
              </div>
            ) : (
              notifications.map(notification => (
                <NotificationItem
                  key={notification.id}
                  notification={notification}
                  onClick={() => handleNotificationClick(notification)}
                  onDelete={() => removeNotification(notification.id)}
                />
              ))
            )}
          </div>
          
          {!isConnected && (
            <div className="p-2 bg-yellow-50 border-t text-xs text-yellow-700 text-center">
              Reconnecting...
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationList;