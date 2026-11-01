import React, { useState } from 'react';

interface Screen08Props {
  nomineeData: { name: string; email: string; relationship: string };
  onNext: () => void;
  onPrev: () => void;
  showAnnotations: boolean;
}

export const Screen08AssignAccess: React.FC<Screen08Props> = ({
  nomineeData,
  onNext,
  onPrev,
  showAnnotations
}) => {
  const [selectedGroups, setSelectedGroups] = useState<string[]>(['Photos & Memories']);
  const [selectedCategories, setSelectedCategories] = useState<{ [key: string]: boolean }>({
    'photos-download': true,
    'docs-export': true,
    'calendar-view': false,
    'chats-lock': false // locked
  });

  const toggleGroup = (groupName: string) => {
    setSelectedGroups(prev => 
      prev.includes(groupName) ? prev.filter(g => g !== groupName) : [...prev, groupName]
    );
  };

  const toggleCategory = (catKey: string) => {
    if (catKey === 'chats-lock') return; // Enforce immutable exclusion
    setSelectedCategories(prev => ({ ...prev, [catKey]: !prev[catKey] }));
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
            ← Nominee Info
          </button>
          <span style={{ fontWeight: 600, fontSize: '15px' }}>
            Assign & Review Access: {nomineeData.name}
          </span>
          <span className="wf-badge">WIREFRAME 08 / 09</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button onClick={onNext} className="wf-btn wf-btn-black" style={{ fontSize: '12px', padding: '5px 12px' }}>
            Confirm & Send Invitation →
          </button>
        </div>
      </header>

      {/* Main Body */}
      <div style={{ flex: 1, padding: '28px 40px', backgroundColor: 'var(--wf-surface-subtle)' }}>
        <div style={{ maxWidth: '880px', margin: '0 auto' }}>
          {/* Nominee Summary Header Box */}
          <div className="wf-box" style={{ marginBottom: '18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: '11.5px', color: 'var(--wf-text-muted)', marginBottom: '2px' }}>
                DESIGNATED NOMINEE:
              </div>
              <div style={{ fontSize: '16px', fontWeight: 600 }}>
                {nomineeData.name} <span style={{ fontSize: '13px', fontWeight: 400, color: 'var(--wf-text-muted)' }}>({nomineeData.relationship})</span>
              </div>
              <div style={{ fontSize: '12px', color: 'var(--wf-text-muted)' }}>
                {nomineeData.email} • Status: Pending Invitation Dispatch
              </div>
            </div>
            <span className="wf-badge verified">DELEGATION STEP 2 OF 2</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
            {/* Step 1: Select Groups or Services */}
            <div className="wf-box">
              <h3 style={{ fontSize: '13.5px', fontWeight: 600, marginBottom: '4px' }}>
                1. Select Groups or Services
              </h3>
              <p style={{ fontSize: '11.5px', color: 'var(--wf-text-muted)', marginBottom: '12px' }}>
                Choose pre-bundled groups or individual accounts for this nominee.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div
                  onClick={() => toggleGroup('Photos & Memories')}
                  className={`wf-checkbox-label ${selectedGroups.includes('Photos & Memories') ? 'selected' : ''}`}
                >
                  <input
                    type="checkbox"
                    checked={selectedGroups.includes('Photos & Memories')}
                    onChange={() => {}}
                  />
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '12.5px' }}>Group: Photos & Memories</div>
                    <div style={{ fontSize: '11px', color: 'var(--wf-text-muted)' }}>
                      Google Photos, Apple iCloud Photos (2 services)
                    </div>
                  </div>
                </div>

                <div
                  onClick={() => toggleGroup('Social Media')}
                  className={`wf-checkbox-label ${selectedGroups.includes('Social Media') ? 'selected' : ''}`}
                >
                  <input
                    type="checkbox"
                    checked={selectedGroups.includes('Social Media')}
                    onChange={() => {}}
                  />
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '12.5px' }}>Group: Social Media</div>
                    <div style={{ fontSize: '11px', color: 'var(--wf-text-muted)' }}>
                      Instagram, Facebook & Meta (2 services)
                    </div>
                  </div>
                </div>

                <div
                  onClick={() => toggleGroup('Google Drive Documents')}
                  className={`wf-checkbox-label ${selectedGroups.includes('Google Drive Documents') ? 'selected' : ''}`}
                >
                  <input
                    type="checkbox"
                    checked={selectedGroups.includes('Google Drive Documents')}
                    onChange={() => {}}
                  />
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '12.5px' }}>Individual: Google Drive Docs</div>
                    <div style={{ fontSize: '11px', color: 'var(--wf-text-muted)' }}>
                      Research docs, personal project archives
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 2: Fine-Grained Category Inclusions */}
            <div className="wf-box">
              <h3 style={{ fontSize: '13.5px', fontWeight: 600, marginBottom: '4px' }}>
                2. Data Category Checkboxes
              </h3>
              <p style={{ fontSize: '11.5px', color: 'var(--wf-text-muted)', marginBottom: '12px' }}>
                Fine-tune permissions for {nomineeData.name}.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div
                  onClick={() => toggleCategory('photos-download')}
                  className={`wf-checkbox-label ${selectedCategories['photos-download'] ? 'selected' : ''}`}
                >
                  <input
                    type="checkbox"
                    checked={selectedCategories['photos-download']}
                    onChange={() => {}}
                  />
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '12.5px' }}>Allow Photo Archive Download</div>
                    <div style={{ fontSize: '11px', color: 'var(--wf-text-muted)' }}>Full-resolution family album export</div>
                  </div>
                </div>

                <div
                  onClick={() => toggleCategory('docs-export')}
                  className={`wf-checkbox-label ${selectedCategories['docs-export'] ? 'selected' : ''}`}
                >
                  <input
                    type="checkbox"
                    checked={selectedCategories['docs-export']}
                    onChange={() => {}}
                  />
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '12.5px' }}>Allow Document Archive Export</div>
                    <div style={{ fontSize: '11px', color: 'var(--wf-text-muted)' }}>PDF and text document preservation</div>
                  </div>
                </div>

                <div
                  onClick={() => toggleCategory('calendar-view')}
                  className={`wf-checkbox-label ${selectedCategories['calendar-view'] ? 'selected' : ''}`}
                >
                  <input
                    type="checkbox"
                    checked={selectedCategories['calendar-view']}
                    onChange={() => {}}
                  />
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '12.5px' }}>Calendar & Milestone Access</div>
                    <div style={{ fontSize: '11px', color: 'var(--wf-text-muted)' }}>Timeline events and contact cards</div>
                  </div>
                </div>

                <div
                  className="wf-checkbox-label"
                  style={{ opacity: 0.7, backgroundColor: 'var(--wf-surface-muted)', cursor: 'not-allowed' }}
                >
                  <input type="checkbox" checked={false} disabled />
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '12.5px', color: '#DC2626' }}>
                      Private Direct Messages [LOCKED EXCLUSION]
                    </div>
                    <div style={{ fontSize: '11px', color: 'var(--wf-text-muted)' }}>
                      Inviolable privacy lock — permanently sealed
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Review Access Summary Box */}
          <div className="wf-box" style={{ marginBottom: '22px', backgroundColor: 'var(--wf-surface)' }}>
            <h3 style={{ fontSize: '14px', fontWeight: 600, marginBottom: '6px' }}>
              Access Review Summary
            </h3>
            <div style={{ fontSize: '12.5px', color: 'var(--wf-text-main)', lineHeight: 1.5 }}>
              Upon authorized continuity activation and verification:
              <ul style={{ marginLeft: '20px', marginTop: '6px', fontSize: '12px' }}>
                <li><strong>{nomineeData.name}</strong> will be granted read-only download access to <strong>{selectedGroups.length} assigned bundle(s)</strong>.</li>
                <li><strong>0 private message channels</strong> will be exposed.</li>
                <li>An immutable event will be recorded to your owner audit trail.</li>
              </ul>
            </div>
          </div>

          {/* Buttons */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <button onClick={onPrev} className="wf-btn wf-btn-outline">
              ← Back to Nominee Details
            </button>
            <button onClick={onNext} className="wf-btn wf-btn-black">
              Confirm and Send Invitation →
            </button>
          </div>

          {showAnnotations && (
            <div className="wf-annotation">
              <strong>[UX NOTE - SCREEN 08]:</strong> "Assign & Review" is the core delegation step. Testing in Round 1 revealed that showing an explicit summary of what is granted AND what is permanently excluded gives users confidence that they haven't accidentally shared private communications.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

