// ============================================================================
// 1. src/config/api.js - Configuration API (nouveau fichier)
// ============================================================================
import axios from 'axios';
import { Capacitor } from '@capacitor/core';
import { Preferences } from '@capacitor/preferences';

// URL de l'API
const API_BASE_URL = 'http://localhost:8000/api/v1';

// Instance Axios configurée
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// Fonction pour obtenir le token selon la plateforme
const getToken = async () => {
  try {
    if (Capacitor.isNativePlatform()) {
      const { value } = await Preferences.get({ key: 'authToken' });
      return value;
    } else {
      return localStorage.getItem('authToken');
    }
  } catch (error) {
    return null;
  }
};

// Fonction pour stocker le token
const setToken = async (token) => {
  try {
    if (Capacitor.isNativePlatform()) {
      await Preferences.set({ key: 'authToken', value: token });
    } else {
      localStorage.setItem('authToken', token);
    }
  } catch (error) {
    console.error('Error setting token:', error);
  }
};

// Fonction pour supprimer le token
const removeToken = async () => {
  try {
    if (Capacitor.isNativePlatform()) {
      await Preferences.remove({ key: 'authToken' });
    } else {
      localStorage.removeItem('authToken');
    }
  } catch (error) {
    console.error('Error removing token:', error);
  }
};

// Intercepteur pour ajouter automatiquement le token
api.interceptors.request.use(async (config) => {
  const token = await getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  
  console.log(`🌐 ${config.method?.toUpperCase()} ${config.url}`);
  return config;
});

// Intercepteur pour gérer les erreurs
api.interceptors.response.use(
  (response) => {
    console.log(`✅ ${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    console.error(`❌ ${error.response?.status} ${error.config?.url}`, error.response?.data);
    
    // Si token expiré, déconnecter automatiquement
    if (error.response?.status === 401) {
      removeToken();
      window.dispatchEvent(new CustomEvent('auth:logout'));
    }
    
    // Message d'erreur plus propre
    const message = error.response?.data?.detail || 
                   error.response?.data?.message || 
                   error.message || 
                   'Erreur réseau';
    
    return Promise.reject(new Error(message));
  }
);

export { api, setToken, removeToken, getToken };
