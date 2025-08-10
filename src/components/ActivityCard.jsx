// components/ActivityCard.js - Composant réutilisable pour afficher une activité
import React from 'react';
import { MapPin, Clock, Users, Trash2, CheckCircle, Share2 } from 'lucide-react';

const ActivityCard = ({ activity, isInList = false, onActivitySelect, onUserProfileSelect, currentUser = 'Marie' }) => {
  const isMyActivity = activity.creator === currentUser;
  
  // Simuler les participants acceptés et la logique de date/heure
  const acceptedParticipants = activity.acceptedParticipants || 1;
  const isEventPassed = activity.date === 'Hier' || activity.isCompleted || false;
  
  // Logique pour déterminer quel bouton afficher
  const canTerminate = isMyActivity && acceptedParticipants > 0 && isEventPassed;
  const canDelete = isMyActivity && !canTerminate;
  
  // Simuler les noms complets des organisateurs
  const getOrganizerFullName = (creator) => {
    const organizers = {
      'Marie': 'Marie Dupont',
      'Jules': 'Jules Moreau',
      'Alex': 'Alex Dubois',
      'Sophie': 'Sophie Martin',
      'Lucas': 'Lucas Bernard',
      'Emma': 'Emma Rousseau'
    };
    return organizers[creator] || creator;
  };
  
  const handleButtonClick = (e) => {
    e.stopPropagation();
    if (canTerminate) {
      console.log('Terminer le MoodUp:', activity.id);
      alert('Interface de notation des participants à implémenter !');
    } else if (canDelete) {
      if (confirm('Êtes-vous sûr de vouloir supprimer ce MoodUp ?')) {
        console.log('Supprimer le MoodUp:', activity.id);
      }
    } else {
      console.log('Faire une demande pour rejoindre:', activity.id);
      onActivitySelect(activity);
    }
  };

  const handleShareClick = (e) => {
    e.stopPropagation();
    
    if (navigator.share) {
      navigator.share({
        title: activity.title,
        text: `Rejoins-moi pour "${activity.title}" ! 🎉`,
        url: window.location.href
      }).catch(console.error);
    } else {
      const shareText = `Rejoins-moi pour "${activity.title}" ! 🎉 ${window.location.href}`;
      navigator.clipboard.writeText(shareText).then(() => {
        alert('Lien copié ! Tu peux le partager maintenant 📋');
      }).catch(() => {
        alert('Impossible de copier le lien');
      });
    }
  };

  const getButtonText = () => {
    if (canTerminate) return 'Terminer';
    if (canDelete) return 'Supprimer';
    return 'Rejoindre';
  };

  const getButtonIcon = () => {
    if (canTerminate) return <CheckCircle size={14} />;
    if (canDelete) return <Trash2 size={14} />;
    return null;
  };

  const getButtonStyle = () => {
    if (canTerminate) {
      return 'bg-blue-500 hover:bg-blue-600 text-white hover:shadow-lg';
    }
    if (canDelete) {
      return 'bg-red-500 hover:bg-red-600 text-white hover:shadow-lg';
    }
    return 'bg-gradient-to-r from-purple-600 to-pink-500 text-white hover:shadow-lg';
  };

  return (
    <div 
      onClick={() => onActivitySelect(activity)}
      className={`bg-white rounded-2xl shadow-lg p-4 mb-3 border transition-all duration-300 cursor-pointer border-gray-100 hover:shadow-xl ${isInList ? 'mx-4' : ''}`}
    >
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-1">
            <h3 className={`font-bold text-lg ${activity.isMystery ? 'text-purple-800' : 'text-gray-800'}`}>
              {activity.isMystery ? '🎲 ' : ''}{activity.title}
            </h3>
          </div>
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
        <div className="flex flex-col items-center space-y-2">
          <span className="text-xs text-gray-500">{activity.distance}</span>
          <button
            onClick={handleShareClick}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            title="Partager ce MoodUp"
          >
            <Share2 size={16} className="text-gray-500 hover:text-purple-600 transition-colors" />
          </button>
        </div>
      </div>
      
      {activity.description && (
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{activity.description}</p>
      )}
      
      <div className="flex items-center justify-between mb-3">
        <div className="flex flex-wrap gap-1">
          {activity.isMystery ? (
            <span className="inline-flex items-center bg-purple-100 text-purple-700 px-3 py-2 rounded-full text-sm font-medium">
              🎲 Surprise totale
            </span>
          ) : (
            activity.moods.slice(0, 3).map((mood, i) => (
              <span key={i} className="inline-flex items-center bg-purple-50 text-purple-700 px-2 py-1 rounded-full text-xs font-medium">
                {mood.emoji} {mood.label}
              </span>
            ))
          )}
        </div>
      </div>
      
      {/* Footer avec organisateur à gauche et bouton à droite */}
      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onUserProfileSelect && onUserProfileSelect(activity.creator);
          }}
          className="flex items-center space-x-2 p-1 rounded-lg transition-colors"
        >
          <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-500 rounded-full flex items-center justify-center hover:shadow-lg transition-all duration-300 hover:scale-110">
            <span className="text-white text-xs font-bold">{activity.creator[0]}</span>
          </div>
          <div className="text-left">
            <p className="text-xs text-gray-500">Organisé par</p>
            <p className="text-sm font-medium text-gray-800">{getOrganizerFullName(activity.creator)}</p>
          </div>
        </button>
        
        <button 
          onClick={handleButtonClick}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 ${getButtonStyle()}`}
        >
          {getButtonIcon()}
          {getButtonText()}
        </button>
      </div>
    </div>
  );
};

export default ActivityCard;