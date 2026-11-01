import React, { useState } from 'react';
import { X, Lock, KeyRound, Fingerprint } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess
}) => {
  const [authMethod, setAuthMethod] = useState<'passkey' | 'totp'>('passkey');
  const [totpCode, setTotpCode] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);

  if (!isOpen) return null;

  const handleSimulatePasskey = () => {
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      onLoginSuccess();
      onClose();
    }, 800);
  };

  const handleTotpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      onLoginSuccess();
      onClose();
    }, 600);
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
        maxWidth: '420px',
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
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Lock size={16} style={{ color: 'var(--color-primary-black)' }} />
            <h2 style={{ fontSize: '15px', fontWeight: 700, margin: 0 }}>
              Owner Authentication
            </h2>
          </div>
          <button onClick={onClose} className="btn-ghost" style={{ padding: '6px' }}>
            <X size={16} />
          </button>
        </div>

        {/* Content */}
        <div style={{ padding: '24px' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '12px',
            backgroundColor: 'var(--color-off-white)',
            borderRadius: 'var(--radius-md)',
            marginBottom: '18px',
            border: '1px solid var(--color-border-subtle)'
          }}>
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              backgroundColor: 'var(--color-primary-black)',
              color: 'var(--color-white)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 700,
              fontSize: '12px'
            }}>
              VA
            </div>
            <div>
              <div style={{ fontSize: '12.5px', fontWeight: 600 }}>Vidhi Ambade</div>
              <div style={{ fontSize: '11px', color: 'var(--color-secondary-text)' }}>vidhi.ambade@gmail.com</div>
            </div>
          </div>

          {/* Method selector */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '8px',
            marginBottom: '18px'
          }}>
            <button
              onClick={() => setAuthMethod('passkey')}
              style={{
                padding: '8px',
                borderRadius: 'var(--radius-sm)',
                border: authMethod === 'passkey' ? '2px solid var(--color-primary-black)' : '1px solid var(--color-border)',
                backgroundColor: authMethod === 'passkey' ? 'var(--color-pale-blue-grey)' : 'var(--color-white)',
                fontSize: '11.5px',
                fontWeight: 600,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              <Fingerprint size={16} />
              <span>Touch ID / Passkey</span>
            </button>
            <button
              onClick={() => setAuthMethod('totp')}
              style={{
                padding: '8px',
                borderRadius: 'var(--radius-sm)',
                border: authMethod === 'totp' ? '2px solid var(--color-primary-black)' : '1px solid var(--color-border)',
                backgroundColor: authMethod === 'totp' ? 'var(--color-pale-blue-grey)' : 'var(--color-white)',
                fontSize: '11.5px',
                fontWeight: 600,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              <KeyRound size={16} />
              <span>Authenticator App</span>
            </button>
          </div>

          {authMethod === 'passkey' ? (
            <div style={{ textAlign: 'center', padding: '12px 0' }}>
              <div style={{
                width: '52px',
                height: '52px',
                borderRadius: '50%',
                backgroundColor: 'var(--color-pale-blue-grey)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 14px'
              }}>
                <Fingerprint size={26} style={{ color: 'var(--color-primary-black)' }} />
              </div>
              <p style={{ fontSize: '12px', color: 'var(--color-secondary-text)', marginBottom: '16px', lineHeight: 1.45 }}>
                Use Apple Touch ID or WebAuthn hardware token to authenticate this session.
              </p>
              <button
                onClick={handleSimulatePasskey}
                disabled={isVerifying}
                className="btn-primary"
                style={{ width: '100%', padding: '9px' }}
              >
                {isVerifying ? 'Authenticating with Secure Enclave...' : 'Simulate Touch ID / Passkey'}
              </button>
            </div>
          ) : (
            <form onSubmit={handleTotpSubmit}>
              <div style={{ marginBottom: '14px' }}>
                <label style={{ display: 'block', fontSize: '11.5px', fontWeight: 600, marginBottom: '5px' }}>
                  6-Digit 2FA Code
                </label>
                <input
                  type="text"
                  maxLength={6}
                  placeholder="e.g. 592814"
                  value={totpCode}
                  onChange={(e) => setTotpCode(e.target.value)}
                  style={{ width: '100%', fontSize: '15px', letterSpacing: '0.2em', textAlign: 'center', fontFamily: 'var(--font-mono)' }}
                />
              </div>
              <button
                type="submit"
                disabled={isVerifying}
                className="btn-primary"
                style={{ width: '100%', padding: '9px' }}
              >
                {isVerifying ? 'Verifying TOTP Secret...' : 'Verify & Unlock Vault'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
