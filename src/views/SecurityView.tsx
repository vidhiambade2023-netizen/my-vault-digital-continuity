import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Key, 
  Smartphone, 
  Laptop, 
  Lock, 
  CheckCircle2, 
  AlertTriangle, 
  Trash2,
  Fingerprint
} from 'lucide-react';
import { SecuritySession } from '../../types';
import { Badge } from '../components/common/Badge';

interface SecurityViewProps {
  sessions: SecuritySession[];
  onRevokeSession: (sessionId: string) => void;
}

export const SecurityView: React.FC<SecurityViewProps> = ({
  sessions,
  onRevokeSession
}) => {
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);
  const [passkeys, setPasskeys] = useState([
    { id: 'pk-1', name: 'MacBook Pro Touch ID', created: 'Oct 12, 2026', type: 'Apple Secure Enclave' },
    { id: 'pk-2', name: 'YubiKey 5C NFC', created: 'Aug 24, 2026', type: 'FIDO2 Hardware Token' }
  ]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      {/* Page Title */}
      <div>
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '32px', fontWeight: 400, margin: '0 0 6px', color: 'var(--color-primary-black)', letterSpacing: '-0.02em' }}>
          Security & 2FA
        </h1>
        <p style={{ fontSize: '13.5px', color: 'var(--color-secondary-text)', margin: 0, maxWidth: '640px' }}>
          Hardware passkeys, multi-factor authentication, and zero-knowledge cryptographic safeguards protecting your vault.
        </p>
      </div>

      {/* Sovereignty Status Card */}
      <div style={{
        backgroundColor: 'var(--color-white)',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-lg)',
        padding: '24px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '20px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: 'var(--radius-md)',
            backgroundColor: '#EDF7EE',
            color: '#16A34A',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0
          }}>
            <ShieldCheck size={22} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '3px' }}>
              <h2 style={{ fontSize: '16px', fontWeight: 700, margin: 0, color: 'var(--color-primary-black)' }}>
                Vault Sovereignty: Enforced
              </h2>
              <Badge variant="verified" size="sm">Active Owner Control</Badge>
            </div>
            <p style={{ fontSize: '12.5px', color: 'var(--color-secondary-text)', margin: 0 }}>
              End-to-end cryptographic isolation guarantees nominees cannot inspect or unlock your files during your lifetime.
            </p>
          </div>
        </div>

        <div style={{ textAlign: 'right', flexShrink: 0 }}>
          <span style={{ fontSize: '11px', color: 'var(--color-secondary-text)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Heartbeat Check</span>
          <div style={{ fontSize: '12.5px', color: '#16A34A', fontWeight: 600, marginTop: '1px' }}>
            Verified Today
          </div>
        </div>
      </div>

      {/* Two-Factor Authentication & Passkeys (Equal Heights) */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '20px',
        alignItems: 'stretch'
      }}>
        {/* 2FA Status */}
        <div style={{
          backgroundColor: 'var(--color-white)',
          border: '1px solid var(--color-border)',
          borderRadius: 'var(--radius-lg)',
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          height: '100%'
        }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Key size={16} style={{ color: 'var(--color-primary-black)' }} />
                <h3 style={{ fontSize: '15px', fontWeight: 700, margin: 0 }}>Two-Factor Authentication</h3>
              </div>
              <Badge variant={twoFactorEnabled ? 'verified' : 'pending'} size="sm">
                {twoFactorEnabled ? 'Active' : 'Disabled'}
              </Badge>
            </div>
            <p style={{ fontSize: '12.5px', color: 'var(--color-secondary-text)', lineHeight: 1.5, marginBottom: '16px' }}>
              Requires hardware passkey confirmation or TOTP authenticator token whenever opening sensitive continuity settings.
            </p>
          </div>

          <button
            onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
            className="btn-secondary"
            style={{ alignSelf: 'flex-start', fontSize: '12px' }}
          >
            {twoFactorEnabled ? 'Reconfigure 2FA' : 'Enable 2FA Protection'}
          </button>
        </div>

        {/* Hardware Passkeys */}
        <div style={{
          backgroundColor: 'var(--color-white)',
          border: '1px solid var(--color-border)',
          borderRadius: 'var(--radius-lg)',
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          height: '100%'
        }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Fingerprint size={16} style={{ color: 'var(--color-primary-black)' }} />
                <h3 style={{ fontSize: '15px', fontWeight: 700, margin: 0 }}>Hardware Passkeys ({passkeys.length})</h3>
              </div>
              <span style={{ fontSize: '11px', color: 'var(--color-secondary-text)' }}>FIDO2 Bound</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {passkeys.map(pk => (
                <div
                  key={pk.id}
                  style={{
                    padding: '8px 12px',
                    borderRadius: 'var(--radius-sm)',
                    backgroundColor: 'var(--color-off-white)',
                    border: '1px solid var(--color-border-subtle)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <div>
                    <div style={{ fontSize: '12.5px', fontWeight: 600 }}>{pk.name}</div>
                    <div style={{ fontSize: '11px', color: 'var(--color-secondary-text)' }}>{pk.type} • Added {pk.created}</div>
                  </div>
                  <CheckCircle2 size={14} style={{ color: '#16A34A' }} />
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => {
              if (passkeys.some(p => p.name.includes('Titan'))) return;
              const newPk = {
                id: `pk-${Date.now()}`,
                name: 'Titan Security Key (NFC)',
                created: 'Today',
                type: 'FIDO2 Hardware Authenticator'
              };
              setPasskeys(prev => [...prev, newPk]);
            }}
            className="btn-secondary"
            style={{ alignSelf: 'flex-start', fontSize: '12px', marginTop: '14px' }}
          >
            <span>+ Enroll Demo Passkey</span>
          </button>
        </div>
      </div>

      {/* Active Login Sessions */}
      <div style={{
        backgroundColor: 'var(--color-white)',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-lg)',
        padding: '24px'
      }}>
        <div style={{ marginBottom: '16px' }}>
          <h3 style={{ fontSize: '15px', fontWeight: 700, margin: 0, color: 'var(--color-primary-black)' }}>
            Active Login Sessions ({sessions.length})
          </h3>
          <p style={{ fontSize: '12px', color: 'var(--color-secondary-text)', margin: '3px 0 0' }}>
            Devices currently authorized to administer this vault. Revoke any unrecognized sessions immediately.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {sessions.map(sess => (
            <div
              key={sess.id}
              style={{
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-md)',
                padding: '12px 16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                backgroundColor: sess.isCurrent ? '#F9FDF9' : 'var(--color-white)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{
                  width: '34px',
                  height: '34px',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: sess.isCurrent ? '#EDF7EE' : 'var(--color-pale-blue-grey)',
                  color: sess.isCurrent ? '#16A34A' : 'var(--color-primary-black)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  {sess.device.includes('iPhone') ? <Smartphone size={16} /> : <Laptop size={16} />}
                </div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '13.5px', fontWeight: 600, color: 'var(--color-primary-black)' }}>
                      {sess.device} — {sess.browser}
                    </span>
                    {sess.isCurrent && (
                      <Badge variant="verified" size="sm">Current Device</Badge>
                    )}
                  </div>
                  <div style={{ fontSize: '11.5px', color: 'var(--color-secondary-text)', marginTop: '2px' }}>
                    {sess.location} • IP: {sess.ipAddress} • Last active {sess.lastActive}
                  </div>
                </div>
              </div>

              {!sess.isCurrent && (
                <button
                  onClick={() => onRevokeSession(sess.id)}
                  className="btn-ghost"
                  style={{ color: '#DC2626', fontSize: '11.5px' }}
                >
                  Revoke Session
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
