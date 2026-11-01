import React, { useState } from 'react';
import { Toast } from '@app/components/common/Toast';

export const ToastStory: React.FC = () => {
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' | 'warning' } | null>(null);

  const showToast = (message: string, type: 'success' | 'info' | 'warning') => {
    setToast({ message, type });
  };

  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '26px', fontWeight: 400, color: '#0B0B0D', marginBottom: '6px' }}>
          Toast Notifications
        </h2>
        <p style={{ fontSize: '13px', color: 'var(--color-secondary-text)' }}>
          Transient feedback notifications that auto-dismiss after confirming state updates or permission changes.
        </p>
      </div>

      <div style={{
        backgroundColor: '#FFFFFF',
        border: '1px solid #E1E2E5',
        borderRadius: '8px',
        padding: '36px',
        marginBottom: '28px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '16px'
      }}>
        <div style={{ fontSize: '13.5px', fontWeight: 500, color: '#0B0B0D', marginBottom: '8px' }}>
          Click to trigger live toast notification:
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          <button
            onClick={() => showToast('Google Workspace successfully connected with 3 scopes.', 'success')}
            className="btn-primary"
            style={{ fontSize: '12.5px', padding: '7px 16px' }}
          >
            Trigger Success Toast
          </button>

          <button
            onClick={() => showToast('Next continuity review scheduled in 45 days.', 'info')}
            className="btn-secondary"
            style={{ fontSize: '12.5px', padding: '7px 16px' }}
          >
            Trigger Info Toast
          </button>

          <button
            onClick={() => showToast('Private conversations cannot be delegated (inviolable lock).', 'warning')}
            style={{
              backgroundColor: '#FFFBEB',
              color: '#92400E',
              border: '1px solid #FDE68A',
              padding: '7px 16px',
              borderRadius: '8px',
              fontSize: '12.5px',
              fontWeight: 500,
              cursor: 'pointer'
            }}
          >
            Trigger Warning Toast
          </button>
        </div>
      </div>

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
};
