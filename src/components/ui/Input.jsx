import React, { forwardRef } from 'react';
import { cn } from '../../utils/cn';

const Input = forwardRef(({ 
  label, 
  error, 
  helperText,
  leftIcon,
  rightIcon,
  className,
  ...props 
}, ref) => {
  return (
    <div className="space-y-1">
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      
      <div className="relative">
        {leftIcon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            {leftIcon}
          </div>
        )}
        
        <input
          ref={ref}
          className={cn(
            "w-full px-4 py-3 border-0 rounded-2xl bg-gray-50 focus:bg-white focus:ring-2 focus:ring-purple-500 focus:outline-none transition-all",
            leftIcon && "pl-10",
            rightIcon && "pr-10",
            error && "ring-2 ring-red-500 bg-red-50",
            className
          )}
          {...props}
        />
        
        {rightIcon && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            {rightIcon}
          </div>
        )}
      </div>
      
      {error && (
        <p className="text-red-500 text-sm">{error}</p>
      )}
      
      {helperText && !error && (
        <p className="text-gray-500 text-sm">{helperText}</p>
      )}
    </div>
  );
});

Input.displayName = 'Input';
export default Input;