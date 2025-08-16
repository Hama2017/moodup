
// services/activitiesService.js - Version corrigée avec filtres avancés
class ActivitiesService {
  constructor() {
    this.activities = this.getStoredActivities();
    this.initializeDefaultActivities();
  }

  getStoredActivities() {
    try {
      const stored = localStorage.getItem('moodup_activities');
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Error reading activities from storage:', error);
      return [];
    }
  }

  saveActivities() {
    try {
      localStorage.setItem('moodup_activities', JSON.stringify(this.activities));
    } catch (error) {
      console.error('Error saving activities to storage:', error);
    }
  }

  initializeDefaultActivities() {
    if (this.activities.length === 0) {
      this.activities = [
        {
          id: '1',
          title: "Café & discussion startup",
          location: "Café Central, Place Gambetta",
          date: "2024-03-20",
          time: "14:30",
          maxParticipants: 5,
          currentParticipants: 2,
          description: "Discussion autour des innovations tech, ambiance détendue et inspirante",
          moods: [
            { emoji: '💭', label: 'Réflexif' },
            { emoji: '🚀', label: 'Motivant' },
            { emoji: '🤝', label: 'Connectant' }
          ],
          creator: {
            id: '2',
            name: 'Jules Moreau',
            username: 'jules.moreau'
          },
          coordinates: { lat: 49.4944, lng: 0.1079 },
          distance: 200,
          createdAt: new Date().toISOString(),
          status: 'active'
        },
        {
          id: '2',
          title: "Session créative dessin",
          location: "Parc Sainte-Marie",
          date: "2024-03-21",
          time: "10:00",
          maxParticipants: 8,
          currentParticipants: 3,
          description: "Sketching en plein air, tous niveaux bienvenus !",
          moods: [
            { emoji: '🎨', label: 'Créatif' },
            { emoji: '🌱', label: 'Ressourçant' },
            { emoji: '😌', label: 'Chill' }
          ],
          creator: {
            id: '3',
            name: 'Alex Dubois',
            username: 'alex.dubois'
          },
          coordinates: { lat: 49.4954, lng: 0.1089 },
          distance: 500,
          createdAt: new Date().toISOString(),
          status: 'active'
        },
        {
          id: '3',
          title: "Yoga matinal",
          location: "Plage du Havre",
          date: "2024-03-22",
          time: "07:30",
          maxParticipants: 10,
          currentParticipants: 5,
          description: "Salutation au soleil face à la mer, moment zen garanti",
          moods: [
            { emoji: '🧘‍♂️', label: 'Zen' },
            { emoji: '🌱', label: 'Ressourçant' },
            { emoji: '😌', label: 'Chill' }
          ],
          creator: {
            id: '4',
            name: 'Léa Martin',
            username: 'lea.martin'
          },
          coordinates: { lat: 49.4934, lng: 0.1069 },
          distance: 1200,
          createdAt: new Date().toISOString(),
          status: 'active'
        }
      ];
      this.saveActivities();
    }
  }

  async getAll(filters = {}) {
    // Simulation d'un appel API
    await new Promise(resolve => setTimeout(resolve, 300));
    
    let filtered = [...this.activities];
    
    // Filtre par recherche textuelle
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(activity => 
        activity.title.toLowerCase().includes(searchLower) ||
        activity.location.toLowerCase().includes(searchLower) ||
        (activity.description && activity.description.toLowerCase().includes(searchLower)) ||
        activity.moods.some(mood => mood.label.toLowerCase().includes(searchLower))
      );
    }
    
    // Filtre rapide
    if (filters.quickFilter) {
      const today = new Date().toISOString().split('T')[0];
      
      switch (filters.quickFilter) {
        case 'today':
          filtered = filtered.filter(activity => activity.date === today);
          break;
        case 'mystery':
          filtered = filtered.filter(activity => activity.isMystery);
          break;
        case 'cafe':
          filtered = filtered.filter(activity => 
            activity.title.toLowerCase().includes('café') ||
            activity.location.toLowerCase().includes('café')
          );
          break;
        case 'sport':
          filtered = filtered.filter(activity => 
            activity.title.toLowerCase().includes('sport') ||
            activity.title.toLowerCase().includes('yoga') ||
            activity.moods.some(mood => ['🏃‍♀️', '⚽', '🧘‍♂️'].includes(mood.emoji))
          );
          break;
        case 'creative':
          filtered = filtered.filter(activity => 
            activity.title.toLowerCase().includes('créativ') ||
            activity.title.toLowerCase().includes('dessin') ||
            activity.moods.some(mood => mood.label === 'Créatif')
          );
          break;
        case 'social':
          filtered = filtered.filter(activity => 
            activity.title.toLowerCase().includes('discussion') ||
            activity.moods.some(mood => mood.label === 'Connectant')
          );
          break;
        case 'morning':
          filtered = filtered.filter(activity => {
            const hour = parseInt(activity.time.split(':')[0]);
            return hour < 12;
          });
          break;
        case 'evening':
          filtered = filtered.filter(activity => {
            const hour = parseInt(activity.time.split(':')[0]);
            return hour >= 18;
          });
          break;
      }
    }
    
    // Filtre par moods sélectionnés
    if (filters.selectedMoods && filters.selectedMoods.length > 0) {
      filtered = filtered.filter(activity =>
        filters.selectedMoods.some(selectedMood =>
          activity.moods.some(activityMood => activityMood.emoji === selectedMood.emoji)
        )
      );
    }
    
    // Filtre par lieu
    if (filters.location) {
      filtered = filtered.filter(activity =>
        activity.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }
    
    // Filtre par date
    if (filters.date) {
      if (filters.date === 'today') {
        const today = new Date().toISOString().split('T')[0];
        filtered = filtered.filter(activity => activity.date === today);
      } else if (filters.date === 'tomorrow') {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        const tomorrowStr = tomorrow.toISOString().split('T')[0];
        filtered = filtered.filter(activity => activity.date === tomorrowStr);
      } else {
        filtered = filtered.filter(activity => activity.date === filters.date);
      }
    }
    
    return filtered;
  }

  async getById(id) {
    await new Promise(resolve => setTimeout(resolve, 200));
    return this.activities.find(activity => activity.id === id);
  }

  async create(activityData) {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const newActivity = {
      id: Date.now().toString(),
      ...activityData,
      currentParticipants: 1,
      distance: Math.floor(Math.random() * 2000) + 100, // Distance aléatoire en mètres
      coordinates: {
        lat: 49.4944 + (Math.random() - 0.5) * 0.01,
        lng: 0.1079 + (Math.random() - 0.5) * 0.01
      },
      createdAt: new Date().toISOString(),
      status: 'active'
    };
    
    this.activities.unshift(newActivity); // Ajouter au début
    this.saveActivities();
    
    return newActivity;
  }

  async update(id, updates) {
    await new Promise(resolve => setTimeout(resolve, 600));
    
    const index = this.activities.findIndex(activity => activity.id === id);
    if (index === -1) {
      throw new Error('Activité non trouvée');
    }
    
    this.activities[index] = { 
      ...this.activities[index], 
      ...updates,
      updatedAt: new Date().toISOString()
    };
    this.saveActivities();
    
    return this.activities[index];
  }

  async delete(id) {
    await new Promise(resolve => setTimeout(resolve, 400));
    
    const index = this.activities.findIndex(activity => activity.id === id);
    if (index === -1) {
      throw new Error('Activité non trouvée');
    }
    
    this.activities.splice(index, 1);
    this.saveActivities();
    
    return { success: true };
  }

  async joinActivity(activityId, userId) {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const activity = this.activities.find(a => a.id === activityId);
    if (!activity) {
      throw new Error('Activité non trouvée');
    }
    
    if (activity.currentParticipants >= activity.maxParticipants) {
      throw new Error('Activité complète');
    }
    
    activity.currentParticipants += 1;
    this.saveActivities();
    
    return activity;
  }
}

export const activitiesService = new ActivitiesService();
