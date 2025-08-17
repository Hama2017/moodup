// components/layout/AuthLayout.jsx - Solution Simple avec useRef
import React, { useState, useRef, useEffect } from 'react';
import LoginForm from '../../features/auth/components/LoginForm';
import RegisterForm from '../../features/auth/components/RegisterForm';

const AuthLayout = () => {
  const hasUserInteracted = useRef(false); // ✅ Track si l'user a changé d'onglet
  const [isLogin, setIsLogin] = useState(true); // ✅ Démarre sur Login comme voulu

  // Debug logs
  console.log('🔄 AuthLayout render - isLogin:', isLogin, 'hasUserInteracted:', hasUserInteracted.current);

  const handleLoginSuccess = () => {
    console.log('✅ handleLoginSuccess appelé !');
    // Redirection vers dashboard/homepage
  };

  const handleRegisterSuccess = () => {
    console.log('✅ handleRegisterSuccess appelé ! Passage au login...');
    hasUserInteracted.current = true; // ✅ Marque l'interaction
    setIsLogin(true);
  };

  // ✅ Fonction pour changer d'onglet (avec tracking)
  const handleTabChange = (newIsLogin) => {
    console.log('🔄 Tab change to:', newIsLogin ? 'Login' : 'Register');
    hasUserInteracted.current = true; // ✅ L'user a interagi
    setIsLogin(newIsLogin);
  };

  // ✅ Fonction pour le lien en bas (avec tracking)
  const switchMode = () => {
    console.log('🔄 Switch mode from:', isLogin ? 'Login' : 'Register');
    hasUserInteracted.current = true; // ✅ L'user a interagi
    setIsLogin(!isLogin);
  };

  // Debug changements
  useEffect(() => {
    console.log('🔄 isLogin changed to:', isLogin);
  }, [isLogin]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo et titre */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-r from-purple-600 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
            <span className="text-white text-3xl font-bold">M</span>
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent mb-2">
            MoodUp
          </h1>
          <p className="text-gray-600">
            {isLogin ? 'Connecte-toi à ton compte' : 'Rejoins la communauté MoodUp'}
          </p>
        </div>

        {/* Formulaire */}
        <div className="bg-white rounded-3xl shadow-xl p-8">
          {/* Toggle Login/Register */}
          <div className="flex bg-gray-100 rounded-2xl p-1 mb-6">
            <button
              onClick={() => handleTabChange(true)} // ✅ Avec tracking
              className={`flex-1 py-2 rounded-xl font-medium transition-all ${
                isLogin
                  ? 'bg-white text-purple-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Connexion
            </button>
            <button
              onClick={() => handleTabChange(false)} // ✅ Avec tracking
              className={`flex-1 py-2 rounded-xl font-medium transition-all ${
                !isLogin
                  ? 'bg-white text-purple-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Inscription
            </button>
          </div>

          {/* Forms */}
          {isLogin ? (
            <LoginForm onSuccess={handleLoginSuccess} />
          ) : (
            <RegisterForm onSuccess={handleRegisterSuccess} />
          )}

          {/* Switch entre connexion/inscription */}
          <div className="text-center mt-6">
            <p className="text-gray-600">
              {isLogin ? "Pas encore de compte ? " : "Déjà un compte ? "}
              <button
                onClick={switchMode} // ✅ Avec tracking
                className="text-purple-600 hover:text-purple-700 font-medium"
              >
                {isLogin ? "S'inscrire" : "Se connecter"}
              </button>
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-sm text-gray-500">
            © 2024 MoodUp. Connecter les communautés.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;