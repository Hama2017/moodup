import React, { useState } from 'react';
import { Map, Marker } from 'react-map-gl';
import { MapPin, RefreshCw } from 'lucide-react';
import 'mapbox-gl/dist/mapbox-gl.css';

const FinalMapboxTest = ({ 
  activities = [], 
  onActivitySelect = () => {},
  height = "320px" 
}) => {
  const [viewState, setViewState] = useState({
    latitude: 49.4944,
    longitude: 0.1079,
    zoom: 12
  });
  const [isRefreshing, setIsRefreshing] = useState(false);

  const token = import.meta.env.VITE_MAPBOX_TOKEN;
  
  if (!token) {
    return (
      <div 
        className="bg-red-100 border-2 border-red-500 rounded-2xl p-6 flex items-center justify-center"
        style={{ height }}
      >
        <div className="text-center">
          <div className="text-red-800 font-bold text-lg mb-2">❌ Token manquant</div>
          <div className="text-red-600 text-sm">Vérifiez VITE_MAPBOX_TOKEN dans .env</div>
        </div>
      </div>
    );
  }

  // Générer des positions fixes pour les activités
  const getActivityPosition = (index) => {
    const baseLatitude = 49.4944;
    const baseLongitude = 0.1079;
    const radius = 0.02;
    const angle = (index * 72) % 360; // 72 degrés pour bien répartir
    
    return {
      latitude: baseLatitude + (Math.cos(angle * Math.PI / 180) * radius),
      longitude: baseLongitude + (Math.sin(angle * Math.PI / 180) * radius)
    };
  };

  // Fonction de refresh
  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      console.log('Carte rafraîchie !');
    }, 1000);
  };

  try {
    return (
      <div className="relative rounded-2xl overflow-hidden" style={{ height }}>
        <Map
          {...viewState}
          onMove={evt => setViewState(evt.viewState)}
          style={{ width: '100%', height: '100%' }}
          mapStyle="mapbox://styles/mapbox/streets-v11"
          mapboxAccessToken={token}
          attributionControl={false}
        >
          {/* Marqueur position actuelle */}
          <Marker
            latitude={49.4944}
            longitude={0.1079}
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
                  className="cursor-pointer transform hover:scale-110 transition-all duration-200"
                  onClick={() => onActivitySelect(activity)}
                >
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-500 rounded-full flex items-center justify-center shadow-lg border-3 border-white relative">
                    <span className="text-white text-sm font-bold">
                      {activity.creator.charAt(0)}
                    </span>
                    
                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-white px-2 py-1 rounded-full shadow-md border border-gray-200">
                      <div className="flex items-center space-x-1">
                        {activity.moods.slice(0, 2).map((mood, j) => (
                          <span key={j} className="text-xs">{mood.emoji}</span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-500 rounded-full animate-ping opacity-20"></div>
                  </div>
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

        {/* Bouton refresh */}
        <div className="absolute top-4 left-4">
          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="bg-white/90 backdrop-blur-sm p-3 rounded-xl shadow-lg border border-gray-200 hover:bg-white transition-all hover:shadow-xl"
          >
            <RefreshCw 
              className={`w-5 h-5 text-purple-600 ${isRefreshing ? 'animate-spin' : ''}`} 
            />
          </button>
        </div>
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
        </div>
      </div>
    );
  }
};

export default FinalMapboxTest;