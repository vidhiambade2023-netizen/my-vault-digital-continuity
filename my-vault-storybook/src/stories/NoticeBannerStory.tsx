import React from 'react';
import { ShieldCheck, AlertCircle, Info, Lock } from 'lucide-react';

export const NoticeBannerStory: React.FC = () => {
  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '26px', fontWeight: 400, color: '#0B0B0D', marginBottom: '6px' }}>
          Notice & Governance Banners
        </h2>
        <p style={{ fontSize: '13px', color: 'var(--color-secondary-text)' }}>
          High-visibility trust indicators communicating cryptographic locks, owner sovereignty, and grace period boundaries.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '32px' }}>
        {/* Banner 1: Protocol Lifetime Privacy Mode */}
        <div style={{
          backgroundColor: '#FFFFFF',
          border: '1px solid #E1E2E5',
          borderRadius: '8px',
          padding: '16px 20px',
          display: 'flex',
          alignItems: 'flex-start',
          gap: '14px'
        }}>
          <div style={{
            width: '32px',
            height: '32px',
            borderRadius: '6px',
            backgroundColor: '#E7EAF0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#0B0B0D',
            flexShrink: 0
          }}>
            <ShieldCheck size={18} />
          </div>
          <div>
            <div style={{ fontWeight: 600, fontSize: '13.5px', color: '#0B0B0D', marginBottom: '2px' }}>
              Digital Continuity Protocol • Lifetime Privacy Mode
            </div>
            <div style={{ fontSize: '12.5px', color: '#737680', lineHeight: 1.5 }}>
              Personal conversations and credentials remain cryptographically sealed until authorized continuity activation. Nominees have zero visibility into your live accounts.
            </div>
          </div>
        </div>

        {/* Banner 2: Warning Callout (Nominee verification does not activate access) */}
        <div style={{
          backgroundColor: '#FFFBEB',
          border: '1px solid #FDE68A',
          borderLeft: '4px solid #D97706',
          borderRadius: '4px',
          padding: '14px 18px',
          display: 'flex',
          alignItems: 'flex-start',
          gap: '12px'
        }}>
          <AlertCircle size={18} style={{ color: '#D97706', flexShrink: 0, marginTop: '2px' }} />
          <div>
            <div style={{ fontWeight: 600, fontSize: '13px', color: '#92400E', marginBottom: '2px' }}>
              Verification Rule: Email Handshake Only
            </div>
            <div style={{ fontSize: '12px', color: '#78350F', lineHeight: 1.5 }}>
              Completing email verification challenge proves communication delivery only. Access remains completely sealed until a future verified continuity claim is evaluated.
            </div>
          </div>
        </div>

        {/* Banner 3: Grace Period Review Notification */}
        <div style={{
          backgroundColor: '#EFF6FF',
          border: '1px solid #BFDBFE',
          borderRadius: '8px',
          padding: '16px 20px',
          display: 'flex',
          alignItems: 'flex-start',
          gap: '14px'
        }}>
          <Info size={18} style={{ color: '#2563EB', flexShrink: 0, marginTop: '2px' }} />
          <div>
            <div style={{ fontWeight: 600, fontSize: '13.5px', color: '#1E40AF', marginBottom: '2px' }}>
              14-Day Owner Grace Period Active
            </div>
            <div style={{ fontSize: '12px', color: '#1E3A8A', lineHeight: 1.5 }}>
              If a claim is submitted, automated emergency alerts dispatch across SMS, email, and hardware push with an unconditional 1-click abort switch.
            </div>
          </div>
        </div>

        {/* Banner 4: Inviolable Exclusion Lock */}
        <div style={{
          backgroundColor: '#F8F8F6',
          border: '1px dashed #E1E2E5',
          borderRadius: '6px',
          padding: '12px 16px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px'
        }}>
          <Lock size={15} style={{ color: '#737680' }} />
          <span style={{ fontSize: '12px', color: '#737680' }}>
            Permanent Security Invariant: <strong>6 private chat and password categories</strong> are permanently excluded by zero-knowledge locks.
          </span>
        </div>
      </div>
    </div>
  );
};

