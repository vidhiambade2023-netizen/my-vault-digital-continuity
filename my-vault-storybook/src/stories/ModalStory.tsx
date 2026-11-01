import React, { useState } from 'react';
import { ServiceConnectorModal } from '@app/components/modals/ServiceConnectorModal';
import { AddNomineeModal } from '@app/components/modals/AddNomineeModal';
import { AuthModal } from '@app/components/auth/AuthModal';
import { OnboardingModal } from '@app/components/onboarding/OnboardingModal';
import { ConfirmDialog } from '@app/components/common/ConfirmDialog';
import { INITIAL_SERVICES } from '@app/data/mockData';

export const ModalStory: React.FC = () => {
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [services, setServices] = useState(INITIAL_SERVICES);

  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '26px', fontWeight: 400, color: '#0B0B0D', marginBottom: '6px' }}>
          Modal & Overlay Dialogs
        </h2>
        <p style={{ fontSize: '13px', color: 'var(--color-secondary-text)' }}>
          Accessible, keyboard-navigable overlay modals for provider connection, nominee designation, 2FA challenges, and onboarding tours.
        </p>
      </div>

      {/* Modal Launch Triggers */}
      <div style={{
        backgroundColor: '#FFFFFF',
        border: '1px solid #E1E2E5',
        borderRadius: '8px',
        padding: '32px',
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '16px',
        marginBottom: '32px'
      }}>
        <div style={{ border: '1px solid #E1E2E5', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ fontSize: '14.5px', fontWeight: 600, color: '#0B0B0D', marginBottom: '4px' }}>
            Service Connector Modal
          </h3>
          <p style={{ fontSize: '12px', color: '#737680', marginBottom: '14px', lineHeight: 1.4 }}>
            Simulates OAuth 2.0 authorization, reviews provider scopes, and allows granular category selection.
          </p>
          <button
            onClick={() => setActiveModal('connect')}
            className="btn-primary"
            style={{ fontSize: '12.5px', padding: '6px 14px' }}
          >
            Launch Service Connector Modal
          </button>
        </div>

        <div style={{ border: '1px solid #E1E2E5', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ fontSize: '14.5px', fontWeight: 600, color: '#0B0B0D', marginBottom: '4px' }}>
            Add Trusted Nominee Modal
          </h3>
          <p style={{ fontSize: '12px', color: '#737680', marginBottom: '14px', lineHeight: 1.4 }}>
            Collects nominee full name, email, relationship, and continuity guidance notes.
          </p>
          <button
            onClick={() => setActiveModal('nominee')}
            className="btn-primary"
            style={{ fontSize: '12.5px', padding: '6px 14px' }}
          >
            Launch Add Nominee Modal
          </button>
        </div>

        <div style={{ border: '1px solid #E1E2E5', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ fontSize: '14.5px', fontWeight: 600, color: '#0B0B0D', marginBottom: '4px' }}>
            Two-Factor Auth Modal
          </h3>
          <p style={{ fontSize: '12px', color: '#737680', marginBottom: '14px', lineHeight: 1.4 }}>
            Owner identity challenge verifying 6-digit cryptographic PIN code.
          </p>
          <button
            onClick={() => setActiveModal('auth')}
            className="btn-secondary"
            style={{ fontSize: '12.5px', padding: '6px 14px' }}
          >
            Launch 2FA Challenge Modal
          </button>
        </div>

        <div style={{ border: '1px solid #E1E2E5', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ fontSize: '14.5px', fontWeight: 600, color: '#0B0B0D', marginBottom: '4px' }}>
            Onboarding & Tips Tour
          </h3>
          <p style={{ fontSize: '12px', color: '#737680', marginBottom: '14px', lineHeight: 1.4 }}>
            Five-step interactive walkthrough introducing the core concepts of digital continuity.
          </p>
          <button
            onClick={() => setActiveModal('onboarding')}
            className="btn-secondary"
            style={{ fontSize: '12.5px', padding: '6px 14px' }}
          >
            Launch Onboarding Tips Modal
          </button>
        </div>
      </div>

      {/* Render active modal */}
      {activeModal === 'connect' && (
        <ServiceConnectorModal
          isOpen={true}
          onClose={() => setActiveModal(null)}
          existingServices={services}
          nominees={[]}
          onConnect={(service) => {
            alert(`Connected service ${service.name}`);
            setActiveModal(null);
          }}
        />
      )}

      {activeModal === 'nominee' && (
        <AddNomineeModal
          isOpen={true}
          onClose={() => setActiveModal(null)}
          onSaveNominee={(nominee) => {
            alert(`Created nominee: ${nominee.name}`);
            setActiveModal(null);
          }}
          services={services}
          groups={[]}
        />
      )}

      {activeModal === 'auth' && (
        <AuthModal
          isOpen={true}
          onClose={() => setActiveModal(null)}
          onLoginSuccess={() => {
            alert('Authentication successful!');
            setActiveModal(null);
          }}
        />
      )}

      {activeModal === 'onboarding' && (
        <OnboardingModal
          isOpen={true}
          onClose={() => setActiveModal(null)}
          onComplete={() => setActiveModal(null)}
        />
      )}
    </div>
  );
};
