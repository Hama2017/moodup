
// context/NotificationContext.jsx - Context pour les notifications
import React, { createContext, useContext } from 'react';
import { useNotifications } from '../hooks/useNotifications';

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const notifications = useNotifications();

  return (
    <NotificationContext.Provider value={notifications}>
      {children}
      <NotificationContainer notifications={notifications.notifications} />
    </NotificationContext.Provider>
  );
};

export const useNotificationContext = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotificationContext must be used within a NotificationProvider');
  }
  return context;
};

// Composant pour afficher les notifications
const NotificationContainer = ({ notifications }) => {
  if (notifications.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {notifications.map(notification => (
        <Notification key={notification.id} {...notification} />
      ))}
    </div>
  );
};

const Notification = ({ id, type, message, onRemove }) => {
  const typeStyles = {
    success: 'bg-green-500 text-white',
    error: 'bg-red-500 text-white',
    warning: 'bg-orange-500 text-white',
    info: 'bg-blue-500 text-white'
  };

  const typeIcons = {
    success: '✓',
    error: '✕',
    warning: '⚠',
    info: 'ℹ'
  };

  return (
    <div className={`
      px-4 py-3 rounded-lg shadow-lg min-w-80 flex items-center justify-between
      animate-slide-in ${typeStyles[type]}
    `}>
      <div className="flex items-center">
        <span className="mr-2 font-bold">{typeIcons[type]}</span>
        <span>{message}</span>
      </div>
      {onRemove && (
        <button
          onClick={() => onRemove(id)}
          className="ml-4 opacity-70 hover:opacity-100"
        >
          ✕
        </button>
      )}
    </div>
  );
};
