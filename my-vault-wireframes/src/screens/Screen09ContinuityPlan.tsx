import React from 'react';

interface Screen09Props {
  onRestart: () => void;
  onPrev: () => void;
  showAnnotations: boolean;
}

export const Screen09ContinuityPlan: React.FC<Screen09Props> = ({
  onRestart,
  onPrev,
  showAnnotations
}) => {
  const timelineSteps = [
    {
      num: '1',
      title: 'Nominee Invited',
      desc: 'Owner designates trusted nominee and sends email verification challenge token.',
      status: 'COMPLETED',
      badgeClass: 'verified'
    },
    {
      num: '2',
      title: 'Nominee Verified',
      desc: 'Nominee verifies contact identity. CRITICAL: Verification alone confirms communication channel only. Vault access remains completely sealed in Standby mode.',
      status: 'VERIFIED (STANDBY)',
      badgeClass: 'verified'
    },
    {
      num: '3',
      title: 'Continuity Claim Submitted',
      desc: 'Future claim is formally submitted by nominee with certified legal/medical verification documents.',
      status: 'STANDBY',
      badgeClass: 'active'
    },
    {
      num: '4',
      title: 'Claim Reviewed & 14-Day Grace Period',
      desc: 'Multi-channel notifications are dispatched to the owner (SMS, email, device push). A mandatory 14-day abort review window is enforced.',
      status: 'STANDBY',
      badgeClass: 'active'
    },
    {
      num: '5',
      title: 'Access Activated',
      desc: 'If no owner abort is received during the review window, zero-knowledge decryption keys are generated only for designated categories.',
      status: 'LOCKED',
      badgeClass: ''
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
            ← Step 08: Assign Access
          </button>
          <span style={{ fontWeight: 600, fontSize: '15px' }}>
            Continuity Plan & Activation Protocol
          </span>
          <span className="wf-badge">WIREFRAME 09 / 09</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button onClick={onRestart} className="wf-btn wf-btn-outline" style={{ fontSize: '12px', padding: '5px 12px' }}>
            Restart Flow ↺
          </button>
        </div>
      </header>

      {/* Main Body */}
      <div style={{ flex: 1, padding: '28px 40px', backgroundColor: 'var(--wf-surface-subtle)' }}>
        <div style={{ maxWidth: '920px', margin: '0 auto' }}>
          {/* Status Box */}
          <div className="wf-box" style={{ marginBottom: '18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: '11.5px', color: 'var(--wf-text-muted)', marginBottom: '2px' }}>
                OVERALL VAULT PROTOCOL:
              </div>
              <h1 style={{ fontSize: '18px', fontWeight: 600 }}>
                Continuity Plan: Standby (Lifetime Privacy Mode Active)
              </h1>
              <div style={{ fontSize: '12px', color: 'var(--wf-text-muted)' }}>
                Owner control active • 3 Connected Services • 3 Designated Nominees • 14-day abort review window
              </div>
            </div>
            <span className="wf-badge verified">STANDBY (SAFE)</span>
          </div>

          {/* Prominent Verification Rule Callout */}
          <div style={{
            backgroundColor: '#FEF2F2',
            border: '1.5px solid #FCA5A5',
            padding: '14px 18px',
            borderRadius: '4px',
            marginBottom: '22px'
          }}>
            <div style={{ fontWeight: 700, fontSize: '13px', color: '#991B1B', marginBottom: '4px' }}>
              ⚠️ CORE DESIGN PRINCIPLE: Nominee Verification Never Activates Access
            </div>
            <p style={{ fontSize: '12.5px', color: '#7F1D1D', lineHeight: 1.5, margin: 0 }}>
              Email verification merely verifies that the nominee’s contact email is valid and can receive notifications. 
              <strong> It does not unlock any files, passwords, or archives.</strong> Access is only evaluated in the future through the full 5-stage continuity protocol.
            </p>
          </div>

          {/* 5-Step Timeline Box */}
          <div className="wf-box" style={{ marginBottom: '24px' }}>
            <h2 style={{ fontSize: '14.5px', fontWeight: 600, marginBottom: '16px' }}>
              Activation Protocol Timeline
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', position: 'relative' }}>
              {timelineSteps.map((step, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    gap: '16px',
                    alignItems: 'flex-start',
                    paddingBottom: idx !== timelineSteps.length - 1 ? '14px' : '0',
                    borderBottom: idx !== timelineSteps.length - 1 ? '1px dashed var(--wf-border)' : 'none'
                  }}
                >
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    border: '1.5px solid var(--wf-text-main)',
                    backgroundColor: idx <= 1 ? '#111827' : 'var(--wf-surface)',
                    color: idx <= 1 ? '#FFFFFF' : 'var(--wf-text-main)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                    fontSize: '13px',
                    flexShrink: 0
                  }}>
                    {step.num}
                  </div>

                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                      <span style={{ fontWeight: 600, fontSize: '13.5px' }}>
                        Step {step.num}: {step.title}
                      </span>
                      <span className={`wf-badge ${step.badgeClass}`}>
                        {step.status}
                      </span>
                    </div>
                    <p style={{ fontSize: '12px', color: 'var(--wf-text-muted)', lineHeight: 1.5, margin: 0 }}>
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Flow Actions */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <button onClick={onPrev} className="wf-btn wf-btn-outline">
              ← Back to Assign & Review Access
            </button>
            <button onClick={onRestart} className="wf-btn wf-btn-black">
              Restart Wireframe Flow (Screen 01) ↺
            </button>
          </div>

          {showAnnotations && (
            <div className="wf-annotation">
              <strong>[UX NOTE - SCREEN 09]:</strong> The 5-stage timeline is the core conceptual model of My Vault. In User Testing Round 1, showing this explicit sequence resolved participants' anxieties regarding false alarms, unauthorized access, and lack of owner recourse.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

