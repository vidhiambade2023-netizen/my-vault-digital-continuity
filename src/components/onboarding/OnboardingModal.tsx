import React, { useState } from 'react';
import { 
  X, 
  ArrowRight, 
  ArrowLeft, 
  ShieldCheck, 
  Link2, 
  Users, 
  Lock, 
  Clock, 
  Sparkles, 
  CheckCircle2,
  HelpCircle,
  Lightbulb
} from 'lucide-react';

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => void;
}

export const OnboardingModal: React.FC<OnboardingModalProps> = ({
  isOpen,
  onClose,
  onComplete
}) => {
  const [currentStep, setCurrentStep] = useState(0);

  if (!isOpen) return null;

  const steps = [
    {
      stepNumber: '01',
      tag: 'WELCOME & CONCEPT',
      title: 'Digital Continuity, Not Digital Wills',
      subtitle: 'A quiet, intentional approach to organizing your lifetime digital footprint.',
      content: 'Most digital legacy tools treat digital assets like static property or legal inheritances. My Vault focuses on human experience and service design: organizing fragmented cloud accounts and communicating clear, selective access preferences to trusted people for a future time when you can no longer manage them yourself.',
      tipTitle: 'Key Design Principle',
      tip: 'My Vault catalogs account references and scope categories—it never collects or stores master account passwords.',
      icon: <Sparkles size={24} style={{ color: 'var(--color-primary-black)' }} />
    },
    {
      stepNumber: '02',
      tag: 'ARCHITECTURAL INVARIANT',
      title: 'Connecting Services vs Nominee Access',
      subtitle: 'Service connection and nominee permissions are strictly decoupled concepts.',
      content: 'When you link Google Workspace, Apple iCloud, or GitHub, you are solely registering metadata into your personal vault. Connecting an account does NOT grant any access to nominees. Nominees only receive access to specific categories after post-continuity verification.',
      tipTitle: 'Zero Lifetime Access Rule',
      tip: 'During your lifetime, nominees have 0% visibility into your connected files or folders. The vault operates in zero-knowledge mode.',
      icon: <Link2 size={24} style={{ color: 'var(--color-primary-black)' }} />
    },
    {
      stepNumber: '03',
      tag: 'DELEGATION ARCHITECTURE',
      title: 'Appoint Your Trusted Circle',
      subtitle: 'Designate specific individuals and assign tailored categories.',
      content: 'Designate siblings, partners, or trusted executors with custom relationships. You can assign different categories to different nominees (e.g. photos to family, design archives to work partners).',
      tipTitle: 'Verification Challenge Tip',
      tip: 'Nominees complete an initial email verification code to confirm contact details, but they stay in "Pending continuity activation" until actual protocol triggers.',
      icon: <Users size={24} style={{ color: 'var(--color-primary-black)' }} />
    },
    {
      stepNumber: '04',
      tag: 'PRIVACY INVARIANTS',
      title: 'Inviolable Lifetime Exclusions',
      subtitle: 'Personal conversations and master passwords remain forever sealed.',
      content: 'Research shows users want to share memories and practical documents, but never personal communications. My Vault enforces default cryptographic locks on Instagram DMs, Gmail threads, iMessage history, and password managers.',
      tipTitle: 'Inviolable Protection',
      tip: 'Private chat categories are locked by default and cannot be accidentally delegated or exported.',
      icon: <Lock size={24} style={{ color: '#DC2626' }} />
    },
    {
      stepNumber: '05',
      tag: 'ACTIVATION PROTOCOL',
      title: 'Four-Stage Continuity Protocol',
      subtitle: '14-day safety grace periods and proof-of-claim verification.',
      content: 'Future access is governed by a 4-stage protocol: 1) Petition Submission, 2) Device Safety Ping & 14-day grace period, 3) Adjudication review, and 4) Selective release of designated scopes.',
      tipTitle: 'Interactive Demo Available',
      tip: 'You can test the entire nominee petition process at any time using the simulated Claim Tester from your Topbar or Continuity Plan.',
      icon: <Clock size={24} style={{ color: 'var(--color-primary-black)' }} />
    }
  ];

  const current = steps[currentStep];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
      onClose();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(11, 11, 13, 0.55)',
      backdropFilter: 'blur(6px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '20px'
    }}>
      <div style={{
        backgroundColor: 'var(--color-white)',
        borderRadius: '16px',
        border: '1px solid var(--color-border)',
        boxShadow: 'var(--shadow-modal)',
        width: '100%',
        maxWidth: '580px',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        animation: 'fadeIn 0.2s cubic-bezier(0.16, 1, 0.3, 1)'
      }}>
        {/* Top Progress Bar & Header */}
        <div style={{
          padding: '20px 28px 16px',
          borderBottom: '1px solid var(--color-border-subtle)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{
              fontSize: '11px',
              fontWeight: 600,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'var(--color-secondary-text)'
            }}>
              First-Time User Walkthrough • Step {currentStep + 1} of {steps.length}
            </span>
          </div>

          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--color-secondary-text)',
              cursor: 'pointer',
              padding: '4px',
              borderRadius: '6px'
            }}
            title="Skip tour"
          >
            <X size={18} />
          </button>
        </div>

        {/* Step Visual Indicator Bar */}
        <div style={{ display: 'flex', height: '3px', backgroundColor: 'var(--color-pale-blue-grey)' }}>
          {steps.map((_, i) => (
            <div
              key={i}
              style={{
                flex: 1,
                backgroundColor: i <= currentStep ? 'var(--color-primary-black)' : 'transparent',
                transition: 'background-color 200ms ease'
              }}
            />
          ))}
        </div>

        {/* Step Body */}
        <div style={{ padding: '28px 28px 24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '10.5px',
              fontWeight: 600,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'var(--color-secondary-text)',
              marginBottom: '6px'
            }}>
              <span>{current.tag}</span>
            </div>

            <h2 style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '24px',
              fontWeight: 400,
              color: 'var(--color-primary-black)',
              letterSpacing: '-0.02em',
              margin: '0 0 6px',
              lineHeight: 1.25
            }}>
              {current.title}
            </h2>

            <p style={{
              fontSize: '13px',
              fontWeight: 500,
              color: 'var(--color-primary-black)',
              margin: '0 0 10px',
              lineHeight: 1.45
            }}>
              {current.subtitle}
            </p>

            <p style={{
              fontSize: '13px',
              color: 'var(--color-secondary-text)',
              lineHeight: 1.6,
              margin: 0
            }}>
              {current.content}
            </p>
          </div>

          {/* Educational Pro-Tip Box */}
          <div style={{
            backgroundColor: 'var(--color-off-white)',
            border: '1px solid var(--color-border)',
            borderRadius: '10px',
            padding: '14px 16px',
            display: 'flex',
            gap: '12px',
            alignItems: 'flex-start'
          }}>
            <div style={{
              width: '28px',
              height: '28px',
              borderRadius: '6px',
              backgroundColor: 'var(--color-pale-blue-grey)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              <Lightbulb size={16} style={{ color: 'var(--color-primary-black)' }} />
            </div>
            <div>
              <div style={{ fontSize: '11.5px', fontWeight: 600, color: 'var(--color-primary-black)', marginBottom: '2px' }}>
                {current.tipTitle}
              </div>
              <div style={{ fontSize: '12px', color: 'var(--color-secondary-text)', lineHeight: 1.5 }}>
                {current.tip}
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div style={{
          padding: '16px 28px 20px',
          borderTop: '1px solid var(--color-border-subtle)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: 'var(--color-white)'
        }}>
          <button
            onClick={() => { onComplete(); onClose(); }}
            style={{
              fontSize: '12px',
              color: 'var(--color-secondary-text)',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '6px 0'
            }}
          >
            Skip walkthrough
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {currentStep > 0 && (
              <button
                onClick={handlePrev}
                className="btn-secondary"
                style={{ fontSize: '12px', padding: '6px 12px' }}
              >
                <ArrowLeft size={13} />
                <span>Previous</span>
              </button>
            )}

            <button
              onClick={handleNext}
              className="btn-primary"
              style={{ fontSize: '12.5px', padding: '6px 16px' }}
            >
              <span>{currentStep === steps.length - 1 ? 'Finish & Enter Vault' : 'Next Step'}</span>
              <ArrowRight size={13} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

