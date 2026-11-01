import React, { useState } from 'react';
import { Sidebar } from '@app/components/layout/Sidebar';
import { Topbar } from '@app/components/layout/Topbar';
import { ActiveView } from '@app/types';

export const NavigationStory: React.FC = () => {
  const [activeView, setActiveView] = useState<ActiveView>('dashboard');
  const [search, setSearch] = useState('');

  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '26px', fontWeight: 400, color: '#0B0B0D', marginBottom: '6px' }}>
          Navigation & Layout Architecture
        </h2>
        <p style={{ fontSize: '13px', color: 'var(--color-secondary-text)' }}>
          Sidebar navigation and topbar controls with editorial typography, breadcrumb metadata, and session management.
        </p>
      </div>

      <div style={{
        height: '620px',
        border: '1px solid #E1E2E5',
        borderRadius: '8px',
        overflow: 'hidden',
        display: 'flex',
        backgroundColor: '#F8F8F6'
      }}>
        {/* Render Sidebar */}
        <Sidebar
          activeView={activeView}
          onNavigate={(view) => setActiveView(view)}
          onOpenConnectModal={() => alert('Connect Modal Triggered')}
          onOpenAuthModal={() => alert('Auth Modal Triggered')}
          onLogout={() => alert('Logout Triggered')}
          onOpenOnboarding={() => alert('Onboarding Tour Triggered')}
        />

        {/* Render Topbar + View Preview */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <Topbar
            activeView={activeView}
            searchQuery={search}
            onSearchChange={setSearch}
            onOpenAuthModal={() => alert('Auth Modal')}
            onNavigate={(view) => setActiveView(view)}
            onLogout={() => alert('Logout')}
            onOpenOnboarding={() => alert('Onboarding')}
          />

          <div style={{ flex: 1, padding: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ textAlign: 'center', maxWidth: '400px' }}>
              <div style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: '#737680', textTransform: 'uppercase', marginBottom: '4px' }}>
                CURRENT ACTIVE ROUTE:
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#0B0B0D', marginBottom: '8px' }}>
                {activeView.replace('_', ' ').toUpperCase()}
              </h3>
              <p style={{ fontSize: '13px', color: '#737680' }}>
                Click items in the sidebar or topbar controls to test real-time navigation states and active indicator styling.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
