
// types/notification.js
export const NotificationSchema = {
  id: String,
  type: String, // 'info', 'success', 'warning', 'error'
  title: String,
  message: String,
  duration: Number,
  createdAt: String
};