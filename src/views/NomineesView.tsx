import React, { useState } from 'react';
import { 
  Users, 
  Plus, 
  Mail, 
  ShieldCheck, 
  KeyRound, 
  Trash2, 
  Edit3,
  Lock, 
  Search,
  FolderKanban,
  CheckCircle2,
  Clock
} from 'lucide-react';
import { Nominee, ServiceGroup } from '../../types';
import { Badge } from '../components/common/Badge';

interface NomineesViewProps {
  nominees: Nominee[];
  groups: ServiceGroup[];
  onOpenAddNomineeModal: () => void;
  onOpenEditNomineeModal: (nominee: Nominee) => void;
  onOpenVerificationModal: (nominee: Nominee) => void;
  onDeleteNominee: (nomineeId: string) => void;
}

export const NomineesView: React.FC<NomineesViewProps> = ({
  nominees,
  groups,
  onOpenAddNomineeModal,
  onOpenEditNomineeModal,
  onOpenVerificationModal,
  onDeleteNominee
}) => {
  const [search, setSearch] = useState('');

  const filteredNominees = nominees.filter(n => 
    n.name.toLowerCase().includes(search.toLowerCase()) ||
    n.email.toLowerCase().includes(search.toLowerCase()) ||
    n.relationship.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header Banner */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '16px'
      }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '32px', fontWeight: 400, margin: '0 0 6px', color: 'var(--color-primary-black)', letterSpacing: '-0.02em' }}>
            Trusted nominees
          </h1>
          <p style={{ fontSize: '13.5px', color: 'var(--color-secondary-text)', margin: 0, maxWidth: '640px' }}>
            Designate trusted individuals and assign selective category permissions for post-continuity claims.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ position: 'relative', width: '240px' }}>
            <Search size={14} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-secondary-text)' }} />
            <input
              type="search"
              placeholder="Search nominees..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ width: '100%', paddingLeft: '32px' }}
            />
          </div>

          <button
            onClick={onOpenAddNomineeModal}
            className="btn-primary"
          >
            <Plus size={15} />
            <span>Add Trusted Nominee</span>
          </button>
        </div>
      </div>

      {/* Nominees Grid (Equal Heights) */}
      {filteredNominees.length > 0 ? (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '20px',
          alignItems: 'stretch'
        }}>
          {filteredNominees.map(nominee => {
            const isVerified = nominee.verificationStatus === 'verified';
            const assignedGroups = groups.filter(g => g.assignedNomineeIds.includes(nominee.id));

            return (
              <div
                key={nominee.id}
                style={{
                  backgroundColor: 'var(--color-white)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '24px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  height: '100%',
                  gap: '18px',
                  boxShadow: 'var(--shadow-xs)'
                }}
              >
                <div>
                  {/* Header Profile & Actions */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        backgroundColor: 'var(--color-pale-blue-grey)',
                        color: 'var(--color-primary-black)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '13.5px',
                        fontWeight: 700,
                        flexShrink: 0
                      }}>
                        {nominee.avatarInitials}
                      </div>
                      <div>
                        <h3 style={{ fontSize: '15px', fontWeight: 700, margin: 0, color: 'var(--color-primary-black)' }}>
                          {nominee.name}
                        </h3>
                        <div style={{ fontSize: '11.5px', color: 'var(--color-secondary-text)', marginTop: '1px' }}>
                          {nominee.relationship}
                        </div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <button
                        onClick={() => onOpenEditNomineeModal(nominee)}
                        className="btn-ghost"
                        style={{ padding: '6px', color: 'var(--color-secondary-text)' }}
                        title="Edit nominee permissions"
                      >
                        <Edit3 size={13} />
                      </button>

                      <button
                        onClick={() => onDeleteNominee(nominee.id)}
                        className="btn-ghost"
                        style={{ padding: '6px', color: '#DC2626' }}
                        title="Revoke nominee assignment"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </div>

                  <div style={{
                    fontSize: '12px',
                    color: 'var(--color-secondary-text)',
                    marginBottom: '14px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}>
                    <Mail size={13} style={{ flexShrink: 0 }} />
                    <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {nominee.email}
                    </span>
                  </div>

                  {/* Dual Status Badges */}
                  <div style={{ display: 'flex', gap: '6px', marginBottom: '14px', flexWrap: 'wrap' }}>
                    <Badge variant={isVerified ? 'verified' : 'pending'} size="sm">
                      {isVerified ? 'Email Verified' : 'Verification Pending'}
                    </Badge>

                    <Badge variant="neutral" size="sm" icon={<Lock size={10} style={{ marginRight: '3px' }} />}>
                      Pending continuity activation
                    </Badge>
                  </div>

                  {/* Clarifying Subtext Guarantee */}
                  <div style={{
                    backgroundColor: 'var(--color-off-white)',
                    padding: '8px 10px',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '11px',
                    color: 'var(--color-secondary-text)',
                    marginBottom: '14px',
                    lineHeight: 1.4,
                    border: '1px solid var(--color-border-subtle)'
                  }}>
                    {isVerified ? (
                      <span>
                        <strong style={{ color: 'var(--color-primary-black)' }}>Email confirmed.</strong> Zero access during lifetime; access remains inactive pending certified continuity claim.
                      </span>
                    ) : (
                      <span>
                        Invitation sent with identity challenge code. Nominee must verify email before continuity eligibility.
                      </span>
                    )}
                  </div>

                  {/* Assigned Groups if any */}
                  {assignedGroups.length > 0 && (
                    <div style={{ marginBottom: '12px' }}>
                      <div style={{
                        fontSize: '10.5px',
                        fontWeight: 600,
                        color: 'var(--color-secondary-text)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.07em',
                        marginBottom: '5px'
                      }}>
                        Clustered Groups ({assignedGroups.length})
                      </div>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                        {assignedGroups.map(g => (
                          <span
                            key={g.id}
                            style={{
                              fontSize: '11px',
                              backgroundColor: 'var(--color-pale-blue-grey)',
                              border: '1px solid var(--color-border)',
                              padding: '2px 7px',
                              borderRadius: 'var(--radius-xs)',
                              fontWeight: 600,
                              color: 'var(--color-primary-black)',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '4px'
                            }}
                          >
                            <FolderKanban size={10} />
                            <span>{g.name}</span>
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Assigned Individual Categories */}
                  <div>
                    <div style={{
                      fontSize: '10.5px',
                      fontWeight: 600,
                      color: 'var(--color-secondary-text)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.07em',
                      marginBottom: '6px'
                    }}>
                      Delegated Categories ({nominee.assignedCategories.length})
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                      {nominee.assignedCategories.slice(0, 4).map((cat, i) => (
                        <span
                          key={i}
                          style={{
                            fontSize: '11px',
                            backgroundColor: 'var(--color-off-white)',
                            border: '1px solid var(--color-border)',
                            padding: '2px 7px',
                            borderRadius: 'var(--radius-xs)',
                            color: 'var(--color-primary-black)'
                          }}
                        >
                          {cat}
                        </span>
                      ))}
                      {nominee.assignedCategories.length > 4 && (
                        <span style={{ fontSize: '10.5px', color: 'var(--color-secondary-text)', alignSelf: 'center' }}>
                          +{nominee.assignedCategories.length - 4} more
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Bottom Actions */}
                <div style={{
                  borderTop: '1px solid var(--color-border-subtle)',
                  paddingTop: '14px',
                  display: 'flex',
                  gap: '8px'
                }}>
                  <button
                    onClick={() => onOpenVerificationModal(nominee)}
                    className="btn-secondary"
                    style={{
                      flex: 1,
                      fontSize: '12px',
                      padding: '7px 10px',
                      justifyContent: 'center'
                    }}
                  >
                    <KeyRound size={13} />
                    <span>{isVerified ? 'View Challenge Code' : 'Simulate Email Verification'}</span>
                  </button>

                  <button
                    onClick={() => onOpenEditNomineeModal(nominee)}
                    className="btn-ghost"
                    style={{ fontSize: '12px', padding: '7px 10px' }}
                    title="Edit categories & assignments"
                  >
                    <Edit3 size={13} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div style={{
          backgroundColor: 'var(--color-white)',
          border: '1px solid var(--color-border)',
          borderRadius: 'var(--radius-lg)',
          padding: '48px 24px',
          textAlign: 'center'
        }}>
          <Users size={32} style={{ color: 'var(--color-secondary-text)', margin: '0 auto 12px' }} />
          <h3 style={{ fontSize: '16px', fontWeight: 600, margin: '0 0 6px' }}>No Trusted Nominees Designated</h3>
          <p style={{ fontSize: '13px', color: 'var(--color-secondary-text)', maxWidth: '420px', margin: '0 auto 16px' }}>
            Add trusted people (family, partner, legal representative) and assign specific digital information categories.
          </p>
          <button onClick={onOpenAddNomineeModal} className="btn-primary" style={{ margin: '0 auto' }}>
            <Plus size={14} />
            <span>Add First Nominee</span>
          </button>
        </div>
      )}
    </div>
  );
};
