// pages/ProfilePage.jsx - Page de profil utilisateur
import React from 'react';
import { User, Users, Laugh, Settings } from 'lucide-react';

const ProfilePage = ({ onNavigateToSettings }) => {
  const profileOptions = [
    { icon: User, label: 'Modifier le profil', color: 'text-gray-600', action: 'edit' },
    { icon: Users, label: 'Inviter des amis', color: 'text-purple-600', action: 'invite' },
    { icon: Settings, label: 'Paramètres', color: 'text-gray-600', action: 'settings' }
  ];

  const favoritesMoods = [
    { emoji: '😌', label: 'Chill' },
    { emoji: '💭', label: 'Réflexif' },
    { emoji: '🤝', label: 'Connectant' },
    { emoji: '🎨', label: 'Créatif' }
  ];

  const achievements = [
    { emoji: '🏆', label: 'Premier MoodUp', description: 'Créé ton premier MoodUp' },
    { emoji: '🤝', label: 'Social Butterfly', description: 'Participé à 10 MoodUps' },
    { emoji: '⭐', label: 'Top Organisateur', description: 'Note moyenne de 4.5+' }
  ];

  return (
    <div className="flex-1">
      {/* Header */}
      <div className="bg-white px-6 py-4 shadow-md">
        <h2 className="text-xl font-bold text-gray-800 text-center">Mon Profil</h2>
      </div>

      <div className="p-4">
        {/* Informations utilisateur */}
        <div className="bg-white rounded-2xl p-6 mb-6 shadow-sm">
          <div className="flex items-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-500 rounded-full flex items-center justify-center mr-4">
              <span className="text-white text-xl font-bold">M</span>
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-gray-900 text-lg">Marie Dupont</h3>
              <div className="flex items-center justify-between">
                <p className="text-gray-600">@marie.dupont</p>
                <div className="text-right">
                  <div className="flex items-center space-x-1">
                    <Laugh size={16} className="text-yellow-500" />
                    <span className="font-semibold text-gray-800">10</span>
                  </div>
                  <p className="text-xs text-gray-500">Aura</p>
                </div>
              </div>
              <p className="text-sm text-gray-500">Le Havre, France</p>
              <div className="flex items-center mt-2">
                <span className="text-lg mr-2">🇫🇷</span>
                <span className="text-sm text-gray-600 font-medium">Française</span>
              </div>
            </div>
          </div>
          
          {/* Description avec emojis - En bas, pleine largeur */}
          <div className="mt-4">
            <p className="text-2xl text-center">🎨 💭 🌱 🤝 ☕</p>
          </div>
          
          <div className="grid grid-cols-2 gap-4 text-center mt-4">
            <div>
              <p className="font-bold text-lg text-purple-600">12</p>
              <p className="text-xs text-gray-500">MoodUps créés</p>
            </div>
            <div>
              <p className="font-bold text-lg text-purple-600">34</p>
              <p className="text-xs text-gray-500">Participations</p>
            </div>
          </div>
        </div>

        {/* Moods favoris */}
        <div className="bg-white rounded-2xl p-6 mb-6 shadow-sm">
          <h4 className="font-semibold text-gray-900 mb-3">Mes moods favoris</h4>
          <div className="flex flex-wrap gap-2">
            {favoritesMoods.map((mood, i) => (
              <span key={i} className="inline-flex items-center bg-purple-100 text-purple-800 px-3 py-2 rounded-full text-sm font-medium">
                {mood.emoji} {mood.label}
              </span>
            ))}
          </div>
        </div>

        {/* Achievements */}
        <div className="bg-white rounded-2xl p-6 mb-6 shadow-sm">
          <h4 className="font-semibold text-gray-900 mb-3">Mes achievements</h4>
          <div className="space-y-3">
            {achievements.map((achievement, i) => (
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

        {/* Options du profil */}
        <div className="space-y-3">
          {profileOptions.map((item, i) => (
            <button 
              key={i} 
              onClick={() => {
                console.log(`Action: ${item.action}`);
                if (item.action === 'settings') {
                  onNavigateToSettings?.();
                } else {
                  alert(`Action: ${item.label}`);
                }
              }}
              className="w-full flex items-center justify-between bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition-all"
            >
              <div className="flex items-center">
                <item.icon size={20} className={`mr-3 ${item.color}`} />
                <span className="font-medium text-gray-900">{item.label}</span>
              </div>
              <span className="text-gray-400">›</span>
            </button>
          ))}
        </div>

        {/* Bouton de déconnexion */}
        <div className="mt-8 pt-6 border-t border-gray-100">
          <button className="w-full py-3 text-center text-red-600 font-medium hover:bg-red-50 rounded-2xl transition-colors">
            Se déconnecter
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;