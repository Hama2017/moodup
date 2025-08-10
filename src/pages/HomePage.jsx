// pages/HomePage.js - Page d'accueil avec carte interactive
import React from 'react';
import ActivityCard from '../components/ActivityCard';
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

      {/* Carte simulée */}
      <div className="h-80 bg-gradient-to-br from-blue-100 to-green-100 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="w-full h-full bg-gradient-to-br from-purple-600 to-pink-500"></div>
        </div>
        
        {/* Points d'activité sur la carte */}
        {visibleActivities.map((activity, i) => (
          <div 
            key={activity.id}
            className="absolute bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-all cursor-pointer border-2 border-purple-500"
            style={{
              left: `${50 + (i * 10)}%`,
              top: `${50 + (i * 5)}%`
            }}
            onClick={() => onActivitySelect(activity)}
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