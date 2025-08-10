// data/activities.js - Données d'exemple pour les activités
export const activities = [
  {
    id: 1,
    title: "Café & discussion startup",
    location: "Café Central, Place Gambetta",
    date: "Aujourd'hui",
    time: "14:30",
    participants: "2/5",
    description: "Discussion autour des innovations tech, ambiance détendue et inspirante",
    moods: [
      { emoji: '💭', label: 'Réflexif' },
      { emoji: '🚀', label: 'Motivant' },
      { emoji: '🤝', label: 'Connectant' }
    ],
    distance: "0.2 km",
    creator: "Marie",
    acceptedParticipants: 2,
    isCompleted: false
  },
  {
    id: 2,
    title: "Session créative dessin",
    location: "Parc Sainte-Marie",
    date: "Hier", // Événement passé
    time: "10:00",
    participants: "3/8",
    description: "Sketching en plein air, tous niveaux bienvenus !",
    moods: [
      { emoji: '🎨', label: 'Créatif' },
      { emoji: '🌱', label: 'Ressourçant' },
      { emoji: '😌', label: 'Chill' }
    ],
    distance: "0.5 km",
    creator: "Marie", // Mon MoodUp terminé
    acceptedParticipants: 3,
    isCompleted: true
  },
  {
    id: 3,
    title: "Yoga matinal",
    location: "Plage du Havre",
    date: "Demain",
    time: "07:30",
    participants: "5/10",
    description: "Salutation au soleil face à la mer, moment zen garanti",
    moods: [
      { emoji: '🧘‍♂️', label: 'Zen' },
      { emoji: '🌱', label: 'Ressourçant' },
      { emoji: '😌', label: 'Chill' }
    ],
    distance: "1.2 km",
    creator: "Léa",
    acceptedParticipants: 5,
    isCompleted: false
  },
  {
    id: 4,
    title: "Mystère",
    location: "Rendez-vous Place Gambetta",
    date: "Demain",
    time: "15:00",
    participants: "1/6",
    description: "MoodUp mystère à découvrir une fois sur place",
    moods: [], // Pas de moods pour le mystère
    distance: "0.3 km",
    creator: "Thomas",
    acceptedParticipants: 1,
    isCompleted: false,
    isMystery: true // Nouveau flag pour identifier les MoodUps mystère
  }
];

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