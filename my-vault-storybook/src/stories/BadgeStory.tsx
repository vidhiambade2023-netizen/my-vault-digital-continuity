import React, { useState } from 'react';
import { Badge } from '@app/components/common/Badge';

export const BadgeStory: React.FC = () => {
  const [variant, setVariant] = useState<'connected' | 'unlinked' | 'verified' | 'pending' | 'active' | 'neutral'>('connected');
  const [size, setSize] = useState<'sm' | 'md'>('sm');
  const [customText, setCustomText] = useState('Connected');

  const allBadges: Array<{ variant: any; label: string; context: string }> = [
    { variant: 'connected', label: 'Connected', context: 'Authorized cloud providers with active metadata scopes' },
    { variant: 'unlinked', label: 'Unlinked', context: 'Platforms in catalog not yet participating in vault' },
    { variant: 'verified', label: 'Email Verified', context: 'Nominee who completed email challenge' },
    { variant: 'pending', label: 'Pending Verification', context: 'Nominee awaiting verification code' },
    { variant: 'active', label: 'Owner Active', context: 'Live owner heartbeat session' },
    { variant: 'neutral', label: 'Standby (Lifetime)', context: 'Dormant continuity access mode' }
  ];

  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '26px', fontWeight: 400, color: '#0B0B0D', marginBottom: '6px' }}>
          Status Badge Component
        </h2>
        <p style={{ fontSize: '13px', color: 'var(--color-secondary-text)' }}>
          Minimal status pills communicating sovereign security status, connection state, and nominee verification.
        </p>
      </div>

      {/* Live Playground */}
      <div style={{
        padding: '36px',
        backgroundColor: '#FFFFFF',
        border: '1px solid #E1E2E5',
        borderRadius: '8px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '140px',
        marginBottom: '28px'
      }}>
        <Badge variant={variant} size={size}>
          {customText}
        </Badge>
      </div>

      {/* Full Badge Matrix */}
      <section style={{ marginBottom: '32px' }}>
        <h3 style={{ fontSize: '13.5px', fontWeight: 600, color: '#0B0B0D', marginBottom: '14px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
          Complete Status Matrix
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '14px' }}>
          {allBadges.map((b) => (
            <div
              key={b.variant}
              style={{
                backgroundColor: '#FFFFFF',
                border: '1px solid #E1E2E5',
                borderRadius: '8px',
                padding: '16px',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Badge variant={b.variant} size="sm">
                  {b.label}
                </Badge>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#737680' }}>
                  {b.variant}
                </span>
              </div>
              <div style={{ fontSize: '11.5px', color: '#737680', lineHeight: 1.4 }}>
                {b.context}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Interactive Controls Panel */}
      <section className="sb-panel" style={{ borderRadius: '8px', border: '1px solid #E1E2E5' }}>
        <h4 style={{ fontSize: '13px', fontWeight: 600, marginBottom: '12px' }}>Interactive Controls (Knobs)</h4>
        <table className="sb-controls-table">
          <thead>
            <tr>
              <th>Property</th>
              <th>Type</th>
              <th>Control / Value</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><span className="sb-prop-name">label</span></td>
              <td><span className="sb-prop-type">string</span></td>
              <td>
                <input
                  type="text"
                  value={customText}
                  onChange={(e) => setCustomText(e.target.value)}
                  style={{ padding: '5px 8px', border: '1px solid #D1D5DB', borderRadius: '4px', fontSize: '12px', width: '200px' }}
                />
              </td>
            </tr>
            <tr>
              <td><span className="sb-prop-name">variant</span></td>
              <td><span className="sb-prop-type">'connected' | 'unlinked' | 'verified' | 'pending' | 'active' | 'inactive'</span></td>
              <td>
                <select
                  value={variant}
                  onChange={(e) => {
                    const val = e.target.value as any;
                    setVariant(val);
                    if (val === 'connected') setCustomText('Connected');
                    else if (val === 'unlinked') setCustomText('Unlinked');
                    else if (val === 'verified') setCustomText('Email Verified');
                    else if (val === 'pending') setCustomText('Pending Verification');
                    else if (val === 'active') setCustomText('Owner Active');
                    else if (val === 'inactive') setCustomText('Standby (Lifetime)');
                  }}
                  style={{ padding: '5px 8px', border: '1px solid #D1D5DB', borderRadius: '4px', fontSize: '12px' }}
                >
                  <option value="connected">connected</option>
                  <option value="unlinked">unlinked</option>
                  <option value="verified">verified</option>
                  <option value="pending">pending</option>
                  <option value="active">active</option>
                  <option value="inactive">inactive</option>
                </select>
              </td>
            </tr>
            <tr>
              <td><span className="sb-prop-name">size</span></td>
              <td><span className="sb-prop-type">'sm' | 'md'</span></td>
              <td>
                <select
                  value={size}
                  onChange={(e) => setSize(e.target.value as any)}
                  style={{ padding: '5px 8px', border: '1px solid #D1D5DB', borderRadius: '4px', fontSize: '12px' }}
                >
                  <option value="sm">sm</option>
                  <option value="md">md</option>
                </select>
              </td>
            </tr>
          </tbody>
        </table>

        <div style={{ marginTop: '20px' }}>
          <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--sb-text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            TSX Usage Code Snippet
          </div>
          <pre className="sb-code-block">{`<Badge variant="${variant}" size="${size}">
  ${customText}
</Badge>`}</pre>
        </div>
      </section>
    </div>
  );
};
