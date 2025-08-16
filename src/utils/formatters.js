
// utils/formatters.js - Version complète avec toutes les fonctions
export const formatDate = (dateString) => {
  if (!dateString) return '';
  
  const date = new Date(dateString);
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  // Normaliser les dates pour comparer seulement jour/mois/année
  const normalizeDate = (d) => new Date(d.getFullYear(), d.getMonth(), d.getDate());
  
  const normalizedDate = normalizeDate(date);
  const normalizedToday = normalizeDate(today);
  const normalizedTomorrow = normalizeDate(tomorrow);
  const normalizedYesterday = normalizeDate(yesterday);

  if (normalizedDate.getTime() === normalizedToday.getTime()) {
    return "Aujourd'hui";
  }
  if (normalizedDate.getTime() === normalizedTomorrow.getTime()) {
    return "Demain";
  }
  if (normalizedDate.getTime() === normalizedYesterday.getTime()) {
    return "Hier";
  }
  
  // Différence en jours
  const diffTime = normalizedDate.getTime() - normalizedToday.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays > 0 && diffDays <= 7) {
    return `Dans ${diffDays} jour${diffDays > 1 ? 's' : ''}`;
  }
  if (diffDays < 0 && diffDays >= -7) {
    return `Il y a ${Math.abs(diffDays)} jour${Math.abs(diffDays) > 1 ? 's' : ''}`;
  }
  
  return date.toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'short',
    year: date.getFullYear() !== today.getFullYear() ? 'numeric' : undefined
  });
};

export const formatTime = (timeString) => {
  if (!timeString) return '';
  
  try {
    // Si c'est déjà au format HH:MM
    if (timeString.includes(':')) {
      return timeString;
    }
    
    // Sinon, créer une date et formatter
    const date = new Date(`2000-01-01T${timeString}`);
    return date.toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit'
    });
  } catch (error) {
    console.error('Error formatting time:', error);
    return timeString;
  }
};

export const formatDistance = (distanceInMeters) => {
  if (!distanceInMeters && distanceInMeters !== 0) return '';
  
  if (distanceInMeters < 1000) {
    return `${Math.round(distanceInMeters)}m`;
  }
  
  const km = distanceInMeters / 1000;
  if (km < 10) {
    return `${km.toFixed(1)}km`;
  }
  
  return `${Math.round(km)}km`;
};

export const formatParticipants = (current, max) => {
  return `${current}/${max}`;
};

export const formatTimeAgo = (dateString) => {
  if (!dateString) return '';
  
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now - date) / 1000);
  
  if (diffInSeconds < 60) {
    return 'À l\'instant';
  }
  
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `Il y a ${diffInMinutes}min`;
  }
  
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `Il y a ${diffInHours}h`;
  }
  
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) {
    return `Il y a ${diffInDays}j`;
  }
  
  return formatDate(dateString);
};