import React, { useState } from 'react';
import { Search, Plus, MapPin, Clock, Users, Star, Filter, Home, User, Smile } from 'lucide-react';

// Données d'exemple
const activities = [
  {
    id: 1,
    title: "Café & discussion startup",
    location: "Café Central, Place Gambetta",
    date: "Aujourd'hui",
    time: "14:30",
    participants: "2/5",
    description: "Discussion autour des innovations tech, ambiance détendue et inspirante",
    moods: [
      { emoji: '💭', label: 'Réflexif' },
      { emoji: '🚀', label: 'Motivant' },
      { emoji: '🤝', label: 'Connectant' }
    ],
    distance: "0.2 km",
    creator: "Marie"
  }
];

// Composant ActivityCard réutilisable
const ActivityCard = ({ activity, isInList = false, onActivitySelect }) => (
  <div 
    onClick={() => onActivitySelect(activity)}
    className={`bg-white rounded-2xl shadow-lg p-4 mb-3 border border-gray-100 hover:shadow-xl transition-all duration-300 cursor-pointer ${isInList ? 'mx-4' : ''}`}
  >
    <div className="flex justify-between items-start mb-3">
      <div className="flex-1">
        <h3 className="font-bold text-gray-800 text-lg mb-1">{activity.title}</h3>
        <div className="flex items-center text-gray-600 mb-1">
          <MapPin size={14} className="mr-1" />
          <span className="text-sm">{activity.location}</span>
        </div>
        <div className="flex items-center text-gray-500 text-sm">
          <Clock size={14} className="mr-1" />
          <span>{activity.date} • {activity.time}</span>
          <span className="mx-2">•</span>
          <Users size={14} className="mr-1" />
          <span>{activity.participants}</span>
        </div>
      </div>
      <div className="flex flex-col items-center">
        <span className="text-xs text-gray-500 mb-1">{activity.distance}</span>
        <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-500 rounded-full flex items-center justify-center">
          <span className="text-white text-xs font-bold">{activity.creator[0]}</span>
        </div>
      </div>
    </div>
    
    {activity.description && (
      <p className="text-sm text-gray-600 mb-3 line-clamp-2">{activity.description}</p>
    )}
    
    <div className="flex items-center justify-between">
      <div className="flex flex-wrap gap-1">
        {activity.moods.slice(0, 3).map((mood, i) => (
          <span key={i} className="inline-flex items-center bg-purple-50 text-purple-700 px-2 py-1 rounded-full text-xs font-medium">
            {mood.emoji} {mood.label}
          </span>
        ))}
      </div>
      <button 
        onClick={(e) => {
          e.stopPropagation();
          onActivitySelect(activity);
        }}
        className="bg-gradient-to-r from-purple-600 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-medium hover:shadow-lg transition-all duration-300"
      >
        Rejoindre
      </button>
    </div>
  </div>
);

// Page d'accueil avec carte
const HomePage = ({ onActivitySelect, onNavigateToSearch }) => (
  <div className="flex-1">
    {/* Header */}
    <div className="bg-white px-6 py-3 shadow-md">
      <div className="text-center mb-3">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
          MoodUp
        </h1>
        <p className="text-xs text-gray-500 font-medium">Découvre les vibes autour de toi</p>
      </div>
    </div>

    {/* Carte simulée */}
    <div className="h-80 bg-gradient-to-br from-blue-100 to-green-100 relative overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div className="w-full h-full bg-gradient-to-br from-purple-600 to-pink-500"></div>
      </div>
      
      {/* Points d'activité sur la carte */}
      {activities.map((activity, i) => (
        <div 
          key={activity.id}
          className="absolute bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-all cursor-pointer border-2 border-purple-500"
          style={{
            left: `${50}%`,
            top: `${50}%`
          }}
        >
          <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-500 rounded-full flex items-center justify-center">
            <span className="text-white text-xs font-bold">{activity.creator[0]}</span>
          </div>
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-white px-2 py-1 rounded-full shadow-sm border border-gray-200">
            <div className="flex items-center space-x-1">
              {activity.moods.slice(0, 2).map((mood, j) => (
                <span key={j} className="text-xs">{mood.emoji}</span>
              ))}
            </div>
          </div>
        </div>
      ))}
      
      <div className="absolute bottom-4 left-4 bg-white px-3 py-2 rounded-full shadow-lg">
        <span className="text-sm font-medium text-gray-700">Le Havre</span>
      </div>
    </div>
    
    {/* Activités sous la carte */}
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-800">MoodUps proches de toi</h2>
        <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
          {activities.length} disponible
        </span>
      </div>
      <div className="space-y-3">
        {activities.map(activity => (
          <ActivityCard key={activity.id} activity={activity} onActivitySelect={onActivitySelect} />
        ))}
      </div>
      <button 
        onClick={onNavigateToSearch}
        className="w-full mt-4 py-3 text-center text-purple-600 font-medium hover:bg-purple-50 rounded-2xl transition-colors"
      >
        Voir tous les MoodUps
      </button>
    </div>
  </div>
);

