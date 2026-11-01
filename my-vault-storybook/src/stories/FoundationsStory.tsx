import React, { useState } from 'react';

export const FoundationsStory: React.FC = () => {
  const [copiedToken, setCopiedToken] = useState<string | null>(null);

  const colors = [
    { name: 'Primary Black', hex: '#0B0B0D', token: '--color-primary-black', role: 'Headings, primary CTA buttons, selected icons' },
    { name: 'Off-White', hex: '#F8F8F6', token: '--color-off-white', role: 'Primary page background, elevated neutral surface' },
    { name: 'Pale Blue-Grey', hex: '#E7EAF0', token: '--color-pale-blue-grey', role: 'Active navigation item fills, avatar backgrounds' },
    { name: 'Muted Blue-Grey', hex: '#A2AEC6', token: '--color-blue-grey', role: 'Border hover states, subtle brand accents' },
    { name: 'Secondary Text', hex: '#737680', token: '--color-secondary-text', role: 'Metadata, subtitles, descriptive labels' },
    { name: 'Border Default', hex: '#E1E2E5', token: '--color-border', role: 'Card outlines, column dividers, input borders' },
    { name: 'White', hex: '#FFFFFF', token: '--color-white', role: 'Card surface, topbar, sidebar fill' }
  ];

  const typography = [
    { role: 'Editorial Display', font: 'Instrument Serif, Georgia, serif', size: '34px', weight: '400', sample: 'Your digital life, organised.' },
    { role: 'Section Heading', font: 'Instrument Serif, Georgia, serif', size: '22px', weight: '400', sample: 'Connected services and continuity policies' },
    { role: 'Card Title / Emphasized', font: 'Inter, sans-serif', size: '14.5px', weight: '600', sample: 'Google Workspace • Sovereign Archives' },
    { role: 'Body Text', font: 'Inter, sans-serif', size: '13.5px', weight: '400', sample: 'Personal conversations and credentials remain cryptographically sealed.' },
    { role: 'Metadata & Badges', font: 'Inter, sans-serif', size: '11.5px', weight: '500', sample: 'STATUS: LIFETIME PRIVACY ACTIVE' },
    { role: 'Code & Hashes', font: 'JetBrains Mono, monospace', size: '11px', weight: '500', sample: 'SHA256: 8f4e2...e5cd115' }
  ];

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedToken(text);
    setTimeout(() => setCopiedToken(null), 2000);
  };

  return (
    <div>
      <div style={{ marginBottom: '28px' }}>
        <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '28px', fontWeight: 400, color: '#0B0B0D', marginBottom: '8px' }}>
          Foundations & Design Tokens
        </h2>
        <p style={{ fontSize: '13.5px', color: 'var(--color-secondary-text)', maxWidth: '640px', lineHeight: 1.6 }}>
          The foundational aesthetic of My Vault marries editorial restraint with sovereign security. Built around a strict, minimal monochromatic palette with muted slate-blue accents.
        </p>
      </div>

      {/* Color Palette Grid */}
      <section style={{ marginBottom: '36px' }}>
        <h3 style={{ fontSize: '14px', fontWeight: 600, color: '#0B0B0D', marginBottom: '14px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
          Color System
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '14px' }}>
          {colors.map((c) => (
            <div
              key={c.name}
              onClick={() => copyToClipboard(c.hex)}
              style={{
                backgroundColor: '#FFFFFF',
                border: '1px solid #E1E2E5',
                borderRadius: '8px',
                overflow: 'hidden',
                cursor: 'pointer',
                transition: 'transform 0.15s ease, box-shadow 0.15s ease'
              }}
              title="Click to copy HEX"
            >
              <div style={{ height: '72px', backgroundColor: c.hex, borderBottom: '1px solid #E1E2E5' }} />
              <div style={{ padding: '12px 14px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                  <span style={{ fontWeight: 600, fontSize: '13px', color: '#0B0B0D' }}>{c.name}</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#737680' }}>{c.hex}</span>
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#2563EB', marginBottom: '6px' }}>
                  {c.token}
                </div>
                <div style={{ fontSize: '11.5px', color: '#737680', lineHeight: 1.4 }}>
                  {c.role}
                </div>
              </div>
            </div>
          ))}
        </div>
        {copiedToken && (
          <div style={{ marginTop: '8px', fontSize: '12px', color: '#16A34A', fontWeight: 500 }}>
            ✓ Copied {copiedToken} to clipboard!
          </div>
        )}
      </section>

      {/* Typography Scale */}
      <section style={{ marginBottom: '36px' }}>
        <h3 style={{ fontSize: '14px', fontWeight: 600, color: '#0B0B0D', marginBottom: '14px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
          Typography Hierarchy
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {typography.map((t, idx) => (
            <div
              key={idx}
              style={{
                backgroundColor: '#FFFFFF',
                border: '1px solid #E1E2E5',
                borderRadius: '8px',
                padding: '16px 20px',
                display: 'flex',
                alignItems: 'baseline',
                justifyContent: 'space-between',
                gap: '24px'
              }}
            >
              <div style={{ width: '220px', flexShrink: 0 }}>
                <div style={{ fontSize: '12.5px', fontWeight: 600, color: '#0B0B0D' }}>{t.role}</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#737680', marginTop: '2px' }}>
                  {t.font.split(',')[0]} • {t.size} • {t.weight}
                </div>
              </div>
              <div style={{
                fontFamily: t.font,
                fontSize: t.size,
                fontWeight: t.weight as any,
                color: '#0B0B0D',
                flex: 1,
                lineHeight: 1.2
              }}>
                {t.sample}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Spacing & Radii */}
      <section>
        <h3 style={{ fontSize: '14px', fontWeight: 600, color: '#0B0B0D', marginBottom: '14px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
          Radii & Surface Elevation
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '14px' }}>
          <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E1E2E5', borderRadius: '4px', padding: '16px', textAlign: 'center' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', fontWeight: 600 }}>--radius-sm</div>
            <div style={{ fontSize: '11px', color: '#737680', marginTop: '4px' }}>4px (Buttons, badges)</div>
          </div>
          <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E1E2E5', borderRadius: '8px', padding: '16px', textAlign: 'center' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', fontWeight: 600 }}>--radius-md</div>
            <div style={{ fontSize: '11px', color: '#737680', marginTop: '4px' }}>8px (Cards, nav items)</div>
          </div>
          <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E1E2E5', borderRadius: '12px', padding: '16px', textAlign: 'center' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', fontWeight: 600 }}>--radius-lg</div>
            <div style={{ fontSize: '11px', color: '#737680', marginTop: '4px' }}>12px (Modals, overlays)</div>
          </div>
          <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E1E2E5', borderRadius: '9999px', padding: '16px', textAlign: 'center' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', fontWeight: 600 }}>--radius-full</div>
            <div style={{ fontSize: '11px', color: '#737680', marginTop: '4px' }}>Pills & Avatars</div>
          </div>
        </div>
      </section>
    </div>
  );
};

