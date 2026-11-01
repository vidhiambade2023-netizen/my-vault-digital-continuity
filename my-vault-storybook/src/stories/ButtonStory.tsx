import React, { useState } from 'react';
import { Plus, ArrowRight, Trash2, Sliders, Check } from 'lucide-react';

export const ButtonStory: React.FC = () => {
  const [buttonText, setButtonText] = useState('Connect service');
  const [variant, setVariant] = useState<'primary' | 'secondary' | 'danger' | 'outline'>('primary');
  const [size, setSize] = useState<'sm' | 'md' | 'lg'>('md');
  const [hasIcon, setHasIcon] = useState(true);
  const [disabled, setDisabled] = useState(false);

  const getButtonStyles = () => {
    let padding = '8px 16px';
    let fontSize = '13px';
    if (size === 'sm') {
      padding = '5px 12px';
      fontSize = '12px';
    } else if (size === 'lg') {
      padding = '11px 22px';
      fontSize = '14.5px';
    }

    let bg = '#0B0B0D';
    let color = '#FFFFFF';
    let border = 'none';

    if (variant === 'secondary') {
      bg = '#E7EAF0';
      color = '#0B0B0D';
    } else if (variant === 'danger') {
      bg = '#DC2626';
      color = '#FFFFFF';
    } else if (variant === 'outline') {
      bg = 'transparent';
      color = '#0B0B0D';
      border = '1px solid #E1E2E5';
    }

    return {
      padding,
      fontSize,
      backgroundColor: bg,
      color,
      border,
      borderRadius: '8px',
      fontWeight: 500,
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.5 : 1,
      display: 'inline-flex',
      alignItems: 'center',
      gap: '8px',
      transition: 'all 0.15s ease'
    };
  };

  const codeSnippet = `<button
  className="btn-${variant}"
  ${disabled ? 'disabled' : ''}
  style={{ padding: '${size === 'sm' ? '5px 12px' : size === 'lg' ? '11px 22px' : '8px 16px'}' }}
>
  ${hasIcon ? '<Plus size={15} />\n  ' : ''}<span>${buttonText}</span>
</button>`;

  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '26px', fontWeight: 400, color: '#0B0B0D', marginBottom: '6px' }}>
          Button Component
        </h2>
        <p style={{ fontSize: '13px', color: 'var(--color-secondary-text)' }}>
          High-fidelity tactile button styles supporting sovereign CTAs, secondary filters, and destructive safety confirmations.
        </p>
      </div>

      {/* Live Interactive Playground Canvas */}
      <div style={{
        padding: '48px 32px',
        backgroundColor: '#FFFFFF',
        border: '1px solid #E1E2E5',
        borderRadius: '8px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '180px',
        marginBottom: '28px'
      }}>
        <button
          style={getButtonStyles()}
          disabled={disabled}
          onClick={() => alert(`Clicked "${buttonText}"`)}
        >
          {hasIcon && (
            variant === 'danger' ? <Trash2 size={size === 'sm' ? 13 : 15} /> :
            variant === 'secondary' ? <Sliders size={size === 'sm' ? 13 : 15} /> :
            <Plus size={size === 'sm' ? 13 : 15} />
          )}
          <span>{buttonText}</span>
        </button>
      </div>

      {/* Static Matrix of All Standard Variants */}
      <section style={{ marginBottom: '32px' }}>
        <h3 style={{ fontSize: '13.5px', fontWeight: 600, color: '#0B0B0D', marginBottom: '14px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
          Standard Button Variations
        </h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center' }}>
          <button className="btn-primary" style={{ padding: '8px 16px' }}>
            <Plus size={15} />
            <span>Primary CTA</span>
          </button>

          <button className="btn-secondary" style={{ padding: '8px 16px' }}>
            <span>Secondary Action</span>
            <ArrowRight size={14} />
          </button>

          <button style={{
            backgroundColor: '#DC2626',
            color: '#FFFFFF',
            padding: '8px 16px',
            borderRadius: '8px',
            fontSize: '13px',
            fontWeight: 500,
            border: 'none',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            cursor: 'pointer'
          }}>
            <Trash2 size={14} />
            <span>Destructive Action</span>
          </button>

          <button style={{
            backgroundColor: 'transparent',
            color: '#0B0B0D',
            padding: '7px 14px',
            borderRadius: '8px',
            fontSize: '13px',
            fontWeight: 500,
            border: '1px solid #E1E2E5',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            cursor: 'pointer'
          }}>
            <span>Outline Button</span>
          </button>

          <button className="btn-primary" disabled style={{ padding: '8px 16px', opacity: 0.4, cursor: 'not-allowed' }}>
            <span>Disabled State</span>
          </button>
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
                  value={buttonText}
                  onChange={(e) => setButtonText(e.target.value)}
                  style={{ padding: '5px 8px', border: '1px solid #D1D5DB', borderRadius: '4px', fontSize: '12px', width: '220px' }}
                />
              </td>
            </tr>
            <tr>
              <td><span className="sb-prop-name">variant</span></td>
              <td><span className="sb-prop-type">'primary' | 'secondary' | 'danger' | 'outline'</span></td>
              <td>
                <select
                  value={variant}
                  onChange={(e) => setVariant(e.target.value as any)}
                  style={{ padding: '5px 8px', border: '1px solid #D1D5DB', borderRadius: '4px', fontSize: '12px' }}
                >
                  <option value="primary">primary</option>
                  <option value="secondary">secondary</option>
                  <option value="danger">danger</option>
                  <option value="outline">outline</option>
                </select>
              </td>
            </tr>
            <tr>
              <td><span className="sb-prop-name">size</span></td>
              <td><span className="sb-prop-type">'sm' | 'md' | 'lg'</span></td>
              <td>
                <select
                  value={size}
                  onChange={(e) => setSize(e.target.value as any)}
                  style={{ padding: '5px 8px', border: '1px solid #D1D5DB', borderRadius: '4px', fontSize: '12px' }}
                >
                  <option value="sm">sm (12px)</option>
                  <option value="md">md (13px)</option>
                  <option value="lg">lg (14.5px)</option>
                </select>
              </td>
            </tr>
            <tr>
              <td><span className="sb-prop-name">hasIcon</span></td>
              <td><span className="sb-prop-type">boolean</span></td>
              <td>
                <label style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '12.5px', cursor: 'pointer' }}>
                  <input type="checkbox" checked={hasIcon} onChange={(e) => setHasIcon(e.target.checked)} />
                  <span>Show icon prefix</span>
                </label>
              </td>
            </tr>
            <tr>
              <td><span className="sb-prop-name">disabled</span></td>
              <td><span className="sb-prop-type">boolean</span></td>
              <td>
                <label style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '12.5px', cursor: 'pointer' }}>
                  <input type="checkbox" checked={disabled} onChange={(e) => setDisabled(e.target.checked)} />
                  <span>Disable button</span>
                </label>
              </td>
            </tr>
          </tbody>
        </table>

        <div style={{ marginTop: '20px' }}>
          <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--sb-text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            TSX Usage Code Snippet
          </div>
          <pre className="sb-code-block">{codeSnippet}</pre>
        </div>
      </section>
    </div>
  );
};

