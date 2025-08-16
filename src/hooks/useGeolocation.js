

// hooks/useGeolocation.js - Version CORRIGÉE (avec gestion user gesture)
import { useState, useEffect, useCallback } from 'react';

export const useGeolocation = (options = {}) => {
  const [location, setLocation] = useState({
    latitude: null,
    longitude: null,
    error: null,
    loading: false, // 🔧 FIX: Commence à false
    hasPermission: null
  });

  // 🔧 FIX: Fonction pour demander la géolocalisation (avec user gesture)
  const requestLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setLocation(prev => ({
        ...prev,
        error: 'Géolocalisation non supportée',
        loading: false
      }));
      return;
    }

    setLocation(prev => ({ ...prev, loading: true, error: null }));

    const handleSuccess = (position) => {
      setLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        error: null,
        loading: false,
        hasPermission: true
      });
    };

    const handleError = (error) => {
      let errorMessage = 'Erreur de géolocalisation';
      
      switch (error.code) {
        case error.PERMISSION_DENIED:
          errorMessage = 'Permission de géolocalisation refusée';
          break;
        case error.POSITION_UNAVAILABLE:
          errorMessage = 'Position non disponible';
          break;
        case error.TIMEOUT:
          errorMessage = 'Délai de géolocalisation dépassé';
          break;
      }

      setLocation(prev => ({
        ...prev,
        error: errorMessage,
        loading: false,
        hasPermission: false
      }));
    };

    navigator.geolocation.getCurrentPosition(
      handleSuccess,
      handleError,
      {
        enableHighAccuracy: false, // 🔧 FIX: Moins agressif
        timeout: 10000,
        maximumAge: 600000, // 10 minutes
        ...options
      }
    );
  }, [options]);

  // 🔧 FIX: Ne pas demander automatiquement la géolocalisation
  // L'utilisateur doit cliquer sur un bouton pour déclencher la demande

  return {
    ...location,
    requestLocation // 🔧 FIX: Exposer la fonction pour l'utiliser sur action utilisateur
  };
};
