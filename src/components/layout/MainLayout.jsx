

// components/layout/MainLayout.jsx - Layout principal de l'application
import React, { useState } from 'react';
import Navigation from './Navigation';
import HomePage from '../../features/home/components/HomePage';
import SearchPage from '../../features/search/components/components/SearchPage';
import MyMoodUpsPage from '../../features/activities/components/MyMoodUpsPage';
import ProfilePage from '../../features/profile/components/ProfilePage';
import CreateActivityForm from '../../features/activities/components/CreateActivityForm';
import ActivityDetailModal from '../../features/activities/components/ActivityDetailModal';
import UserProfileModal from '../../features/profile/components/UserProfileModal';
import { useModal } from '../../hooks/useModal';

const MainLayout = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  
  const createModal = useModal();
  const activityModal = useModal();
  const userModal = useModal();

  const handleActivitySelect = (activity) => {
    setSelectedActivity(activity);
    activityModal.open();
  };

  const handleUserSelect = (user) => {
    setSelectedUser(user);
    userModal.open();
  };

  const handleCreateSuccess = () => {
    // Refresh activities list or navigate to created activity
    console.log('Activity created successfully');
  };

  const renderCurrentPage = () => {
    switch (activeTab) {
      case 'home':
        return (
          <HomePage 
            onActivitySelect={handleActivitySelect}
            onUserSelect={handleUserSelect}
            onNavigateToSearch={() => setActiveTab('search')}
          />
        );
      case 'search':
        return (
          <SearchPage 
            onActivitySelect={handleActivitySelect}
            onUserSelect={handleUserSelect}
          />
        );
      case 'my-moodups':
        return (
          <MyMoodUpsPage 
            onActivitySelect={handleActivitySelect}
            onUserSelect={handleUserSelect}
          />
        );
      case 'profile':
        return <ProfilePage />;
      default:
        return (
          <HomePage 
            onActivitySelect={handleActivitySelect}
            onUserSelect={handleUserSelect}
            onNavigateToSearch={() => setActiveTab('search')}
          />
        );
    }
  };

  return (
    <div className="max-w-md mx-auto bg-gray-50 min-h-screen relative pb-16">
      {/* Contenu de la page active */}
      {renderCurrentPage()}

      {/* Navigation */}
      <Navigation 
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onCreateClick={createModal.open}
      />

      {/* Modals */}
      <CreateActivityForm
        isOpen={createModal.isOpen}
        onClose={createModal.close}
        onSuccess={handleCreateSuccess}
      />

      {selectedActivity && (
        <ActivityDetailModal
          isOpen={activityModal.isOpen}
          activity={selectedActivity}
          onClose={() => {
            activityModal.close();
            setSelectedActivity(null);
          }}
          onUserSelect={handleUserSelect}
        />
      )}

      {selectedUser && (
        <UserProfileModal
          isOpen={userModal.isOpen}
          user={selectedUser}
          onClose={() => {
            userModal.close();
            setSelectedUser(null);
          }}
        />
      )}
    </div>
  );
};

export default MainLayout;