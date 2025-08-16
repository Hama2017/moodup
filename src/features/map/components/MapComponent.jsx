
// features/map/components/MapComponent.jsx - Version CORRIGÉE
import React, { useState, useCallback } from 'react';
import { Map, Marker } from 'react-map-gl';
import { MapPin, RefreshCw, Crosshair } from 'lucide-react';
import { useGeolocation } from '../../../hooks/useGeolocation';
import Spinner from '../../../components/ui/Spinner';
import Button from '../../../components/ui/Button';
import 'mapbox-gl/dist/mapbox-gl.css';

const MapComponent = ({ 
  activities = [], 
  onActivitySelect,
  height = "320px",
  showUserLocation = false, // 🔧 FIX: Désactivé par défaut
  interactive = true
}) => {
  const [viewState, setViewState] = useState({
    latitude: 49.4944, // 🔧 FIX: Position par défaut (Le Havre)
    longitude: 0.1079,
    zoom: 12
  });
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showLocationButton, setShowLocationButton] = useState(true);
  
  const { latitude, longitude, loading: locationLoading, error: locationError, requestLocation } = useGeolocation();
  const mapboxToken = import.meta.env.VITE_MAPBOX_TOKEN;

  // 🔧 FIX: Fonction pour demander la géolocalisation sur clic utilisateur
  const handleLocationRequest = useCallback(() => {
    setShowLocationButton(false);
    requestLocation();
  }, [requestLocation]);

  // 🔧 FIX: Utiliser la position utilisateur si disponible, sinon Le Havre
  const centerLatitude = latitude || 49.4944;
  const centerLongitude = longitude || 0.1079;

  // Générer des positions pour les activités
  const getActivityPosition = useCallback((index) => {
    const baseLatitude = centerLatitude;
    const baseLongitude = centerLongitude;
    const radius = 0.02;
    const angle = (index * 72) % 360;
    
    return {
      latitude: baseLatitude + (Math.cos(angle * Math.PI / 180) * radius),
      longitude: baseLongitude + (Math.sin(angle * Math.PI / 180) * radius)
    };
  }, [centerLatitude, centerLongitude]);

  const handleRefresh = useCallback(() => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000);
  }, []);

  const handleActivityClick = useCallback((activity) => {
    onActivitySelect?.(activity);
  }, [onActivitySelect]);

  // Error state
  if (!mapboxToken) {
    return (
      <div 
        className="bg-red-100 border-2 border-red-500 rounded-2xl p-6 flex items-center justify-center"
        style={{ height }}
      >
        <div className="text-center">
          <div className="text-red-800 font-bold text-lg mb-2">❌ Configuration manquante</div>
          <div className="text-red-600 text-sm">Token Mapbox requis dans .env</div>
        </div>
      </div>
    );
  }

  try {
    return (
      <div className="relative rounded-2xl overflow-hidden" style={{ height }}>
        <Map
          {...viewState}
          onMove={interactive ? evt => setViewState(evt.viewState) : undefined}
          style={{ width: '100%', height: '100%' }}
          mapStyle="mapbox://styles/mapbox/streets-v11"
          mapboxAccessToken={mapboxToken}
          attributionControl={false}
          interactive={interactive}
        >
          {/* Position utilisateur (seulement si activée et disponible) */}
          {showUserLocation && latitude && longitude && (
            <Marker
              latitude={latitude}
              longitude={longitude}
              anchor="center"
            >
              <div className="relative">
                <div className="w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-lg"></div>
                <div className="absolute inset-0 bg-blue-500 rounded-full animate-ping opacity-30"></div>
              </div>
            </Marker>
          )}

          {/* Marqueurs des activités */}
          {activities.map((activity, index) => {
            const position = getActivityPosition(index);
            return (
              <Marker
                key={activity.id}
                latitude={position.latitude}
                longitude={position.longitude}
                anchor="center"
              >
                <button
                  className="cursor-pointer transform hover:scale-110 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 rounded-full"
                  onClick={() => handleActivityClick(activity)}
                  title={activity.title}
                >
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-500 rounded-full flex items-center justify-center shadow-lg border-2 border-white relative">
                    <span className="text-white text-sm font-bold">
                      {activity.creator?.name?.charAt(0) || 'A'}
                    </span>
                    
                    {/* Badge avec moods */}
                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-white px-2 py-1 rounded-full shadow-md border border-gray-200">
                      <div className="flex items-center space-x-1">
                        {activity.moods?.slice(0, 2).map((mood, j) => (
                          <span key={j} className="text-xs">{mood.emoji}</span>
                        ))}
                      </div>
                    </div>
                    
                    {/* Animation de pulsation */}
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-500 rounded-full animate-ping opacity-20"></div>
                  </div>
                </button>
              </Marker>
            );
          })}
        </Map>

        {/* Overlay nom de ville */}
        <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-xl shadow-lg border border-gray-200">
          <div className="flex items-center space-x-2">
            <MapPin className="w-4 h-4 text-purple-600" />
            <span className="text-sm font-medium text-gray-700">Le Havre</span>
          </div>
        </div>

        {/* Boutons de contrôle */}
        <div className="absolute top-4 left-4 space-y-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={handleRefresh}
            loading={isRefreshing}
            className="bg-white/90 backdrop-blur-sm border border-gray-200 hover:bg-white"
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
          </Button>

          {/* 🔧 FIX: Bouton géolocalisation (sur action utilisateur) */}
          {showLocationButton && (
            <Button
              variant="secondary"
              size="sm"
              onClick={handleLocationRequest}
              loading={locationLoading}
              className="bg-white/90 backdrop-blur-sm border border-gray-200 hover:bg-white"
              title="Centrer sur ma position"
            >
              <Crosshair className="w-4 h-4" />
            </Button>
          )}

          {/* Affichage erreur géolocalisation */}
          {locationError && (
            <div className="bg-red-100 border border-red-300 rounded-lg px-2 py-1 text-xs text-red-600">
              Position non disponible
            </div>
          )}
        </div>

        {/* Compteur d'activités */}
        {activities.length > 0 && (
          <div className="absolute top-4 right-4 bg-gradient-to-r from-purple-600 to-pink-500 text-white px-3 py-2 rounded-xl shadow-lg">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              <span className="text-sm font-medium">{activities.length} MoodUps</span>
            </div>
          </div>
        )}
      </div>
    );
  } catch (error) {
    console.error('Erreur carte:', error);
    return (
      <div 
        className="bg-red-100 border-2 border-red-500 rounded-2xl p-6 flex items-center justify-center"
        style={{ height }}
      >
        <div className="text-center">
          <div className="text-red-800 font-bold text-lg mb-2">❌ Erreur Carte</div>
          <div className="text-red-600 text-sm">{error.message}</div>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleRefresh}
            className="mt-3"
          >
            Réessayer
          </Button>
        </div>
      </div>
    );
  }
};

export default MapComponent;