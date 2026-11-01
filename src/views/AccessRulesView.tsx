import React, { useState } from 'react';
import { 
  FileSpreadsheet, 
  Search, 
  Lock, 
  CheckCircle2, 
  ShieldAlert, 
  AlertCircle,
  Users,
  Sliders,
  Filter
} from 'lucide-react';
import { AccessRule, Nominee } from '../../types';
import { Badge } from '../components/common/Badge';

interface AccessRulesViewProps {
  rules: AccessRule[];
  nominees: Nominee[];
  onToggleRuleStatus: (ruleId: string) => void;
  onReassignNominee: (ruleId: string, nomineeId: string) => void;
}

export const AccessRulesView: React.FC<AccessRulesViewProps> = ({
  rules,
  nominees,
  onToggleRuleStatus,
  onReassignNominee
}) => {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'eligible_after_continuity' | 'excluded'>('all');
  const [nomineeFilter, setNomineeFilter] = useState<string>('all');

  const filteredRules = rules.filter(r => {
    const matchesSearch = r.serviceName.toLowerCase().includes(search.toLowerCase()) ||
                          r.categoryName.toLowerCase().includes(search.toLowerCase()) ||
                          r.nomineeName.toLowerCase().includes(search.toLowerCase()) ||
                          (r.groupName && r.groupName.toLowerCase().includes(search.toLowerCase()));
    const matchesStatus = statusFilter === 'all' || r.status === statusFilter;
    const matchesNominee = nomineeFilter === 'all' || r.nomineeName === nomineeFilter;
    return matchesSearch && matchesStatus && matchesNominee;
  });

  const eligibleCount = rules.filter(r => r.status === 'eligible_after_continuity').length;
  const lockedCount = rules.filter(r => 
    r.ruleDescription.toLowerCase().includes('zero-knowledge') || 
    r.nomineeName.includes('Inviolable') || 
    r.ruleDescription.toLowerCase().includes('inviolable') ||
    r.nomineeName.includes('Locked')
  ).length;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header Banner */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        flexWrap: 'wrap',
        gap: '20px'
      }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '32px', fontWeight: 400, margin: '0 0 6px', color: 'var(--color-primary-black)', letterSpacing: '-0.02em' }}>
            Access rules matrix
          </h1>
          <p style={{ fontSize: '13.5px', color: 'var(--color-secondary-text)', margin: 0, maxWidth: '640px' }}>
            Unified cross-platform policy matrix mapping service categories, assigned nominees, and continuity eligibility.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          <div style={{
            padding: '8px 14px',
            backgroundColor: 'var(--color-off-white)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--color-border-subtle)',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '10px', color: 'var(--color-secondary-text)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              Eligible Post-Claim
            </div>
            <div style={{ fontSize: '16px', fontWeight: 700, color: 'var(--color-primary-black)' }}>
              {eligibleCount}
            </div>
          </div>

          <div style={{
            padding: '8px 14px',
            backgroundColor: '#FFF7F7',
            borderRadius: 'var(--radius-md)',
            border: '1px solid #FEE2E2',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '10px', color: '#991B1B', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              Private Locks
            </div>
            <div style={{ fontSize: '16px', fontWeight: 700, color: '#991B1B' }}>
              {lockedCount}
            </div>
          </div>
        </div>
      </div>

      {/* Controls Bar */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '14px'
      }}>
        <div style={{ position: 'relative', width: '280px' }}>
          <Search size={14} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-secondary-text)' }} />
          <input
            type="search"
            placeholder="Search matrix by platform, category, delegate..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ width: '100%', paddingLeft: '32px' }}
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ fontSize: '11.5px', color: 'var(--color-secondary-text)' }}>Status:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              style={{ fontSize: '11.5px', padding: '5px 10px' }}
            >
              <option value="all">All Rules ({rules.length})</option>
              <option value="eligible_after_continuity">Eligible Post-Claim</option>
              <option value="excluded">Excluded / Locked</option>
            </select>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ fontSize: '11.5px', color: 'var(--color-secondary-text)' }}>Delegate:</span>
            <select
              value={nomineeFilter}
              onChange={(e) => setNomineeFilter(e.target.value)}
              style={{ fontSize: '11.5px', padding: '5px 10px' }}
            >
              <option value="all">All Nominees</option>
              {nominees.map(n => (
                <option key={n.id} value={n.name}>{n.name}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Rules Governance Table */}
      <div style={{
        backgroundColor: 'var(--color-white)',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-lg)',
        overflow: 'hidden',
        boxShadow: 'var(--shadow-xs)'
      }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '12.5px' }}>
          <thead>
            <tr style={{ backgroundColor: 'var(--color-off-white)', borderBottom: '1px solid var(--color-border)' }}>
              <th style={{ padding: '12px 18px', fontWeight: 600, color: 'var(--color-primary-black)', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Platform</th>
              <th style={{ padding: '12px 18px', fontWeight: 600, color: 'var(--color-primary-black)', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Category & Scope</th>
              <th style={{ padding: '12px 18px', fontWeight: 600, color: 'var(--color-primary-black)', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Group</th>
              <th style={{ padding: '12px 18px', fontWeight: 600, color: 'var(--color-primary-black)', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Designated Nominee</th>
              <th style={{ padding: '12px 18px', fontWeight: 600, color: 'var(--color-primary-black)', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Policy Status</th>
              <th style={{ padding: '12px 18px', fontWeight: 600, color: 'var(--color-primary-black)', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.06em', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredRules.map((rule, idx) => {
              const isLockedByPolicy = rule.ruleDescription.toLowerCase().includes('zero-knowledge') || 
                                       rule.ruleDescription.toLowerCase().includes('privacy policy') ||
                                       rule.ruleDescription.toLowerCase().includes('inviolable') ||
                                       rule.nomineeName.includes('Inviolable') ||
                                       rule.nomineeName.includes('Locked');
              const isEligible = rule.status === 'eligible_after_continuity';

              return (
                <tr
                  key={rule.id}
                  style={{
                    borderBottom: idx === filteredRules.length - 1 ? 'none' : '1px solid var(--color-border-subtle)',
                    backgroundColor: isLockedByPolicy ? '#FFFDFD' : 'transparent',
                    transition: 'background-color var(--transition-fast)'
                  }}
                >
                  <td style={{ padding: '14px 18px', fontWeight: 600, color: 'var(--color-primary-black)' }}>
                    {rule.serviceName}
                  </td>
                  <td style={{ padding: '14px 18px', maxWidth: '280px' }}>
                    <div style={{ fontWeight: 600, color: 'var(--color-primary-black)' }}>{rule.categoryName}</div>
                    <div style={{ fontSize: '11px', color: 'var(--color-secondary-text)', marginTop: '2px', lineHeight: 1.35 }}>
                      {rule.ruleDescription}
                    </div>
                  </td>
                  <td style={{ padding: '14px 18px', color: 'var(--color-secondary-text)', fontSize: '11.5px' }}>
                    {rule.groupName ? (
                      <span style={{
                        padding: '2px 7px',
                        backgroundColor: 'var(--color-off-white)',
                        borderRadius: 'var(--radius-xs)',
                        border: '1px solid var(--color-border-subtle)',
                        fontWeight: 500
                      }}>
                        {rule.groupName}
                      </span>
                    ) : '—'}
                  </td>
                  <td style={{ padding: '14px 18px' }}>
                    {isLockedByPolicy ? (
                      <span style={{ fontSize: '11px', color: '#991B1B', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                        <Lock size={11} />
                        <span>Private & Inviolable</span>
                      </span>
                    ) : (
                      <select
                        value={nominees.find(n => n.name === rule.nomineeName)?.id || ''}
                        onChange={(e) => onReassignNominee(rule.id, e.target.value)}
                        style={{
                          fontSize: '11.5px',
                          padding: '4px 8px',
                          backgroundColor: rule.nomineeName !== 'Unassigned' ? 'var(--color-pale-blue-grey)' : 'var(--color-white)',
                          borderColor: 'var(--color-border)',
                          fontWeight: rule.nomineeName !== 'Unassigned' ? 600 : 400
                        }}
                      >
                        <option value="">Unassigned (No Delegate)</option>
                        {nominees.map(n => (
                          <option key={n.id} value={n.id}>
                            {n.name} ({n.relationship})
                          </option>
                        ))}
                      </select>
                    )}
                  </td>
                  <td style={{ padding: '14px 18px' }}>
                    {isLockedByPolicy ? (
                      <Badge variant="locked" size="sm" icon={<Lock size={10} style={{ marginRight: '3px' }} />}>
                        Strictly Locked
                      </Badge>
                    ) : isEligible ? (
                      <Badge variant="verified" size="sm">
                        Eligible Post-Claim
                      </Badge>
                    ) : (
                      <Badge variant="neutral" size="sm">
                        Excluded
                      </Badge>
                    )}
                  </td>
                  <td style={{ padding: '14px 18px', textAlign: 'right' }}>
                    {!isLockedByPolicy ? (
                      <button
                        onClick={() => onToggleRuleStatus(rule.id)}
                        className="btn-secondary"
                        style={{ fontSize: '11.5px', padding: '4px 10px' }}
                      >
                        {isEligible ? 'Exclude' : 'Make Eligible'}
                      </button>
                    ) : (
                      <span style={{ fontSize: '11px', color: 'var(--color-secondary-text)', fontStyle: 'italic' }}>
                        Zero-Knowledge
                      </span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
