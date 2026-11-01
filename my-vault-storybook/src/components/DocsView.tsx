import React, { useState } from 'react';
import { Copy, Check, Code, Shield, Sparkles, Layers } from 'lucide-react';

interface PropSpec {
  name: string;
  type: string;
  defaultValue: string;
  required: boolean;
  description: string;
}

interface ComponentDoc {
  title: string;
  category: string;
  summary: string;
  designIntent: string;
  props: PropSpec[];
  tokens: { category: string; value: string }[];
  accessibility: string[];
  codeSnippet: string;
}

const DOCS_DATA: Record<string, ComponentDoc> = {
  'foundations': {
    title: 'Tokens & Typography',
    category: 'Foundations',
    summary: 'Core design tokens defining color swatches, typography hierarchy, border radiuses, and elevation shadows across My Vault.',
    designIntent: 'Strictly limited palette based on Swiss editorial minimalism. High contrast typography using Instrument Serif for editorial statement headings, Inter for high-density UI text, and JetBrains Mono for cryptographic hashes and serial tokens.',
    props: [],
    tokens: [
      { category: 'Color Primary', value: '#0B0B0D (Primary Black)' },
      { category: 'Color Background', value: '#F8F8F6 (Off-White Canvas)' },
      { category: 'Color Border', value: '#E1E2E5 (Subtle Grey Border)' },
      { category: 'Color Accent', value: '#E7EAF0 (Pale Blue Grey)' },
      { category: 'Color Text Secondary', value: '#737680 (Muted Slate)' },
      { category: 'Font Serif', value: '"Instrument Serif", serif' },
      { category: 'Font Sans', value: '"Inter", sans-serif' },
      { category: 'Font Mono', value: '"JetBrains Mono", monospace' }
    ],
    accessibility: [
      'Contrast ratio of #0B0B0D on #F8F8F6 is 17.8:1, exceeding WCAG AAA requirements.',
      'Secondary text #737680 has a contrast ratio of 4.6:1 against #FFFFFF, meeting WCAG AA standards.'
    ],
    codeSnippet: `:root {
  --color-primary-black: #0B0B0D;
  --color-off-white: #F8F8F6;
  --color-pale-blue-grey: #E7EAF0;
  --color-border: #E1E2E5;
  --color-secondary-text: #737680;
  --font-serif: "Instrument Serif", Georgia, serif;
  --font-sans: "Inter", -apple-system, BlinkMacSystemFont, sans-serif;
  --font-mono: "JetBrains Mono", Menlo, monospace;
}`
  },
  'button': {
    title: 'Button',
    category: 'Elements',
    summary: 'Tactile action trigger supporting 5 semantic variants, 3 sizes, leading/trailing icons, and disabled states.',
    designIntent: 'Primary button uses solid black background (#0B0B0D) with inverted white text for maximum hierarchy. Secondary buttons use transparent backgrounds with crisp 1px borders (#E1E2E5). Destructive buttons reserved exclusively for revoking nominee leases or unlinking accounts.',
    props: [
      { name: 'variant', type: "'primary' | 'secondary' | 'accent' | 'destructive' | 'ghost'", defaultValue: "'secondary'", required: false, description: 'Visual style and hierarchy.' },
      { name: 'size', type: "'sm' | 'md' | 'lg'", defaultValue: "'md'", required: false, description: 'Padding and font scale.' },
      { name: 'icon', type: 'React.ReactNode', defaultValue: 'undefined', required: false, description: 'Optional leading icon element.' },
      { name: 'disabled', type: 'boolean', defaultValue: 'false', required: false, description: 'Prevents clicks and reduces opacity to 0.4.' },
      { name: 'onClick', type: '() => void', defaultValue: 'undefined', required: false, description: 'Click event handler.' }
    ],
    tokens: [
      { category: 'Primary Fill', value: '#0B0B0D' },
      { category: 'Secondary Border', value: '1px solid #E1E2E5' },
      { category: 'Border Radius', value: '6px' },
      { category: 'Transitions', value: 'all 0.15s ease' }
    ],
    accessibility: [
      'Supports standard keyboard interaction (Enter and Space keys).',
      'Visible focus ring with 2px offset applied on :focus-visible.',
      'Aria-disabled attribute applied when disabled is true.'
    ],
    codeSnippet: `<button className="btn-primary" onClick={handleConnect}>
  <Plus size={14} />
  <span>Connect service</span>
</button>

<button className="btn-secondary" onClick={handleReview}>
  <span>Review plan →</span>
</button>`
  },
  'badge': {
    title: 'Badge & Status Tags',
    category: 'Elements',
    summary: 'Compact status indicators communicating connection state, verification progress, and privacy locks.',
    designIntent: 'Micro-status pills communicating binary states (e.g., active owner control vs. unlinked account). Pill geometry with 12px radius, subtle background tint, and high-contrast text.',
    props: [
      { name: 'variant', type: "'active' | 'connected' | 'verified' | 'success' | 'pending' | 'under_review' | 'warning' | 'locked' | 'excluded' | 'rejected' | 'error' | 'neutral' | 'unlinked'", defaultValue: "'neutral'", required: false, description: 'Semantic status variant.' },
      { name: 'size', type: "'sm' | 'md'", defaultValue: "'sm'", required: false, description: 'Small (10.5px text) or Medium (11.5px text).' },
      { name: 'dot', type: 'boolean', defaultValue: 'true', required: false, description: 'Whether to show the 5px status dot indicator.' },
      { name: 'children', type: 'React.ReactNode', defaultValue: 'undefined', required: true, description: 'Label text inside badge.' }
    ],
    tokens: [
      { category: 'Success/Active', value: 'Background: #EDF7EE, Text: #16A34A' },
      { category: 'Locked', value: 'Background: #FFF1F2, Text: #BE123C' },
      { category: 'Pending', value: 'Background: #FFFBEB, Text: #B45309' },
      { category: 'Neutral/Unlinked', value: 'Background: #F1F3F5, Text: #737680' }
    ],
    accessibility: [
      'Uses role="status" when indicating dynamic background tasks.',
      'Text label ensures screen readers do not rely solely on color.'
    ],
    codeSnippet: `<Badge variant="connected" size="sm">Connected</Badge>
<Badge variant="verified" size="sm">Email Verified</Badge>
<Badge variant="locked" size="sm">Zero-Knowledge</Badge>`
  },
  'provider-icon': {
    title: 'ProviderIcon',
    category: 'Elements',
    summary: 'High-precision SVG logos for integrated platform providers (Google, Apple, Microsoft, Dropbox, Instagram, Facebook).',
    designIntent: 'Authentic brand iconography rendered inside standard geometric frames with consistent aspect ratios.',
    props: [
      { name: 'provider', type: "'google' | 'apple' | 'microsoft' | 'dropbox' | 'instagram' | 'facebook'", defaultValue: 'required', required: true, description: 'Platform identifier key.' },
      { name: 'size', type: 'number', defaultValue: '20', required: false, description: 'Pixel size of the rendered icon.' },
      { name: 'withContainer', type: 'boolean', defaultValue: 'false', required: false, description: 'Wraps the logo inside a 36px white rounded tile with 1px border.' }
    ],
    tokens: [
      { category: 'Container Background', value: '#FFFFFF' },
      { category: 'Container Border', value: '1px solid #E1E2E5' },
      { category: 'Container Radius', value: '6px' }
    ],
    accessibility: [
      'Includes aria-label with provider display name.',
      'SVGs contain role="img" and presentation title.'
    ],
    codeSnippet: `<ProviderIcon provider="google" size={24} withContainer={true} />
<ProviderIcon provider="apple" size={24} withContainer={true} />`
  },
  'input-controls': {
    title: 'Input & Form Controls',
    category: 'Elements',
    summary: 'Tactile input controls, search filters with keyboard shortcuts, and zero-knowledge privacy locks.',
    designIntent: 'Crisp input fields with consistent focus states, subtle border highlighting, and specialized visual treatments for masked sensitive inputs.',
    props: [
      { name: 'type', type: 'string', defaultValue: "'text'", required: false, description: 'HTML input type.' },
      { name: 'placeholder', type: 'string', defaultValue: "''", required: false, description: 'Placeholder label.' },
      { name: 'value', type: 'string', defaultValue: "''", required: true, description: 'Current field value.' },
      { name: 'onChange', type: '(e: ChangeEvent) => void', defaultValue: 'required', required: true, description: 'Change handler.' }
    ],
    tokens: [
      { category: 'Input Height', value: '38px' },
      { category: 'Focus Border', value: '1px solid #0B0B0D' },
      { category: 'Background', value: '#FFFFFF' }
    ],
    accessibility: [
      'Explicit labels associated via htmlFor/id attributes.',
      'Keyboard accelerator (⌘K) triggers global focus.'
    ],
    codeSnippet: `<input
  type="search"
  placeholder="Search services, nominees... (⌘K)"
  value={query}
  onChange={(e) => setQuery(e.target.value)}
/>`
  },
  'stat-card': {
    title: 'StatCard',
    category: 'Cards',
    summary: 'High-level dashboard overview metrics displaying count, category, subtext description, and live status badge.',
    designIntent: 'Provides quick-glance status on the 4 pillars: Connected services, Trusted people, Access rules, and Continuity plan status.',
    props: [
      { name: 'title', type: 'string', defaultValue: 'required', required: true, description: 'Metric category title.' },
      { name: 'value', type: 'string | number', defaultValue: 'required', required: true, description: 'Prominent headline number or state.' },
      { name: 'subtext', type: 'string', defaultValue: 'required', required: true, description: 'Descriptive sub-caption.' },
      { name: 'icon', type: 'React.ReactNode', defaultValue: 'required', required: true, description: 'Header icon.' },
      { name: 'badge', type: 'string', defaultValue: 'undefined', required: false, description: 'Optional status tag.' }
    ],
    tokens: [
      { category: 'Card Background', value: '#FFFFFF' },
      { category: 'Card Border', value: '1px solid #E1E2E5' },
      { category: 'Padding', value: '20px' }
    ],
    accessibility: [
      'Uses semantic heading hierarchy.',
      'Numbers are rendered in tabular numerals for legibility.'
    ],
    codeSnippet: `<StatCard
  title="Connected services"
  value="4"
  subtext="Active cloud & social accounts"
  icon={<Link2 size={16} />}
/>`
  },
  'service-card': {
    title: 'ServiceConnectorCard',
    category: 'Cards',
    summary: 'Card component for third-party platforms displaying integration status, account email, eligible categories, and manage trigger.',
    designIntent: 'Distinguishes between connected services participating in continuity vs unlinked catalog platforms ready to connect.',
    props: [
      { name: 'service', type: 'Service', defaultValue: 'required', required: true, description: 'Full service entity with credentials and scopes.' },
      { name: 'onManage', type: '(service: Service) => void', defaultValue: 'required', required: true, description: 'Triggered when clicking Manage.' }
    ],
    tokens: [
      { category: 'Card Height', value: '210px' },
      { category: 'Border Radius', value: '8px' }
    ],
    accessibility: [
      'Accessible card container with interactive action buttons.',
      'Zero-knowledge locks clearly marked with text alternative.'
    ],
    codeSnippet: `<ServiceConnectorCard
  service={googleService}
  onManage={(svc) => openManageModal(svc)}
/>`
  },
  'nominee-card': {
    title: 'NomineeCard',
    category: 'Cards',
    summary: 'Designated trusted person card with initials avatar, email verified badge, delegated categories list, and lifetime standby access.',
    designIntent: 'Human-centric card showcasing nominee identity, cryptographic handshake status, and authorized scopes without exposing vault contents.',
    props: [
      { name: 'nominee', type: 'Nominee', defaultValue: 'required', required: true, description: 'Nominee data record.' },
      { name: 'onManage', type: '(nominee: Nominee) => void', defaultValue: 'required', required: true, description: 'Manage access handler.' }
    ],
    tokens: [
      { category: 'Avatar Background', value: '#E7EAF0' },
      { category: 'Avatar Text', value: '#0B0B0D' }
    ],
    accessibility: [
      'Avatar uses initials with fallback aria-label.',
      'Focusable manage action button.'
    ],
    codeSnippet: `<NomineeCard
  nominee={nomineeRiya}
  onManage={(n) => openNomineeModal(n)}
/>`
  },
  'group-card': {
    title: 'Service Group Card',
    category: 'Cards',
    summary: 'Logical clusters bundling multiple accounts together to streamline delegation and inherit uniform continuity policies.',
    designIntent: 'Enables users to group accounts by purpose (e.g., Photos & Memories, Financial Assets, Social Footprint).',
    props: [
      { name: 'group', type: 'ServiceGroup', defaultValue: 'required', required: true, description: 'Group entity with linked service IDs.' },
      { name: 'onEdit', type: '(group: ServiceGroup) => void', defaultValue: 'required', required: true, description: 'Edit modal trigger.' }
    ],
    tokens: [
      { category: 'Card Background', value: '#FFFFFF' },
      { category: 'Border Radius', value: '12px' }
    ],
    accessibility: [
      'Group header links all bundled service logos via tooltip.'
    ],
    codeSnippet: `<GroupCard group={photoGroup} onEdit={handleEditGroup} />`
  },
  'security-session': {
    title: 'Security Sessions & Hardware Passkeys',
    category: 'Cards',
    summary: 'Active hardware authenticators and authorized browser sessions. Demonstrates owner sovereignty controls and revocation actions.',
    designIntent: 'Provides total transparency into devices holding decryption keys, with instant 1-click session revocation.',
    props: [
      { name: 'sessions', type: 'SecuritySession[]', defaultValue: 'required', required: true, description: 'Active authorized sessions list.' },
      { name: 'onRevokeSession', type: '(id: string) => void', defaultValue: 'required', required: true, description: 'Revocation handler.' }
    ],
    tokens: [
      { category: 'Current Device Fill', value: '#F9FDF9' },
      { category: 'Revoke Border', value: '1px solid #FEE2E2' }
    ],
    accessibility: [
      'Revoke button includes destructive confirmation warning.'
    ],
    codeSnippet: `<SecurityView sessions={sessions} onRevokeSession={revokeId} />`
  },
  'access-rules-matrix': {
    title: 'Access Rules Matrix Table',
    category: 'Governance',
    summary: 'Cross-platform governance policy matrix mapping service categories, assigned nominees, and continuity eligibility.',
    designIntent: 'Provides an immutable audit sheet of who gets what post-life, and enforces inviolable zero-knowledge locks on private chats.',
    props: [
      { name: 'rules', type: 'AccessRule[]', defaultValue: 'required', required: true, description: 'Governance rules array.' },
      { name: 'onToggleStatus', type: '(ruleId: string) => void', defaultValue: 'required', required: true, description: 'Toggle rule status.' }
    ],
    tokens: [
      { category: 'Table Header Fill', value: '#F8F8F6' },
      { category: 'Locked Row Fill', value: '#FFFDFD' }
    ],
    accessibility: [
      'Semantic <table> structure with <th> scopes.',
      'Accessible keyboard navigation across rows.'
    ],
    codeSnippet: `<AccessRulesView rules={rules} onToggleRuleStatus={toggleRule} />`
  },
  'continuity-timeline': {
    title: 'Continuity Protocol Timeline',
    category: 'Governance',
    summary: '5-stage sequential governance activation protocol governing how and when nominees can request access.',
    designIntent: 'Explicit educational demonstration clarifying that nominee verification alone does not activate access without a formal petition and 14-day owner challenge period.',
    props: [
      { name: 'currentStage', type: 'number', defaultValue: '2', required: false, description: 'Active phase index (1 through 5).' },
      { name: 'onAdvance', type: '() => void', defaultValue: 'undefined', required: false, description: 'Simulate next phase transition.' }
    ],
    tokens: [
      { category: 'Current Step Border', value: '1.5px solid #0B0B0D' },
      { category: 'Completed Circle Fill', value: '#EDF7EE' }
    ],
    accessibility: [
      'Step progress bar communicates step status using aria-current="step".'
    ],
    codeSnippet: `<ContinuityPlanView claims={claims} onOpenClaimSimulator={openSim} />`
  },
  'audit-trail': {
    title: 'Audit Trail & Activity Ledger',
    category: 'Governance',
    summary: 'Cryptographically chained ledger documenting all service connections, nominee permissions, and owner authentications.',
    designIntent: 'Displays immutable events with SHA-256 block hashes and category filters for auditability.',
    props: [
      { name: 'events', type: 'AuditEvent[]', defaultValue: 'required', required: true, description: 'Audit events log.' }
    ],
    tokens: [
      { category: 'Hash Font', value: 'var(--font-mono)' },
      { category: 'Row Border', value: '1px solid #E1E2E5' }
    ],
    accessibility: [
      'Filter buttons include active aria-pressed state.',
      'Hash copy button announces copied state to screen readers.'
    ],
    codeSnippet: `<ActivityView events={events} />`
  },
  'notice-banner': {
    title: 'NoticeBanner',
    category: 'Feedback',
    summary: 'System alerts communicating privacy guarantees, 14-day owner grace period, and educational simulation disclaimers.',
    designIntent: 'Clear high-priority callout banners with contextual icons and actionable guidance.',
    props: [
      { name: 'type', type: "'privacy' | 'grace_period' | 'lock' | 'handshake' | 'warning'", defaultValue: "'privacy'", required: false, description: 'Preset banner context.' },
      { name: 'title', type: 'string', defaultValue: 'required', required: true, description: 'Bold headline.' },
      { name: 'message', type: 'string', defaultValue: 'required', required: true, description: 'Detailed notice body.' }
    ],
    tokens: [
      { category: 'Privacy Banner Fill', value: '#F8F8F6' },
      { category: 'Warning Fill', value: '#FFFBEB' }
    ],
    accessibility: [
      'Uses role="region" or role="alert" depending on urgency.'
    ],
    codeSnippet: `<NoticeBanner type="grace_period" onAction={openSettings} />`
  },
  'modal': {
    title: 'Modal Overlays',
    category: 'Feedback',
    summary: 'Focused dialog overlays for connecting services, inviting nominees, simulated 2FA authentication, and confirmation dialogs.',
    designIntent: 'Modal dialog with centered surface, semi-transparent backdrop (#0B0B0D @ 60% opacity), smooth scale animation, and keyboard ESC dismissal.',
    props: [
      { name: 'isOpen', type: 'boolean', defaultValue: 'required', required: true, description: 'Visibility state.' },
      { name: 'onClose', type: '() => void', defaultValue: 'required', required: true, description: 'Dismissal callback.' }
    ],
    tokens: [
      { category: 'Backdrop Fill', value: 'rgba(11, 11, 13, 0.65)' },
      { category: 'Dialog Radius', value: '12px' }
    ],
    accessibility: [
      'Traps focus inside modal while open.',
      'Dismisses on Escape key press.',
      'aria-modal="true" and aria-labelledby.'
    ],
    codeSnippet: `<ServiceConnectorModal
  isOpen={isModalOpen}
  onClose={() => setIsModalOpen(false)}
  onConnectService={handleConnect}
/>`
  },
  'toast': {
    title: 'Toast Notifications',
    category: 'Feedback',
    summary: 'Transient floating micro-feedback banners informing the user of completed actions or background sync events.',
    designIntent: 'Bottom-right docked notifications with 4000ms auto-dismissal timer.',
    props: [
      { name: 'type', type: "'success' | 'info' | 'warning'", defaultValue: "'info'", required: false, description: 'Notification level.' },
      { name: 'message', type: 'string', defaultValue: 'required', required: true, description: 'Notification message text.' },
      { name: 'onClose', type: '() => void', defaultValue: 'required', required: true, description: 'Close trigger.' }
    ],
    tokens: [
      { category: 'Shadow', value: '0 4px 16px rgba(0,0,0,0.1)' },
      { category: 'Toast Radius', value: '6px' }
    ],
    accessibility: [
      'Uses role="status" and aria-live="polite".'
    ],
    codeSnippet: `<Toast
  message="Google Workspace connected successfully"
  type="success"
  onClose={() => setToast(null)}
/>`
  },
  'navigation': {
    title: 'Navigation Shell',
    category: 'Layout',
    summary: 'Application structural layout composed of the sticky editorial sidebar and the topbar breadcrumb bar.',
    designIntent: 'Minimalist editorial navigation shell with clear hierarchical groupings (Workspace vs Governance), active route pills, and user session badge.',
    props: [
      { name: 'activeView', type: 'ActiveView', defaultValue: "'dashboard'", required: true, description: 'Current active route.' },
      { name: 'onNavigate', type: '(view: ActiveView) => void', defaultValue: 'required', required: true, description: 'Route navigation callback.' }
    ],
    tokens: [
      { category: 'Sidebar Width', value: '250px' },
      { category: 'Topbar Height', value: '56px' }
    ],
    accessibility: [
      'Uses <nav> landmark with aria-label="Main Navigation".',
      'Active link marked with aria-current="page".'
    ],
    codeSnippet: `<Sidebar activeView={view} onNavigate={setView} />
<Topbar activeView={view} onSearch={handleSearch} />`
  }
};

