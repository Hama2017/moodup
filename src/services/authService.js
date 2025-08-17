
// ============================================================================
// 2. src/services/authService.js - Version mise à jour
// ============================================================================
import { Capacitor } from '@capacitor/core';
import { Preferences } from '@capacitor/preferences';
import { api, setToken, removeToken } from '../config/api';

class AuthService {
  constructor() {
    this.currentUser = null;
    this.initializeAuth();
  }

  async initializeAuth() {
    this.currentUser = await this.getStoredUser();
  }

  // Stockage unifié
  async setSecureItem(key, value) {
    const stringValue = JSON.stringify(value);
    
    if (Capacitor.isNativePlatform()) {
      await Preferences.set({ key, value: stringValue });
    } else {
      localStorage.setItem(key, stringValue);
    }
  }

  async getSecureItem(key) {
    try {
      let value;
      if (Capacitor.isNativePlatform()) {
        const result = await Preferences.get({ key });
        value = result.value;
      } else {
        value = localStorage.getItem(key);
      }
      
      return value ? JSON.parse(value) : null;
    } catch (error) {
      return null;
    }
  }

  async removeSecureItem(key) {
    if (Capacitor.isNativePlatform()) {
      await Preferences.remove({ key });
    } else {
      localStorage.removeItem(key);
    }
  }

  async login(email, password) {
    // Votre backend attend 'identifier', pas 'email'
    const response = await api.post('/auth/login', { 
      identifier: email,  // ← Changement ici
      password 
    });
    
    const { access_token, user } = response.data;

    await setToken(access_token);
    await this.setSecureItem('currentUser', user);
    this.currentUser = user;
    
    return { success: true, user, token: access_token };
  }

  async register(userData) {
    // Mapper les données du frontend vers le backend
    const backendData = {
      username: userData.username,
      email: userData.email,
      password: userData.password,
      confirm_password: userData.confirmPassword,
      first_name: userData.fullName?.split(' ')[0] || '',
      last_name: userData.fullName?.split(' ').slice(1).join(' ') || ''
    };

    const response = await api.post('/auth/register', backendData);
    return { success: true, user: response.data.user };
  }

  async logout() {
    try {
      await api.post('/auth/logout');
    } catch (error) {
      console.warn('Server logout failed:', error);
    }
    
    await removeToken();
    await this.removeSecureItem('currentUser');
    this.currentUser = null;
    
    return { success: true };
  }

  async getCurrentUser() {
    if (this.currentUser) {
      return this.currentUser;
    }
    
    try {
      const response = await api.get('/auth/me');
      this.currentUser = response.data;
      await this.setSecureItem('currentUser', response.data);
      return response.data;
    } catch (error) {
      await this.logout();
      return null;
    }
  }

  async getStoredUser() {
    return await this.getSecureItem('currentUser');
  }

  isAuthenticated() {
    return !!this.currentUser;
  }

  async verifyToken() {
    try {
      await api.post('/auth/verify-token');
      return true;
    } catch (error) {
      return false;
    }
  }

  async updateProfile(updates) {
    const response = await api.put('/users/me', updates);
    this.currentUser = response.data;
    await this.setSecureItem('currentUser', response.data);
    return { success: true, user: response.data };
  }
}

export const authService = new AuthService();
