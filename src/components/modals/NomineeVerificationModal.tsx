import React, { useState } from 'react';
import { 
  X, 
  Mail, 
  ShieldCheck, 
  CheckCircle2, 
  AlertCircle, 
  KeyRound, 
  Copy,
  Clock
} from 'lucide-react';
import { Nominee } from '../../types';

interface NomineeVerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  nominee: Nominee | null;
  onVerifySuccess: (nomineeId: string) => void;
}

export const NomineeVerificationModal: React.FC<NomineeVerificationModalProps> = ({
  isOpen,
  onClose,
  nominee,
  onVerifySuccess
}) => {
  if (!isOpen || !nominee) return null;

  const [inputCode, setInputCode] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [copied, setCopied] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const expectedCode = nominee.demoVerificationCode || 'VAULT-8492';

  const handleCopyCode = () => {
    navigator.clipboard?.writeText(expectedCode);
    setCopied(true);
    setInputCode(expectedCode);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputCode.trim().toUpperCase() === expectedCode.toUpperCase()) {
      setIsSuccess(true);
      setErrorMsg('');
      setTimeout(() => {
        onVerifySuccess(nominee.id);
        setIsSuccess(false);
        onClose();
      }, 1000);
    } else {
      setErrorMsg(`Code mismatch. Please enter "${expectedCode}" to verify.`);
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(11, 11, 13, 0.48)',
      backdropFilter: 'blur(5px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '20px'
    }}>
      <div style={{
        backgroundColor: 'var(--color-white)',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--color-border)',
        boxShadow: 'var(--shadow-modal)',
        width: '100%',
        maxWidth: '580px',
        maxHeight: '90vh',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        animation: 'fadeIn 0.2s cubic-bezier(0.16, 1, 0.3, 1)'
      }}>
        {/* Header */}
        <div style={{
          padding: '18px 24px',
          borderBottom: '1px solid var(--color-border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: 'var(--color-white)'
        }}>
          <div>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '10.5px',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              color: 'var(--color-secondary-text)',
              marginBottom: '2px'
            }}>
              <span>Interactive Verification Simulator</span>
            </div>
            <h2 style={{ fontSize: '17px', fontWeight: 700, margin: 0, color: 'var(--color-primary-black)' }}>
              Nominee Invitation & Verification
            </h2>
          </div>
          <button onClick={onClose} className="btn-ghost" style={{ padding: '6px' }}>
            <X size={16} />
          </button>
        </div>

        {/* Content Body */}
        <div style={{ padding: '24px', overflowY: 'auto', flex: 1 }}>
          {/* Simulated Email Envelope Card */}
          <div style={{
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-md)',
            backgroundColor: 'var(--color-off-white)',
            padding: '16px',
            marginBottom: '18px'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              borderBottom: '1px solid var(--color-border-subtle)',
              paddingBottom: '10px',
              marginBottom: '12px',
              fontSize: '11.5px',
              color: 'var(--color-secondary-text)'
            }}>
              <Mail size={14} style={{ color: 'var(--color-primary-black)' }} />
              <span>Simulated Email dispatched to: <strong>{nominee.email}</strong></span>
            </div>

            <div style={{ backgroundColor: 'var(--color-white)', padding: '14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border-subtle)' }}>
              <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--color-primary-black)', marginBottom: '8px' }}>
                Subject: Vidhi Ambade has designated you as a Digital Continuity Delegate
              </div>
              <p style={{ fontSize: '12.5px', color: 'var(--color-primary-black)', lineHeight: 1.5, margin: '0 0 8px' }}>
                Hello {nominee.name},
              </p>
              <p style={{ fontSize: '12px', color: 'var(--color-secondary-text)', lineHeight: 1.5, margin: '0 0 10px' }}>
                Vidhi Ambade has added you to their <strong>My Vault</strong> digital continuity circle as their <strong>{nominee.relationship}</strong>.
              </p>
              
              <div style={{
                backgroundColor: 'var(--color-pale-blue-grey)',
                padding: '8px 12px',
                borderRadius: 'var(--radius-sm)',
                fontSize: '11.5px',
                color: 'var(--color-primary-black)',
                marginBottom: '10px',
                lineHeight: 1.4
              }}>
                <strong>Crucial Privacy Invariant:</strong> You do NOT have any access to Vidhi's accounts or files today. Access can only be unlocked under certified legal continuity protocol.
              </div>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '10px 14px',
                backgroundColor: 'var(--color-off-white)',
                borderRadius: 'var(--radius-sm)',
                border: '1px dashed var(--color-blue-grey)'
              }}>
                <div>
                  <div style={{ fontSize: '10px', color: 'var(--color-secondary-text)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                    Demo Verification Challenge Code
                  </div>
                  <div style={{ fontSize: '17px', fontWeight: 700, letterSpacing: '0.08em', color: 'var(--color-primary-black)', fontFamily: 'var(--font-mono)' }}>
                    {expectedCode}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleCopyCode}
                  className="btn-secondary"
                  style={{ fontSize: '11.5px', padding: '4px 10px' }}
                >
                  <Copy size={12} />
                  <span>{copied ? 'Auto-filled!' : 'Copy Code'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Verification Code Form */}
          <form onSubmit={handleVerify}>
            <div style={{ marginBottom: '14px' }}>
              <label style={{ display: 'block', fontSize: '11.5px', fontWeight: 600, marginBottom: '5px' }}>
                Enter Challenge Code from Nominee's Inbox
              </label>
              <div style={{ display: 'flex', gap: '8px' }}>
                <input
                  type="text"
                  placeholder={`e.g. ${expectedCode}`}
                  value={inputCode}
                  onChange={(e) => {
                    setInputCode(e.target.value);
                    setErrorMsg('');
                  }}
                  style={{
                    flex: 1,
                    fontSize: '14px',
                    letterSpacing: '0.08em',
                    fontWeight: 600,
                    fontFamily: 'var(--font-mono)'
                  }}
                />
                <button
                  type="submit"
                  disabled={isSuccess}
                  className="btn-primary"
                  style={{ fontSize: '12.5px' }}
                >
                  {isSuccess ? <CheckCircle2 size={14} /> : <KeyRound size={14} />}
                  <span>{isSuccess ? 'Verified!' : 'Complete Verification'}</span>
                </button>
              </div>
              {errorMsg && (
                <div style={{ fontSize: '11.5px', color: '#DC2626', marginTop: '5px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <AlertCircle size={12} />
                  <span>{errorMsg}</span>
                </div>
              )}
            </div>

            {/* Educational State Note */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '11.5px',
              color: 'var(--color-secondary-text)',
              padding: '8px 12px',
              backgroundColor: 'var(--color-off-white)',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--color-border)'
            }}>
              <Clock size={13} style={{ color: 'var(--color-blue-grey)', flexShrink: 0 }} />
              <span>
                <strong>State Integrity:</strong> Verifying validates email ownership. Access status remains <em>"Inactive during lifetime"</em>.
              </span>
            </div>
          </form>
        </div>

        {/* Footer */}
        <div style={{
          padding: '12px 24px',
          borderTop: '1px solid var(--color-border)',
          display: 'flex',
          justifyContent: 'flex-end',
          backgroundColor: 'var(--color-off-white)'
        }}>
          <button
            type="button"
            onClick={onClose}
            className="btn-secondary"
            style={{ fontSize: '12px' }}
          >
            Close Simulator
          </button>
        </div>
      </div>
    </div>
  );
};
