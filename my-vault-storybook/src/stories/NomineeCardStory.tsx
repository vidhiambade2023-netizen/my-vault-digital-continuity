import React, { useState } from 'react';
import { Badge } from '@app/components/common/Badge';
import { Sliders } from 'lucide-react';

export const NomineeCardStory: React.FC = () => {
  const [name, setName] = useState('Riya Ambade');
  const [relationship, setRelationship] = useState('Sister');
  const [email, setEmail] = useState('riya.ambade@gmail.com');
  const [isVerified, setIsVerified] = useState(true);
  const [categoriesDelegated, setCategoriesDelegated] = useState(3);

  const initials = name.split(' ').map(n => n[0]).join('').slice(0, 2);

  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '26px', fontWeight: 400, color: '#0B0B0D', marginBottom: '6px' }}>
          Nominee & Trust Card
        </h2>
        <p style={{ fontSize: '13px', color: 'var(--color-secondary-text)' }}>
          Designated nominee cards displaying verification standing, delegated scope summary, and standby claim posture.
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
          gap: '14px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
        }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  backgroundColor: '#E7EAF0',
                  color: '#0B0B0D',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '12px',
                  fontWeight: 600,
                  border: '1px solid #E1E2E5'
                }}>
                  {initials}
                </div>
                <div>
                  <h3 style={{ fontSize: '14px', fontWeight: 600, margin: 0, color: '#0B0B0D' }}>
                    {name}
                  </h3>
                  <div style={{ fontSize: '11.5px', color: '#737680' }}>
                    {relationship}
                  </div>
                </div>
              </div>

              <Badge variant={isVerified ? 'verified' : 'pending'} size="sm">
                {isVerified ? 'Email Verified' : 'Pending Verification'}
              </Badge>
            </div>

            <div style={{ fontSize: '12px', color: '#737680', marginBottom: '8px' }}>
              {email}
            </div>

            <div style={{
              fontSize: '11.5px',
              color: '#0B0B0D',
              backgroundColor: '#F8F8F6',
              padding: '8px 10px',
              borderRadius: '6px',
              border: '1px solid #E1E2E5'
            }}>
              <span><strong>{categoriesDelegated}</strong> categories delegated</span>
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
              Standby (Lifetime)
            </span>

            <button
              className="btn-secondary"
              style={{ fontSize: '11.5px', padding: '4px 10px', gap: '4px' }}
              onClick={() => alert('Manage access matrix')}
            >
              <Sliders size={12} />
              <span>Manage access</span>
            </button>
          </div>
        </div>
      </div>

      {/* Knobs */}
      <section className="sb-panel" style={{ borderRadius: '8px', border: '1px solid #E1E2E5' }}>
        <h4 style={{ fontSize: '13px', fontWeight: 600, marginBottom: '12px' }}>Interactive Knobs</h4>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', alignItems: 'center' }}>
          <div>
            <label style={{ fontSize: '12px', fontWeight: 500, display: 'block', marginBottom: '4px' }}>Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{ width: '100%', padding: '6px 8px', border: '1px solid #D1D5DB', borderRadius: '4px' }}
            />
          </div>

          <div>
            <label style={{ fontSize: '12px', fontWeight: 500, display: 'block', marginBottom: '4px' }}>Relationship</label>
            <input
              type="text"
              value={relationship}
              onChange={(e) => setRelationship(e.target.value)}
              style={{ width: '100%', padding: '6px 8px', border: '1px solid #D1D5DB', borderRadius: '4px' }}
            />
          </div>

          <div>
            <label style={{ fontSize: '12px', fontWeight: 500, display: 'block', marginBottom: '4px' }}>Email</label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ width: '100%', padding: '6px 8px', border: '1px solid #D1D5DB', borderRadius: '4px' }}
            />
          </div>

          <div>
            <label style={{ fontSize: '12px', fontWeight: 500, display: 'block', marginBottom: '4px' }}>Verification Status</label>
            <select
              value={isVerified ? 'verified' : 'pending'}
              onChange={(e) => setIsVerified(e.target.value === 'verified')}
              style={{ width: '100%', padding: '6px 8px', border: '1px solid #D1D5DB', borderRadius: '4px' }}
            >
              <option value="verified">Verified</option>
              <option value="pending">Pending</option>
            </select>
          </div>
        </div>
      </section>
    </div>
  );
};
