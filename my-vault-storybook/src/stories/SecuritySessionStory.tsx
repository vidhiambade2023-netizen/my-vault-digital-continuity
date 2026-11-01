import React, { useState } from 'react';
import { ShieldCheck, Smartphone, Laptop, Key, Trash2, Plus, CheckCircle2 } from 'lucide-react';
import { Badge } from '@app/components/common/Badge';

export const SecuritySessionStory: React.FC = () => {
  const [sessions, setSessions] = useState([
    {
      id: 'sess-1',
      device: 'MacBook Pro 16" (M2 Max)',
      browser: 'Chrome 122.0',
      location: 'Ahmedabad, India',
      ipAddress: '14.139.122.45',
      lastActive: 'Active now',
      isCurrent: true
    },
    {
      id: 'sess-2',
      device: 'iPhone 15 Pro',
      browser: 'Safari iOS 17.4',
      location: 'Ahmedabad, India',
      ipAddress: '14.139.122.89',
      lastActive: '2 hours ago',
      isCurrent: false
    },
    {
      id: 'sess-3',
      device: 'iPad Pro 11"',
      browser: 'Safari iOS 17.3',
      location: 'Mumbai, India',
      ipAddress: '115.111.45.12',
      lastActive: '3 days ago',
      isCurrent: false
    }
  ]);

  const [passkeys, setPasskeys] = useState([
    { id: 'pk-1', name: 'MacBook Pro Touch ID', created: 'Oct 12, 2026', type: 'Apple Secure Enclave' },
    { id: 'pk-2', name: 'YubiKey 5C NFC', created: 'Aug 24, 2026', type: 'FIDO2 Hardware Token' }
  ]);

  const [revokedToast, setRevokedToast] = useState<string | null>(null);

  const revokeSession = (id: string, name: string) => {
    setSessions(prev => prev.filter(s => s.id !== id));
    setRevokedToast(`Session revoked: ${name}`);
    setTimeout(() => setRevokedToast(null), 3000);
  };

  const enrollDemoKey = () => {
    const id = `pk-${Date.now()}`;
    setPasskeys(prev => [
      ...prev,
      { id, name: 'Titan Security Key (NFC)', created: 'Today', type: 'FIDO2 Hardware Authenticator' }
    ]);
  };

  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '26px', fontWeight: 400, color: '#0B0B0D', marginBottom: '6px' }}>
          Security Sessions & Hardware Passkeys
        </h2>
        <p style={{ fontSize: '13px', color: '#737680' }}>
          Active hardware authenticators and authorized browser sessions. Demonstrates owner sovereignty controls and revocation actions.
        </p>
      </div>

      {revokedToast && (
        <div style={{
          backgroundColor: '#0B0B0D',
          color: '#FFFFFF',
          padding: '10px 16px',
          borderRadius: '6px',
          fontSize: '12px',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          marginBottom: '16px'
        }}>
          <CheckCircle2 size={14} style={{ color: '#22C55E' }} />
          <span>{revokedToast}</span>
        </div>
      )}

      {/* Sovereignty Status Card */}
      <div style={{
        backgroundColor: '#FFFFFF',
        border: '1px solid #E1E2E5',
        borderRadius: '8px',
        padding: '20px',
        marginBottom: '24px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '8px',
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
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
              <span style={{ fontSize: '15px', fontWeight: 600, color: '#0B0B0D' }}>
                Vault Sovereignty: Enforced
              </span>
              <Badge variant="verified" size="sm">Active Owner Control</Badge>
            </div>
            <p style={{ fontSize: '12.5px', color: '#737680', margin: 0 }}>
              End-to-end cryptographic isolation guarantees nominees cannot inspect or unlock your files during your lifetime.
            </p>
          </div>
        </div>

        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '10px', color: '#737680', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Heartbeat Check</div>
          <div style={{ fontSize: '12.5px', color: '#16A34A', fontWeight: 600, marginTop: '2px' }}>Verified Today</div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '24px' }}>
        {/* Passkeys List */}
        <div style={{
          backgroundColor: '#FFFFFF',
          border: '1px solid #E1E2E5',
          borderRadius: '8px',
          padding: '20px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
            <h3 style={{ fontSize: '14px', fontWeight: 600, color: '#0B0B0D', margin: 0 }}>
              Hardware Passkeys ({passkeys.length})
            </h3>
            <button
              onClick={enrollDemoKey}
              style={{
                fontSize: '11px',
                padding: '4px 8px',
                borderRadius: '4px',
                border: '1px solid #E1E2E5',
                backgroundColor: '#F8F8F6',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              <Plus size={11} />
              <span>Enroll Key</span>
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {passkeys.map(pk => (
              <div
                key={pk.id}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '10px 12px',
                  backgroundColor: '#F8F8F6',
                  borderRadius: '6px',
                  border: '1px solid #E7EAF0'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Key size={16} style={{ color: '#0B0B0D' }} />
                  <div>
                    <div style={{ fontSize: '12.5px', fontWeight: 600, color: '#0B0B0D' }}>{pk.name}</div>
                    <div style={{ fontSize: '11px', color: '#737680' }}>{pk.type} • Added {pk.created}</div>
                  </div>
                </div>
                <Badge variant="active" size="sm">FIDO2</Badge>
              </div>
            ))}
          </div>
        </div>

        {/* 2FA Summary */}
        <div style={{
          backgroundColor: '#FFFFFF',
          border: '1px solid #E1E2E5',
          borderRadius: '8px',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <h3 style={{ fontSize: '14px', fontWeight: 600, color: '#0B0B0D', margin: 0 }}>
                Two-Factor Authentication
              </h3>
              <Badge variant="verified" size="sm">Mandatory</Badge>
            </div>
            <p style={{ fontSize: '12px', color: '#737680', lineHeight: 1.5, margin: 0 }}>
              Multi-factor verification is required whenever logging into My Vault from an unrecognized network or browser session.
            </p>
          </div>

          <div style={{
            marginTop: '16px',
            padding: '12px',
            backgroundColor: '#F8F8F6',
            borderRadius: '6px',
            fontSize: '11.5px',
            color: '#737680',
            lineHeight: 1.45
          }}>
            Recovery codes are stored in your encrypted emergency recovery kit. Invariant fallback requires 2-of-3 quorum verification.
          </div>
        </div>
      </div>

      {/* Active Login Sessions */}
      <div style={{
        backgroundColor: '#FFFFFF',
        border: '1px solid #E1E2E5',
        borderRadius: '8px',
        padding: '20px'
      }}>
        <div style={{ marginBottom: '14px' }}>
          <h3 style={{ fontSize: '14px', fontWeight: 600, color: '#0B0B0D', margin: 0 }}>
            Active Login Sessions ({sessions.length})
          </h3>
          <p style={{ fontSize: '12px', color: '#737680', margin: '2px 0 0' }}>
            Authorized devices currently holding a valid decryption lease for this vault.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {sessions.map(sess => (
            <div
              key={sess.id}
              style={{
                border: '1px solid #E1E2E5',
                borderRadius: '6px',
                padding: '12px 14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                backgroundColor: sess.isCurrent ? '#F9FDF9' : '#FFFFFF'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '6px',
                  backgroundColor: sess.isCurrent ? '#EDF7EE' : '#E7EAF0',
                  color: sess.isCurrent ? '#16A34A' : '#0B0B0D',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  {sess.device.includes('iPhone') || sess.device.includes('iPad') ? (
                    <Smartphone size={16} />
                  ) : (
                    <Laptop size={16} />
                  )}
                </div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '13px', fontWeight: 600, color: '#0B0B0D' }}>
                      {sess.device} — {sess.browser}
                    </span>
                    {sess.isCurrent && (
                      <Badge variant="verified" size="sm">Current Device</Badge>
                    )}
                  </div>
                  <div style={{ fontSize: '11px', color: '#737680', marginTop: '2px' }}>
                    {sess.location} • IP: {sess.ipAddress} • {sess.lastActive}
                  </div>
                </div>
              </div>

              {!sess.isCurrent && (
                <button
                  onClick={() => revokeSession(sess.id, sess.device)}
                  style={{
                    fontSize: '11px',
                    color: '#DC2626',
                    backgroundColor: 'transparent',
                    border: '1px solid #FEE2E2',
                    borderRadius: '4px',
                    padding: '4px 10px',
                    cursor: 'pointer'
                  }}
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

