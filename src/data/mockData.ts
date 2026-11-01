import { 
  ServiceItem, 
  Nominee, 
  ServiceGroup, 
  AccessRule, 
  ContinuityClaim, 
  SecuritySession, 
  AuditEvent 
} from '../types';

export const INITIAL_SERVICES: ServiceItem[] = [
  {
    id: 'srv-google',
    name: 'Google Workspace',
    slug: 'google',
    iconName: 'google',
    categoryType: 'cloud_storage',
    status: 'connected',
    connectedEmail: 'vidhi.ambade@gmail.com',
    lastReviewed: 'Oct 24, 2026',
    description: 'Cloud storage, family photography, documents and contacts repository.',
    providerAuthName: 'Google Identity Services (OAuth 2.0)',
    scopesRequested: [
      'https://www.googleapis.com/auth/drive.metadata.readonly',
      'https://www.googleapis.com/auth/photoslibrary.readonly',
      'https://www.googleapis.com/auth/contacts.readonly'
    ],
    architecturalExclusions: [
      'Gmail personal email message bodies',
      'Chrome personal search & browsing history',
      'Google Password Manager credentials'
    ],
    categories: [
      {
        id: 'cat-g-photos',
        serviceId: 'srv-google',
        name: 'Family Photos & Videos',
        description: 'Personal photo albums, holiday trips, and creative video memories.',
        isSupportedByProvider: true,
        isIncluded: true,
        isExcludedByDefault: false,
        assignedNomineeId: 'nom-riya',
        assignedNomineeName: 'Riya Ambade (Sister)',
        assignedGroupId: 'grp-memories',
        assignedGroupName: 'Photos & Memories',
        scopeNote: 'High personal & emotional value for familial continuity.'
      },
      {
        id: 'cat-g-docs',
        serviceId: 'srv-google',
        name: 'Drive Documents & Records',
        description: 'Scanned tax returns, vehicle insurance, property receipts and university certificates.',
        isSupportedByProvider: true,
        isIncluded: true,
        isExcludedByDefault: false,
        assignedNomineeId: 'nom-arjun',
        assignedNomineeName: 'Arjun Mehta (Partner)',
        assignedGroupId: 'grp-docs',
        assignedGroupName: 'Official Documents',
        scopeNote: 'Critical practical and legal continuity items.'
      },
      {
        id: 'cat-g-contacts',
        serviceId: 'srv-google',
        name: 'Emergency Contacts & Address Book',
        description: 'Extended family, doctors, and professional emergency contacts list.',
        isSupportedByProvider: true,
        isIncluded: true,
        isExcludedByDefault: false,
        assignedNomineeId: 'nom-arjun',
        assignedNomineeName: 'Arjun Mehta (Partner)',
        scopeNote: 'Assists trusted person in notifying relatives.'
      },
      {
        id: 'cat-g-gmail',
        serviceId: 'srv-google',
        name: 'Private Email Threads (Gmail)',
        description: 'Personal correspondence, private emails, and security verification logs.',
        isSupportedByProvider: false,
        isIncluded: false,
        isExcludedByDefault: true,
        scopeNote: 'PERMANENTLY EXCLUDED BY DEFAULT. Requires explicit judicial subpoena in actual systems.'
      }
    ]
  },
  {
    id: 'srv-apple',
    name: 'Apple iCloud',
    slug: 'apple',
    iconName: 'apple',
    categoryType: 'cloud_storage',
    status: 'connected',
    connectedEmail: 'vidhi@icloud.com',
    lastReviewed: 'Oct 20, 2026',
    description: 'Device backups, scanned identity cards, and mobile photo stream.',
    providerAuthName: 'Apple ID Sign In (Legacy Contact Compatible)',
    scopesRequested: [
      'com.apple.icloud.photos.read',
      'com.apple.icloud.documents.read'
    ],
    architecturalExclusions: [
      'iMessage end-to-end encrypted chats',
      'iCloud Keychain passwords & payment cards',
      'Health app real-time biometric metrics'
    ],
    categories: [
      {
        id: 'cat-a-photos',
        serviceId: 'srv-apple',
        name: 'iCloud Shared Photos',
        description: 'Camera roll and curated memories stored on Apple devices.',
        isSupportedByProvider: true,
        isIncluded: true,
        isExcludedByDefault: false,
        assignedNomineeId: 'nom-riya',
        assignedNomineeName: 'Riya Ambade (Sister)',
        assignedGroupId: 'grp-memories',
        assignedGroupName: 'Photos & Memories',
        scopeNote: 'Transfers via simulated Apple Legacy Contact token.'
      },
      {
        id: 'cat-a-notes',
        serviceId: 'srv-apple',
        name: 'Continuity Instructions & Notes',
        description: 'Specific non-sensitive notes marked "For My Family" in Apple Notes.',
        isSupportedByProvider: true,
        isIncluded: true,
        isExcludedByDefault: false,
        assignedNomineeId: 'nom-arjun',
        assignedNomineeName: 'Arjun Mehta (Partner)',
        scopeNote: 'Personal guidelines and funeral wishes.'
      },
      {
        id: 'cat-a-keychain',
        serviceId: 'srv-apple',
        name: 'iCloud Keychain & Passwords',
        description: 'End-to-end encrypted login credentials and autofill data.',
        isSupportedByProvider: false,
        isIncluded: false,
        isExcludedByDefault: true,
        scopeNote: 'EXCLUDED. Master credentials cannot be shared cryptographically.'
      }
    ]
  },
  {
    id: 'srv-msft',
    name: 'Microsoft 365',
    slug: 'microsoft',
    iconName: 'microsoft',
    categoryType: 'work_productivity',
    status: 'connected',
    connectedEmail: 'vidhi.ambade@university.edu',
    lastReviewed: 'Oct 12, 2026',
    description: 'University research papers, portfolio drafts, and design presentations.',
    providerAuthName: 'Microsoft Entra ID (Graph API OAuth)',
    scopesRequested: [
      'Files.Read',
      'Notes.Read'
    ],
    architecturalExclusions: [
      'Outlook personal emails and Teams direct chats',
      'Institutional administrative security logs'
    ],
    categories: [
      {
        id: 'cat-m-onedrive',
        serviceId: 'srv-msft',
        name: 'OneDrive Academic & Design Archives',
        description: 'Undergraduate design work, essays, and degree documentation.',
        isSupportedByProvider: true,
        isIncluded: true,
        isExcludedByDefault: false,
        assignedNomineeId: 'nom-arjun',
        assignedNomineeName: 'Arjun Mehta (Partner)',
        assignedGroupId: 'grp-work',
        assignedGroupName: 'Work & Creative Archives',
        scopeNote: 'Preserves 4 years of academic design research.'
      },
      {
        id: 'cat-m-teams',
        serviceId: 'srv-msft',
        name: 'Teams & Outlook Messages',
        description: 'Classmate group chats, instructor messages, and campus email.',
        isSupportedByProvider: false,
        isIncluded: false,
        isExcludedByDefault: true,
        scopeNote: 'LOCKED BY DEFAULT to protect peer privacy.'
      }
    ]
  },
  {
    id: 'srv-dropbox',
    name: 'Dropbox',
    slug: 'dropbox',
    iconName: 'dropbox',
    categoryType: 'cloud_storage',
    status: 'connected',
    connectedEmail: 'vidhi.creative@gmail.com',
    lastReviewed: 'Sep 28, 2026',
    description: 'High-resolution graphic assets, Figma project backups, and 3D renders.',
    providerAuthName: 'Dropbox Core API (Scoped App Access)',
    scopesRequested: [
      'files.metadata.read',
      'files.content.read'
    ],
    architecturalExclusions: [
      'Dropbox Passwords service'
    ],
    categories: [
      {
        id: 'cat-d-portfolio',
        serviceId: 'srv-dropbox',
        name: 'High-Res Design Portfolio & Renders',
        description: 'Raw video footage, Blender assets, and design system archives.',
        isSupportedByProvider: true,
        isIncluded: true,
        isExcludedByDefault: false,
        assignedNomineeId: 'nom-arjun',
        assignedNomineeName: 'Arjun Mehta (Partner)',
        assignedGroupId: 'grp-work',
        assignedGroupName: 'Work & Creative Archives',
        scopeNote: 'Creative body of work.'
      }
    ]
  },
  {
    id: 'srv-instagram',
    name: 'Instagram',
    slug: 'instagram',
    iconName: 'instagram',
    categoryType: 'social_media',
    status: 'not_connected',
    connectedEmail: '@vidhi.uxdesign',
    lastReviewed: 'Not connected',
    description: 'Public design posts, reels, stories and profile identity.',
    providerAuthName: 'Meta Graph API (Instagram Basic Display)',
    scopesRequested: [
      'instagram_graph_user_profile',
      'instagram_graph_user_media'
    ],
    architecturalExclusions: [
      'Direct Messages (DMs) and vanished conversations',
      'Story drafts and close-friends stories'
    ],
    categories: [
      {
        id: 'cat-i-posts',
        serviceId: 'srv-instagram',
        name: 'Published Posts & Feed Highlights',
        description: 'Design posts, case study carousels, and public profile photography.',
        isSupportedByProvider: true,
        isIncluded: false,
        isExcludedByDefault: false,
        assignedNomineeId: 'nom-riya',
        assignedNomineeName: 'Riya Ambade (Sister)',
        assignedGroupId: 'grp-social',
        assignedGroupName: 'Social Media',
        scopeNote: 'Public memorialization asset.'
      },
      {
        id: 'cat-i-dms',
        serviceId: 'srv-instagram',
        name: 'Direct Messages & Private Chats',
        description: 'Private 1-on-1 direct messages and voice notes.',
        isSupportedByProvider: false,
        isIncluded: false,
        isExcludedByDefault: true,
        scopeNote: 'STRICTLY EXCLUDED BY DEFAULT. Platform APIs prohibit third-party extraction.'
      }
    ]
  },
  {
    id: 'srv-facebook',
    name: 'Facebook & Meta',
    slug: 'facebook',
    iconName: 'facebook',
    categoryType: 'social_media',
    status: 'not_connected',
    description: 'Timeline history, childhood memories, and legacy contact memorialization.',
    providerAuthName: 'Meta Legacy Contact API',
    scopesRequested: [
      'public_profile',
      'user_photos'
    ],
    architecturalExclusions: [
      'Messenger end-to-end encrypted chats',
      'Ad preferences and login tokens'
    ],
    categories: [
      {
        id: 'cat-fb-timeline',
        serviceId: 'srv-facebook',
        name: 'Timeline Posts & Family Photos',
        description: '10+ years of family birthday wishes, childhood pictures, and milestones.',
        isSupportedByProvider: true,
        isIncluded: false,
        isExcludedByDefault: false,
        scopeNote: 'Can be linked for automated legacy account memorialization.'
      },
      {
        id: 'cat-fb-msg',
        serviceId: 'srv-facebook',
        name: 'Messenger Private Conversations',
        description: 'Private chat archives with friends and acquaintances.',
        isSupportedByProvider: false,
        isIncluded: false,
        isExcludedByDefault: true,
        scopeNote: 'LOCKED BY DEFAULT.'
      }
    ]
  },
  {
    id: 'srv-github',
    name: 'GitHub',
    slug: 'github',
    iconName: 'github',
    categoryType: 'work_productivity',
    status: 'not_connected',
    description: 'Code repositories, open-source projects, release notes and design systems.',
    providerAuthName: 'GitHub OAuth Apps (Read-Only Repos)',
    scopesRequested: ['repo:status', 'read:user'],
    architecturalExclusions: ['SSH private keys & deployment tokens'],
    categories: [
      {
        id: 'cat-gh-repos',
        serviceId: 'srv-github',
        name: 'Code Repositories & Release Archives',
        description: 'Open source design prototypes and creative code portfolios.',
        isSupportedByProvider: true,
        isIncluded: false,
        isExcludedByDefault: false,
        scopeNote: 'Creative and academic intellectual property.'
      }
    ]
  },
  {
    id: 'srv-notion',
    name: 'Notion',
    slug: 'notion',
    iconName: 'notion',
    categoryType: 'work_productivity',
    status: 'not_connected',
    description: 'Personal knowledge base, creative writing, reading lists and life goals.',
    providerAuthName: 'Notion Integration API (Workspace Token)',
    scopesRequested: ['pages:read', 'databases:read'],
    architecturalExclusions: ['Workspace billing and administrator audit logs'],
    categories: [
      {
        id: 'cat-notion-pages',
        serviceId: 'srv-notion',
        name: 'Curated Notes & Creative Journals',
        description: 'Personal essays, travel logs, and life documentation.',
        isSupportedByProvider: true,
        isIncluded: false,
        isExcludedByDefault: false,
        scopeNote: 'Reflective life continuity archive.'
      }
    ]
  },
  {
    id: 'srv-spotify',
    name: 'Spotify',
    slug: 'spotify',
    iconName: 'spotify',
    categoryType: 'social_media',
    status: 'not_connected',
    description: 'Personal music playlists, podcast history, and curated audio memories.',
    providerAuthName: 'Spotify Web API (User Library Read)',
    scopesRequested: ['user-library-read', 'playlist-read-private'],
    architecturalExclusions: ['Payment details and private listening sessions'],
    categories: [
      {
        id: 'cat-spot-playlists',
        serviceId: 'srv-spotify',
        name: 'Personal Playlists & Listening Archives',
        description: 'Curated playlists that reflect lifetime musical journey and memories.',
        isSupportedByProvider: true,
        isIncluded: false,
        isExcludedByDefault: false,
        scopeNote: 'Sentimental and cultural memory asset.'
      }
    ]
  },
  {
    id: 'srv-proton',
    name: 'Proton Drive & Mail',
    slug: 'proton',
    iconName: 'proton',
    categoryType: 'cloud_storage',
    status: 'not_connected',
    description: 'Zero-knowledge end-to-end encrypted file backup and document storage.',
    providerAuthName: 'Proton API (Bridge Metadata Token)',
    scopesRequested: ['drive.metadata.read'],
    architecturalExclusions: ['Proton Pass master seed and PGP secret keys'],
    categories: [
      {
        id: 'cat-proton-docs',
        serviceId: 'srv-proton',
        name: 'Encrypted Document Vault',
        description: 'Encrypted scans of medical records, deed certificates, and financial papers.',
        isSupportedByProvider: true,
        isIncluded: false,
        isExcludedByDefault: false,
        scopeNote: 'High security legal and practical records.'
      }
    ]
  }
];

