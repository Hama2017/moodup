
// ============================================================================
// 2. src/features/auth/components/LoginForm.jsx
// ============================================================================
import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { useForm } from '../../../hooks/useForm';
import { useAuth } from '../../../hooks/useAuth';
import { validateLoginForm } from '../utils/validators';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const LoginForm = ({ onSuccess }) => {
  const { login, loading } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(''); // ✅ Erreur locale

  const {
    values,
    errors,
    handleChange,
    handleBlur,
    handleSubmit
  } = useForm(
    { email: '', password: '' },
    validateLoginForm
  );

  // Clear error when user types
  const handleInputChange = (e) => {
    if (error) setError('');
    handleChange(e);
  };

  const onSubmit = async (formData) => {
    try {
      setError('');
      await login(formData.email, formData.password);
      onSuccess?.();
    } catch (err) {
      console.error('❌ Erreur login:', err.message);
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Input
        name="email"
        type="email"
        label="Email"
        value={values.email}
        onChange={handleInputChange}
        onBlur={handleBlur}
        error={errors.email}
        leftIcon={<Mail size={18} />}
        placeholder="ton@email.com"
        autoComplete="email"
      />

      <Input
        name="password"
        type={showPassword ? 'text' : 'password'}
        label="Mot de passe"
        value={values.password}
        onChange={handleInputChange}
        onBlur={handleBlur}
        error={errors.password}
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
        autoComplete="current-password"
      />

      {/* ✅ Erreur locale */}
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
        Se connecter
      </Button>
    </form>
  );
};

export default LoginForm;
