import React, { useState, useEffect } from 'react';
import { 
  ServiceItem, 
  Nominee, 
  ServiceGroup, 
  AccessRule, 
  ContinuityClaim, 
  SecuritySession, 
  AuditEvent, 
  ActiveView,
  ClaimStatus
} from './types';
import { 
  INITIAL_SERVICES, 
  INITIAL_NOMINEES, 
  INITIAL_GROUPS, 
  INITIAL_ACCESS_RULES, 
  INITIAL_CLAIMS, 
  INITIAL_SECURITY_SESSIONS, 
  INITIAL_AUDIT_EVENTS 
} from './data/mockData';

import { AppShell } from './components/layout/AppShell';

// Views
import { DashboardView } from './views/DashboardView';
import { ConnectedServicesView } from './views/ConnectedServicesView';
import { ServiceDetailsView } from './views/ServiceDetailsView';
import { GroupsView } from './views/GroupsView';
import { NomineesView } from './views/NomineesView';
import { AccessRulesView } from './views/AccessRulesView';
import { ContinuityPlanView } from './views/ContinuityPlanView';
import { SecurityView } from './views/SecurityView';
import { ActivityView } from './views/ActivityView';
import { SettingsView } from './views/SettingsView';
import { AuthView } from './views/AuthView';
import { OnboardingModal } from './components/onboarding/OnboardingModal';
import { Toast } from './components/common/Toast';

// Modals
import { ServiceConnectorModal } from './components/modals/ServiceConnectorModal';
import { AddNomineeModal } from './components/modals/AddNomineeModal';
import { NomineeVerificationModal } from './components/modals/NomineeVerificationModal';
import { ClaimSimulatorModal } from './components/modals/ClaimSimulatorModal';
import { AuthModal } from './components/auth/AuthModal';

