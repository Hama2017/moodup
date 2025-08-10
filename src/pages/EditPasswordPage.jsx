import React, { useState } from 'react';
import { ArrowLeft, Lock, Eye, EyeOff, Check } from 'lucide-react';

const ChangePasswordPage = ({ 
  onBack = () => {},
  onSave = () => {}
}) => {
  const [passwords, setPasswords] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [showPasswords, setShowPasswords] = useState({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false
  });
  const [errors, setErrors] = useState({});
  const [hasChanges, setHasChanges] = useState(false);

  const updatePassword = (field, value) => {
    setPasswords(prev => ({ ...prev, [field]: value }));
    setHasChanges(true);
    
    // Nettoyer les erreurs lors de la frappe
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords(prev => ({ ...prev, [field]: !prev[field] }));
  };

  const validatePasswords = () => {
    const newErrors = {};

    // Vérifier le mot de passe actuel
    if (!passwords.currentPassword) {
      newErrors.currentPassword = 'Le mot de passe actuel est requis';
    }

    // Vérifier le nouveau mot de passe
    if (!passwords.newPassword) {
      newErrors.newPassword = 'Le nouveau mot de passe est requis';
    }

    // Vérifier la confirmation
    if (!passwords.confirmPassword) {
      newErrors.confirmPassword = 'Veuillez confirmer le nouveau mot de passe';
    } else if (passwords.newPassword !== passwords.confirmPassword) {
      newErrors.confirmPassword = 'Les mots de passe ne correspondent pas';
    }

    // Vérifier que le nouveau mot de passe est différent de l'ancien
    if (passwords.currentPassword && passwords.newPassword && passwords.currentPassword === passwords.newPassword) {
      newErrors.newPassword = 'Le nouveau mot de passe doit être différent de l\'ancien';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validatePasswords()) {
      onSave({
        currentPassword: passwords.currentPassword,
        newPassword: passwords.newPassword
      });
      setHasChanges(false);
    }
  };

  const canSave = () => {
    return passwords.currentPassword && 
           passwords.newPassword && 
           passwords.confirmPassword && 
           passwords.newPassword === passwords.confirmPassword;
  };

  return (
    <div className="flex-1 bg-gray-50">
      {/* Header */}
      <div className="bg-white px-6 py-4 shadow-md">
        <div className="flex items-center justify-between">
          <button
            onClick={onBack}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-gray-600" />
          </button>
          
          <h2 className="text-xl font-bold text-gray-800">Changer le mot de passe</h2>
          
          <div className="w-10 h-10"></div>
        </div>
      </div>

      <div className="p-4 space-y-6">
        
        {/* Mot de passe actuel */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h4 className="font-semibold text-gray-900 mb-4 flex items-center justify-center">
            <Lock className="w-5 h-5 mr-2 bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent" />
            Mot de passe actuel
          </h4>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Saisissez votre mot de passe actuel
            </label>
            <div className="relative">
              <input
                type={showPasswords.currentPassword ? "text" : "password"}
                value={passwords.currentPassword}
                onChange={(e) => updatePassword('currentPassword', e.target.value)}
                className={`w-full px-4 py-3 pr-12 border rounded-2xl focus:ring-2 focus:ring-purple-600 focus:border-transparent ${
                  errors.currentPassword ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Mot de passe actuel"
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility('currentPassword')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPasswords.currentPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            {errors.currentPassword && (
              <p className="text-red-500 text-sm mt-1">{errors.currentPassword}</p>
            )}
          </div>
        </div>

        {/* Nouveau mot de passe et confirmation */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h4 className="font-semibold text-gray-900 mb-4 flex items-center justify-center">
            <Lock className="w-5 h-5 mr-2 bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent" />
            Nouveau mot de passe
          </h4>
          
          <div className="space-y-4">
            {/* Nouveau mot de passe */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Choisissez un nouveau mot de passe
              </label>
              <div className="relative">
                <input
                  type={showPasswords.newPassword ? "text" : "password"}
                  value={passwords.newPassword}
                  onChange={(e) => updatePassword('newPassword', e.target.value)}
                  className={`w-full px-4 py-3 pr-12 border rounded-2xl focus:ring-2 focus:ring-purple-600 focus:border-transparent ${
                    errors.newPassword ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Nouveau mot de passe"
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility('newPassword')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPasswords.newPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.newPassword && (
                <p className="text-red-500 text-sm mt-1">{errors.newPassword}</p>
              )}
            </div>

            {/* Confirmation du mot de passe */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Confirmez votre nouveau mot de passe
              </label>
              <div className="relative">
                <input
                  type={showPasswords.confirmPassword ? "text" : "password"}
                  value={passwords.confirmPassword}
                  onChange={(e) => updatePassword('confirmPassword', e.target.value)}
                  className={`w-full px-4 py-3 pr-12 border rounded-2xl focus:ring-2 focus:ring-purple-600 focus:border-transparent ${
                    errors.confirmPassword ? 'border-red-500' : 
                    passwords.confirmPassword && passwords.newPassword === passwords.confirmPassword ? 'border-green-500' :
                    'border-gray-300'
                  }`}
                  placeholder="Confirmer le nouveau mot de passe"
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility('confirmPassword')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPasswords.confirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
              )}
              {passwords.confirmPassword && passwords.newPassword === passwords.confirmPassword && (
                <div className="flex items-center mt-2">
                  <Check className="w-4 h-4 text-green-500 mr-1" />
                  <p className="text-green-600 text-sm">Les mots de passe correspondent</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Bouton de sauvegarde */}
        <div className="sticky bottom-4">
          <button
            onClick={handleSave}
            disabled={!canSave()}
            className={`w-full py-4 rounded-2xl font-medium transition-all duration-200 shadow-lg ${
              canSave() 
                ? 'bg-gradient-to-r from-purple-600 to-pink-500 text-white hover:from-purple-700 hover:to-pink-600 transform hover:scale-105' 
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            {canSave() ? 'Changer le mot de passe' : 'Complétez tous les champs'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChangePasswordPage;