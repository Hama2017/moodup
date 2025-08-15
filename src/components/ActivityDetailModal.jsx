// components/ActivityDetailModal.jsx - Modal de détail d'une activité
import React, { useState } from 'react';
import { MapPin, Clock, Users, Plus, Trash2, UserCheck, UserX, CheckCircle, Send, Map, Share2 } from 'lucide-react';
import NavigationFullscreen from './NavigationFullscreen';

const ActivityDetailModal = ({ activity, onClose, onUserProfileSelect, currentUser = 'Marie' }) => {
  const [showRequests, setShowRequests] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [showNavigation, setShowNavigation] = useState(false); // Changed from showMapsMenu
  const isMyActivity = activity.creator === currentUser;

  // ✅ Functions moved inside component
  const handleMapClick = () => {
    setShowNavigation(true);
  };

  const handleCloseNavigation = () => {
    setShowNavigation(false);
  };
  
  // Simulation du statut de participation de l'utilisateur actuel
  const [isParticipating, setIsParticipating] = useState(false);
  const [hasPendingRequest, setHasPendingRequest] = useState(false);
  
  // Simulation des participants acceptés et des demandes en attente
  const acceptedParticipants = [
    { id: 1, name: 'Jules Moreau', avatar: 'J', joinedTime: 'Il y a 1 jour' },
    { id: 2, name: 'Alex Dubois', avatar: 'A', joinedTime: 'Il y a 3h' },
  ];
  
  const pendingRequests = isMyActivity ? [
    { id: 3, name: 'Sophie Martin', avatar: 'S', time: 'Il y a 2h' },
    { id: 4, name: 'Lucas Petit', avatar: 'L', time: 'Il y a 30min' },
  ] : [];

  // Simulation des commentaires avec badges
  const comments = [
    {
      id: 1,
      sender: 'Marie',
      username: '@marie.dupont',
      text: 'Salut tout le monde ! Hâte de vous rencontrer 😊',
      timestamp: '14:30',
      avatar: 'M'
    },
    {
      id: 2,
      sender: 'Jules',
      username: '@jules.moreau',
      text: 'Pareil ! J\'ai quelques idées de projets à discuter 🚀',
      timestamp: '14:32',
      avatar: 'J'
    },
    {
      id: 3,
      sender: 'Alex',
      username: '@alex.dubois',
      text: 'Super ! J\'apporte mon carnet de sketches pour prendre des notes 📝',
      timestamp: '14:35',
      avatar: 'A'
    },
    {
      id: 4,
      sender: 'Sophie',
      username: '@sophie.martin',
      text: 'Ça a l\'air génial ! J\'aimerais bien participer 🙋‍♀️',
      timestamp: '14:40',
      avatar: 'S'
    }
  ];
  
  // Simuler les participants acceptés et la logique de date/heure
  const isEventPassed = activity.date === 'Hier' || activity.isCompleted || false;
  
  // Logique pour déterminer quel bouton afficher pour l'organisateur
  const canTerminate = isMyActivity && acceptedParticipants.length > 0 && isEventPassed;
  const canDelete = isMyActivity && !canTerminate;

  const handleParticipationAction = () => {
    if (isParticipating) {
      if (confirm('Êtes-vous sûr de vouloir annuler votre participation ?')) {
        setIsParticipating(false);
        console.log('Participation annulée pour:', activity.id);
        alert('Participation annulée !');
      }
    } else if (hasPendingRequest) {
      if (confirm('Voulez-vous annuler votre demande de participation ?')) {
        setHasPendingRequest(false);
        console.log('Demande annulée pour:', activity.id);
        alert('Demande annulée !');
      }
    } else {
      setHasPendingRequest(true);
      console.log('Demande envoyée pour:', activity.id);
      alert('Demande envoyée ! L\'organisateur va recevoir votre demande.');
    }
  };

  const handleOrganizerAction = () => {
    if (canTerminate) {
      console.log('Terminer le MoodUp:', activity.id);
      alert('Interface de notation des participants à implémenter !');
      onClose();
    } else if (canDelete) {
      if (confirm('Êtes-vous sûr de vouloir supprimer ce MoodUp ?')) {
        console.log('Supprimer le MoodUp:', activity.id);
        onClose();
      }
    }
  };

  const handleRequestAction = (requestId, action) => {
    console.log(`${action} la demande ${requestId}`);
    alert(`Demande ${action === 'accepter' ? 'acceptée' : 'refusée'} !`);
  };

  const handleRemoveParticipant = (participantId) => {
    if (confirm('Êtes-vous sûr de vouloir retirer ce participant ?')) {
      console.log(`Retirer le participant ${participantId}`);
      alert('Participant retiré du MoodUp !');
    }
  };

  const handleShareActivity = () => {
    // Logique de partage
    if (navigator.share) {
      // API native de partage (mobile)
      navigator.share({
        title: activity.title,
        text: `Rejoins-moi pour "${activity.title}" ! 🎉`,
        url: window.location.href
      }).catch(console.error);
    } else {
      // Fallback : copier le lien
      const shareText = `Rejoins-moi pour "${activity.title}" ! 🎉 ${window.location.href}`;
      navigator.clipboard.writeText(shareText).then(() => {
        alert('Lien copié ! Tu peux le partager maintenant 📋');
      }).catch(() => {
        alert('Impossible de copier le lien');
      });
    }
  };

  const getParticipationButtonText = () => {
    if (isParticipating) return 'Annuler ma participation';
    if (hasPendingRequest) return 'Annuler ma demande';
    return 'Faire une demande';
  };

  const getParticipationButtonStyle = () => {
    if (isParticipating || hasPendingRequest) {
      return 'bg-red-500 hover:bg-red-600 text-white';
    }
    return 'bg-gradient-to-r from-purple-600 to-pink-500 text-white hover:shadow-lg';
  };

  const getOrganizerButtonText = () => {
    if (canTerminate) return 'Terminer le MoodUp';
    return 'Supprimer';
  };

  const getOrganizerButtonStyle = () => {
    if (canTerminate) {
      return 'bg-blue-500 hover:bg-blue-600 text-white hover:shadow-lg flex items-center justify-center gap-2';
    }
    return 'bg-red-500 hover:bg-red-600 text-white hover:shadow-lg flex items-center justify-center gap-2';
  };

  const getOrganizerButtonIcon = () => {
    if (canTerminate) return <CheckCircle size={16} />;
    return <Trash2 size={16} />;
  };

  const getCommentBadge = (commenterName) => {
    if (commenterName === activity.creator) {
      return (
        <span className="text-xs bg-purple-100 text-purple-600 px-2 py-1 rounded-full font-medium ml-2">
          Organisateur
        </span>
      );
    }
    
    const acceptedNames = acceptedParticipants.map(p => p.name.split(' ')[0]);
    if (acceptedNames.includes(commenterName)) {
      return (
        <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full font-medium ml-2">
          Participant
        </span>
      );
    }
    
    return null;
  };

  const handleSendComment = () => {
    if (newComment.trim()) {
      console.log('Nouveau commentaire:', newComment);
      alert('Commentaire envoyé !');
      setNewComment('');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end justify-center z-50">
      <div className="bg-white rounded-t-3xl w-full max-w-md animate-slide-up max-h-[90vh] overflow-hidden flex flex-col">
        <div className="p-6 border-b border-gray-100">
          <div className="flex justify-between items-center">
            <button 
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
            >
              <span className="text-gray-500 text-lg">&times;</span>
            </button>
            <h2 className="text-lg font-semibold text-gray-900">
              {showRequests ? 'Gestion des participants' : 'Détails du MoodUp'}
            </h2>
            <button
              onClick={handleShareActivity}
              className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
              title="Partager ce MoodUp"
            >
              <Share2 size={16} className="text-gray-500" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {showRequests ? (
            /* Vue de gestion des participants pour l'organisateur */
            <div className="space-y-4">
              <div className="text-center mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Gestion des participants
                </h3>
                <p className="text-sm text-gray-500">Gérez qui participe à votre MoodUp</p>
              </div>

              {/* Liste des participants acceptés avec bouton supprimer */}
              <div className="space-y-3">
                <h4 className="font-medium text-gray-900">Participants acceptés ({acceptedParticipants.length})</h4>
                {acceptedParticipants.map((participant) => (
                  <div key={participant.id} className="bg-green-50 rounded-2xl p-4 border border-green-200">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                          <span className="text-white font-bold">{participant.avatar}</span>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{participant.name}</p>
                          <p className="text-xs text-gray-500">Rejoint {participant.joinedTime}</p>
                        </div>
                      </div>
                      <button 
                        onClick={() => handleRemoveParticipant(participant.id)}
                        className="p-2 bg-red-100 hover:bg-red-200 rounded-xl text-red-600 transition-colors"
                        title="Retirer du MoodUp"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Demandes en attente s'il y en a */}
              {pendingRequests.length > 0 && (
                <div className="space-y-3">
                  <h4 className="font-medium text-gray-900">Demandes en attente ({pendingRequests.length})</h4>
                  {pendingRequests.map((request) => (
                    <div key={request.id} className="bg-orange-50 rounded-2xl p-4 border border-orange-200">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                            <span className="text-white font-bold">{request.avatar}</span>
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{request.name}</p>
                            <p className="text-xs text-gray-500">Demande envoyée {request.time}</p>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <button 
                            onClick={() => handleRequestAction(request.id, 'accepter')}
                            className="p-2 bg-green-500 hover:bg-green-600 rounded-xl text-white transition-colors"
                          >
                            <UserCheck size={16} />
                          </button>
                          <button 
                            onClick={() => handleRequestAction(request.id, 'refuser')}
                            className="p-2 bg-red-500 hover:bg-red-600 rounded-xl text-white transition-colors"
                          >
                            <UserX size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {acceptedParticipants.length === 0 && (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users size={24} className="text-gray-400" />
                  </div>
                  <h3 className="font-medium text-gray-900 mb-2">Aucun participant pour le moment</h3>
                  <p className="text-sm text-gray-500">Les participants apparaîtront ici une fois acceptés</p>
                </div>
              )}
            </div>
          ) : (
            /* Vue normale des détails */
            <div className="space-y-6">
              <div className="text-center">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">{activity.title}</h1>
                <div className="flex items-center justify-center space-x-2">
                  <button
                    onClick={() => onUserProfileSelect && onUserProfileSelect(activity.creator)}
                    className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-500 rounded-full flex items-center justify-center hover:shadow-lg transition-all duration-300 hover:scale-110"
                  >
                    <span className="text-white font-bold">{activity.creator[0]}</span>
                  </button>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {isMyActivity ? `${activity.creator}` : `Organisé par ${activity.creator}`}
                    </p>
                    <p className="text-xs text-gray-500">{activity.distance}</p>
                  </div>
                </div>
                
                {/* Indicateur de statut */}
                {!isMyActivity && (
                  <div className="mt-3">
                    {isParticipating ? (
                      <span className="inline-flex items-center bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                        ✅ Vous participez à ce MoodUp
                      </span>
                    ) : hasPendingRequest ? (
                      <span className="inline-flex items-center bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium">
                        ⏳ Demande en attente de validation
                      </span>
                    ) : (
                      <span className="inline-flex items-center bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm font-medium">
                        👋 Vous ne participez pas encore
                      </span>
                    )}
                  </div>
                )}

                {/* Indicateur de statut pour l'organisateur */}
                {isMyActivity && (
                  <div className="mt-3">
                    {canTerminate ? (
                      <span className="inline-flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                        ✅ MoodUp terminé - Évaluez les participants
                      </span>
                    ) : canDelete ? (
                      <span className="inline-flex items-center bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm font-medium">
                        📅 MoodUp en cours ou à venir
                      </span>
                    ) : null}
                  </div>
                )}
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
                  <button 
                    onClick={handleMapClick}
                    className="p-2 bg-white rounded-xl shadow-sm hover:shadow-md transition-all"
                  >
                    <Map size={16} className="text-purple-600" />
                  </button>
                </div>
                
                <div className="flex items-center">
                  <Clock size={18} className="text-purple-600 mr-3" />
                  <div>
                    <p className="font-medium text-gray-900">{activity.date} à {activity.time}</p>
                    <p className="text-sm text-gray-500">Date et heure</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Users size={18} className="text-purple-600 mr-3" />
                    <div>
                      <p className="font-medium text-gray-900">{activity.participants} participants</p>
                      <p className="text-sm text-gray-500">Places disponibles</p>
                    </div>
                  </div>
                  {isMyActivity && acceptedParticipants.length > 0 && (
                    <button 
                      onClick={() => setShowRequests(true)}
                      className="relative bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-xs font-medium hover:bg-blue-200 transition-colors"
                    >
                      Gérer
                      {/* Badge notification rouge pour les demandes en attente */}
                      {pendingRequests.length > 0 && (
                        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                          {pendingRequests.length}
                        </span>
                      )}
                    </button>
                  )}
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
                  <button
                    onClick={() => onUserProfileSelect && onUserProfileSelect(activity.creator)}
                    className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-500 rounded-full flex items-center justify-center hover:shadow-lg transition-all duration-300 hover:scale-110"
                  >
                    <span className="text-white text-xs font-bold">{activity.creator[0]}</span>
                  </button>
                  <button
                    onClick={() => onUserProfileSelect && onUserProfileSelect('Jules')}
                    className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center hover:shadow-lg transition-all duration-300 hover:scale-110"
                  >
                    <span className="text-white text-xs font-bold">J</span>
                  </button>
                  <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                    <Plus size={14} className="text-gray-500" />
                  </div>
                </div>
              </div>

              {/* Section commentaires */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Commentaires</h3>
                <div className="space-y-3">
                  {comments.map((comment) => (
                    <div key={comment.id} className="bg-gray-50 rounded-2xl p-4">
                      <div className="flex items-start space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs font-bold">{comment.avatar}</span>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="font-medium text-gray-900">{comment.username}</span>
                            <span className="text-xs text-gray-500">{comment.timestamp}</span>
                            {getCommentBadge(comment.sender)}
                          </div>
                          <p className="text-sm text-gray-700">{comment.text}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Zone d'ajout de commentaire */}
                <div className="mt-4 flex space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">M</span>
                  </div>
                  <div className="flex-1 flex space-x-2">
                    <input 
                      type="text" 
                      placeholder="Ajouter un commentaire..."
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendComment()}
                      className="flex-1 p-3 bg-gray-50 border-0 rounded-2xl focus:bg-white focus:ring-2 focus:ring-purple-500 focus:outline-none transition-all placeholder-gray-400 text-gray-900"
                    />
                    <button
                      onClick={handleSendComment}
                      disabled={!newComment.trim()}
                      className={`w-10 h-10 rounded-full transition-all flex items-center justify-center ${
                        newComment.trim() 
                          ? 'bg-gradient-to-r from-purple-600 to-pink-500 text-white hover:shadow-lg' 
                          : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      }`}
                    >
                      <Send size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="p-6 border-t border-gray-100">
          <div className="flex gap-3">
            <button 
              onClick={showRequests ? () => setShowRequests(false) : onClose}
              className="flex-1 py-3 rounded-2xl font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              {showRequests ? 'Retour aux détails' : 'Fermer'}
            </button>
            {/* Boutons pour les non-organisateurs */}
            {!showRequests && !isMyActivity && (
              <button 
                onClick={handleParticipationAction}
                className={`flex-1 py-3 rounded-2xl font-semibold transition-all shadow-sm ${getParticipationButtonStyle()}`}
              >
                {getParticipationButtonText()}
              </button>
            )}
            {/* Boutons pour l'organisateur */}
            {!showRequests && isMyActivity && (canTerminate || canDelete) && (
              <button 
                onClick={handleOrganizerAction}
                className={`flex-1 py-3 rounded-2xl font-semibold transition-all shadow-sm ${getOrganizerButtonStyle()}`}
              >
                {getOrganizerButtonIcon()}
                {getOrganizerButtonText()}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Navigation Fullscreen */}
      {showNavigation && (
        <NavigationFullscreen
          activity={activity}
          destination={{
            latitude: 49.4944 + (Math.random() - 0.5) * 0.01,
            longitude: 0.1079 + (Math.random() - 0.5) * 0.01
          }}
          onClose={handleCloseNavigation}
        />
      )}
    </div>
  );
};

export default ActivityDetailModal;