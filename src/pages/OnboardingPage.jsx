// pages/OnboardingPage.jsx - Guide de bienvenue en 3 étapes
import React, { useState } from 'react';
import { ChevronRight, ChevronLeft, Users, MapPin, Sparkles, Laugh, Heart, Coffee } from 'lucide-react';

const OnboardingPage = ({ userName = "Marie", onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      id: 1,
      title: "Bienvenue sur MoodUp !",
      subtitle: `Salut <span class="bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">${userName}</span> ! 👋`,
      content: "Découvre une nouvelle façon de créer des connexions authentiques autour de toi. MoodUp te permet d'organiser et rejoindre des activités basées sur ton mood du moment.",
      icon: Heart,
      iconBg: "from-pink-500 to-red-500",
      visual: "🎉✨🌟",
      highlight: "+10 Aura",
      highlightText: "Les points Aura représentent ta réputation dans la communauté et te permettent de débloquer des avantages exclusifs !",
      highlightIcon: Laugh,
      highlightColor: "from-yellow-400 to-orange-500"
    },
    {
      id: 2,
      title: "Crée ton premier MoodUp",
      subtitle: "Organise des rencontres qui te ressemblent",
      content: "Que tu aies envie d'un café créatif, d'une discussion startup ou d'une balade zen, crée ton MoodUp et laisse les bonnes vibes attirer les bonnes personnes. Tu peux créer n'importe quel type d'activité, ça dépend de ta créativité !",
      icon: Coffee,
      iconBg: "from-purple-600 to-pink-500",
      visual: "☕🎨💡",
      examples: [
        { emoji: "☕", text: "Café" },
        { emoji: "🎨", text: "Ateliers créatifs" },
        { emoji: "🌱", text: "Balades nature" },
        { emoji: "💡", text: "Discussion" }
      ]
    },
    {
      id: 3,
      title: "Rejoins un MoodUp",
      subtitle: "Boost ton mood avec des personnes de même vibes",
      content: "Explore les MoodUps autour de toi, participe à ceux qui t'inspirent et construis ton réseau social local. Chaque rencontre est une nouvelle opportunité !",
      icon: MapPin,
      iconBg: "from-purple-600 to-pink-500",
      visual: "🌍🤝😊",
      features: [
        "Découvre les activités près de chez toi",
        "Connecte-toi avec des personnes partageant tes intérêts",
        "Gagne de l'Aura en participant et organisant"
      ]
    }
  ];

  const currentStepData = steps[currentStep];

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete?.();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const skipOnboarding = () => {
    onComplete?.();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        
        {/* Header avec indicateurs de progression */}
        <div className="text-center mb-8">
          <div className="flex justify-center space-x-2 mb-6">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index <= currentStep 
                    ? 'bg-gradient-to-r from-purple-600 to-pink-500 w-8' 
                    : 'bg-gray-200 w-6'
                }`}
              />
            ))}
          </div>
          
          <button
            onClick={skipOnboarding}
            className="text-gray-500 hover:text-gray-700 text-sm font-medium"
          >
            Passer l'introduction
          </button>
        </div>

        {/* Contenu principal */}
        <div className="bg-white rounded-3xl shadow-xl p-8 relative overflow-hidden">
          
          {/* Pattern de fond décoratif */}
          <div className="absolute top-0 right-0 w-32 h-32 opacity-5">
            <div className="w-full h-full bg-gradient-to-br from-purple-600 to-pink-500 rounded-full transform rotate-12"></div>
          </div>

          {/* Icône principale */}
          <div className="text-center mb-6">
            <div className={`w-20 h-20 bg-gradient-to-r ${currentStepData.iconBg} rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg transform hover:scale-105 transition-transform`}>
              <currentStepData.icon size={36} className="text-white" />
            </div>
            
            {/* Visual emojis */}
            <div className="text-3xl mb-4 animate-pulse">
              {currentStepData.visual}
            </div>
          </div>

          {/* Contenu de l'étape */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              {currentStepData.title}
            </h1>
            <h2 
              className="text-lg font-semibold mb-4"
              dangerouslySetInnerHTML={{ 
                __html: currentStep === 0 
                  ? currentStepData.subtitle 
                  : `<span class="bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">${currentStepData.subtitle}</span>`
              }}
            />
            <p className="text-gray-600 leading-relaxed">
              {currentStepData.content}
            </p>
          </div>

          {/* Contenu spécifique par étape */}
          {currentStep === 0 && currentStepData.highlight && (
            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-6 mb-6 border border-yellow-200">
              <div className="flex items-center justify-center mb-3">
                <div className={`w-12 h-12 bg-gradient-to-r ${currentStepData.highlightColor} rounded-full flex items-center justify-center mr-3`}>
                  <currentStepData.highlightIcon size={24} className="text-white" />
                </div>
                <div>
                  <span className="text-2xl font-bold text-yellow-600">{currentStepData.highlight}</span>
                  <p className="text-xs text-yellow-700 font-medium">Bonus de bienvenue</p>
                </div>
              </div>
              <p className="text-sm text-yellow-800 text-center font-medium">
                {currentStepData.highlightText}
              </p>
            </div>
          )}

          {currentStep === 1 && currentStepData.examples && (
            <div className="grid grid-cols-2 gap-3 mb-6">
              {currentStepData.examples.map((example, index) => (
                <div key={index} className="bg-purple-50 rounded-2xl p-4 text-center border border-purple-100">
                  <div className="text-2xl mb-2">{example.emoji}</div>
                  <p className="text-sm font-medium text-purple-800">{example.text}</p>
                </div>
              ))}
            </div>
          )}

          {currentStep === 2 && currentStepData.features && (
            <div className="space-y-3 mb-6">
              {currentStepData.features.map((feature, index) => (
                <div key={index} className="flex items-center">
                  <div className="w-6 h-6 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                    <span className="text-white text-xs">✓</span>
                  </div>
                  <p className="text-sm text-gray-700">{feature}</p>
                </div>
              ))}
            </div>
          )}

          {/* Citations motivantes */}
          {currentStep === 2 && (
            <div className="mb-6">
              {/* Suppression de la citation */}
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-8">
          <button
            onClick={prevStep}
            disabled={currentStep === 0}
            className={`flex items-center px-4 py-2 rounded-2xl font-medium transition-all ${
              currentStep === 0
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-gray-600 hover:text-gray-800 hover:bg-white/50'
            }`}
          >
            <ChevronLeft size={20} className="mr-1" />
            Précédent
          </button>

          <div className="text-center">
            <p className="text-sm text-gray-500">
              {currentStep + 1} sur {steps.length}
            </p>
          </div>

          <button
            onClick={nextStep}
            className="flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-2xl font-semibold hover:shadow-lg transition-all shadow-sm"
          >
            {currentStep === steps.length - 1 ? (
              <>
                Commencer
                <Sparkles size={20} className="ml-2" />
              </>
            ) : (
              <>
                Suivant
                <ChevronRight size={20} className="ml-1" />
              </>
            )}
          </button>
        </div>

        {/* Footer de motivation */}
        <div className="text-center mt-8">
          <p className="text-sm text-gray-500">
            🌟 Prêt à vivre tes premiers MoodUps ? 🌟
          </p>
        </div>
      </div>
    </div>
  );
};

export default OnboardingPage;