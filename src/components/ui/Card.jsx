import React from 'react';
import { cn } from '../../utils/cn';

const Card = ({ children, className, padding = true, shadow = true, ...props }) => {
  return (
    <div 
      className={cn(
        "bg-white rounded-2xl border border-gray-100",
        padding && "p-4",
        shadow && "shadow-sm hover:shadow-md transition-shadow duration-200",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

const CardHeader = ({ children, className }) => (
  <div className={cn("mb-4", className)}>
    {children}
  </div>
);

const CardContent = ({ children, className }) => (
  <div className={cn("", className)}>
    {children}
  </div>
);

const CardFooter = ({ children, className }) => (
  <div className={cn("mt-4 pt-4 border-t border-gray-100", className)}>
    {children}
  </div>
);

Card.Header = CardHeader;
Card.Content = CardContent;
Card.Footer = CardFooter;

export default Card;