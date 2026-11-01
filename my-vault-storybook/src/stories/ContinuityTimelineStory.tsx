import React, { useState } from 'react';
import { Clock, ShieldCheck, FileCheck, CheckCircle2, Play, RefreshCw, AlertCircle } from 'lucide-react';
import { Badge } from '@app/components/common/Badge';

export const ContinuityTimelineStory: React.FC = () => {
  const [currentStage, setCurrentStage] = useState<number>(2); // 1 to 5
  const [isSimulating, setIsSimulating] = useState(false);

  const stages = [
    {
      num: '01',
      title: 'Nominee Invitation Dispatched',
      desc: 'Owner sends cryptographic handshake invitation. The nominee receives an email challenge with no visibility into vault assets.',
      statusText: 'Completed'
    },
    {
      num: '02',
      title: 'Identity Handshake & Verification',
      desc: 'Nominee verifies contact details and registers public key pair. Verification alone grants zero access during owner lifetime.',
      statusText: 'Verified'
    },
    {
      num: '03',
      title: 'Formal Continuity Claim Submitted',
      desc: 'Upon owner passing or incapacitation, nominee submits claim accompanied by certified death certificate or legal affidavit.',
      statusText: 'Standby'
    },
    {
      num: '04',
      title: '14-Day Owner Challenge & Grace Period',
      desc: 'Automated high-priority multi-channel alerts sent to owner devices. If owner dismisses alert, the claim is permanently aborted.',
      statusText: 'Pending Claim'
    },
    {
      num: '05',
      title: 'Selective Scope Release',
      desc: 'Decryption keys for pre-assigned categories only are reconstructed. Inviolable zero-knowledge items remain permanently sealed.',
      statusText: 'Locked'
    }
  ];

  const advanceStage = () => {
    setIsSimulating(true);
    setTimeout(() => {
      setCurrentStage(prev => (prev < 5 ? prev + 1 : 1));
      setIsSimulating(false);
    }, 400);
  };

  const resetStage = () => {
    setCurrentStage(2);
  };

  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '26px', fontWeight: 400, color: '#0B0B0D', marginBottom: '6px' }}>
          Continuity Protocol Timeline
        </h2>
        <p style={{ fontSize: '13px', color: '#737680' }}>
          5-stage sequential governance activation protocol governing how and when nominees can request access.
        </p>
      </div>

      {/* Simulator Control Card */}
      <div style={{
        backgroundColor: '#FFFFFF',
        border: '1px solid #E1E2E5',
        borderRadius: '8px',
        padding: '18px 20px',
        marginBottom: '24px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '12px'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '14px', fontWeight: 600, color: '#0B0B0D' }}>Protocol Simulation Engine</span>
            <Badge variant="active" size="sm">Stage {currentStage} of 5</Badge>
          </div>
          <p style={{ fontSize: '12px', color: '#737680', margin: '2px 0 0' }}>
            Advance the multi-stage activation workflow to preview nominee state transitions.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={resetStage}
            style={{
              padding: '6px 12px',
              borderRadius: '6px',
              border: '1px solid #E1E2E5',
              backgroundColor: '#FFFFFF',
              color: '#0B0B0D',
              fontSize: '12px',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <RefreshCw size={12} />
            <span>Reset (Default)</span>
          </button>
          <button
            onClick={advanceStage}
            disabled={isSimulating}
            style={{
              padding: '6px 14px',
              borderRadius: '6px',
              border: 'none',
              backgroundColor: '#0B0B0D',
              color: '#FFFFFF',
              fontSize: '12px',
              fontWeight: 500,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <Play size={12} />
            <span>{currentStage < 5 ? `Advance to Stage ${currentStage + 1}` : 'Restart Flow'}</span>
          </button>
        </div>
      </div>

      {/* 5-Step Stepper Cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {stages.map((stage, idx) => {
          const stepNumber = idx + 1;
          const isDone = stepNumber < currentStage;
          const isCurrent = stepNumber === currentStage;
          const isFuture = stepNumber > currentStage;

          return (
            <div
              key={stage.num}
              style={{
                backgroundColor: isCurrent ? '#FFFFFF' : '#F8F8F6',
                border: isCurrent ? '1.5px solid #0B0B0D' : '1px solid #E1E2E5',
                borderRadius: '8px',
                padding: '16px 20px',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '16px',
                opacity: isFuture ? 0.65 : 1,
                boxShadow: isCurrent ? '0 2px 8px rgba(0,0,0,0.06)' : 'none',
                transition: 'all 0.2s ease'
              }}
            >
              {/* Step indicator */}
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                backgroundColor: isDone ? '#EDF7EE' : isCurrent ? '#0B0B0D' : '#E7EAF0',
                color: isDone ? '#16A34A' : isCurrent ? '#FFFFFF' : '#737680',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '12px',
                fontWeight: 700,
                flexShrink: 0,
                marginTop: '2px'
              }}>
                {isDone ? <CheckCircle2 size={16} /> : stage.num}
              </div>

              {/* Step content */}
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <h3 style={{ fontSize: '14px', fontWeight: 600, color: '#0B0B0D', margin: 0 }}>
                    {stage.title}
                  </h3>
                  <Badge
                    variant={isDone ? 'verified' : isCurrent ? 'active' : 'neutral'}
                    size="sm"
                  >
                    {isDone ? 'Completed' : isCurrent ? 'Current Phase' : 'Upcoming'}
                  </Badge>
                </div>

                <p style={{ fontSize: '12.5px', color: '#737680', margin: 0, lineHeight: 1.5 }}>
                  {stage.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Critical Inviolable Safeguard Notice */}
      <div style={{
        marginTop: '24px',
        backgroundColor: '#FFF7F7',
        border: '1px solid #FEE2E2',
        borderRadius: '8px',
        padding: '16px 20px',
        display: 'flex',
        alignItems: 'center',
        gap: '12px'
      }}>
        <AlertCircle size={18} style={{ color: '#DC2626', flexShrink: 0 }} />
        <p style={{ fontSize: '12px', color: '#991B1B', margin: 0, lineHeight: 1.5 }}>
          <strong>Critical Sovereign Rule:</strong> Nominee email verification confirms identity readiness only. Under no circumstances can a nominee initiate data extraction or file preview while owner heartbeat checks remain active.
        </p>
      </div>
    </div>
  );
};

