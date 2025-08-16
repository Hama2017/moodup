import { storageService } from "./storageService";
class AuthService {
  constructor() {
    this.currentUser = storageService.getItem('currentUser');
  }

  async login(email, password) {
    // Simulation d'un appel API
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (email && password) {
      const user = {
        id: '1',
        email,
        name: 'Marie Dupont',
        username: 'marie.dupont',
        avatar: null,
        location: 'Le Havre, France',
        createdAt: new Date().toISOString()
      };
      
      this.currentUser = user;
      storageService.setItem('currentUser', user);
      storageService.setItem('authToken', 'fake-jwt-token');
      
      return { success: true, user };
    }
    
    throw new Error('Identifiants invalides');
  }

  async register(userData) {
    // Simulation d'un appel API
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const user = {
      id: Date.now().toString(),
      ...userData,
      createdAt: new Date().toISOString()
    };
    
    this.currentUser = user;
    storageService.setItem('currentUser', user);
    storageService.setItem('authToken', 'fake-jwt-token');
    
    return { success: true, user };
  }

  async logout() {
    this.currentUser = null;
    storageService.removeItem('currentUser');
    storageService.removeItem('authToken');
    return { success: true };
  }

  getCurrentUser() {
    return this.currentUser;
  }

  isAuthenticated() {
    return !!this.currentUser && !!storageService.getItem('authToken');
  }

  async updateProfile(updates) {
    if (!this.currentUser) {
      throw new Error('Utilisateur non connecté');
    }

    // Simulation d'un appel API
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const updatedUser = { ...this.currentUser, ...updates };
    this.currentUser = updatedUser;
    storageService.setItem('currentUser', updatedUser);
    
    return { success: true, user: updatedUser };
  }
}

export const authService = new AuthService();