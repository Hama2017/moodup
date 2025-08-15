// pages/HomePage.js - Page d'accueil avec carte Mapbox
import React from 'react';
import ActivityCard from '../components/ActivityCard';
import FinalMapboxTest from '../components/FinalMapboxTest';
import { activities } from '../data/activities';

const HomePage = ({ onActivitySelect, onNavigateToSearch, onUserProfileSelect }) => {
  const currentUser = 'Marie';
  
  // Filtrer les activités pour ne pas montrer mes créations
  const visibleActivities = activities.filter(activity => activity.creator !== currentUser);

  return (
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

      {/* Carte Mapbox */}
      <div className="px-4 pt-4">
        <div className="rounded-2xl overflow-hidden shadow-lg">
<FinalMapboxTest
  activities={visibleActivities}
  onActivitySelect={onActivitySelect}
  height="320px"
/>
        </div>
      </div>
      
      {/* Activités sous la carte */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-800">MoodUps proches de toi</h2>
          <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
            {visibleActivities.length} disponibles
          </span>
        </div>
        <div className="space-y-3">
          {visibleActivities.slice(0, 2).map(activity => (
            <ActivityCard
              key={activity.id}
              activity={activity}
              onActivitySelect={onActivitySelect}
              onUserProfileSelect={onUserProfileSelect}
              currentUser={currentUser}
            />
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
};

export default HomePage;