// components/CreateActivityModal.jsx - Modal de création d'activité avec geocoding
import React, { useState, useEffect, useRef } from 'react';
import { MapPin } from 'lucide-react';
import { moods } from '../data/activities';
import LocationPicker from './LocationPicker';

const CreateActivityModal = ({ onClose }) => {
  const [selectedMoods, setSelectedMoods] = useState([]);
  const [showLocationPicker, setShowLocationPicker] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [isMystery, setIsMystery] = useState(false);
  const [locationSuggestions, setLocationSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);
  const locationInputRef = useRef(null);
  const suggestionsRef = useRef(null);
  
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    date: '',
    time: '',
    maxParticipants: '',
    description: ''
  });

  // Debounce pour l'API de geocoding
  const [searchTimeout, setSearchTimeout] = useState(null);

  const handleMysteryToggle = () => {
    setIsMystery(!isMystery);
    if (!isMystery) {
      setFormData(prev => ({
        ...prev,
        title: 'Mystère'
      }));
      setSelectedMoods([]);
    } else {
      setFormData(prev => ({
        ...prev,
        title: ''
      }));
    }
  };

  const toggleMood = (mood) => {
    if (selectedMoods.find(m => m.emoji === mood.emoji)) {
      setSelectedMoods(selectedMoods.filter(m => m.emoji !== mood.emoji));
    } else if (selectedMoods.length < 3) {
      setSelectedMoods([...selectedMoods, mood]);
    }
  };

  const updateFormData = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Fonction pour rechercher des adresses avec l'API Mapbox Geocoding
  const searchLocations = async (query) => {
    if (!query || query.length < 3) {
      setLocationSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    const mapboxToken = import.meta.env.VITE_MAPBOX_TOKEN;
    if (!mapboxToken) {
      console.error('Token Mapbox manquant');
      return;
    }

    setLoadingSuggestions(true);
    
    try {
      // API Geocoding de Mapbox pour l'autocomplétion avec tous les types de lieux
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(query)}.json?access_token=${mapboxToken}&country=FR&types=place,locality,neighborhood,address,poi&limit=8&language=fr&proximity=0.1079,49.4944`
      );
      
      const data = await response.json();
      
      if (data.features) {
        const suggestions = data.features.map(feature => ({
          id: feature.id,
          text: feature.place_name,
          placeName: feature.text,
          context: feature.context,
          coordinates: feature.center,
          category: feature.properties?.category || getPlaceCategory(feature)
        }));
        
        setLocationSuggestions(suggestions);
        setShowSuggestions(suggestions.length > 0);
      }
    } catch (error) {
      console.error('Erreur lors de la recherche d\'adresses:', error);
    } finally {
      setLoadingSuggestions(false);
    }
  };

  // Fonction pour déterminer la catégorie d'un lieu
  const getPlaceCategory = (feature) => {
    const types = feature.place_type;
    if (types.includes('poi')) return 'poi';
    if (types.includes('address')) return 'address';
    if (types.includes('place')) return 'place';
    if (types.includes('locality')) return 'locality';
    return 'other';
  };

  // Fonction pour obtenir l'icône selon la catégorie
  const getCategoryIcon = (category) => {
    switch (category) {
      case 'poi':
        return '📍'; // Points d'intérêt (restaurants, boutiques, etc.)
      case 'address':
        return '🏠'; // Adresses
      case 'place':
        return '🏛️'; // Monuments, lieux importants
      case 'locality':
        return '🏘️'; // Villes, quartiers
      default:
        return '📍';
    }
  };

  // Gestion de la saisie dans le champ adresse avec debounce
  const handleLocationChange = (value) => {
    updateFormData('location', value);
    
    // Clear previous timeout
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }
    
    // Set new timeout pour debounce
    const timeout = setTimeout(() => {
      searchLocations(value);
    }, 300);
    
    setSearchTimeout(timeout);
  };

  // Sélection d'une suggestion
  const selectLocation = (suggestion) => {
    updateFormData('location', suggestion.text);
    setLocationSuggestions([]);
    setShowSuggestions(false);
    locationInputRef.current?.blur();
  };

  // Gestion de la sélection depuis LocationPicker
  const handleLocationPickerSelect = (locationData) => {
    updateFormData('location', locationData.address);
    setShowLocationPicker(false);
  };

  // Fermer les suggestions si clic à l'extérieur
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target) &&
        !locationInputRef.current?.contains(event.target)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Cleanup timeout
  useEffect(() => {
    return () => {
      if (searchTimeout) {
        clearTimeout(searchTimeout);
      }
    };
  }, [searchTimeout]);

  const nextStep = () => {
    if (isMystery) {
      if (currentStep < 3) setCurrentStep(currentStep + 1);
    } else {
      if (currentStep < 4) setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const getMaxStep = () => isMystery ? 3 : 4;
  const isLastStep = () => currentStep === getMaxStep();

  const stepTitles = [
    "Informations de base",
    "Description", 
    "Ambiance recherchée",
    "Récapitulatif"
  ];

  const getStepTitle = () => {
    if (isMystery && currentStep === 3) return "Récapitulatif";
    return stepTitles[currentStep - 1];
  };
  
  // Modal de sélection de lieu avec LocationPicker
  if (showLocationPicker) {
    return (
      <LocationPicker
        onClose={() => setShowLocationPicker(false)}
        onLocationSelect={handleLocationPickerSelect}
        initialLocation={{
          lat: 49.4944,
          lng: 0.1079
        }}
      />
    );
  }
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end justify-center z-50">
      <div className="bg-white rounded-t-3xl w-full max-w-md animate-slide-up max-h-[90vh] overflow-hidden flex flex-col">
        <div className="p-6 border-b border-gray-100">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
              Créer un MoodUp
            </h2>
            <button 
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
            >
              <span className="text-gray-500 text-lg">×</span>
            </button>
          </div>
          
          {/* Indicateur d'étapes */}
          <div className="flex items-center space-x-2 mb-2">
            {Array.from({ length: getMaxStep() }, (_, i) => i + 1).map((step, index) => (
              <div key={step} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                  step === currentStep 
                    ? 'bg-gradient-to-r from-purple-600 to-pink-500 text-white'
                    : step < currentStep
                    ? 'bg-purple-100 text-purple-600'
                    : 'bg-gray-100 text-gray-400'
                }`}>
                  {step}
                </div>
                {index < getMaxStep() - 1 && (
                  <div className={`w-6 h-0.5 mx-1 transition-colors ${
                    step < currentStep ? 'bg-purple-300' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <p className="text-sm text-gray-600">{getStepTitle()}</p>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {/* Étape 1: Informations de base */}
          {currentStep === 1 && (
            <div className="space-y-6">
              {/* Option MoodUp Mystère */}
              <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl p-4 border border-purple-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="text-2xl">❓</div>
                    <div>
                      <h3 className="font-semibold text-purple-800">MoodUp Mystère</h3>
                      <p className="text-sm text-purple-600">Surprise totale jusqu'au jour J</p>
                    </div>
                  </div>
                  <button
                    onClick={handleMysteryToggle}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      isMystery ? 'bg-purple-600' : 'bg-gray-300'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        isMystery ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              </div>

              <div className="space-y-1">
                <input 
                  type="text" 
                  placeholder="Café & discussion startup"
                  value={formData.title}
                  onChange={(e) => !isMystery && updateFormData('title', e.target.value)}
                  disabled={isMystery}
                  className={`w-full p-4 border-0 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:outline-none transition-all placeholder-gray-400 text-gray-900 ${
                    isMystery ? 'bg-purple-50 text-purple-700 cursor-not-allowed' : 'bg-gray-50 focus:bg-white'
                  }`}
                />
                <p className="text-xs text-gray-500 px-1">
                  {isMystery ? 'Titre automatique pour le mystère' : 'Titre de ton MoodUp'}
                </p>
              </div>
              
              {/* Champ localisation avec autocomplétion */}
              <div className="space-y-1 relative">
                <div className="flex gap-2">
                  <div className="flex-1 relative">
                    <input 
                      ref={locationInputRef}
                      type="text" 
                      placeholder="Rechercher une adresse..."
                      value={formData.location}
                      onChange={(e) => handleLocationChange(e.target.value)}
                      onFocus={() => formData.location.length >= 3 && setShowSuggestions(true)}
                      className="w-full p-4 bg-gray-50 border-0 rounded-2xl focus:bg-white focus:ring-2 focus:ring-purple-500 focus:outline-none transition-all placeholder-gray-400 text-gray-900"
                    />
                    
                    {/* Loading indicator */}
                    {loadingSuggestions && (
                      <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-purple-600"></div>
                      </div>
                    )}
                    
                    {/* Suggestions dropdown */}
                    {showSuggestions && locationSuggestions.length > 0 && (
                      <div 
                        ref={suggestionsRef}
                        className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-2xl shadow-lg z-10 max-h-60 overflow-y-auto"
                      >
                        {locationSuggestions.map((suggestion) => (
                          <button
                            key={suggestion.id}
                            onClick={() => selectLocation(suggestion)}
                            className="w-full text-left p-3 hover:bg-gray-50 border-b border-gray-100 last:border-b-0 first:rounded-t-2xl last:rounded-b-2xl transition-colors"
                          >
                            <div className="flex items-center space-x-3">
                              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                                <span className="text-sm">{getCategoryIcon(suggestion.category)}</span>
                              </div>
                              <div className="flex-1">
                                <p className="font-medium text-gray-900 text-sm">{suggestion.placeName}</p>
                                <p className="text-xs text-gray-500 truncate">{suggestion.text}</p>
                              </div>
                              <div className="text-xs text-purple-600 bg-purple-50 px-2 py-1 rounded-full">
                                {suggestion.category === 'poi' ? 'Lieu' : 
                                 suggestion.category === 'address' ? 'Adresse' :
                                 suggestion.category === 'place' ? 'Monument' : 'Ville'}
                              </div>
                            </div>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  <button 
                    onClick={() => setShowLocationPicker(true)}
                    className="w-14 h-14 bg-gradient-to-r from-purple-600 to-pink-500 rounded-2xl flex items-center justify-center hover:shadow-md transition-all shadow-sm"
                  >
                    <MapPin size={20} className="text-white" />
                  </button>
                </div>
                <p className="text-xs text-gray-500 px-1">Lieu de rendez-vous</p>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <input 
                    type="date" 
                    value={formData.date}
                    onChange={(e) => updateFormData('date', e.target.value)}
                    className="w-full p-4 bg-gray-50 border-0 rounded-2xl focus:bg-white focus:ring-2 focus:ring-purple-500 focus:outline-none transition-all text-gray-900"
                  />
                  <p className="text-xs text-gray-500 px-1">Date</p>
                </div>
                <div className="space-y-1">
                  <input 
                    type="time" 
                    value={formData.time}
                    onChange={(e) => updateFormData('time', e.target.value)}
                    className="w-full p-4 bg-gray-50 border-0 rounded-2xl focus:bg-white focus:ring-2 focus:ring-purple-500 focus:outline-none transition-all text-gray-900"
                  />
                  <p className="text-xs text-gray-500 px-1">Heure de début</p>
                </div>
              </div>
              
              <div className="space-y-1">
                <input 
                  type="number" 
                  placeholder="5"
                  min="2"
                  max="20"
                  value={formData.maxParticipants}
                  onChange={(e) => updateFormData('maxParticipants', e.target.value)}
                  className="w-full p-4 bg-gray-50 border-0 rounded-2xl focus:bg-white focus:ring-2 focus:ring-purple-500 focus:outline-none transition-all placeholder-gray-400 text-gray-900"
                />
                <p className="text-xs text-gray-500 px-1">Participants max</p>
              </div>
            </div>
          )}

          {/* Étape 2: Description */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div>
                <div className="mb-4 text-center">
                  <h3 className="text-xl font-medium text-gray-900 mb-2">
                    {isMystery ? 'Décris ton mystère' : 'Décris brièvement ton MoodUp'}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {isMystery ? 'Donne quelques indices pour intriguer les participants...' : 'Optionnel - Donne plus de détails sur l\'ambiance que tu recherches'}
                  </p>
                </div>
                <textarea 
                  placeholder={isMystery ? "Ex: Une expérience surprenante t'attend... Viens avec l'esprit ouvert !" : "Ex: Discussion startup autour d'un bon café, ambiance détendue et inspirante..."}
                  value={formData.description}
                  onChange={(e) => updateFormData('description', e.target.value)}
                  className="w-full p-4 bg-gray-50 border-0 rounded-2xl focus:bg-white focus:ring-2 focus:ring-purple-500 focus:outline-none transition-all h-32 resize-none placeholder-gray-400 text-gray-900"
                />
              </div>
            </div>
          )}

          {/* Étape 3: Ambiance (seulement pour non-mystère) OU Récapitulatif (pour mystère) */}
          {currentStep === 3 && !isMystery && (
            <div className="space-y-6">
              <div>
                <div className="mb-4 text-center">
                  <div className="flex items-center justify-center mb-2">
                    <h3 className="text-xl font-medium text-gray-900">Quel mood veux-tu vivre ?</h3>
                    <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full ml-3">{selectedMoods.length}/3</span>
                  </div>
                  <p className="text-sm text-gray-500">Choisis l'ambiance que tu recherches (max 3)</p>
                </div>
                
                <div className="grid grid-cols-3 gap-3">
                  {moods.map((mood, i) => {
                    const isSelected = selectedMoods.find(m => m.emoji === mood.emoji);
                    const isDisabled = selectedMoods.length >= 3 && !isSelected;
                    
                    return (
                      <button 
                        key={i} 
                        onClick={() => toggleMood(mood)}
                        disabled={isDisabled}
                        className={`p-3 rounded-2xl transition-all duration-200 flex flex-col items-center justify-center min-h-[60px] border-2 ${
                          isSelected 
                            ? 'border-purple-500 bg-purple-50 shadow-sm' 
                            : isDisabled
                            ? 'border-gray-100 bg-gray-50 opacity-40 cursor-not-allowed'
                            : 'border-gray-100 bg-gray-50 hover:border-gray-200 hover:bg-gray-100'
                        }`}
                      >
                        <span className="text-lg mb-1">{mood.emoji}</span>
                        <span className="text-xs text-gray-600 font-medium text-center">{mood.label}</span>
                      </button>
                    );
                  })}
                </div>
                
                {selectedMoods.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2 justify-center">
                    {selectedMoods.map((mood, i) => (
                      <span key={i} className="inline-flex items-center bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
                        {mood.emoji} {mood.label}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Récapitulatif */}
          {((currentStep === 4 && !isMystery) || (currentStep === 3 && isMystery)) && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Récapitulatif</h3>
                <div className="bg-gray-50 rounded-2xl p-4 space-y-3">
                  <div>
                    <p className="text-sm text-gray-500">Titre</p>
                    <p className="font-medium text-gray-900">{formData.title || "Titre non défini"}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Lieu</p>
                    <p className="font-medium text-gray-900">{formData.location || "Lieu non défini"}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Date</p>
                      <p className="font-medium text-gray-900">{formData.date || "Date non définie"}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Heure</p>
                      <p className="font-medium text-gray-900">{formData.time || "Heure non définie"}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Participants max</p>
                    <p className="font-medium text-gray-900">{formData.maxParticipants || "Non défini"}</p>
                  </div>
                  {formData.description && (
                    <div>
                      <p className="text-sm text-gray-500">Description</p>
                      <p className="font-medium text-gray-900">{formData.description}</p>
                    </div>
                  )}
                  {isMystery ? (
                    <div>
                      <p className="text-sm text-gray-500">Ambiance</p>
                      <span className="inline-flex items-center bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
                        🎭 Mystère total
                      </span>
                    </div>
                  ) : (
                    selectedMoods.length > 0 && (
                      <div>
                        <p className="text-sm text-gray-500 mb-2">Moods</p>
                        <div className="flex flex-wrap gap-2">
                          {selectedMoods.map((mood, i) => (
                            <span key={i} className="inline-flex items-center bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
                              {mood.emoji} {mood.label}
                            </span>
                          ))}
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="p-6 border-t border-gray-100">
          <div className="flex gap-3">
            {currentStep > 1 && (
              <button 
                onClick={prevStep}
                className="flex-1 py-3 rounded-2xl font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                Précédent
              </button>
            )}
            <button 
              onClick={isLastStep() ? onClose : nextStep}
              className="flex-1 py-3 rounded-2xl font-semibold text-white bg-gradient-to-r from-purple-600 to-pink-500 hover:shadow-lg transition-all shadow-sm"
            >
              {isLastStep() ? 'Créer mon MoodUp' : 'Suivant'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateActivityModal;