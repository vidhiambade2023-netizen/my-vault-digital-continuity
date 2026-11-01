import React, { useState } from 'react';
import { Search, Lock, CheckCircle2, ShieldAlert, Sliders } from 'lucide-react';
import { Badge } from '@app/components/common/Badge';

interface RuleRow {
  id: string;
  serviceName: string;
  categoryName: string;
  nomineeName: string;
  status: 'eligible_after_continuity' | 'excluded' | 'locked';
  ruleDescription: string;
}

export const AccessRulesMatrixStory: React.FC = () => {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'eligible' | 'locked'>('all');
  
  const [rules, setRules] = useState<RuleRow[]>([
    {
      id: 'rule-1',
      serviceName: 'Google Workspace',
      categoryName: 'Photos & High-Res Albums',
      nomineeName: 'Riya Ambade (Sister)',
      status: 'eligible_after_continuity',
      ruleDescription: 'Auto-released after 14-day owner grace verification period.'
    },
    {
      id: 'rule-2',
      serviceName: 'Google Workspace',
      categoryName: 'Personal Gmail Threads',
      nomineeName: 'Inviolable Lock (Zero-Knowledge)',
      status: 'locked',
      ruleDescription: 'Permanently sealed. Master keys shredded upon continuity activation.'
    },
    {
      id: 'rule-3',
      serviceName: 'Apple iCloud',
      categoryName: 'iCloud Photo Library',
      nomineeName: 'Riya Ambade (Sister)',
      status: 'eligible_after_continuity',
      ruleDescription: 'Synced with Apple Legacy Contact token handshake.'
    },
    {
      id: 'rule-4',
      serviceName: 'Apple iCloud',
      categoryName: 'iMessage & SMS History',
      nomineeName: 'Inviolable Lock (Zero-Knowledge)',
      status: 'locked',
      ruleDescription: 'Zero-knowledge sealed. Lifetime privacy enforced.'
    },
    {
      id: 'rule-5',
      serviceName: 'Microsoft 365',
      categoryName: 'Academic Drive & Thesis Vault',
      nomineeName: 'Arjun Mehta (Executor)',
      status: 'eligible_after_continuity',
      ruleDescription: 'Delegated for academic continuity and archival handoff.'
    },
    {
      id: 'rule-6',
      serviceName: 'Dropbox Vault',
      categoryName: 'Financial Statements & Tax Records',
      nomineeName: 'Arjun Mehta (Executor)',
      status: 'eligible_after_continuity',
      ruleDescription: 'Legal executor access after death certificate verification.'
    }
  ]);

  const toggleRule = (id: string) => {
    setRules(prev => prev.map(r => {
      if (r.id === id && r.status !== 'locked') {
        const nextStatus = r.status === 'eligible_after_continuity' ? 'excluded' : 'eligible_after_continuity';
        return { ...r, status: nextStatus };
      }
      return r;
    }));
  };

  const filteredRules = rules.filter(r => {
    const matchSearch = r.serviceName.toLowerCase().includes(search.toLowerCase()) ||
                        r.categoryName.toLowerCase().includes(search.toLowerCase()) ||
                        r.nomineeName.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'all' ||
                        (statusFilter === 'eligible' && r.status === 'eligible_after_continuity') ||
                        (statusFilter === 'locked' && r.status === 'locked');
    return matchSearch && matchStatus;
  });

  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '26px', fontWeight: 400, color: '#0B0B0D', marginBottom: '6px' }}>
          Access Rules Matrix Table
        </h2>
        <p style={{ fontSize: '13px', color: '#737680' }}>
          Cross-platform governance policy matrix mapping service categories, assigned nominees, and continuity eligibility.
        </p>
      </div>

      {/* Control Filters */}
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
            placeholder="Filter matrix rows..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ border: 'none', outline: 'none', fontSize: '12px', width: '100%' }}
          />
        </div>

        {/* Status Filter */}
        <div style={{ display: 'flex', gap: '4px', backgroundColor: '#E7EAF0', padding: '3px', borderRadius: '6px' }}>
          {[
            { id: 'all', label: 'All Rules' },
            { id: 'eligible', label: 'Eligible Post-Claim' },
            { id: 'locked', label: 'Inviolable Locks' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setStatusFilter(tab.id as any)}
              style={{
                border: 'none',
                padding: '4px 10px',
                borderRadius: '4px',
                fontSize: '11px',
                fontWeight: statusFilter === tab.id ? 600 : 500,
                backgroundColor: statusFilter === tab.id ? '#FFFFFF' : 'transparent',
                color: statusFilter === tab.id ? '#0B0B0D' : '#737680',
                cursor: 'pointer'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Matrix Table */}
      <div style={{
        backgroundColor: '#FFFFFF',
        border: '1px solid #E1E2E5',
        borderRadius: '8px',
        overflow: 'hidden'
      }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '12.5px' }}>
          <thead>
            <tr style={{ backgroundColor: '#F8F8F6', borderBottom: '1px solid #E1E2E5' }}>
              <th style={{ padding: '10px 16px', fontWeight: 600, color: '#737680', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Service & Category</th>
              <th style={{ padding: '10px 16px', fontWeight: 600, color: '#737680', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Assigned Nominee</th>
              <th style={{ padding: '10px 16px', fontWeight: 600, color: '#737680', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Continuity Policy</th>
              <th style={{ padding: '10px 16px', fontWeight: 600, color: '#737680', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Status & Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredRules.map((rule, idx) => (
              <tr
                key={rule.id}
                style={{
                  borderBottom: idx < filteredRules.length - 1 ? '1px solid #E1E2E5' : 'none',
                  backgroundColor: rule.status === 'locked' ? '#FFFDFD' : '#FFFFFF'
                }}
              >
                <td style={{ padding: '12px 16px' }}>
                  <div style={{ fontWeight: 600, color: '#0B0B0D' }}>{rule.serviceName}</div>
                  <div style={{ fontSize: '11.5px', color: '#737680', marginTop: '2px' }}>{rule.categoryName}</div>
                </td>

                <td style={{ padding: '12px 16px' }}>
                  {rule.status === 'locked' ? (
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#DC2626', fontWeight: 500 }}>
                      <Lock size={12} />
                      <span>{rule.nomineeName}</span>
                    </span>
                  ) : (
                    <span style={{ fontSize: '12.5px', color: '#0B0B0D' }}>
                      {rule.nomineeName}
                    </span>
                  )}
                </td>

                <td style={{ padding: '12px 16px', color: '#737680', fontSize: '11.5px', maxWidth: '280px' }}>
                  {rule.ruleDescription}
                </td>

                <td style={{ padding: '12px 16px' }}>
                  {rule.status === 'locked' ? (
                    <Badge variant="locked" size="sm">Zero-Knowledge</Badge>
                  ) : rule.status === 'eligible_after_continuity' ? (
                    <button
                      onClick={() => toggleRule(rule.id)}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        border: '1px solid #E1E2E5',
                        borderRadius: '4px',
                        padding: '4px 8px',
                        backgroundColor: '#FFFFFF',
                        cursor: 'pointer',
                        fontSize: '11px'
                      }}
                      title="Click to toggle status"
                    >
                      <Badge variant="verified" size="sm">Eligible</Badge>
                      <span style={{ color: '#737680' }}>Click to Exclude</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => toggleRule(rule.id)}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        border: '1px solid #E1E2E5',
                        borderRadius: '4px',
                        padding: '4px 8px',
                        backgroundColor: '#FFFFFF',
                        cursor: 'pointer',
                        fontSize: '11px'
                      }}
                    >
                      <Badge variant="neutral" size="sm">Excluded</Badge>
                      <span style={{ color: '#737680' }}>Click to Enable</span>
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

