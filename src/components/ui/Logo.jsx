// components/ui/Logo.jsx - Composant Logo réutilisable (OPTIONNEL)
import React from 'react';

const Logo = ({ 
  size = 'md', 
  showText = false, 
  className = '',
  src = '/logo/logo-moodup.png' 
}) => {
  const sizes = {
    sm: 'h-6',
    md: 'h-8', 
    lg: 'h-12',
    xl: 'h-16'
  };

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <img 
        src={src}
        alt="MoodUp" 
        className={`${sizes[size]} w-auto transition-opacity duration-200 hover:opacity-80`}
        onError={(e) => {
          // Fallback si le logo ne charge pas
          e.target.style.display = 'none';
          if (e.target.nextSibling) {
            e.target.nextSibling.style.display = 'block';
          }
        }}
      />
      {/* Fallback texte */}
      <h1 
        className={`font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent hidden ${
          size === 'sm' ? 'text-lg' :
          size === 'md' ? 'text-2xl' :
          size === 'lg' ? 'text-3xl' :
          'text-4xl'
        }`}
      >
        MoodUp
      </h1>
      
      {showText && (
        <span className="ml-2 text-gray-600 font-medium">
          MoodUp
        </span>
      )}
    </div>
  );
};

export default Logo;