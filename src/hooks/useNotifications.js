
// hooks/useNotifications.js - Hook pour les notifications
import { useState, useCallback } from 'react';

export const useNotifications = () => {
  const [notifications, setNotifications] = useState([]);

  const addNotification = useCallback((notification) => {
    const id = Date.now().toString();
    const newNotification = {
      id,
      type: 'info',
      duration: 5000,
      ...notification
    };

    setNotifications(prev => [...prev, newNotification]);

    // Auto-remove after duration
    if (newNotification.duration > 0) {
      setTimeout(() => {
        removeNotification(id);
      }, newNotification.duration);
    }

    return id;
  }, []);

  const removeNotification = useCallback((id) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  }, []);

  const clearAll = useCallback(() => {
    setNotifications([]);
  }, []);

  // Convenience methods
  const success = useCallback((message, options = {}) => {
    return addNotification({ ...options, type: 'success', message });
  }, [addNotification]);

  const error = useCallback((message, options = {}) => {
    return addNotification({ ...options, type: 'error', message, duration: 0 });
  }, [addNotification]);

  const warning = useCallback((message, options = {}) => {
    return addNotification({ ...options, type: 'warning', message });
  }, [addNotification]);

  const info = useCallback((message, options = {}) => {
    return addNotification({ ...options, type: 'info', message });
  }, [addNotification]);

  return {
    notifications,
    addNotification,
    removeNotification,
    clearAll,
    success,
    error,
    warning,
    info
  };
};