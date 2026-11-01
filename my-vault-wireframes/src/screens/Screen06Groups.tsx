import React, { useState } from 'react';

interface Screen06Props {
  onNext: () => void;
  onPrev: () => void;
  showAnnotations: boolean;
}

export const Screen06Groups: React.FC<Screen06Props> = ({
  onNext,
  onPrev,
  showAnnotations
}) => {
  const [groups, setGroups] = useState([
    {
      id: 'g-1',
      name: 'Social Media',
      description: 'Public profile posts, creative media updates, and follower archives.',
      services: ['Instagram', 'Facebook & Meta'],
      nomineeCount: 1
    },
    {
      id: 'g-2',
      name: 'Photos & Memories',
      description: 'Family albums, high-resolution photo archives, and travel memories.',
      services: ['Google Photos', 'Apple iCloud Photos'],
      nomineeCount: 2
    }
  ]);

  const [selectedServiceToAdd, setSelectedServiceToAdd] = useState('Google Drive');
  const [selectedGroupTarget, setSelectedGroupTarget] = useState('Photos & Memories');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newGroupName, setNewGroupName] = useState('');

  const handleAddServiceToGroup = () => {
    setGroups(prev => prev.map(g => {
      if (g.name === selectedGroupTarget && !g.services.includes(selectedServiceToAdd)) {
        return { ...g, services: [...g.services, selectedServiceToAdd] };
      }
      return g;
    }));
  };

  const handleCreateGroup = () => {
    if (!newGroupName.trim()) return;
    setGroups(prev => [
      ...prev,
      {
        id: `g-${Date.now()}`,
        name: newGroupName,
        description: 'Custom user continuity cluster.',
        services: [],
        nomineeCount: 0
      }
    ]);
    setNewGroupName('');
    setShowCreateModal(false);
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
            ← Permissions
          </button>
          <span style={{ fontWeight: 600, fontSize: '15px' }}>
            Service Groups Overview
          </span>
          <span className="wf-badge">WIREFRAME 06 / 09</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button onClick={onNext} className="wf-btn wf-btn-black" style={{ fontSize: '12px', padding: '5px 12px' }}>
            Continue to Add Nominee →
          </button>
        </div>
      </header>

      {/* Main Body */}
      <div style={{ flex: 1, padding: '28px 40px', backgroundColor: 'var(--wf-surface-subtle)' }}>
        <div style={{ maxWidth: '980px', margin: '0 auto' }}>
          {/* Section Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
            <div>
              <h1 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '6px' }}>
                Service Groups
              </h1>
              <p style={{ fontSize: '13px', color: 'var(--wf-text-muted)' }}>
                Organize related digital platforms into logical bundles for streamlined nominee delegation.
              </p>
            </div>
            <button
              onClick={() => setShowCreateModal(true)}
              className="wf-btn wf-btn-black"
              style={{ fontSize: '12.5px' }}
            >
              + Create Group
            </button>
          </div>

          {/* Simple Option to Add Connected Services to a Group */}
          <div className="wf-box" style={{ marginBottom: '22px', backgroundColor: 'var(--wf-surface)' }}>
            <h3 style={{ fontSize: '13.5px', fontWeight: 600, marginBottom: '10px' }}>
              Add Connected Service to an Existing Group
            </h3>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              <select
                className="wf-input"
                style={{ flex: 1 }}
                value={selectedServiceToAdd}
                onChange={(e) => setSelectedServiceToAdd(e.target.value)}
              >
                <option value="Google Drive">Service: Google Drive Documents</option>
                <option value="Google Photos">Service: Google Photos</option>
                <option value="Apple iCloud Drive">Service: Apple iCloud Drive</option>
                <option value="Instagram">Service: Instagram Feed</option>
              </select>

              <select
                className="wf-input"
                style={{ flex: 1 }}
                value={selectedGroupTarget}
                onChange={(e) => setSelectedGroupTarget(e.target.value)}
              >
                {groups.map(g => (
                  <option key={g.id} value={g.name}>Target Group: {g.name}</option>
                ))}
              </select>

              <button
                onClick={handleAddServiceToGroup}
                className="wf-btn wf-btn-outline"
                style={{ flexShrink: 0 }}
              >
                + Add to Group
              </button>
            </div>
          </div>

          {/* Groups Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', marginBottom: '24px' }}>
            {groups.map(g => (
              <div key={g.id} className="wf-box" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <h3 style={{ fontSize: '15px', fontWeight: 600 }}>{g.name}</h3>
                    <span className="wf-badge">{g.services.length} SERVICES</span>
                  </div>

                  <p style={{ fontSize: '12.5px', color: 'var(--wf-text-muted)', marginBottom: '14px' }}>
                    {g.description}
                  </p>

                  <div style={{ marginBottom: '14px' }}>
                    <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--wf-text-muted)', marginBottom: '6px' }}>
                      INCLUDED SERVICES:
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                      {g.services.map((svc, i) => (
                        <span key={i} className="wf-badge" style={{ backgroundColor: 'var(--wf-surface-subtle)' }}>
                          ✓ {svc}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div style={{
                  paddingTop: '10px',
                  borderTop: '1px solid var(--wf-border)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <span style={{ fontSize: '11px', color: 'var(--wf-text-muted)' }}>
                    {g.nomineeCount} nominee(s) assigned
                  </span>
                  <button className="wf-btn wf-btn-outline" style={{ fontSize: '11.5px', padding: '4px 8px' }}>
                    Manage Group
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Inline Modal Simulator for Create Group */}
          {showCreateModal && (
            <div className="wf-box" style={{ marginBottom: '20px', border: '2px solid #111827' }}>
              <h3 style={{ fontSize: '14px', fontWeight: 600, marginBottom: '8px' }}>
                Create New Service Group
              </h3>
              <div style={{ display: 'flex', gap: '10px' }}>
                <input
                  type="text"
                  className="wf-input"
                  placeholder="e.g. Financial & Banking Docs, Creative Archives..."
                  value={newGroupName}
                  onChange={(e) => setNewGroupName(e.target.value)}
                />
                <button onClick={handleCreateGroup} className="wf-btn wf-btn-black">
                  Save Group
                </button>
                <button onClick={() => setShowCreateModal(false)} className="wf-btn wf-btn-outline">
                  Cancel
                </button>
              </div>
            </div>
          )}

          {/* Navigation Flow Footer */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <button onClick={onPrev} className="wf-btn wf-btn-outline">
              ← Back to Service Permissions
            </button>
            <button onClick={onNext} className="wf-btn wf-btn-black">
              Continue to Step 07: Add Nominee →
            </button>
          </div>

          {showAnnotations && (
            <div className="wf-annotation">
              <strong>[UX NOTE - SCREEN 06]:</strong> Groups reduce cognitive overload. Instead of having to configure 20+ individual accounts one by one for every family member, owners can bundle services into high-level categories (e.g. "Photos & Memories") and assign that entire group to a nominee.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

