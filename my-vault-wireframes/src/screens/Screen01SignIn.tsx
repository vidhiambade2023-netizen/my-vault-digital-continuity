import React, { useState } from 'react';

interface Screen01Props {
  onNext: () => void;
  showAnnotations: boolean;
}

export const Screen01SignIn: React.FC<Screen01Props> = ({ onNext, showAnnotations }) => {
  const [email, setEmail] = useState('vidhi.ambade@university.edu');
  const [password, setPassword] = useState('••••••••••••');

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
          <span className="wf-badge">WIREFRAME 01 / 09</span>
        </div>
        <div style={{ fontSize: '12px', color: 'var(--wf-text-muted)', fontFamily: 'var(--wf-font-mono)' }}>
          STEP: AUTHENTICATION
        </div>
      </header>

      {/* Main Centered Auth Card */}
      <div style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 20px',
        backgroundColor: 'var(--wf-surface-subtle)'
      }}>
        <div style={{ width: '400px' }} className="wf-box">
          {/* Brand Placeholder Box */}
          <div style={{
            border: '1.5px dashed var(--wf-border-dashed)',
            padding: '16px',
            textAlign: 'center',
            marginBottom: '24px',
            backgroundColor: 'var(--wf-surface-muted)'
          }}>
            <div style={{ fontWeight: 700, fontSize: '16px', letterSpacing: '0.04em' }}>
              [ MY VAULT WORDMARK ]
            </div>
            <div style={{ fontSize: '11.5px', color: 'var(--wf-text-muted)', marginTop: '4px' }}>
              Digital Continuity & Legacy Protocol
            </div>
          </div>

          <h2 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '6px' }}>
            Owner Sign In
          </h2>
          <p style={{ fontSize: '13px', color: 'var(--wf-text-muted)', marginBottom: '20px' }}>
            Enter your sovereign credentials to access your continuity vault.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '22px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 500, marginBottom: '5px' }}>
                Email address
              </label>
              <input
                type="email"
                className="wf-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 500, marginBottom: '5px' }}>
                Vault Master Password
              </label>
              <input
                type="password"
                className="wf-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
              />
            </div>
          </div>

          <button
            onClick={onNext}
            className="wf-btn wf-btn-black"
            style={{ width: '100%', padding: '10px' }}
          >
            <span>Sign In →</span>
          </button>

          <div style={{
            marginTop: '16px',
            paddingTop: '12px',
            borderTop: '1px solid var(--wf-border)',
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: '11.5px',
            color: 'var(--wf-text-muted)'
          }}>
            <span>Recovery key required?</span>
            <span style={{ textDecoration: 'underline', cursor: 'pointer' }}>Use backup seed</span>
          </div>

          {showAnnotations && (
            <div className="wf-annotation">
              <strong>[UX NOTE - SCREEN 01]:</strong> Establishes clear ownership boundary. Vault credentials must be distinct from third-party social logins to reinforce sovereign trust.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

