import React, { useState } from 'react';

interface Screen07Props {
  onNext: (nomineeData: { name: string; email: string; relationship: string }) => void;
  onPrev: () => void;
  showAnnotations: boolean;
}

export const Screen07AddNominee: React.FC<Screen07Props> = ({
  onNext,
  onPrev,
  showAnnotations
}) => {
  const [name, setName] = useState('Priya Sharma');
  const [email, setEmail] = useState('priya.sharma@example.com');
  const [relationship, setRelationship] = useState('Sibling / Next of Kin');
  const [notes, setNotes] = useState('Designated for family photo archives and creative projects.');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext({ name, email, relationship });
  };

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      {/* Top Header Placeholder */}
      <header style={{
        height: '56px',
        borderBottom: '1px solid var(--wf-border)',
        padding: '0 32px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'var(--wf-surface)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button onClick={onPrev} className="wf-btn wf-btn-outline" style={{ padding: '4px 8px', fontSize: '11px' }}>
            ← Groups
          </button>
          <span style={{ fontWeight: 600, fontSize: '15px' }}>
            Add Trusted Nominee
          </span>
          <span className="wf-badge">WIREFRAME 07 / 09</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button onClick={() => onNext({ name, email, relationship })} className="wf-btn wf-btn-black" style={{ fontSize: '12px', padding: '5px 12px' }}>
            Continue to Assign Access →
          </button>
        </div>
      </header>

      {/* Main Body */}
      <div style={{ flex: 1, padding: '32px 40px', backgroundColor: 'var(--wf-surface-subtle)' }}>
        <div style={{ maxWidth: '680px', margin: '0 auto' }}>
          <div className="wf-box" style={{ padding: '24px' }}>
            <div style={{ marginBottom: '20px' }}>
              <div style={{ display: 'inline-block', marginBottom: '8px' }}>
                <span className="wf-badge active">[ STEP 1 OF 2: NOMINEE IDENTITY ]</span>
              </div>
              <h2 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '6px' }}>
                Designate a Trusted Person
              </h2>
              <p style={{ fontSize: '13px', color: 'var(--wf-text-muted)', lineHeight: 1.5 }}>
                Provide contact details for the person you wish to designate as an authorized nominee. An email verification challenge will be sent to confirm their contact information.
              </p>
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 500, marginBottom: '5px' }}>
                  Full Legal Name *
                </label>
                <input
                  type="text"
                  required
                  className="wf-input"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Priya Sharma"
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 500, marginBottom: '5px' }}>
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  className="wf-input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. priya.sharma@example.com"
                />
                <span style={{ fontSize: '11px', color: 'var(--wf-text-muted)', marginTop: '4px', display: 'block' }}>
                  Used solely for identity verification tokens and emergency continuity notices.
                </span>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 500, marginBottom: '5px' }}>
                  Relationship to Owner *
                </label>
                <select
                  className="wf-input"
                  value={relationship}
                  onChange={(e) => setRelationship(e.target.value)}
                >
                  <option value="Sibling / Next of Kin">Sibling / Next of Kin</option>
                  <option value="Spouse / Partner">Spouse / Partner</option>
                  <option value="Parent / Mother">Parent / Mother</option>
                  <option value="Child / Heir">Child / Heir</option>
                  <option value="Legal Representative / Executor">Legal Representative / Executor</option>
                  <option value="Close Friend / Collaborator">Close Friend / Collaborator</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 500, marginBottom: '5px' }}>
                  Continuity Instructions / Private Note (Optional)
                </label>
                <textarea
                  className="wf-input"
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Optional guidance for this nominee during the continuity review period..."
                />
              </div>

              {/* Security Boundary Notice */}
              <div style={{
                backgroundColor: 'var(--wf-surface-muted)',
                border: '1px solid var(--wf-border)',
                padding: '12px 14px',
                borderRadius: '4px',
                fontSize: '12px',
                color: 'var(--wf-text-main)',
                lineHeight: 1.45
              }}>
                <div style={{ fontWeight: 600, marginBottom: '3px' }}>
                  🔒 Zero-Knowledge Security Principle:
                </div>
                <div>
                  Email verification confirms communication only. Nominee verification alone will <strong>never</strong> activate account access or reveal encryption keys. All data remains sealed until verified continuity activation.
                </div>
              </div>

              {/* Form Buttons */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
                <button type="button" onClick={onPrev} className="wf-btn wf-btn-outline">
                  ← Back to Groups
                </button>
                <button type="submit" className="wf-btn wf-btn-black">
                  Continue to Step 08: Assign Access →
                </button>
              </div>
            </form>
          </div>

          {showAnnotations && (
            <div className="wf-annotation">
              <strong>[UX NOTE - SCREEN 07]:</strong> Early user tests showed users worried that inviting a nominee might send a morbid notification or give immediate account access. The interface explicitly clarifies that email verification is strictly a dormant handshake.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

