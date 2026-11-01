import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Shield, 
  Lock, 
  Check, 
  CheckCircle2, 
  Sliders, 
  Trash2,
  Users
} from 'lucide-react';
import { ServiceItem, ServiceCategory, Nominee } from '../../types';
import { Badge } from '../components/common/Badge';
import { ProviderIcon } from '../components/common/ProviderIcon';

interface ServiceDetailsViewProps {
  service: ServiceItem;
  nominees: Nominee[];
  onBack: () => void;
  onUpdateService: (updatedService: ServiceItem) => void;
  onDisconnectService: (serviceId: string) => void;
}

export const ServiceDetailsView: React.FC<ServiceDetailsViewProps> = ({
  service,
  nominees,
  onBack,
  onUpdateService,
  onDisconnectService
}) => {
  const [categories, setCategories] = useState<ServiceCategory[]>(service.categories);
  const [isSaved, setIsSaved] = useState(false);

  React.useEffect(() => {
    setCategories(service.categories);
  }, [service.id, service.categories]);

  const handleToggleCategory = (catId: string, isExcludedByDefault: boolean) => {
    if (isExcludedByDefault) return; // Strict policy
    setCategories(prev => 
      prev.map(c => c.id === catId ? { ...c, isIncluded: !c.isIncluded } : c)
    );
    setIsSaved(false);
  };

  const handleAssignNominee = (catId: string, nomineeId: string) => {
    const nominee = nominees.find(n => n.id === nomineeId);
    setCategories(prev => 
      prev.map(c => c.id === catId ? {
        ...c,
        isIncluded: Boolean(nomineeId) || c.isIncluded,
        assignedNomineeId: nomineeId || undefined,
        assignedNomineeName: nominee ? nominee.name : undefined
      } : c)
    );
    setIsSaved(false);
  };

  const handleSave = () => {
    const updated: ServiceItem = {
      ...service,
      categories,
      lastReviewed: 'Just now'
    };
    onUpdateService(updated);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Back button & Action Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <button
          onClick={onBack}
          className="btn-ghost"
        >
          <ArrowLeft size={14} />
          <span>Back to Connected Services</span>
        </button>

        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => onDisconnectService(service.id)}
            className="btn-ghost"
            style={{ color: '#DC2626' }}
          >
            <Trash2 size={13} />
            <span>Disconnect Account</span>
          </button>

          <button
            onClick={handleSave}
            className="btn-primary"
          >
            <CheckCircle2 size={14} />
            <span>{isSaved ? 'Permissions Saved' : 'Save Changes'}</span>
          </button>
        </div>
      </div>

      {/* Service Header Info Card */}
      <div style={{
        backgroundColor: 'var(--color-white)',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-lg)',
        padding: '24px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start'
      }}>
        <div style={{ display: 'flex', gap: '14px' }}>
          <div style={{
            width: '44px',
            height: '44px',
            borderRadius: 'var(--radius-sm)',
            backgroundColor: 'var(--color-pale-blue-grey)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0
          }}>
            <ProviderIcon slug={service.slug} size={22} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '3px' }}>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '22px', fontWeight: 500, margin: 0, color: 'var(--color-primary-black)', letterSpacing: '-0.015em' }}>
                {service.name}
              </h2>
              <Badge variant="connected" size="sm">Connected</Badge>
            </div>
            <p style={{ fontSize: '12.5px', color: 'var(--color-secondary-text)', margin: '0 0 6px' }}>
              Account: <strong>{service.connectedEmail}</strong> • Identity: {service.providerAuthName}
            </p>
            <p style={{ fontSize: '13px', color: 'var(--color-primary-black)', margin: 0, maxWidth: '640px' }}>
              {service.description}
            </p>
          </div>
        </div>

        <div style={{
          textAlign: 'right',
          backgroundColor: 'var(--color-off-white)',
          padding: '8px 12px',
          borderRadius: 'var(--radius-sm)',
          border: '1px solid var(--color-border-subtle)'
        }}>
          <div style={{ fontSize: '10.5px', color: 'var(--color-secondary-text)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            Last Reviewed
          </div>
          <div style={{ fontSize: '12.5px', fontWeight: 600, color: 'var(--color-primary-black)', marginTop: '2px' }}>
            {service.lastReviewed || 'Recently'}
          </div>
        </div>
      </div>

      {/* Scope Explanation & Architectural Exclusions Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        <div style={{
          backgroundColor: 'var(--color-white)',
          border: '1px solid var(--color-border)',
          borderRadius: 'var(--radius-md)',
          padding: '20px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '7px', marginBottom: '10px' }}>
            <Shield size={15} style={{ color: 'var(--color-primary-black)' }} />
            <h3 style={{ fontSize: '13.5px', fontWeight: 700, margin: 0 }}>
              Authorized OAuth Scopes (Read-Only)
            </h3>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {service.scopesRequested.map((scope, idx) => (
              <div key={idx} style={{
                fontSize: '11.5px',
                padding: '6px 10px',
                backgroundColor: 'var(--color-off-white)',
                borderRadius: 'var(--radius-xs)',
                border: '1px solid var(--color-border-subtle)',
                fontFamily: 'var(--font-mono)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <Check size={12} style={{ color: '#16A34A', flexShrink: 0 }} />
                <span>{scope}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{
          backgroundColor: '#FFFBFB',
          border: '1px solid #FCD4D4',
          borderRadius: 'var(--radius-md)',
          padding: '20px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '7px', marginBottom: '8px', color: '#991B1B' }}>
            <Lock size={15} />
            <h3 style={{ fontSize: '13.5px', fontWeight: 700, margin: 0 }}>
              Enforced Lifetime Exclusions
            </h3>
          </div>
          <p style={{ fontSize: '11.5px', color: '#991B1B', margin: '0 0 10px', lineHeight: 1.4 }}>
            These private categories are zero-knowledge protected. Nominees cannot access them under any circumstance.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {service.architecturalExclusions.map((excl, idx) => (
              <div key={idx} style={{
                fontSize: '11.5px',
                padding: '6px 10px',
                backgroundColor: 'var(--color-white)',
                borderRadius: 'var(--radius-xs)',
                border: '1px solid #FECACA',
                color: '#7F1D1D',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <Lock size={11} style={{ flexShrink: 0 }} />
                <span>{excl}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Category Permissions & Nominee Allocation Table */}
      <div style={{
        backgroundColor: 'var(--color-white)',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-lg)',
        padding: '24px'
      }}>
        <div style={{ marginBottom: '16px' }}>
          <h3 style={{ fontSize: '15px', fontWeight: 700, margin: 0, color: 'var(--color-primary-black)' }}>
            Information Categories & Delegated Nominee Assignment
          </h3>
          <p style={{ fontSize: '12px', color: 'var(--color-secondary-text)', margin: '3px 0 0' }}>
            Check the categories you wish to make eligible for post-continuity claim, and designate a specific nominee.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {categories.map(cat => {
            const isLocked = cat.isExcludedByDefault;
            return (
              <div
                key={cat.id}
                style={{
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-md)',
                  padding: '14px 16px',
                  backgroundColor: isLocked ? '#FCFDFD' : (cat.isIncluded ? 'var(--color-white)' : 'var(--color-off-white)'),
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '16px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', flex: 1 }}>
                  <input
                    type="checkbox"
                    checked={cat.isIncluded && !isLocked}
                    disabled={isLocked}
                    onChange={() => handleToggleCategory(cat.id, isLocked)}
                    style={{ marginTop: '3px', cursor: isLocked ? 'not-allowed' : 'pointer' }}
                  />
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '13.5px', fontWeight: 600, color: 'var(--color-primary-black)' }}>
                        {cat.name}
                      </span>
                      {isLocked ? (
                        <Badge variant="locked" size="sm" icon={<Lock size={10} style={{ marginRight: '3px' }} />}>
                          Strictly Locked
                        </Badge>
                      ) : (
                        <Badge variant={cat.isIncluded ? 'verified' : 'neutral'} size="sm">
                          {cat.isIncluded ? 'Included in Plan' : 'Excluded'}
                        </Badge>
                      )}
                    </div>
                    <p style={{ fontSize: '12px', color: 'var(--color-secondary-text)', margin: '3px 0 2px', lineHeight: 1.4 }}>
                      {cat.description}
                    </p>
                    {cat.scopeNote && (
                      <span style={{ fontSize: '11px', color: 'var(--color-secondary-text)', fontStyle: 'italic' }}>
                        Scope detail: {cat.scopeNote}
                      </span>
                    )}
                  </div>
                </div>

                {/* Nominee Selector */}
                {!isLocked && (
                  <div style={{ width: '220px', flexShrink: 0 }}>
                    <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: 'var(--color-secondary-text)', marginBottom: '3px' }}>
                      Designated Nominee
                    </label>
                    <select
                      value={cat.assignedNomineeId || ''}
                      onChange={(e) => handleAssignNominee(cat.id, e.target.value)}
                      style={{ width: '100%', fontSize: '12px', padding: '5px 8px' }}
                    >
                      <option value="">Unassigned (No Delegate)</option>
                      {nominees.map(n => (
                        <option key={n.id} value={n.id}>
                          {n.name} ({n.relationship})
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