export const INITIAL_NOMINEES: Nominee[] = [
  {
    id: 'nom-riya',
    name: 'Riya Ambade',
    email: 'riya.ambade@gmail.com',
    relationship: 'Sister',
    verificationStatus: 'verified',
    accessStatus: 'inactive_lifetime',
    assignedCategories: [
      'Google Photos & Videos',
      'iCloud Shared Photos',
      'Instagram Published Posts'
    ],
    demoVerificationCode: 'VAULT-8492',
    invitedDate: 'Oct 22, 2026',
    verifiedDate: 'Oct 24, 2026',
    avatarInitials: 'RA'
  },
  {
    id: 'nom-arjun',
    name: 'Arjun Mehta',
    email: 'arjun.mehta@outlook.com',
    relationship: 'Partner',
    verificationStatus: 'verified',
    accessStatus: 'inactive_lifetime',
    assignedCategories: [
      'Google Drive Documents & Tax Records',
      'Apple Notes Continuity Instructions',
      'OneDrive Academic Archives',
      'Dropbox Design Assets'
    ],
    demoVerificationCode: 'VAULT-3104',
    invitedDate: 'Oct 18, 2026',
    verifiedDate: 'Oct 20, 2026',
    avatarInitials: 'AM'
  },
  {
    id: 'nom-sunita',
    name: 'Dr. Sunita Ambade',
    email: 'sunita.ambade@hospital.org',
    relationship: 'Parent / Mother',
    verificationStatus: 'pending',
    accessStatus: 'inactive_lifetime',
    assignedCategories: [
      'Emergency Contacts & Address Book'
    ],
    demoVerificationCode: 'VAULT-9912',
    invitedDate: 'Oct 28, 2026',
    avatarInitials: 'SA'
  }
];

