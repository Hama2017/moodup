// features/search/components/SearchPage.jsx
import React, { useState } from 'react';
import { Search, Filter, X } from 'lucide-react';
import { useActivities } from '../../../../hooks/useActivities';
import { useDebounce } from '../../../../hooks/useDebounce';
import { useAuth } from '../../../../hooks/useAuth';
import ActivityCard from '../../../activities/components/ActivityCard';
import Button from '../../../../components/ui/Button';
import Input from '../../../../components/ui/Input';
import Badge from '../../../../components/ui/Badge';
import Modal from '../../../../components/ui/Modal';
import { useModal } from '../../../../hooks/useModal';
import { quickFilters, moods } from '../../../../constants/activities';

const SearchPage = ({ onActivitySelect, onUserSelect }) => {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState({
    quickFilter: '',
    selectedMoods: [],
    date: '',
    location: ''
  });

  const debouncedSearch = useDebounce(searchQuery, 300);
  const filtersModal = useModal();

  const { activities, loading, error } = useActivities({
    search: debouncedSearch,
    ...activeFilters,
    excludeUserActivities: true
  });

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

  const clearAllFilters = () => {
    setActiveFilters({
      quickFilter: '',
      selectedMoods: [],
      date: '',
      location: ''
    });
    setSearchQuery('');
  };

  const getActiveFiltersCount = () => {
    return Object.values(activeFilters).filter(value => 
      value && (Array.isArray(value) ? value.length > 0 : true)
    ).length + (searchQuery ? 1 : 0);
  };

  return (
    <div className="flex-1">
      {/* Header avec recherche */}
      <div className="bg-white px-6 py-4 shadow-md">
        <Input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Chercher un MoodUp, un lieu, un mood..."
          leftIcon={<Search size={18} />}
          className="w-full"
        />
      </div>

      <div className="p-4">
        {/* Header résultats */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-800">
            {searchQuery || getActiveFiltersCount() > 0 
              ? `${activities.length} résultat${activities.length !== 1 ? 's' : ''}`
              : 'Rechercher des MoodUps'
            }
          </h2>
          <Button
            variant={getActiveFiltersCount() > 0 ? "primary" : "secondary"}
            size="sm"
            onClick={filtersModal.open}
            className="relative"
          >
            <Filter size={16} />
            {getActiveFiltersCount() > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                {getActiveFiltersCount()}
              </span>
            )}
          </Button>
        </div>

        {/* Filtres rapides */}
        <div className="flex space-x-2 mb-4 overflow-x-auto scrollbar-hide">
          {quickFilters.map((filter) => (
            <Button
              key={filter.id}
              variant={activeFilters.quickFilter === filter.id ? "primary" : "secondary"}
              size="sm"
              onClick={() => toggleQuickFilter(filter.id)}
              className="flex-shrink-0"
            >
              {filter.label}
            </Button>
          ))}
        </div>

        {/* Tags des filtres actifs */}
        {getActiveFiltersCount() > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {searchQuery && (
              <Badge variant="info" className="flex items-center gap-1">
                Recherche: "{searchQuery}"
                <button onClick={() => setSearchQuery('')}>
                  <X size={12} />
                </button>
              </Badge>
            )}
            {activeFilters.selectedMoods.map(mood => (
              <Badge key={mood.emoji} variant="primary" className="flex items-center gap-1">
                {mood.emoji} {mood.label}
                <button onClick={() => toggleMoodFilter(mood)}>
                  <X size={12} />
                </button>
              </Badge>
            ))}
          </div>
        )}

        {/* Résultats */}
        {loading ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
          </div>
        ) : error ? (
          <div className="text-center py-8">
            <p className="text-red-600">Erreur lors du chargement</p>
          </div>
        ) : activities.length > 0 ? (
          <div className="space-y-3">
            {activities.map(activity => (
              <ActivityCard
                key={activity.id}
                activity={activity}
                currentUser={user}
                onActivitySelect={onActivitySelect}
                onUserProfileSelect={onUserSelect}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search size={24} className="text-gray-400" />
            </div>
            <h3 className="font-medium text-gray-900 mb-2">Aucun résultat trouvé</h3>
            <p className="text-sm text-gray-500 mb-4">
              Essaie avec d'autres mots-clés ou ajuste tes filtres
            </p>
            <Button onClick={clearAllFilters}>
              Effacer tous les filtres
            </Button>
          </div>
        )}
      </div>

      {/* Modal des filtres */}
      <FilterModal
        isOpen={filtersModal.isOpen}
        onClose={filtersModal.close}
        activeFilters={activeFilters}
        onUpdateFilters={setActiveFilters}
        onClearAll={clearAllFilters}
      />
    </div>
  );
};

// Composant modal des filtres
const FilterModal = ({ isOpen, onClose, activeFilters, onUpdateFilters, onClearAll }) => {
  const handleMoodToggle = (mood) => {
    const isSelected = activeFilters.selectedMoods.find(m => m.emoji === mood.emoji);
    const newMoods = isSelected
      ? activeFilters.selectedMoods.filter(m => m.emoji !== mood.emoji)
      : [...activeFilters.selectedMoods, mood];
    
    onUpdateFilters(prev => ({ ...prev, selectedMoods: newMoods }));
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Filtres" size="lg">
      <div className="p-6 space-y-6">
        {/* Ambiances */}
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
                  onClick={() => !isDisabled && handleMoodToggle(mood)}
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

        {/* Actions */}
        <div className="flex gap-3 pt-4 border-t">
          <Button variant="secondary" onClick={onClearAll} className="flex-1">
            Tout effacer
          </Button>
          <Button variant="primary" onClick={onClose} className="flex-1">
            Appliquer
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default SearchPage;