// Page de recherche
const SearchPage = ({ onActivitySelect }) => (
  <div className="flex-1">
    {/* Header avec barre de recherche */}
    <div className="bg-white px-6 py-4 shadow-md">
      <div className="relative">
        <Search size={18} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input 
          type="text"
          placeholder="Chercher un MoodUp, un lieu, un mood..."
          className="w-full pl-12 pr-4 py-3 bg-gray-100 rounded-2xl focus:outline-none focus:bg-white focus:shadow-md transition-all duration-300"
        />
      </div>
    </div>

    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-800">Rechercher des MoodUps</h2>
        <div className="flex items-center space-x-2">
          <button className="p-2 rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors">
            <Filter size={16} className="text-gray-600" />
          </button>
        </div>
      </div>
      
      {/* Filtres rapides */}
      <div className="flex space-x-2 mb-4 overflow-x-auto">
        {['Aujourd\'hui', 'Café', 'Sport', 'Créatif', 'Social'].map((filter, i) => (
          <button key={i} className="flex-shrink-0 px-4 py-2 bg-gray-100 text-gray-600 rounded-full text-sm hover:bg-purple-100 hover:text-purple-600 transition-colors">
            {filter}
          </button>
        ))}
      </div>
      
      <div className="space-y-3">
        {activities.map(activity => (
          <ActivityCard key={activity.id} activity={activity} isInList={true} onActivitySelect={onActivitySelect} />
        ))}
      </div>
    </div>
  </div>
);

// Page Mes MoodUps
const MyMoodUpsPage = ({ onActivitySelect }) => (
  <div className="flex-1">
    {/* Header */}
    <div className="bg-white px-6 py-4 shadow-md">
      <h2 className="text-xl font-bold text-gray-800 text-center">Mes MoodUps</h2>
    </div>

    <div className="p-4">
      {/* Onglets */}
      <div className="flex bg-gray-100 rounded-2xl p-1 mb-6">
        <button className="flex-1 py-3 bg-white rounded-xl font-medium text-purple-600 shadow-sm">
          Mes participations
        </button>
        <button className="flex-1 py-3 font-medium text-gray-600">
          Mes créations
        </button>
      </div>

      {/* Liste des activités */}
      <div className="space-y-3">
        {activities.map(activity => (
          <ActivityCard key={activity.id} activity={activity} isInList={true} onActivitySelect={onActivitySelect} />
        ))}
      </div>

      {/* Message si vide */}
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Smile size={24} className="text-gray-400" />
        </div>
        <h3 className="font-medium text-gray-900 mb-2">Aucun MoodUp pour le moment</h3>
        <p className="text-sm text-gray-500 mb-4">Crée ton premier MoodUp ou rejoins-en un !</p>
        <button className="bg-gradient-to-r from-purple-600 to-pink-500 text-white px-6 py-3 rounded-2xl font-medium">
          Découvrir des MoodUps
        </button>
      </div>
    </div>
  </div>
);

