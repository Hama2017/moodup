// ============================================================================
// 1. src/context/AuthContext.jsx - Version Simplifiée
// ============================================================================
import React, { createContext, useReducer, useEffect } from 'react';
import { authService } from '../services/authService';

const AuthContext = createContext();

const authReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
        
    case 'SET_USER':
      return { 
        ...state, 
        user: action.payload, 
        isAuthenticated: !!action.payload,
        loading: false
      };
        
    case 'LOGOUT':
      return { 
        ...state, 
        user: null, 
        isAuthenticated: false, 
        loading: false
      };
        
    default:
      return state;
  }
};

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: true
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    if (currentUser && authService.isAuthenticated()) {
      dispatch({ type: 'SET_USER', payload: currentUser });
    } else {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }, []);

  const login = async (email, password) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const result = await authService.login(email, password);
      dispatch({ type: 'SET_USER', payload: result.user });
      return result;
    } catch (error) {
      dispatch({ type: 'SET_LOADING', payload: false });
      throw error; // ✅ Laisse le composant gérer l'erreur
    }
  };

  const register = async (userData) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const result = await authService.register(userData);
      dispatch({ type: 'SET_LOADING', payload: false });
      return result; // ✅ Pas de connexion auto
    } catch (error) {
      dispatch({ type: 'SET_LOADING', payload: false });
      throw error; // ✅ Laisse le composant gérer l'erreur
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
      dispatch({ type: 'LOGOUT' });
    } catch (error) {
      throw error;
    }
  };

  const updateProfile = async (updates) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const result = await authService.updateProfile(updates);
      dispatch({ type: 'SET_USER', payload: result.user });
      return result;
    } catch (error) {
      dispatch({ type: 'SET_LOADING', payload: false });
      throw error;
    }
  };

  const value = {
    ...state,
    login,
    register,
    logout,
    updateProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext };
