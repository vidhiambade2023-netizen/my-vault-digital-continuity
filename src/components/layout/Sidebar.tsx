import React from 'react';
import { 
  LayoutDashboard, 
  Link2, 
  FolderKanban, 
  Users, 
  FileSpreadsheet, 
  Clock, 
  Shield, 
  History, 
  Settings,
  Plus,
  Lock,
  LogOut,
  Sparkles
} from 'lucide-react';
import { ActiveView } from '../../types';

interface SidebarProps {
  activeView: ActiveView;
  onNavigate: (view: ActiveView) => void;
  onOpenConnectModal: () => void;
  onOpenAuthModal: () => void;
  onLogout?: () => void;
  onOpenOnboarding?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeView,
  onNavigate,
  onOpenConnectModal,
  onOpenAuthModal,
  onLogout,
  onOpenOnboarding
}) => {
  const mainNav = [
    { id: 'dashboard', label: 'Overview', icon: <LayoutDashboard size={16} strokeWidth={1.7} /> },
    { id: 'connected_services', label: 'Connected services', icon: <Link2 size={16} strokeWidth={1.7} /> },
    { id: 'groups', label: 'Service groups', icon: <FolderKanban size={16} strokeWidth={1.7} /> },
    { id: 'nominees', label: 'Trusted nominees', icon: <Users size={16} strokeWidth={1.7} /> },
    { id: 'access_rules', label: 'Access rules', icon: <FileSpreadsheet size={16} strokeWidth={1.7} /> },
    { id: 'continuity_plan', label: 'Continuity plan', icon: <Clock size={16} strokeWidth={1.7} /> },
  ];

  const secondaryNav = [
    { id: 'security', label: 'Security & 2FA', icon: <Shield size={16} strokeWidth={1.7} /> },
    { id: 'activity', label: 'Audit trail', icon: <History size={16} strokeWidth={1.7} /> },
    { id: 'settings', label: 'Settings', icon: <Settings size={16} strokeWidth={1.7} /> }
  ];

  return (
    <aside style={{
      width: '240px',
      backgroundColor: 'var(--color-white)',
      borderRight: '1px solid var(--color-border)',
      display: 'flex',
      flexDirection: 'column',
      alignSelf: 'stretch',
      minHeight: '100vh',
      height: 'auto',
      flexShrink: 0,
      position: 'relative',
      zIndex: 50,
      userSelect: 'none'
    }}>
      {/* Sticky container that keeps navigation in view during browser scroll while ensuring full-height stretch in Figma */}
      <div style={{
        position: 'sticky',
        top: 0,
        height: '100vh',
        maxHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        width: '100%',
        boxSizing: 'border-box'
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0 }}>
          {/* Brand Header */}
          <div style={{
            padding: '20px 18px 14px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '9px' }}>
              <div style={{
                width: '24px',
                height: '24px',
                borderRadius: '6px',
                backgroundColor: 'var(--color-primary-black)',
                color: 'var(--color-white)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '11px',
                fontWeight: 700,
                letterSpacing: '0.02em'
              }}>
                V
              </div>
              <span style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '18px',
                fontWeight: 500,
                letterSpacing: '-0.01em',
                color: 'var(--color-primary-black)'
              }}>
                My Vault
              </span>
            </div>
          </div>

          {/* Top Action Button - Modeled on "+ New" in Reference 1 */}
          <div style={{ padding: '4px 14px 14px' }}>
            <button
              onClick={onOpenConnectModal}
              style={{
                width: '100%',
                backgroundColor: 'var(--color-pale-blue-grey)',
                color: 'var(--color-primary-black)',
                padding: '8px 12px',
                borderRadius: '8px',
                fontSize: '13px',
                fontWeight: 500,
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                border: 'none',
                cursor: 'pointer',
                transition: 'background-color var(--transition-fast)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#DDE2EC';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--color-pale-blue-grey)';
              }}
            >
              <Plus size={16} strokeWidth={2} />
              <span>Connect service</span>
            </button>
          </div>

          {/* Main Navigation List */}
          <div style={{
            flex: 1,
            padding: '0 10px',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '2px'
          }}>
        {mainNav.map(item => {
          const isActive = activeView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id as ActiveView)}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '7px 10px',
                borderRadius: '8px',
                backgroundColor: isActive ? 'var(--color-pale-blue-grey)' : 'transparent',
                color: isActive ? 'var(--color-primary-black)' : 'var(--color-secondary-text)',
                fontWeight: isActive ? 500 : 400,
                fontSize: '13px',
                textAlign: 'left',
                border: 'none',
                cursor: 'pointer',
                transition: 'all var(--transition-fast)'
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.backgroundColor = 'var(--color-off-white)';
                  e.currentTarget.style.color = 'var(--color-primary-black)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = 'var(--color-secondary-text)';
                }
              }}
            >
              <span style={{
                color: isActive ? 'var(--color-primary-black)' : 'var(--color-secondary-text)',
                display: 'flex',
                alignItems: 'center'
              }}>
                {item.icon}
              </span>
              <span>{item.label}</span>
            </button>
          );
        })}

        {/* Subtle Section Divider */}
        <div style={{
          height: '1px',
          backgroundColor: 'var(--color-border-subtle)',
          margin: '12px 6px 8px'
        }} />

        <div style={{
          fontSize: '10.5px',
          fontWeight: 500,
          color: 'var(--color-secondary-text)',
          padding: '2px 10px 4px',
          letterSpacing: '0.04em'
        }}>
          Governance
        </div>

        {secondaryNav.map(item => {
          const isActive = activeView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id as ActiveView)}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '7px 10px',
                borderRadius: '8px',
                backgroundColor: isActive ? 'var(--color-pale-blue-grey)' : 'transparent',
                color: isActive ? 'var(--color-primary-black)' : 'var(--color-secondary-text)',
                fontWeight: isActive ? 500 : 400,
                fontSize: '13px',
                textAlign: 'left',
                border: 'none',
                cursor: 'pointer',
                transition: 'all var(--transition-fast)'
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.backgroundColor = 'var(--color-off-white)';
                  e.currentTarget.style.color = 'var(--color-primary-black)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = 'var(--color-secondary-text)';
                }
              }}
            >
              <span style={{
                color: isActive ? 'var(--color-primary-black)' : 'var(--color-secondary-text)',
                display: 'flex',
                alignItems: 'center'
              }}>
                {item.icon}
              </span>
              <span>{item.label}</span>
            </button>
          );
        })}

        {/* Onboarding Tour Direct Trigger */}
        {onOpenOnboarding && (
          <button
            onClick={onOpenOnboarding}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '7px 10px',
              borderRadius: '8px',
              backgroundColor: 'transparent',
              color: 'var(--color-secondary-text)',
              fontWeight: 400,
              fontSize: '12.5px',
              textAlign: 'left',
              border: 'none',
              cursor: 'pointer',
              marginTop: '4px',
              transition: 'all var(--transition-fast)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--color-off-white)';
              e.currentTarget.style.color = 'var(--color-primary-black)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = 'var(--color-secondary-text)';
            }}
          >
            <Sparkles size={15} strokeWidth={1.7} />
            <span>Onboarding tips</span>
          </button>
        )}
      </div>
      </div>

      {/* Bottom Profile Footer */}
      <div style={{
        padding: '12px 14px',
        borderTop: '1px solid var(--color-border-subtle)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{
            width: '26px',
            height: '26px',
            borderRadius: '50%',
            backgroundColor: 'var(--color-pale-blue-grey)',
            color: 'var(--color-primary-black)',
            fontSize: '11px',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px solid var(--color-border)'
          }}>
            VA
          </div>
          <div>
            <div style={{
              fontSize: '12.5px',
              fontWeight: 500,
              color: 'var(--color-primary-black)',
              lineHeight: 1.2
            }}>
              Vidhi Ambade
            </div>
            <div style={{
              fontSize: '11px',
              color: 'var(--color-secondary-text)'
            }}>
              Owner • Active
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
          <button
            onClick={onOpenAuthModal}
            style={{
              color: 'var(--color-secondary-text)',
              padding: '5px',
              borderRadius: '6px',
              border: 'none',
              background: 'transparent',
              cursor: 'pointer'
            }}
            title="Lock session / Test 2FA"
          >
            <Lock size={14} />
          </button>

          {onLogout && (
            <button
              onClick={onLogout}
              style={{
                color: 'var(--color-secondary-text)',
                padding: '5px',
                borderRadius: '6px',
                border: 'none',
                background: 'transparent',
                cursor: 'pointer'
              }}
              title="Log out of vault"
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#DC2626';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'var(--color-secondary-text)';
              }}
            >
              <LogOut size={14} />
            </button>
          )}
        </div>
      </div>
      </div>
    </aside>
  );
};
