import React, { useState } from 'react';
import { Search, X, Check, Eye, EyeOff, Lock } from 'lucide-react';

export const InputControlsStory: React.FC = () => {
  const [searchValue, setSearchValue] = useState('');
  const [textValue, setTextValue] = useState('vidhi.ambade@university.edu');
  const [passwordValue, setPasswordValue] = useState('my-sovereign-vault-key-2026');
  const [showPassword, setShowPassword] = useState(false);
  const [checkboxState, setCheckboxState] = useState(true);
  const [selectedRole, setSelectedRole] = useState('Sibling / Next of Kin');

  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '26px', fontWeight: 400, color: '#0B0B0D', marginBottom: '6px' }}>
          Input & Form Controls
        </h2>
        <p style={{ fontSize: '13px', color: 'var(--color-secondary-text)' }}>
          Tactile form elements, search filters with keyboard accelerators, and zero-knowledge privacy locks.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px', marginBottom: '32px' }}>
        {/* Search Input with Accelerator */}
        <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E1E2E5', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ fontSize: '14px', fontWeight: 600, color: '#0B0B0D', marginBottom: '4px' }}>
            Search Input with Accelerator
          </h3>
          <p style={{ fontSize: '12px', color: '#737680', marginBottom: '14px' }}>
            Used across Topbar, Connected Services catalog, and Access Rules matrix.
          </p>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            backgroundColor: '#F8F8F6',
            border: '1px solid #E1E2E5',
            borderRadius: '6px',
            padding: '7px 12px',
            gap: '8px',
            transition: 'border-color 0.15s ease'
          }}>
            <Search size={14} style={{ color: '#737680' }} />
            <input
              type="text"
              placeholder="Search services, nominees, rules... (⌘K)"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              style={{
                border: 'none',
                background: 'transparent',
                outline: 'none',
                fontSize: '12.5px',
                color: '#0B0B0D',
                flex: 1
              }}
            />
            {searchValue ? (
              <button
                onClick={() => setSearchValue('')}
                style={{ border: 'none', background: 'transparent', cursor: 'pointer', padding: 0, color: '#737680' }}
              >
                <X size={14} />
              </button>
            ) : (
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '10px',
                color: '#737680',
                backgroundColor: '#E7EAF0',
                padding: '2px 5px',
                borderRadius: '3px'
              }}>
                ⌘K
              </span>
            )}
          </div>
        </div>

        {/* Standard Text Input */}
        <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E1E2E5', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ fontSize: '14px', fontWeight: 600, color: '#0B0B0D', marginBottom: '4px' }}>
            Text Field (Identity / Email)
          </h3>
          <p style={{ fontSize: '12px', color: '#737680', marginBottom: '14px' }}>
            Owner email, nominee contact details, and provider handle fields.
          </p>

          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 500, color: '#0B0B0D', marginBottom: '4px' }}>
              Owner Sovereign Email *
            </label>
            <input
              type="email"
              value={textValue}
              onChange={(e) => setTextValue(e.target.value)}
              style={{
                width: '100%',
                padding: '8px 12px',
                border: '1px solid #E1E2E5',
                borderRadius: '6px',
                fontSize: '13px',
                color: '#0B0B0D',
                outline: 'none'
              }}
            />
          </div>
        </div>

        {/* Password / Master Key Input */}
        <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E1E2E5', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ fontSize: '14px', fontWeight: 600, color: '#0B0B0D', marginBottom: '4px' }}>
            Password / Key Input with Toggle
          </h3>
          <p style={{ fontSize: '12px', color: '#737680', marginBottom: '14px' }}>
            Masked sensitive input with reveal visibility switch.
          </p>

          <div style={{ position: 'relative' }}>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 500, color: '#0B0B0D', marginBottom: '4px' }}>
              Master Vault Key
            </label>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              border: '1px solid #E1E2E5',
              borderRadius: '6px',
              backgroundColor: '#FFFFFF',
              padding: '0 10px'
            }}>
              <input
                type={showPassword ? 'text' : 'password'}
                value={passwordValue}
                onChange={(e) => setPasswordValue(e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px 0',
                  border: 'none',
                  outline: 'none',
                  fontSize: '13px',
                  fontFamily: showPassword ? 'var(--font-mono)' : 'inherit',
                  color: '#0B0B0D'
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#737680' }}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>
        </div>

        {/* Dropdown Select Control */}
        <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E1E2E5', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ fontSize: '14px', fontWeight: 600, color: '#0B0B0D', marginBottom: '4px' }}>
            Dropdown / Select Picker
          </h3>
          <p style={{ fontSize: '12px', color: '#737680', marginBottom: '14px' }}>
            Relationship pickers and service reassignment controls.
          </p>

          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 500, color: '#0B0B0D', marginBottom: '4px' }}>
              Nominee Relationship
            </label>
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              style={{
                width: '100%',
                padding: '8px 12px',
                border: '1px solid #E1E2E5',
                borderRadius: '6px',
                fontSize: '13px',
                color: '#0B0B0D',
                backgroundColor: '#FFFFFF',
                outline: 'none'
              }}
            >
              <option value="Sibling / Next of Kin">Sibling / Next of Kin</option>
              <option value="Spouse / Partner">Spouse / Partner</option>
              <option value="Parent / Mother">Parent / Mother</option>
              <option value="Child / Heir">Child / Heir</option>
              <option value="Legal Representative / Executor">Legal Representative / Executor</option>
            </select>
          </div>
        </div>
      </div>

      {/* Checkbox States: Standard vs Inviolable Privacy Lock */}
      <section style={{ backgroundColor: '#FFFFFF', border: '1px solid #E1E2E5', borderRadius: '8px', padding: '24px' }}>
        <h3 style={{ fontSize: '14px', fontWeight: 600, color: '#0B0B0D', marginBottom: '4px' }}>
          Checkbox States: Eligible vs Inviolable Lock
        </h3>
        <p style={{ fontSize: '12.5px', color: '#737680', marginBottom: '16px' }}>
          Demonstrates how data categories can be toggled, whereas private communications enforce an immutable lock.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <label style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '10px 14px',
            borderRadius: '6px',
            border: '1px solid #E1E2E5',
            backgroundColor: checkboxState ? '#F8F8F6' : '#FFFFFF',
            cursor: 'pointer'
          }}>
            <input
              type="checkbox"
              checked={checkboxState}
              onChange={(e) => setCheckboxState(e.target.checked)}
              style={{ accentColor: '#0B0B0D', width: '16px', height: '16px' }}
            />
            <div>
              <div style={{ fontSize: '13px', fontWeight: 600, color: '#0B0B0D' }}>
                Family Photos & High-Resolution Archives (Google Photos)
              </div>
              <div style={{ fontSize: '11.5px', color: '#737680' }}>
                Eligible for post-continuity delegation to designated sister.
              </div>
            </div>
          </label>

          <label style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '10px 14px',
            borderRadius: '6px',
            border: '1px dashed #FCA5A5',
            backgroundColor: '#FEF2F2',
            cursor: 'not-allowed'
          }}>
            <input
              type="checkbox"
              checked={false}
              disabled
              style={{ width: '16px', height: '16px' }}
            />
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '13px', fontWeight: 600, color: '#991B1B' }}>
                  Gmail Messages & Personal Hangouts Inboxes
                </span>
                <span style={{
                  fontSize: '10px',
                  fontFamily: 'var(--font-mono)',
                  color: '#991B1B',
                  backgroundColor: '#FEE2E2',
                  border: '1px solid #FCA5A5',
                  padding: '1px 6px',
                  borderRadius: '3px'
                }}>
                  INVIOLABLE LOCK
                </span>
              </div>
              <div style={{ fontSize: '11.5px', color: '#7F1D1D' }}>
                Cryptographically locked by protocol design. Zero nominees can access personal messaging.
              </div>
            </div>
            <Lock size={15} style={{ color: '#991B1B' }} />
          </label>
        </div>
      </section>
    </div>
  );
};

