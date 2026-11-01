import React, { useState, useEffect } from 'react';
import { 
  X, 
  Check, 
  Shield, 
  Lock, 
  ArrowRight, 
  ArrowLeft,
  CheckCircle2,
  AlertTriangle,
  Info,
  KeyRound
} from 'lucide-react';
import { ServiceItem, ServiceCategory, Nominee } from '../../types';
import { Badge } from '../common/Badge';
import { ProviderIcon } from '../common/ProviderIcon';

interface ServiceConnectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConnect: (service: ServiceItem) => void;
  existingServices: ServiceItem[];
  nominees: Nominee[];
  initialProviderSlug?: string;
}

const AVAILABLE_PROVIDERS = [
  {
    name: 'Instagram',
    slug: 'instagram',
    categoryType: 'social_media' as const,
    authProvider: 'Meta Graph API & Data Continuity Toolkit',
    description: 'Published creative photography, design posts, reels, and public profile showcases.',
    defaultEmail: '@vidhi.uxdesign',
    scopesRequested: [
      'instagram_graph_user_profile',
      'instagram_graph_user_media'
    ],
    architecturalExclusions: [
      'Direct Messages (DMs) and vanished conversations',
      'Story drafts and close-friends story archives',
      'Search query and browse history logs'
    ],
    defaultCategories: [
      {
        id: 'cat-i-posts',
        name: 'Published Photography & Captions',
        description: 'Public feed photos, design showcases, captions, and memorialization photography.',
        isSupportedByProvider: true,
        isIncluded: true,
        isExcludedByDefault: false,
        scopeNote: 'Archive zip export package for designated nominee.'
      },
      {
        id: 'cat-i-dms',
        name: 'Instagram Direct Messages (DMs)',
        description: 'Private 1-on-1 direct messages, voice notes, and private chat history.',
        isSupportedByProvider: false,
        isIncluded: false,
        isExcludedByDefault: true,
        scopeNote: 'STRICTLY EXCLUDED BY DEFAULT. Platform APIs and privacy policies prohibit third-party extraction.'
      }
    ]
  },
  {
    name: 'Google Workspace',
    slug: 'google',
    categoryType: 'cloud_storage' as const,
    authProvider: 'Google Identity Services (OAuth 2.0 PKCE)',
    description: 'Cloud storage, family photography, documents, and contacts repository.',
    defaultEmail: 'vidhi.ambade@gmail.com',
    scopesRequested: [
      'https://www.googleapis.com/auth/drive.metadata.readonly',
      'https://www.googleapis.com/auth/photoslibrary.readonly',
      'https://www.googleapis.com/auth/contacts.readonly'
    ],
    architecturalExclusions: [
      'Gmail personal email message bodies and threads',
      'Chrome personal search, bookmarks, and browsing history',
      'Google Password Manager credentials and 2FA keys'
    ],
    defaultCategories: [
      {
        id: 'cat-g-photos',
        name: 'Google Photos & Family Albums',
        description: 'Synchronised personal photography, camera roll backups, and shared family albums.',
        isSupportedByProvider: true,
        isIncluded: true,
        isExcludedByDefault: false,
        scopeNote: 'Read-only album listing and asset export permissions.'
      },
      {
        id: 'cat-g-drive',
        name: 'Google Drive Curated Documents',
        description: 'Designated files, tax receipts, and personal PDF archives.',
        isSupportedByProvider: true,
        isIncluded: true,
        isExcludedByDefault: false,
        scopeNote: 'File-level metadata and selected folder transfer.'
      },
      {
        id: 'cat-g-mail',
        name: 'Gmail Private Threads & Messages',
        description: 'Personal sensitive conversations, verification codes, and email archive.',
        isSupportedByProvider: false,
        isIncluded: false,
        isExcludedByDefault: true,
        scopeNote: 'Permanently excluded by architectural privacy policy.'
      }
    ]
  },
  {
    name: 'Apple iCloud',
    slug: 'apple',
    categoryType: 'cloud_storage' as const,
    authProvider: 'Sign in with Apple (Continuity Delegate Framework)',
    description: 'iCloud Photos, Shared Albums, Notes, and Documents folder.',
    defaultEmail: 'vidhi.ambade@icloud.com',
    scopesRequested: [
      'com.apple.developer.icloud.photos.readonly',
      'com.apple.developer.icloud.notes.export'
    ],
    architecturalExclusions: [
      'iCloud Keychain passwords and 2FA secrets',
      'iMessage and FaceTime end-to-end encrypted histories',
      'Health records and HomeKit security cameras'
    ],
    defaultCategories: [
      {
        id: 'cat-a-photos',
        name: 'iCloud Shared Photo Library',
        description: 'High-resolution photography, live photos, and travel memories.',
        isSupportedByProvider: true,
        isIncluded: true,
        isExcludedByDefault: false,
        scopeNote: 'Full camera roll asset archive export.'
      },
      {
        id: 'cat-a-notes',
        name: 'Apple Notes (Digital Continuity Folder)',
        description: 'Account recovery instructions and household guidance.',
        isSupportedByProvider: true,
        isIncluded: true,
        isExcludedByDefault: false,
        scopeNote: 'Exportable markdown notes from Continuity directory.'
      },
      {
        id: 'cat-a-keychain',
        name: 'iCloud Keychain Passwords',
        description: 'Master login credentials and device PINs.',
        isSupportedByProvider: false,
        isIncluded: false,
        isExcludedByDefault: true,
        scopeNote: 'Hardware-enclave encrypted; zero-knowledge exclusion.'
      }
    ]
  },
  {
    name: 'Microsoft 365 / OneDrive',
    slug: 'microsoft',
    categoryType: 'work_productivity' as const,
    authProvider: 'Microsoft Identity Platform (MSAL 2.0)',
    description: 'Personal OneDrive storage, OneNote digital journals, and Office files.',
    defaultEmail: 'vidhi.ambade@university.edu',
    scopesRequested: [
      'Files.Read.All',
      'Notes.Read'
    ],
    architecturalExclusions: [
      'Outlook.com private emails',
      'Teams chat logs and video recordings',
      'Microsoft Authenticator credentials'
    ],
    defaultCategories: [
      {
        id: 'cat-m-onedrive',
        name: 'Personal OneDrive Archive',
        description: 'Design archives, resume portfolios, and university assignments.',
        isSupportedByProvider: true,
        isIncluded: true,
        isExcludedByDefault: false,
        scopeNote: 'Read-only file access and batch export archive.'
      },
      {
        id: 'cat-m-notes',
        name: 'OneNote Notebooks',
        description: 'Personal reflective writing and design documentation.',
        isSupportedByProvider: true,
        isIncluded: true,
        isExcludedByDefault: false,
        scopeNote: 'Section-level export.'
      }
    ]
  },
  {
    name: 'Dropbox Personal',
    slug: 'dropbox',
    categoryType: 'cloud_storage' as const,
    authProvider: 'Dropbox OAuth 2.0 with Scoped Permissions',
    description: 'Figma backups, design assets, and portfolio project repositories.',
    defaultEmail: 'vidhi.creative@gmail.com',
    scopesRequested: [
      'files.metadata.read',
      'files.content.read'
    ],
    architecturalExclusions: [
      'Dropbox Passwords master vault',
      'Paper personal private drafts'
    ],
    defaultCategories: [
      {
        id: 'cat-d-portfolio',
        name: 'Design Portfolio & System Backups',
        description: 'Figma raw files, component specifications, and project assets.',
        isSupportedByProvider: true,
        isIncluded: true,
        isExcludedByDefault: false,
        scopeNote: 'Project directory sync.'
      }
    ]
  },
  {
    name: 'Facebook & Meta',
    slug: 'facebook',
    categoryType: 'social_media' as const,
    authProvider: 'Meta Legacy Contact API',
    description: 'Timeline history, childhood memories, and legacy contact memorialization.',
    defaultEmail: 'vidhi.ambade@gmail.com',
    scopesRequested: [
      'public_profile',
      'user_photos'
    ],
    architecturalExclusions: [
      'Messenger end-to-end encrypted chats',
      'Ad preferences and login tokens'
    ],
    defaultCategories: [
      {
        id: 'cat-fb-timeline',
        name: 'Timeline Posts & Family Photos',
        description: '10+ years of family birthday wishes, childhood pictures, and milestones.',
        isSupportedByProvider: true,
        isIncluded: true,
        isExcludedByDefault: false,
        scopeNote: 'Can be linked for automated legacy account memorialization.'
      },
      {
        id: 'cat-fb-msg',
        name: 'Messenger Private Conversations',
        description: 'Private chat archives with friends and acquaintances.',
        isSupportedByProvider: false,
        isIncluded: false,
        isExcludedByDefault: true,
        scopeNote: 'LOCKED BY DEFAULT.'
      }
    ]
  }
];

