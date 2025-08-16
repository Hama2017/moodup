// App.jsx - Application principale refactorisée
import React from 'react';
import { AuthProvider } from './context/AuthContext';
import { AppProvider } from './context/AppContext';
import { NotificationProvider } from './context/NotificationContext';
import { ThemeProvider } from './context/ThemeContext';
import AppRouter from './components/layout/AppRouter';
import './index.css';

const App = () => {
  return (
    <ThemeProvider>
      <NotificationProvider>
        <AuthProvider>
          <AppProvider>
            <div className="min-h-screen bg-gray-50">
              <AppRouter />
            </div>
          </AppProvider>
        </AuthProvider>
      </NotificationProvider>
    </ThemeProvider>
  );
};

export default App;