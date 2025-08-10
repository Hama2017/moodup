// components/UserProfileModal.jsx - Modal pour voir le profil d'un autre utilisateur
import React from 'react';
import { X, MapPin, Star, Laugh } from 'lucide-react';

const UserProfileModal = ({ user, onClose }) => {
  // Données simulées selon l'utilisateur
  const getUserData = (userName) => {
    const profiles = {
      'Marie': {
        name: 'Marie Dupont',
        username: '@marie.dupont',
        location: 'Le Havre, France',
        nationality: { flag: '🇫🇷', name: 'Française' },
        avatar: 'M',
        gradient: 'from-purple-600 to-pink-500',
        createdMoodUps: 12,
        participations: 34,
        globalScore: 4.7, // Score global sur 5
        favoritesMoods: [
          { emoji: '😌', label: 'Chill' },
          { emoji: '💭', label: 'Réflexif' },
          { emoji: '🤝', label: 'Connectant' },
          { emoji: '🎨', label: 'Créatif' }
        ],
        achievements: [
          { emoji: '🏆', label: 'Premier MoodUp', description: 'Créé son premier MoodUp' },
          { emoji: '🤝', label: 'Social Butterfly', description: 'Participé à 10+ MoodUps' },
          { emoji: '⭐', label: 'Top Organisateur', description: 'Note moyenne de 4.5+' }
        ]
      },
      'Jules': {
        name: 'Jules Moreau',
        username: '@jules.moreau',
        location: 'Le Havre, France',
        nationality: { flag: '🇫🇷', name: 'Français' },
        avatar: 'J',
        gradient: 'from-blue-500 to-cyan-500',
        createdMoodUps: 8,
        participations: 23,
        globalScore: 4.3,
        favoritesMoods: [
          { emoji: '🚀', label: 'Motivant' },
          { emoji: '💭', label: 'Réflexif' },
          { emoji: '🎯', label: 'Productif' }
        ],
        achievements: [
          { emoji: '🚀', label: 'Innovateur', description: 'Créé des MoodUps originaux' },
          { emoji: '🤝', label: 'Connecteur', description: 'Excellent participant' }
        ]
      },
      'Alex': {
        name: 'Alex Dubois',
        username: '@alex.dubois',
        location: 'Le Havre, France',
        nationality: { flag: '🇧🇪', name: 'Belge' },
        avatar: 'A',
        gradient: 'from-green-500 to-emerald-500',
        createdMoodUps: 15,
        participations: 19,
        globalScore: 4.9,
        favoritesMoods: [
          { emoji: '🎨', label: 'Créatif' },
          { emoji: '🌱', label: 'Ressourçant' },
          { emoji: '😌', label: 'Chill' }
        ],
        achievements: [
          { emoji: '🎨', label: 'Artiste', description: 'Organisateur créatif' },
          { emoji: '🌟', label: 'Inspirant', description: 'Crée des expériences mémorables' }
        ]
      }
    };

    return profiles[userName] || profiles['Jules']; // Fallback
  };

  const profile = getUserData(user);

  // Fonction pour générer les étoiles
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={i} size={14} className="fill-yellow-400 text-yellow-400" />);
    }

    if (hasHalfStar) {
      stars.push(
        <div key="half" className="relative">
          <Star size={14} className="text-gray-300" />
          <div className="absolute inset-0 overflow-hidden w-1/2">
            <Star size={14} className="fill-yellow-400 text-yellow-400" />
          </div>
        </div>
      );
    }

    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<Star key={`empty-${i}`} size={14} className="text-gray-300" />);
    }

    return stars;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end justify-center z-50">
      <div className="bg-white rounded-t-3xl w-full max-w-md animate-slide-up max-h-[90vh] overflow-hidden flex flex-col">
        <div className="p-6 border-b border-gray-100">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-900">Profil utilisateur</h2>
            <button 
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
            >
              <X size={16} className="text-gray-500" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {/* Informations utilisateur - Exact comme ProfilePage */}
          <div className="bg-white rounded-2xl p-6 mb-6 shadow-sm">
            <div className="flex items-center mb-4">
              <div className={`w-16 h-16 bg-gradient-to-r ${profile.gradient} rounded-full flex items-center justify-center mr-4`}>
                <span className="text-white text-xl font-bold">{profile.avatar}</span>
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-900 text-lg">{profile.name}</h3>
                <div className="flex items-center justify-between">
                  <p className="text-gray-600">{profile.username}</p>
                  <div className="text-right">
                    <div className="flex items-center space-x-1">
                      <Laugh size={16} className="text-yellow-500" />
                      <span className="font-semibold text-gray-800">10</span>
                    </div>
                    <p className="text-xs text-gray-500">Aura</p>
                  </div>
                </div>
                <div className="flex items-center text-gray-500 text-sm">
                  <MapPin size={12} className="mr-1" />
                  <span>{profile.location}</span>
                </div>
                <div className="flex items-center mt-2">
                  <span className="text-lg mr-2">{profile.nationality.flag}</span>
                  <span className="text-sm text-gray-600 font-medium">{profile.nationality.name}</span>
                </div>
              </div>
            </div>
            
            {/* Description avec emojis - En bas, pleine largeur */}
            <div className="mt-4">
              <p className="text-2xl text-center">
                {profile.name === 'Marie Dupont' && '🎨 💭 🌱 🤝 ☕'}
                {profile.name === 'Jules Moreau' && '🚀 💡 📱 🎯 🌟'}
                {profile.name === 'Alex Dubois' && '🎨 📸 🌿 😌 🎵'}
              </p>
            </div>
            
            {/* Score organisateur */}
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
              <span className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded-full font-medium">Score organisateur</span>
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-1">
                  {renderStars(profile.globalScore)}
                </div>
                <span className="font-bold text-lg text-gray-800">{profile.globalScore}</span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-center mt-4">
              <div>
                <p className="font-bold text-lg text-purple-600">{profile.createdMoodUps}</p>
                <p className="text-xs text-gray-500">MoodUps créés</p>
              </div>
              <div>
                <p className="font-bold text-lg text-purple-600">{profile.participations}</p>
                <p className="text-xs text-gray-500">Participations</p>
              </div>
            </div>
          </div>

          {/* Moods favoris - Section séparée comme ProfilePage */}
          <div className="bg-white rounded-2xl p-6 mb-6 shadow-sm">
            <h4 className="font-semibold text-gray-900 mb-3">Moods favoris</h4>
            <div className="flex flex-wrap gap-2">
              {profile.favoritesMoods.map((mood, i) => (
                <span key={i} className="inline-flex items-center bg-purple-100 text-purple-800 px-3 py-2 rounded-full text-sm font-medium">
                  {mood.emoji} {mood.label}
                </span>
              ))}
            </div>
          </div>

          {/* Achievements - Section séparée comme ProfilePage */}
          <div className="bg-white rounded-2xl p-6 mb-6 shadow-sm">
            <h4 className="font-semibold text-gray-900 mb-3">Achievements</h4>
            <div className="space-y-3">
              {profile.achievements.map((achievement, i) => (
                <div key={i} className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                    <span className="text-lg">{achievement.emoji}</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{achievement.label}</p>
                    <p className="text-sm text-gray-500">{achievement.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Activité récente */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h4 className="font-semibold text-gray-900 mb-3">Activité récente</h4>
            <div className="text-center text-gray-500">
              <p className="text-sm">Dernière connexion il y a 2 jours</p>
              <p className="text-xs mt-1">Membre depuis Mars 2024</p>
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-gray-100">
          <button
            onClick={onClose}
            className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-2xl font-semibold"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfileModal;