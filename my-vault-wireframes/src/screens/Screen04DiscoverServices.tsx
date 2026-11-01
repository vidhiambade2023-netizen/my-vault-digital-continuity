import React, { useState } from 'react';

interface Screen04Props {
  onNext: () => void;
  onPrev: () => void;
  onSelectGoogle: () => void;
  showAnnotations: boolean;
}

export const Screen04DiscoverServices: React.FC<Screen04Props> = ({
  onNext,
  onPrev,
  onSelectGoogle,
  showAnnotations
}) => {
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState<'discover' | 'connected'>('discover');

  const services = [
    {
      id: 'google',
      name: 'Google Workspace',
      slug: 'google',
      desc: 'Google Drive documents, Google Photos archives, and Contacts calendar.',
      isEligible: true,
      popular: true
    },
    {
      id: 'apple',
      name: 'Apple iCloud',
      slug: 'apple',
      desc: 'iCloud Photos, Apple Notes archives, and synced documents.',
      isEligible: true,
      popular: true
    },
    {
      id: 'instagram',
      name: 'Instagram (Meta)',
      slug: 'instagram',
      desc: 'Media timeline posts, public reels, and profile follower archive.',
      isEligible: true,
      popular: false
    },
    {
      id: 'facebook',
      name: 'Facebook & Meta',
      slug: 'facebook',
      desc: 'Public timeline posts, albums, and memorialized profile export.',
      isEligible: true,
      popular: false
    }
  ];

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
            ← Dashboard
          </button>
          <span style={{ fontWeight: 600, fontSize: '15px' }}>
            Connect Services Catalog
          </span>
          <span className="wf-badge">WIREFRAME 04 / 09</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button onClick={onSelectGoogle} className="wf-btn wf-btn-black" style={{ fontSize: '12px', padding: '5px 12px' }}>
            Select Google & Continue →
          </button>
        </div>
      </header>

      {/* Main Body */}
      <div style={{ flex: 1, padding: '28px 40px', backgroundColor: 'var(--wf-surface-subtle)' }}>
        <div style={{ maxWidth: '980px', margin: '0 auto' }}>
          {/* Section Heading */}
          <div style={{ marginBottom: '20px' }}>
            <h1 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '6px' }}>
              Discover & Connect Digital Services
            </h1>
            <p style={{ fontSize: '13px', color: 'var(--wf-text-muted)' }}>
              Authorize zero-knowledge metadata connectors to designate future continuity archives.
            </p>
          </div>

          {/* Tabs: Your Services vs Discover */}
          <div style={{
            display: 'flex',
            gap: '8px',
            borderBottom: '1.5px solid var(--wf-border)',
            marginBottom: '20px'
          }}>
            <button
              onClick={() => setActiveTab('connected')}
              style={{
                padding: '8px 16px',
                background: 'transparent',
                border: 'none',
                borderBottom: activeTab === 'connected' ? '2.5px solid #111827' : '2.5px solid transparent',
                fontWeight: activeTab === 'connected' ? 600 : 400,
                color: activeTab === 'connected' ? 'var(--wf-text-main)' : 'var(--wf-text-muted)',
                cursor: 'pointer',
                fontSize: '13px'
              }}
            >
              Your Connected Services (3)
            </button>
            <button
              onClick={() => setActiveTab('discover')}
              style={{
                padding: '8px 16px',
                background: 'transparent',
                border: 'none',
                borderBottom: activeTab === 'discover' ? '2.5px solid #111827' : '2.5px solid transparent',
                fontWeight: activeTab === 'discover' ? 600 : 400,
                color: activeTab === 'discover' ? 'var(--wf-text-main)' : 'var(--wf-text-muted)',
                cursor: 'pointer',
                fontSize: '13px'
              }}
            >
              Discover & Connect Available Platforms (4)
            </button>
          </div>

          {/* Search Box */}
          <div style={{ marginBottom: '24px' }}>
            <input
              type="text"
              className="wf-input"
              placeholder="🔍 Search providers, e.g. Google, Apple, Instagram, Facebook..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ padding: '10px 14px', fontSize: '13px' }}
            />
          </div>

          {/* 4 Service Cards Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
            {services.map(s => {
              const isGoogle = s.id === 'google';
              return (
                <div
                  key={s.id}
                  className="wf-box"
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    minHeight: '160px',
                    borderColor: isGoogle ? '#111827' : 'var(--wf-border)',
                    backgroundColor: isGoogle ? 'var(--wf-surface)' : 'var(--wf-surface-subtle)'
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{
                          width: '32px',
                          height: '32px',
                          border: '1.5px solid var(--wf-border-strong)',
                          borderRadius: '4px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: 700,
                          fontSize: '12px',
                          backgroundColor: 'var(--wf-surface-muted)'
                        }}>
                          [{s.name.slice(0, 1)}]
                        </div>
                        <div>
                          <div style={{ fontWeight: 600, fontSize: '14px' }}>{s.name}</div>
                          <div style={{ fontSize: '11px', color: 'var(--wf-text-muted)' }}>OAuth 2.0 Protocol</div>
                        </div>
                      </div>
                      {isGoogle && <span className="wf-badge active">TEST TARGET</span>}
                    </div>

                    <p style={{ fontSize: '12.5px', color: 'var(--wf-text-muted)', marginBottom: '14px' }}>
                      {s.desc}
                    </p>
                  </div>

                  <div style={{
                    paddingTop: '10px',
                    borderTop: '1px solid var(--wf-border)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <span style={{ fontSize: '11px', color: 'var(--wf-text-muted)' }}>
                      Inviolable chat lock enforced
                    </span>
                    <button
                      onClick={isGoogle ? onSelectGoogle : onNext}
                      className={isGoogle ? "wf-btn wf-btn-black" : "wf-btn wf-btn-outline"}
                      style={{ fontSize: '12px', padding: '5px 14px' }}
                    >
                      {isGoogle ? 'Connect Google →' : 'Connect +'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {showAnnotations && (
            <div className="wf-annotation">
              <strong>[UX NOTE - SCREEN 04]:</strong> In this wireframe step, user selects "Google Workspace". The prompt emphasizes that connecting a provider does not expose credentials or hand over accounts—it only indexes data categories for selective delegation.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

