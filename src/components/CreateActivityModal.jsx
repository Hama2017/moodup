// components/CreateActivityModal.jsx - Modal de création d'activité
import React, { useState } from 'react';
import { MapPin } from 'lucide-react';
import { moods } from '../data/activities';

const CreateActivityModal = ({ onClose }) => {
  const [selectedMoods, setSelectedMoods] = useState([]);
  const [showLocationPicker, setShowLocationPicker] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [isMystery, setIsMystery] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    date: '',
    time: '',
    maxParticipants: '',
    description: ''
  });

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

  const nextStep = () => {
    if (isMystery) {
      // Mode mystère : 1 → 2 → 3
      if (currentStep < 3) setCurrentStep(currentStep + 1);
    } else {
      // Mode normal : 1 → 2 → 3 → 4
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
  
  // Modal de sélection de lieu
  if (showLocationPicker) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end justify-center z-50">
        <div className="bg-white rounded-t-3xl w-full max-w-md h-[80vh] animate-slide-up overflow-hidden">
          <div className="flex justify-between items-center p-6 border-b border-gray-100">
            <button 
              onClick={() => setShowLocationPicker(false)}
              className="text-purple-600 font-medium"
            >
              Retour
            </button>
            <h2 className="text-lg font-semibold text-gray-900">Choisir un lieu</h2>
            <button 
              onClick={() => {
                updateFormData('location', 'Café Central, Place Gambetta');
                setShowLocationPicker(false);
              }}
              className="text-purple-600 font-medium"
            >
              Valider
            </button>
          </div>
          
          <div className="flex-1 bg-gradient-to-br from-blue-100 to-green-100 relative">
            <div className="absolute inset-0 opacity-30">
              <div className="w-full h-full bg-gradient-to-br from-purple-600 to-pink-500"></div>
            </div>
            
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
              <div className="w-8 h-8 border-2 border-purple-600 rounded-full bg-white shadow-lg flex items-center justify-center">
                <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
              </div>
            </div>
            
            <div className="absolute bottom-6 left-6 right-6">
              <div className="bg-white rounded-2xl p-4 shadow-lg">
                <p className="text-sm text-gray-600 mb-2">Lieu sélectionné</p>
                <p className="font-medium text-gray-900">Café Central, Place Gambetta</p>
              </div>
            </div>
          </div>
        </div>
      </div>
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
              
              <div className="space-y-1">
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    placeholder="Café Central, Place Gambetta"
                    value={formData.location}
                    onChange={(e) => updateFormData('location', e.target.value)}
                    className="flex-1 p-4 bg-gray-50 border-0 rounded-2xl focus:bg-white focus:ring-2 focus:ring-purple-500 focus:outline-none transition-all placeholder-gray-400 text-gray-900"
                  />
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