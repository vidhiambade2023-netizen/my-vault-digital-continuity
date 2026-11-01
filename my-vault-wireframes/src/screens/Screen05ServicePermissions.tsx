import React, { useState } from 'react';

interface Screen05Props {
  onNext: () => void;
  onPrev: () => void;
  showAnnotations: boolean;
}

export const Screen05ServicePermissions: React.FC<Screen05Props> = ({
  onNext,
  onPrev,
  showAnnotations
}) => {
  const [categories, setCategories] = useState([
    {
      id: 'docs',
      name: 'Drive Documents & Research Files',
      desc: 'PDFs, Google Docs, spreadsheets, project folders.',
      checked: true,
      immutable: false
    },
    {
      id: 'photos',
      name: 'Google Photos & Media Archives',
      desc: 'High-resolution photo albums, camera uploads, creative videos.',
      checked: true,
      immutable: false
    },
    {
      id: 'calendar',
      name: 'Calendar & Important Event Timelines',
      desc: 'Milestone agendas, family calendars, contact entries.',
      checked: true,
      immutable: false
    },
    {
      id: 'chats',
      name: 'Gmail Messages & Google Chat Inboxes',
      desc: 'Private correspondence, personal emails, direct messages.',
      checked: false,
      immutable: true // Lifetime privacy invariant
    }
  ]);

  const toggleCategory = (id: string) => {
    setCategories(prev => prev.map(c => {
      if (c.immutable) return c; // Cannot toggle locked private categories
      if (c.id === id) return { ...c, checked: !c.checked };
      return c;
    }));
  };

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
          <button onClick={onPrev} className="wf-btn wf-btn-outline" style={{ padding: '4px 8px', fontSize: '11px' }}>
            ← Services Catalog
          </button>
          <span style={{ fontWeight: 600, fontSize: '15px' }}>
            Service Permissions: Google Workspace
          </span>
          <span className="wf-badge">WIREFRAME 05 / 09</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button onClick={onNext} className="wf-btn wf-btn-black" style={{ fontSize: '12px', padding: '5px 12px' }}>
            Confirm Connection →
          </button>
        </div>
      </header>

      {/* Main Body */}
      <div style={{ flex: 1, padding: '28px 40px', backgroundColor: 'var(--wf-surface-subtle)' }}>
        <div style={{ maxWidth: '820px', margin: '0 auto' }}>
          {/* Service Title Box */}
          <div className="wf-box" style={{ marginBottom: '18px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
              <div style={{
                width: '32px',
                height: '32px',
                border: '1.5px solid var(--wf-text-main)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700,
                fontSize: '13px'
              }}>
                [G]
              </div>
              <div>
                <h2 style={{ fontSize: '17px', fontWeight: 600 }}>Google Workspace (Connected Account)</h2>
                <div style={{ fontSize: '12px', color: 'var(--wf-text-muted)' }}>
                  OAuth Identity: vidhi.ambade@gmail.com • Simulated Provider Connection
                </div>
              </div>
            </div>

            <p style={{ fontSize: '13px', color: 'var(--wf-text-muted)', lineHeight: 1.5 }}>
              Review the data categories eligible for inclusion in your continuity catalog. Select which assets can be delegated to nominees in subsequent steps.
            </p>
          </div>

          {/* Category Permissions Checkboxes */}
          <div className="wf-box" style={{ marginBottom: '20px' }}>
            <h3 style={{ fontSize: '14px', fontWeight: 600, marginBottom: '4px' }}>
              Eligible Data Categories
            </h3>
            <p style={{ fontSize: '12px', color: 'var(--wf-text-muted)', marginBottom: '14px' }}>
              Unchecked categories will remain sealed. Private communications have permanent privacy locks.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {categories.map(cat => (
                <div
                  key={cat.id}
                  onClick={() => toggleCategory(cat.id)}
                  className={`wf-checkbox-label ${cat.checked ? 'selected' : ''}`}
                  style={{
                    opacity: cat.immutable ? 0.75 : 1,
                    backgroundColor: cat.immutable ? 'var(--wf-surface-muted)' : undefined,
                    cursor: cat.immutable ? 'not-allowed' : 'pointer'
                  }}
                >
                  <input
                    type="checkbox"
                    checked={cat.checked}
                    disabled={cat.immutable}
                    onChange={() => {}}
                  />
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{ fontWeight: 600, fontSize: '13px' }}>{cat.name}</span>
                      {cat.immutable ? (
                        <span className="wf-badge" style={{ color: '#DC2626', borderColor: '#FCA5A5' }}>
                          [LOCKED EXCLUSION]
                        </span>
                      ) : (
                        <span className="wf-badge verified">ELIGIBLE</span>
                      )}
                    </div>
                    <div style={{ fontSize: '11.5px', color: 'var(--wf-text-muted)', marginTop: '2px' }}>
                      {cat.desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action Bar */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <button onClick={onPrev} className="wf-btn wf-btn-outline">
              ← Cancel / Back to Catalog
            </button>
            <button onClick={onNext} className="wf-btn wf-btn-black">
              Confirm Connection & Save Permissions →
            </button>
          </div>

          {showAnnotations && (
            <div className="wf-annotation">
              <strong>[UX NOTE - SCREEN 05]:</strong> Crucial research insight from UEDP-5: users fear unrestricted digital access after death. By explicitly exposing granular categories (and visibly locking private chats by default), the prototype establishes psychological safety and trust.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

