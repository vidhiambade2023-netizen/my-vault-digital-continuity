import React, { useState } from 'react';
import { History, Search, Link2, Users, ShieldCheck, FileCheck, Lock, Check } from 'lucide-react';
import { Badge } from '@app/components/common/Badge';

interface AuditItem {
  id: string;
  timestamp: string;
  actor: string;
  action: string;
  category: 'connection' | 'nominee' | 'permission' | 'security' | 'claim';
  details: string;
  hash: string;
}

export const AuditTrailStory: React.FC = () => {
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [search, setSearch] = useState('');
  const [copiedHash, setCopiedHash] = useState<string | null>(null);

  const events: AuditItem[] = [
    {
      id: 'evt-1',
      timestamp: 'Today, 14:32',
      actor: 'Vidhi Ambade (Owner)',
      action: 'Connected Google Workspace account',
      category: 'connection',
      details: 'Authorized OAuth 2.0 scopes for Google Drive and Photos. Zero-knowledge lock applied to personal Gmail threads.',
      hash: 'sha256:8f2a...e901'
    },
    {
      id: 'evt-2',
      timestamp: 'Today, 11:15',
      actor: 'Vidhi Ambade (Owner)',
      action: 'Invited Nominee: Riya Ambade',
      category: 'nominee',
      details: 'Dispatched encrypted handshake email to riya.ambade@gmail.com with relationship tag "Sister".',
      hash: 'sha256:3b19...a042'
    },
    {
      id: 'evt-3',
      timestamp: 'Oct 30, 2026',
      actor: 'System Safeguard',
      action: 'Vault Sovereignty Heartbeat Verified',
      category: 'security',
      details: 'Automatic owner challenge verified via Apple Secure Enclave biometric passkey on MacBook Pro.',
      hash: 'sha256:7c94...dd28'
    },
    {
      id: 'evt-4',
      timestamp: 'Oct 28, 2026',
      actor: 'Vidhi Ambade (Owner)',
      action: 'Configured Access Rule for Photos & Memories',
      category: 'permission',
      details: 'Assigned "Photos & Memories" bundle to Riya Ambade with 14-day grace review period.',
      hash: 'sha256:1a55...78ef'
    },
    {
      id: 'evt-5',
      timestamp: 'Oct 24, 2026',
      actor: 'Vidhi Ambade (Owner)',
      action: 'Hardware Passkey Enrolled',
      category: 'security',
      details: 'Registered YubiKey 5C NFC as secondary FIDO2 hardware token for emergency recovery.',
      hash: 'sha256:5d02...11ce'
    }
  ];

  const filteredEvents = events.filter(e => {
    const matchCat = filterCategory === 'all' || e.category === filterCategory;
    const matchSearch = e.action.toLowerCase().includes(search.toLowerCase()) ||
                        e.details.toLowerCase().includes(search.toLowerCase()) ||
                        e.actor.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case 'connection': return <Link2 size={13} />;
      case 'nominee': return <Users size={13} />;
      case 'security': return <ShieldCheck size={13} />;
      case 'claim': return <FileCheck size={13} />;
      case 'permission': return <Lock size={13} />;
      default: return <History size={13} />;
    }
  };

  const copyHash = (hash: string) => {
    navigator.clipboard?.writeText(hash);
    setCopiedHash(hash);
    setTimeout(() => setCopiedHash(null), 2000);
  };

  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '26px', fontWeight: 400, color: '#0B0B0D', marginBottom: '6px' }}>
          Audit Trail & Activity Ledger
        </h2>
        <p style={{ fontSize: '13px', color: '#737680' }}>
          Cryptographically chained ledger documenting all service connections, nominee permissions, and owner authentications.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '16px',
        marginBottom: '20px',
        flexWrap: 'wrap'
      }}>
        {/* Search */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          backgroundColor: '#FFFFFF',
          border: '1px solid #E1E2E5',
          borderRadius: '6px',
          padding: '6px 10px',
          gap: '8px',
          width: '280px'
        }}>
          <Search size={14} style={{ color: '#737680' }} />
          <input
            type="text"
            placeholder="Search activity ledger..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ border: 'none', outline: 'none', fontSize: '12px', width: '100%' }}
          />
        </div>

        {/* Categories */}
        <div style={{ display: 'flex', gap: '4px', backgroundColor: '#E7EAF0', padding: '3px', borderRadius: '6px' }}>
          {[
            { id: 'all', label: 'All Events' },
            { id: 'connection', label: 'Connections' },
            { id: 'nominee', label: 'Nominees' },
            { id: 'permission', label: 'Permissions' },
            { id: 'security', label: 'Security' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setFilterCategory(tab.id)}
              style={{
                border: 'none',
                padding: '4px 10px',
                borderRadius: '4px',
                fontSize: '11px',
                fontWeight: filterCategory === tab.id ? 600 : 500,
                backgroundColor: filterCategory === tab.id ? '#FFFFFF' : 'transparent',
                color: filterCategory === tab.id ? '#0B0B0D' : '#737680',
                cursor: 'pointer'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Events List */}
      <div style={{
        backgroundColor: '#FFFFFF',
        border: '1px solid #E1E2E5',
        borderRadius: '8px',
        overflow: 'hidden'
      }}>
        {filteredEvents.map((evt, idx) => (
          <div
            key={evt.id}
            style={{
              padding: '16px 20px',
              borderBottom: idx < filteredEvents.length - 1 ? '1px solid #E1E2E5' : 'none',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '14px',
              transition: 'background-color 0.1s ease'
            }}
          >
            {/* Category Icon */}
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '6px',
              backgroundColor: '#F8F8F6',
              border: '1px solid #E1E2E5',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#0B0B0D',
              flexShrink: 0,
              marginTop: '2px'
            }}>
              {getCategoryIcon(evt.category)}
            </div>

            {/* Event details */}
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '3px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '13px', fontWeight: 600, color: '#0B0B0D' }}>
                    {evt.action}
                  </span>
                  <Badge variant={evt.category === 'security' ? 'verified' : 'neutral'} size="sm">
                    {evt.category}
                  </Badge>
                </div>
                <span style={{ fontSize: '11.5px', color: '#737680' }}>
                  {evt.timestamp}
                </span>
              </div>

              <p style={{ fontSize: '12px', color: '#737680', margin: '0 0 6px', lineHeight: 1.45 }}>
                {evt.details}
              </p>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '11px', color: '#737680' }}>
                <span>Actor: <strong style={{ color: '#0B0B0D' }}>{evt.actor}</strong></span>
                <span>•</span>
                <button
                  onClick={() => copyHash(evt.hash)}
                  style={{
                    border: 'none',
                    background: 'transparent',
                    padding: 0,
                    fontFamily: 'var(--font-mono)',
                    fontSize: '10.5px',
                    color: '#737680',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                  title="Click to copy cryptographic block hash"
                >
                  <span>{evt.hash}</span>
                  {copiedHash === evt.hash ? <Check size={11} style={{ color: '#16A34A' }} /> : null}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

