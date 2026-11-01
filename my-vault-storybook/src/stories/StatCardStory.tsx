import React, { useState } from 'react';
import { Link2, Users, Sliders, Clock } from 'lucide-react';

export const StatCardStory: React.FC = () => {
  const [servicesCount, setServicesCount] = useState(4);
  const [verifiedNominees, setVerifiedNominees] = useState(2);
  const [totalNominees, setTotalNominees] = useState(3);
  const [rulesCount, setRulesCount] = useState(7);
  const [planStatus, setPlanStatus] = useState('Standby');

  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '26px', fontWeight: 400, color: '#0B0B0D', marginBottom: '6px' }}>
          Metric & Stat Cards
        </h2>
        <p style={{ fontSize: '13px', color: 'var(--color-secondary-text)' }}>
          High-level operational overview cards presenting account counts, nominee readiness, and grace review status.
        </p>
      </div>

      {/* Live Rendered 4-Card Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '16px',
        marginBottom: '32px'
      }}>
        {/* Card 1: Connected Services */}
        <div style={{
          backgroundColor: '#FFFFFF',
          border: '1px solid #E1E2E5',
          borderRadius: '8px',
          padding: '18px 20px',
          cursor: 'pointer',
          transition: 'all 0.15s ease'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <span style={{ fontSize: '12px', fontWeight: 500, color: '#737680' }}>
              Connected services
            </span>
            <Link2 size={15} style={{ color: '#737680' }} />
          </div>
          <div style={{ fontSize: '24px', fontWeight: 600, color: '#0B0B0D', lineHeight: 1.2, marginBottom: '4px' }}>
            {servicesCount}
          </div>
          <div style={{ fontSize: '11.5px', color: '#737680' }}>
            Active cloud & social accounts
          </div>
        </div>

        {/* Card 2: Trusted People */}
        <div style={{
          backgroundColor: '#FFFFFF',
          border: '1px solid #E1E2E5',
          borderRadius: '8px',
          padding: '18px 20px',
          cursor: 'pointer',
          transition: 'all 0.15s ease'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <span style={{ fontSize: '12px', fontWeight: 500, color: '#737680' }}>
              Trusted people
            </span>
            <Users size={15} style={{ color: '#737680' }} />
          </div>
          <div style={{ fontSize: '24px', fontWeight: 600, color: '#0B0B0D', lineHeight: 1.2, marginBottom: '4px' }}>
            {verifiedNominees} <span style={{ fontSize: '14px', fontWeight: 400, color: '#737680' }}>/ {totalNominees}</span>
          </div>
          <div style={{ fontSize: '11.5px', color: '#737680' }}>
            Email verified candidates
          </div>
        </div>

        {/* Card 3: Access Rules */}
        <div style={{
          backgroundColor: '#FFFFFF',
          border: '1px solid #E1E2E5',
          borderRadius: '8px',
          padding: '18px 20px',
          cursor: 'pointer',
          transition: 'all 0.15s ease'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <span style={{ fontSize: '12px', fontWeight: 500, color: '#737680' }}>
              Access rules
            </span>
            <Sliders size={15} style={{ color: '#737680' }} />
          </div>
          <div style={{ fontSize: '24px', fontWeight: 600, color: '#0B0B0D', lineHeight: 1.2, marginBottom: '4px' }}>
            {rulesCount}
          </div>
          <div style={{ fontSize: '11.5px', color: '#737680' }}>
            Selective categories assigned
          </div>
        </div>

        {/* Card 4: Continuity Plan */}
        <div style={{
          backgroundColor: '#FFFFFF',
          border: '1px solid #E1E2E5',
          borderRadius: '8px',
          padding: '18px 20px',
          cursor: 'pointer',
          transition: 'all 0.15s ease'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <span style={{ fontSize: '12px', fontWeight: 500, color: '#737680' }}>
              Continuity plan
            </span>
            <Clock size={15} style={{ color: '#737680' }} />
          </div>
          <div style={{ fontSize: '24px', fontWeight: 600, color: '#0B0B0D', lineHeight: 1.2, marginBottom: '4px' }}>
            {planStatus}
          </div>
          <div style={{ fontSize: '11.5px', color: '#737680' }}>
            14-day grace review active
          </div>
        </div>
      </div>

      {/* Interactive Controls */}
      <section className="sb-panel" style={{ borderRadius: '8px', border: '1px solid #E1E2E5' }}>
        <h4 style={{ fontSize: '13px', fontWeight: 600, marginBottom: '12px' }}>Interactive Knobs</h4>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
          <div>
            <label style={{ fontSize: '12px', fontWeight: 500, display: 'block', marginBottom: '4px' }}>
              Connected Services Count
            </label>
            <input
              type="number"
              value={servicesCount}
              onChange={(e) => setServicesCount(Number(e.target.value))}
              style={{ width: '100%', padding: '6px 8px', border: '1px solid #D1D5DB', borderRadius: '4px' }}
            />
          </div>

          <div>
            <label style={{ fontSize: '12px', fontWeight: 500, display: 'block', marginBottom: '4px' }}>
              Verified Nominees
            </label>
            <input
              type="number"
              value={verifiedNominees}
              onChange={(e) => setVerifiedNominees(Number(e.target.value))}
              style={{ width: '100%', padding: '6px 8px', border: '1px solid #D1D5DB', borderRadius: '4px' }}
            />
          </div>

          <div>
            <label style={{ fontSize: '12px', fontWeight: 500, display: 'block', marginBottom: '4px' }}>
              Plan Status String
            </label>
            <input
              type="text"
              value={planStatus}
              onChange={(e) => setPlanStatus(e.target.value)}
              style={{ width: '100%', padding: '6px 8px', border: '1px solid #D1D5DB', borderRadius: '4px' }}
            />
          </div>
        </div>

        <div style={{ marginTop: '20px' }}>
          <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--sb-text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            TSX Usage Code Snippet
          </div>
          <pre className="sb-code-block">{`<StatCard
  title="Connected services"
  value={${servicesCount}}
  subtitle="Active cloud & social accounts"
  icon={<Link2 size={15} />}
  onClick={() => navigate('connected_services')}
/>`}</pre>
        </div>
      </section>
    </div>
  );
};

