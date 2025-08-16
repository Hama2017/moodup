

// features/home/components/HomePage.jsx - Version CORRIGÉE
import React from 'react';
import { useActivities } from '../../../hooks/useActivities';
import { useAuth } from '../../../hooks/useAuth';
import ActivityCard from '../../activities/components/ActivityCard';
import MapComponent from '../../map/components/MapComponent';
import Button from '../../../components/ui/Button';
import Spinner from '../../../components/ui/Spinner';
import { Smile } from 'lucide-react';

const HomePage = ({ onActivitySelect, onUserSelect, onNavigateToSearch }) => {
  const { user } = useAuth();
  
  // 🔧 FIX: Options statiques pour éviter le cycle infini
  const activitiesOptions = React.useMemo(() => ({
    excludeUserActivities: true,
    userId: user?.id
  }), [user?.id]);

  const { activities, loading, error, refetch } = useActivities(activitiesOptions);

  if (loading) {
    return (
      <div className="flex-1">
        {/* Header */}
        <header className="bg-white px-6 py-3 shadow-md">
          <div className="text-center mb-3">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
              MoodUp
            </h1>
            <p className="text-xs text-gray-500 font-medium">
              Découvre les vibes autour de toi
            </p>
          </div>
        </header>

        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <Spinner size="lg" className="mx-auto mb-4" />
            <p className="text-gray-600">Chargement des MoodUps...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-1">
        {/* Header */}
        <header className="bg-white px-6 py-3 shadow-md">
          <div className="text-center mb-3">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
              MoodUp
            </h1>
            <p className="text-xs text-gray-500 font-medium">
              Découvre les vibes autour de toi
            </p>
          </div>
        </header>

        <div className="p-4">
          <div className="bg-red-50 border border-red-200 rounded-2xl p-4 text-center">
            <p className="text-red-600 mb-3">Erreur lors du chargement des activités</p>
            <Button variant="outline" size="sm" onClick={refetch}>
              Réessayer
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const visibleActivities = activities.slice(0, 5); // Limiter à 5 activités

  return (
    <div className="flex-1">
      {/* Header */}
      <header className="bg-white px-6 py-3 shadow-md">
        <div className="text-center mb-3">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
            MoodUp
          </h1>
          <p className="text-xs text-gray-500 font-medium">
            Découvre les vibes autour de toi
          </p>
        </div>
      </header>

      {/* Carte */}
      <div className="px-4 pt-4">
        <div className="rounded-2xl overflow-hidden shadow-lg">
          <MapComponent
            activities={visibleActivities}
            onActivitySelect={onActivitySelect}
            height="320px"
            showUserLocation={false} // 🔧 FIX: Désactivé par défaut
          />
        </div>
      </div>
      
      {/* Activités */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-800">
            MoodUps proches de toi
          </h2>
          <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
            {activities.length} disponibles
          </span>
        </div>

        {visibleActivities.length > 0 ? (
          <div className="space-y-3">
            {visibleActivities.map(activity => (
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
              <Smile size={24} className="text-gray-400" />
            </div>
            <h3 className="font-medium text-gray-900 mb-2">
              Aucun MoodUp pour le moment
            </h3>
            <p className="text-sm text-gray-500 mb-4">
              Sois le premier à créer un MoodUp dans ta région !
            </p>
          </div>
        )}

        {activities.length > visibleActivities.length && (
          <Button 
            variant="ghost"
            onClick={onNavigateToSearch}
            className="w-full mt-4"
          >
            Voir tous les MoodUps ({activities.length})
          </Button>
        )}
      </div>
    </div>
  );
};

export default HomePage;