export const INITIAL_GROUPS: ServiceGroup[] = [
  {
    id: 'grp-memories',
    name: 'Photos & Memories',
    description: 'Family albums, vacation videos, and personal photography across all devices.',
    iconName: 'camera',
    serviceIds: ['srv-google', 'srv-apple'],
    assignedNomineeIds: ['nom-riya'],
    inheritedCategories: ['Family Photos & Videos', 'iCloud Shared Photos']
  },
  {
    id: 'grp-docs',
    name: 'Official Documents',
    description: 'Scanned IDs, property deeds, health records, tax receipts, and certificates.',
    iconName: 'file-text',
    serviceIds: ['srv-google', 'srv-apple'],
    assignedNomineeIds: ['nom-arjun'],
    inheritedCategories: ['Drive Documents & Records', 'Continuity Instructions & Notes']
  },
  {
    id: 'grp-work',
    name: 'Work & Creative Archives',
    description: 'Academic design files, university projects, 3D renders, and portfolio backups.',
    iconName: 'briefcase',
    serviceIds: ['srv-msft', 'srv-dropbox'],
    assignedNomineeIds: ['nom-arjun'],
    inheritedCategories: ['OneDrive Academic Archives', 'High-Res Design Portfolio & Renders']
  },
  {
    id: 'grp-social',
    name: 'Social Media',
    description: 'Public identity profiles, curated highlights, and creative design reels.',
    iconName: 'share-2',
    serviceIds: ['srv-instagram'],
    assignedNomineeIds: ['nom-riya'],
    inheritedCategories: ['Published Posts & Feed Highlights']
  }
];

