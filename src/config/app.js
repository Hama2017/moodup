

// config/app.js
export const APP_CONFIG = {
  name: 'MoodUp',
  version: '1.0.0',
  description: 'Connecter les communautés',
  author: 'MoodUp Team',
  
  // API Configuration
  api: {
    baseUrl: import.meta.env.VITE_API_BASE_URL || '',
    timeout: 10000
  },
  
  // Map Configuration
  map: {
    defaultCenter: {
      lat: 49.4944,
      lng: 0.1079
    },
    defaultZoom: 12,
    maxDistance: 50000 // 50km in meters
  },
  
  // Feature flags
  features: {
    enableGeolocation: true,
    enableNotifications: true,
    enableDarkMode: true,
    enableAnalytics: false
  },
  
  // Validation rules
  validation: {
    password: {
      minLength: 6,
      requireSpecialChar: false,
      requireNumber: false
    },
    username: {
      minLength: 3,
      maxLength: 20,
      allowedChars: /^[a-zA-Z0-9_]+$/
    },
    activity: {
      title: {
        minLength: 3,
        maxLength: 100
      },
      description: {
        maxLength: 500
      },
      maxParticipants: {
        min: 2,
        max: 50
      }
    }
  },
  
  // UI Configuration
  ui: {
    defaultPageSize: 20,
    animationDuration: 300,
    debounceDelay: 300,
    notificationDuration: 5000
  },
  
  // Storage keys
  storage: {
    authToken: 'moodup_auth_token',
    currentUser: 'moodup_current_user',
    activities: 'moodup_activities',
    preferences: 'moodup_preferences',
    theme: 'moodup_theme'
  }
};
