class MapService {
  constructor() {
    this.mapboxToken = import.meta.env.VITE_MAPBOX_TOKEN;
  }

  async geocodeAddress(address) {
    if (!this.mapboxToken) {
      throw new Error('Token Mapbox manquant');
    }

    try {
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${this.mapboxToken}&country=FR&types=place,locality,neighborhood,address,poi&limit=8&language=fr&proximity=0.1079,49.4944`
      );
      
      const data = await response.json();
      
      return data.features.map(feature => ({
        id: feature.id,
        text: feature.place_name,
        placeName: feature.text,
        coordinates: feature.center,
        category: this.getPlaceCategory(feature)
      }));
    } catch (error) {
      console.error('Erreur geocoding:', error);
      throw error;
    }
  }

  async reverseGeocode(lat, lng) {
    if (!this.mapboxToken) {
      throw new Error('Token Mapbox manquant');
    }

    try {
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${this.mapboxToken}&language=fr&types=address,poi,place,locality`
      );
      
      const data = await response.json();
      
      if (data.features && data.features.length > 0) {
        return data.features[0].place_name;
      }
      return `${lat.toFixed(6)}, ${lng.toFixed(6)}`;
    } catch (error) {
      console.error('Erreur reverse geocoding:', error);
      return `${lat.toFixed(6)}, ${lng.toFixed(6)}`;
    }
  }

  getPlaceCategory(feature) {
    const types = feature.place_type;
    if (types.includes('poi')) return 'poi';
    if (types.includes('address')) return 'address';
    if (types.includes('place')) return 'place';
    if (types.includes('locality')) return 'locality';
    return 'other';
  }

  calculateDistance(lat1, lng1, lat2, lng2) {
    const R = 6371; // Rayon de la Terre en km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLng/2) * Math.sin(dLng/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c * 1000; // Retourne en mètres
  }
}

export const mapService = new MapService();