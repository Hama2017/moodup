

// features/activities/components/MyMoodUpsPage.jsx
import React, { useState } from 'react';
import { Smile, Bell, UserCheck, UserX } from 'lucide-react';
import { useActivities } from '../../../hooks/useActivities';
import { useAuth } from '../../../hooks/useAuth';
import ActivityCard from './ActivityCard';
import Button from '../../../components/ui/Button';
import Badge from '../../../components/ui/Badge';
import Card from '../../../components/ui/Card';

const MyMoodUpsPage = ({ onActivitySelect, onUserSelect }) => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('participations');
  
  // Simuler mes activités et participations
  const { activities: allActivities } = useActivities();
  const myCreations = allActivities.filter(activity => activity.creator?.id === user?.id);
  const myParticipations = []; // À implémenter avec le système de participation

  const currentActivities = activeTab === 'participations' ? myParticipations : myCreations;

  // Simuler les demandes en attente
  const pendingRequests = [
    {
      id: 1,
      activityTitle: 'Café & discussion startup',
      userName: 'Jules Moreau',
      avatar: 'J',
      time: 'Il y a 2h'
    }
  ];

  const handleRequestAction = (requestId, action) => {
    console.log(`${action} la demande ${requestId}`);
    // Implémenter la logique d'acceptation/refus
  };

  return (
    <div className="flex-1">
      {/* Header */}
      <div className="bg-white px-6 py-4 shadow-md">
        <h2 className="text-xl font-bold text-gray-800 text-center">Mes MoodUps</h2>
      </div>

      <div className="p-4">
        {/* Statistiques */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <Card className="text-center">
            <p className="font-bold text-lg text-purple-600">{myParticipations.length}</p>
            <p className="text-xs text-gray-500">Participations</p>
          </Card>
          <Card className="text-center">
            <p className="font-bold text-lg text-purple-600">{myCreations.length}</p>
            <p className="text-xs text-gray-500">Créations</p>
          </Card>
        </div>

        {/* Demandes reçues */}
        {myCreations.length > 0 && pendingRequests.length > 0 && (
          <Card className="mb-6 border-l-4 border-orange-400">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <Bell size={20} className="text-orange-500 mr-2" />
                <h3 className="font-semibold text-gray-900">
                  {pendingRequests.length} nouvelle{pendingRequests.length > 1 ? 's' : ''} demande{pendingRequests.length > 1 ? 's' : ''}
                </h3>
              </div>
              <Badge variant="warning">En attente</Badge>
            </div>
            
            <div className="space-y-3">
              {pendingRequests.map((request) => (
                <div key={request.id} className="bg-gray-50 rounded-xl p-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs font-bold">{request.avatar}</span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 text-sm">{request.userName}</p>
                        <p className="text-xs text-gray-500">{request.activityTitle} • {request.time}</p>
                      </div>
                    </div>
                    <div className="flex space-x-1">
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => handleRequestAction(request.id, 'accepter')}
                        className="bg-green-500 text-white hover:bg-green-600"
                      >
                        <UserCheck size={12} />
                      </Button>
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => handleRequestAction(request.id, 'refuser')}
                        className="bg-red-500 text-white hover:bg-red-600"
                      >
                        <UserX size={12} />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Onglets */}
        <div className="flex bg-gray-100 rounded-2xl p-1 mb-6">
          <button
            onClick={() => setActiveTab('participations')}
            className={`flex-1 py-3 rounded-xl font-medium transition-all ${
              activeTab === 'participations'
                ? 'bg-white text-purple-600 shadow-sm'
                : 'text-gray-600'
            }`}
          >
            Mes participations
          </button>
          <button
            onClick={() => setActiveTab('creations')}
            className={`flex-1 py-3 rounded-xl font-medium transition-all ${
              activeTab === 'creations'
                ? 'bg-white text-purple-600 shadow-sm'
                : 'text-gray-600'
            }`}
          >
            Mes créations
          </button>
        </div>

        {/* Liste des activités */}
        {currentActivities.length > 0 ? (
          <div className="space-y-3">
            {currentActivities.map(activity => (
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
              {activeTab === 'participations' 
                ? 'Aucune participation pour le moment'
                : 'Aucun MoodUp créé pour le moment'
              }
            </h3>
            <p className="text-sm text-gray-500 mb-4">
              {activeTab === 'participations'
                ? 'Rejoins ton premier MoodUp ou crée-en un !'
                : 'Crée ton premier MoodUp et commence à organiser !'
              }
            </p>
            <Button>
              {activeTab === 'participations' ? 'Découvrir des MoodUps' : 'Créer un MoodUp'}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyMoodUpsPage;