// hooks/useActivities.js - Version CORRIGÉE (cycle infini résolu)
import { useState, useEffect, useCallback, useMemo } from 'react';
import { activitiesService } from '../services/activitiesService';

export const useActivities = (options = {}) => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 🔧 FIX: Mémoriser les options pour éviter le cycle infini
  const memoizedOptions = useMemo(() => ({
    search: options.search || '',
    excludeUserActivities: options.excludeUserActivities || false,
    quickFilter: options.quickFilter || '',
    selectedMoods: options.selectedMoods || [],
    date: options.date || '',
    location: options.location || '',
    userId: options.userId || null
  }), [
    options.search,
    options.excludeUserActivities,
    options.quickFilter,
    JSON.stringify(options.selectedMoods), // Stringify pour comparaison array
    options.date,
    options.location,
    options.userId
  ]);

  const fetchActivities = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Construire les filtres
      const filters = {
        search: memoizedOptions.search,
        quickFilter: memoizedOptions.quickFilter,
        selectedMoods: memoizedOptions.selectedMoods,
        date: memoizedOptions.date,
        location: memoizedOptions.location
      };

      let data = await activitiesService.getAll(filters);
      
      // Exclure les activités de l'utilisateur si demandé
      if (memoizedOptions.excludeUserActivities && memoizedOptions.userId) {
        data = data.filter(activity => activity.creator?.id !== memoizedOptions.userId);
      }

      setActivities(data);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching activities:', err);
    } finally {
      setLoading(false);
    }
  }, [memoizedOptions]); // 🔧 FIX: Dépendre seulement des options mémorisées

  useEffect(() => {
    fetchActivities();
  }, [fetchActivities]);

  const createActivity = useCallback(async (activityData) => {
    try {
      setLoading(true);
      const newActivity = await activitiesService.create(activityData);
      setActivities(prev => [newActivity, ...prev]);
      return newActivity;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateActivity = useCallback(async (id, updates) => {
    try {
      const updatedActivity = await activitiesService.update(id, updates);
      setActivities(prev => 
        prev.map(activity => 
          activity.id === id ? updatedActivity : activity
        )
      );
      return updatedActivity;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, []);

  const deleteActivity = useCallback(async (id) => {
    try {
      await activitiesService.delete(id);
      setActivities(prev => prev.filter(activity => activity.id !== id));
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, []);

  const joinActivity = useCallback(async (activityId, userId) => {
    try {
      const updatedActivity = await activitiesService.joinActivity(activityId, userId);
      setActivities(prev => 
        prev.map(activity => 
          activity.id === activityId ? updatedActivity : activity
        )
      );
      return updatedActivity;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, []);

  return {
    activities,
    loading,
    error,
    createActivity,
    updateActivity,
    deleteActivity,
    joinActivity,
    refetch: fetchActivities
  };
};