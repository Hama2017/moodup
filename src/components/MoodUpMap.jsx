import React, { useState } from 'react';
import { Map, Marker, NavigationControl, GeolocateControl } from 'react-map-gl';
import { MapPin } from 'lucide-react';

// Import du CSS Mapbox
import 'mapbox-gl/dist/mapbox-gl.css';

const MoodUpMap = ({ 
  activities = [], 
  onActivitySelect = () => {},
  currentLocation = { latitude: 49.4944, longitude: 0.1079 }, // Le Havre par défaut
  height = "320px" 
}) => {
  const [viewState, setViewState] = useState({
    latitude: currentLocation.latitude,
    longitude: currentLocation.longitude,
    zoom: 12
  });

  // Générer des positions aléatoires autour de Le Havre pour les activités
  const getActivityPosition = (index) => {
    const baseLatitude = currentLocation.latitude;
    const baseLongitude = currentLocation.longitude;
    
    // Rayon d'environ 5km autour de la position de base
    const radius = 0.05;
    const angle = (index * 60) % 360; // Distribuer les points
    
    return {
      latitude: baseLatitude + (Math.cos(angle * Math.PI / 180) * radius * Math.random()),
      longitude: baseLongitude + (Math.sin(angle * Math.PI / 180) * radius * Math.random())
    };
  };

  return (
    <div className="relative" style={{ height }}>
      <Map
        {...viewState}
        onMove={evt => setViewState(evt.viewState)}
        style={{ width: '100%', height: '100%' }}
        mapStyle="mapbox://styles/mapbox/light-v11"
        mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN || 'YOUR_MAPBOX_TOKEN'}
        attributionControl={false}
      >
        {/* Contrôles de navigation */}
        <NavigationControl position="top-right" />
        
        {/* Contrôle de géolocalisation */}
        <GeolocateControl
          position="bottom-right"
          trackUserLocation
          showUserHeading
        />

        {/* Marqueur de position actuelle */}
        <Marker
          latitude={currentLocation.latitude}
          longitude={currentLocation.longitude}
          anchor="center"
        >
          <div className="relative">
            <div className="w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-lg"></div>
            <div className="absolute inset-0 bg-blue-500 rounded-full animate-ping opacity-30"></div>
          </div>
        </Marker>

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
              <div
                className="relative cursor-pointer transform hover:scale-110 transition-all duration-200"
                onClick={() => onActivitySelect(activity)}
              >
                {/* Avatar principal */}
                <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-500 rounded-full flex items-center justify-center shadow-lg border-3 border-white">
                  <span className="text-white text-sm font-bold">
                    {activity.creator.charAt(0)}
                  </span>
                </div>
                
                {/* Badge avec emojis moods */}
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-white px-2 py-1 rounded-full shadow-md border border-gray-200">
                  <div className="flex items-center space-x-1">
                    {activity.moods.slice(0, 2).map((mood, j) => (
                      <span key={j} className="text-xs">{mood.emoji}</span>
                    ))}
                  </div>
                </div>
                
                {/* Effet de pulsation pour indiquer l'activité */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-500 rounded-full animate-ping opacity-20"></div>
              </div>
            </Marker>
          );
        })}
      </Map>

      {/* Overlay avec nom de la ville */}
      <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-xl shadow-lg border border-gray-200">
        <div className="flex items-center space-x-2">
          <MapPin className="w-4 h-4 text-purple-600" />
          <span className="text-sm font-medium text-gray-700">Le Havre</span>
        </div>
      </div>

      {/* Compteur d'activités */}
      <div className="absolute top-4 left-4 bg-gradient-to-r from-purple-600 to-pink-500 text-white px-3 py-2 rounded-xl shadow-lg">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
          <span className="text-sm font-medium">{activities.length} MoodUps</span>
        </div>
      </div>

      {/* Gradient overlay pour un effet plus doux */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent pointer-events-none rounded-2xl"></div>
    </div>
  );
};

export default MoodUpMap;