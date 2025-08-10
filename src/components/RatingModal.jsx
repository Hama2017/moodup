// components/RatingModal.jsx - Modal de notation après un MoodUp
import React, { useState } from 'react';
import { X, Camera, CheckCircle, Smile, Frown } from 'lucide-react';

const RatingModal = ({ activity, onClose, currentUser = 'Marie' }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [moodUpRating, setMoodUpRating] = useState(null);
  const [participantRatings, setParticipantRatings] = useState({});
  const [showPhotoOption, setShowPhotoOption] = useState(false);

  // Simuler les participants (sans moi)
  const participants = [
    { name: 'Jules', avatar: 'J', gradient: 'from-blue-500 to-cyan-500' },
    { name: 'Alex', avatar: 'A', gradient: 'from-green-500 to-emerald-500' },
    { name: activity.creator, avatar: activity.creator[0], gradient: 'from-purple-600 to-pink-500' }
  ].filter(p => p.name !== currentUser);

  const moodRatings = [
    { id: 0, emoji: '😐', label: 'Nul', color: 'bg-gray-100 text-gray-600' },
    { id: 1, emoji: '😊', label: 'Cool', color: 'bg-orange-100 text-orange-600' },
    { id: 2, emoji: '🤩', label: 'Super cool', color: 'bg-green-100 text-green-600' }
  ];

  const participantRatingOptions = [
    { type: 'up', emoji: '😊', label: 'MoodUp', color: 'bg-green-100 text-green-600' },
    { type: 'down', emoji: '😞', label: 'MoodDown', color: 'bg-red-100 text-red-600' }
  ];

  const handleMoodUpRating = (rating) => {
    setMoodUpRating(rating);
  };

  const handleParticipantRating = (participantName, rating) => {
    setParticipantRatings(prev => ({
      ...prev,
      [participantName]: rating
    }));
  };

  const nextStep = () => {
    if (currentStep === 1 && moodUpRating !== null) {
      setCurrentStep(2);
    } else if (currentStep === 2) {
      setCurrentStep(3);
      setShowPhotoOption(true);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleTakePhoto = () => {
    console.log('Prendre une photo de souvenir');
    alert('📸 Fonctionnalité photo à implémenter !');
    finishRating();
  };

  const handleSkipPhoto = () => {
    finishRating();
  };

  const finishRating = () => {
    console.log('Notation terminée:', {
      activity: activity.id,
      moodUpRating,
      participantRatings
    });
    alert('🎉 MoodUp terminé ! Merci pour votre participation.');
    onClose();
  };

  const canProceedStep1 = moodUpRating !== null;
  const canProceedStep2 = participants.every(p => participantRatings[p.name]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end justify-center z-50">
      <div className="bg-white rounded-t-3xl w-full max-w-md animate-slide-up max-h-[90vh] overflow-hidden flex flex-col">
        <div className="p-6 border-b border-gray-100">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
              Terminer le MoodUp
            </h2>
            <button 
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
            >
              <X size={16} className="text-gray-500" />
            </button>
          </div>
          
          {/* Indicateur d'étapes */}
          <div className="flex items-center space-x-2">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                  step === currentStep 
                    ? 'bg-gradient-to-r from-purple-600 to-pink-500 text-white'
                    : step < currentStep
                    ? 'bg-purple-100 text-purple-600'
                    : 'bg-gray-100 text-gray-400'
                }`}>
                  {step < currentStep ? <CheckCircle size={16} /> : step}
                </div>
                {step < 3 && (
                  <div className={`w-6 h-0.5 mx-1 transition-colors ${
                    step < currentStep ? 'bg-purple-300' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
          
          <div className="mt-3">
            <p className="text-sm text-gray-600">
              {currentStep === 1 && 'Comment était ce MoodUp ?'}
              {currentStep === 2 && 'Notez les participants'}
              {currentStep === 3 && 'Photo souvenir ?'}
            </p>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {/* Étape 1: Noter le MoodUp */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{activity.title}</h3>
                <p className="text-sm text-gray-500 mb-6">Comment s'est passé ce MoodUp ?</p>
              </div>
              
              <div className="space-y-4">
                {moodRatings.map((rating) => (
                  <button
                    key={rating.id}
                    onClick={() => handleMoodUpRating(rating.id)}
                    className={`w-full p-4 rounded-2xl border-2 transition-all ${
                      moodUpRating === rating.id
                        ? 'border-purple-500 bg-purple-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 rounded-full flex items-center justify-center">
                        <span className="text-3xl">{rating.emoji}</span>
                      </div>
                      <div className="text-left">
                        <p className="font-medium text-gray-900">{rating.label}</p>
                        <p className="text-sm text-gray-500">
                          {rating.id === 0 ? 'Pas terrible...' : 
                           rating.id === 1 ? 'Sympa et agréable' : 
                           'Fantastique, j\'ai adoré !'}
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Étape 2: Noter les participants */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Notez les participants</h3>
                <p className="text-sm text-gray-500 mb-6">Comment s'est passée votre interaction ?</p>
              </div>
              
              <div className="space-y-4">
                {participants.map((participant) => (
                  <div key={participant.name} className="bg-gray-50 rounded-2xl p-4">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className={`w-10 h-10 bg-gradient-to-r ${participant.gradient} rounded-full flex items-center justify-center`}>
                        <span className="text-white font-bold">{participant.avatar}</span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{participant.name}</p>
                        <p className="text-sm text-gray-500">
                          {participant.name === activity.creator ? 'Organisateur' : 'Participant'}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex space-x-3">
                      {participantRatingOptions.map((option) => (
                        <button
                          key={option.type}
                          onClick={() => handleParticipantRating(participant.name, option.type)}
                          className={`flex-1 p-3 rounded-xl border-2 transition-all ${
                            participantRatings[participant.name] === option.type
                              ? 'border-purple-500 bg-purple-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <div className="text-center">
                            <div className="w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-2">
                              <span className="text-2xl">{option.emoji}</span>
                            </div>
                            <p className="text-sm font-medium text-gray-900">{option.label}</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Étape 3: Photo souvenir */}
          {currentStep === 3 && (
            <div className="space-y-6 text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-purple-600 to-pink-500 rounded-full flex items-center justify-center mx-auto">
                <Camera size={32} className="text-white" />
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Photo souvenir ?</h3>
                <p className="text-sm text-gray-500">
                  Voulez-vous prendre une photo pour immortaliser ce moment ?
                </p>
              </div>
              
              <div className="space-y-3">
                <button
                  onClick={handleTakePhoto}
                  className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-2xl font-semibold hover:shadow-lg transition-all"
                >
                  📸 Prendre une photo
                </button>
                <button
                  onClick={handleSkipPhoto}
                  className="w-full py-4 bg-gray-100 text-gray-600 rounded-2xl font-medium hover:bg-gray-200 transition-all"
                >
                  Ignorer
                </button>
              </div>
            </div>
          )}
        </div>

        {currentStep < 3 && (
          <div className="p-6 border-t border-gray-100">
            <div className="flex gap-3">
              {currentStep > 1 && (
                <button 
                  onClick={prevStep}
                  className="flex-1 py-3 rounded-2xl font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors"
                >
                  Précédent
                </button>
              )}
              <button 
                onClick={nextStep}
                disabled={
                  (currentStep === 1 && !canProceedStep1) ||
                  (currentStep === 2 && !canProceedStep2)
                }
                className={`flex-1 py-3 rounded-2xl font-semibold transition-all ${
                  ((currentStep === 1 && canProceedStep1) || (currentStep === 2 && canProceedStep2))
                    ? 'bg-gradient-to-r from-purple-600 to-pink-500 text-white hover:shadow-lg'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                {currentStep === 2 ? 'Terminer' : 'Suivant'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RatingModal;