import React from 'react';
import { Modal } from './Modal';
import { Button } from './Button';
import { AlertTriangle } from 'lucide-react';

interface ConfirmDialogProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  isDestructive?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  isOpen,
  title,
  message,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  isDestructive = false,
  onConfirm,
  onCancel
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onCancel}
      title={title}
      maxWidth="440px"
      footer={
        <>
          <Button variant="secondary" onClick={onCancel}>
            {cancelLabel}
          </Button>
          <Button 
            variant={isDestructive ? 'destructive' : 'primary'} 
            onClick={onConfirm}
          >
            {confirmLabel}
          </Button>
        </>
      }
    >
      <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
        {isDestructive && (
          <div style={{
            padding: '8px',
            borderRadius: 'var(--radius-sm)',
            backgroundColor: 'var(--status-locked-bg)',
            color: 'var(--status-locked-text)',
            flexShrink: 0
          }}>
            <AlertTriangle size={20} />
          </div>
        )}
        <p style={{ fontSize: '14px', color: 'var(--color-secondary-text)', lineHeight: 1.5, margin: 0 }}>
          {message}
        </p>
      </div>
    </Modal>
  );
};