export const INITIAL_ACCESS_RULES: AccessRule[] = [
  {
    id: 'rule-01',
    serviceId: 'srv-google',
    serviceName: 'Google Workspace',
    categoryId: 'cat-g-photos',
    categoryName: 'Family Photos & Videos',
    groupId: 'grp-memories',
    groupName: 'Photos & Memories',
    nomineeId: 'nom-riya',
    nomineeName: 'Riya Ambade (Sister)',
    status: 'eligible_after_continuity',
    ruleDescription: 'Access granted only upon verified continuity claim approval.',
    lastUpdated: 'Oct 24, 2026'
  },
  {
    id: 'rule-02',
    serviceId: 'srv-google',
    serviceName: 'Google Workspace',
    categoryId: 'cat-g-docs',
    categoryName: 'Drive Documents & Records',
    groupId: 'grp-docs',
    groupName: 'Official Documents',
    nomineeId: 'nom-arjun',
    nomineeName: 'Arjun Mehta (Partner)',
    status: 'eligible_after_continuity',
    ruleDescription: 'Requires dual-custodian verification or official documentation.',
    lastUpdated: 'Oct 20, 2026'
  },
  {
    id: 'rule-03',
    serviceId: 'srv-google',
    serviceName: 'Google Workspace',
    categoryId: 'cat-g-gmail',
    categoryName: 'Private Email Threads (Gmail)',
    nomineeName: 'None (Inviolable)',
    status: 'excluded',
    ruleDescription: 'Locked by default. Automatic cryptographic deletion metadata on trigger.',
    lastUpdated: 'Oct 12, 2026'
  },
  {
    id: 'rule-04',
    serviceId: 'srv-apple',
    serviceName: 'Apple iCloud',
    categoryId: 'cat-a-photos',
    categoryName: 'iCloud Shared Photos',
    groupId: 'grp-memories',
    groupName: 'Photos & Memories',
    nomineeId: 'nom-riya',
    nomineeName: 'Riya Ambade (Sister)',
    status: 'eligible_after_continuity',
    ruleDescription: 'Transfers via Apple Legacy Access token upon verification.',
    lastUpdated: 'Oct 24, 2026'
  },
  {
    id: 'rule-05',
    serviceId: 'srv-apple',
    serviceName: 'Apple iCloud',
    categoryId: 'cat-a-keychain',
    categoryName: 'iCloud Keychain & Passwords',
    nomineeName: 'None (Inviolable)',
    status: 'excluded',
    ruleDescription: 'Cryptographically locked. Passwords cannot be transferred.',
    lastUpdated: 'Oct 12, 2026'
  },
  {
    id: 'rule-06',
    serviceId: 'srv-instagram',
    serviceName: 'Instagram',
    categoryId: 'cat-i-posts',
    categoryName: 'Published Posts & Feed Highlights',
    groupId: 'grp-social',
    groupName: 'Social Media',
    nomineeId: 'nom-riya',
    nomineeName: 'Riya Ambade (Sister)',
    status: 'eligible_after_continuity',
    ruleDescription: 'Permits memorialization and download of public posts.',
    lastUpdated: 'Oct 02, 2026'
  },
  {
    id: 'rule-07',
    serviceId: 'srv-instagram',
    serviceName: 'Instagram',
    categoryId: 'cat-i-dms',
    categoryName: 'Direct Messages & Private Chats',
    nomineeName: 'None (Inviolable)',
    status: 'excluded',
    ruleDescription: 'Private communications permanently excluded by policy.',
    lastUpdated: 'Oct 02, 2026'
  }
];

