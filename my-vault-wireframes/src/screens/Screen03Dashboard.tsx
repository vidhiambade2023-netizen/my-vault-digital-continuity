import React from 'react';

interface Screen03Props {
  onNext: () => void;
  onNavigateScreen: (screenNum: number) => void;
  showAnnotations: boolean;
}

export const Screen03Dashboard: React.FC<Screen03Props> = ({ onNext, onNavigateScreen, showAnnotations }) => {
  return (
    <div style={{ flex: 1, display: 'flex', minHeight: '840px' }}>
      {/* Wireframe Left Sidebar */}
      <aside style={{
        width: '230px',
        borderRight: '1px solid var(--wf-border)',
        backgroundColor: 'var(--wf-surface)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        flexShrink: 0
      }}>
        <div>
          {/* Brand Box */}
          <div style={{ padding: '16px 18px', borderBottom: '1px solid var(--wf-border)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{
                width: '22px',
                height: '22px',
                border: '1.5px solid var(--wf-text-main)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700,
                fontSize: '11px'
              }}>
                V
              </div>
              <span style={{ fontWeight: 600, fontSize: '14px' }}>MY VAULT</span>
            </div>
            <div style={{ fontSize: '11px', color: 'var(--wf-text-muted)', marginTop: '4px', fontFamily: 'var(--wf-font-mono)' }}>
              [WIREFRAME 03 / 09]
            </div>
          </div>

          {/* Connect Action Button */}
          <div style={{ padding: '12px 14px' }}>
            <button
              onClick={() => onNavigateScreen(4)}
              className="wf-btn wf-btn-black"
              style={{ width: '100%', fontSize: '12.5px', padding: '7px 10px' }}
            >
              + Connect Service
            </button>
          </div>

          {/* Simple Navigation Menu */}
          <nav style={{ padding: '0 10px', display: 'flex', flexDirection: 'column', gap: '2px' }}>
            <div style={{
              padding: '7px 10px',
              backgroundColor: 'var(--wf-surface-muted)',
              border: '1px solid var(--wf-border)',
              borderRadius: '4px',
              fontWeight: 600,
              fontSize: '12.5px'
            }}>
              • Dashboard (Active)
            </div>
            <div
              onClick={() => onNavigateScreen(4)}
              style={{ padding: '7px 10px', fontSize: '12.5px', color: 'var(--wf-text-muted)', cursor: 'pointer' }}
            >
              • Connected Services (3)
            </div>
            <div
              onClick={() => onNavigateScreen(6)}
              style={{ padding: '7px 10px', fontSize: '12.5px', color: 'var(--wf-text-muted)', cursor: 'pointer' }}
            >
              • Service Groups (2)
            </div>
            <div
              onClick={() => onNavigateScreen(7)}
              style={{ padding: '7px 10px', fontSize: '12.5px', color: 'var(--wf-text-muted)', cursor: 'pointer' }}
            >
              • Trusted Nominees (2)
            </div>
            <div
              onClick={() => onNavigateScreen(8)}
              style={{ padding: '7px 10px', fontSize: '12.5px', color: 'var(--wf-text-muted)', cursor: 'pointer' }}
            >
              • Access Rules
            </div>
            <div
              onClick={() => onNavigateScreen(9)}
              style={{ padding: '7px 10px', fontSize: '12.5px', color: 'var(--wf-text-muted)', cursor: 'pointer' }}
            >
              • Continuity Plan
            </div>
          </nav>
        </div>

        {/* User Profile Footer */}
        <div style={{ padding: '12px 14px', borderTop: '1px solid var(--wf-border)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{
              width: '26px',
              height: '26px',
              borderRadius: '50%',
              backgroundColor: 'var(--wf-surface-muted)',
              border: '1px solid var(--wf-border)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '10px',
              fontWeight: 600
            }}>
              VA
            </div>
            <div>
              <div style={{ fontSize: '12px', fontWeight: 600 }}>Vidhi Ambade</div>
              <div style={{ fontSize: '10.5px', color: 'var(--wf-text-muted)' }}>Owner • Sovereign</div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', backgroundColor: 'var(--wf-surface-subtle)' }}>
        {/* Topbar */}
        <header style={{
          height: '52px',
          borderBottom: '1px solid var(--wf-border)',
          backgroundColor: 'var(--wf-surface)',
          padding: '0 28px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '13px', fontWeight: 600 }}>Dashboard Overview</span>
            <span className="wf-badge">CONTINUITY STATUS: ACTIVE</span>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              onClick={() => onNavigateScreen(4)}
              className="wf-btn wf-btn-outline"
              style={{ fontSize: '12px', padding: '5px 10px' }}
            >
              + Connect Service
            </button>
            <button
              onClick={onNext}
              className="wf-btn wf-btn-black"
              style={{ fontSize: '12px', padding: '5px 12px' }}
            >
              Flow: Next Screen →
            </button>
          </div>
        </header>

        {/* View Body */}
        <main style={{ padding: '24px 32px', display: 'flex', flexDirection: 'column', gap: '22px' }}>
          {/* Overview Stat Cards (3 Cards) */}
          <section style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px' }}>
            <div className="wf-box" style={{ cursor: 'pointer' }} onClick={() => onNavigateScreen(4)}>
              <div style={{ fontSize: '11.5px', color: 'var(--wf-text-muted)', marginBottom: '4px' }}>
                CONNECTED SERVICES
              </div>
              <div style={{ fontSize: '22px', fontWeight: 700 }}>3 Accounts</div>
              <div style={{ fontSize: '11px', color: 'var(--wf-text-muted)', marginTop: '4px' }}>
                Google, Apple, Instagram active
              </div>
            </div>

            <div className="wf-box" style={{ cursor: 'pointer' }} onClick={() => onNavigateScreen(7)}>
              <div style={{ fontSize: '11.5px', color: 'var(--wf-text-muted)', marginBottom: '4px' }}>
                TRUSTED NOMINEES
              </div>
              <div style={{ fontSize: '22px', fontWeight: 700 }}>2 Nominees</div>
              <div style={{ fontSize: '11px', color: 'var(--wf-text-muted)', marginTop: '4px' }}>
                2 Email verified, 0 active claims
              </div>
            </div>

            <div className="wf-box" style={{ cursor: 'pointer' }} onClick={() => onNavigateScreen(9)}>
              <div style={{ fontSize: '11.5px', color: 'var(--wf-text-muted)', marginBottom: '4px' }}>
                CONTINUITY PLAN
              </div>
              <div style={{ fontSize: '22px', fontWeight: 700 }}>Standby</div>
              <div style={{ fontSize: '11px', color: 'var(--wf-text-muted)', marginTop: '4px' }}>
                14-day owner grace period configured
              </div>
            </div>
          </section>

          {/* Section: Connected Services */}
          <section className="wf-box">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <div>
                <h3 style={{ fontSize: '14px', fontWeight: 600 }}>Connected Services</h3>
                <p style={{ fontSize: '12px', color: 'var(--wf-text-muted)' }}>
                  Third-party platforms authorized for selective archive preservation
                </p>
              </div>
              <button
                onClick={() => onNavigateScreen(4)}
                className="wf-btn wf-btn-outline"
                style={{ fontSize: '12px', padding: '4px 10px' }}
              >
                + Connect Service
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
              <div className="wf-box" style={{ backgroundColor: 'var(--wf-surface-subtle)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontWeight: 600, fontSize: '13px' }}>Google Workspace</span>
                  <span className="wf-badge verified">CONNECTED</span>
                </div>
                <div style={{ fontSize: '11.5px', color: 'var(--wf-text-muted)', marginBottom: '8px' }}>
                  vidhi.ambade@gmail.com
                </div>
                <div style={{ fontSize: '11px', borderTop: '1px solid var(--wf-border)', paddingTop: '6px', color: 'var(--wf-text-muted)' }}>
                  3 categories eligible • 0 chats
                </div>
              </div>

              <div className="wf-box" style={{ backgroundColor: 'var(--wf-surface-subtle)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontWeight: 600, fontSize: '13px' }}>Apple iCloud</span>
                  <span className="wf-badge verified">CONNECTED</span>
                </div>
                <div style={{ fontSize: '11.5px', color: 'var(--wf-text-muted)', marginBottom: '8px' }}>
                  vidhi@icloud.com
                </div>
                <div style={{ fontSize: '11px', borderTop: '1px solid var(--wf-border)', paddingTop: '6px', color: 'var(--wf-text-muted)' }}>
                  2 categories eligible • Photos sync
                </div>
              </div>

              <div className="wf-box" style={{ backgroundColor: 'var(--wf-surface-subtle)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontWeight: 600, fontSize: '13px' }}>Instagram</span>
                  <span className="wf-badge verified">CONNECTED</span>
                </div>
                <div style={{ fontSize: '11.5px', color: 'var(--wf-text-muted)', marginBottom: '8px' }}>
                  @vidhi.uxdesign
                </div>
                <div style={{ fontSize: '11px', borderTop: '1px solid var(--wf-border)', paddingTop: '6px', color: 'var(--wf-text-muted)' }}>
                  1 category eligible • Public feed only
                </div>
              </div>
            </div>
          </section>

          {/* Section: Trusted People */}
          <section className="wf-box">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <div>
                <h3 style={{ fontSize: '14px', fontWeight: 600 }}>Trusted People (Nominees)</h3>
                <p style={{ fontSize: '12px', color: 'var(--wf-text-muted)' }}>
                  Designated individuals eligible for certified continuity evaluation
                </p>
              </div>
              <button
                onClick={() => onNavigateScreen(7)}
                className="wf-btn wf-btn-outline"
                style={{ fontSize: '12px', padding: '4px 10px' }}
              >
                + Add Nominee
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
              <div className="wf-box" style={{ backgroundColor: 'var(--wf-surface-subtle)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <div>
                    <span style={{ fontWeight: 600, fontSize: '13px' }}>Riya Ambade</span>
                    <span style={{ fontSize: '11.5px', color: 'var(--wf-text-muted)', marginLeft: '6px' }}>
                      (Sister)
                    </span>
                  </div>
                  <span className="wf-badge verified">EMAIL VERIFIED</span>
                </div>
                <div style={{ fontSize: '11.5px', color: 'var(--wf-text-muted)', marginBottom: '8px' }}>
                  riya.ambade@gmail.com
                </div>
                <div style={{ fontSize: '11px', borderTop: '1px solid var(--wf-border)', paddingTop: '6px', display: 'flex', justifyContent: 'space-between' }}>
                  <span>3 categories delegated</span>
                  <span style={{ fontWeight: 600 }}>Access Status: Standby</span>
                </div>
              </div>

              <div className="wf-box" style={{ backgroundColor: 'var(--wf-surface-subtle)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <div>
                    <span style={{ fontWeight: 600, fontSize: '13px' }}>Arjun Mehta</span>
                    <span style={{ fontSize: '11.5px', color: 'var(--wf-text-muted)', marginLeft: '6px' }}>
                      (Partner)
                    </span>
                  </div>
                  <span className="wf-badge verified">EMAIL VERIFIED</span>
                </div>
                <div style={{ fontSize: '11.5px', color: 'var(--wf-text-muted)', marginBottom: '8px' }}>
                  arjun.mehta@outlook.com
                </div>
                <div style={{ fontSize: '11px', borderTop: '1px solid var(--wf-border)', paddingTop: '6px', display: 'flex', justifyContent: 'space-between' }}>
                  <span>4 categories delegated</span>
                  <span style={{ fontWeight: 600 }}>Access Status: Standby</span>
                </div>
              </div>
            </div>
          </section>

          {showAnnotations && (
            <div className="wf-annotation">
              <strong>[UX NOTE - SCREEN 03]:</strong> Dashboard presents a clear bird's-eye view of connected services, trusted people, and plan status. In Round 1 testing, users must understand at a glance that connecting a service does not automatically give anyone access to it.
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

