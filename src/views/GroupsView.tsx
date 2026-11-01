import React, { useState } from 'react';
import { 
  FolderKanban, 
  Plus, 
  Trash2, 
  Edit3,
  ShieldCheck, 
  X,
  Layers,
  CheckCircle2,
  Users,
  Check
} from 'lucide-react';
import { ServiceGroup, ServiceItem, Nominee } from '../../types';
import { Badge } from '../components/common/Badge';
import { ProviderIcon } from '../components/common/ProviderIcon';

interface GroupsViewProps {
  groups: ServiceGroup[];
  services: ServiceItem[];
  nominees: Nominee[];
  onCreateGroup: (group: ServiceGroup) => void;
  onUpdateGroup: (group: ServiceGroup) => void;
  onDeleteGroup: (groupId: string) => void;
}

export const GroupsView: React.FC<GroupsViewProps> = ({
  groups,
  services,
  nominees,
  onCreateGroup,
  onUpdateGroup,
  onDeleteGroup
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingGroupId, setEditingGroupId] = useState<string | null>(null);

  const [groupName, setGroupName] = useState('');
  const [groupDesc, setGroupDesc] = useState('');
  const [selectedServiceIds, setSelectedServiceIds] = useState<string[]>([]);
  const [selectedNomineeIds, setSelectedNomineeIds] = useState<string[]>([]);

  const openCreateModal = () => {
    setEditingGroupId(null);
    setGroupName('');
    setGroupDesc('');
    setSelectedServiceIds(services.slice(0, 2).map(s => s.id));
    setSelectedNomineeIds(nominees.slice(0, 1).map(n => n.id));
    setIsModalOpen(true);
  };

  const openEditModal = (group: ServiceGroup) => {
    setEditingGroupId(group.id);
    setGroupName(group.name);
    setGroupDesc(group.description);
    setSelectedServiceIds([...group.serviceIds]);
    setSelectedNomineeIds([...group.assignedNomineeIds]);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingGroupId(null);
  };

  const toggleService = (srvId: string) => {
    if (selectedServiceIds.includes(srvId)) {
      setSelectedServiceIds(selectedServiceIds.filter(id => id !== srvId));
    } else {
      setSelectedServiceIds([...selectedServiceIds, srvId]);
    }
  };

  const toggleNominee = (nomId: string) => {
    if (selectedNomineeIds.includes(nomId)) {
      setSelectedNomineeIds(selectedNomineeIds.filter(id => id !== nomId));
    } else {
      setSelectedNomineeIds([...selectedNomineeIds, nomId]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!groupName.trim()) return;

    if (editingGroupId) {
      const existing = groups.find(g => g.id === editingGroupId);
      if (existing) {
        const updated: ServiceGroup = {
          ...existing,
          name: groupName.trim(),
          description: groupDesc.trim() || 'Custom service cluster for continuity policies.',
          serviceIds: selectedServiceIds,
          assignedNomineeIds: selectedNomineeIds
        };
        onUpdateGroup(updated);
      }
    } else {
      const newGroup: ServiceGroup = {
        id: `grp-${Date.now().toString().slice(-4)}`,
        name: groupName.trim(),
        description: groupDesc.trim() || 'Custom service cluster for continuity policies.',
        iconName: 'folder',
        serviceIds: selectedServiceIds,
        assignedNomineeIds: selectedNomineeIds,
        inheritedCategories: ['Synchronised folder records', 'Curated assets']
      };
      onCreateGroup(newGroup);
    }

    closeModal();
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* View Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '16px'
      }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '32px', fontWeight: 400, margin: '0 0 6px', color: 'var(--color-primary-black)', letterSpacing: '-0.02em' }}>
            Service groups
          </h1>
          <p style={{ fontSize: '13.5px', color: 'var(--color-secondary-text)', margin: 0, maxWidth: '640px' }}>
            Cluster multiple services into logical bundles to assign broad category permissions without micromanaging individual platforms.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="btn-primary"
        >
          <Plus size={15} />
          <span>Create New Group</span>
        </button>
      </div>

      {/* Groups Grid (Equal Heights) */}
      {groups.length > 0 ? (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '20px',
          alignItems: 'stretch'
        }}>
          {groups.map(group => {
            const groupServices = services.filter(s => group.serviceIds.includes(s.id));
            const groupNominees = nominees.filter(n => group.assignedNomineeIds.includes(n.id));

            return (
              <div
                key={group.id}
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
                  {/* Card Header & Actions */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={{
                        width: '38px',
                        height: '38px',
                        borderRadius: 'var(--radius-sm)',
                        backgroundColor: 'var(--color-pale-blue-grey)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--color-primary-black)',
                        flexShrink: 0
                      }}>
                        <FolderKanban size={18} />
                      </div>
                      <div>
                        <h3 style={{ fontSize: '15.5px', fontWeight: 700, margin: 0, color: 'var(--color-primary-black)' }}>
                          {group.name}
                        </h3>
                        <div style={{ fontSize: '11.5px', color: 'var(--color-secondary-text)', marginTop: '2px' }}>
                          {groupServices.length} {groupServices.length === 1 ? 'service linked' : 'services linked'}
                        </div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <button
                        onClick={() => openEditModal(group)}
                        className="btn-secondary"
                        style={{ fontSize: '11.5px', padding: '4px 8px' }}
                        title="Edit group details & services"
                      >
                        <Edit3 size={12} />
                        <span>Edit</span>
                      </button>

                      <button
                        onClick={() => onDeleteGroup(group.id)}
                        className="btn-ghost"
                        style={{ padding: '6px', color: '#DC2626' }}
                        title="Delete group"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </div>

                  <p style={{ fontSize: '12.5px', color: 'var(--color-secondary-text)', margin: '0 0 16px', lineHeight: 1.5 }}>
                    {group.description}
                  </p>

                  {/* Platforms In Group */}
                  <div style={{ marginBottom: '14px' }}>
                    <div style={{ fontSize: '10.5px', fontWeight: 600, color: 'var(--color-secondary-text)', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: '6px' }}>
                      Included Services ({groupServices.length})
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                      {groupServices.length > 0 ? (
                        groupServices.map(s => (
                          <span
                            key={s.id}
                            style={{
                              fontSize: '11.5px',
                              backgroundColor: 'var(--color-off-white)',
                              border: '1px solid var(--color-border)',
                              padding: '3px 8px',
                              borderRadius: 'var(--radius-xs)',
                              fontWeight: 500,
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '6px'
                            }}
                          >
                            <ProviderIcon slug={s.slug} size={13} />
                            <span>{s.name}</span>
                          </span>
                        ))
                      ) : (
                        <span style={{ fontSize: '11.5px', color: 'var(--color-secondary-text)', fontStyle: 'italic' }}>
                          No services currently attached to this group
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Designated Nominees */}
                  <div>
                    <div style={{ fontSize: '10.5px', fontWeight: 600, color: 'var(--color-secondary-text)', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: '6px' }}>
                      Designated Delegates ({groupNominees.length})
                    </div>
                    <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                      {groupNominees.length > 0 ? (
                        groupNominees.map(n => (
                          <div
                            key={n.id}
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '6px',
                              fontSize: '11.5px',
                              padding: '3px 9px',
                              borderRadius: 'var(--radius-full)',
                              backgroundColor: 'var(--color-pale-blue-grey)',
                              border: '1px solid var(--color-border)'
                            }}
                          >
                            <span style={{ fontWeight: 600, color: 'var(--color-primary-black)' }}>{n.name}</span>
                            <span style={{ color: 'var(--color-secondary-text)', fontSize: '10.5px' }}>({n.relationship})</span>
                          </div>
                        ))
                      ) : (
                        <span style={{ fontSize: '11.5px', color: 'var(--color-secondary-text)', fontStyle: 'italic' }}>
                          No nominees assigned (Decide later or assign in Nominees)
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Card Invariant Footer */}
                <div style={{
                  borderTop: '1px solid var(--color-border-subtle)',
                  paddingTop: '12px',
                  fontSize: '11.5px',
                  color: 'var(--color-secondary-text)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}>
                  <ShieldCheck size={14} style={{ color: '#16A34A', flexShrink: 0 }} />
                  <span>Zero-knowledge exclusion invariants automatically apply across all services in this cluster.</span>
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
          <FolderKanban size={32} style={{ color: 'var(--color-secondary-text)', margin: '0 auto 12px' }} />
          <h3 style={{ fontSize: '16px', fontWeight: 600, margin: '0 0 6px' }}>No Service Groups Configured</h3>
          <p style={{ fontSize: '13px', color: 'var(--color-secondary-text)', maxWidth: '420px', margin: '0 auto 16px' }}>
            Groups let you bundle multiple cloud repositories together so you can grant continuity permissions in batch.
          </p>
          <button onClick={openCreateModal} className="btn-primary" style={{ margin: '0 auto' }}>
            <Plus size={14} />
            <span>Create First Group</span>
          </button>
        </div>
      )}

      {/* Create / Edit Group Modal */}
      {isModalOpen && (
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
            maxWidth: '560px',
            maxHeight: '90vh',
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
                  <span>Cluster Configuration</span>
                </div>
                <h2 style={{ fontSize: '17px', fontWeight: 700, margin: 0, color: 'var(--color-primary-black)' }}>
                  {editingGroupId ? 'Edit Service Group' : 'Create New Service Group'}
                </h2>
              </div>
              <button onClick={closeModal} className="btn-ghost" style={{ padding: '6px' }}>
                <X size={16} />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} style={{ padding: '24px', overflowY: 'auto', flex: 1 }}>
              <div style={{ marginBottom: '14px' }}>
                <label style={{ display: 'block', fontSize: '11.5px', fontWeight: 600, marginBottom: '5px' }}>
                  Group Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Creative Archives or Family Memories"
                  value={groupName}
                  onChange={(e) => setGroupName(e.target.value)}
                  style={{ width: '100%', fontSize: '13px' }}
                />
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '11.5px', fontWeight: 600, marginBottom: '5px' }}>
                  Group Description
                </label>
                <input
                  type="text"
                  placeholder="What categories and digital assets does this group contain?"
                  value={groupDesc}
                  onChange={(e) => setGroupDesc(e.target.value)}
                  style={{ width: '100%', fontSize: '13px' }}
                />
              </div>

              {/* Multiple Services Selection */}
              <div style={{ marginBottom: '18px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <label style={{ fontSize: '11.5px', fontWeight: 600, margin: 0 }}>
                    Select Services to Include in Group ({selectedServiceIds.length} selected)
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      if (selectedServiceIds.length === services.length) {
                        setSelectedServiceIds([]);
                      } else {
                        setSelectedServiceIds(services.map(s => s.id));
                      }
                    }}
                    style={{ fontSize: '11px', color: 'var(--color-secondary-text)', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}
                  >
                    {selectedServiceIds.length === services.length ? 'Deselect All' : 'Select All'}
                  </button>
                </div>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: '8px',
                  maxHeight: '160px',
                  overflowY: 'auto',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '8px',
                  backgroundColor: 'var(--color-off-white)'
                }}>
                  {services.map(s => {
                    const isChecked = selectedServiceIds.includes(s.id);
                    return (
                      <label
                        key={s.id}
                        style={{
                          padding: '8px 10px',
                          border: isChecked ? '1px solid var(--color-primary-black)' : '1px solid var(--color-border)',
                          borderRadius: 'var(--radius-sm)',
                          backgroundColor: isChecked ? 'var(--color-pale-blue-grey)' : 'var(--color-white)',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          cursor: 'pointer',
                          fontSize: '12px',
                          fontWeight: 500,
                          transition: 'all var(--transition-fast)'
                        }}
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => toggleService(s.id)}
                        />
                        <ProviderIcon slug={s.slug} size={15} />
                        <span style={{ color: 'var(--color-primary-black)' }}>{s.name}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Designated Nominees */}
              <div style={{ marginBottom: '18px' }}>
                <label style={{ display: 'block', fontSize: '11.5px', fontWeight: 600, marginBottom: '6px' }}>
                  Assign Trusted Circle Delegates ({selectedNomineeIds.length} assigned)
                </label>
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '6px',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '8px 10px',
                  backgroundColor: 'var(--color-off-white)'
                }}>
                  {nominees.map(n => {
                    const isChecked = selectedNomineeIds.includes(n.id);
                    return (
                      <label
                        key={n.id}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '6px 8px',
                          borderRadius: 'var(--radius-xs)',
                          backgroundColor: isChecked ? 'var(--color-pale-blue-grey)' : 'transparent',
                          cursor: 'pointer',
                          fontSize: '12px'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => toggleNominee(n.id)}
                          />
                          <span style={{ fontWeight: 600, color: 'var(--color-primary-black)' }}>{n.name}</span>
                          <span style={{ color: 'var(--color-secondary-text)', fontSize: '11px' }}>({n.relationship})</span>
                        </div>
                        <span style={{ fontSize: '11px', color: 'var(--color-secondary-text)' }}>{n.email}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              <div style={{
                display: 'flex',
                justifyContent: 'flex-end',
                gap: '8px',
                borderTop: '1px solid var(--color-border)',
                paddingTop: '14px'
              }}>
                <button
                  type="button"
                  onClick={closeModal}
                  className="btn-secondary"
                  style={{ fontSize: '12px' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary"
                  style={{ fontSize: '12px' }}
                >
                  <CheckCircle2 size={14} />
                  <span>{editingGroupId ? 'Update Group' : 'Save New Group'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
