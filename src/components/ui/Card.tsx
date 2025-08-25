import React from 'react';
interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  border?: boolean;
  shadow?: 'none' | 'sm' | 'md' | 'lg';
}
const Card: React.FC<CardProps> = ({
  children,
  className = '',
  padding = 'md',
  border = true,
  shadow = 'sm'
}) => {
  const paddingClasses = {
    none: 'p-0',
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6'
  };
  const shadowClasses = {
    none: '',
    sm: 'shadow-sm',
    md: 'shadow',
    lg: 'shadow-lg'
  };
  const borderClass = border ? 'border border-gray-200' : '';
  return <div className={`bg-white rounded-lg ${paddingClasses[padding]} ${shadowClasses[shadow]} ${borderClass} ${className}`}>
      {children}
    </div>;
};
export default Card;