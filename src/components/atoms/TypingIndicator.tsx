import React from 'react';

interface TypingIndicatorProps {
  className?: string;
  color?: string;
}

export const TypingIndicator: React.FC<TypingIndicatorProps> = ({ 
  className = '', 
  color = 'bg-primary-600' 
}) => {
  return (
    <div className={`flex gap-1 ${className}`}>
      <div className={`w-2 h-2 rounded-full ${color} animate-bounce`} />
      <div className={`w-2 h-2 rounded-full ${color} animate-bounce delay-100`} />
      <div className={`w-2 h-2 rounded-full ${color} animate-bounce delay-200`} />
    </div>
  );
}; 