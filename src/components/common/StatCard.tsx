import React from 'react';

interface StatCardProps {
  label: string;
  value: string | number;
  subtext?: string;
  badgeText?: string;
  badgeVariant?: 'success' | 'warning' | 'neutral' | 'locked';
  icon?: React.ReactNode;
  onClick?: () => void;
}

export const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  subtext,
  badgeText,
  badgeVariant = 'neutral',
  icon,
  onClick
}) => {
  return (
    <div 
      onClick={onClick}
      onMouseEnter={(e) => {
        if (onClick) {
          e.currentTarget.style.borderColor = 'var(--color-blue-grey)';
          e.currentTarget.style.boxShadow = 'var(--shadow-xs)';
        }
      }}
      onMouseLeave={(e) => {
        if (onClick) {
          e.currentTarget.style.borderColor = 'var(--color-border)';
          e.currentTarget.style.boxShadow = 'none';
        }
      }}
      style={{
        backgroundColor: 'var(--color-white)',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-md)',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        cursor: onClick ? 'pointer' : 'default',
        transition: 'all var(--transition-fast)',
        minHeight: '124px',
        position: 'relative'
      }}
    >
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
          <span style={{
            fontSize: '11px',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.07em',
            color: 'var(--color-secondary-text)'
          }}>
            {label}
          </span>
          {icon && (
            <span style={{ color: 'var(--color-secondary-text)', display: 'flex', alignItems: 'center' }}>
              {icon}
            </span>
          )}
        </div>

        <div style={{
          fontSize: '28px',
          fontWeight: 700,
          letterSpacing: '-0.03em',
          color: 'var(--color-primary-black)',
          lineHeight: 1.15,
          marginBottom: '6px'
        }}>
          {value}
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '6px' }}>
        {subtext && (
          <span style={{ fontSize: '12px', color: 'var(--color-secondary-text)', lineHeight: 1.3 }}>
            {subtext}
          </span>
        )}
        {badgeText && (
          <span style={{
            fontSize: '10px',
            fontWeight: 600,
            padding: '2px 6px',
            borderRadius: 'var(--radius-full)',
            backgroundColor: badgeVariant === 'success' ? '#EDF7EE' :
              badgeVariant === 'warning' ? '#FEF8E7' :
              badgeVariant === 'locked' ? '#FBEBEB' : '#F1F3F6',
            color: badgeVariant === 'success' ? '#1B6425' :
              badgeVariant === 'warning' ? '#8A6100' :
              badgeVariant === 'locked' ? '#7F1D1D' : '#4B5563',
            border: `1px solid ${
              badgeVariant === 'success' ? '#CDE8D0' :
              badgeVariant === 'warning' ? '#F9E7BA' :
              badgeVariant === 'locked' ? '#F3D2D2' : '#D8DCE3'
            }`
          }}>
            {badgeText}
          </span>
        )}
      </div>
    </div>
  );
};