export const INITIAL_CLAIMS: ContinuityClaim[] = [
  {
    id: 'clm-2026-01',
    claimantName: 'Kavita Rao',
    claimantEmail: 'kavita.rao@consulting.in',
    relationship: 'Family Legal Representative',
    submissionDate: 'Oct 27, 2026',
    mockDocumentName: 'simulated_legal_authority_affidavit.pdf',
    status: 'under_review',
    reviewNotes: 'Claimant submitted emergency inquiry regarding official health records.',
    requestedInfoNote: 'Requires simulated demo documentation: mock power-of-attorney or executor affidavit.',
    reviewedDate: 'Oct 28, 2026'
  }
];

export const INITIAL_SECURITY_SESSIONS: SecuritySession[] = [
  {
    id: 'sess-01',
    device: 'Apple MacBook Pro 16" (M3)',
    browser: 'Google Chrome 155.0',
    location: 'Mumbai, India',
    ipAddress: '142.250.190.46',
    lastActive: 'Just now (Active)',
    isCurrent: true
  },
  {
    id: 'sess-02',
    device: 'Apple iPhone 15 Pro',
    browser: 'Mobile Safari 18.1',
    location: 'Mumbai, India',
    ipAddress: '142.250.190.48',
    lastActive: '2 hours ago',
    isCurrent: false
  },
  {
    id: 'sess-03',
    device: 'Apple iPad Air (5th Gen)',
    browser: 'Safari for iPadOS',
    location: 'Pune, India',
    ipAddress: '14.139.122.9',
    lastActive: '4 days ago',
    isCurrent: false
  }
];

