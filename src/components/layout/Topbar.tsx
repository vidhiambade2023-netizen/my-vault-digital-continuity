import React, { useState } from 'react';
import { 
  Search, 
  Bell, 
  ShieldCheck, 
  User, 
  Lock, 
  ChevronDown,
  X,
  ExternalLink,
  LogOut,
  Sparkles
} from 'lucide-react';
import { ActiveView } from '../../types';

interface TopbarProps {
  activeView: ActiveView;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onOpenAuthModal: () => void;
  onNavigate: (view: ActiveView) => void;
  onLogout?: () => void;
  onOpenOnboarding?: () => void;
}

const VIEW_TITLES: Record<ActiveView, { section: string; title: string; subtitle: string }> = {
  dashboard: {
    section: 'Workspace',
    title: 'Overview & Footprint',
    subtitle: 'Central command for connected accounts, continuity readiness, and lifetime privacy controls.'
  },
  connected_services: {
    section: 'Workspace',
    title: 'Connected Services',
    subtitle: 'Third-party cloud repositories with read-only OAuth metadata authorization.'
  },
  service_detail: {
    section: 'Workspace',
    title: 'Scopes & Category Permissions',
    subtitle: 'Granular inclusion controls, provider scopes, and nominee delegations.'
  },
  groups: {
    section: 'Delegation & Rules',
    title: 'Service Groups',
    subtitle: 'Logical clusters sharing inherited continuity policies and delegate assignments.'
  },
  nominees: {
    section: 'Delegation & Rules',
    title: 'Trusted Circle',
    subtitle: 'Designated individuals eligible for future continuity claim verification.'
  },
  access_rules: {
    section: 'Delegation & Rules',
    title: 'Access Rules Matrix',
    subtitle: 'Full governance map of platform categories, nominees, and inviolable exclusions.'
  },
  continuity_plan: {
    section: 'Delegation & Rules',
    title: 'Continuity Protocol & Claims',
    subtitle: 'Four-stage activation timeline, grace periods, and proof-of-claim verification.'
  },
  security: {
    section: 'Sovereignty & Audit',
    title: 'Security & Sovereignty',
    subtitle: 'Multi-factor authentication, active hardware passkeys, and authorized sessions.'
  },
  activity: {
    section: 'Sovereignty & Audit',
    title: 'Audit Trail',
    subtitle: 'Immutable record of connection events, permission changes, and identity challenges.'
  },
  settings: {
    section: 'Sovereignty & Audit',
    title: 'Settings & Data Governance',
    subtitle: 'Proactive heartbeat checkups, JSON specification export, and demo state controls.'
  },
  login: {
    section: 'Authentication',
    title: 'Sign In',
    subtitle: 'Owner authentication and master key decryption.'
  },
  signup: {
    section: 'Authentication',
    title: 'Sign Up',
    subtitle: 'Create a new continuity vault and establish sovereign credentials.'
  },
  two_factor: {
    section: 'Authentication',
    title: 'Two-Factor Authentication',
    subtitle: 'Cryptographic challenge verification code.'
  }
};