export const App: React.FC = () => {
  // Persistent State
  const [services, setServices] = useState<ServiceItem[]>(() => {
    const saved = localStorage.getItem('myvault_services');
    if (!saved) return INITIAL_SERVICES;
    try {
      const parsed: ServiceItem[] = JSON.parse(saved);
      const existingIds = new Set(parsed.map(s => s.id));
      const missing = INITIAL_SERVICES.filter(s => !existingIds.has(s.id));
      return [...parsed, ...missing];
    } catch {
      return INITIAL_SERVICES;
    }
  });

  const [nominees, setNominees] = useState<Nominee[]>(() => {
    const saved = localStorage.getItem('myvault_nominees');
    return saved ? JSON.parse(saved) : INITIAL_NOMINEES;
  });

  const [groups, setGroups] = useState<ServiceGroup[]>(() => {
    const saved = localStorage.getItem('myvault_groups');
    return saved ? JSON.parse(saved) : INITIAL_GROUPS;
  });

  const [rules, setRules] = useState<AccessRule[]>(() => {
    const saved = localStorage.getItem('myvault_rules');
    return saved ? JSON.parse(saved) : INITIAL_ACCESS_RULES;
  });

  const [claims, setClaims] = useState<ContinuityClaim[]>(() => {
    const saved = localStorage.getItem('myvault_claims');
    return saved ? JSON.parse(saved) : INITIAL_CLAIMS;
  });

  const [sessions, setSessions] = useState<SecuritySession[]>(() => {
    const saved = localStorage.getItem('myvault_sessions');
    return saved ? JSON.parse(saved) : INITIAL_SECURITY_SESSIONS;
  });

  const [auditLog, setAuditLog] = useState<AuditEvent[]>(() => {
    const saved = localStorage.getItem('myvault_audit_log');
    return saved ? JSON.parse(saved) : INITIAL_AUDIT_EVENTS;
  });

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('myvault_services', JSON.stringify(services));
  }, [services]);

  useEffect(() => {
    localStorage.setItem('myvault_nominees', JSON.stringify(nominees));
  }, [nominees]);

  useEffect(() => {
    localStorage.setItem('myvault_groups', JSON.stringify(groups));
  }, [groups]);

  useEffect(() => {
    localStorage.setItem('myvault_rules', JSON.stringify(rules));
  }, [rules]);

  useEffect(() => {
    localStorage.setItem('myvault_claims', JSON.stringify(claims));
  }, [claims]);

  useEffect(() => {
    localStorage.setItem('myvault_sessions', JSON.stringify(sessions));
  }, [sessions]);

  useEffect(() => {
    localStorage.setItem('myvault_audit_log', JSON.stringify(auditLog));
  }, [auditLog]);

  const getInitialView = (): ActiveView => {
    try {
      const params = new URLSearchParams(window.location.search);
      const v = params.get('view') as ActiveView;
      const validViews: ActiveView[] = [
        'dashboard', 'connected_services', 'service_detail', 'groups', 
        'nominees', 'access_rules', 'continuity_plan', 'security', 'activity', 'settings',
        'login', 'signup', 'two_factor'
      ];
      if (v && validViews.includes(v)) return v;
      const hash = window.location.hash.replace('#', '') as ActiveView;
      if (hash && validViews.includes(hash)) return hash;
    } catch (e) {}
    return 'dashboard';
  };

  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    try {
      const v = new URLSearchParams(window.location.search).get('view');
      if (v === 'login' || v === 'signup' || v === 'two_factor') return false;
      return localStorage.getItem('myvault_authenticated') !== 'false';
    } catch {
      return true;
    }
  });

  const [isOnboardingOpen, setIsOnboardingOpen] = useState<boolean>(() => {
    try {
      return new URLSearchParams(window.location.search).get('onboarding') === 'true';
    } catch {
      return false;
    }
  });

  // Navigation & Search State
  const [activeView, setActiveView] = useState<ActiveView>(getInitialView);
  const [selectedServiceId, setSelectedServiceId] = useState<string>('srv-google');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleNavigate = (view: ActiveView) => {
    setActiveView(view);
    try {
      const url = new URL(window.location.href);
      url.searchParams.set('view', view);
      window.history.pushState({}, '', url.toString());
    } catch (e) {}
  };

  const handleLoginSuccess = (isNewUser?: boolean) => {
    setIsAuthenticated(true);
    localStorage.setItem('myvault_authenticated', 'true');
    handleNavigate('dashboard');
    if (isNewUser) {
      setIsOnboardingOpen(true);
    }
    showToast('Authenticated as Vault Owner (Vidhi Ambade)');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.setItem('myvault_authenticated', 'false');
    handleNavigate('login');
    showToast('Logged out of My Vault session', 'info');
  };

  useEffect(() => {
    const handlePopState = () => {
      setActiveView(getInitialView());
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Modals State
  const [isConnectModalOpen, setIsConnectModalOpen] = useState(() => {
    try { return new URLSearchParams(window.location.search).get('modal') === 'connect'; } catch { return false; }
  });
  const [connectModalProvider, setConnectModalProvider] = useState<string | undefined>(undefined);
  const [isAddNomineeModalOpen, setIsAddNomineeModalOpen] = useState(() => {
    try { return new URLSearchParams(window.location.search).get('modal') === 'nominee'; } catch { return false; }
  });
  const [editingNominee, setEditingNominee] = useState<Nominee | null>(null);
  const [verificationNominee, setVerificationNominee] = useState<Nominee | null>(() => {
    try { 
      return new URLSearchParams(window.location.search).get('modal') === 'verify' ? INITIAL_NOMINEES[0] : null; 
    } catch { return null; }
  });
  const [isClaimSimulatorOpen, setIsClaimSimulatorOpen] = useState(() => {
    try { return new URLSearchParams(window.location.search).get('modal') === 'claim'; } catch { return false; }
  });
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(() => {
    try { return new URLSearchParams(window.location.search).get('modal') === 'auth'; } catch { return false; }
  });

  // Toast Notification State
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' | 'warning' } | null>(null);

  const showToast = (message: string, type: 'success' | 'info' | 'warning' = 'success') => {
    setToast({ message, type });
  };

  const addAuditEvent = (action: string, category: AuditEvent['category'], details: string, severity: AuditEvent['severity'] = 'info') => {
    const newEvent: AuditEvent = {
      id: `evt-${Date.now()}`,
      timestamp: 'Just now',
      action,
      category,
      details,
      severity
    };
    setAuditLog(prev => [newEvent, ...prev]);
  };

  // Handlers
  const handleConnectService = (newService: ServiceItem) => {
    setServices(prev => {
      const exists = prev.some(s => s.slug === newService.slug);
      if (exists) {
        return prev.map(s => s.slug === newService.slug ? newService : s);
      }
      return [...prev, newService];
    });

    // Also update rules matrix
    const newRules: AccessRule[] = newService.categories.map(cat => ({
      id: `rule-${newService.slug}-${cat.id}`,
      serviceId: newService.id,
      serviceName: newService.name,
      categoryId: cat.id,
      categoryName: cat.name,
      nomineeName: cat.assignedNomineeName || (cat.isExcludedByDefault ? 'None (Strictly Locked)' : 'Unassigned'),
      status: cat.isExcludedByDefault ? 'excluded' : (cat.isIncluded ? 'eligible_after_continuity' : 'excluded'),
      ruleDescription: cat.isExcludedByDefault ? 'Zero-knowledge architectural exclusion.' : 'Eligible after certified continuity claim.',
      lastUpdated: 'Just now'
    }));

    setRules(prev => [...newRules, ...prev.filter(r => r.serviceName !== newService.name)]);
    addAuditEvent('Connected Service Platform', 'connection', `Linked ${newService.name} (${newService.connectedEmail})`);
    showToast(`Successfully connected ${newService.name}`);
  };

  const handleOpenConnectModal = (providerSlug?: string) => {
    setConnectModalProvider(providerSlug);
    setIsConnectModalOpen(true);
  };

  const handleDisconnectService = (serviceId: string) => {
    const service = services.find(s => s.id === serviceId);
    if (!service) return;

    // Transition status to not_connected and clear inclusions rather than deleting the service
    setServices(prev => prev.map(s => {
      if (s.id === serviceId) {
        return {
          ...s,
          status: 'not_connected' as const,
          connectedEmail: '',
          lastReviewed: 'Unlinked',
          categories: s.categories.map(c => ({
            ...c,
            isIncluded: false,
            assignedNomineeId: undefined,
            assignedNomineeName: undefined
          }))
        };
      }
      return s;
    }));

    setRules(prev => prev.filter(r => r.serviceId !== serviceId));
    addAuditEvent('Disconnected Service Platform', 'connection', `Unlinked ${service.name} and revoked OAuth credentials.`, 'warning');
    showToast(`Disconnected ${service.name}`, 'warning');

    if (activeView === 'service_detail') {
      setActiveView('connected_services');
    }
  };

  const handleUpdateService = (updatedService: ServiceItem) => {
    setServices(prev => prev.map(s => s.id === updatedService.id ? updatedService : s));

    // Synchronize access rules matrix
    setRules(prev => {
      return prev.map(r => {
        if (r.serviceId === updatedService.id) {
          const matchingCat = updatedService.categories.find(c => c.id === r.categoryId || c.name === r.categoryName);
          if (matchingCat) {
            return {
              ...r,
              nomineeId: matchingCat.assignedNomineeId,
              nomineeName: matchingCat.assignedNomineeName || (matchingCat.isExcludedByDefault ? 'None (Inviolable)' : 'Unassigned'),
              status: matchingCat.isExcludedByDefault ? ('excluded' as const) : (matchingCat.isIncluded ? ('eligible_after_continuity' as const) : ('excluded' as const)),
              lastUpdated: 'Just now'
            };
          }
        }
        return r;
      });
    });

    // Synchronize nominees' assigned categories lists
    setNominees(prev => prev.map(n => {
      const assignedFromThisService = updatedService.categories
        .filter(c => !c.isExcludedByDefault && c.isIncluded && (c.assignedNomineeId === n.id || c.assignedNomineeName === n.name))
        .map(c => c.name);

      const otherCategories = n.assignedCategories.filter(catName => 
        !updatedService.categories.some(c => c.name === catName)
      );

      return {
        ...n,
        assignedCategories: Array.from(new Set([...otherCategories, ...assignedFromThisService]))
      };
    }));

    addAuditEvent('Updated Service Permissions', 'permission', `Modified category inclusion rules for ${updatedService.name}`);
    showToast(`Updated permissions for ${updatedService.name}`);
  };

  const handleOpenAddNomineeModal = () => {
    setEditingNominee(null);
    setIsAddNomineeModalOpen(true);
  };

  const handleOpenEditNomineeModal = (nominee: Nominee) => {
    setEditingNominee(nominee);
    setIsAddNomineeModalOpen(true);
  };

  const handleSaveNominee = (
    nominee: Nominee,
    assignedGroupIds: string[],
    assignedCategoryNames: string[]
  ) => {
    const isEdit = nominees.some(n => n.id === nominee.id);

    // 1. Update Nominees state
    setNominees(prev => {
      if (isEdit) {
        return prev.map(n => n.id === nominee.id ? nominee : n);
      }
      return [...prev, nominee];
    });

    // 2. Synchronize Groups state
    setGroups(prev => prev.map(g => {
      const isSelected = assignedGroupIds.includes(g.id);
      const hasNominee = g.assignedNomineeIds.includes(nominee.id);
      if (isSelected && !hasNominee) {
        return { ...g, assignedNomineeIds: [...g.assignedNomineeIds, nominee.id] };
      }
      if (!isSelected && hasNominee) {
        return { ...g, assignedNomineeIds: g.assignedNomineeIds.filter(id => id !== nominee.id) };
      }
      return g;
    }));

    // 3. Synchronize Services state (categories)
    setServices(prev => prev.map(s => {
      let changed = false;
      const updatedCategories = s.categories.map(c => {
        if (c.isExcludedByDefault) return c; // Strict zero-knowledge invariant

        const isAssignedToThis = assignedCategoryNames.includes(c.name);
        const wasAssignedToThis = c.assignedNomineeId === nominee.id || c.assignedNomineeName === nominee.name;

        if (isAssignedToThis) {
          changed = true;
          return {
            ...c,
            isIncluded: true,
            assignedNomineeId: nominee.id,
            assignedNomineeName: nominee.name
          };
        } else if (wasAssignedToThis) {
          changed = true;
          return {
            ...c,
            assignedNomineeId: undefined,
            assignedNomineeName: undefined
          };
        }
        return c;
      });

      return changed ? { ...s, categories: updatedCategories } : s;
    }));

    // 4. Synchronize Rules matrix
    setRules(prev => prev.map(r => {
      const isLocked = r.ruleDescription.toLowerCase().includes('zero-knowledge') || 
                       r.nomineeName.includes('Inviolable');
      if (isLocked) return r;

      const isAssignedToThis = assignedCategoryNames.includes(r.categoryName);
      const wasAssignedToThis = r.nomineeId === nominee.id || r.nomineeName === nominee.name;

      if (isAssignedToThis) {
        return {
          ...r,
          nomineeId: nominee.id,
          nomineeName: nominee.name,
          status: 'eligible_after_continuity' as const,
          lastUpdated: 'Just now'
        };
      } else if (wasAssignedToThis) {
        return {
          ...r,
          nomineeId: undefined,
          nomineeName: 'Unassigned',
          lastUpdated: 'Just now'
        };
      }
      return r;
    }));

    if (isEdit) {
      addAuditEvent('Updated Nominee Scopes', 'nominee', `Modified assigned categories and delegations for ${nominee.name}`);
      showToast(`Updated permissions for ${nominee.name}`);
    } else {
      addAuditEvent('Invited Trusted Nominee', 'nominee', `Issued identity challenge invitation to ${nominee.name} (${nominee.email})`);
      showToast(`Nomination invite dispatched to ${nominee.name}`);
      // Open verification modal immediately for demo convenience
      setVerificationNominee(nominee);
    }
  };

  const handleVerifyNominee = (nomineeId: string) => {
    setNominees(prev => prev.map(n => n.id === nomineeId ? {
      ...n,
      verificationStatus: 'verified',
      accessStatus: 'inactive_lifetime', // Strictly inactive during lifetime
      verifiedDate: 'Today'
    } : n));
    const nominee = nominees.find(n => n.id === nomineeId);
    addAuditEvent('Verified Nominee Token', 'nominee', `${nominee?.name || 'Nominee'} verified email with demo challenge code.`);
    showToast(`Email verified for ${nominee?.name || 'Nominee'}! Lifetime access remains inactive.`);
  };

  const handleDeleteNominee = (nomineeId: string) => {
    const nominee = nominees.find(n => n.id === nomineeId);
    setNominees(prev => prev.filter(n => n.id !== nomineeId));

    // Clear from services
    setServices(prev => prev.map(s => ({
      ...s,
      categories: s.categories.map(c => c.assignedNomineeId === nomineeId ? {
        ...c,
        assignedNomineeId: undefined,
        assignedNomineeName: undefined
      } : c)
    })));

    // Clear from rules
    setRules(prev => prev.map(r => (r.nomineeId === nomineeId || r.nomineeName === nominee?.name) ? {
      ...r,
      nomineeId: undefined,
      nomineeName: 'Unassigned',
      lastUpdated: 'Just now'
    } : r));

    // Clear from groups
    setGroups(prev => prev.map(g => ({
      ...g,
      assignedNomineeIds: g.assignedNomineeIds.filter(id => id !== nomineeId)
    })));

    addAuditEvent('Revoked Nominee', 'nominee', `Removed ${nominee?.name || 'nominee'} from trusted circle.`, 'warning');
    showToast(`Revoked nomination for ${nominee?.name || 'Nominee'}`, 'info');
  };

  const handleCreateGroup = (newGroup: ServiceGroup) => {
    setGroups(prev => [...prev, newGroup]);

    // Update services categories with group assignment
    setServices(prev => prev.map(s => {
      if (newGroup.serviceIds.includes(s.id)) {
        return {
          ...s,
          categories: s.categories.map(c => ({
            ...c,
            assignedGroupId: newGroup.id,
            assignedGroupName: newGroup.name
          }))
        };
      }
      return s;
    }));

    // Update rules matching services in this group
    setRules(prev => prev.map(r => {
      const matchSrv = services.find(s => s.name === r.serviceName);
      if (matchSrv && newGroup.serviceIds.includes(matchSrv.id)) {
        return {
          ...r,
          groupId: newGroup.id,
          groupName: newGroup.name
        };
      }
      return r;
    }));

    addAuditEvent('Created Service Group', 'permission', `Created service cluster "${newGroup.name}" with ${newGroup.serviceIds.length} services.`);
    showToast(`Created group "${newGroup.name}"`);
  };

  const handleUpdateGroup = (updatedGroup: ServiceGroup) => {
    setGroups(prev => prev.map(g => g.id === updatedGroup.id ? updatedGroup : g));

    // Update services
    setServices(prev => prev.map(s => {
      const isInGroup = updatedGroup.serviceIds.includes(s.id);
      return {
        ...s,
        categories: s.categories.map(c => {
          if (isInGroup) {
            return {
              ...c,
              assignedGroupId: updatedGroup.id,
              assignedGroupName: updatedGroup.name
            };
          } else if (c.assignedGroupId === updatedGroup.id) {
            return {
              ...c,
              assignedGroupId: undefined,
              assignedGroupName: undefined
            };
          }
          return c;
        })
      };
    }));

    // Update rules
    setRules(prev => prev.map(r => {
      const matchSrv = services.find(s => s.name === r.serviceName);
      if (matchSrv && updatedGroup.serviceIds.includes(matchSrv.id)) {
        return {
          ...r,
          groupId: updatedGroup.id,
          groupName: updatedGroup.name
        };
      } else if (r.groupId === updatedGroup.id) {
        return {
          ...r,
          groupId: undefined,
          groupName: undefined
        };
      }
      return r;
    }));

    addAuditEvent('Updated Service Group', 'permission', `Modified cluster configuration for "${updatedGroup.name}".`);
    showToast(`Updated group "${updatedGroup.name}"`);
  };

  const handleDeleteGroup = (groupId: string) => {
    const grp = groups.find(g => g.id === groupId);
    setGroups(prev => prev.filter(g => g.id !== groupId));

    setServices(prev => prev.map(s => ({
      ...s,
      categories: s.categories.map(c => c.assignedGroupId === groupId ? {
        ...c,
        assignedGroupId: undefined,
        assignedGroupName: undefined
      } : c)
    })));

    setRules(prev => prev.map(r => r.groupId === groupId ? {
      ...r,
      groupId: undefined,
      groupName: undefined
    } : r));

    showToast(`Deleted group "${grp?.name || 'group'}"`, 'info');
  };

  const handleToggleRuleStatus = (ruleId: string) => {
    let affectedCategoryName = '';
    let isNowEligible = false;

    setRules(prev => prev.map(r => {
      if (r.id === ruleId) {
        const nextStatus = r.status === 'eligible_after_continuity' ? 'excluded' : 'eligible_after_continuity';
        affectedCategoryName = r.categoryName;
        isNowEligible = nextStatus === 'eligible_after_continuity';
        return { ...r, status: nextStatus, lastUpdated: 'Just now' };
      }
      return r;
    }));

    if (affectedCategoryName) {
      setServices(prev => prev.map(s => ({
        ...s,
        categories: s.categories.map(c => c.name === affectedCategoryName ? {
          ...c,
          isIncluded: isNowEligible
        } : c)
      })));
    }

    showToast('Updated continuity access rule');
  };

  const handleReassignNomineeInRule = (ruleId: string, nomineeId: string) => {
    const nominee = nominees.find(n => n.id === nomineeId);
    let affectedCategoryName = '';

    setRules(prev => prev.map(r => {
      if (r.id === ruleId) {
        affectedCategoryName = r.categoryName;
        return {
          ...r,
          nomineeId: nomineeId || undefined,
          nomineeName: nominee ? nominee.name : 'Unassigned',
          status: nominee ? ('eligible_after_continuity' as const) : ('excluded' as const),
          lastUpdated: 'Just now'
        };
      }
      return r;
    }));

    if (affectedCategoryName) {
      setServices(prev => prev.map(s => ({
        ...s,
        categories: s.categories.map(c => c.name === affectedCategoryName ? {
          ...c,
          assignedNomineeId: nomineeId || undefined,
          assignedNomineeName: nominee ? nominee.name : undefined,
          isIncluded: Boolean(nomineeId)
        } : c)
      })));

      setNominees(prev => prev.map(n => {
        if (nominee && n.id === nominee.id) {
          if (!n.assignedCategories.includes(affectedCategoryName)) {
            return { ...n, assignedCategories: [...n.assignedCategories, affectedCategoryName] };
          }
        } else if (n.assignedCategories.includes(affectedCategoryName)) {
          return { ...n, assignedCategories: n.assignedCategories.filter(cat => cat !== affectedCategoryName) };
        }
        return n;
      }));
    }

    showToast(nominee ? `Assigned ${nominee.name} to rule` : 'Removed nominee assignment');
  };

  const handleSubmitClaim = (newClaim: ContinuityClaim) => {
    setClaims(prev => [newClaim, ...prev]);
    addAuditEvent('Submitted Activation Claim', 'claim', `Claim filed by ${newClaim.claimantName} (${newClaim.relationship})`, 'warning');
    showToast(`Continuity claim #${newClaim.id} submitted for review`);
  };

  const handleUpdateClaimStatus = (claimId: string, status: ClaimStatus, note?: string) => {
    setClaims(prev => prev.map(c => {
      if (c.id === claimId) {
        return {
          ...c,
          status,
          reviewNotes: note || c.reviewNotes,
          reviewedDate: 'Just now'
        };
      }
      return c;
    }));

    addAuditEvent('Adjudicated Continuity Claim', 'claim', `Claim #${claimId} status updated to ${status.toUpperCase()}`);
    showToast(`Claim status updated to ${status.toUpperCase()}`);
  };

  const handleRevokeSession = (sessionId: string) => {
    setSessions(prev => prev.filter(s => s.id !== sessionId));
    addAuditEvent('Revoked Device Session', 'security', `Terminated authorized session token #${sessionId}`, 'security');
    showToast('Device session revoked');
  };

  const handleResetData = () => {
    localStorage.clear();
    setServices(INITIAL_SERVICES);
    setNominees(INITIAL_NOMINEES);
    setGroups(INITIAL_GROUPS);
    setRules(INITIAL_ACCESS_RULES);
    setClaims(INITIAL_CLAIMS);
    setSessions(INITIAL_SECURITY_SESSIONS);
    setAuditLog(INITIAL_AUDIT_EVENTS);
    showToast('Vault prototype state reset to initial defaults', 'info');
  };

  const handleSelectServiceForDetail = (serviceId: string) => {
    setSelectedServiceId(serviceId);
    handleNavigate('service_detail');
  };

  // Active service for detail view
  const activeService = services.find(s => s.id === selectedServiceId) || services[0];

  if (!isAuthenticated || activeView === 'login' || activeView === 'signup' || activeView === 'two_factor') {
    return (
      <>
        <AuthView
          initialStage={activeView === 'signup' ? 'signup' : (activeView === 'two_factor' ? 'two_factor' : 'signin')}
          onLoginSuccess={handleLoginSuccess}
        />
        {toast && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast(null)}
          />
        )}
      </>
    );
  }

  return (
    <AppShell
      activeView={activeView}
      searchQuery={searchQuery}
      onSearchChange={setSearchQuery}
      onNavigate={handleNavigate}
      onOpenConnectModal={() => setIsConnectModalOpen(true)}
      onOpenAuthModal={() => setIsAuthModalOpen(true)}
      onLogout={handleLogout}
      onOpenOnboarding={() => setIsOnboardingOpen(true)}
      toast={toast}
      onCloseToast={() => setToast(null)}
    >
      {activeView === 'dashboard' && (
        <DashboardView
          services={services}
          nominees={nominees}
          groups={groups}
          onNavigate={handleNavigate}
          onOpenConnectModal={handleOpenConnectModal}
          onOpenNomineeModal={handleOpenAddNomineeModal}
          onSelectServiceForDetail={handleSelectServiceForDetail}
        />
      )}

      {activeView === 'connected_services' && (
        <ConnectedServicesView
          services={services}
          onOpenConnectModal={handleOpenConnectModal}
          onSelectServiceForDetail={handleSelectServiceForDetail}
          onDisconnectService={handleDisconnectService}
        />
      )}

      {activeView === 'service_detail' && activeService && (
        <ServiceDetailsView
          service={activeService}
          nominees={nominees}
          onBack={() => setActiveView('connected_services')}
          onUpdateService={handleUpdateService}
          onDisconnectService={handleDisconnectService}
        />
      )}

      {activeView === 'groups' && (
        <GroupsView
          groups={groups}
          services={services}
          nominees={nominees}
          onCreateGroup={handleCreateGroup}
          onUpdateGroup={handleUpdateGroup}
          onDeleteGroup={handleDeleteGroup}
        />
      )}

      {activeView === 'nominees' && (
        <NomineesView
          nominees={nominees}
          groups={groups}
          onOpenAddNomineeModal={handleOpenAddNomineeModal}
          onOpenEditNomineeModal={handleOpenEditNomineeModal}
          onOpenVerificationModal={(nom) => setVerificationNominee(nom)}
          onDeleteNominee={handleDeleteNominee}
        />
      )}

      {activeView === 'access_rules' && (
        <AccessRulesView
          rules={rules}
          nominees={nominees}
          onToggleRuleStatus={handleToggleRuleStatus}
          onReassignNominee={handleReassignNomineeInRule}
        />
      )}

      {activeView === 'continuity_plan' && (
        <ContinuityPlanView
          claims={claims}
          onOpenClaimSimulator={() => setIsClaimSimulatorOpen(true)}
        />
      )}

      {activeView === 'security' && (
        <SecurityView
          sessions={sessions}
          onRevokeSession={handleRevokeSession}
        />
      )}

      {activeView === 'activity' && (
        <ActivityView
          events={auditLog}
        />
      )}

      {activeView === 'settings' && (
        <SettingsView
          services={services}
          nominees={nominees}
          groups={groups}
          rules={rules}
          onResetData={handleResetData}
          onLogout={handleLogout}
          onOpenOnboarding={() => setIsOnboardingOpen(true)}
          onOpen2FA={() => handleNavigate('two_factor')}
        />
      )}

      {/* Global Modals */}
      <ServiceConnectorModal
        isOpen={isConnectModalOpen}
        onClose={() => {
          setIsConnectModalOpen(false);
          setConnectModalProvider(undefined);
        }}
        onConnect={handleConnectService}
        existingServices={services}
        nominees={nominees}
        initialProviderSlug={connectModalProvider}
      />

      <AddNomineeModal
        isOpen={isAddNomineeModalOpen}
        onClose={() => {
          setIsAddNomineeModalOpen(false);
          setEditingNominee(null);
        }}
        onSaveNominee={handleSaveNominee}
        services={services}
        groups={groups}
        nomineeToEdit={editingNominee}
      />

      <NomineeVerificationModal
        isOpen={!!verificationNominee}
        onClose={() => setVerificationNominee(null)}
        nominee={verificationNominee}
        onVerifySuccess={handleVerifyNominee}
      />

      <ClaimSimulatorModal
        isOpen={isClaimSimulatorOpen}
        onClose={() => setIsClaimSimulatorOpen(false)}
        onSubmitClaim={handleSubmitClaim}
        existingClaims={claims}
        onUpdateClaimStatus={handleUpdateClaimStatus}
      />

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLoginSuccess={() => showToast('Authenticated as Vault Owner (Vidhi Ambade)')}
      />

      <OnboardingModal
        isOpen={isOnboardingOpen}
        onClose={() => setIsOnboardingOpen(false)}
        onComplete={() => {
          localStorage.setItem('myvault_onboarding_completed', 'true');
          showToast('Completed Onboarding Walkthrough! Welcome to My Vault.');
        }}
      />
    </AppShell>
  );
};
