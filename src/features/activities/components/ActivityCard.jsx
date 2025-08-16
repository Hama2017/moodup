
// features/activities/components/ActivityCard.jsx
import React from 'react';
import { MapPin, Clock, Users, Share2 } from 'lucide-react';
import Card from '../../../components/ui/Card';
import Badge from '../../../components/ui/Badge';
import Avatar from '../../../components/ui/Avatar';
import Button from '../../../components/ui/Button';
import { formatDate, formatTime, formatDistance } from '../../../utils/formatters';

const ActivityCard = ({ 
  activity, 
  currentUser,
  onActivitySelect,
  onUserProfileSelect,
  onShare,
  className 
}) => {
  const isMyActivity = activity.creator.id === currentUser?.id;
  const distance = formatDistance(activity.distance || 0);

  const handleShare = (e) => {
    e.stopPropagation();
    onShare?.(activity);
  };

  const handleUserProfile = (e) => {
    e.stopPropagation();
    onUserProfileSelect?.(activity.creator);
  };

  const getActivityStatus = () => {
    if (activity.isMystery) return 'mystery';
    if (isMyActivity) return 'owner';
    if (activity.userParticipationStatus === 'accepted') return 'participating';
    if (activity.userParticipationStatus === 'pending') return 'pending';
    return 'available';
  };

  const getStatusBadge = () => {
    const status = getActivityStatus();
    
    switch (status) {
      case 'mystery':
        return <Badge variant="primary">🎲 Mystère</Badge>;
      case 'owner':
        return <Badge variant="success">Mon MoodUp</Badge>;
      case 'participating':
        return <Badge variant="success">✅ Participante</Badge>;
      case 'pending':
        return <Badge variant="warning">⏳ En attente</Badge>;
      default:
        return null;
    }
  };

  return (
    <Card 
      className={`cursor-pointer hover:shadow-lg transition-all duration-300 ${className}`}
      onClick={() => onActivitySelect?.(activity)}
    >
      <Card.Header>
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="font-bold text-gray-800 text-lg">
                {activity.title}
              </h3>
              {getStatusBadge()}
            </div>
            
            <div className="space-y-1 text-sm text-gray-600">
              <div className="flex items-center">
                <MapPin size={14} className="mr-1" />
                <span>{activity.location}</span>
              </div>
              
              <div className="flex items-center">
                <Clock size={14} className="mr-1" />
                <span>{formatDate(activity.date)} • {formatTime(activity.time)}</span>
                <span className="mx-2">•</span>
                <Users size={14} className="mr-1" />
                <span>{activity.currentParticipants}/{activity.maxParticipants}</span>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col items-center space-y-2">
            <span className="text-xs text-gray-500">{distance}</span>
            <button
              onClick={handleShare}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              title="Partager"
            >
              <Share2 size={16} className="text-gray-500 hover:text-purple-600 transition-colors" />
            </button>
          </div>
        </div>
      </Card.Header>

      <Card.Content>
        {activity.description && (
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
            {activity.description}
          </p>
        )}

        <div className="flex flex-wrap gap-1 mb-3">
          {activity.moods?.map((mood, i) => (
            <Badge key={i} variant="primary" size="sm">
              {mood.emoji} {mood.label}
            </Badge>
          ))}
        </div>
      </Card.Content>

      <Card.Footer>
        <div className="flex items-center justify-between">
          <button
            onClick={handleUserProfile}
            className="flex items-center space-x-2 p-1 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Avatar 
              name={activity.creator.name}
              size="sm"
            />
            <div className="text-left">
              <p className="text-xs text-gray-500">Organisé par</p>
              <p className="text-sm font-medium text-gray-800">
                {activity.creator.name}
              </p>
            </div>
          </button>

          <Button
            variant={isMyActivity ? "secondary" : "primary"}
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onActivitySelect?.(activity);
            }}
          >
            {isMyActivity ? 'Gérer' : 'Rejoindre'}
          </Button>
        </div>
      </Card.Footer>
    </Card>
  );
};

export default ActivityCard;