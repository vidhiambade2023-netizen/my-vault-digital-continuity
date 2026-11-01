import React, { useState } from 'react';
import { FolderKanban, Edit3, Trash2, Users } from 'lucide-react';
import { ProviderIcon } from '@app/components/common/ProviderIcon';

export const GroupCardStory: React.FC = () => {
  const [groupName, setGroupName] = useState('Photos & Memories');
  const [description, setDescription] = useState('Family albums, vacation media, and high-resolution photo archives.');
  const [services, setServices] = useState<string[]>(['google', 'apple']);
  const [nomineeName, setNomineeName] = useState('Riya Ambade (Sister)');

  const toggleService = (slug: string) => {
    setServices(prev => prev.includes(slug) ? prev.filter(s => s !== slug) : [...prev, slug]);
  };

  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '26px', fontWeight: 400, color: '#0B0B0D', marginBottom: '6px' }}>
          Service Group Card
        </h2>
        <p style={{ fontSize: '13px', color: 'var(--color-secondary-text)' }}>
          Logical clusters bundling multiple accounts together to streamline delegation and inherit uniform continuity policies.
        </p>
      </div>

      {/* Live Interactive Card */}
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '32px' }}>
        <div style={{
          width: '460px',
          backgroundColor: '#FFFFFF',
          border: '1px solid #E1E2E5',
          borderRadius: '12px',
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          gap: '18px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
        }}>
          <div>
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '6px',
                  backgroundColor: '#E7EAF0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#0B0B0D',
                  flexShrink: 0
                }}>
                  <FolderKanban size={18} />
                </div>
                <div>
                  <h3 style={{ fontSize: '15.5px', fontWeight: 700, margin: 0, color: '#0B0B0D' }}>
                    {groupName}
                  </h3>
                  <div style={{ fontSize: '11.5px', color: '#737680', marginTop: '2px' }}>
                    {services.length} {services.length === 1 ? 'service linked' : 'services linked'}
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <button
                  className="btn-secondary"
                  style={{ fontSize: '11.5px', padding: '4px 8px' }}
                  onClick={() => alert('Edit group modal')}
                >
                  <Edit3 size={12} />
                  <span>Edit</span>
                </button>
                <button
                  className="btn-ghost"
                  style={{ padding: '6px', color: '#DC2626', background: 'transparent', border: 'none', cursor: 'pointer' }}
                  onClick={() => alert('Delete group')}
                >
                  <Trash2 size={13} />
                </button>
              </div>
            </div>

            <p style={{ fontSize: '12.5px', color: '#737680', margin: '0 0 16px', lineHeight: 1.5 }}>
              {description}
            </p>

            {/* Linked Services Chips */}
            <div style={{ marginBottom: '16px' }}>
              <div style={{ fontSize: '11px', fontWeight: 600, color: '#737680', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '8px' }}>
                Included Cloud Services:
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {services.map(slug => (
                  <div
                    key={slug}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '4px 10px',
                      borderRadius: '6px',
                      backgroundColor: '#F8F8F6',
                      border: '1px solid #E1E2E5',
                      fontSize: '12px',
                      color: '#0B0B0D'
                    }}
                  >
                    <ProviderIcon slug={slug} size={14} />
                    <span style={{ textTransform: 'capitalize' }}>{slug}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Delegated Nominee Pill */}
            <div>
              <div style={{ fontSize: '11px', fontWeight: 600, color: '#737680', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '8px' }}>
                Assigned Trusted Nominee:
              </div>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '4px 10px',
                borderRadius: '6px',
                backgroundColor: '#EFF6FF',
                border: '1px solid #BFDBFE',
                fontSize: '12px',
                color: '#1D4ED8'
              }}>
                <Users size={13} />
                <span>{nomineeName}</span>
              </div>
            </div>
          </div>

          <div style={{
            paddingTop: '12px',
            borderTop: '1px solid #E1E2E5',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: '11px',
            color: '#737680'
          }}>
            <span>Inherited Category Policy: Active</span>
            <span style={{ fontWeight: 600 }}>Zero-knowledge sealed</span>
          </div>
        </div>
      </div>

      {/* Knobs */}
      <section className="sb-panel" style={{ borderRadius: '8px', border: '1px solid #E1E2E5' }}>
        <h4 style={{ fontSize: '13px', fontWeight: 600, marginBottom: '12px' }}>Interactive Knobs</h4>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
          <div>
            <label style={{ fontSize: '12px', fontWeight: 500, display: 'block', marginBottom: '4px' }}>Group Name</label>
            <input
              type="text"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              style={{ width: '100%', padding: '6px 8px', border: '1px solid #D1D5DB', borderRadius: '4px' }}
            />
          </div>

          <div>
            <label style={{ fontSize: '12px', fontWeight: 500, display: 'block', marginBottom: '4px' }}>Assigned Nominee</label>
            <input
              type="text"
              value={nomineeName}
              onChange={(e) => setNomineeName(e.target.value)}
              style={{ width: '100%', padding: '6px 8px', border: '1px solid #D1D5DB', borderRadius: '4px' }}
            />
          </div>

          <div>
            <label style={{ fontSize: '12px', fontWeight: 500, display: 'block', marginBottom: '4px' }}>Toggle Included Services</label>
            <div style={{ display: 'flex', gap: '10px', marginTop: '6px' }}>
              {['google', 'apple', 'dropbox', 'instagram'].map(slug => (
                <label key={slug} style={{ fontSize: '11.5px', display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={services.includes(slug)}
                    onChange={() => toggleService(slug)}
                  />
                  <span>{slug}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