// Page Profil
const ProfilePage = () => (
  <div className="flex-1">
    {/* Header */}
    <div className="bg-white px-6 py-4 shadow-md">
      <h2 className="text-xl font-bold text-gray-800 text-center">Mon Profil</h2>
    </div>

    <div className="p-4">
      {/* Informations utilisateur */}
      <div className="bg-white rounded-2xl p-6 mb-6 shadow-sm">
        <div className="flex items-center mb-4">
          <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-500 rounded-full flex items-center justify-center mr-4">
            <span className="text-white text-xl font-bold">M</span>
          </div>
          <div>
            <h3 className="font-bold text-gray-900 text-lg">Marie Dupont</h3>
            <p className="text-gray-600">@marie.dupont</p>
            <p className="text-sm text-gray-500">Le Havre, France</p>
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="font-bold text-lg text-purple-600">12</p>
            <p className="text-xs text-gray-500">MoodUps créés</p>
          </div>
          <div>
            <p className="font-bold text-lg text-purple-600">34</p>
            <p className="text-xs text-gray-500">Participations</p>
          </div>
          <div>
            <p className="font-bold text-lg text-purple-600">4.8</p>
            <p className="text-xs text-gray-500">Note moyenne</p>
          </div>
        </div>
      </div>

      {/* Moods favoris */}
      <div className="bg-white rounded-2xl p-6 mb-6 shadow-sm">
        <h4 className="font-semibold text-gray-900 mb-3">Mes moods favoris</h4>
        <div className="flex flex-wrap gap-2">
          {[
            { emoji: '😌', label: 'Chill' },
            { emoji: '💭', label: 'Réflexif' },
            { emoji: '🤝', label: 'Connectant' },
            { emoji: '🎨', label: 'Créatif' }
          ].map((mood, i) => (
            <span key={i} className="inline-flex items-center bg-purple-100 text-purple-800 px-3 py-2 rounded-full text-sm font-medium">
              {mood.emoji} {mood.label}
            </span>
          ))}
        </div>
      </div>

      {/* Options du profil */}
      <div className="space-y-3">
        {[
          { icon: User, label: 'Modifier le profil', color: 'text-gray-600' },
          { icon: Star, label: 'Mes évaluations', color: 'text-gray-600' },
          { icon: MapPin, label: 'Préférences de localisation', color: 'text-gray-600' },
          { icon: Users, label: 'Inviter des amis', color: 'text-purple-600' }
        ].map((item, i) => (
          <button key={i} className="w-full flex items-center justify-between bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center">
              <item.icon size={20} className={`mr-3 ${item.color}`} />
              <span className="font-medium text-gray-900">{item.label}</span>
            </div>
            <span className="text-gray-400">›</span>
          </button>
        ))}
      </div>
    </div>
  </div>
);

