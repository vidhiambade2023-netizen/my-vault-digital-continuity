import React, { useState } from 'react';
import './storybook.css';
import { FoundationsStory } from './stories/FoundationsStory';
import { ButtonStory } from './stories/ButtonStory';
import { BadgeStory } from './stories/BadgeStory';
import { ProviderIconStory } from './stories/ProviderIconStory';
import { InputControlsStory } from './stories/InputControlsStory';
import { StatCardStory } from './stories/StatCardStory';
import { ServiceCardStory } from './stories/ServiceCardStory';
import { NomineeCardStory } from './stories/NomineeCardStory';
import { GroupCardStory } from './stories/GroupCardStory';
import { SecuritySessionStory } from './stories/SecuritySessionStory';
import { AccessRulesMatrixStory } from './stories/AccessRulesMatrixStory';
import { ContinuityTimelineStory } from './stories/ContinuityTimelineStory';
import { AuditTrailStory } from './stories/AuditTrailStory';
import { NoticeBannerStory } from './stories/NoticeBannerStory';
import { ModalStory } from './stories/ModalStory';
import { ToastStory } from './stories/ToastStory';
import { NavigationStory } from './stories/NavigationStory';
import { DocsView } from './components/DocsView';

export type StoryId = 
  | 'foundations'
  | 'button'
  | 'badge'
  | 'provider-icon'
  | 'input-controls'
  | 'stat-card'
  | 'service-card'
  | 'nominee-card'
  | 'group-card'
  | 'security-session'
  | 'access-rules-matrix'
  | 'continuity-timeline'
  | 'audit-trail'
  | 'notice-banner'
  | 'modal'
  | 'toast'
  | 'navigation';

interface StoryItem {
  id: StoryId;
  name: string;
  category: 'Foundations' | 'Elements' | 'Cards' | 'Governance' | 'Feedback' | 'Layout';
}

