import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent' | 'destructive' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'secondary',
  size = 'md',
  icon,
  iconPosition = 'left',
  className = '',
  disabled,
  style,
  ...props
}) => {
  const getStyles = (): React.CSSProperties => {
    const base: React.CSSProperties = {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px',
      borderRadius: 'var(--radius-md)',
      fontWeight: 500,
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.6 : 1,
      transition: 'all var(--transition-fast)',
      whiteSpace: 'nowrap',
      lineHeight: 1.2,
      ...style
    };

    // Size
    if (size === 'sm') {
      base.padding = '6px 12px';
      base.fontSize = '12.5px';
    } else if (size === 'lg') {
      base.padding = '12px 24px';
      base.fontSize = '15px';
    } else {
      base.padding = '9px 16px';
      base.fontSize = '13.5px';
    }

    // Variant
    if (variant === 'primary') {
      base.backgroundColor = 'var(--color-primary-black)';
      base.color = 'var(--color-white)';
      base.border = '1px solid var(--color-primary-black)';
    } else if (variant === 'secondary') {
      base.backgroundColor = 'var(--color-white)';
      base.color = 'var(--color-primary-black)';
      base.border = '1px solid var(--color-border)';
    } else if (variant === 'accent') {
      base.backgroundColor = 'var(--color-pale-blue-grey)';
      base.color = 'var(--color-primary-black)';
      base.border = '1px solid var(--color-blue-grey)';
    } else if (variant === 'destructive') {
      base.backgroundColor = 'var(--color-white)';
      base.color = 'var(--status-locked-text)';
      base.border = '1px solid var(--status-locked-border)';
    } else if (variant === 'ghost') {
      base.backgroundColor = 'transparent';
      base.color = 'var(--color-secondary-text)';
      base.border = '1px solid transparent';
    }

    return base;
  };

  return (
    <button
      disabled={disabled}
      style={getStyles()}
      className={`btn-${variant} ${className}`}
      {...props}
    >
      {icon && iconPosition === 'left' && <span style={{ display: 'inline-flex' }}>{icon}</span>}
      {children}
      {icon && iconPosition === 'right' && <span style={{ display: 'inline-flex' }}>{icon}</span>}
    </button>
  );
};

