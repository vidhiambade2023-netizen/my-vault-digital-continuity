import React, { useEffect } from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  maxWidth?: string;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  footer,
  maxWidth = '580px'
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(11, 11, 13, 0.45)',
        backdropFilter: 'blur(2px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        zIndex: 1000
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div 
        style={{
          width: '100%',
          maxWidth,
          backgroundColor: 'var(--color-white)',
          borderRadius: 'var(--radius-modal)',
          border: '1px solid var(--color-border)',
          boxShadow: 'var(--shadow-modal)',
          display: 'flex',
          flexDirection: 'column',
          maxHeight: '90vh',
          overflow: 'hidden',
          animation: 'modalSlideUp 180ms ease-out'
        }}
      >
        {/* Modal Header */}
        <div style={{
          padding: '20px 24px',
          borderBottom: '1px solid var(--color-border-subtle)',
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          gap: '16px'
        }}>
          <div>
            <h3 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--color-primary-black)', marginBottom: '4px' }}>
              {title}
            </h3>
            {subtitle && (
              <p style={{ fontSize: '13px', color: 'var(--color-secondary-text)', lineHeight: 1.4, margin: 0 }}>
                {subtitle}
              </p>
            )}
          </div>
          <button 
            onClick={onClose}
            aria-label="Close modal"
            style={{
              padding: '6px',
              borderRadius: 'var(--radius-sm)',
              color: 'var(--color-secondary-text)',
              cursor: 'pointer'
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Body */}
        <div style={{
          padding: '24px',
          overflowY: 'auto',
          flex: 1
        }}>
          {children}
        </div>

        {/* Modal Footer */}
        {footer && (
          <div style={{
            padding: '16px 24px',
            borderTop: '1px solid var(--color-border-subtle)',
            backgroundColor: 'var(--color-off-white)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            gap: '12px'
          }}>
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};