export const App: React.FC = () => {
  const [selectedStory, setSelectedStory] = useState<StoryId>('foundations');
  const [searchFilter, setSearchFilter] = useState('');
  const [activeTab, setActiveTab] = useState<'canvas' | 'docs'>('canvas');
  const [canvasBg, setCanvasBg] = useState<'off-white' | 'white' | 'dark'>('off-white');
  const [viewport, setViewport] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [zoom, setZoom] = useState<number>(100);

  const stories: StoryItem[] = [
    // Foundations
    { id: 'foundations', name: 'Tokens & Typography', category: 'Foundations' },
    
    // Elements
    { id: 'button', name: 'Button', category: 'Elements' },
    { id: 'badge', name: 'Badge & Status Tags', category: 'Elements' },
    { id: 'provider-icon', name: 'ProviderIcon', category: 'Elements' },
    { id: 'input-controls', name: 'Input & Form Controls', category: 'Elements' },
    
    // Cards
    { id: 'stat-card', name: 'StatCard', category: 'Cards' },
    { id: 'service-card', name: 'ServiceConnectorCard', category: 'Cards' },
    { id: 'nominee-card', name: 'NomineeCard', category: 'Cards' },
    { id: 'group-card', name: 'Service Group Card', category: 'Cards' },
    { id: 'security-session', name: 'Security Sessions & Passkeys', category: 'Cards' },
    
    // Governance
    { id: 'access-rules-matrix', name: 'Access Rules Matrix Table', category: 'Governance' },
    { id: 'continuity-timeline', name: 'Continuity Protocol Timeline', category: 'Governance' },
    { id: 'audit-trail', name: 'Audit Trail & Activity Ledger', category: 'Governance' },
    
    // Feedback
    { id: 'notice-banner', name: 'NoticeBanner', category: 'Feedback' },
    { id: 'modal', name: 'Modal Overlays', category: 'Feedback' },
    { id: 'toast', name: 'Toast Notifications', category: 'Feedback' },
    
    // Layout
    { id: 'navigation', name: 'Navigation Shell', category: 'Layout' }
  ];

  const filteredStories = stories.filter(s => 
    s.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
    s.category.toLowerCase().includes(searchFilter.toLowerCase())
  );

  const categories: Array<StoryItem['category']> = [
    'Foundations',
    'Elements',
    'Cards',
    'Governance',
    'Feedback',
    'Layout'
  ];

  const getViewportWidth = () => {
    if (viewport === 'tablet') return '1024px';
    if (viewport === 'mobile') return '390px';
    return '1440px';
  };

  const getBgColor = () => {
    if (canvasBg === 'white') return '#FFFFFF';
    if (canvasBg === 'dark') return '#0B0B0D';
    return '#F8F8F6';
  };

  return (
    <div className="sb-shell">
      {/* Storybook Left Sidebar */}
      <aside className="sb-sidebar">
        <div className="sb-brand">
          <div className="sb-brand-logo">
            <div style={{
              width: '24px',
              height: '24px',
              backgroundColor: '#0B0B0D',
              borderRadius: '6px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFFFFF',
              fontWeight: 700,
              fontSize: '11px'
            }}>
              V
            </div>
            <div>
              <div style={{ fontSize: '13.5px', fontWeight: 600, color: '#0B0B0D', lineHeight: 1.2 }}>
                My Vault
              </div>
              <div style={{ fontSize: '10.5px', color: '#737680' }}>
                Design System v1.0 • 17 Components
              </div>
            </div>
          </div>
          <span className="sb-badge-pink">STORYBOOK</span>
        </div>

        {/* Search */}
        <div className="sb-search">
          <input
            type="text"
            placeholder="Search stories... (⌘K)"
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
          />
        </div>

        {/* Tree List */}
        <div className="sb-nav-tree">
          {categories.map(cat => {
            const catStories = filteredStories.filter(s => s.category === cat);
            if (catStories.length === 0) return null;

            return (
              <div key={cat}>
                <div className="sb-nav-category">{cat}</div>
                {catStories.map(story => (
                  <button
                    key={story.id}
                    onClick={() => setSelectedStory(story.id)}
                    className={`sb-nav-item ${selectedStory === story.id ? 'active' : ''}`}
                  >
                    <span className="sb-bullet" />
                    <span>{story.name}</span>
                  </button>
                ))}
              </div>
            );
          })}
        </div>
      </aside>

      {/* Storybook Main Stage */}
      <div className="sb-main">
        {/* Storybook Top Toolbar */}
        <div className="sb-toolbar">
          <div className="sb-toolbar-left">
            <button
              onClick={() => setActiveTab('canvas')}
              className={`sb-mode-tab ${activeTab === 'canvas' ? 'active' : ''}`}
            >
              Canvas
            </button>
            <button
              onClick={() => setActiveTab('docs')}
              className={`sb-mode-tab ${activeTab === 'docs' ? 'active' : ''}`}
            >
              Docs & Specs
            </button>
          </div>

          <div className="sb-toolbar-right">
            {/* Viewport controls (only relevant on Canvas) */}
            {activeTab === 'canvas' && (
              <div style={{ display: 'flex', border: '1px solid #E5E7EB', borderRadius: '4px', overflow: 'hidden' }}>
                <button
                  onClick={() => setViewport('desktop')}
                  className={`sb-tool-btn ${viewport === 'desktop' ? 'active' : ''}`}
                  title="Desktop 1440px"
                >
                  1440px
                </button>
                <button
                  onClick={() => setViewport('tablet')}
                  className={`sb-tool-btn ${viewport === 'tablet' ? 'active' : ''}`}
                  title="Tablet 1024px"
                >
                  1024px
                </button>
                <button
                  onClick={() => setViewport('mobile')}
                  className={`sb-tool-btn ${viewport === 'mobile' ? 'active' : ''}`}
                  title="Mobile 390px"
                >
                  390px
                </button>
              </div>
            )}

            {/* Background switcher */}
            {activeTab === 'canvas' && (
              <div style={{ display: 'flex', border: '1px solid #E5E7EB', borderRadius: '4px', overflow: 'hidden' }}>
                <button
                  onClick={() => setCanvasBg('off-white')}
                  className={`sb-tool-btn ${canvasBg === 'off-white' ? 'active' : ''}`}
                  title="Off-white background (#F8F8F6)"
                >
                  Off-White
                </button>
                <button
                  onClick={() => setCanvasBg('white')}
                  className={`sb-tool-btn ${canvasBg === 'white' ? 'active' : ''}`}
                  title="Pure white background (#FFFFFF)"
                >
                  White
                </button>
                <button
                  onClick={() => setCanvasBg('dark')}
                  className={`sb-tool-btn ${canvasBg === 'dark' ? 'active' : ''}`}
                  title="Dark canvas (#0B0B0D)"
                >
                  Dark
                </button>
              </div>
            )}

            {/* Zoom Controls */}
            {activeTab === 'canvas' && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
                <button
                  onClick={() => setZoom(Math.max(50, zoom - 10))}
                  className="sb-tool-btn"
                  title="Zoom out"
                >
                  -
                </button>
                <span style={{ fontSize: '11px', fontFamily: 'var(--sb-font-mono)', minWidth: '36px', textAlign: 'center' }}>
                  {zoom}%
                </span>
                <button
                  onClick={() => setZoom(Math.min(150, zoom + 10))}
                  className="sb-tool-btn"
                  title="Zoom in"
                >
                  +
                </button>
                <button
                  onClick={() => setZoom(100)}
                  className="sb-tool-btn"
                  title="Reset zoom"
                >
                  Reset
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Viewport / Stage Container */}
        <div className="sb-content-viewport" style={{ backgroundColor: activeTab === 'docs' ? '#FFFFFF' : getBgColor() }}>
          <div className="sb-stage">
            {activeTab === 'docs' ? (
              <DocsView storyId={selectedStory} />
            ) : (
              <div
                className="sb-stage-card"
                style={{
                  maxWidth: getViewportWidth(),
                  transform: `scale(${zoom / 100})`,
                  transformOrigin: 'top center'
                }}
              >
                {selectedStory === 'foundations' && <FoundationsStory />}
                {selectedStory === 'button' && <ButtonStory />}
                {selectedStory === 'badge' && <BadgeStory />}
                {selectedStory === 'provider-icon' && <ProviderIconStory />}
                {selectedStory === 'input-controls' && <InputControlsStory />}
                {selectedStory === 'stat-card' && <StatCardStory />}
                {selectedStory === 'service-card' && <ServiceCardStory />}
                {selectedStory === 'nominee-card' && <NomineeCardStory />}
                {selectedStory === 'group-card' && <GroupCardStory />}
                {selectedStory === 'security-session' && <SecuritySessionStory />}
                {selectedStory === 'access-rules-matrix' && <AccessRulesMatrixStory />}
                {selectedStory === 'continuity-timeline' && <ContinuityTimelineStory />}
                {selectedStory === 'audit-trail' && <AuditTrailStory />}
                {selectedStory === 'notice-banner' && <NoticeBannerStory />}
                {selectedStory === 'modal' && <ModalStory />}
                {selectedStory === 'toast' && <ToastStory />}
                {selectedStory === 'navigation' && <NavigationStory />}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
