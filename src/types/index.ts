export type ServiceStatus = 'connected' | 'not_connected' | 'needs_review';

export interface ServiceCategory {
  id: string;
  serviceId: string;
  name: string;
  description: string;
  isSupportedByProvider: boolean;
  isIncluded: boolean;
  isExcludedByDefault: boolean; // True for private chats, passwords
  assignedNomineeId?: string;
  assignedNomineeName?: string;
  assignedGroupId?: string;
  assignedGroupName?: string;
  scopeNote?: string;
}

export interface ServiceItem {
  id: string;
  name: string;
  slug: string;
  iconName: string;
  categoryType: 'cloud_storage' | 'social_media' | 'work_productivity' | 'messaging' | 'financial_portal';
  status: ServiceStatus;
  connectedEmail?: string;
  lastReviewed?: string;
  description: string;
  providerAuthName: string;
  scopesRequested: string[];
  architecturalExclusions: string[];
  categories: ServiceCategory[];
}

export type NomineeVerificationStatus = 'verified' | 'pending' | 'uninvited';
export type NomineeAccessStatus = 'inactive_lifetime' | 'under_review' | 'active_continuity';

export interface Nominee {
  id: string;
  name: string;
  email: string;
  relationship: string;
  verificationStatus: NomineeVerificationStatus;
  accessStatus: NomineeAccessStatus;
  assignedCategories: string[]; // Category names or IDs
  demoVerificationCode: string; // Fictional code for demo simulation (e.g. "VAULT-8492")
  invitedDate?: string;
  verifiedDate?: string;
  avatarInitials: string;
}

export interface ServiceGroup {
  id: string;
  name: string;
  description: string;
  iconName: string;
  serviceIds: string[];
  assignedNomineeIds: string[];
  inheritedCategories: string[];
}

export interface AccessRule {
  id: string;
  serviceId: string;
  serviceName: string;
  categoryId: string;
  categoryName: string;
  groupId?: string;
  groupName?: string;
  nomineeId?: string;
  nomineeName: string;
  status: 'eligible_after_continuity' | 'excluded' | 'manual_review';
  ruleDescription: string;
  lastUpdated: string;
}

export type ClaimStatus = 'submitted' | 'under_review' | 'needs_info' | 'approved' | 'rejected';

export interface ContinuityClaim {
  id: string;
  claimantName: string;
  claimantEmail: string;
  relationship: string;
  submissionDate: string;
  mockDocumentName: string;
  status: ClaimStatus;
  reviewNotes: string;
  requestedInfoNote?: string;
  reviewedDate?: string;
}

export interface SecuritySession {
  id: string;
  device: string;
  browser: string;
  location: string;
  ipAddress: string;
  lastActive: string;
  isCurrent: boolean;
}

export interface AuditEvent {
  id: string;
  timestamp: string;
  action: string;
  category: 'connection' | 'permission' | 'nominee' | 'security' | 'claim';
  details: string;
  severity: 'info' | 'security' | 'warning';
}

export type ActiveView = 
  | 'dashboard'
  | 'connected_services'
  | 'service_detail'
  | 'groups'
  | 'nominees'
  | 'access_rules'
  | 'continuity_plan'
  | 'security'
  | 'activity'
  | 'settings'
  | 'login'
  | 'signup'
  | 'two_factor';

