// components/ui/Spinner.jsx
import React from 'react';
import { cn } from '../../utils/cn';

const Spinner = ({ size = 'md', className }) => {
  const sizes = {
    sm: "w-4 h-4",
    md: "w-6 h-6", 
    lg: "w-8 h-8",
    xl: "w-12 h-12"
  };

  return (
    <div className={cn(
      "border-2 border-purple-200 border-t-purple-600 rounded-full animate-spin",
      sizes[size],
      className
    )} />
  );
};

export default Spinner;