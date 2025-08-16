// features/auth/components/RegisterForm.jsx
import React from 'react';
import { Mail, Lock, User, Eye, EyeOff } from 'lucide-react';
import { useForm } from '../../../hooks/useForm';
import { useAuth } from '../../../hooks/useAuth';
import { validateRegisterForm } from '../utils/validators';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const RegisterForm = ({ onSuccess }) => {
  const { register, loading, error } = useAuth();
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  const {
    values,
    errors,
    handleChange,
    handleBlur,
    handleSubmit
  } = useForm(
    {
      email: '',
      password: '',
      confirmPassword: '',
      fullName: '',
      username: ''
    },
    validateRegisterForm
  );

  const onSubmit = async (formData) => {
    try {
      await register(formData);
      onSuccess?.();
    } catch (err) {
      // Error is handled by AuthContext
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Input
        name="fullName"
        type="text"
        label="Nom complet"
        value={values.fullName}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.fullName}
        leftIcon={<User size={18} />}
        placeholder="Marie Dupont"
        autoComplete="name"
      />

      <Input
        name="username"
        type="text"
        label="Nom d'utilisateur"
        value={values.username}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.username}
        leftIcon={<span className="text-gray-400">@</span>}
        placeholder="nom_utilisateur"
        autoComplete="username"
      />

      <Input
        name="email"
        type="email"
        label="Email"
        value={values.email}
        onChange={handleChange}
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
        onChange={handleChange}
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
        autoComplete="new-password"
        helperText="Minimum 6 caractères"
      />

      <Input
        name="confirmPassword"
        type={showConfirmPassword ? 'text' : 'password'}
        label="Confirmer le mot de passe"
        value={values.confirmPassword}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.confirmPassword}
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
