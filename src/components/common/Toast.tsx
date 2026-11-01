import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export interface ToastProps {
  message: string;
  type?: 'success' | 'info' | 'warning';
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, type = 'success', onClose }) => {
  return (
    <div style={{
      position: 'fixed',
      bottom: '24px',
      right: '24px',
      backgroundColor: 'var(--color-primary-black)',
      color: 'var(--color-white)',
      borderRadius: 'var(--radius-md)',
      padding: '12px 18px',
      boxShadow: 'var(--shadow-lg)',
      border: '1px solid var(--color-border)',
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      zIndex: 2000,
      maxWidth: '420px',
      animation: 'fadeIn 0.2s ease-out'
    }}>
      <span>
        {type === 'success' && <CheckCircle2 size={16} color="#10B981" />}
        {type === 'warning' && <AlertCircle size={16} color="#F59E0B" />}
        {type === 'info' && <Info size={16} color="var(--color-blue-grey)" />}
      </span>
      <span style={{ fontSize: '13px', fontWeight: 500, flex: 1, color: 'var(--color-white)' }}>
        {message}
      </span>
      <button
        onClick={onClose}
        style={{
          background: 'none',
          border: 'none',
          color: 'var(--color-secondary-text)',
          cursor: 'pointer',
          padding: '2px',
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <X size={14} />
      </button>
    </div>
  );
};

export interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'warning';
  title: string;
  message?: string;
}

interface ToastContainerProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export const ToastContainer: React.FC<ToastContainerProps> = ({ toasts, onDismiss }) => {
  if (toasts.length === 0) return null;

  return (
    <div style={{
      position: 'fixed',
      bottom: '24px',
      right: '24px',
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
      zIndex: 2000,
      maxWidth: '380px'
    }}>
      {toasts.map((t) => (
        <div
          key={t.id}
          style={{
            backgroundColor: 'var(--color-primary-black)',
            color: 'var(--color-white)',
            borderRadius: 'var(--radius-md)',
            padding: '14px 16px',
            boxShadow: 'var(--shadow-lg)',
            border: '1px solid var(--color-border)',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '12px'
          }}
        >
          <span style={{ marginTop: '2px', flexShrink: 0 }}>
            {t.type === 'success' && <CheckCircle2 size={16} color="var(--color-blue-grey)" />}
            {t.type === 'warning' && <AlertCircle size={16} color="#E5A93C" />}
            {t.type === 'info' && <Info size={16} color="var(--color-pale-blue-grey)" />}
          </span>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '13px', fontWeight: 600 }}>{t.title}</div>
            {t.message && (
              <div style={{ fontSize: '12px', color: 'var(--color-secondary-text)', marginTop: '2px' }}>
                {t.message}
              </div>
            )}
          </div>
          <button
            onClick={() => onDismiss(t.id)}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--color-secondary-text)',
              cursor: 'pointer',
              padding: '2px',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <X size={14} />
          </button>
        </div>
      ))}
    </div>
  );
};