export const INITIAL_AUDIT_EVENTS: AuditEvent[] = [
  {
    id: 'aud-01',
    timestamp: 'Oct 28, 2026 • 18:30',
    action: 'Nominee Invitation Dispatched',
    category: 'nominee',
    details: 'Dispatched simulated verification email to Dr. Sunita Ambade (sunita.ambade@hospital.org).',
    severity: 'info'
  },
  {
    id: 'aud-02',
    timestamp: 'Oct 24, 2026 • 14:15',
    action: 'Nominee Email Verified',
    category: 'nominee',
    details: 'Riya Ambade completed email verification with demo code VAULT-8492. Access remains inactive.',
    severity: 'info'
  },
  {
    id: 'aud-03',
    timestamp: 'Oct 24, 2026 • 14:10',
    action: 'Service Scopes Configured',
    category: 'permission',
    details: 'Scoped Google Photos & Videos assigned to Riya Ambade under Photos & Memories group.',
    severity: 'info'
  },
  {
    id: 'aud-04',
    timestamp: 'Oct 20, 2026 • 09:12',
    action: 'Two-Factor Authentication Confirmed',
    category: 'security',
    details: 'Biometric passkey verified on primary MacBook device.',
    severity: 'security'
  },
  {
    id: 'aud-05',
    timestamp: 'Oct 12, 2026 • 18:00',
    action: 'Zero-Trust Default Boundary Enforced',
    category: 'permission',
    details: 'Gmail Private Threads and iCloud Keychain permanently marked LOCKED BY DEFAULT.',
    severity: 'warning'
  },
  {
    id: 'aud-06',
    timestamp: 'Sep 28, 2026 • 11:30',
    action: 'External Service Connected',
    category: 'connection',
    details: 'Connected Dropbox account (vidhi.creative@gmail.com) via read-only metadata scope.',
    severity: 'info'
  }
];

