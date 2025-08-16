// constants/activities.js
export const moods = [
  { emoji: '😌', label: 'Chill' },
  { emoji: '🔥', label: 'Énergique' },
  { emoji: '💭', label: 'Réflexif' },
  { emoji: '😄', label: 'Fun' },
  { emoji: '🌱', label: 'Ressourçant' },
  { emoji: '🎯', label: 'Productif' },
  { emoji: '🤝', label: 'Connectant' },
  { emoji: '🌟', label: 'Inspirant' },
  { emoji: '😊', label: 'Bienveillant' },
  { emoji: '🎨', label: 'Créatif' },
  { emoji: '🧘‍♂️', label: 'Zen' },
  { emoji: '🚀', label: 'Motivant' }
];

export const activityStatus = {
  DRAFT: 'draft',
  ACTIVE: 'active',
  FULL: 'full',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled'
};

export const participationStatus = {
  PENDING: 'pending',
  ACCEPTED: 'accepted',
  REJECTED: 'rejected',
  CANCELLED: 'cancelled'
};

export const quickFilters = [
  { id: 'today', label: 'Aujourd\'hui', icon: 'Calendar' },
  { id: 'mystery', label: 'Mystère', icon: null },
  { id: 'cafe', label: 'Café', icon: null },
  { id: 'sport', label: 'Sport', icon: null },
  { id: 'creative', label: 'Créatif', icon: null },
  { id: 'social', label: 'Social', icon: null },
  { id: 'morning', label: 'Matin', icon: 'Clock' },
  { id: 'evening', label: 'Soir', icon: 'Clock' }
];