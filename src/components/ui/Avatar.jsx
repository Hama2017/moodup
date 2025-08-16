// components/ui/Avatar.jsx
import React from 'react';
import { User } from 'lucide-react';
import { cn } from '../../utils/cn';

const Avatar = ({ 
  src, 
  alt = "", 
  size = 'md', 
  name,
  className,
  gradient = "from-purple-600 to-pink-500"
}) => {
  const sizes = {
    sm: "w-8 h-8 text-sm",
    md: "w-12 h-12 text-lg",
    lg: "w-16 h-16 text-xl",
    xl: "w-20 h-20 text-2xl"
  };

  const getInitials = (name) => {
    if (!name) return "";
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  return (
    <div className={cn(
      "rounded-full flex items-center justify-center overflow-hidden",
      sizes[size],
      !src && `bg-gradient-to-r ${gradient}`,
      className
    )}>
      {src ? (
        <img 
          src={src} 
          alt={alt}
          className="w-full h-full object-cover"
        />
      ) : name ? (
        <span className="text-white font-bold">{getInitials(name)}</span>
      ) : (
        <User className="text-white" size={16} />
      )}
    </div>
  );
};

export default Avatar;