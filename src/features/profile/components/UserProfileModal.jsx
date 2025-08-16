// features/profile/components/UserProfileModal.jsx
import React from 'react';
import Modal from '../../../components/ui/Modal';
import Avatar from '../../../components/ui/Avatar';
import Badge from '../../../components/ui/Badge';
import Button from '../../../components/ui/Button';

const UserProfileModal = ({ isOpen, user, onClose }) => {
  if (!user) return null;

  // Données simulées selon l'utilisateur
  const userData = {
    name: user.name || 'Utilisateur',
    username: `@${user.username || 'username'}`,
    location: 'Le Havre, France',
    aura: 15,
    createdActivities: 8,
    participations: 23,
    rating: 4.3,
    favoritesMoods: [
      { emoji: '🚀', label: 'Motivant' },
      { emoji: '💭', label: 'Réflexif' },
      { emoji: '🎯', label: 'Productif' }
    ]
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Profil utilisateur">
      <div className="p-6">
        {/* Info utilisateur */}
        <div className="text-center mb-6">
          <Avatar name={userData.name} size="xl" className="mx-auto mb-4" />
          <h3 className="font-bold text-gray-900 text-lg">{userData.name}</h3>
          <p className="text-gray-600">{userData.username}</p>
          <p className="text-sm text-gray-500">{userData.location}</p>
          <div className="flex items-center justify-center mt-2">
            <span className="text-lg mr-1">⭐</span>
            <span className="font-semibold">{userData.aura} Aura</span>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 text-center mb-6">
          <div>
            <p className="font-bold text-lg text-purple-600">{userData.createdActivities}</p>
            <p className="text-xs text-gray-500">MoodUps créés</p>
          </div>
          <div>
            <p className="font-bold text-lg text-purple-600">{userData.participations}</p>
            <p className="text-xs text-gray-500">Participations</p>
          </div>
        </div>

        {/* Moods favoris */}
        <div className="mb-6">
          <h4 className="font-semibold text-gray-900 mb-3">Moods favoris</h4>
          <div className="flex flex-wrap gap-2">
            {userData.favoritesMoods.map((mood, i) => (
              <Badge key={i} variant="primary">
                {mood.emoji} {mood.label}
              </Badge>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <Button variant="primary" className="w-full">
            Envoyer un message
          </Button>
          <Button variant="secondary" onClick={onClose} className="w-full">
            Fermer
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default UserProfileModal;