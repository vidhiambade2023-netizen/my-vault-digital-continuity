import React from 'react';

export type BadgeVariant = 
  | 'active' 
  | 'connected' 
  | 'verified' 
  | 'success'
  | 'pending' 
  | 'under_review' 
  | 'warning'
  | 'locked' 
  | 'excluded' 
  | 'rejected' 
  | 'error'
  | 'neutral' 
  | 'unlinked';

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  dot?: boolean;
  icon?: React.ReactNode;
  className?: string;
  size?: 'sm' | 'md';
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'neutral',
  dot = true,
  icon,
  className = '',
  size = 'md'
}) => {
  return (
    <span 
      className={`badge badge-${variant} ${className}`}
      style={{
        fontSize: size === 'sm' ? '10.5px' : '11px',
        padding: size === 'sm' ? '2px 7px' : '3px 9px'
      }}
    >
      {dot && !icon && <span className="badge-dot" />}
      {icon && <span style={{ display: 'inline-flex', alignItems: 'center' }}>{icon}</span>}
      <span>{children}</span>
    </span>
  );
};
