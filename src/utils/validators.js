export const isEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isStrongPassword = (password) => {
  return password.length >= 6;
};

export const validateActivityForm = (data) => {
  const errors = {};
  
  if (!data.title?.trim()) {
    errors.title = "Le titre est requis";
  }
  
  if (!data.location?.trim()) {
    errors.location = "Le lieu est requis";
  }
  
  if (!data.date) {
    errors.date = "La date est requise";
  }
  
  if (!data.time) {
    errors.time = "L'heure est requise";
  }
  
  if (!data.maxParticipants || data.maxParticipants < 2) {
    errors.maxParticipants = "Minimum 2 participants requis";
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};