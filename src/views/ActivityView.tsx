import React, { useState } from 'react';
import { 
  History, 
  Search, 
  ShieldCheck, 
  Link2, 
  Users, 
  Lock, 
  FileCheck,
  Clock
} from 'lucide-react';
import { AuditEvent } from '../../types';
import { Badge } from '../components/common/Badge';

interface ActivityViewProps {
  events: AuditEvent[];
}

export const ActivityView: React.FC<ActivityViewProps> = ({ events }) => {
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [search, setSearch] = useState('');

  const filteredEvents = events.filter(e => {
    const matchesCat = filterCategory === 'all' || e.category === filterCategory;
    const matchesSearch = e.action.toLowerCase().includes(search.toLowerCase()) ||
                          e.details.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const getCategoryIcon = (category: AuditEvent['category']) => {
    switch (category) {
      case 'connection': return <Link2 size={14} />;
      case 'nominee': return <Users size={14} />;
      case 'security': return <ShieldCheck size={14} />;
      case 'claim': return <FileCheck size={14} />;
      case 'permission': return <Lock size={14} />;
      default: return <History size={14} />;
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      {/* Page Title */}
      <div>
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '32px', fontWeight: 400, margin: '0 0 6px', color: 'var(--color-primary-black)', letterSpacing: '-0.02em' }}>
          Audit trail
        </h1>
        <p style={{ fontSize: '13.5px', color: 'var(--color-secondary-text)', margin: 0, maxWidth: '640px' }}>
          Immutable ledger of service authorizations, nominee challenges, and security events.
        </p>
      </div>

      {/* Controls Bar */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '14px'
      }}>
        <div style={{ position: 'relative', width: '260px' }}>
          <Search size={14} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-secondary-text)' }} />
          <input
            type="search"
            placeholder="Search audit trail..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ width: '100%', paddingLeft: '32px' }}
          />
        </div>

        <div style={{ display: 'flex', gap: '4px', backgroundColor: 'var(--color-pale-blue-grey)', padding: '3px', borderRadius: 'var(--radius-sm)' }}>
          {[
            { id: 'all', label: 'All Events' },
            { id: 'connection', label: 'Connections' },
            { id: 'nominee', label: 'Nominees' },
            { id: 'permission', label: 'Permissions' },
            { id: 'security', label: 'Security' },
            { id: 'claim', label: 'Claims' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setFilterCategory(tab.id)}
              style={{
                padding: '5px 10px',
                borderRadius: 'var(--radius-xs)',
                fontSize: '11.5px',
                fontWeight: filterCategory === tab.id ? 600 : 500,
                backgroundColor: filterCategory === tab.id ? 'var(--color-white)' : 'transparent',
                color: filterCategory === tab.id ? 'var(--color-primary-black)' : 'var(--color-secondary-text)',
                boxShadow: filterCategory === tab.id ? 'var(--shadow-xs)' : 'none'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Events List */}
      <div style={{
        backgroundColor: 'var(--color-white)',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-lg)',
        overflow: 'hidden'
      }}>
        {filteredEvents.map((evt, idx) => (
          <div
            key={evt.id}
            style={{
              padding: '14px 20px',
              borderBottom: idx === filteredEvents.length - 1 ? 'none' : '1px solid var(--color-border-subtle)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '16px',
              transition: 'background-color var(--transition-fast)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
              <div style={{
                width: '30px',
                height: '30px',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: 'var(--color-pale-blue-grey)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--color-primary-black)',
                flexShrink: 0,
                marginTop: '1px'
              }}>
                {getCategoryIcon(evt.category)}
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '13.5px', fontWeight: 600, color: 'var(--color-primary-black)' }}>
                    {evt.action}
                  </span>
                  <Badge
                    variant={
                      evt.severity === 'security' ? 'locked' :
                      evt.severity === 'warning' ? 'warning' : 'neutral'
                    }
                    size="sm"
                  >
                    {evt.category.toUpperCase()}
                  </Badge>
                </div>
                <div style={{ fontSize: '12.5px', color: 'var(--color-secondary-text)', marginTop: '2px' }}>
                  {evt.details}
                </div>
              </div>
            </div>

            <div style={{ fontSize: '11.5px', color: 'var(--color-secondary-text)', flexShrink: 0, display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Clock size={12} />
              <span>{evt.timestamp}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