export const Topbar: React.FC<TopbarProps> = ({
  activeView,
  searchQuery,
  onSearchChange,
  onOpenAuthModal,
  onNavigate,
  onLogout,
  onOpenOnboarding
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const notifications = [
    {
      id: 'notif-1',
      title: 'Nominee Verified',
      desc: 'Riya Ambade completed email verification challenge code.',
      time: '2h ago',
      unread: true
    },
    {
      id: 'notif-2',
      title: 'Privacy Invariants Active',
      desc: 'All 6 personal chat and password categories remain cryptographically locked.',
      time: 'Yesterday',
      unread: false
    },
    {
      id: 'notif-3',
      title: 'Heartbeat Checkup Valid',
      desc: 'Next owner confirmation review scheduled in 45 days.',
      time: '3d ago',
      unread: false
    }
  ];

  const currentViewMeta = VIEW_TITLES[activeView] || {
    section: 'Workspace',
    title: 'My Vault',
    subtitle: 'Personal Digital Vault'
  };

  return (
    <header style={{
      height: '52px',
      backgroundColor: 'var(--color-white)',
      borderBottom: '1px solid var(--color-border-subtle)',
      padding: '0 32px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      position: 'sticky',
      top: 0,
      zIndex: 40
    }}>
      {/* Subtle Section Breadcrumb */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
        <span style={{
          fontSize: '12px',
          fontWeight: 400,
          color: 'var(--color-secondary-text)'
        }}>
          {currentViewMeta.section}
        </span>
        <span style={{ fontSize: '11px', color: 'var(--color-border)' }}>/</span>
        <span style={{
          fontSize: '12px',
          fontWeight: 500,
          color: 'var(--color-primary-black)'
        }}>
          {currentViewMeta.title}
        </span>
      </div>

      {/* Right Controls */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
        {/* Search Input */}
        <div style={{ position: 'relative', width: '220px' }}>
          <Search 
            size={14} 
            style={{
              position: 'absolute',
              left: '10px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'var(--color-secondary-text)',
              pointerEvents: 'none'
            }} 
          />
          <input
            type="search"
            placeholder="Search vault..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            style={{
              width: '100%',
              paddingLeft: '32px',
              paddingRight: '10px',
              paddingTop: '6px',
              paddingBottom: '6px',
              fontSize: '12.5px',
              backgroundColor: 'var(--color-off-white)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-sm)'
            }}
          />
        </div>

        {/* Lifetime Owner Control Badge */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          padding: '4px 10px',
          borderRadius: 'var(--radius-full)',
          backgroundColor: '#EDF7EE',
          border: '1px solid #CDE8D0',
          fontSize: '11px',
          fontWeight: 600,
          color: '#1B6425'
        }}
        title="Owner sovereignty is enforced. Nominees cannot inspect or access any files while the owner is alive."
        >
          <span style={{
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            backgroundColor: '#16A34A',
            display: 'inline-block'
          }} />
          <span>Owner control active</span>
        </div>

        {/* Onboarding Tips Action */}
        {onOpenOnboarding && (
          <button
            onClick={onOpenOnboarding}
            className="btn-secondary"
            style={{
              fontSize: '11.5px',
              padding: '4px 9px',
              gap: '4px'
            }}
            title="Launch guided onboarding walkthrough and tips"
          >
            <Sparkles size={12} />
            <span>Onboarding tips</span>
          </button>
        )}

        {/* Notifications Popover */}
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowUserMenu(false);
            }}
            aria-label="View notifications"
            style={{
              width: '32px',
              height: '32px',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--color-border)',
              backgroundColor: 'var(--color-white)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--color-primary-black)',
              position: 'relative'
            }}
          >
            <Bell size={14} />
            <span style={{
              position: 'absolute',
              top: '6px',
              right: '6px',
              width: '5px',
              height: '5px',
              backgroundColor: 'var(--color-primary-black)',
              borderRadius: '50%'
            }} />
          </button>

          {showNotifications && (
            <div style={{
              position: 'absolute',
              right: 0,
              top: '40px',
              width: '300px',
              backgroundColor: 'var(--color-white)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-md)',
              boxShadow: 'var(--shadow-md)',
              padding: '12px 0',
              zIndex: 100,
              animation: 'fadeIn 0.15s ease-out'
            }}>
              <div style={{
                padding: '0 16px 8px',
                borderBottom: '1px solid var(--color-border-subtle)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <span style={{ fontSize: '12px', fontWeight: 600 }}>System Notifications</span>
                <span style={{ fontSize: '10.5px', color: 'var(--color-secondary-text)' }}>3 active</span>
              </div>
              <div style={{ maxHeight: '240px', overflowY: 'auto' }}>
                {notifications.map(n => (
                  <div key={n.id} style={{
                    padding: '8px 16px',
                    borderBottom: '1px solid var(--color-border-subtle)',
                    backgroundColor: n.unread ? 'var(--color-off-white)' : 'transparent'
                  }}>
                    <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-primary-black)' }}>
                      {n.title}
                    </div>
                    <div style={{ fontSize: '11px', color: 'var(--color-secondary-text)', marginTop: '2px', lineHeight: 1.35 }}>
                      {n.desc}
                    </div>
                    <div style={{ fontSize: '9.5px', color: 'var(--color-secondary-text)', marginTop: '3px' }}>
                      {n.time}
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ padding: '6px 16px 0', textAlign: 'center' }}>
                <button 
                  onClick={() => {
                    setShowNotifications(false);
                    onNavigate('activity');
                  }}
                  style={{
                    fontSize: '11px',
                    color: 'var(--color-primary-black)',
                    fontWeight: 600,
                    textDecoration: 'underline'
                  }}
                >
                  View full audit log &rarr;
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Profile Pill */}
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => {
              setShowUserMenu(!showUserMenu);
              setShowNotifications(false);
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '4px 8px 4px 5px',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--color-border)',
              backgroundColor: 'var(--color-white)'
            }}
          >
            <div style={{
              width: '22px',
              height: '22px',
              borderRadius: 'var(--radius-full)',
              backgroundColor: 'var(--color-primary-black)',
              color: 'var(--color-white)',
              fontSize: '10px',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              VA
            </div>
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontSize: '11.5px', fontWeight: 600, color: 'var(--color-primary-black)', lineHeight: 1.1 }}>
                Vidhi Ambade
              </div>
            </div>
            <ChevronDown size={12} style={{ color: 'var(--color-secondary-text)' }} />
          </button>

          {showUserMenu && (
            <div style={{
              position: 'absolute',
              right: 0,
              top: '40px',
              width: '200px',
              backgroundColor: 'var(--color-white)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-md)',
              boxShadow: 'var(--shadow-md)',
              padding: '6px 0',
              zIndex: 100,
              animation: 'fadeIn 0.15s ease-out'
            }}>
              <div style={{ padding: '6px 12px 8px', borderBottom: '1px solid var(--color-border-subtle)' }}>
                <div style={{ fontSize: '11px', fontWeight: 600 }}>vidhi.ambade@gmail.com</div>
                <div style={{ fontSize: '10px', color: 'var(--color-secondary-text)' }}>Sovereign Vault Owner</div>
              </div>
              <button 
                onClick={() => { setShowUserMenu(false); onNavigate('security'); }}
                style={{
                  width: '100%',
                  padding: '7px 12px',
                  textAlign: 'left',
                  fontSize: '12px',
                  color: 'var(--color-primary-black)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <ShieldCheck size={13} /> Security & 2FA
              </button>
              <button 
                onClick={() => { setShowUserMenu(false); onNavigate('settings'); }}
                style={{
                  width: '100%',
                  padding: '7px 12px',
                  textAlign: 'left',
                  fontSize: '12px',
                  color: 'var(--color-primary-black)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <User size={13} /> Academic Settings
              </button>
              {onOpenOnboarding && (
                <button 
                  onClick={() => { setShowUserMenu(false); onOpenOnboarding(); }}
                  style={{
                    width: '100%',
                    padding: '7px 12px',
                    textAlign: 'left',
                    fontSize: '12px',
                    color: 'var(--color-primary-black)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                >
                  <Sparkles size={13} /> Onboarding Tour & Tips
                </button>
              )}
              <div style={{ borderTop: '1px solid var(--color-border-subtle)', margin: '4px 0' }} />
              <button 
                onClick={() => {
                  setShowUserMenu(false);
                  onOpenAuthModal();
                }}
                style={{
                  width: '100%',
                  padding: '7px 12px',
                  textAlign: 'left',
                  fontSize: '12px',
                  color: 'var(--color-secondary-text)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <Lock size={13} /> Lock Session (2FA Challenge)
              </button>
              {onLogout && (
                <button 
                  onClick={() => {
                    setShowUserMenu(false);
                    onLogout();
                  }}
                  style={{
                    width: '100%',
                    padding: '7px 12px',
                    textAlign: 'left',
                    fontSize: '12px',
                    color: '#DC2626',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                >
                  <LogOut size={13} /> Log Out of Vault
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
