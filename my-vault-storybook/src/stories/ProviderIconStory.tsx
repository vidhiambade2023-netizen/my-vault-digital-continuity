import React, { useState } from 'react';
import { ProviderIcon } from '@app/components/common/ProviderIcon';

export const ProviderIconStory: React.FC = () => {
  const [iconSize, setIconSize] = useState<number>(22);
  const [showBg, setShowBg] = useState<boolean>(true);

  const providers = [
    { slug: 'google', name: 'Google Workspace', desc: 'Drive, Gmail, Photos, Calendar' },
    { slug: 'apple', name: 'Apple iCloud', desc: 'iCloud Drive, Photos, Keychain, Notes' },
    { slug: 'microsoft', name: 'Microsoft 365', desc: 'OneDrive, Outlook, Azure AD' },
    { slug: 'dropbox', name: 'Dropbox', desc: 'Core Cloud API, Shared folders' },
    { slug: 'instagram', name: 'Instagram', desc: 'Meta Graph API, Media feed' },
    { slug: 'facebook', name: 'Facebook & Meta', desc: 'Meta Legacy Contact API' }
  ];

  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '26px', fontWeight: 400, color: '#0B0B0D', marginBottom: '6px' }}>
          Provider Icon System
        </h2>
        <p style={{ fontSize: '13px', color: 'var(--color-secondary-text)' }}>
          Standardized SVG logos for third-party cloud and social identity connectors.
        </p>
      </div>

      {/* Grid of Providers */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '16px',
        marginBottom: '32px'
      }}>
        {providers.map((p) => (
          <div
            key={p.slug}
            style={{
              backgroundColor: '#FFFFFF',
              border: '1px solid #E1E2E5',
              borderRadius: '8px',
              padding: '20px',
              display: 'flex',
              alignItems: 'center',
              gap: '14px'
            }}
          >
            <div style={{
              width: `${Math.max(iconSize + 16, 40)}px`,
              height: `${Math.max(iconSize + 16, 40)}px`,
              borderRadius: '8px',
              backgroundColor: showBg ? '#E7EAF0' : 'transparent',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              <ProviderIcon slug={p.slug} size={iconSize} />
            </div>
            <div>
              <div style={{ fontWeight: 600, fontSize: '13.5px', color: '#0B0B0D' }}>{p.name}</div>
              <div style={{ fontSize: '11.5px', color: '#737680', marginTop: '2px' }}>{p.desc}</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#2563EB', marginTop: '4px' }}>
                slug="{p.slug}"
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Controls */}
      <section className="sb-panel" style={{ borderRadius: '8px', border: '1px solid #E1E2E5' }}>
        <h4 style={{ fontSize: '13px', fontWeight: 600, marginBottom: '12px' }}>Icon Knobs</h4>
        <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
          <div>
            <label style={{ fontSize: '12px', fontWeight: 500, display: 'block', marginBottom: '4px' }}>
              Size: {iconSize}px
            </label>
            <input
              type="range"
              min="16"
              max="48"
              value={iconSize}
              onChange={(e) => setIconSize(Number(e.target.value))}
              style={{ width: '200px' }}
            />
          </div>

          <label style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '12.5px', cursor: 'pointer', marginTop: '16px' }}>
            <input type="checkbox" checked={showBg} onChange={(e) => setShowBg(e.target.checked)} />
            <span>Show rounded background tile (--color-pale-blue-grey)</span>
          </label>
        </div>

        <div style={{ marginTop: '20px' }}>
          <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--sb-text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            TSX Usage Code Snippet
          </div>
          <pre className="sb-code-block">{`<ProviderIcon slug="google" size={${iconSize}} />`}</pre>
        </div>
      </section>
    </div>
  );
};
