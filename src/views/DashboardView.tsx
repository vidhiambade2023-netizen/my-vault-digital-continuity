import React from 'react';
import { 
  ShieldCheck, 
  Link2, 
  Users, 
  Lock, 
  ArrowRight, 
  Clock, 
  Plus,
  Sliders,
  CheckCircle2,
  AlertCircle,
  FolderKanban
} from 'lucide-react';
import { ServiceItem, Nominee, ServiceGroup, ActiveView } from '../../types';
import { StatCard } from '../components/common/StatCard';
import { Badge } from '../components/common/Badge';
import { ProviderIcon } from '../components/common/ProviderIcon';

interface DashboardViewProps {
  services: ServiceItem[];
  nominees: Nominee[];
  groups: ServiceGroup[];
  onNavigate: (view: ActiveView) => void;
  onOpenConnectModal: () => void;
  onOpenNomineeModal: () => void;
  onSelectServiceForDetail: (serviceId: string) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  services,
  nominees,
  groups,
  onNavigate,
  onOpenConnectModal,
  onOpenNomineeModal,
  onSelectServiceForDetail
}) => {
  const connectedCount = services.filter(s => s.status === 'connected').length;
  const verifiedNomineesCount = nominees.filter(n => n.verificationStatus === 'verified').length;
  const allCategories = services.flatMap(s => s.categories);
  const includedCategoriesCount = allCategories.filter(c => c.isIncluded).length;
  const permanentlyExcludedCount = allCategories.filter(c => c.isExcludedByDefault).length;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Top Editorial Headline Statement */}
      <section style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        gap: '24px',
        paddingTop: '2px'
      }}>
        <div style={{ maxWidth: '680px' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '11px',
            fontWeight: 500,
            color: 'var(--color-secondary-text)',
            marginBottom: '10px'
          }}>
            <ShieldCheck size={14} style={{ color: 'var(--color-primary-black)' }} />
            <span>Digital Continuity Protocol • Lifetime Privacy Mode</span>
          </div>

          <h1 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '34px',
            fontWeight: 400,
            color: 'var(--color-primary-black)',
            letterSpacing: '-0.02em',
            lineHeight: 1.18,
            marginBottom: '10px'
          }}>
            Your digital life, organised.
          </h1>

          <p style={{
            fontSize: '14.5px',
            color: 'var(--color-secondary-text)',
            lineHeight: 1.6,
            margin: 0
          }}>
            Manage your connected services, trusted people and continuity preferences. Personal conversations and credentials remain cryptographically sealed until authorized continuity activation.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0, marginTop: '4px' }}>
          <button
            onClick={onOpenConnectModal}
            className="btn-primary"
          >
            <Plus size={15} />
            <span>Connect service</span>
          </button>
          <button
            onClick={() => onNavigate('continuity_plan')}
            className="btn-secondary"
          >
            <span>Review plan</span>
            <ArrowRight size={13} />
          </button>
        </div>
      </section>

      {/* 4 Compact Overview Cards */}
      <section style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '16px'
      }}>
        <div 
          onClick={() => onNavigate('connected_services')}
          style={{
            backgroundColor: 'var(--color-white)',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-md)',
            padding: '18px 20px',
            cursor: 'pointer',
            transition: 'border-color var(--transition-fast)'
          }}
          onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--color-blue-grey)'}
          onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--color-border)'}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <span style={{ fontSize: '12px', fontWeight: 500, color: 'var(--color-secondary-text)' }}>
              Connected services
            </span>
            <Link2 size={15} style={{ color: 'var(--color-secondary-text)' }} />
          </div>
          <div style={{ fontSize: '24px', fontWeight: 600, color: 'var(--color-primary-black)', lineHeight: 1.2, marginBottom: '4px' }}>
            {connectedCount}
          </div>
          <div style={{ fontSize: '11.5px', color: 'var(--color-secondary-text)' }}>
            Active cloud & social accounts
          </div>
        </div>

        <div 
          onClick={() => onNavigate('nominees')}
          style={{
            backgroundColor: 'var(--color-white)',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-md)',
            padding: '18px 20px',
            cursor: 'pointer',
            transition: 'border-color var(--transition-fast)'
          }}
          onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--color-blue-grey)'}
          onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--color-border)'}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <span style={{ fontSize: '12px', fontWeight: 500, color: 'var(--color-secondary-text)' }}>
              Trusted people
            </span>
            <Users size={15} style={{ color: 'var(--color-secondary-text)' }} />
          </div>
          <div style={{ fontSize: '24px', fontWeight: 600, color: 'var(--color-primary-black)', lineHeight: 1.2, marginBottom: '4px' }}>
            {verifiedNomineesCount} <span style={{ fontSize: '14px', fontWeight: 400, color: 'var(--color-secondary-text)' }}>/ {nominees.length}</span>
          </div>
          <div style={{ fontSize: '11.5px', color: 'var(--color-secondary-text)' }}>
            Email verified candidates
          </div>
        </div>

        <div 
          onClick={() => onNavigate('access_rules')}
          style={{
            backgroundColor: 'var(--color-white)',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-md)',
            padding: '18px 20px',
            cursor: 'pointer',
            transition: 'border-color var(--transition-fast)'
          }}
          onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--color-blue-grey)'}
          onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--color-border)'}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <span style={{ fontSize: '12px', fontWeight: 500, color: 'var(--color-secondary-text)' }}>
              Access rules
            </span>
            <Sliders size={15} style={{ color: 'var(--color-secondary-text)' }} />
          </div>
          <div style={{ fontSize: '24px', fontWeight: 600, color: 'var(--color-primary-black)', lineHeight: 1.2, marginBottom: '4px' }}>
            {includedCategoriesCount}
          </div>
          <div style={{ fontSize: '11.5px', color: 'var(--color-secondary-text)' }}>
            Selective categories assigned
          </div>
        </div>

        <div 
          onClick={() => onNavigate('continuity_plan')}
          style={{
            backgroundColor: 'var(--color-white)',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-md)',
            padding: '18px 20px',
            cursor: 'pointer',
            transition: 'border-color var(--transition-fast)'
          }}
          onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--color-blue-grey)'}
          onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--color-border)'}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <span style={{ fontSize: '12px', fontWeight: 500, color: 'var(--color-secondary-text)' }}>
              Continuity plan
            </span>
            <Clock size={15} style={{ color: 'var(--color-secondary-text)' }} />
          </div>
          <div style={{ fontSize: '24px', fontWeight: 600, color: 'var(--color-primary-black)', lineHeight: 1.2, marginBottom: '4px' }}>
            Standby
          </div>
          <div style={{ fontSize: '11.5px', color: 'var(--color-secondary-text)' }}>
            14-day grace review active
          </div>
        </div>
      </section>

      {/* Connected Services Section (Neat 3-Column Grid) */}
      <section>
        <div className="section-header">
          <div>
            <div className="section-title">Connected services</div>
            <div style={{ fontSize: '12.5px', color: 'var(--color-secondary-text)', marginTop: '2px' }}>
              Third-party platforms participating in your continuity catalog
            </div>
          </div>
          <button
            onClick={() => onNavigate('connected_services')}
            className="section-link"
          >
            <span>Show all ({services.length})</span>
            <ArrowRight size={13} />
          </button>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '16px'
        }}>
          {services.slice(0, 6).map(service => {
            const includedCount = service.categories.filter(c => c.isIncluded).length;
            const isConnected = service.status === 'connected';

            return (
              <div
                key={service.id}
                style={{
                  backgroundColor: 'var(--color-white)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-md)',
                  padding: '18px 20px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  gap: '16px',
                  transition: 'border-color var(--transition-fast)'
                }}
                onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--color-blue-grey)'}
                onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--color-border)'}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                    <div style={{
                      width: '38px',
                      height: '38px',
                      borderRadius: '8px',
                      backgroundColor: 'var(--color-pale-blue-grey)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      <ProviderIcon slug={service.slug} size={18} />
                    </div>

                    <Badge variant={isConnected ? 'connected' : 'unlinked'} size="sm">
                      {isConnected ? 'Connected' : 'Unlinked'}
                    </Badge>
                  </div>

                  <h3 style={{ fontSize: '14.5px', fontWeight: 600, margin: '0 0 4px', color: 'var(--color-primary-black)' }}>
                    {service.name}
                  </h3>
                  <div style={{ fontSize: '12px', color: 'var(--color-secondary-text)', marginBottom: '12px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {service.connectedEmail || 'No account attached'}
                  </div>

                  <div style={{
                    fontSize: '11.5px',
                    color: 'var(--color-secondary-text)',
                    backgroundColor: 'var(--color-off-white)',
                    padding: '8px 10px',
                    borderRadius: '6px',
                    border: '1px solid var(--color-border-subtle)'
                  }}>
                    {isConnected ? (
                      <span><strong>{includedCount}</strong> categories eligible • Zero-knowledge locks</span>
                    ) : (
                      <span>Not yet participating in continuity</span>
                    )}
                  </div>
                </div>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingTop: '10px',
                  borderTop: '1px solid var(--color-border-subtle)'
                }}>
                  <span style={{ fontSize: '11px', color: 'var(--color-secondary-text)' }}>
                    {service.providerAuthName}
                  </span>

                  {isConnected ? (
                    <button
                      onClick={() => onSelectServiceForDetail(service.id)}
                      className="btn-secondary"
                      style={{ fontSize: '11.5px', padding: '4px 10px' }}
                    >
                      <Sliders size={12} />
                      <span>Manage</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => onOpenConnectModal()}
                      className="btn-primary"
                      style={{ fontSize: '11.5px', padding: '4px 10px' }}
                    >
                      <span>Connect</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Trusted People Section (Minimal Clean Cards) */}
      <section>
        <div className="section-header">
          <div>
            <div className="section-title">Trusted people</div>
            <div style={{ fontSize: '12.5px', color: 'var(--color-secondary-text)', marginTop: '2px' }}>
              Designated nominees eligible for certified continuity claim evaluation
            </div>
          </div>
          <button
            onClick={() => onNavigate('nominees')}
            className="section-link"
          >
            <span>Show all ({nominees.length})</span>
            <ArrowRight size={13} />
          </button>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '16px'
        }}>
          {nominees.map(nominee => {
            const isVerified = nominee.verificationStatus === 'verified';
            const initials = nominee.name.split(' ').map(n => n[0]).join('').slice(0, 2);

            return (
              <div
                key={nominee.id}
                style={{
                  backgroundColor: 'var(--color-white)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-md)',
                  padding: '18px 20px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  gap: '14px',
                  transition: 'border-color var(--transition-fast)'
                }}
                onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--color-blue-grey)'}
                onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--color-border)'}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '50%',
                        backgroundColor: 'var(--color-pale-blue-grey)',
                        color: 'var(--color-primary-black)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '12px',
                        fontWeight: 600,
                        border: '1px solid var(--color-border)'
                      }}>
                        {initials}
                      </div>
                      <div>
                        <h3 style={{ fontSize: '14px', fontWeight: 600, margin: 0, color: 'var(--color-primary-black)' }}>
                          {nominee.name}
                        </h3>
                        <div style={{ fontSize: '11.5px', color: 'var(--color-secondary-text)' }}>
                          {nominee.relationship}
                        </div>
                      </div>
                    </div>

                    <Badge variant={isVerified ? 'verified' : 'pending'} size="sm">
                      {isVerified ? 'Email Verified' : 'Pending Verification'}
                    </Badge>
                  </div>

                  <div style={{ fontSize: '12px', color: 'var(--color-secondary-text)', marginBottom: '8px' }}>
                    {nominee.email}
                  </div>

                  <div style={{
                    fontSize: '11.5px',
                    color: 'var(--color-primary-black)',
                    backgroundColor: 'var(--color-off-white)',
                    padding: '8px 10px',
                    borderRadius: '6px',
                    border: '1px solid var(--color-border-subtle)'
                  }}>
                    <span>{(nominee.assignedCategories || []).length} categories delegated</span>
                  </div>
                </div>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingTop: '10px',
                  borderTop: '1px solid var(--color-border-subtle)'
                }}>
                  <span style={{ fontSize: '11px', color: 'var(--color-secondary-text)' }}>
                    {nominee.accessStatus === 'inactive_lifetime' ? 'Standby (Lifetime)' : nominee.accessStatus}
                  </span>

                  <button
                    onClick={() => onNavigate('access_rules')}
                    className="btn-secondary"
                    style={{ fontSize: '11.5px', padding: '4px 10px', gap: '4px' }}
                  >
                    <Sliders size={12} />
                    <span>Manage access</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
