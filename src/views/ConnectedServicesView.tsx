import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Sliders, 
  Trash2, 
  ShieldCheck, 
  Lock,
  ArrowRight,
  Filter,
  ArrowUpDown,
  ExternalLink,
  Layers,
  CheckCircle2
} from 'lucide-react';
import { ServiceItem } from '../../types';
import { Badge } from '../components/common/Badge';
import { ProviderIcon } from '../components/common/ProviderIcon';

interface ConnectedServicesViewProps {
  services: ServiceItem[];
  onOpenConnectModal: (providerSlug?: string) => void;
  onSelectServiceForDetail: (serviceId: string) => void;
  onDisconnectService: (serviceId: string) => void;
}

export const ConnectedServicesView: React.FC<ConnectedServicesViewProps> = ({
  services,
  onOpenConnectModal,
  onSelectServiceForDetail,
  onDisconnectService
}) => {
  // Main Segmented View Toggle: 'yours' vs 'discover' (Modeled on Reference 2)
  const [activeTab, setActiveTab] = useState<'yours' | 'discover'>('yours');
  const [filterType, setFilterType] = useState<string>('all');
  const [search, setSearch] = useState<string>('');

  const connectedServices = services.filter(s => s.status === 'connected');
  const availableServices = services.filter(s => s.status === 'not_connected');

  const currentList = activeTab === 'yours' ? connectedServices : availableServices;

  const filteredList = currentList.filter(s => {
    const matchesFilter = filterType === 'all' || s.categoryType === filterType;
    const matchesSearch = s.name.toLowerCase().includes(search.toLowerCase()) ||
                          s.description.toLowerCase().includes(search.toLowerCase()) ||
                          (s.connectedEmail && s.connectedEmail.toLowerCase().includes(search.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      {/* Top Page Header - Modeled on Reference 2 ("Customize") */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <h1 style={{
          fontFamily: 'var(--font-serif)',
          fontSize: '32px',
          fontWeight: 400,
          color: 'var(--color-primary-black)',
          letterSpacing: '-0.02em',
          margin: 0
        }}>
          Connected services
        </h1>

        {/* Filter Controls Row: Category Pills + Yours/Discover Toggle + Search + Add Button */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px'
        }}>
          {/* Left: Category Filter Pills & Segmented Toggle */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
            {/* Category Pills (like Skills, Connectors, Plugins) */}
            <div style={{ display: 'flex', gap: '4px' }}>
              {[
                { id: 'all', label: 'All' },
                { id: 'cloud_storage', label: 'Cloud Storage' },
                { id: 'social_media', label: 'Social & Media' },
                { id: 'work_productivity', label: 'Work & Files' }
              ].map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setFilterType(cat.id)}
                  className={`category-pill ${filterType === cat.id ? 'active' : ''}`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Segmented Yours / Discover Toggle (Reference 2) */}
            <div className="segmented-pill">
              <button
                onClick={() => setActiveTab('yours')}
                className={`segmented-pill-item ${activeTab === 'yours' ? 'active' : ''}`}
              >
                Your services ({connectedServices.length})
              </button>
              <button
                onClick={() => setActiveTab('discover')}
                className={`segmented-pill-item ${activeTab === 'discover' ? 'active' : ''}`}
              >
                Discover ({availableServices.length})
              </button>
            </div>
          </div>

          {/* Right: Search, Filter, Sort, Add Action */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ position: 'relative', width: '200px' }}>
              <Search
                size={14}
                style={{
                  position: 'absolute',
                  left: '10px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'var(--color-secondary-text)',
                  pointerEvents: 'none'
                }}
              />
              <input
                type="search"
                placeholder="Search services..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{
                  width: '100%',
                  paddingLeft: '32px',
                  paddingRight: '10px',
                  paddingTop: '6px',
                  paddingBottom: '6px',
                  fontSize: '12.5px',
                  backgroundColor: 'var(--color-white)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-sm)'
                }}
              />
            </div>

            <button
              onClick={() => onOpenConnectModal()}
              className="btn-primary"
            >
              <Plus size={15} />
              <span>Connect service</span>
            </button>
          </div>
        </div>
      </div>

      {/* Featured Card Banner - Modeled on Soft Tinted Card in Reference 2 */}
      <div style={{
        backgroundColor: 'var(--color-pale-blue-grey)',
        borderRadius: '14px',
        padding: '24px 28px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '24px',
        border: '1px solid var(--color-border-subtle)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ maxWidth: '640px' }}>
          <div style={{
            fontSize: '11px',
            fontWeight: 500,
            color: 'var(--color-secondary-text)',
            marginBottom: '6px',
            letterSpacing: '0.02em'
          }}>
            From My Vault Protocol
          </div>

          <h2 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '22px',
            fontWeight: 500,
            color: 'var(--color-primary-black)',
            margin: '0 0 6px',
            letterSpacing: '-0.015em'
          }}>
            Zero-Knowledge Continuity Isolation
          </h2>

          <p style={{
            fontSize: '13px',
            color: 'var(--color-secondary-text)',
            lineHeight: 1.55,
            margin: '0 0 14px'
          }}>
            Connected accounts only store encrypted metadata references. Private messages, drafts, and passwords remain cryptographically sealed until continuity verification.
          </p>

          <button
            onClick={() => onOpenConnectModal()}
            style={{
              backgroundColor: 'var(--color-primary-black)',
              color: 'var(--color-white)',
              padding: '6px 14px',
              borderRadius: '6px',
              fontSize: '12px',
              fontWeight: 500,
              border: 'none',
              cursor: 'pointer'
            }}
          >
            {activeTab === 'yours' ? 'Link new account' : 'Browse available services'}
          </button>
        </div>

        {/* Decorative Grid Schematic Diagram (Right side of banner) */}
        <div style={{
          flexShrink: 0,
          width: '120px',
          height: '76px',
          border: '1.5px solid var(--color-primary-black)',
          borderRadius: '8px',
          padding: '6px',
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gridTemplateRows: 'repeat(2, 1fr)',
          gap: '4px',
          backgroundColor: 'rgba(255, 255, 255, 0.4)'
        }}>
          <div style={{ border: '1px solid var(--color-border)', borderRadius: '4px', backgroundColor: 'var(--color-white)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#16A34A' }} />
          </div>
          <div style={{ border: '1px solid var(--color-border)', borderRadius: '4px', backgroundColor: 'var(--color-white)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--color-primary-black)' }} />
          </div>
          <div style={{ border: '1px solid var(--color-border)', borderRadius: '4px', backgroundColor: 'var(--color-white)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Lock size={10} style={{ color: '#DC2626' }} />
          </div>
          <div style={{ border: '1px solid var(--color-border)', borderRadius: '4px', backgroundColor: 'var(--color-white)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--color-primary-black)' }} />
          </div>
          <div style={{ border: '1px solid var(--color-border)', borderRadius: '4px', backgroundColor: 'var(--color-white)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#16A34A' }} />
          </div>
          <div style={{ border: '1px solid var(--color-border)', borderRadius: '4px', backgroundColor: 'var(--color-white)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Lock size={10} style={{ color: '#DC2626' }} />
          </div>
        </div>
      </div>

      {/* Services List Section */}
      <section>
        <div className="section-header">
          <div>
            <div className="section-title">
              {activeTab === 'yours' ? 'Active connections' : 'Available integrations'}
            </div>
            <div style={{ fontSize: '12px', color: 'var(--color-secondary-text)', marginTop: '2px' }}>
              {activeTab === 'yours'
                ? `${filteredList.length} services configured for selective continuity`
                : 'Connect cloud platforms to catalog metadata and assign future access'}
            </div>
          </div>
        </div>

        {/* 2-Column Horizontal Cards Grid - Modeled on Reference 2 */}
        {filteredList.length > 0 ? (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '14px'
          }}>
            {filteredList.map(service => {
              const includedCats = service.categories.filter(c => c.isIncluded);
              const lockedCats = service.categories.filter(c => c.isExcludedByDefault);
              const isConnected = service.status === 'connected';

              return (
                <div
                  key={service.id}
                  style={{
                    backgroundColor: 'var(--color-white)',
                    border: '1px solid var(--color-border)',
                    borderRadius: '12px',
                    padding: '16px 18px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '16px',
                    transition: 'border-color var(--transition-fast)'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--color-blue-grey)'}
                  onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--color-border)'}
                >
                  {/* Left: Rounded Square Icon */}
                  <div style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '8px',
                    backgroundColor: 'var(--color-pale-blue-grey)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <ProviderIcon slug={service.slug} size={20} />
                  </div>

                  {/* Middle: Title, Description, Meta */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
                      <span style={{
                        fontSize: '14px',
                        fontWeight: 600,
                        color: 'var(--color-primary-black)',
                        lineHeight: 1.2
                      }}>
                        {service.name}
                      </span>
                      {isConnected && (
                        <span style={{
                          fontSize: '10px',
                          color: '#16A34A',
                          backgroundColor: '#EDF7EE',
                          padding: '1px 6px',
                          borderRadius: '4px',
                          fontWeight: 500
                        }}>
                          Connected
                        </span>
                      )}
                    </div>

                    <p style={{
                      fontSize: '12px',
                      color: 'var(--color-secondary-text)',
                      lineHeight: 1.4,
                      margin: '0 0 4px',
                      display: '-webkit-box',
                      WebkitLineClamp: 1,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden'
                    }}>
                      {service.description}
                    </p>

                    <div style={{
                      fontSize: '11px',
                      color: 'var(--color-secondary-text)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}>
                      <span>{service.connectedEmail || service.providerAuthName}</span>
                      {isConnected && (
                        <>
                          <span>•</span>
                          <span>{includedCats.length} scopes active</span>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Right: Compact Action Buttons (Like Try / + in Reference 2) */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0 }}>
                    {isConnected ? (
                      <>
                        <button
                          onClick={() => onSelectServiceForDetail(service.id)}
                          className="btn-secondary"
                          style={{
                            fontSize: '11.5px',
                            padding: '5px 10px',
                            gap: '4px'
                          }}
                        >
                          <Sliders size={12} />
                          <span>Manage</span>
                        </button>
                        <button
                          onClick={() => onDisconnectService(service.id)}
                          style={{
                            padding: '5px 7px',
                            borderRadius: '6px',
                            color: 'var(--color-secondary-text)',
                            border: '1px solid transparent',
                            background: 'transparent',
                            cursor: 'pointer'
                          }}
                          title="Disconnect account"
                          onMouseEnter={(e) => {
                            e.currentTarget.style.color = '#DC2626';
                            e.currentTarget.style.backgroundColor = '#FEE2E2';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.color = 'var(--color-secondary-text)';
                            e.currentTarget.style.backgroundColor = 'transparent';
                          }}
                        >
                          <Trash2 size={13} />
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => onOpenConnectModal(service.slug)}
                        style={{
                          backgroundColor: 'var(--color-pale-blue-grey)',
                          color: 'var(--color-primary-black)',
                          border: 'none',
                          padding: '5px 12px',
                          borderRadius: '6px',
                          fontSize: '11.5px',
                          fontWeight: 500,
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px',
                          cursor: 'pointer',
                          transition: 'background-color var(--transition-fast)'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = '#DDE2EC';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = 'var(--color-pale-blue-grey)';
                        }}
                      >
                        <Plus size={13} />
                        <span>Connect</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div style={{
            backgroundColor: 'var(--color-white)',
            border: '1px solid var(--color-border)',
            borderRadius: '12px',
            padding: '48px 24px',
            textAlign: 'center'
          }}>
            <p style={{ fontSize: '14px', color: 'var(--color-primary-black)', fontWeight: 500, margin: '0 0 6px' }}>
              No services found matching "{search}"
            </p>
            <p style={{ fontSize: '12px', color: 'var(--color-secondary-text)', margin: '0 0 16px' }}>
              Try adjusting your search keywords or switching categories.
            </p>
            <button
              onClick={() => { setSearch(''); setFilterType('all'); }}
              className="btn-secondary"
            >
              Clear search filters
            </button>
          </div>
        )}
      </section>

      {/* Architectural Invariant Note (Clean, Understated) */}
      <div style={{
        padding: '12px 16px',
        backgroundColor: 'var(--color-white)',
        border: '1px solid var(--color-border)',
        borderRadius: '8px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '16px',
        fontSize: '12px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <ShieldCheck size={15} style={{ color: '#16A34A', flexShrink: 0 }} />
          <span style={{ color: 'var(--color-secondary-text)' }}>
            <strong style={{ color: 'var(--color-primary-black)', fontWeight: 600 }}>Privacy Invariant:</strong> Connecting a service only registers read-only metadata into your personal vault. No nominees receive access until a certified post-continuity claim has cleared the full grace period.
          </span>
        </div>
        <span style={{ fontSize: '11px', color: 'var(--color-secondary-text)', flexShrink: 0 }}>
          Zero Lifetime Access
        </span>
      </div>
    </div>
  );
};
