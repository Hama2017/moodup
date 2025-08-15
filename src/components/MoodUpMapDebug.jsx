import React, { useState, useEffect } from 'react';

const MoodUpMapDebug = ({ 
  activities = [], 
  onActivitySelect = () => {},
  height = "320px" 
}) => {
  const [mapboxLoaded, setMapboxLoaded] = useState(false);
  const [error, setError] = useState(null);
  const [token, setToken] = useState('');

  useEffect(() => {
    // Vérifier le token
    const mapboxToken = process.env.REACT_APP_MAPBOX_TOKEN;
    console.log('Token Mapbox:', mapboxToken ? 'Présent' : 'Absent');
    console.log('Token value:', mapboxToken);
    setToken(mapboxToken || 'TOKEN_MANQUANT');

    // Vérifier si react-map-gl est disponible
    try {
      import('react-map-gl').then((mapgl) => {
        console.log('react-map-gl chargé avec succès:', mapgl);
        setMapboxLoaded(true);
      }).catch((err) => {
        console.error('Erreur lors du chargement de react-map-gl:', err);
        setError(err.message);
      });
    } catch (err) {
      console.error('Erreur import react-map-gl:', err);
      setError(err.message);
    }
  }, []);

  if (error) {
    return (
      <div className="relative bg-red-50 border border-red-200 rounded-2xl p-4" style={{ height }}>
        <div className="text-center">
          <h3 className="text-red-800 font-medium mb-2">Erreur Mapbox</h3>
          <p className="text-red-600 text-sm mb-2">{error}</p>
          <p className="text-xs text-red-500">Vérifiez l'installation de react-map-gl</p>
        </div>
      </div>
    );
  }

  if (!mapboxLoaded) {
    return (
      <div className="relative bg-yellow-50 border border-yellow-200 rounded-2xl p-4 flex items-center justify-center" style={{ height }}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto mb-2"></div>
          <p className="text-yellow-800 text-sm">Chargement de Mapbox...</p>
          <p className="text-xs text-yellow-600">Token: {token.substring(0, 10)}...</p>
        </div>
      </div>
    );
  }

  // Si tout va bien, essayons une carte simple
  try {
    const { Map } = require('react-map-gl');
    
    const [viewState, setViewState] = useState({
      latitude: 49.4944,
      longitude: 0.1079,
      zoom: 12
    });

    return (
      <div className="relative rounded-2xl overflow-hidden" style={{ height }}>
        <Map
          {...viewState}
          onMove={evt => setViewState(evt.viewState)}
          style={{ width: '100%', height: '100%' }}
          mapStyle="mapbox://styles/mapbox/light-v11"
          mapboxAccessToken={token}
          attributionControl={false}
        >
          {/* Test simple sans markers d'abord */}
        </Map>
        
        {/* Overlay de debug */}
        <div className="absolute top-4 left-4 bg-green-100 border border-green-300 px-3 py-2 rounded-lg">
          <p className="text-green-800 text-xs font-medium">✅ Mapbox OK</p>
          <p className="text-green-600 text-xs">{activities.length} activités</p>
        </div>
      </div>
    );
  } catch (err) {
    return (
      <div className="relative bg-red-50 border border-red-200 rounded-2xl p-4" style={{ height }}>
        <div className="text-center">
          <h3 className="text-red-800 font-medium mb-2">Erreur de rendu</h3>
          <p className="text-red-600 text-sm">{err.message}</p>
        </div>
      </div>
    );
  }
};

export default MoodUpMapDebug;