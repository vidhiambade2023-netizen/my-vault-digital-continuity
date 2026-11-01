import React, { useState } from 'react';

interface Screen02Props {
  onNext: () => void;
  onPrev: () => void;
  showAnnotations: boolean;
}

export const Screen02TwoFactor: React.FC<Screen02Props> = ({ onNext, onPrev, showAnnotations }) => {
  const [code, setCode] = useState(['4', '9', '2', '8', '1', '0']);

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      {/* Top Header Placeholder */}
      <header style={{
        height: '56px',
        borderBottom: '1px solid var(--wf-border)',
        padding: '0 32px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'var(--wf-surface)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{
            width: '28px',
            height: '28px',
            border: '1.5px solid var(--wf-text-main)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 700,
            fontSize: '12px'
          }}>
            V
          </div>
          <span style={{ fontWeight: 600, fontSize: '15px', letterSpacing: '-0.01em' }}>
            MY VAULT
          </span>
          <span className="wf-badge">WIREFRAME 02 / 09</span>
        </div>
        <div style={{ fontSize: '12px', color: 'var(--wf-text-muted)', fontFamily: 'var(--wf-font-mono)' }}>
          STEP: TWO-FACTOR CHALLENGE
        </div>
      </header>

      {/* Main Centered 2FA Card */}
      <div style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 20px',
        backgroundColor: 'var(--wf-surface-subtle)'
      }}>
        <div style={{ width: '440px' }} className="wf-box">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
            <span className="wf-badge active">[ SECURITY 2FA ]</span>
          </div>

          <h2 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '6px' }}>
            Two-Factor Authentication
          </h2>
          <p style={{ fontSize: '13px', color: 'var(--wf-text-muted)', marginBottom: '24px', lineHeight: 1.5 }}>
            To protect your digital continuity vault, enter the 6-digit cryptographic verification code sent to your registered authenticator device.
          </p>

          <label style={{ display: 'block', fontSize: '12px', fontWeight: 500, marginBottom: '8px' }}>
            Verification Code
          </label>

          {/* 6 Discrete Wireframe Code Boxes */}
          <div style={{ display: 'flex', gap: '8px', marginBottom: '24px' }}>
            {code.map((digit, idx) => (
              <div
                key={idx}
                style={{
                  flex: 1,
                  height: '48px',
                  border: '1.5px solid var(--wf-border-strong)',
                  borderRadius: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '20px',
                  fontWeight: 600,
                  fontFamily: 'var(--wf-font-mono)',
                  backgroundColor: 'var(--wf-surface)'
                }}
              >
                {digit}
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              onClick={onPrev}
              className="wf-btn wf-btn-outline"
              style={{ flex: 1 }}
            >
              ← Back
            </button>
            <button
              onClick={onNext}
              className="wf-btn wf-btn-black"
              style={{ flex: 2 }}
            >
              Verify Code & Enter Vault →
            </button>
          </div>

          <div style={{
            marginTop: '16px',
            paddingTop: '12px',
            borderTop: '1px solid var(--wf-border)',
            textAlign: 'center',
            fontSize: '12px',
            color: 'var(--wf-text-muted)'
          }}>
            Didn't receive code? <span style={{ textDecoration: 'underline', cursor: 'pointer' }}>Resend via SMS fallback</span>
          </div>

          {showAnnotations && (
            <div className="wf-annotation">
              <strong>[UX NOTE - SCREEN 02]:</strong> 2FA is mandatory for digital continuity. Because nominee access rules control lifetime privacy, owner identity requires multi-factor cryptographic challenges before viewing or editing access rules.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

