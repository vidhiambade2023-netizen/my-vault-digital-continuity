import React, { useState, useEffect } from 'react';
import { 
  X, 
  ShieldAlert, 
  CheckCircle2, 
  FolderKanban, 
  Lock, 
  ArrowRight, 
  ArrowLeft, 
  ShieldCheck,
  Check,
  FileText,
  AlertTriangle
} from 'lucide-react';
import { Nominee, ServiceItem, ServiceGroup } from '../../types';
import { Badge } from '../common/Badge';
import { ProviderIcon } from '../common/ProviderIcon';

interface AddNomineeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveNominee: (nominee: Nominee, assignedGroupIds: string[], assignedCategoryNames: string[]) => void;
  services: ServiceItem[];
  groups: ServiceGroup[];
  nomineeToEdit?: Nominee | null;
}

export const AddNomineeModal: React.FC<AddNomineeModalProps> = ({
  isOpen,
  onClose,
  onSaveNominee,
  services,
  groups,
  nomineeToEdit
}) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [relationship, setRelationship] = useState('Sister');
  const [selectedGroupIds, setSelectedGroupIds] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  useEffect(() => {
    if (isOpen) {
      if (nomineeToEdit) {
        setName(nomineeToEdit.name);
        setEmail(nomineeToEdit.email);
        setRelationship(nomineeToEdit.relationship);
        setSelectedCategories([...nomineeToEdit.assignedCategories]);
        
        // Find which groups contain this nominee
        const matchingGroupIds = groups
          .filter(g => g.assignedNomineeIds.includes(nomineeToEdit.id))
          .map(g => g.id);
        setSelectedGroupIds(matchingGroupIds);
        setStep(1);
      } else {
        setName('');
        setEmail('');
        setRelationship('Sister');
        setSelectedGroupIds([]);
        // Default select first available non-excluded category for demo convenience
        const defaultCat = services.flatMap(s => s.categories).find(c => !c.isExcludedByDefault && c.isIncluded);
        setSelectedCategories(defaultCat ? [defaultCat.name] : ['Google Photos & Family Albums']);
        setStep(1);
      }
    }
  }, [isOpen, nomineeToEdit, groups, services]);

  if (!isOpen) return null;

  const toggleGroup = (groupId: string) => {
    if (selectedGroupIds.includes(groupId)) {
      setSelectedGroupIds(selectedGroupIds.filter(id => id !== groupId));
    } else {
      setSelectedGroupIds([...selectedGroupIds, groupId]);
      // Also automatically include categories from services belonging to this group
      const grp = groups.find(g => g.id === groupId);
      if (grp) {
        const groupServices = services.filter(s => grp.serviceIds.includes(s.id));
        const groupCategoryNames = groupServices.flatMap(s => 
          s.categories.filter(c => !c.isExcludedByDefault).map(c => c.name)
        );
        setSelectedCategories(prev => Array.from(new Set([...prev, ...groupCategoryNames])));
      }
    }
  };

  const toggleCategory = (catName: string) => {
    if (selectedCategories.includes(catName)) {
      setSelectedCategories(selectedCategories.filter(c => c !== catName));
    } else {
      setSelectedCategories([...selectedCategories, catName]);
    }
  };

  const handleNextToStep2 = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;
    setStep(2);
  };

  const handleNextToStep3 = () => {
    setStep(3);
  };

  const handleFinalSubmit = () => {
    const initials = name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2) || 'TN';

    const randomCode = nomineeToEdit?.demoVerificationCode || `VAULT-${Math.floor(1000 + Math.random() * 9000)}`;

    const effectiveNominee: Nominee = {
      id: nomineeToEdit?.id || `nom-${Date.now()}`,
      name: name.trim(),
      email: email.trim().toLowerCase(),
      relationship,
      verificationStatus: nomineeToEdit?.verificationStatus || 'pending',
      accessStatus: 'inactive_lifetime',
      assignedCategories: selectedCategories.length > 0 ? selectedCategories : ['Selected Digital Assets'],
      demoVerificationCode: randomCode,
      invitedDate: nomineeToEdit?.invitedDate || 'Just now',
      verifiedDate: nomineeToEdit?.verifiedDate,
      avatarInitials: initials
    };

    onSaveNominee(effectiveNominee, selectedGroupIds, selectedCategories);
    onClose();
  };

  // Compile locked exclusions across connected platforms
  const lockedCategories = services.flatMap(s => 
    s.categories.filter(c => c.isExcludedByDefault).map(c => ({
      serviceName: s.name,
      slug: s.slug,
      categoryName: c.name,
      description: c.description
    }))
  );

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(11, 11, 13, 0.48)',
      backdropFilter: 'blur(5px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '20px'
    }}>
      <div style={{
        backgroundColor: 'var(--color-white)',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--color-border)',
        boxShadow: 'var(--shadow-modal)',
        width: '100%',
        maxWidth: '580px',
        maxHeight: '92vh',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        animation: 'fadeIn 0.2s cubic-bezier(0.16, 1, 0.3, 1)'
      }}>
        {/* Header */}
        <div style={{
          padding: '18px 24px',
          borderBottom: '1px solid var(--color-border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: 'var(--color-white)'
        }}>
          <div>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '10.5px',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              color: 'var(--color-secondary-text)',
              marginBottom: '2px'
            }}>
              <span>Delegation Workflow</span>
              <span>•</span>
              <span style={{ color: 'var(--color-primary-black)' }}>Stage {step} of 3</span>
            </div>
            <h2 style={{ fontSize: '17px', fontWeight: 700, margin: 0, color: 'var(--color-primary-black)' }}>
              {step === 1 && (nomineeToEdit ? `Edit Nominee: ${nomineeToEdit.name}` : 'Designate a Trusted Nominee')}
              {step === 2 && 'Assign Groups & Categories'}
              {step === 3 && 'Review Effective Continuity Permissions'}
            </h2>
          </div>
          <button onClick={onClose} className="btn-ghost" style={{ padding: '6px' }}>
            <X size={16} />
          </button>
        </div>

        {/* Modal Body */}
        <div style={{ padding: '24px', overflowY: 'auto', flex: 1 }}>
          {/* STEP 1: Nominee Identity */}
          {step === 1 && (
            <form id="nominee-identity-form" onSubmit={handleNextToStep2}>
              {/* Privacy Disclosure Banner */}
              <div style={{
                padding: '12px 14px',
                backgroundColor: 'var(--color-pale-blue-grey)',
                borderRadius: 'var(--radius-md)',
                marginBottom: '18px',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '10px',
                border: '1px solid var(--color-border)'
              }}>
                <ShieldAlert size={16} style={{ color: 'var(--color-primary-black)', flexShrink: 0, marginTop: '2px' }} />
                <div style={{ fontSize: '12px', color: 'var(--color-primary-black)', lineHeight: 1.45 }}>
                  <strong>Lifetime Isolation Guarantee:</strong> Adding a nominee sends an identity invitation. 
                  <strong> They receive ZERO access during your lifetime.</strong> Email verification only confirms their contact identity.
                </div>
              </div>

              <div style={{ marginBottom: '14px' }}>
                <label style={{ display: 'block', fontSize: '11.5px', fontWeight: 600, marginBottom: '5px' }}>
                  Full Legal Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Devika Rao"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  style={{ width: '100%', fontSize: '13px' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '14px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '11.5px', fontWeight: 600, marginBottom: '5px' }}>
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. devika.rao@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{ width: '100%', fontSize: '13px' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '11.5px', fontWeight: 600, marginBottom: '5px' }}>
                    Relationship
                  </label>
                  <select
                    value={relationship}
                    onChange={(e) => setRelationship(e.target.value)}
                    style={{ width: '100%', fontSize: '13px' }}
                  >
                    <option value="Sister">Sister</option>
                    <option value="Brother">Brother</option>
                    <option value="Partner / Spouse">Partner / Spouse</option>
                    <option value="Parent">Parent</option>
                    <option value="Child">Child</option>
                    <option value="Close Friend">Close Friend</option>
                    <option value="Legal Representative / Executor">Legal Representative / Executor</option>
                  </select>
                </div>
              </div>
            </form>
          )}

          {/* STEP 2: Assign Groups & Categories with Default Private Exclusions */}
          {step === 2 && (
            <div>
              <p style={{ fontSize: '12.5px', color: 'var(--color-secondary-text)', margin: '0 0 16px', lineHeight: 1.5 }}>
                Select which service groups or specific categories <strong>{name}</strong> will be eligible to claim 
                only upon verified continuity activation.
              </p>

              {/* Part A: Assign by Service Groups */}
              {groups.length > 0 && (
                <div style={{ marginBottom: '18px' }}>
                  <label style={{ display: 'block', fontSize: '11.5px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--color-primary-black)', marginBottom: '8px' }}>
                    1. Assign Clustered Service Groups
                  </label>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
                    {groups.map(grp => {
                      const isSelected = selectedGroupIds.includes(grp.id);
                      return (
                        <div
                          key={grp.id}
                          onClick={() => toggleGroup(grp.id)}
                          style={{
                            padding: '10px 12px',
                            border: isSelected ? '2px solid var(--color-primary-black)' : '1px solid var(--color-border)',
                            borderRadius: 'var(--radius-md)',
                            backgroundColor: isSelected ? 'var(--color-pale-blue-grey)' : 'var(--color-white)',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            transition: 'all var(--transition-fast)'
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <FolderKanban size={15} style={{ color: 'var(--color-primary-black)' }} />
                            <div>
                              <div style={{ fontSize: '12.5px', fontWeight: 600, color: 'var(--color-primary-black)' }}>
                                {grp.name}
                              </div>
                              <div style={{ fontSize: '11px', color: 'var(--color-secondary-text)' }}>
                                {grp.serviceIds.length} services clustered
                              </div>
                            </div>
                          </div>
                          <div style={{
                            width: '18px',
                            height: '18px',
                            borderRadius: '4px',
                            border: isSelected ? 'none' : '1px solid var(--color-border)',
                            backgroundColor: isSelected ? 'var(--color-primary-black)' : 'var(--color-white)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'var(--color-white)'
                          }}>
                            {isSelected && <Check size={12} />}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Part B: Individual Categories */}
              <div style={{ marginBottom: '18px' }}>
                <label style={{ display: 'block', fontSize: '11.5px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--color-primary-black)', marginBottom: '8px' }}>
                  2. Individual Eligible Categories ({selectedCategories.length} selected)
                </label>
                <div style={{
                  maxHeight: '170px',
                  overflowY: 'auto',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-md)',
                  padding: '8px',
                  backgroundColor: 'var(--color-off-white)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '6px'
                }}>
                  {services.map(s => {
                    const eligibleCats = s.categories.filter(c => !c.isExcludedByDefault);
                    if (eligibleCats.length === 0) return null;

                    return (
                      <div key={s.id} style={{ marginBottom: '4px' }}>
                        <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-secondary-text)', padding: '4px 6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <ProviderIcon slug={s.slug} size={12} />
                          <span>{s.name}</span>
                        </div>
                        {eligibleCats.map(cat => {
                          const isChecked = selectedCategories.includes(cat.name);
                          return (
                            <label
                              key={cat.id}
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                padding: '6px 8px',
                                borderRadius: 'var(--radius-xs)',
                                backgroundColor: isChecked ? 'var(--color-pale-blue-grey)' : 'var(--color-white)',
                                border: '1px solid var(--color-border-subtle)',
                                marginBottom: '4px',
                                cursor: 'pointer',
                                fontSize: '12px'
                              }}
                            >
                              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <input
                                  type="checkbox"
                                  checked={isChecked}
                                  onChange={() => toggleCategory(cat.name)}
                                />
                                <span style={{ fontWeight: 500, color: 'var(--color-primary-black)' }}>{cat.name}</span>
                              </div>
                              <span style={{ fontSize: '10.5px', color: 'var(--color-secondary-text)' }}>Eligible</span>
                            </label>
                          );
                        })}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Part C: Architectural Exclusions (Private Conversations Locked by Default) */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
                  <Lock size={12} style={{ color: '#991B1B' }} />
                  <label style={{ fontSize: '11.5px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#991B1B', margin: 0 }}>
                    Strict Architectural Exclusions (Zero-Knowledge Inviolable)
                  </label>
                </div>
                <div style={{
                  backgroundColor: '#FFF7F7',
                  border: '1px solid #FEE2E2',
                  borderRadius: 'var(--radius-md)',
                  padding: '10px 12px'
                }}>
                  <p style={{ fontSize: '11.5px', color: '#7F1D1D', margin: '0 0 8px', lineHeight: 1.4 }}>
                    <strong>Private conversations and passwords are excluded by default:</strong>
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    {lockedCategories.slice(0, 3).map((item, idx) => (
                      <div
                        key={idx}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          fontSize: '11px',
                          color: '#991B1B',
                          padding: '3px 0'
                        }}
                      >
                        <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <Lock size={10} />
                          <span><strong>{item.serviceName}</strong>: {item.categoryName}</span>
                        </span>
                        <span style={{ fontSize: '10px', textTransform: 'uppercase', fontWeight: 600, letterSpacing: '0.05em' }}>
                          Locked
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Review Effective Continuity Permissions Before Saving */}
          {step === 3 && (
            <div>
              <div style={{
                padding: '14px',
                backgroundColor: 'var(--color-off-white)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--color-border)',
                marginBottom: '16px'
              }}>
                <div style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--color-secondary-text)', marginBottom: '8px' }}>
                  Nominee Profile Summary
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <h3 style={{ fontSize: '16px', fontWeight: 700, margin: '0 0 3px', color: 'var(--color-primary-black)' }}>
                      {name}
                    </h3>
                    <div style={{ fontSize: '12px', color: 'var(--color-secondary-text)' }}>
                      {relationship} • {email}
                    </div>
                  </div>
                  <Badge variant="pending" size="sm">
                    Pending Verification
                  </Badge>
                </div>
              </div>

              {/* Effective Assignment Summary */}
              <div style={{ marginBottom: '16px' }}>
                <div style={{ fontSize: '11.5px', fontWeight: 700, color: 'var(--color-primary-black)', marginBottom: '8px' }}>
                  Effective Delegated Scopes ({selectedCategories.length} categories)
                </div>
                <div style={{
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-md)',
                  padding: '10px 12px',
                  backgroundColor: 'var(--color-white)',
                  maxHeight: '140px',
                  overflowY: 'auto',
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '6px'
                }}>
                  {selectedCategories.length > 0 ? (
                    selectedCategories.map((cat, i) => (
                      <span
                        key={i}
                        style={{
                          fontSize: '11px',
                          padding: '3px 8px',
                          backgroundColor: 'var(--color-pale-blue-grey)',
                          border: '1px solid var(--color-border)',
                          borderRadius: 'var(--radius-xs)',
                          fontWeight: 500,
                          color: 'var(--color-primary-black)'
                        }}
                      >
                        {cat}
                      </span>
                    ))
                  ) : (
                    <span style={{ fontSize: '12px', color: 'var(--color-secondary-text)', fontStyle: 'italic' }}>
                      No categories selected yet.
                    </span>
                  )}
                </div>
              </div>

              {/* Critical Legal and Security Notice */}
              <div style={{
                padding: '12px 14px',
                backgroundColor: 'var(--color-pale-blue-grey)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--color-border)',
                display: 'flex',
                gap: '10px',
                alignItems: 'flex-start'
              }}>
                <ShieldCheck size={16} style={{ color: '#16A34A', flexShrink: 0, marginTop: '2px' }} />
                <div style={{ fontSize: '11.5px', color: 'var(--color-primary-black)', lineHeight: 1.45 }}>
                  <strong>State Integrity Confirmation:</strong> Saving dispatches an email invitation. 
                  When {name} completes email verification, their status will update to <em>"Email Verified • Pending continuity activation"</em>. 
                  <strong> No account access will be granted during your lifetime.</strong>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div style={{
          padding: '14px 24px',
          borderTop: '1px solid var(--color-border)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: 'var(--color-off-white)'
        }}>
          {step > 1 ? (
            <button
              type="button"
              onClick={() => setStep((step - 1) as any)}
              className="btn-ghost"
              style={{ fontSize: '12px' }}
            >
              <ArrowLeft size={13} /> Back
            </button>
          ) : (
            <div />
          )}

          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              type="button"
              onClick={onClose}
              className="btn-secondary"
              style={{ fontSize: '12px' }}
            >
              Cancel
            </button>

            {step === 1 && (
              <button
                type="submit"
                form="nominee-identity-form"
                className="btn-primary"
                style={{ fontSize: '12px' }}
              >
                <span>Continue to Delegation</span>
                <ArrowRight size={13} />
              </button>
            )}

            {step === 2 && (
              <button
                type="button"
                onClick={handleNextToStep3}
                className="btn-primary"
                style={{ fontSize: '12px' }}
              >
                <span>Review Effective Permissions</span>
                <ArrowRight size={13} />
              </button>
            )}

            {step === 3 && (
              <button
                type="button"
                onClick={handleFinalSubmit}
                className="btn-primary"
                style={{ fontSize: '12px' }}
              >
                <CheckCircle2 size={14} />
                <span>{nomineeToEdit ? 'Save Changes' : 'Confirm & Send Invitation'}</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
