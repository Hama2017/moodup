// features/activities/components/ActivityDetailModal.jsx
import React from 'react';
import { MapPin, Clock, Users, X } from 'lucide-react';
import Modal from '../../../components/ui/Modal';
import Button from '../../../components/ui/Button';
import Badge from '../../../components/ui/Badge';
import Avatar from '../../../components/ui/Avatar';
import { formatDate, formatTime } from '../../../utils/formatters';

const ActivityDetailModal = ({ 
  isOpen, 
  activity, 
  onClose, 
  onUserSelect 
}) => {
  if (!activity) return null;

  const handleJoin = () => {
    console.log('Rejoindre activité:', activity.id);
    // Implémenter la logique de participation
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <div className="p-6">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">{activity.title}</h1>
          <button
            onClick={() => onUserSelect?.(activity.creator)}
            className="flex items-center justify-center space-x-2 mx-auto hover:bg-gray-50 p-2 rounded-lg transition-colors"
          >
            <Avatar name={activity.creator?.name} size="sm" />
            <div>
              <p className="text-sm font-medium text-gray-900">
                Organisé par {activity.creator?.name}
              </p>
            </div>
          </button>
        </div>

        {/* Informations */}
        <div className="bg-gray-50 rounded-2xl p-4 space-y-3 mb-6">
          <div className="flex items-center">
            <MapPin size={18} className="text-purple-600 mr-3" />
            <div>
              <p className="font-medium text-gray-900">{activity.location}</p>
              <p className="text-sm text-gray-500">Lieu de rendez-vous</p>
            </div>
          </div>
          
          <div className="flex items-center">
            <Clock size={18} className="text-purple-600 mr-3" />
            <div>
              <p className="font-medium text-gray-900">
                {formatDate(activity.date)} à {formatTime(activity.time)}
              </p>
              <p className="text-sm text-gray-500">Date et heure</p>
            </div>
          </div>
          
          <div className="flex items-center">
            <Users size={18} className="text-purple-600 mr-3" />
            <div>
              <p className="font-medium text-gray-900">
                {activity.currentParticipants}/{activity.maxParticipants} participants
              </p>
              <p className="text-sm text-gray-500">Places disponibles</p>
            </div>
          </div>
        </div>

        {/* Description */}
        {activity.description && (
          <div className="mb-6">
            <h3 className="font-semibold text-gray-900 mb-2">Description</h3>
            <p className="text-gray-700 leading-relaxed">{activity.description}</p>
          </div>
        )}

        {/* Ambiance */}
        <div className="mb-6">
          <h3 className="font-semibold text-gray-900 mb-3">Ambiance du MoodUp</h3>
          <div className="flex flex-wrap gap-2">
            {activity.moods?.map((mood, i) => (
              <Badge key={i} variant="primary">
                {mood.emoji} {mood.label}
              </Badge>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <Button variant="secondary" onClick={onClose} className="flex-1">
            Fermer
          </Button>
          <Button variant="primary" onClick={handleJoin} className="flex-1">
            Rejoindre ce MoodUp
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ActivityDetailModal;