export const ServiceConnectorModal: React.FC<ServiceConnectorModalProps> = ({
  isOpen,
  onClose,
  onConnect,
  existingServices,
  nominees,
  initialProviderSlug
}) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [selectedProviderSlug, setSelectedProviderSlug] = useState<string>('instagram');
  const [accountEmail, setAccountEmail] = useState<string>('@vidhi.uxdesign');
  const [selectedCategoryIds, setSelectedCategoryIds] = useState<string[]>([]);
  const [assignedNomineeId, setAssignedNomineeId] = useState<string>('');
  const [isSimulatingOAuth, setIsSimulatingOAuth] = useState<boolean>(false);

  // Initialize or respond to initialProviderSlug
  useEffect(() => {
    if (isOpen) {
      const slugToUse = initialProviderSlug || 'instagram';
      setSelectedProviderSlug(slugToUse);
      const prov = AVAILABLE_PROVIDERS.find(p => p.slug === slugToUse) || AVAILABLE_PROVIDERS[0];
      setAccountEmail(prov.defaultEmail);
      
      // Look up if service already has categories in existingServices
      const existing = existingServices.find(s => s.slug === slugToUse);
      if (existing && existing.categories && existing.status === 'connected') {
        setSelectedCategoryIds(existing.categories.filter(c => c.isIncluded).map(c => c.id));
        const firstNominee = existing.categories.find(c => c.assignedNomineeId)?.assignedNomineeId;
        if (firstNominee) setAssignedNomineeId(firstNominee);
      } else {
        const nonExcluded = prov.defaultCategories.filter(c => !c.isExcludedByDefault).map(c => c.id);
        setSelectedCategoryIds(nonExcluded);
      }

      // If opened with a specific provider, start at Step 2 (Simulated Authorisation)
      if (initialProviderSlug) {
        setStep(2);
      } else {
        setStep(1);
      }
    }
  }, [isOpen, initialProviderSlug, existingServices]);

  if (!isOpen) return null;

  const currentProvider = AVAILABLE_PROVIDERS.find(p => p.slug === selectedProviderSlug) || AVAILABLE_PROVIDERS[0];
  const isAlreadyConnected = existingServices.some(s => s.slug === currentProvider.slug && s.status === 'connected');

  const handleProviderSelect = (slug: string) => {
    setSelectedProviderSlug(slug);
    const prov = AVAILABLE_PROVIDERS.find(p => p.slug === slug);
    if (prov) {
      setAccountEmail(prov.defaultEmail);
      const existing = existingServices.find(s => s.slug === slug);
      if (existing && existing.categories && existing.status === 'connected') {
        setSelectedCategoryIds(existing.categories.filter(c => c.isIncluded).map(c => c.id));
      } else {
        const nonExcluded = prov.defaultCategories.filter(c => !c.isExcludedByDefault).map(c => c.id);
        setSelectedCategoryIds(nonExcluded);
      }
    }
    setStep(2);
  };

  const toggleCategory = (id: string, isExcludedByDefault: boolean) => {
    if (isExcludedByDefault) return;
    if (selectedCategoryIds.includes(id)) {
      setSelectedCategoryIds(selectedCategoryIds.filter(x => x !== id));
    } else {
      setSelectedCategoryIds([...selectedCategoryIds, id]);
    }
  };

  const handleSimulateOAuth = () => {
    setIsSimulatingOAuth(true);
    setTimeout(() => {
      setIsSimulatingOAuth(false);
      setStep(3); // Moves to Step 3: Review scopes and privacy guarantees
    }, 500);
  };

  const handleCompleteConnection = () => {
    const selectedNominee = nominees.find(n => n.id === assignedNomineeId);

    const categoriesWithAssignments: ServiceCategory[] = currentProvider.defaultCategories.map(c => ({
      ...c,
      serviceId: `srv-${currentProvider.slug}`,
      isIncluded: selectedCategoryIds.includes(c.id),
      assignedNomineeId: selectedCategoryIds.includes(c.id) ? (assignedNomineeId || undefined) : undefined,
      assignedNomineeName: (selectedCategoryIds.includes(c.id) && selectedNominee) ? selectedNominee.name : undefined
    }));

    const newService: ServiceItem = {
      id: `srv-${currentProvider.slug}`,
      name: currentProvider.name,
      slug: currentProvider.slug,
      iconName: currentProvider.slug,
      categoryType: currentProvider.categoryType,
      status: 'connected',
      connectedEmail: accountEmail,
      lastReviewed: 'Just now',
      description: currentProvider.description,
      providerAuthName: currentProvider.authProvider,
      scopesRequested: currentProvider.scopesRequested,
      architecturalExclusions: currentProvider.architecturalExclusions,
      categories: categoriesWithAssignments
    };

    onConnect(newService);
    setStep(1);
    onClose();
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(11, 11, 13, 0.52)',
      backdropFilter: 'blur(6px)',
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
        maxWidth: '660px',
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
              fontSize: '10px',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              color: 'var(--color-secondary-text)',
              marginBottom: '3px'
            }}>
              <span>Connector Workflow</span>
              <span>•</span>
              <span style={{ color: 'var(--color-primary-black)' }}>Stage {step} of 4</span>
            </div>
            <h2 style={{ fontSize: '16.5px', fontWeight: 700, color: 'var(--color-primary-black)', margin: 0 }}>
              {step === 1 && 'Select a Service to Connect'}
              {step === 2 && `Simulated Authorisation: ${currentProvider.name}`}
              {step === 3 && `Permission Scopes & Privacy Invariants`}
              {step === 4 && `Select Continuity Categories: ${currentProvider.name}`}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="btn-ghost"
            style={{ padding: '6px' }}
          >
            <X size={16} />
          </button>
        </div>

        {/* Modal Body */}
        <div style={{ padding: '24px', overflowY: 'auto', flex: 1 }}>
          {/* STEP 1: Provider Selection */}
          {step === 1 && (
            <div>
              <p style={{ fontSize: '13px', color: 'var(--color-secondary-text)', marginBottom: '16px', lineHeight: 1.5 }}>
                Select a cloud or social platform to link to your digital continuity catalog. 
                <strong> No platform passwords are ever requested, stored, or transmitted.</strong>
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px', alignItems: 'stretch' }}>
                {AVAILABLE_PROVIDERS.map(p => {
                  const isConnected = existingServices.some(s => s.slug === p.slug && s.status === 'connected');
                  const isSelected = selectedProviderSlug === p.slug;

                  return (
                    <div
                      key={p.slug}
                      onClick={() => handleProviderSelect(p.slug)}
                      style={{
                        padding: '16px',
                        border: isSelected ? '2px solid var(--color-primary-black)' : '1px solid var(--color-border)',
                        borderRadius: 'var(--radius-md)',
                        backgroundColor: isConnected ? 'var(--color-off-white)' : 'var(--color-white)',
                        cursor: 'pointer',
                        transition: 'all var(--transition-fast)',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        gap: '12px',
                        height: '100%'
                      }}
                    >
                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <ProviderIcon slug={p.slug} size={18} />
                            <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-primary-black)' }}>
                              {p.name}
                            </span>
                          </div>
                          {isConnected ? (
                            <Badge variant="connected" size="sm">Connected</Badge>
                          ) : (
                            <Badge variant="unlinked" size="sm">Unlinked</Badge>
                          )}
                        </div>
                        <p style={{ fontSize: '12px', color: 'var(--color-secondary-text)', margin: 0, lineHeight: 1.45 }}>
                          {p.description}
                        </p>
                      </div>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        fontSize: '11.5px',
                        fontWeight: 600,
                        color: 'var(--color-primary-black)',
                        paddingTop: '8px',
                        borderTop: '1px solid var(--color-border-subtle)'
                      }}>
                        <span>{isConnected ? 'Reconfigure connection' : 'Start connection'}</span>
                        <ArrowRight size={13} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 2: Simulated Provider Authorisation Screen (Zero Credentials) */}
          {step === 2 && (
            <div>
              {/* Prototype Disclosure Banner */}
              <div style={{
                padding: '10px 14px',
                backgroundColor: 'var(--color-pale-blue-grey)',
                borderRadius: 'var(--radius-md)',
                marginBottom: '18px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                border: '1px solid var(--color-border)'
              }}>
                <Shield size={16} style={{ color: 'var(--color-primary-black)', flexShrink: 0 }} />
                <div style={{ fontSize: '11.5px', color: 'var(--color-primary-black)', lineHeight: 1.4 }}>
                  <strong>Prototype Simulation Mode:</strong> Standards-compliant OAuth 2.0 PKCE flow. 
                  <strong> No passwords or real account credentials are collected or saved.</strong>
                </div>
              </div>

              {/* Provider Identity Box */}
              <div style={{
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-md)',
                padding: '20px',
                backgroundColor: 'var(--color-off-white)',
                marginBottom: '18px',
                textAlign: 'center'
              }}>
                <div style={{
                  width: '52px',
                  height: '52px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--color-white)',
                  border: '1px solid var(--color-border)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 12px'
                }}>
                  <ProviderIcon slug={currentProvider.slug} size={28} />
                </div>

                <h3 style={{ fontSize: '16px', fontWeight: 700, margin: '0 0 4px', color: 'var(--color-primary-black)' }}>
                  Authorize My Vault to Connect {currentProvider.name}
                </h3>
                <p style={{ fontSize: '12px', color: 'var(--color-secondary-text)', maxWidth: '440px', margin: '0 auto 14px', lineHeight: 1.45 }}>
                  Identity Provider: <code>{currentProvider.authProvider}</code>
                </p>

                <div style={{ maxWidth: '340px', margin: '0 auto 16px', textAlign: 'left' }}>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: 'var(--color-secondary-text)', marginBottom: '4px' }}>
                    Account Identifier / Username
                  </label>
                  <input
                    type="text"
                    value={accountEmail}
                    onChange={(e) => setAccountEmail(e.target.value)}
                    style={{ width: '100%', fontSize: '13px', fontWeight: 500 }}
                  />
                </div>

                {isSimulatingOAuth ? (
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', padding: '12px' }}>
                    <div style={{
                      width: '24px',
                      height: '24px',
                      border: '3px solid var(--color-border)',
                      borderTopColor: 'var(--color-primary-black)',
                      borderRadius: '50%',
                      animation: 'spin 0.7s linear infinite'
                    }} />
                    <span style={{ fontSize: '11.5px', color: 'var(--color-secondary-text)' }}>
                      Exchanging simulated cryptographic PKCE token...
                    </span>
                  </div>
                ) : (
                  <button
                    onClick={handleSimulateOAuth}
                    className="btn-primary"
                    style={{ padding: '9px 20px', fontSize: '13px', margin: '0 auto' }}
                  >
                    <span>Continue without Credentials (Simulated Handshake)</span>
                    <ArrowRight size={14} />
                  </button>
                )}
              </div>

              {/* Security Invariant Notes */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', fontSize: '11px' }}>
                <div style={{ padding: '10px', backgroundColor: 'var(--color-white)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)' }}>
                  <div style={{ fontWeight: 600, color: 'var(--color-primary-black)', marginBottom: '2px' }}>🔒 Zero-Knowledge</div>
                  <div style={{ color: 'var(--color-secondary-text)' }}>No passwords ever stored or requested</div>
                </div>
                <div style={{ padding: '10px', backgroundColor: 'var(--color-white)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)' }}>
                  <div style={{ fontWeight: 600, color: 'var(--color-primary-black)', marginBottom: '2px' }}>🛡️ Scoped Access</div>
                  <div style={{ color: 'var(--color-secondary-text)' }}>Read-only catalog metadata discovery</div>
                </div>
                <div style={{ padding: '10px', backgroundColor: 'var(--color-white)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)' }}>
                  <div style={{ fontWeight: 600, color: 'var(--color-primary-black)', marginBottom: '2px' }}>🚫 Lifetime Isolation</div>
                  <div style={{ color: 'var(--color-secondary-text)' }}>Connecting ≠ granting nominee access</div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Available Illustrative Permission Scopes & Privacy Guarantees */}
          {step === 3 && (
            <div>
              <p style={{ fontSize: '12.5px', color: 'var(--color-secondary-text)', marginBottom: '16px', lineHeight: 1.5 }}>
                Review the illustrative scopes authorized for <strong>{currentProvider.name}</strong> alongside permanent architectural exclusions.
              </p>

              {/* Scopes & Exclusions Panels */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '18px' }}>
                {/* Scopes */}
                <div style={{
                  padding: '14px',
                  backgroundColor: 'var(--color-off-white)',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--color-border)'
                }}>
                  <div style={{ fontSize: '11.5px', fontWeight: 700, color: 'var(--color-primary-black)', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Shield size={14} style={{ color: '#16A34A' }} />
                    <span>Requested Read-Only Scopes</span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {currentProvider.scopesRequested.map((scope, idx) => (
                      <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: 'var(--color-primary-black)' }}>
                        <Check size={12} style={{ color: '#16A34A', flexShrink: 0 }} />
                        <code style={{ fontFamily: 'var(--font-mono)' }}>{scope}</code>
                      </div>
                    ))}
                  </div>
                  <div style={{ fontSize: '10.5px', color: 'var(--color-secondary-text)', marginTop: '8px', fontStyle: 'italic' }}>
                    Read-only catalog indexing permissions.
                  </div>
                </div>

                {/* Exclusions */}
                <div style={{
                  padding: '14px',
                  backgroundColor: '#FFFBFB',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid #FECACA'
                }}>
                  <div style={{ fontSize: '11.5px', fontWeight: 700, color: '#991B1B', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Lock size={14} />
                    <span>Enforced Architectural Exclusions</span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {currentProvider.architecturalExclusions.map((excl, idx) => (
                      <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: '#7F1D1D' }}>
                        <Lock size={11} style={{ color: '#DC2626', flexShrink: 0 }} />
                        <span>{excl}</span>
                      </div>
                    ))}
                  </div>
                  <div style={{ fontSize: '10.5px', color: '#991B1B', marginTop: '8px', fontStyle: 'italic' }}>
                    Zero-knowledge policy. Strictly blocked.
                  </div>
                </div>
              </div>

              {/* Architectural Separation Callout */}
              <div style={{
                padding: '14px 16px',
                backgroundColor: 'var(--color-pale-blue-grey)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--color-border)',
                display: 'flex',
                gap: '12px'
              }}>
                <Info size={18} style={{ color: 'var(--color-primary-black)', flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <div style={{ fontSize: '12.5px', fontWeight: 700, color: 'var(--color-primary-black)' }}>
                    Core Design Principle: Provider Connection ≠ Nominee Access
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--color-secondary-text)', marginTop: '3px', lineHeight: 1.45 }}>
                    Connecting this account only registers catalog categories into your vault. 
                    <strong> Your trusted nominees receive zero access during your lifetime.</strong> 
                    Delegates can only access assigned categories in the future under certified legal continuity adjudication.
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: Select Categories to Include & Save Configuration */}
          {step === 4 && (
            <div>
              <p style={{ fontSize: '12.5px', color: 'var(--color-secondary-text)', marginBottom: '14px' }}>
                Select which information categories from <strong>{currentProvider.name}</strong> will be included in your future continuity plan.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '18px' }}>
                {currentProvider.defaultCategories.map(cat => {
                  const isChecked = selectedCategoryIds.includes(cat.id);
                  const isLocked = cat.isExcludedByDefault;

                  return (
                    <div
                      key={cat.id}
                      onClick={() => !isLocked && toggleCategory(cat.id, isLocked)}
                      style={{
                        padding: '12px 14px',
                        border: '1px solid var(--color-border)',
                        borderRadius: 'var(--radius-md)',
                        backgroundColor: isLocked ? '#FCFDFD' : (isChecked ? 'var(--color-white)' : 'var(--color-off-white)'),
                        opacity: isLocked ? 0.8 : 1,
                        cursor: isLocked ? 'not-allowed' : 'pointer',
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '12px',
                        transition: 'border-color var(--transition-fast)'
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked && !isLocked}
                        disabled={isLocked}
                        readOnly
                        style={{ marginTop: '2px', cursor: isLocked ? 'not-allowed' : 'pointer' }}
                      />
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '2px' }}>
                          <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-primary-black)' }}>
                            {cat.name}
                          </span>
                          {isLocked ? (
                            <Badge variant="locked" size="sm" icon={<Lock size={10} style={{ marginRight: '3px' }} />}>
                              Strictly Locked / Excluded by Policy
                            </Badge>
                          ) : isChecked ? (
                            <Badge variant="verified" size="sm">Included in Plan</Badge>
                          ) : (
                            <Badge variant="neutral" size="sm">Excluded</Badge>
                          )}
                        </div>
                        <p style={{ fontSize: '11.5px', color: 'var(--color-secondary-text)', margin: '2px 0 3px', lineHeight: 1.35 }}>
                          {cat.description}
                        </p>
                        {cat.scopeNote && (
                          <div style={{ fontSize: '10.5px', color: 'var(--color-secondary-text)', fontStyle: 'italic' }}>
                            Scope: {cat.scopeNote}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Delegate Nominee Assignment Dropdown */}
              <div style={{
                padding: '14px',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--color-off-white)'
              }}>
                <label style={{ display: 'block', fontSize: '11.5px', fontWeight: 600, color: 'var(--color-primary-black)', marginBottom: '5px' }}>
                  Assign selected categories to trusted delegate (Optional)
                </label>
                <select
                  value={assignedNomineeId}
                  onChange={(e) => setAssignedNomineeId(e.target.value)}
                  style={{ width: '100%', fontSize: '12px', padding: '6px 10px', backgroundColor: 'var(--color-white)' }}
                >
                  <option value="">No nominee assigned yet (Decide later)</option>
                  {nominees.map(n => (
                    <option key={n.id} value={n.id}>
                      {n.name} ({n.relationship}) — {n.email}
                    </option>
                  ))}
                </select>
                <p style={{ fontSize: '10.5px', color: 'var(--color-secondary-text)', marginTop: '4px', margin: 0 }}>
                  Assigned nominees only gain claim eligibility upon verified legal continuity adjudication in the future.
                </p>
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
              onClick={() => setStep((step - 1) as any)}
              className="btn-ghost"
              style={{ fontSize: '12px' }}
            >
              <ArrowLeft size={13} /> Back
            </button>
          ) : <div />}

          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              onClick={onClose}
              className="btn-secondary"
              style={{ fontSize: '12px' }}
            >
              Cancel
            </button>

            {step === 3 && (
              <button
                onClick={() => setStep(4)}
                className="btn-primary"
                style={{ fontSize: '12px' }}
              >
                <span>Proceed to Category Selection</span>
                <ArrowRight size={13} />
              </button>
            )}

            {step === 4 && (
              <button
                onClick={handleCompleteConnection}
                className="btn-primary"
                style={{ fontSize: '12px' }}
              >
                <CheckCircle2 size={14} />
                <span>Save Configuration & Connect Service</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
