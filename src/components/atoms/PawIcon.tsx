import React from 'react';

interface PawIconProps {
  className?: string;
  size?: number;
}

export const PawIcon: React.FC<PawIconProps> = ({ className = '', size = 24 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M12 2c-1.5 1.5-2 3-2 4.5 0 2.5 2 4.5 4.5 4.5 2.5 0 4.5-2 4.5-4.5 0-1.5-.5-3-2-4.5" />
      <path d="M4.5 8c-1.5 1.5-2 3-2 4.5 0 2.5 2 4.5 4.5 4.5 2.5 0 4.5-2 4.5-4.5 0-1.5-.5-3-2-4.5" />
      <path d="M19.5 8c-1.5 1.5-2 3-2 4.5 0 2.5 2 4.5 4.5 4.5 2.5 0 4.5-2 4.5-4.5 0-1.5-.5-3-2-4.5" />
      <path d="M12 14c-1.5 1.5-2 3-2 4.5 0 2.5 2 4.5 4.5 4.5 2.5 0 4.5-2 4.5-4.5 0-1.5-.5-3-2-4.5" />
    </svg>
  );
}; 