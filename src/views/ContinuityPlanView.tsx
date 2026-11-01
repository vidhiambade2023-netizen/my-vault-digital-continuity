import React from 'react';
import { 
  Clock, 
  ShieldCheck, 
  FileCheck, 
  KeyRound, 
  ArrowRight,
  HelpCircle,
  Lock,
  CheckCircle2
} from 'lucide-react';
import { ContinuityClaim } from '../../types';
import { Badge } from '../components/common/Badge';

interface ContinuityPlanViewProps {
  claims: ContinuityClaim[];
  onOpenClaimSimulator: () => void;
}

export const ContinuityPlanView: React.FC<ContinuityPlanViewProps> = ({
  claims,
  onOpenClaimSimulator
}) => {
  const steps = [
    {
      num: '01',
      title: 'Formal Petition Submission',
      desc: 'A verified nominee submits a simulated continuity activation petition alongside mock demonstration documents (e.g. simulated power-of-attorney or executor affidavit).'
    },
    {
      num: '02',
      title: 'Safety Challenge & Grace Period',
      desc: 'The vault dispatches non-intrusive safety notifications to your primary active devices. If unacknowledged within 14 days, the verification advances.'
    },
    {
      num: '03',
      title: 'Adjudication Review (Prototype Simulation)',
      desc: 'Simulated multi-stakeholder governance review evaluates the petition against configured vault rules without querying real municipal or legal registries.'
    },
    {
      num: '04',
      title: 'Selective Scope Release',
      desc: 'Access tokens and export archives are generated exclusively for categories assigned to that specific nominee. Private chats remain sealed forever.'
    }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header Banner */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        gap: '20px'
      }}>
        <div style={{ maxWidth: '640px' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '11px',
            fontWeight: 500,
            color: 'var(--color-secondary-text)',
            marginBottom: '6px'
          }}>
            <ShieldCheck size={14} style={{ color: 'var(--color-primary-black)' }} />
            <span>Post-Life & Incapacitation Protocol (Educational Simulation)</span>
          </div>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '32px', fontWeight: 400, margin: '0 0 6px', color: 'var(--color-primary-black)', letterSpacing: '-0.02em' }}>
            Continuity plan
          </h1>
          <p style={{ fontSize: '13.5px', color: 'var(--color-secondary-text)', margin: 0, lineHeight: 1.55 }}>
            A structured, multi-stage protocol governing how and when your trusted nominees can request access in the future.
          </p>
        </div>

        <button
          onClick={onOpenClaimSimulator}
          className="btn-primary"
          style={{ flexShrink: 0, marginTop: '4px' }}
        >
          <FileCheck size={15} />
          <span>Launch Claim Simulator</span>
        </button>
      </div>

      {/* 4-Step Stepper Cards (Equal Heights, No Clumsy Floating Circles) */}
      <div style={{
        backgroundColor: 'var(--color-white)',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-lg)',
        padding: '24px'
      }}>
        <div style={{
          fontSize: '11.5px',
          fontWeight: 600,
          textTransform: 'uppercase',
          letterSpacing: '0.07em',
          color: 'var(--color-secondary-text)',
          marginBottom: '16px'
        }}>
          Protocol Progression Stepper
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '16px',
          alignItems: 'stretch'
        }}>
          {steps.map((st, idx) => (
            <div
              key={st.num}
              style={{
                backgroundColor: 'var(--color-off-white)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-md)',
                padding: '18px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                height: '100%',
                position: 'relative'
              }}
            >
              <div>
                <div style={{
                  fontSize: '22px',
                  fontWeight: 800,
                  color: 'var(--color-blue-grey)',
                  marginBottom: '8px',
                  lineHeight: 1
                }}>
                  {st.num}
                </div>
                <h3 style={{ fontSize: '13.5px', fontWeight: 700, color: 'var(--color-primary-black)', marginBottom: '6px' }}>
                  {st.title}
                </h3>
                <p style={{ fontSize: '12px', color: 'var(--color-secondary-text)', lineHeight: 1.45, margin: 0 }}>
                  {st.desc}
                </p>
              </div>

              <div style={{
                marginTop: '14px',
                paddingTop: '10px',
                borderTop: '1px solid var(--color-border-subtle)',
                fontSize: '11px',
                fontWeight: 600,
                color: 'var(--color-secondary-text)',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}>
                <span>Stage {idx + 1} of 4</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Submitted Claims & State Machine Tracker */}
      <div style={{
        backgroundColor: 'var(--color-white)',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-lg)',
        padding: '24px'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div>
            <h3 style={{ fontSize: '15px', fontWeight: 700, margin: 0, color: 'var(--color-primary-black)' }}>
              Active Continuity Claims ({claims.length})
            </h3>
            <p style={{ fontSize: '12px', color: 'var(--color-secondary-text)', margin: '2px 0 0' }}>
              Claims submitted by delegates requiring legal verification
            </p>
          </div>

          <button
            onClick={onOpenClaimSimulator}
            style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-primary-black)' }}
          >
            Open simulator controls &rarr;
          </button>
        </div>

        {claims.length > 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {claims.map(claim => (
              <div
                key={claim.id}
                style={{
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-md)',
                  padding: '14px 16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  backgroundColor: 'var(--color-white)'
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '13.5px', fontWeight: 700, color: 'var(--color-primary-black)' }}>
                      Claim #{claim.id} — {claim.claimantName}
                    </span>
                    <Badge
                      variant={
                        claim.status === 'approved' ? 'verified' :
                        claim.status === 'under_review' ? 'under_review' :
                        claim.status === 'needs_info' ? 'neutral' : 'locked'
                      }
                      size="sm"
                    >
                      {claim.status.replace('_', ' ').toUpperCase()}
                    </Badge>
                  </div>
                  <div style={{ fontSize: '11.5px', color: 'var(--color-secondary-text)', marginTop: '3px' }}>
                    {claim.relationship} • Submitted {claim.submissionDate} • Document: <code>{claim.mockDocumentName}</code>
                  </div>
                  <div style={{ fontSize: '11.5px', color: 'var(--color-primary-black)', marginTop: '4px' }}>
                    Review Note: <em>{claim.reviewNotes}</em>
                  </div>
                </div>

                <button
                  onClick={onOpenClaimSimulator}
                  className="btn-secondary"
                  style={{ fontSize: '12px', padding: '5px 12px' }}
                >
                  Inspect State
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p style={{ fontSize: '13px', color: 'var(--color-secondary-text)', margin: 0 }}>
            No claims have been submitted. Click "Launch Claim Simulator" to test this workflow.
          </p>
        )}
      </div>
    </div>
  );
};