export const DocsView: React.FC<{ storyId: string }> = ({ storyId }) => {
  const [copiedSnippet, setCopiedSnippet] = useState(false);
  const doc = DOCS_DATA[storyId] || DOCS_DATA['foundations'];

  const copyCode = () => {
    navigator.clipboard?.writeText(doc.codeSnippet);
    setCopiedSnippet(true);
    setTimeout(() => setCopiedSnippet(false), 2000);
  };

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '12px 0' }}>
      {/* Header */}
      <div style={{ borderBottom: '1px solid #E1E2E5', paddingBottom: '20px', marginBottom: '28px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
          <span style={{
            fontSize: '11px',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
            color: '#737680',
            backgroundColor: '#E7EAF0',
            padding: '2px 8px',
            borderRadius: '4px'
          }}>
            {doc.category}
          </span>
          <span style={{ fontSize: '12px', color: '#737680' }}>Design System Specification</span>
        </div>
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '32px', fontWeight: 400, color: '#0B0B0D', margin: '0 0 8px' }}>
          {doc.title}
        </h1>
        <p style={{ fontSize: '14px', color: '#737680', margin: 0, lineHeight: 1.55 }}>
          {doc.summary}
        </p>
      </div>

      {/* Design Intent */}
      <div style={{ marginBottom: '32px' }}>
        <h2 style={{ fontSize: '16px', fontWeight: 700, color: '#0B0B0D', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Sparkles size={16} />
          <span>Design Intent & Principles</span>
        </h2>
        <div style={{
          backgroundColor: '#FFFFFF',
          border: '1px solid #E1E2E5',
          borderRadius: '8px',
          padding: '18px 20px',
          fontSize: '13px',
          color: '#0B0B0D',
          lineHeight: 1.6
        }}>
          {doc.designIntent}
        </div>
      </div>

      {/* Props Specification Table */}
      {doc.props.length > 0 && (
        <div style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '16px', fontWeight: 700, color: '#0B0B0D', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Layers size={16} />
            <span>Props Specification</span>
          </h2>
          <div style={{
            backgroundColor: '#FFFFFF',
            border: '1px solid #E1E2E5',
            borderRadius: '8px',
            overflow: 'hidden'
          }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '12.5px' }}>
              <thead>
                <tr style={{ backgroundColor: '#F8F8F6', borderBottom: '1px solid #E1E2E5' }}>
                  <th style={{ padding: '10px 14px', fontWeight: 600, color: '#737680', fontSize: '11px', textTransform: 'uppercase' }}>Prop Name</th>
                  <th style={{ padding: '10px 14px', fontWeight: 600, color: '#737680', fontSize: '11px', textTransform: 'uppercase' }}>Type</th>
                  <th style={{ padding: '10px 14px', fontWeight: 600, color: '#737680', fontSize: '11px', textTransform: 'uppercase' }}>Default</th>
                  <th style={{ padding: '10px 14px', fontWeight: 600, color: '#737680', fontSize: '11px', textTransform: 'uppercase' }}>Description</th>
                </tr>
              </thead>
              <tbody>
                {doc.props.map((p, idx) => (
                  <tr key={p.name} style={{ borderBottom: idx < doc.props.length - 1 ? '1px solid #E1E2E5' : 'none' }}>
                    <td style={{ padding: '10px 14px', fontFamily: 'var(--font-mono)', fontWeight: 600, color: '#0B0B0D' }}>
                      {p.name}
                      {p.required && <span style={{ color: '#DC2626', marginLeft: '4px' }}>*</span>}
                    </td>
                    <td style={{ padding: '10px 14px', fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#4B5563' }}>
                      {p.type}
                    </td>
                    <td style={{ padding: '10px 14px', fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#737680' }}>
                      {p.defaultValue}
                    </td>
                    <td style={{ padding: '10px 14px', color: '#737680' }}>
                      {p.description}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Design Tokens Used */}
      <div style={{ marginBottom: '32px' }}>
        <h2 style={{ fontSize: '16px', fontWeight: 700, color: '#0B0B0D', marginBottom: '8px' }}>
          Design Tokens Applied
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
          {doc.tokens.map(t => (
            <div
              key={t.category}
              style={{
                backgroundColor: '#FFFFFF',
                border: '1px solid #E1E2E5',
                borderRadius: '6px',
                padding: '10px 14px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <span style={{ fontSize: '11.5px', color: '#737680' }}>{t.category}</span>
              <span style={{ fontSize: '12px', fontWeight: 600, color: '#0B0B0D', fontFamily: 'var(--font-mono)' }}>{t.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Accessibility & Compliance */}
      <div style={{ marginBottom: '32px' }}>
        <h2 style={{ fontSize: '16px', fontWeight: 700, color: '#0B0B0D', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Shield size={16} />
          <span>Accessibility & Usability (WCAG AAA)</span>
        </h2>
        <div style={{
          backgroundColor: '#F8F8F6',
          border: '1px solid #E1E2E5',
          borderRadius: '8px',
          padding: '16px 20px'
        }}>
          <ul style={{ margin: 0, paddingLeft: '18px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {doc.accessibility.map((a, i) => (
              <li key={i} style={{ fontSize: '12.5px', color: '#0B0B0D', lineHeight: 1.5 }}>
                {a}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Usage Code Snippet */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
          <h2 style={{ fontSize: '16px', fontWeight: 700, color: '#0B0B0D', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Code size={16} />
            <span>TSX Implementation Example</span>
          </h2>
          <button
            onClick={copyCode}
            style={{
              padding: '4px 10px',
              borderRadius: '4px',
              border: '1px solid #E1E2E5',
              backgroundColor: '#FFFFFF',
              color: '#0B0B0D',
              fontSize: '11.5px',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            {copiedSnippet ? <Check size={12} style={{ color: '#16A34A' }} /> : <Copy size={12} />}
            <span>{copiedSnippet ? 'Copied to Clipboard!' : 'Copy Snippet'}</span>
          </button>
        </div>
        <pre style={{
          backgroundColor: '#0B0B0D',
          color: '#E7EAF0',
          padding: '16px 20px',
          borderRadius: '8px',
          fontSize: '12px',
          fontFamily: 'var(--font-mono)',
          overflowX: 'auto',
          lineHeight: 1.55,
          margin: 0
        }}>
          <code>{doc.codeSnippet}</code>
        </pre>
      </div>
    </div>
  );
};

