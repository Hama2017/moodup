

// features/activities/components/CreateActivityForm.jsx
import React, { useState } from 'react';
import { MapPin, Users, Calendar, Clock } from 'lucide-react';
import { useForm } from '../../../hooks/useForm';
import { useActivities } from '../../../hooks/useActivities';
import { validateActivityForm } from '../../../utils/validators';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Modal from '../../../components/ui/Modal';
import { moods } from '../../../constants/activities';

const CreateActivityForm = ({ isOpen, onClose, onSuccess }) => {
  const { createActivity, loading } = useActivities();
  const [selectedMoods, setSelectedMoods] = useState([]);
  const [isMystery, setIsMystery] = useState(false);

  const {
    values,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    reset
  } = useForm(
    {
      title: '',
      location: '',
      date: '',
      time: '',
      maxParticipants: '',
      description: ''
    },
    validateActivityForm
  );

  const toggleMood = (mood) => {
    if (selectedMoods.find(m => m.emoji === mood.emoji)) {
      setSelectedMoods(selectedMoods.filter(m => m.emoji !== mood.emoji));
    } else if (selectedMoods.length < 3) {
      setSelectedMoods([...selectedMoods, mood]);
    }
  };

  const onSubmit = async (formData) => {
    try {
      await createActivity({
        ...formData,
        moods: selectedMoods,
        isMystery
      });
      
      reset();
      setSelectedMoods([]);
      setIsMystery(false);
      onSuccess?.();
      onClose();
    } catch (err) {
      // Error is handled by useActivities
    }
  };

  const handleClose = () => {
    reset();
    setSelectedMoods([]);
    setIsMystery(false);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Créer un MoodUp"
      size="lg"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
        {/* Mystery toggle */}
        <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl p-4 border border-purple-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="text-2xl">❓</div>
              <div>
                <h3 className="font-semibold text-purple-800">MoodUp Mystère</h3>
                <p className="text-sm text-purple-600">Surprise totale jusqu'au jour J</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsMystery(!isMystery)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                isMystery ? 'bg-purple-600' : 'bg-gray-300'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  isMystery ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>

        <Input
          name="title"
          label="Titre"
          value={values.title}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.title}
          placeholder="Café & discussion startup"
          disabled={isMystery}
        />

        <Input
          name="location"
          label="Lieu"
          value={values.location}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.location}
          leftIcon={<MapPin size={18} />}
          placeholder="Café Central, Place Gambetta"
        />

        <div className="grid grid-cols-2 gap-4">
          <Input
            name="date"
            type="date"
            label="Date"
            value={values.date}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.date}
            leftIcon={<Calendar size={18} />}
          />

          <Input
            name="time"
            type="time"
            label="Heure"
            value={values.time}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.time}
            leftIcon={<Clock size={18} />}
          />
        </div>

        <Input
          name="maxParticipants"
          type="number"
          label="Participants max"
          value={values.maxParticipants}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.maxParticipants}
          leftIcon={<Users size={18} />}
          placeholder="5"
          min="2"
          max="20"
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description (optionnel)
          </label>
          <textarea
            name="description"
            value={values.description}
            onChange={handleChange}
            onBlur={handleBlur}
            className="w-full p-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
            rows={3}
            placeholder="Décris l'ambiance que tu recherches..."
          />
        </div>

        {!isMystery && (
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="text-sm font-medium text-gray-700">
                Ambiances ({selectedMoods.length}/3)
              </label>
            </div>
            
            <div className="grid grid-cols-3 gap-2">
              {moods.map((mood, i) => {
                const isSelected = selectedMoods.find(m => m.emoji === mood.emoji);
                const isDisabled = selectedMoods.length >= 3 && !isSelected;
                
                return (
                  <button
                    key={i}
                    type="button"
                    onClick={() => !isDisabled && toggleMood(mood)}
                    disabled={isDisabled}
                    className={`p-3 rounded-xl transition-all duration-200 flex flex-col items-center justify-center min-h-[60px] border ${
                      isSelected
                        ? 'border-purple-500 bg-purple-50 shadow-sm'
                        : isDisabled
                        ? 'border-gray-100 bg-gray-50 opacity-40 cursor-not-allowed'
                        : 'border-gray-100 bg-gray-50 hover:border-gray-200 hover:bg-gray-100'
                    }`}
                  >
                    <span className="text-lg mb-1">{mood.emoji}</span>
                    <span className="text-xs text-gray-600 font-medium text-center">
                      {mood.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        <div className="flex gap-3 pt-4">
          <Button
            type="button"
            variant="secondary"
            onClick={handleClose}
            className="flex-1"
          >
            Annuler
          </Button>
          <Button
            type="submit"
            variant="primary"
            loading={loading}
            className="flex-1"
          >
            Créer mon MoodUp
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default CreateActivityForm;