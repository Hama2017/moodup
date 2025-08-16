
// features/auth/utils/validators.js
import { isEmail, isStrongPassword } from '../../../utils/validators';

export const validateLoginForm = (values) => {
  const errors = {};

  if (!values.email) {
    errors.email = 'Email requis';
  } else if (!isEmail(values.email)) {
    errors.email = 'Email invalide';
  }

  if (!values.password) {
    errors.password = 'Mot de passe requis';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

export const validateRegisterForm = (values) => {
  const errors = {};

  if (!values.fullName?.trim()) {
    errors.fullName = 'Nom complet requis';
  }

  if (!values.username?.trim()) {
    errors.username = 'Nom d\'utilisateur requis';
  } else if (values.username.length < 3) {
    errors.username = 'Minimum 3 caractères';
  }

  if (!values.email) {
    errors.email = 'Email requis';
  } else if (!isEmail(values.email)) {
    errors.email = 'Email invalide';
  }

  if (!values.password) {
    errors.password = 'Mot de passe requis';
  } else if (!isStrongPassword(values.password)) {
    errors.password = 'Minimum 6 caractères';
  }

  if (!values.confirmPassword) {
    errors.confirmPassword = 'Confirmation requise';
  } else if (values.password !== values.confirmPassword) {
    errors.confirmPassword = 'Les mots de passe ne correspondent pas';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};
