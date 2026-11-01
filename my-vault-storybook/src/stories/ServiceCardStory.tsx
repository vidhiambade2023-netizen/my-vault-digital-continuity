import React, { useState } from 'react';
import { ProviderIcon } from '@app/components/common/ProviderIcon';
import { Badge } from '@app/components/common/Badge';
import { Sliders } from 'lucide-react';

export const ServiceCardStory: React.FC = () => {
  const [isConnected, setIsConnected] = useState(true);
  const [provider, setProvider] = useState<'google' | 'apple' | 'microsoft' | 'dropbox' | 'instagram' | 'facebook'>('google');
  const [email, setEmail] = useState('vidhi.ambade@gmail.com');
  const [categoriesCount, setCategoriesCount] = useState(3);

  const providerNames: Record<string, { name: string; auth: string }> = {
    google: { name: 'Google Workspace', auth: 'Google Identity Services (OAuth 2.0)' },
    apple: { name: 'Apple iCloud', auth: 'Apple ID Sign In (Legacy Contact Compatible)' },
    microsoft: { name: 'Microsoft 365', auth: 'Microsoft Entra ID (Graph API OAuth)' },
    dropbox: { name: 'Dropbox', auth: 'Dropbox Core API (Scoped App Access)' },
    instagram: { name: 'Instagram', auth: 'Meta Graph API (Instagram Basic Display)' },
    facebook: { name: 'Facebook & Meta', auth: 'Meta Legacy Contact API' }
  };

  const currentProvider = providerNames[provider];

  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '26px', fontWeight: 400, color: '#0B0B0D', marginBottom: '6px' }}>
          Service Connector Card
        </h2>
        <p style={{ fontSize: '13px', color: 'var(--color-secondary-text)' }}>
          Standardized card showcasing third-party platform connection status, eligible continuity scope count, and zero-knowledge locks.
        </p>
      </div>

      {/* Live Interactive Card */}
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '32px' }}>
        <div style={{
          width: '360px',
          backgroundColor: '#FFFFFF',
          border: '1px solid #E1E2E5',
          borderRadius: '8px',
          padding: '18px 20px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          gap: '16px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
        }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
              <div style={{
                width: '38px',
                height: '38px',
                borderRadius: '8px',
                backgroundColor: '#E7EAF0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <ProviderIcon slug={provider} size={18} />
              </div>

              <Badge variant={isConnected ? 'connected' : 'unlinked'} size="sm">
                {isConnected ? 'Connected' : 'Unlinked'}
              </Badge>
            </div>

            <h3 style={{ fontSize: '14.5px', fontWeight: 600, margin: '0 0 4px', color: '#0B0B0D' }}>
              {currentProvider.name}
            </h3>
            <div style={{ fontSize: '12px', color: '#737680', marginBottom: '12px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {isConnected ? email : 'No account attached'}
            </div>

            <div style={{
              fontSize: '11.5px',
              color: '#737680',
              backgroundColor: '#F8F8F6',
              padding: '8px 10px',
              borderRadius: '6px',
              border: '1px solid #E1E2E5'
            }}>
              {isConnected ? (
                <span><strong>{categoriesCount}</strong> categories eligible • Zero-knowledge locks</span>
              ) : (
                <span>Not yet participating in continuity</span>
              )}
            </div>
          </div>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingTop: '10px',
            borderTop: '1px solid #E1E2E5'
          }}>
            <span style={{ fontSize: '11px', color: '#737680' }}>
              {currentProvider.auth}
            </span>

            {isConnected ? (
              <button
                className="btn-secondary"
                style={{ fontSize: '11.5px', padding: '4px 10px' }}
                onClick={() => alert('Open service detail modal')}
              >
                <Sliders size={12} />
                <span>Manage</span>
              </button>
            ) : (
              <button
                className="btn-primary"
                style={{ fontSize: '11.5px', padding: '4px 10px' }}
                onClick={() => setIsConnected(true)}
              >
                <span>Connect</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Knobs */}
      <section className="sb-panel" style={{ borderRadius: '8px', border: '1px solid #E1E2E5' }}>
        <h4 style={{ fontSize: '13px', fontWeight: 600, marginBottom: '12px' }}>Interactive Knobs</h4>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', alignItems: 'center' }}>
          <div>
            <label style={{ fontSize: '12px', fontWeight: 500, display: 'block', marginBottom: '4px' }}>
              Provider
            </label>
            <select
              value={provider}
              onChange={(e) => setProvider(e.target.value as any)}
              style={{ width: '100%', padding: '6px 8px', border: '1px solid #D1D5DB', borderRadius: '4px' }}
            >
              <option value="google">Google</option>
              <option value="apple">Apple</option>
              <option value="microsoft">Microsoft</option>
              <option value="dropbox">Dropbox</option>
              <option value="instagram">Instagram</option>
              <option value="facebook">Facebook</option>
            </select>
          </div>

          <div>
            <label style={{ fontSize: '12px', fontWeight: 500, display: 'block', marginBottom: '4px' }}>
              Status
            </label>
            <select
              value={isConnected ? 'connected' : 'unlinked'}
              onChange={(e) => setIsConnected(e.target.value === 'connected')}
              style={{ width: '100%', padding: '6px 8px', border: '1px solid #D1D5DB', borderRadius: '4px' }}
            >
              <option value="connected">Connected</option>
              <option value="unlinked">Unlinked</option>
            </select>
          </div>

          <div>
            <label style={{ fontSize: '12px', fontWeight: 500, display: 'block', marginBottom: '4px' }}>
              Account Email
            </label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ width: '100%', padding: '6px 8px', border: '1px solid #D1D5DB', borderRadius: '4px' }}
            />
          </div>

          <div>
            <label style={{ fontSize: '12px', fontWeight: 500, display: 'block', marginBottom: '4px' }}>
              Eligible Categories
            </label>
            <input
              type="number"
              value={categoriesCount}
              onChange={(e) => setCategoriesCount(Number(e.target.value))}
              style={{ width: '100%', padding: '6px 8px', border: '1px solid #D1D5DB', borderRadius: '4px' }}
            />
          </div>
        </div>
      </section>
    </div>
  );
};
