import React, { useState, useEffect } from 'react';
import { ArrowLeft, Navigation } from 'lucide-react';
import ActivityActionMenu from './ActivityActionMenu';

const NavigationFullscreen = ({ 
  activity, 
  destination, 
  onClose 
}) => {
  const [userLocation, setUserLocation] = useState(null);
  const [showActionMenu, setShowActionMenu] = useState(false);
  const [mapLoaded, setMapLoaded] = useState(false);

  // Coordonnées de destination (Le Havre + variation)
  const destinationCoords = {
    lat: destination?.latitude || 49.4944 + (Math.random() - 0.5) * 0.01,
    lng: destination?.longitude || 0.1079 + (Math.random() - 0.5) * 0.01
  };

  // Obtenir la géolocalisation de l'utilisateur
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.log('Géolocalisation non disponible:', error);
          // Position par défaut (Le Havre centre)
          setUserLocation({
            lat: 49.4944,
            lng: 0.1079
          });
        }
      );
    } else {
      // Position par défaut si géolocalisation non supportée
      setUserLocation({
        lat: 49.4944,
        lng: 0.1079
      });
    }
  }, []);

  // Charger Mapbox et afficher l'itinéraire
  useEffect(() => {
    if (!userLocation) return;

    // Initialiser la carte avec Mapbox
    const script = document.createElement('script');
    script.src = 'https://api.mapbox.com/mapbox-gl-js/v2.15.0/mapbox-gl.js';
    script.onload = () => {
      initMap();
    };
    document.head.appendChild(script);

    const link = document.createElement('link');
    link.href = 'https://api.mapbox.com/mapbox-gl-js/v2.15.0/mapbox-gl.css';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    return () => {
      document.head.removeChild(script);
      document.head.removeChild(link);
    };
  }, [userLocation]);

  const initMap = () => {
    if (!window.mapboxgl || !userLocation) return;

    const mapboxToken = import.meta.env.VITE_MAPBOX_TOKEN;
    if (!mapboxToken) {
      console.error('Token Mapbox manquant');
      return;
    }

    window.mapboxgl.accessToken = mapboxToken;

    const map = new window.mapboxgl.Map({
      container: 'navigation-map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [userLocation.lng, userLocation.lat],
      zoom: 12
    });

    map.on('load', () => {
      setMapLoaded(true);

      // Ajouter marqueur position utilisateur (point bleu pulsant comme sur la carte principale)
      const userMarkerElement = document.createElement('div');
      userMarkerElement.innerHTML = `
        <div class="relative flex flex-col items-center">
          <div class="bg-white px-2 py-1 rounded-lg shadow-lg border border-gray-200 mb-2">
            <span class="text-xs font-medium text-gray-900">Moi</span>
          </div>
          <div class="relative">
            <div class="w-3 h-3 bg-blue-500 rounded-full animate-ping absolute"></div>
            <div class="w-3 h-3 bg-blue-600 rounded-full border-2 border-white shadow-lg"></div>
          </div>
        </div>
      `;
      
      new window.mapboxgl.Marker(userMarkerElement)
        .setLngLat([userLocation.lng, userLocation.lat])
        .addTo(map);

      // Ajouter marqueur destination (même style que les activités sur la carte principale)
      const activityMarkerElement = document.createElement('div');
      activityMarkerElement.innerHTML = `
        <div class="relative flex flex-col items-center">
          <div class="bg-white px-2 py-1 rounded-lg shadow-lg border border-gray-200 mb-2">
            <span class="text-xs font-medium text-gray-900">${activity.location}</span>
          </div>
          <div class="relative">
            <div class="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-500 rounded-full flex items-center justify-center border-2 border-white shadow-lg">
              <span class="text-white text-sm font-bold">${activity.creator[0]}</span>
            </div>
            <div class="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-white px-2 py-1 rounded-full shadow-sm border border-gray-200">
              <div class="flex items-center space-x-1">
                ${activity.moods.slice(0, 2).map(mood => `<span class="text-xs">${mood.emoji}</span>`).join('')}
              </div>
            </div>
          </div>
        </div>
      `;
      
      new window.mapboxgl.Marker(activityMarkerElement)
        .setLngLat([destinationCoords.lng, destinationCoords.lat])
        .addTo(map);

      // Ajuster la vue pour voir les deux points
      const bounds = new window.mapboxgl.LngLatBounds();
      bounds.extend([userLocation.lng, userLocation.lat]);
      bounds.extend([destinationCoords.lng, destinationCoords.lat]);
      map.fitBounds(bounds, { padding: 80 });

      // Obtenir un vrai itinéraire avec l'API Directions de Mapbox
      getDirections(map);
    });
  };

  // Obtenir un vrai itinéraire avec l'API Directions de Mapbox
  const getDirections = async (map) => {
    try {
      const mapboxToken = import.meta.env.VITE_MAPBOX_TOKEN;
      const directionsUrl = `https://api.mapbox.com/directions/v5/mapbox/driving/${userLocation.lng},${userLocation.lat};${destinationCoords.lng},${destinationCoords.lat}?geometries=geojson&access_token=${mapboxToken}`;
      
      const response = await fetch(directionsUrl);
      const data = await response.json();
      
      if (data.routes && data.routes[0]) {
        const route = data.routes[0];
        
        // Ajouter l'itinéraire sur la carte
        map.addSource('route', {
          type: 'geojson',
          data: {
            type: 'Feature',
            properties: {},
            geometry: route.geometry
          }
        });

        map.addLayer({
          id: 'route',
          type: 'line',
          source: 'route',
          layout: {
            'line-join': 'round',
            'line-cap': 'round'
          },
          paint: {
            'line-color': '#8b5cf6',
            'line-width': 5,
            'line-opacity': 0.8
          }
        });

        // Mettre à jour les calculs de distance et temps avec les données réelles
        window.routeData = {
          distance: route.distance,
          duration: route.duration
        };
      }
    } catch (error) {
      console.log('Erreur lors du calcul de l\'itinéraire:', error);
      // Fallback: ligne droite si l'API ne fonctionne pas
      map.addSource('route', {
        type: 'geojson',
        data: {
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'LineString',
            coordinates: [
              [userLocation.lng, userLocation.lat],
              [destinationCoords.lng, destinationCoords.lat]
            ]
          }
        }
      });

      map.addLayer({
        id: 'route',
        type: 'line',
        source: 'route',
        layout: {
          'line-join': 'round',
          'line-cap': 'round'
        },
        paint: {
          'line-color': '#8b5cf6',
          'line-width': 4,
          'line-opacity': 0.6
        }
      });
    }
  };

  const calculateDistance = () => {
    if (!userLocation) return "Calcul...";
    
    // Utiliser les données de l'itinéraire réel si disponibles
    if (window.routeData) {
      const distance = window.routeData.distance / 1000; // Convertir en km
      if (distance < 1) {
        return `${Math.round(distance * 1000)}m`;
      }
      return `${distance.toFixed(1)}km`;
    }
    
    // Fallback: calcul à vol d'oiseau
    const R = 6371; // Rayon de la Terre en km
    const dLat = (destinationCoords.lat - userLocation.lat) * Math.PI / 180;
    const dLng = (destinationCoords.lng - userLocation.lng) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(userLocation.lat * Math.PI / 180) * Math.cos(destinationCoords.lat * Math.PI / 180) *
      Math.sin(dLng/2) * Math.sin(dLng/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const distance = R * c;
    
    if (distance < 1) {
      return `${Math.round(distance * 1000)}m`;
    }
    return `${distance.toFixed(1)}km`;
  };

  const estimateTime = () => {
    if (!userLocation) return "Calcul...";
    
    // Utiliser les données de l'itinéraire réel si disponibles
    if (window.routeData) {
      const timeInMinutes = Math.round(window.routeData.duration / 60);
      if (timeInMinutes < 60) {
        return `${timeInMinutes}min`;
      }
      const hours = Math.floor(timeInMinutes / 60);
      const minutes = timeInMinutes % 60;
      return `${hours}h${minutes > 0 ? ` ${minutes}min` : ''}`;
    }
    
    // Fallback: estimation basée sur la distance à vol d'oiseau
    const distance = parseFloat(calculateDistance());
    if (isNaN(distance)) return "Calcul...";
    
    // Estimation: 50km/h en ville
    const timeInHours = distance / 50;
    const timeInMinutes = Math.round(timeInHours * 60);
    
    if (timeInMinutes < 60) {
      return `${timeInMinutes}min`;
    }
    const hours = Math.floor(timeInMinutes / 60);
    const minutes = timeInMinutes % 60;
    return `${hours}h${minutes > 0 ? ` ${minutes}min` : ''}`;
  };

  return (
    <div className="fixed inset-0 bg-white z-50">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-10 bg-white/90 backdrop-blur-sm p-4">
        <div className="flex items-center justify-between">
          <button
            onClick={onClose}
            className="p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-all"
          >
            <ArrowLeft className="w-6 h-6 text-gray-700" />
          </button>
          <div className="text-center">
            <h2 className="font-semibold text-gray-900">Itinéraire vers</h2>
            <p className="text-sm text-gray-600">{activity.title}</p>
          </div>
          <div className="w-10"></div> {/* Spacer for centering */}
        </div>
      </div>

      {/* Map Container */}
      <div className="absolute inset-0">
        <div id="navigation-map" className="w-full h-full">
          {!mapLoaded && (
            <div className="flex items-center justify-center h-full bg-gray-100">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
                <p className="text-gray-600">Chargement de l'itinéraire...</p>
              </div>
            </div>
          )}
        </div>
        
        {/* Style pour les animations */}
        <style jsx>{`
          @keyframes ping {
            75%, 100% {
              transform: scale(2);
              opacity: 0;
            }
          }
          .animate-ping {
            animation: ping 1s cubic-bezier(0, 0, 0.2, 1) infinite;
          }
        `}</style>
      </div>

      {/* Bottom Info Panel */}
      <div className="absolute bottom-0 left-0 right-0 z-10 bg-white rounded-t-3xl shadow-2xl p-6">
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-gray-900">{activity.location}</h3>
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <span>{calculateDistance()}</span>
              <span>•</span>
              <span>{estimateTime()}</span>
            </div>
          </div>
          <p className="text-sm text-gray-500">
            Itinéraire depuis votre position
          </p>
        </div>

        <button
          onClick={() => setShowActionMenu(true)}
          className="w-full bg-gradient-to-r from-purple-600 to-pink-500 text-white py-4 rounded-2xl font-semibold flex items-center justify-center space-x-2 hover:shadow-lg transition-all"
        >
          <Navigation className="w-5 h-5" />
          <span>Ouvrir dans</span>
        </button>
      </div>

      {/* Action Menu */}
      {showActionMenu && (
        <ActivityActionMenu
          activity={activity}
          position={destinationCoords}
          onClose={() => setShowActionMenu(false)}
        />
      )}
    </div>
  );
};

export default NavigationFullscreen;