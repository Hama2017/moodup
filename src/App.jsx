// App.js - Composant principal
import React, { useState } from 'react';
import { Home, Search, Plus, Smile, User } from 'lucide-react';

// Import des pages
import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage';
import MyMoodUpsPage from './pages/MyMoodUpsPage';
import ProfilePage from './pages/ProfilePage';
import SettingsPage from './pages/SettingsPage';

// Import des modals
import CreateActivityModal from './components/CreateActivityModal';
import ActivityDetailModal from './components/ActivityDetailModal';
import UserProfileModal from './components/UserProfileModal';
import RatingModal from './components/RatingModal';

const MoodUpApp = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [selectedUserProfile, setSelectedUserProfile] = useState(null);

  const handleActivitySelect = (activity) => {
    setSelectedActivity(activity);
  };

  const handleNavigateToSettings = () => {
  setActiveTab('settings');
};

  const handleUserProfileSelect = (userName) => {
    setSelectedUserProfile(userName);
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
    return <ProfilePage onNavigateToSettings={handleNavigateToSettings} />;
      case 'settings':
        return <SettingsPage onBack={() => setActiveTab('profile')} />;
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
          onUserProfileSelect={handleUserProfileSelect}
          currentUser="Marie"
        />
      )}
      {selectedUserProfile && (
        <UserProfileModal
          user={selectedUserProfile}
          onClose={() => setSelectedUserProfile(null)}
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