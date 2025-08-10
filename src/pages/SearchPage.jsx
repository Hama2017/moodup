// pages/SearchPage.js - Page de recherche avec filtres
import React, { useState } from 'react';
import { Search, Filter, X, Calendar, MapPin, Users, Clock } from 'lucide-react';
import ActivityCard from '../components/ActivityCard';
import { activities, moods } from '../data/activities';

const SearchPage = ({ onActivitySelect, onUserProfileSelect }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [activeFilters, setActiveFilters] = useState({
    quickFilter: '',
    date: '',
    time: '',
    location: '',
    maxParticipants: '',
    selectedMoods: [],
    distance: ''
  });

  const currentUser = 'Marie';
  
  // Filtrer les activités pour ne pas montrer mes créations
  const availableActivities = activities.filter(activity => activity.creator !== currentUser);

  const quickFilters = [
    { id: 'today', label: 'Aujourd\'hui', icon: Calendar },
    { id: 'mystery', label: 'Mystère', icon: null },
    { id: 'cafe', label: 'Café', icon: null },
    { id: 'sport', label: 'Sport', icon: null },
    { id: 'creative', label: 'Créatif', icon: null },
    { id: 'social', label: 'Social', icon: null },
    { id: 'morning', label: 'Matin', icon: Clock },
    { id: 'evening', label: 'Soir', icon: Clock }
  ];

  const distances = ['0.5 km', '1 km', '2 km', '5 km', '10 km+'];
  const timeSlots = ['Matin (6h-12h)', 'Après-midi (12h-18h)', 'Soir (18h-23h)'];

  const toggleQuickFilter = (filterId) => {
    setActiveFilters(prev => ({
      ...prev,
      quickFilter: prev.quickFilter === filterId ? '' : filterId
    }));
  };

  const toggleMoodFilter = (mood) => {
    setActiveFilters(prev => ({
      ...prev,
      selectedMoods: prev.selectedMoods.find(m => m.emoji === mood.emoji)
        ? prev.selectedMoods.filter(m => m.emoji !== mood.emoji)
        : [...prev.selectedMoods, mood]
    }));
  };

  const updateFilter = (key, value) => {
    setActiveFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearAllFilters = () => {
    setActiveFilters({
      quickFilter: '',
      date: '',
      time: '',
      location: '',
      maxParticipants: '',
      selectedMoods: [],
      distance: ''
    });
    setSearchQuery('');
  };

  const getActiveFiltersCount = () => {
    return Object.values(activeFilters).filter(value => 
      value && (Array.isArray(value) ? value.length > 0 : true)
    ).length;
  };

  const filteredActivities = availableActivities.filter(activity => {
    // Recherche textuelle
    const matchesSearch = searchQuery === '' || 
      activity.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      activity.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      activity.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      activity.moods.some(mood => mood.label.toLowerCase().includes(searchQuery.toLowerCase()));
    
    // Filtre rapide
    const matchesQuickFilter = activeFilters.quickFilter === '' || 
      (activeFilters.quickFilter === 'today' && activity.date === 'Aujourd\'hui') ||
      (activeFilters.quickFilter === 'cafe' && activity.title.toLowerCase().includes('café')) ||
      (activeFilters.quickFilter === 'sport' && (activity.title.toLowerCase().includes('sport') || activity.title.toLowerCase().includes('yoga'))) ||
      (activeFilters.quickFilter === 'creative' && (activity.title.toLowerCase().includes('créativ') || activity.title.toLowerCase().includes('dessin'))) ||
      (activeFilters.quickFilter === 'social' && activity.title.toLowerCase().includes('discussion')) ||
      (activeFilters.quickFilter === 'morning' && parseInt(activity.time.split(':')[0]) < 12) ||
      (activeFilters.quickFilter === 'evening' && parseInt(activity.time.split(':')[0]) >= 18);
    
    // Filtre par moods sélectionnés
    const matchesMoods = activeFilters.selectedMoods.length === 0 ||
      activeFilters.selectedMoods.some(selectedMood => 
        activity.moods.some(activityMood => activityMood.emoji === selectedMood.emoji)
      );
    
    // Filtre par lieu (si spécifié)
    const matchesLocation = activeFilters.location === '' ||
      activity.location.toLowerCase().includes(activeFilters.location.toLowerCase());
    
    // Filtre par date
    const matchesDate = activeFilters.date === '' ||
      (activeFilters.date === 'today' && activity.date === 'Aujourd\'hui') ||
      (activeFilters.date === 'tomorrow' && activity.date === 'Demain');
    
    return matchesSearch && matchesQuickFilter && matchesMoods && matchesLocation && matchesDate;
  });

  const FilterModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end justify-center z-50">
      <div className="bg-white rounded-t-3xl w-full max-w-md animate-slide-up max-h-[90vh] overflow-hidden flex flex-col">
        <div className="p-6 border-b border-gray-100">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-900">Filtres</h2>
            <div className="flex items-center space-x-3">
              <button 
                onClick={clearAllFilters}
                className="text-purple-600 font-medium text-sm"
              >
                Tout effacer
              </button>
              <button 
                onClick={() => setShowFilters(false)}
                className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center"
              >
                <X size={16} className="text-gray-500" />
              </button>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Filtre par moods - EN PREMIER */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">
              Ambiances recherchées ({activeFilters.selectedMoods.length}/5)
            </h3>
            <div className="grid grid-cols-3 gap-2">
              {moods.map(mood => {
                const isSelected = activeFilters.selectedMoods.find(m => m.emoji === mood.emoji);
                const isDisabled = activeFilters.selectedMoods.length >= 5 && !isSelected;
                
                return (
                  <button
                    key={mood.emoji}
                    onClick={() => !isDisabled && toggleMoodFilter(mood)}
                    disabled={isDisabled}
                    className={`p-3 rounded-xl transition-all duration-200 flex flex-col items-center justify-center min-h-[60px] border ${
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
          </div>

          {/* Filtre par date */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Quand ?</h3>
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: 'today', label: 'Aujourd\'hui' },
                { id: 'tomorrow', label: 'Demain' },
                { id: 'week', label: 'Cette semaine' },
                { id: 'weekend', label: 'Ce week-end' }
              ].map(date => (
                <button
                  key={date.id}
                  onClick={() => updateFilter('date', activeFilters.date === date.id ? '' : date.id)}
                  className={`p-3 rounded-xl text-sm font-medium transition-colors ${
                    activeFilters.date === date.id
                      ? 'bg-purple-100 text-purple-800 border border-purple-200'
                      : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {date.label}
                </button>
              ))}
            </div>
          </div>

          {/* Filtre par créneaux horaires */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Créneaux horaires</h3>
            <div className="space-y-2">
              {timeSlots.map(slot => (
                <button
                  key={slot}
                  onClick={() => updateFilter('time', activeFilters.time === slot ? '' : slot)}
                  className={`w-full p-3 rounded-xl text-sm font-medium transition-colors text-left ${
                    activeFilters.time === slot
                      ? 'bg-purple-100 text-purple-800 border border-purple-200'
                      : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {slot}
                </button>
              ))}
            </div>
          </div>

          {/* Filtre par lieu */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Lieu spécifique</h3>
            <div className="relative">
              <MapPin size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Ex: Café Central, Parc..."
                value={activeFilters.location}
                onChange={(e) => updateFilter('location', e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border-0 rounded-xl focus:bg-white focus:ring-2 focus:ring-purple-500 focus:outline-none transition-all"
              />
            </div>
          </div>

          {/* Filtre par distance */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Distance maximum</h3>
            <div className="grid grid-cols-3 gap-2">
              {distances.map(distance => (
                <button
                  key={distance}
                  onClick={() => updateFilter('distance', activeFilters.distance === distance ? '' : distance)}
                  className={`p-3 rounded-xl text-sm font-medium transition-colors ${
                    activeFilters.distance === distance
                      ? 'bg-purple-100 text-purple-800 border border-purple-200'
                      : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {distance}
                </button>
              ))}
            </div>
          </div>

          {/* Nombre de participants */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Nombre de participants max</h3>
            <div className="relative">
              <Users size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="number"
                placeholder="Ex: 5"
                min="2"
                max="50"
                value={activeFilters.maxParticipants}
                onChange={(e) => updateFilter('maxParticipants', e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border-0 rounded-xl focus:bg-white focus:ring-2 focus:ring-purple-500 focus:outline-none transition-all"
              />
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-gray-100">
          <button
            onClick={() => setShowFilters(false)}
            className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-2xl font-semibold"
          >
            Appliquer les filtres ({filteredActivities.length} résultat{filteredActivities.length !== 1 ? 's' : ''})
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex-1">
      {/* Header avec barre de recherche */}
      <div className="bg-white px-6 py-4 shadow-md">
        <div className="relative">
          <Search size={18} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input 
            type="text"
            placeholder="Chercher un MoodUp, un lieu, un mood..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-gray-100 rounded-2xl focus:outline-none focus:bg-white focus:shadow-md transition-all duration-300"
          />
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-800">
            {searchQuery || getActiveFiltersCount() > 0 
              ? `${filteredActivities.length} résultat${filteredActivities.length !== 1 ? 's' : ''} trouvé${filteredActivities.length !== 1 ? 's' : ''}`
              : 'Rechercher des MoodUps'
            }
          </h2>
          <div className="flex items-center space-x-2">
            <button 
              onClick={() => setShowFilters(true)}
              className={`relative p-2 rounded-xl transition-colors ${
                getActiveFiltersCount() > 0 
                  ? 'bg-purple-100 text-purple-600' 
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
              }`}
            >
              <Filter size={16} />
              {getActiveFiltersCount() > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-purple-600 text-white text-xs rounded-full flex items-center justify-center">
                  {getActiveFiltersCount()}
                </span>
              )}
            </button>
          </div>
        </div>
        
        {/* Filtres rapides */}
        <div className="flex space-x-2 mb-4 overflow-x-auto">
          {quickFilters.map((filter) => (
            <button 
              key={filter.id} 
              onClick={() => toggleQuickFilter(filter.id)}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-sm transition-colors flex items-center gap-2 ${
                activeFilters.quickFilter === filter.id 
                  ? 'bg-purple-100 text-purple-600' 
                  : 'bg-gray-100 text-gray-600 hover:bg-purple-100 hover:text-purple-600'
              }`}
            >
              {filter.icon && <filter.icon size={14} />}
              {filter.label}
            </button>
          ))}
        </div>

        {/* Tags des filtres actifs */}
        {(searchQuery || getActiveFiltersCount() > 0) && (
          <div className="flex flex-wrap gap-2 mb-4">
            {searchQuery && (
              <span className="inline-flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                Recherche: "{searchQuery}"
                <button 
                  onClick={() => setSearchQuery('')}
                  className="ml-2 text-blue-600 hover:text-blue-800"
                >
                  <X size={12} />
                </button>
              </span>
            )}
            {activeFilters.selectedMoods.map(mood => (
              <span key={mood.emoji} className="inline-flex items-center bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
                {mood.emoji} {mood.label}
                <button 
                  onClick={() => toggleMoodFilter(mood)}
                  className="ml-2 text-purple-600 hover:text-purple-800"
                >
                  <X size={12} />
                </button>
              </span>
            ))}
            {activeFilters.location && (
              <span className="inline-flex items-center bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                📍 {activeFilters.location}
                <button 
                  onClick={() => updateFilter('location', '')}
                  className="ml-2 text-green-600 hover:text-green-800"
                >
                  <X size={12} />
                </button>
              </span>
            )}
          </div>
        )}
        
        {/* Résultats */}
        <div className="space-y-3">
          {filteredActivities.length > 0 ? (
            filteredActivities.map(activity => (
              <ActivityCard 
                key={activity.id} 
                activity={activity} 
                isInList={true} 
                onActivitySelect={onActivitySelect}
                onUserProfileSelect={onUserProfileSelect}
                currentUser="Marie"
              />
            ))
          ) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search size={24} className="text-gray-400" />
              </div>
              <h3 className="font-medium text-gray-900 mb-2">Aucun résultat trouvé</h3>
              <p className="text-sm text-gray-500 mb-4">
                Essaie avec d'autres mots-clés ou ajuste tes filtres
              </p>
              <button 
                onClick={clearAllFilters}
                className="bg-gradient-to-r from-purple-600 to-pink-500 text-white px-6 py-3 rounded-2xl font-medium"
              >
                Effacer tous les filtres
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Modal des filtres */}
      {showFilters && <FilterModal />}
    </div>
  );
};

export default SearchPage;