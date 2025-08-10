// pages/AuthPage.jsx - Page de connexion et inscription
import React, { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, User, MapPin, Flag } from 'lucide-react';

const AuthPage = ({ onAuthSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    username: '',
    location: '',
    nationality: ''
  });

  const nationalities = [
    { flag: '🇫🇷', name: 'Française' },
    { flag: '🇪🇸', name: 'Espagnole' },
    { flag: '🇩🇪', name: 'Allemande' },
    { flag: '🇮🇹', name: 'Italienne' },
    { flag: '🇧🇪', name: 'Belge' },
    { flag: '🇨🇭', name: 'Suisse' },
    { flag: '🇺🇸', name: 'Américaine' },
    { flag: '🇬🇧', name: 'Britannique' },
    { flag: '🇨🇦', name: 'Canadienne' },
    { flag: '🇯🇵', name: 'Japonaise' }
  ];

  const updateFormData = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    if (isLogin) {
      if (formData.email && formData.password) {
        console.log('Connexion:', { email: formData.email, password: formData.password });
        alert('Connexion réussie !');
        if (onAuthSuccess) onAuthSuccess();
      } else {
        alert('Veuillez remplir tous les champs');
      }
    } else {
      if (formData.password !== formData.confirmPassword) {
        alert('Les mots de passe ne correspondent pas');
        return;
      }
      
      const requiredFields = ['email', 'password', 'fullName', 'username'];
      const missingFields = requiredFields.filter(field => !formData[field]);
      
      if (missingFields.length > 0) {
        alert('Veuillez remplir tous les champs obligatoires');
        return;
      }
      
      console.log('Inscription:', formData);
      alert('Inscription réussie !');
      if (onAuthSuccess) onAuthSuccess();
    }
  };

  const switchMode = () => {
    setIsLogin(!isLogin);
    setFormData({
      email: '',
      password: '',
      confirmPassword: '',
      fullName: '',
      username: '',
      location: '',
      nationality: ''
    });
    setShowPassword(false);
    setShowConfirmPassword(false);
  };

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
          <div className="flex bg-gray-100 rounded-2xl p-1 mb-6">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-2 rounded-xl font-medium transition-all ${
                isLogin 
                  ? 'bg-white text-purple-600 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Connexion
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-2 rounded-xl font-medium transition-all ${
                !isLogin 
                  ? 'bg-white text-purple-600 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Inscription
            </button>
          </div>

          <div className="space-y-4">
            {/* Champs inscription */}
            {!isLogin && (
              <>
                <div className="space-y-1">
                  <div className="relative">
                    <User size={18} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Nom complet"
                      value={formData.fullName}
                      onChange={(e) => updateFormData('fullName', e.target.value)}
                      className="w-full pl-12 pr-4 py-3 bg-gray-50 border-0 rounded-2xl focus:bg-white focus:ring-2 focus:ring-purple-500 focus:outline-none transition-all placeholder-gray-400 text-gray-900"
                    />
                  </div>
                  <p className="text-xs text-gray-500 px-1">Votre nom et prénom</p>
                </div>

                <div className="space-y-1">
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg">@</span>
                    <input
                      type="text"
                      placeholder="nom_utilisateur"
                      value={formData.username}
                      onChange={(e) => updateFormData('username', e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, ''))}
                      className="w-full pl-12 pr-4 py-3 bg-gray-50 border-0 rounded-2xl focus:bg-white focus:ring-2 focus:ring-purple-500 focus:outline-none transition-all placeholder-gray-400 text-gray-900"
                    />
                  </div>
                  <p className="text-xs text-gray-500 px-1">Nom d'utilisateur unique</p>
                </div>
              </>
            )}

            {/* Email */}
            <div className="space-y-1">
              <div className="relative">
                <Mail size={18} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  placeholder="ton@email.com"
                  value={formData.email}
                  onChange={(e) => updateFormData('email', e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 border-0 rounded-2xl focus:bg-white focus:ring-2 focus:ring-purple-500 focus:outline-none transition-all placeholder-gray-400 text-gray-900"
                />
              </div>
            </div>

            {/* Mot de passe */}
            <div className="space-y-1">
              <div className="relative">
                <Lock size={18} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Mot de passe"
                  value={formData.password}
                  onChange={(e) => updateFormData('password', e.target.value)}
                  className="w-full pl-12 pr-12 py-3 bg-gray-50 border-0 rounded-2xl focus:bg-white focus:ring-2 focus:ring-purple-500 focus:outline-none transition-all placeholder-gray-400 text-gray-900"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {!isLogin && (
                <p className="text-xs text-gray-500 px-1">Minimum 6 caractères</p>
              )}
            </div>

            {/* Confirmation mot de passe */}
            {!isLogin && (
              <div className="space-y-1">
                <div className="relative">
                  <Lock size={18} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="Confirmer le mot de passe"
                    value={formData.confirmPassword}
                    onChange={(e) => updateFormData('confirmPassword', e.target.value)}
                    className="w-full pl-12 pr-12 py-3 bg-gray-50 border-0 rounded-2xl focus:bg-white focus:ring-2 focus:ring-purple-500 focus:outline-none transition-all placeholder-gray-400 text-gray-900"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
            )}

            {/* Champs optionnels inscription */}
            {!isLogin && (
              <>
                <div className="space-y-1">
                  <div className="relative">
                    <MapPin size={18} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Le Havre, France"
                      value={formData.location}
                      onChange={(e) => updateFormData('location', e.target.value)}
                      className="w-full pl-12 pr-4 py-3 bg-gray-50 border-0 rounded-2xl focus:bg-white focus:ring-2 focus:ring-purple-500 focus:outline-none transition-all placeholder-gray-400 text-gray-900"
                    />
                  </div>
                  <p className="text-xs text-gray-500 px-1">Ville (optionnel)</p>
                </div>

                <div className="space-y-1">
                  <div className="relative">
                    <Flag size={18} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <select
                      value={formData.nationality}
                      onChange={(e) => updateFormData('nationality', e.target.value)}
                      className="w-full pl-12 pr-4 py-3 bg-gray-50 border-0 rounded-2xl focus:bg-white focus:ring-2 focus:ring-purple-500 focus:outline-none transition-all text-gray-900 appearance-none"
                    >
                      <option value="">Sélectionner une nationalité</option>
                      {nationalities.map((nat, i) => (
                        <option key={i} value={nat.name}>
                          {nat.flag} {nat.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <p className="text-xs text-gray-500 px-1">Nationalité (optionnel)</p>
                </div>
              </>
            )}

            {/* Mot de passe oublié */}
            {isLogin && (
              <div className="text-right">
                <button
                  type="button"
                  className="text-sm text-purple-600 hover:text-purple-700 font-medium"
                >
                  Mot de passe oublié ?
                </button>
              </div>
            )}

            {/* Bouton submit */}
            <button
              onClick={handleSubmit}
              className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-2xl font-semibold hover:shadow-lg transition-all shadow-sm mt-6"
            >
              {isLogin ? 'Se connecter' : 'Créer mon compte'}
            </button>
          </div>

          {/* Switch entre connexion/inscription */}
          <div className="text-center mt-6">
            <p className="text-gray-600">
              {isLogin ? "Pas encore de compte ? " : "Déjà un compte ? "}
              <button
                onClick={switchMode}
                className="text-purple-600 hover:text-purple-700 font-medium"
              >
                {isLogin ? "S'inscrire" : "Se connecter"}
              </button>
            </p>
          </div>

          {/* Conditions d'utilisation */}
          {!isLogin && (
            <div className="text-center mt-4">
              <p className="text-xs text-gray-500">
                En créant un compte, vous acceptez nos{' '}
                <button className="text-purple-600 hover:text-purple-700">
                  Conditions d'utilisation
                </button>{' '}
                et notre{' '}
                <button className="text-purple-600 hover:text-purple-700">
                  Politique de confidentialité
                </button>
              </p>
            </div>
          )}
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

export default AuthPage;