// Modal de création d'activité (reste identique)
const CreateActivityModal = ({ onClose }) => {
  const [selectedMoods, setSelectedMoods] = useState([]);
  const [showLocationPicker, setShowLocationPicker] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    date: '',
    time: '',
    maxParticipants: '',
    description: ''
  });
  
  const moods = [
    { emoji: '😌', label: 'Chill' },
    { emoji: '🔥', label: 'Énergique' },
    { emoji: '💭', label: 'Réflexif' },
    { emoji: '😄', label: 'Fun' },
    { emoji: '🌱', label: 'Ressourçant' },
    { emoji: '🎯', label: 'Productif' },
    { emoji: '🤝', label: 'Connectant' },
    { emoji: '🌟', label: 'Inspirant' },
    { emoji: '😊', label: 'Bienveillant' },
    { emoji: '🎨', label: 'Créatif' },
    { emoji: '🧘‍♂️', label: 'Zen' },
    { emoji: '🚀', label: 'Motivant' }
  ];
  
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
    if (currentStep < 4) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const stepTitles = [
    "Étape 1",
    "Étape 2", 
    "Étape 3",
    "Étape 4"
  ];
  
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
          
          <div className="flex items-center space-x-2 mb-2">
            {[1, 2, 3, 4].map((step) => (
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
                {step < 4 && (
                  <div className={`w-6 h-0.5 mx-1 transition-colors ${
                    step < currentStep ? 'bg-purple-300' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <p className="text-sm text-gray-600">{stepTitles[currentStep - 1]}</p>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="space-y-1">
                <input 
                  type="text" 
                  placeholder="Café & discussion startup"
                  value={formData.title}
                  onChange={(e) => updateFormData('title', e.target.value)}
                  className="w-full p-4 bg-gray-50 border-0 rounded-2xl focus:bg-white focus:ring-2 focus:ring-purple-500 focus:outline-none transition-all placeholder-gray-400 text-gray-900"
                />
                <p className="text-xs text-gray-500 px-1">Titre de ton MoodUp</p>
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

          {currentStep === 2 && (
            <div className="space-y-6">
              <div>
                <div className="mb-4 text-center">
                  <h3 className="text-xl font-medium text-gray-900 mb-2">Décris brièvement ton MoodUp</h3>
                  <p className="text-sm text-gray-500">Optionnel - Donne plus de détails sur l'ambiance que tu recherches</p>
                </div>
                <textarea 
                  placeholder="Ex: Discussion startup autour d'un bon café, ambiance détendue et inspirante..."
                  value={formData.description}
                  onChange={(e) => updateFormData('description', e.target.value)}
                  className="w-full p-4 bg-gray-50 border-0 rounded-2xl focus:bg-white focus:ring-2 focus:ring-purple-500 focus:outline-none transition-all h-32 resize-none placeholder-gray-400 text-gray-900"
                />
              </div>
            </div>
          )}

          {currentStep === 3 && (
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

          {currentStep === 4 && (
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
                  {selectedMoods.length > 0 && (
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
              onClick={currentStep === 4 ? onClose : nextStep}
              className="flex-1 py-3 rounded-2xl font-semibold text-white bg-gradient-to-r from-purple-600 to-pink-500 hover:shadow-lg transition-all shadow-sm"
            >
              {currentStep === 4 ? 'Créer mon MoodUp' : 'Suivant'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Modal de détail d'activité
const ActivityDetailModal = ({ activity, onClose }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end justify-center z-50">
    <div className="bg-white rounded-t-3xl w-full max-w-md animate-slide-up max-h-[90vh] overflow-hidden flex flex-col">
      <div className="p-6 border-b border-gray-100">
        <div className="flex justify-between items-center">
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
          >
            <span className="text-gray-500 text-lg">×</span>
          </button>
          <h2 className="text-lg font-semibold text-gray-900">Détails du MoodUp</h2>
          <div className="w-8"></div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        <div className="space-y-6">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">{activity.title}</h1>
            <div className="flex items-center justify-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">{activity.creator[0]}</span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Organisé par {activity.creator}</p>
                <p className="text-xs text-gray-500">{activity.distance}</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-2xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <MapPin size={18} className="text-purple-600 mr-3" />
                <div>
                  <p className="font-medium text-gray-900">{activity.location}</p>
                  <p className="text-sm text-gray-500">Lieu de rendez-vous</p>
                </div>
              </div>
              <button className="p-2 bg-white rounded-xl shadow-sm hover:shadow-md transition-all">
                <MapPin size={16} className="text-purple-600" />
              </button>
            </div>
            
            <div className="flex items-center">
              <Clock size={18} className="text-purple-600 mr-3" />
              <div>
                <p className="font-medium text-gray-900">{activity.date} à {activity.time}</p>
                <p className="text-sm text-gray-500">Date et heure</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <Users size={18} className="text-purple-600 mr-3" />
              <div>
                <p className="font-medium text-gray-900">{activity.participants} participants</p>
                <p className="text-sm text-gray-500">Places disponibles</p>
              </div>
            </div>
          </div>

          {activity.description && (
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Description</h3>
              <p className="text-gray-700 leading-relaxed">{activity.description}</p>
            </div>
          )}

          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Ambiance du MoodUp</h3>
            <div className="flex flex-wrap gap-2">
              {activity.moods.map((mood, i) => (
                <span key={i} className="inline-flex items-center bg-purple-100 text-purple-800 px-3 py-2 rounded-full text-sm font-medium">
                  {mood.emoji} {mood.label}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Qui participe ?</h3>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">{activity.creator[0]}</span>
              </div>
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">J</span>
              </div>
              <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                <Plus size={14} className="text-gray-500" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 border-t border-gray-100">
        <div className="flex gap-3">
          <button 
            onClick={onClose}
            className="flex-1 py-3 rounded-2xl font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            Retour
          </button>
          <button className="flex-1 py-3 rounded-2xl font-semibold text-white bg-gradient-to-r from-purple-600 to-pink-500 hover:shadow-lg transition-all shadow-sm">
            Rejoindre ce MoodUp
          </button>
        </div>
      </div>
    </div>
  </div>
);

// Composant principal avec navigation
const MoodUpApp = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState(null);

  const handleActivitySelect = (activity) => {
    setSelectedActivity(activity);
  };

  const handleNavigateToSearch = () => {
    setActiveTab('search');
  };

  const renderCurrentPage = () => {
    switch (activeTab) {
      case 'home':
        return (
          <HomePage 
            onActivitySelect={handleActivitySelect}
            onNavigateToSearch={handleNavigateToSearch}
          />
        );
      case 'search':
        return <SearchPage onActivitySelect={handleActivitySelect} />;
      case 'my-moodups':
        return <MyMoodUpsPage onActivitySelect={handleActivitySelect} />;
      case 'profile':
        return <ProfilePage />;
      default:
        return (
          <HomePage 
            onActivitySelect={handleActivitySelect}
            onNavigateToSearch={handleNavigateToSearch}
          />
        );
    }
  };

  return (
    <div className="max-w-md mx-auto bg-gray-50 min-h-screen relative pb-16">
      {/* Contenu de la page active */}
      {renderCurrentPage()}

      {/* Navigation en bas */}
      <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-md bg-white border-t border-gray-100 px-4 py-4 rounded-t-3xl">
        <div className="flex items-center justify-around">
          {[
            { id: 'home', icon: Home },
            { id: 'search', icon: Search },
            { id: 'create', icon: Plus },
            { id: 'my-moodups', icon: Smile },
            { id: 'profile', icon: User }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                if (tab.id === 'create') {
                  setShowCreateModal(true);
                } else {
                  setActiveTab(tab.id);
                }
              }}
              className={`flex items-center justify-center p-3 rounded-2xl transition-all duration-300 ${
                tab.id === 'create' 
                  ? 'bg-gradient-to-r from-purple-600 to-pink-500 shadow-lg transform scale-105' 
                  : ''
              }`}
            >
              <tab.icon 
                size={22} 
                className={`transition-all duration-300 ${
                  tab.id === 'create'
                    ? 'text-white'
                    : activeTab === tab.id
                    ? 'text-purple-600 transform scale-110'
                    : 'text-gray-400'
                }`}
                strokeWidth={activeTab === tab.id || tab.id === 'create' ? 2.5 : 2}
              />
            </button>
          ))}
        </div>
      </div>

      {/* Modals */}
      {showCreateModal && (
        <CreateActivityModal onClose={() => setShowCreateModal(false)} />
      )}
      {selectedActivity && (
        <ActivityDetailModal 
          activity={selectedActivity} 
          onClose={() => setSelectedActivity(null)} 
        />
      )}

      <style jsx>{`
        .animate-slide-up {
          animation: slideUp 0.3s ease-out;
        }
        
        @keyframes slideUp {
          from {
            transform: translateY(100%);
          }
          to {
            transform: translateY(0);
          }
        }
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default MoodUpApp;