
// context/ThemeContext.jsx - Context pour le thème
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useLocalStorage('theme', 'light');
  const [primaryColor, setPrimaryColor] = useLocalStorage('primaryColor', 'purple');

  useEffect(() => {
    // Apply theme to document
    document.documentElement.className = theme;
    
    // Apply primary color CSS custom properties
    const colors = {
      purple: {
        primary: '#9333ea',
        primaryDark: '#7e22ce',
        secondary: '#ec4899'
      },
      blue: {
        primary: '#3b82f6',
        primaryDark: '#2563eb',
        secondary: '#06b6d4'
      },
      green: {
        primary: '#10b981',
        primaryDark: '#059669',
        secondary: '#84cc16'
      }
    };

    const selectedColors = colors[primaryColor] || colors.purple;
    
    Object.entries(selectedColors).forEach(([key, value]) => {
      document.documentElement.style.setProperty(`--color-${key}`, value);
    });
  }, [theme, primaryColor]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const value = {
    theme,
    primaryColor,
    setTheme,
    setPrimaryColor,
    toggleTheme
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};