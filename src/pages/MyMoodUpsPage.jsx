// pages/MyMoodUpsPage.jsx - Page de gestion des MoodUps de l'utilisateur
import React, { useState } from 'react';
import { Smile, UserCheck, UserX, Bell, MapPin, Clock, Users, CheckCircle, MessageCircle, Trash2 } from 'lucide-react';
import ActivityCard from '../components/ActivityCard';
import RatingModal from '../components/RatingModal';
import GroupChatModal from '../components/GroupChatModal';
import { activities } from '../data/activities';

const MyMoodUpsPage = ({ onActivitySelect, onUserProfileSelect }) => {
  const [activeTab, setActiveTab] = useState('participations');
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [activityToRate, setActivityToRate] = useState(null);
  const [showChatModal, setShowChatModal] = useState(false);
  const [chatActivity, setChatActivity] = useState(null);
  const [chatIsOrganizer, setChatIsOrganizer] = useState(false);

  // Simulation des données utilisateur
  const currentUser = 'Marie';
  const myCreations = activities.filter(activity => activity.creator === currentUser);
  
  // Simulation de mes participations avec différents statuts
  const myParticipations = [
    {
      ...activities.find(a => a.id === 3), // Yoga matinal
      participationStatus: 'accepted', // Demande acceptée
      isEventStarted: false // Événement pas encore commencé
    },
    {
      id: 4,
      title: "Atelier cuisine italienne",
      location: "Chez Marco, Rue de la Paix",
      date: "Hier",
      time: "19:00",
      participants: "4/6",
      description: "Apprenons à faire des vraies pâtes fraîches !",
      moods: [
        { emoji: '🍝', label: 'Gourmand' },
        { emoji: '🤝', label: 'Connectant' },
        { emoji: '😄', label: 'Fun' }
      ],
      distance: "0.8 km",
      creator: "Marco",
      participationStatus: 'accepted', // Demande acceptée
      isEventStarted: true // Événement terminé
    },
    {
      id: 5,
      title: "Balade photographique",
      location: "Jardins suspendus",
      date: "Demain",
      time: "16:00",
      participants: "2/4",
      description: "Capturons la beauté des jardins du Havre",
      moods: [
        { emoji: '📸', label: 'Créatif' },
        { emoji: '🌱', label: 'Ressourçant' },
        { emoji: '😌', label: 'Chill' }
      ],
      distance: "1.5 km",
      creator: "Sophie",
      participationStatus: 'pending', // Demande en attente
      isEventStarted: false
    }
  ];
  
  // Simulation des demandes reçues pour mes créations
  const pendingRequests = [
    { 
      id: 1, 
      activityId: 1, 
      activityTitle: 'Café & discussion startup',
      userName: 'Jules Moreau', 
      avatar: 'J', 
      time: 'Il y a 2h',
      userMoods: ['💭', '🚀']
    },
    { 
      id: 2, 
      activityId: 1, 
      activityTitle: 'Café & discussion startup',
      userName: 'Alex Dubois', 
      avatar: 'A', 
      time: 'Il y a 30min',
      userMoods: ['🎨', '🤝']
    },
  ];

  const currentActivities = activeTab === 'participations' ? myParticipations : myCreations;

  // Simulation des nouveaux messages par MoodUp
  const getUnreadMessages = (activityId) => {
    // Simulation : certains MoodUps ont des messages non lus
    const unreadCounts = {
      1: 3, // Café & discussion startup - 3 nouveaux messages
      3: 1, // Yoga matinal - 1 nouveau message
      4: 5  // Atelier cuisine italienne - 5 nouveaux messages
    };
    return unreadCounts[activityId] || 0;
  };

  const handleMessagerie = (activity, isOrganizer = false) => {
    setChatActivity(activity);
    setChatIsOrganizer(isOrganizer);
    setShowChatModal(true);
  };

  const handleRequestAction = (requestId, action) => {
    console.log(`${action} la demande ${requestId}`);
    alert(`Demande ${action === 'accepter' ? 'acceptée' : 'refusée'} !`);
  };

  const handleParticipationAction = (activity) => {
    const { participationStatus, isEventStarted } = activity;
    
    if (participationStatus === 'pending') {
      // Annuler ma demande en attente
      if (confirm('Voulez-vous annuler votre demande de participation ?')) {
        console.log('Demande annulée pour:', activity.id);
        alert('Demande annulée !');
      }
    } else if (participationStatus === 'accepted' && !isEventStarted) {
      // Annuler ma participation (avant le début)
      if (confirm('Êtes-vous sûr de vouloir annuler votre participation ?')) {
        console.log('Participation annulée pour:', activity.id);
        alert('Participation annulée !');
      }
    } else if (participationStatus === 'accepted' && isEventStarted) {
      // Terminer et noter (après l'événement)
      console.log('Terminer et noter pour:', activity.id);
      setActivityToRate(activity);
      setShowRatingModal(true);
    }
  };

  const handleCreationAction = (activity) => {
    // Simulation avec des conditions réelles pour voir le bouton "Terminer"
    const hasAcceptedParticipants = activity.id === 1; // Le premier MoodUp a des participants
    const isPastEvent = activity.id === 1; // Le premier MoodUp est passé
    
    if (hasAcceptedParticipants && isPastEvent) {
      // Terminer le MoodUp
      console.log('Terminer le MoodUp:', activity.id);
      setActivityToRate(activity);
      setShowRatingModal(true);
    } else {
      // Supprimer le MoodUp
      if (confirm('Êtes-vous sûr de vouloir supprimer ce MoodUp ?')) {
        console.log('Supprimer le MoodUp:', activity.id);
        alert('MoodUp supprimé !');
      }
    }
  };

  const getCreationButtonText = (activity) => {
    const hasAcceptedParticipants = activity.id === 1; // Simulation
    const isPastEvent = activity.id === 1; // Simulation
    
    if (hasAcceptedParticipants && isPastEvent) {
      return 'Terminer';
    }
    return null; // Pas de texte pour l'icône poubelle
  };

  const getCreationButtonStyle = (activity) => {
    const hasAcceptedParticipants = activity.id === 1; // Simulation
    const isPastEvent = activity.id === 1; // Simulation
    
    if (hasAcceptedParticipants && isPastEvent) {
      return 'bg-blue-500 hover:bg-blue-600 text-white hover:shadow-lg px-4 py-2';
    }
    return 'bg-red-500 hover:bg-red-600 text-white hover:shadow-lg p-2';
  };

  const getCreationButtonIcon = (activity) => {
    const hasAcceptedParticipants = activity.id === 1; // Simulation
    const isPastEvent = activity.id === 1; // Simulation
    
    if (hasAcceptedParticipants && isPastEvent) {
      return <CheckCircle size={14} />;
    }
    return <Trash2 size={16} />;
  };

  const getParticipationButtonText = (activity) => {
    const { participationStatus, isEventStarted } = activity;
    
    if (participationStatus === 'pending') return null;
    if (participationStatus === 'accepted' && !isEventStarted) return null;
    if (participationStatus === 'accepted' && isEventStarted) return 'Terminer';
    return null;
  };

  const getParticipationButtonStyle = (activity) => {
    const { participationStatus, isEventStarted } = activity;
    
    if (participationStatus === 'accepted' && isEventStarted) {
      return 'bg-blue-500 hover:bg-blue-600 text-white hover:shadow-lg px-4 py-2';
    }
    return 'bg-red-500 hover:bg-red-600 text-white hover:shadow-lg p-2';
  };

  const getParticipationButtonIcon = (activity) => {
    const { participationStatus, isEventStarted } = activity;
    
    if (participationStatus === 'accepted' && isEventStarted) {
      return <CheckCircle size={14} />;
    }
    return <Trash2 size={16} />;
  };

  const ParticipationCard = ({ activity }) => (
    <div 
      onClick={() => onActivitySelect(activity)}
      className="bg-white rounded-2xl shadow-lg p-4 mb-3 border border-gray-100 hover:shadow-xl transition-all duration-300 cursor-pointer mx-4"
    >
      {/* Badge de statut - Ligne complète en haut */}
      <div className="flex justify-start mb-3">
        {activity.participationStatus === 'pending' && (
          <span className="text-xs bg-orange-100 text-orange-600 px-3 py-1 rounded-full font-medium">
            En attente
          </span>
        )}
        {activity.participationStatus === 'accepted' && !activity.isEventStarted && (
          <span className="text-xs bg-green-100 text-green-600 px-3 py-1 rounded-full font-medium">
            Accepté
          </span>
        )}
        {activity.participationStatus === 'accepted' && activity.isEventStarted && (
          <span className="text-xs bg-blue-100 text-blue-600 px-3 py-1 rounded-full font-medium">
            À terminer
          </span>
        )}
      </div>

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
          <button
            onClick={(e) => {
              e.stopPropagation();
              onUserProfileSelect && onUserProfileSelect(activity.creator);
            }}
            className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-500 rounded-full flex items-center justify-center hover:shadow-lg transition-all duration-300 hover:scale-110"
          >
            <span className="text-white text-xs font-bold">{activity.creator[0]}</span>
          </button>
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
        <div className="flex items-center gap-2">
          {/* Bouton Messagerie - visible si accepté */}
          {activity.participationStatus === 'accepted' && (
            <button 
              onClick={(e) => {
                e.stopPropagation();
                handleMessagerie(activity, false);
              }}
              className="relative px-3 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-1 bg-blue-100 text-blue-600 hover:bg-blue-200"
            >
              <MessageCircle size={14} />
              Chat
              {/* Badge notification pour nouveaux messages */}
              {getUnreadMessages(activity.id) > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                  {getUnreadMessages(activity.id)}
                </span>
              )}
            </button>
          )}
          <button 
            onClick={(e) => {
              e.stopPropagation();
              handleParticipationAction(activity);
            }}
            className={`rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 ${getParticipationButtonStyle(activity)}`}
          >
            {getParticipationButtonIcon(activity)}
            {getParticipationButtonText(activity)}
          </button>
        </div>
      </div>
    </div>
  );

  const CreationCard = ({ activity }) => (
    <div 
      onClick={() => onActivitySelect(activity)}
      className="bg-white rounded-2xl shadow-lg p-4 mb-3 border border-gray-100 hover:shadow-xl transition-all duration-300 cursor-pointer mx-4"
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
          <button
            onClick={(e) => {
              e.stopPropagation();
              onUserProfileSelect && onUserProfileSelect(activity.creator);
            }}
            className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-500 rounded-full flex items-center justify-center hover:shadow-lg transition-all duration-300 hover:scale-110"
          >
            <span className="text-white text-xs font-bold">{activity.creator[0]}</span>
          </button>
        </div>
      </div>
      
      {activity.description && (
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{activity.description}</p>
      )}
      
      <div className="flex items-center justify-between">
        <div className="flex flex-wrap gap-1">
          {activity.moods && activity.moods.slice(0, 3).map((mood, i) => (
            <span key={i} className="inline-flex items-center bg-purple-50 text-purple-700 px-2 py-1 rounded-full text-xs font-medium">
              {mood.emoji} {mood.label}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-2">
          {/* Bouton Messagerie pour mes créations - toujours visible */}
          <button 
            onClick={(e) => {
              e.stopPropagation();
              handleMessagerie(activity, true);
            }}
            className="relative px-3 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-1 bg-blue-100 text-blue-600 hover:bg-blue-200"
          >
            <MessageCircle size={14} />
            Chat
            {/* Badge notification pour nouveaux messages */}
            {getUnreadMessages(activity.id) > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                {getUnreadMessages(activity.id)}
              </span>
            )}
          </button>
          {/* Bouton Terminer/Supprimer */}
          <button 
            onClick={(e) => {
              e.stopPropagation();
              handleCreationAction(activity);
            }}
            className={`rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 ${getCreationButtonStyle(activity)}`}
          >
            {getCreationButtonIcon(activity)}
            {getCreationButtonText(activity)}
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex-1">
      {/* Header */}
      <div className="bg-white px-6 py-4 shadow-md">
        <h2 className="text-xl font-bold text-gray-800 text-center">Mes MoodUps</h2>
      </div>

      <div className="p-4">
        {/* Statistiques rapides */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-white rounded-2xl p-4 text-center shadow-sm">
            <p className="font-bold text-lg text-purple-600">{myParticipations.length}</p>
            <p className="text-xs text-gray-500">Participations</p>
          </div>
          <div className="bg-white rounded-2xl p-4 text-center shadow-sm">
            <p className="font-bold text-lg text-purple-600">{myCreations.length}</p>
            <p className="text-xs text-gray-500">Créations</p>
          </div>
        </div>

        {/* Demandes reçues - Seulement si j'ai des créations */}
        {myCreations.length > 0 && pendingRequests.length > 0 && (
          <div className="bg-white rounded-2xl p-4 mb-6 shadow-sm border-l-4 border-orange-400">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <Bell size={20} className="text-orange-500 mr-2" />
                <h3 className="font-semibold text-gray-900">
                  {pendingRequests.length} nouvelle{pendingRequests.length > 1 ? 's' : ''} demande{pendingRequests.length > 1 ? 's' : ''}
                </h3>
              </div>
              <span className="text-xs text-orange-600 bg-orange-100 px-2 py-1 rounded-full">
                En attente
              </span>
            </div>
            
            <div className="space-y-3">
              {pendingRequests.slice(0, 2).map((request) => (
                <div key={request.id} className="bg-gray-50 rounded-xl p-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs font-bold">{request.avatar}</span>
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900 text-sm">{request.userName}</p>
                        <p className="text-xs text-gray-500">{request.activityTitle} • {request.time}</p>
                        <div className="flex space-x-1 mt-1">
                          {request.userMoods.map((mood, i) => (
                            <span key={i} className="text-xs">{mood}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-1">
                      <button 
                        onClick={() => handleRequestAction(request.id, 'accepter')}
                        className="p-1.5 bg-green-500 hover:bg-green-600 rounded-lg text-white transition-colors"
                      >
                        <UserCheck size={12} />
                      </button>
                      <button 
                        onClick={() => handleRequestAction(request.id, 'refuser')}
                        className="p-1.5 bg-red-500 hover:bg-red-600 rounded-lg text-white transition-colors"
                      >
                        <UserX size={12} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {pendingRequests.length > 2 && (
              <button className="w-full mt-3 py-2 text-center text-orange-600 font-medium hover:bg-orange-50 rounded-xl transition-colors text-sm">
                Voir toutes les demandes ({pendingRequests.length})
              </button>
            )}
          </div>
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
            {activeTab === 'participations' ? (
              // Affichage spécialisé pour les participations avec messagerie
              currentActivities.map(activity => (
                <ParticipationCard key={activity.id} activity={activity} />
              ))
            ) : (
              // Affichage pour les créations avec bouton messagerie organisateur
              currentActivities.map(activity => (
                <CreationCard key={activity.id} activity={activity} />
              ))
            )}
          </div>
        ) : (
          /* Message si vide */
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
            <button className="bg-gradient-to-r from-purple-600 to-pink-500 text-white px-6 py-3 rounded-2xl font-medium hover:shadow-lg transition-all">
              {activeTab === 'participations' ? 'Découvrir des MoodUps' : 'Créer un MoodUp'}
            </button>
          </div>
        )}
      </div>

      {/* Modal de notation */}
      {showRatingModal && activityToRate && (
        <RatingModal
          activity={activityToRate}
          onClose={() => {
            setShowRatingModal(false);
            setActivityToRate(null);
          }}
          currentUser={currentUser}
        />
      )}

      {/* Modal de messagerie de groupe */}
      {showChatModal && chatActivity && (
        <GroupChatModal
          activity={chatActivity}
          currentUser={currentUser}
          isOrganizer={chatIsOrganizer}
          onClose={() => {
            setShowChatModal(false);
            setChatActivity(null);
            setChatIsOrganizer(false);
          }}
        />
      )}
    </div>
  );
};

export default MyMoodUpsPage;