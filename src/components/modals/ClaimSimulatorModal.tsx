import React, { useState } from 'react';
import { 
  X, 
  FileText, 
  UploadCloud, 
  ShieldCheck, 
  CheckCircle2, 
  HelpCircle,
  ArrowRight
} from 'lucide-react';
import { ContinuityClaim, ClaimStatus } from '../../types';
import { Badge } from '../common/Badge';

interface ClaimSimulatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitClaim: (claim: ContinuityClaim) => void;
  existingClaims: ContinuityClaim[];
  onUpdateClaimStatus: (claimId: string, status: ClaimStatus, note?: string) => void;
}

export const ClaimSimulatorModal: React.FC<ClaimSimulatorModalProps> = ({
  isOpen,
  onClose,
  onSubmitClaim,
  existingClaims,
  onUpdateClaimStatus
}) => {
  const [mode, setMode] = useState<'submit' | 'inspect'>('submit');
  const [claimantName, setClaimantName] = useState('Riya Ambade');
  const [claimantEmail, setClaimantEmail] = useState('riya.ambade@example.com');
  const [relationship, setRelationship] = useState('Sister');
  const [mockFileName, setMockFileName] = useState('simulated_continuity_petition_affidavit.pdf');
  const [selectedClaimId, setSelectedClaimId] = useState<string>(existingClaims[0]?.id || '');

  if (!isOpen) return null;

  const handleCreateClaim = (e: React.FormEvent) => {
    e.preventDefault();
    const newClaim: ContinuityClaim = {
      id: `clm-${Date.now().toString().slice(-4)}`,
      claimantName,
      claimantEmail,
      relationship,
      submissionDate: 'Just now',
      mockDocumentName: mockFileName,
      status: 'under_review',
      reviewNotes: 'Initial document submission received. Waiting for verification.'
    };
    onSubmitClaim(newClaim);
    setSelectedClaimId(newClaim.id);
    setMode('inspect');
  };

  const currentClaim = existingClaims.find(c => c.id === selectedClaimId) || existingClaims[0];

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
        maxWidth: '640px',
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
              <span>Continuity Activation Protocol</span>
            </div>
            <h2 style={{ fontSize: '17px', fontWeight: 700, margin: 0, color: 'var(--color-primary-black)' }}>
              Simulate Claim Submission & Verification
            </h2>
          </div>
          <button onClick={onClose} className="btn-ghost" style={{ padding: '6px' }}>
            <X size={16} />
          </button>
        </div>

        {/* Tab Toggle */}
        <div style={{
          padding: '8px 24px',
          backgroundColor: 'var(--color-off-white)',
          borderBottom: '1px solid var(--color-border)',
          display: 'flex',
          gap: '6px'
        }}>
          <button
            onClick={() => setMode('submit')}
            style={{
              padding: '5px 12px',
              borderRadius: 'var(--radius-xs)',
              fontSize: '12px',
              fontWeight: 600,
              backgroundColor: mode === 'submit' ? 'var(--color-white)' : 'transparent',
              color: 'var(--color-primary-black)',
              border: mode === 'submit' ? '1px solid var(--color-border)' : '1px solid transparent',
              boxShadow: mode === 'submit' ? 'var(--shadow-xs)' : 'none'
            }}
          >
            1. Submit New Claim
          </button>
          <button
            onClick={() => setMode('inspect')}
            style={{
              padding: '5px 12px',
              borderRadius: 'var(--radius-xs)',
              fontSize: '12px',
              fontWeight: 600,
              backgroundColor: mode === 'inspect' ? 'var(--color-white)' : 'transparent',
              color: 'var(--color-primary-black)',
              border: mode === 'inspect' ? '1px solid var(--color-border)' : '1px solid transparent',
              boxShadow: mode === 'inspect' ? 'var(--shadow-xs)' : 'none'
            }}
          >
            2. Review State Machine ({existingClaims.length} Claims)
          </button>
        </div>

        {/* Body Content */}
        <div style={{ padding: '24px', overflowY: 'auto', flex: 1 }}>
          {mode === 'submit' ? (
            <form onSubmit={handleCreateClaim}>
              <div style={{
                padding: '12px 14px',
                backgroundColor: 'var(--color-pale-blue-grey)',
                borderRadius: 'var(--radius-md)',
                marginBottom: '16px',
                display: 'flex',
                gap: '10px'
              }}>
                <ShieldCheck size={16} style={{ color: 'var(--color-primary-black)', flexShrink: 0, marginTop: '2px' }} />
                <div style={{ fontSize: '11.5px', color: 'var(--color-secondary-text)', lineHeight: 1.45 }}>
                  This simulates how a designated family member or legal representative initiates the claim process if the vault owner becomes incapacitated.
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '11.5px', fontWeight: 600, marginBottom: '5px' }}>
                    Claimant Legal Name
                  </label>
                  <input
                    type="text"
                    required
                    value={claimantName}
                    onChange={(e) => setClaimantName(e.target.value)}
                    style={{ width: '100%' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '11.5px', fontWeight: 600, marginBottom: '5px' }}>
                    Claimant Contact Email
                  </label>
                  <input
                    type="email"
                    required
                    value={claimantEmail}
                    onChange={(e) => setClaimantEmail(e.target.value)}
                    style={{ width: '100%' }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: '14px' }}>
                <label style={{ display: 'block', fontSize: '11.5px', fontWeight: 600, marginBottom: '5px' }}>
                  Relationship to Vault Owner
                </label>
                <select
                  value={relationship}
                  onChange={(e) => setRelationship(e.target.value)}
                  style={{ width: '100%' }}
                >
                  <option value="Sister">Sister</option>
                  <option value="Spouse / Partner">Spouse / Partner</option>
                  <option value="Parent">Parent</option>
                  <option value="Legal Executor">Legal Executor / Attorney</option>
                  <option value="Designated Delegate">Designated Delegate</option>
                </select>
              </div>

              <div style={{ marginBottom: '18px' }}>
                <label style={{ display: 'block', fontSize: '11.5px', fontWeight: 600, marginBottom: '5px' }}>
                  Mock Verification Document
                </label>
                <div style={{
                  border: '1px dashed var(--color-border)',
                  borderRadius: 'var(--radius-md)',
                  padding: '16px',
                  textAlign: 'center',
                  backgroundColor: 'var(--color-off-white)'
                }}>
                  <UploadCloud size={20} style={{ color: 'var(--color-blue-grey)', margin: '0 auto 6px' }} />
                  <div style={{ fontSize: '12.5px', fontWeight: 600, color: 'var(--color-primary-black)' }}>
                    {mockFileName}
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--color-secondary-text)', marginTop: '2px' }}>
                    Simulated municipal certificate or legal probate documentation
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                <button
                  type="submit"
                  className="btn-primary"
                  style={{ fontSize: '12.5px' }}
                >
                  <span>Submit Claim for Review</span>
                  <ArrowRight size={13} />
                </button>
              </div>
            </form>
          ) : (
            <div>
              {existingClaims.length > 1 && (
                <div style={{ marginBottom: '14px' }}>
                  <label style={{ display: 'block', fontSize: '11.5px', fontWeight: 600, marginBottom: '5px' }}>
                    Select Claim to Inspect
                  </label>
                  <select
                    value={selectedClaimId}
                    onChange={(e) => setSelectedClaimId(e.target.value)}
                    style={{ width: '100%' }}
                  >
                    {existingClaims.map(c => (
                      <option key={c.id} value={c.id}>
                        [{c.status.toUpperCase()}] {c.claimantName} ({c.relationship}) — Submitted {c.submissionDate}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {currentClaim ? (
                <div>
                  {/* Claim Status Card */}
                  <div style={{
                    border: '1px solid var(--color-border)',
                    borderRadius: 'var(--radius-md)',
                    padding: '16px',
                    backgroundColor: 'var(--color-off-white)',
                    marginBottom: '18px'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                      <span style={{ fontSize: '14px', fontWeight: 700, color: 'var(--color-primary-black)' }}>
                        Claim #{currentClaim.id}
                      </span>
                      <Badge
                        variant={
                          currentClaim.status === 'approved' ? 'verified' :
                          currentClaim.status === 'under_review' ? 'under_review' :
                          currentClaim.status === 'needs_info' ? 'neutral' : 'locked'
                        }
                        size="sm"
                      >
                        {currentClaim.status.replace('_', ' ').toUpperCase()}
                      </Badge>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px', fontSize: '12px' }}>
                      <div>
                        <span style={{ color: 'var(--color-secondary-text)' }}>Claimant:</span>{' '}
                        <strong>{currentClaim.claimantName}</strong>
                      </div>
                      <div>
                        <span style={{ color: 'var(--color-secondary-text)' }}>Email:</span>{' '}
                        <strong>{currentClaim.claimantEmail}</strong>
                      </div>
                      <div>
                        <span style={{ color: 'var(--color-secondary-text)' }}>Relationship:</span>{' '}
                        <strong>{currentClaim.relationship}</strong>
                      </div>
                      <div>
                        <span style={{ color: 'var(--color-secondary-text)' }}>Document:</span>{' '}
                        <code style={{ fontFamily: 'var(--font-mono)' }}>{currentClaim.mockDocumentName}</code>
                      </div>
                    </div>
                  </div>

                  {/* Simulated Review Actions */}
                  <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '14px' }}>
                    <div style={{ fontSize: '12.5px', fontWeight: 600, marginBottom: '8px' }}>
                      Simulate Verification Adjudication
                    </div>
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                      <button
                        onClick={() => onUpdateClaimStatus(currentClaim.id, 'approved', 'Document verified against municipal registry.')}
                        className="btn-secondary"
                        style={{ color: '#16A34A', borderColor: '#CDE8D0', fontSize: '11.5px', padding: '6px 12px' }}
                      >
                        <CheckCircle2 size={13} />
                        <span>Simulate Approval</span>
                      </button>

                      <button
                        onClick={() => onUpdateClaimStatus(currentClaim.id, 'needs_info', 'Requested certified notary copy of certificate.')}
                        className="btn-secondary"
                        style={{ fontSize: '11.5px', padding: '6px 12px' }}
                      >
                        <HelpCircle size={13} />
                        <span>Request Info</span>
                      </button>

                      <button
                        onClick={() => onUpdateClaimStatus(currentClaim.id, 'rejected', 'Verification failed: invalid certificate signature.')}
                        className="btn-ghost"
                        style={{ color: '#DC2626', fontSize: '11.5px' }}
                      >
                        <X size={13} />
                        <span>Reject Claim</span>
                      </button>
                    </div>

                    <p style={{ fontSize: '11px', color: 'var(--color-secondary-text)', marginTop: '10px' }}>
                      Approving a claim activates continuity access <em>only</em> for categories specifically assigned to this nominee.
                    </p>
                  </div>
                </div>
              ) : (
                <p style={{ fontSize: '13px', color: 'var(--color-secondary-text)' }}>No claims submitted yet.</p>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{
          padding: '12px 24px',
          borderTop: '1px solid var(--color-border)',
          display: 'flex',
          justifyContent: 'flex-end',
          backgroundColor: 'var(--color-off-white)'
        }}>
          <button
            type="button"
            onClick={onClose}
            className="btn-secondary"
            style={{ fontSize: '12px' }}
          >
            Close Simulator
          </button>
        </div>
      </div>
    </div>
  );
};
