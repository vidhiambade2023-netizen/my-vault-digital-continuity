import React, { useState } from 'react';
import { 
  Settings, 
  User, 
  Bell, 
  Download, 
  RotateCcw, 
  CheckCircle2,
  GraduationCap,
  LogOut,
  Sparkles,
  ShieldCheck,
  KeyRound,
  ExternalLink
} from 'lucide-react';
import { ServiceItem, Nominee, ServiceGroup, AccessRule } from '../../types';

interface SettingsViewProps {
  services: ServiceItem[];
  nominees: Nominee[];
  groups: ServiceGroup[];
  rules: AccessRule[];
  onResetData: () => void;
  onLogout: () => void;
  onOpenOnboarding: () => void;
  onOpen2FA: () => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  services,
  nominees,
  groups,
  rules,
  onResetData,
  onLogout,
  onOpenOnboarding,
  onOpen2FA
}) => {
  const [notifyQuarterly, setNotifyQuarterly] = useState(true);
  const [notifyNomineeActions, setNotifyNomineeActions] = useState(true);
  const [notifySecurityPings, setNotifySecurityPings] = useState(true);
  const [isExported, setIsExported] = useState(false);

  const handleExportPlan = () => {
    const planData = {
      project: 'My Vault Specification',
      owner: {
        name: 'Vidhi Ambade',
        email: 'vidhi.ambade@gmail.com',
        designation: 'User Experience Designer',
        facultyLead: 'Prof. Kriti Kusum'
      },
      exportTimestamp: new Date().toISOString(),
      connectedServices: services.map(s => ({
        name: s.name,
        email: s.connectedEmail,
        includedCategories: s.categories.filter(c => c.isIncluded).map(c => c.name),
        lockedCategories: s.categories.filter(c => c.isExcludedByDefault).map(c => c.name)
      })),
      trustedNominees: nominees.map(n => ({
        name: n.name,
        relationship: n.relationship,
        email: n.email,
        verificationStatus: n.verificationStatus,
        assignedCategories: n.assignedCategories
      })),
      serviceGroups: groups.map(g => ({
        name: g.name,
        platforms: g.serviceIds
      })),
      accessRules: rules
    };

    const blob = new Blob([JSON.stringify(planData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `MyVault_Continuity_Plan_VidhiAmbade_${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    setIsExported(true);
    setTimeout(() => setIsExported(false), 3000);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      {/* Page Title */}
      <div>
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '32px', fontWeight: 400, margin: '0 0 6px', color: 'var(--color-primary-black)', letterSpacing: '-0.02em' }}>
          Settings
        </h1>
        <p style={{ fontSize: '13.5px', color: 'var(--color-secondary-text)', margin: 0, maxWidth: '640px' }}>
          Owner authentication session, onboarding walkthrough, academic context, and JSON export.
        </p>
      </div>

      {/* Account Session & Authentication Section (Requested in Prompt) */}
      <div style={{
        backgroundColor: 'var(--color-white)',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-lg)',
        padding: '24px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ShieldCheck size={16} style={{ color: 'var(--color-primary-black)' }} />
            <h2 style={{ fontSize: '15px', fontWeight: 700, margin: 0 }}>
              Session & Owner Authentication
            </h2>
          </div>
          <span style={{
            fontSize: '11px',
            color: '#16A34A',
            backgroundColor: '#EDF7EE',
            padding: '2px 8px',
            borderRadius: 'var(--radius-full)',
            fontWeight: 600
          }}>
            Authenticated
          </span>
        </div>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '16px',
          backgroundColor: 'var(--color-off-white)',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--color-border-subtle)',
          marginBottom: '16px',
          flexWrap: 'wrap',
          gap: '12px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              backgroundColor: 'var(--color-primary-black)',
              color: 'var(--color-white)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 700,
              fontSize: '13px'
            }}>
              VA
            </div>
            <div>
              <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-primary-black)' }}>
                Vidhi Ambade
              </div>
              <div style={{ fontSize: '12px', color: 'var(--color-secondary-text)' }}>
                vidhi.ambade@gmail.com • Sovereign Lifetime Owner
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button
              onClick={onOpen2FA}
              className="btn-secondary"
              style={{ fontSize: '12px', padding: '6px 12px' }}
              title="Test 02 - Two-Factor Authentication screen"
            >
              <KeyRound size={13} />
              <span>Test 2FA Screen</span>
            </button>

            <button
              onClick={onLogout}
              className="btn-secondary"
              style={{
                fontSize: '12px',
                padding: '6px 14px',
                color: '#DC2626',
                borderColor: '#FCA5A5',
                backgroundColor: '#FFFBFB',
                gap: '6px'
              }}
            >
              <LogOut size={13} />
              <span>Log Out</span>
            </button>
          </div>
        </div>

        {/* Onboarding Restart Action */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '12px 14px',
          border: '1px solid var(--color-border)',
          borderRadius: 'var(--radius-sm)'
        }}>
          <div>
            <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-primary-black)' }}>
              First-Time User Walkthrough & Tips
            </div>
            <div style={{ fontSize: '11.5px', color: 'var(--color-secondary-text)', marginTop: '2px' }}>
              Launch the 5-step guided onboarding tour with architectural tips and principles.
            </div>
          </div>
          <button
            onClick={onOpenOnboarding}
            className="btn-secondary"
            style={{ fontSize: '12px', padding: '5px 12px', gap: '6px' }}
          >
            <Sparkles size={13} />
            <span>Launch Walkthrough</span>
          </button>
        </div>
      </div>

      {/* Profile & Academic Context Section */}
      <div style={{
        backgroundColor: 'var(--color-white)',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-lg)',
        padding: '24px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
          <GraduationCap size={16} style={{ color: 'var(--color-primary-black)' }} />
          <h2 style={{ fontSize: '15px', fontWeight: 700, margin: 0 }}>
            Designer Context & Evaluation
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '14px', fontSize: '13px' }}>
          <div style={{ padding: '12px 14px', backgroundColor: 'var(--color-off-white)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border-subtle)' }}>
            <span style={{ color: 'var(--color-secondary-text)', display: 'block', fontSize: '10.5px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              Student Designer
            </span>
            <strong style={{ fontSize: '14px', color: 'var(--color-primary-black)' }}>Vidhi Ambade</strong>
            <div style={{ fontSize: '11.5px', color: 'var(--color-secondary-text)', marginTop: '2px' }}>
              B.Des User Experience Design — Semester 7
            </div>
          </div>

          <div style={{ padding: '12px 14px', backgroundColor: 'var(--color-off-white)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border-subtle)' }}>
            <span style={{ color: 'var(--color-secondary-text)', display: 'block', fontSize: '10.5px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              Portfolio Evaluation
            </span>
            <strong style={{ fontSize: '14px', color: 'var(--color-primary-black)' }}>User Experience Design Portfolio</strong>
            <div style={{ fontSize: '11.5px', color: 'var(--color-secondary-text)', marginTop: '2px' }}>
              Faculty Lead: Prof. Kriti Kusum
            </div>
          </div>
        </div>
      </div>

      {/* Notification Preferences */}
      <div style={{
        backgroundColor: 'var(--color-white)',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-lg)',
        padding: '24px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
          <Bell size={16} style={{ color: 'var(--color-primary-black)' }} />
          <h2 style={{ fontSize: '15px', fontWeight: 700, margin: 0 }}>
            Proactive Heartbeat & Notifications
          </h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}>
            <div>
              <div style={{ fontSize: '13px', fontWeight: 600 }}>Quarterly Heartbeat Checkup</div>
              <div style={{ fontSize: '11.5px', color: 'var(--color-secondary-text)', marginTop: '2px' }}>
                Periodic email confirmation ensuring assigned delegates and permissions remain current.
              </div>
            </div>
            <input
              type="checkbox"
              checked={notifyQuarterly}
              onChange={(e) => setNotifyQuarterly(e.target.checked)}
            />
          </label>

          <div style={{ borderTop: '1px solid var(--color-border-subtle)' }} />

          <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}>
            <div>
              <div style={{ fontSize: '13px', fontWeight: 600 }}>Nominee Challenge Alerts</div>
              <div style={{ fontSize: '11.5px', color: 'var(--color-secondary-text)', marginTop: '2px' }}>
                Real-time alert whenever a nominee verifies their identity or requests status info.
              </div>
            </div>
            <input
              type="checkbox"
              checked={notifyNomineeActions}
              onChange={(e) => setNotifyNomineeActions(e.target.checked)}
            />
          </label>

          <div style={{ borderTop: '1px solid var(--color-border-subtle)' }} />

          <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}>
            <div>
              <div style={{ fontSize: '13px', fontWeight: 600 }}>Security Invariant Monitoring</div>
              <div style={{ fontSize: '11.5px', color: 'var(--color-secondary-text)', marginTop: '2px' }}>
                Continuous integrity validation on zero-knowledge exclusions and master passkeys.
              </div>
            </div>
            <input
              type="checkbox"
              checked={notifySecurityPings}
              onChange={(e) => setNotifySecurityPings(e.target.checked)}
            />
          </label>
        </div>
      </div>

      {/* Specification Export & Prototype Reset Row */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '20px',
        alignItems: 'stretch'
      }}>
        {/* Export JSON Specification */}
        <div style={{
          backgroundColor: 'var(--color-white)',
          border: '1px solid var(--color-border)',
          borderRadius: 'var(--radius-lg)',
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          height: '100%'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <Download size={15} />
              <h3 style={{ fontSize: '14.5px', fontWeight: 700, margin: 0 }}>Export Continuity Specification</h3>
            </div>
            <p style={{ fontSize: '12px', color: 'var(--color-secondary-text)', margin: '0 0 16px', lineHeight: 1.45 }}>
              Download a structured JSON manifest of your rules, categories, and designated nominees for archival or submission.
            </p>
          </div>

          <button
            onClick={handleExportPlan}
            className="btn-primary"
            style={{ alignSelf: 'flex-start', fontSize: '12px' }}
          >
            <Download size={13} />
            <span>{isExported ? 'Plan Downloaded!' : 'Download Specification JSON'}</span>
          </button>
        </div>

        {/* Reset Demo Data */}
        <div style={{
          backgroundColor: 'var(--color-white)',
          border: '1px solid var(--color-border)',
          borderRadius: 'var(--radius-lg)',
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          height: '100%'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', color: '#DC2626' }}>
              <RotateCcw size={15} />
              <h3 style={{ fontSize: '14.5px', fontWeight: 700, margin: 0 }}>Reset Prototype State</h3>
            </div>
            <p style={{ fontSize: '12px', color: 'var(--color-secondary-text)', margin: '0 0 16px', lineHeight: 1.45 }}>
              Restore original mock accounts, nominees, groups, and audit records in your local browser storage.
            </p>
          </div>

          <button
            onClick={onResetData}
            className="btn-secondary"
            style={{ alignSelf: 'flex-start', color: '#DC2626', borderColor: '#FECACA', backgroundColor: '#FFFBFB', fontSize: '12px' }}
          >
            <RotateCcw size={13} />
            <span>Reset Demo Data</span>
          </button>
        </div>
      </div>
    </div>
  );
};
