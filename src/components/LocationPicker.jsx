import React, { useState, useCallback } from 'react';
import { Map, Marker } from 'react-map-gl';
import { ArrowLeft, MapPin, Check } from 'lucide-react';
import 'mapbox-gl/dist/mapbox-gl.css';

const LocationPicker = ({ 
  onClose, 
  onLocationSelect,
  initialLocation = null 
}) => {
  const [viewState, setViewState] = useState({
    latitude: initialLocation?.lat || 49.4944,
    longitude: initialLocation?.lng || 0.1079,
    zoom: 14
  });
  
  const [selectedLocation, setSelectedLocation] = useState(initialLocation);
  const [selectedAddress, setSelectedAddress] = useState('');
  const [isLoadingAddress, setIsLoadingAddress] = useState(false);

  const token = import.meta.env.VITE_MAPBOX_TOKEN;

  // Fonction pour faire du reverse geocoding (coordonnées → adresse)
  const reverseGeocode = async (lat, lng) => {
    if (!token) return null;
    
    setIsLoadingAddress(true);
    try {
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${token}&language=fr&types=address,poi,place,locality`
      );
      
      const data = await response.json();
      
      if (data.features && data.features.length > 0) {
        return data.features[0].place_name;
      }
      return `${lat.toFixed(6)}, ${lng.toFixed(6)}`;
    } catch (error) {
      console.error('Erreur reverse geocoding:', error);
      return `${lat.toFixed(6)}, ${lng.toFixed(6)}`;
    } finally {
      setIsLoadingAddress(false);
    }
  };

  // Gestionnaire de clic sur la carte
  const handleMapClick = useCallback(async (event) => {
    const { lngLat } = event;
    const newLocation = {
      lat: lngLat.lat,
      lng: lngLat.lng
    };
    
    setSelectedLocation(newLocation);
    
    // Récupérer l'adresse correspondante
    const address = await reverseGeocode(lngLat.lat, lngLat.lng);
    setSelectedAddress(address);
  }, [token]);

  // Confirmer la sélection
  const handleConfirm = () => {
    if (selectedLocation && selectedAddress) {
      onLocationSelect({
        coordinates: selectedLocation,
        address: selectedAddress
      });
    }
    onClose();
  };

  if (!token) {
    return (
      <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-800 font-bold text-lg mb-2">❌ Token Mapbox manquant</div>
          <button onClick={onClose} className="mt-4 px-4 py-2 bg-gray-200 rounded">
            Fermer
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-white z-50">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-10 bg-white/95 backdrop-blur-sm p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <button
            onClick={onClose}
            className="p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-all"
          >
            <ArrowLeft className="w-6 h-6 text-gray-700" />
          </button>
          
          <div className="text-center">
            <h2 className="font-semibold text-gray-900">Choisir un lieu</h2>
            <p className="text-sm text-gray-600">Touchez la carte pour placer un marqueur</p>
          </div>
          
          <button
            onClick={handleConfirm}
            disabled={!selectedLocation || isLoadingAddress}
            className={`p-2 rounded-full shadow-md transition-all ${
              selectedLocation && !isLoadingAddress
                ? 'bg-gradient-to-r from-purple-600 to-pink-500 text-white hover:shadow-lg'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            <Check className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Map Container */}
      <div className="absolute inset-0 pt-20 pb-24">
        <Map
          {...viewState}
          onMove={evt => setViewState(evt.viewState)}
          onClick={handleMapClick}
          style={{ width: '100%', height: '100%' }}
          mapStyle="mapbox://styles/mapbox/streets-v11"
          mapboxAccessToken={token}
          attributionControl={false}
        >
          {/* Marqueur de la position sélectionnée */}
          {selectedLocation && (
            <Marker
              latitude={selectedLocation.lat}
              longitude={selectedLocation.lng}
              anchor="bottom"
            >
              <div className="relative">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-500 rounded-full border-4 border-white shadow-lg flex items-center justify-center">
                  <MapPin className="w-4 h-4 text-white" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-500 rounded-full animate-ping opacity-30"></div>
              </div>
            </Marker>
          )}
        </Map>

        {/* Instructions au centre si aucun lieu sélectionné */}
        {!selectedLocation && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
            <div className="bg-white/90 backdrop-blur-sm px-4 py-3 rounded-xl shadow-lg border border-gray-200">
              <div className="flex items-center space-x-2 text-gray-700">
                <MapPin className="w-5 h-5 text-purple-600" />
                <span className="text-sm font-medium">Touchez la carte pour placer un marqueur</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Info Panel */}
      {selectedLocation && (
        <div className="absolute bottom-0 left-0 right-0 z-10 bg-white border-t border-gray-200 p-4">
          <div className="max-w-md mx-auto">
            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-500 rounded-full flex items-center justify-center">
                <MapPin className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-500 mb-1">Lieu sélectionné</p>
                {isLoadingAddress ? (
                  <div className="flex items-center space-x-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-purple-600"></div>
                    <span className="text-sm text-gray-600">Recherche de l'adresse...</span>
                  </div>
                ) : (
                  <p className="font-medium text-gray-900">{selectedAddress}</p>
                )}
                <p className="text-xs text-gray-500 mt-1">
                  {selectedLocation.lat.toFixed(6)}, {selectedLocation.lng.toFixed(6)}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LocationPicker;