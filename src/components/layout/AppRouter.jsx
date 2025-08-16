

// components/layout/AppRouter.jsx - Routeur principal
import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import AuthLayout from './AuthLayout';
import MainLayout from './MainLayout';
import Spinner from '../ui/Spinner';

const AppRouter = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 bg-gradient-to-r from-purple-600 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-white text-2xl font-bold">M</span>
          </div>
          <Spinner size="lg" />
          <p className="text-gray-600 mt-4">Chargement...</p>
        </div>
      </div>
    );
  }

  return isAuthenticated ? <MainLayout /> : <AuthLayout />;
};

export default AppRouter;