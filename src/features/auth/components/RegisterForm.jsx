// features/auth/components/RegisterForm.jsx - VERSION SANS useForm
import React, { useState } from 'react';
import { Mail, Lock, User, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../../../hooks/useAuth';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const RegisterForm = ({ onSuccess }) => {
  const { register, loading } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  
  // ✅ État du formulaire simple
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    username: ''
  });

  // ✅ Gestion des changements
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear erreurs quand l'utilisateur tape
    if (error) setError('');
    if (successMessage) setSuccessMessage('');
  };

  // ✅ Soumission simple
  const handleSubmit = async (e) => {
    e.preventDefault(); // ✅ Empêche le refresh
    
    console.log('🔥 DEBUT handleSubmit Register');
    
    try {
      setError('');
      setSuccessMessage('');
      
      console.log('🔄 Tentative inscription...');
      await register(formData);
      
      // ✅ SEULEMENT si succès !
      console.log('✅ Inscription réussie !');
      setSuccessMessage('Inscription réussie ! Vous pouvez maintenant vous connecter.');
      setFormData({
        email: '', password: '', confirmPassword: '', fullName: '', username: ''
      });
      
      setTimeout(() => {
        console.log('🔄 Redirection vers login...');
        onSuccess?.();
      }, 2000);
      
    } catch (err) {
      console.error('❌ Erreur inscription:', err.message);
      setError(err.message);
      setSuccessMessage('');
      console.log('🛑 STOP - Reste sur RegisterForm');
      // ✅ PAS DE onSuccess() appelé ici !
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Input
        name="fullName"
        type="text"
        label="Nom complet"
        value={formData.fullName}
        onChange={handleChange}
        leftIcon={<User size={18} />}
        placeholder="Marie Dupont"
        autoComplete="name"
      />

      <Input
        name="username"
        type="text"
        label="Nom d'utilisateur"
        value={formData.username}
        onChange={handleChange}
        leftIcon={<span className="text-gray-400">@</span>}
        placeholder="nom_utilisateur"
        autoComplete="username"
      />

      <Input
        name="email"
        type="email"
        label="Email"
        value={formData.email}
        onChange={handleChange}
        leftIcon={<Mail size={18} />}
        placeholder="ton@email.com"
        autoComplete="email"
      />

      <Input
        name="password"
        type={showPassword ? 'text' : 'password'}
        label="Mot de passe"
        value={formData.password}
        onChange={handleChange}
        leftIcon={<Lock size={18} />}
        rightIcon={
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="text-gray-400 hover:text-gray-600"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        }
        placeholder="Mot de passe"
        autoComplete="new-password"
        helperText="Minimum 6 caractères"
      />

      <Input
        name="confirmPassword"
        type={showConfirmPassword ? 'text' : 'password'}
        label="Confirmer le mot de passe"
        value={formData.confirmPassword}
        onChange={handleChange}
        leftIcon={<Lock size={18} />}
        rightIcon={
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="text-gray-400 hover:text-gray-600"
          >
            {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        }
        placeholder="Confirmer le mot de passe"
        autoComplete="new-password"
      />

      {/* Message de succès */}
      {successMessage && (
        <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-green-600 text-sm">{successMessage}</p>
        </div>
      )}

      {/* Erreur locale */}
      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      )}

      <Button
        type="submit"
        variant="primary"
        size="lg"
        loading={loading}
        disabled={loading}
        className="w-full"
      >
        Créer mon compte
      </Button>
    </form>
  );
};

export default RegisterForm;