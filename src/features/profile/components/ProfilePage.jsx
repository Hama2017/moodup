

// features/profile/components/ProfilePage.jsx
import React from 'react';
import { User, Users, Settings, Laugh } from 'lucide-react';
import { useAuth } from '../../../hooks/useAuth';
import Card from '../../../components/ui/Card';
import Badge from '../../../components/ui/Badge';
import Button from '../../../components/ui/Button';
import Avatar from '../../../components/ui/Avatar';

const ProfilePage = () => {
  const { user, logout } = useAuth();

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

  const handleAction = (action) => {
    console.log(`Action: ${action}`);
    if (action === 'edit') {
      // Naviguer vers édition profil
    } else if (action === 'settings') {
      // Naviguer vers paramètres
    } else if (action === 'invite') {
      // Ouvrir modal d'invitation
    }
  };

  return (
    <div className="flex-1">
      {/* Header */}
      <div className="bg-white px-6 py-4 shadow-md">
        <h2 className="text-xl font-bold text-gray-800 text-center">Mon Profil</h2>
      </div>

      <div className="p-4">
        {/* Informations utilisateur */}
        <Card className="mb-6">
          <div className="flex items-center mb-4">
            <Avatar 
              name={user?.name}
              size="xl"
              className="mr-4"
            />
            <div className="flex-1">
              <h3 className="font-bold text-gray-900 text-lg">{user?.name || 'Utilisateur'}</h3>
              <div className="flex items-center justify-between">
                <p className="text-gray-600">@{user?.username || 'username'}</p>
                <div className="text-right">
                  <div className="flex items-center space-x-1">
                    <Laugh size={16} className="text-yellow-500" />
                    <span className="font-semibold text-gray-800">10</span>
                  </div>
                  <p className="text-xs text-gray-500">Aura</p>
                </div>
              </div>
              <p className="text-sm text-gray-500">{user?.location || 'Le Havre, France'}</p>
            </div>
          </div>
          
          {/* Description avec emojis */}
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
        </Card>

        {/* Moods favoris */}
        <Card className="mb-6">
          <h4 className="font-semibold text-gray-900 mb-3">Mes moods favoris</h4>
          <div className="flex flex-wrap gap-2">
            {favoritesMoods.map((mood, i) => (
              <Badge key={i} variant="primary">
                {mood.emoji} {mood.label}
              </Badge>
            ))}
          </div>
        </Card>

        {/* Achievements */}
        <Card className="mb-6">
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
        </Card>

        {/* Options du profil */}
        <div className="space-y-3">
          {profileOptions.map((item, i) => (
            <Button
              key={i}
              variant="ghost"
              onClick={() => handleAction(item.action)}
              className="w-full justify-between bg-white shadow-sm hover:shadow-md"
            >
              <div className="flex items-center">
                <item.icon size={20} className={`mr-3 ${item.color}`} />
                <span className="font-medium text-gray-900">{item.label}</span>
              </div>
              <span className="text-gray-400">›</span>
            </Button>
          ))}
        </div>

        {/* Bouton de déconnexion */}
        <div className="mt-8 pt-6 border-t border-gray-100">
          <Button
            variant="ghost"
            onClick={logout}
            className="w-full text-red-600 hover:bg-red-50"
          >
            Se déconnecter
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;