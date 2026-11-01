import React from 'react';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';
import { Toast } from '../common/Toast';
import { ActiveView } from '../../types';

interface AppShellProps {
  children: React.ReactNode;
  activeView: ActiveView;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onNavigate: (view: ActiveView) => void;
  onOpenConnectModal: () => void;
  onOpenAuthModal: () => void;
  onLogout?: () => void;
  onOpenOnboarding?: () => void;
  toast: { message: string; type: 'success' | 'info' | 'warning' } | null;
  onCloseToast: () => void;
}

export const AppShell: React.FC<AppShellProps> = ({
  children,
  activeView,
  searchQuery,
  onSearchChange,
  onNavigate,
  onOpenConnectModal,
  onOpenAuthModal,
  onLogout,
  onOpenOnboarding,
  toast,
  onCloseToast
}) => {
  return (
    <div style={{
      display: 'flex',
      minHeight: '100vh',
      alignItems: 'stretch',
      backgroundColor: 'var(--color-off-white)',
      position: 'relative'
    }}>
      {/* Persistent Left Sidebar */}
      <Sidebar
        activeView={activeView}
        onNavigate={onNavigate}
        onOpenConnectModal={onOpenConnectModal}
        onOpenAuthModal={onOpenAuthModal}
        onLogout={onLogout}
        onOpenOnboarding={onOpenOnboarding}
      />

      {/* Main Content Area */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        {/* Slim Topbar */}
        <Topbar
          activeView={activeView}
          searchQuery={searchQuery}
          onSearchChange={onSearchChange}
          onOpenAuthModal={onOpenAuthModal}
          onNavigate={onNavigate}
          onLogout={onLogout}
          onOpenOnboarding={onOpenOnboarding}
        />

        {/* View Body - Spacious Editorial Layout optimized for 1440x900 presentations */}
        <main style={{
          flex: 1,
          padding: '24px 36px 40px',
          maxWidth: '1240px',
          width: '100%',
          margin: '0 auto',
          boxSizing: 'border-box'
        }}>
          {children}
        </main>
      </div>

      {/* Toast Feedback */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={onCloseToast}
        />
      )}
    </div>
  );
};

