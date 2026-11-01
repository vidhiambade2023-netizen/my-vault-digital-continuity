#!/usr/bin/env python3
"""
Slide Preview Renderer
Generates high-resolution 1920x1080 pixel previews for all 19 slides using
Google Chrome headless, matching the Swiss-modernist editorial bento visual reference.
"""

import os
import subprocess

OUTPUT_DIR = "/Users/vidhi/Desktop/uni/MIA a3/slide_previews"
os.makedirs(OUTPUT_DIR, exist_ok=True)

CHROME_BIN = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"

SLIDES_DATA = [
    # 01
    {
        "num": 1,
        "is_dark": False,
        "tag": "WELCOME • FINAL CASE STUDY",
        "title": "DIGITAL CONTINUITY HUB",
        "subtitle": "A Centralised Experience for Understanding Digital Footprints, Organising Personal Information, and Governing Selective Custodian Delegation.",
        "layout": "cover",
        "cards": [
            {
                "bg": "dark", "title": "Candidate Dossier", "badge": "STUDENT & PROJECT METADATA",
                "items": ["Student: Vidhi Ambade", "Programme: B.Des User Experience Design (Sem 7)", "Course: User Experience Design Project 5 (UEDP-5)", "Faculty Lead: Prof. Kriti Kusum", "Assessment: 45 Marks — UX Solution & Exhibition"]
            },
            {
                "bg": "sage", "title": "Design Inquiry", "badge": "CORE PROBLEM SPACE",
                "items": ["Focus Domain: Digital Legacy, Continuity & Data Privacy", "Core Premise: Fragmented lives across isolated cloud platforms", "Key Challenge: Access is not binary; users reject 'share-all'", "Proposed Direction: Centralised dashboard with granular boundaries", "Interaction Model: Least-privilege selective custodian access"]
            },
            {
                "bg": "slate", "title": "Deliverables Schedule", "badge": "ACADEMIC EVALUATION",
                "items": ["Case Study Deck: 19-Slide Research-to-Validation Journey", "Prototype: Figma Interactive Flow (34 Core States)", "Exhibition Panel: Large-Format A1 Summary Board", "Submission Date: October 30, 2026 (Moodle)", "Exhibition Jury: November 04, 2026 (Exhibition Display)"]
            }
        ]
    },
    # 02
    {
        "num": 2,
        "is_dark": False,
        "tag": "02 • PROJECT SNAPSHOT",
        "title": "Project Overview, Methodology & Scope Boundaries",
        "subtitle": "Executive framing of project domain, designer responsibilities, toolchain, and explicit non-goals.",
        "layout": "grid4",
        "cards": [
            {
                "bg": "dark", "title": "Domain & Ecosystem Context", "badge": "DESIGN INQUIRY",
                "items": ["Domain: Digital Legacy, Personal Data Governance & Service Continuity", "Nature of Work: UX, Interaction Design & Service Design Framework", "The Human Tension: Modern identity is scattered across Google, Apple, Meta and cloud drives with zero unified continuity planning."]
            },
            {
                "bg": "sage", "title": "Designer Role & Core Toolchain", "badge": "METHODOLOGY & ROLE",
                "items": ["Designer Role: Primary UX Researcher, Information Architect & UI Designer", "Primary Toolchain: Figma, Notion, Adobe Illustrator, Python-pptx, Testing Frameworks", "Scope Timeline: Assignment 2 Research Foundation → Assignment 3 Validated System"]
            },
            {
                "bg": "slate", "title": "The Proposed Intervention", "badge": "PRODUCT DEFINITION",
                "items": ["Concept: Centralised Digital Continuity Dashboard ('Continuity Hub')", "Value Proposition: A calm, dignified control centre to audit connected services, categorize records, and selectively nominate trusted custodians.", "Core Mental Model: Understand → Organise → Decide → Communicate → Continue"]
            },
            {
                "bg": "white", "title": "Architectural Non-Goals & Boundaries", "badge": "EXPLICIT BOUNDARIES",
                "items": ["Not an Estate Will: Does not execute legal asset distribution or probate.", "Not a Password Vault: Never stores master master passwords or bypasses encryption.", "Zero Scraping: Operates purely via authorized OAuth metadata scopes."]
            }
        ]
    },
    # 03
    {
        "num": 3,
        "is_dark": False,
        "tag": "03 • PROBLEM & OPPORTUNITY",
        "title": "The Fragmentation of Modern Digital Lives",
        "subtitle": "Addressing the tension between sprawling digital footprints and the absence of calm, selective continuity tools.",
        "layout": "col3",
        "cards": [
            {
                "bg": "sage", "title": "Assumptions vs Reality", "badge": "OBSERVED PROBLEM SPACE",
                "items": ["Initial Faculty Assumption: People need a 'digital will' to transfer all online accounts after death.", "Observed Research Reality: Users reject blanket transfer. They fear privacy invasion and struggle simply knowing what accounts exist.", "The Blindspot: The gap appears before legacy planning—people cannot organize what they cannot see.", "Cognitive Load: Managing 15+ logins across siloed apps induces severe procrastination."]
            },
            {
                "bg": "dark", "title": "The Trilemma of Accumulation", "badge": "CORE TENSIONS",
                "items": ["01. Platform Fragmentation: Photos in iCloud, taxes in Drive, chats in WhatsApp, finances in bank apps.", "02. The Binary Access Trap: Platforms offer all-or-nothing access: complete lockout or total account surrender.", "03. Morbid Avoidance: Existing death-oriented tools induce emotional paralysis and hesitation.", "04. Trust Hesitation: Users want family to have photos but dread exposing private message threads."]
            },
            {
                "bg": "slate", "title": "The Strategic Opportunity", "badge": "UX INTERVENTION",
                "items": ["Shift the Narrative: Reframe from morbid 'death planning' to calm, everyday digital continuity.", "Centralised Audit: Provide a single holistic map of active services and category readiness.", "Selective Scoping: Allow users to delegate family memories while keeping chats locked.", "Zero-Trust Architecture: Sensitive categories excluded by default with 2FA protection."]
            }
        ]
    },
    # 04
    {
        "num": 4,
        "is_dark": False,
        "tag": "04 • SECONDARY RESEARCH",
        "title": "Academic Literature & Real-World Precedents",
        "subtitle": "Synthesising peer-reviewed research, platform policy silos, and real-world legal access disputes.",
        "layout": "grid4",
        "cards": [
            {
                "bg": "white", "title": "Peer-Reviewed Literature Synthesis", "badge": "ACADEMIC CITATIONS",
                "items": ["ACM Systematic Literature Review (2023): Digital legacy encompasses identity, continuing bonds, relationships, and affective memory, not just legal passwords (doi: 10.1145/3610059).", "ScienceDirect Systematic Review (2026): Digital bereavement technologies carry severe risks of privacy violation, overreliance, and cultural mourning conflicts (doi: 10.1016/j.chb.2026)."]
            },
            {
                "bg": "sage", "title": "Platform Isolation & Policy Gaps", "badge": "EXISTING PLATFORM TOOLS",
                "items": ["Apple Legacy Contact (2026): Requires Apple ID, 256-bit access key, and death certificate approval. Strictly limited to Apple's ecosystem.", "Google Inactive Account Manager: Triggers after 3–18 months inactivity; relies on automated email alerts without cross-platform context."]
            },
            {
                "bg": "dark", "title": "Judicial Precedent: Gandhinagar Court Dispute", "badge": "REAL-WORLD CASE STUDY",
                "items": ["The Indian Express (2026): A deceased man's family petitioned a Gandhinagar civil court to access his locked iPhone and iCloud repository containing crucial family documents.", "Procedural Impasse: Platform refusal highlighted the painful technical, procedural, and legal barriers families face without pre-configured continuity."]
            },
            {
                "bg": "slate", "title": "Secondary Research Implications", "badge": "DESIGN IMPLICATIONS",
                "items": ["Access is Not Binary: Users must be able to share selected memories while excluding private messages.", "Emotional Boundaries: Tools must feel respectful, calm, and trustworthy rather than bureaucratic or macabre.", "Ecosystem Federation: The UX must bridge platform silos without violating individual service APIs."]
            }
        ]
    },
    # 05
    {
        "num": 5,
        "is_dark": False,
        "tag": "04 • PRIMARY RESEARCH",
        "title": "Research Methodology & Pilot Dataset Synthesis",
        "subtitle": "Transparent documentation of primary research instruments, interview protocol, and exploratory pilot data.",
        "layout": "metrics",
        "top_cards": [
            {
                "bg": "white", "title": "Research Instruments & Protocol", "badge": "PRIMARY METHODOLOGY",
                "items": ["Quantitative Google Form: 15 structured questions covering storage habits, privacy barriers, retrieval difficulty, and custodian preferences.", "Cross-Generational Protocol: 6 targeted interview angles: Student (15y), College (22y), Business (36y), Doctor (47y), Academic (52y), Senior (75y)."]
            },
            {
                "bg": "dark", "title": "Academic Integrity Disclosure", "badge": "RESEARCH TRANSPARENCY",
                "items": ["Pilot Model Disclosure: The quantitative metrics below reflect the structured exploratory pilot model (n=100) established for pattern analysis.", "Academic Honesty: Pilot data guides hypothesis generation; verified separate from live testing protocols."]
            }
        ],
        "metrics": [
            {"num": "82%", "label": "Multi-Platform Storage", "sub": "Store critical files across 3+ unlinked cloud services.", "bg": "sage"},
            {"num": "78%", "label": "Unaware of Concept", "sub": "Had never encountered the term 'digital legacy' prior to survey.", "bg": "sage"},
            {"num": "71%", "label": "Privacy as Barrier", "sub": "Cite disclosure of private chats as their #1 barrier to naming a custodian.", "bg": "dark"},
            {"num": "70%", "label": "Retrieval Friction", "sub": "Experience significant difficulty locating specific files from 3+ years ago.", "bg": "slate"}
        ]
    },
    # 06
    {
        "num": 6,
        "is_dark": False,
        "tag": "05 • DESIGN DIRECTION",
        "title": "Translating Insights into Design Principles",
        "subtitle": "Architectural concept exploration, tradeoff analysis, and justification of the centralised dashboard.",
        "layout": "col2",
        "cards": [
            {
                "bg": "sage", "title": "Core Design Principles", "badge": "SYSTEM PILLARS",
                "items": ["01. Selective Delegation: Access must never be all-or-nothing. Users configure permissions per category (e.g. photos vs legal certificates).", "02. Privacy-by-Default: High-risk items (private chats, passwords, search histories) are permanently locked by default.", "03. Plain-Language Scoping: Every permission state explains in plain language what a custodian can and cannot see.", "04. Zero-Friction Revocability: Users retain absolute sovereignty to modify, freeze, or revoke any permission instantly.", "05. Calm, Respectful Tone: Eliminates macabre death imagery; frames interaction around care, clarity, and organisation."]
            },
            {
                "bg": "dark", "title": "Concept Matrix & Direction Selection", "badge": "SELECTION RATIONALE",
                "items": ["Concept A: Browser Extension — Fragile, requires active browser session, fails to cover native mobile cloud services.", "Concept B: Physical USB Vault — High risk of hardware loss, rapidly becomes obsolete as accounts evolve.", "Concept C: Centralised Continuity Hub — SELECTED DIRECTION. Unifies multi-service overview, minimizes cognitive overhead, and enables centralized boundary governance.", "Technical Feasibility Boundary: The Hub does not clone or store file contents. It coordinates identity and permission scopes using OAuth."]
            }
        ]
    },
    # 07
    {
        "num": 7,
        "is_dark": False,
        "tag": "06 • EXPERIENCE STRUCTURE",
        "title": "Information Architecture & User Flow Blueprint",
        "subtitle": "System topology connecting authentication, service aggregation, category scoping, and custodian release.",
        "layout": "col2",
        "cards": [
            {
                "bg": "slate", "title": "System Information Architecture (IA)", "badge": "STRUCTURAL HIERARCHY",
                "items": ["1. Overview & Health: Continuity readiness score, connected account status, security alerts.", "2. Connected Services: Cloud drives, photo vaults, communication accounts, subscriptions.", "3. Asset Categories: Family Memories, Official Documents, Financial Portals, Continuity Notes.", "4. Trusted Circle: Nominated custodians, identity verification, assigned scopes.", "5. Permission Engine: Category-to-person matrix with explicit exclusion toggles.", "6. Release Triggers: Inactivity countdowns, multi-factor pings, dual-verification.", "7. Security & 2FA: Biometrics, passkey management, cryptographic activity audit."]
            },
            {
                "bg": "white", "title": "Primary End-to-End User Flow", "badge": "STEP-BY-STEP INTERACTION",
                "items": ["Step 1: Secure Onboarding — Biometric / 2FA account setup establishing primary ownership.", "Step 2: Connect External Accounts — Scoped OAuth link for Google, Apple, or OneDrive.", "Step 3: Define Category Boundaries — Lock sensitive folders (chats/finances) by default.", "Step 4: Nominate Trusted Custodian — Assign specific contact details and relationship role.", "Step 5: Configure Release Trigger — Select inactivity period (e.g. 90 days) & verification method.", "Step 6: Audit & Continuous Control — Receive periodic health check-ins with one-click revocation."]
            }
        ]
    },
    # 08
    {
        "num": 8,
        "is_dark": False,
        "tag": "07 • EARLY EXPLORATION",
        "title": "Low-Fidelity Wireframes & Mental Models",
        "subtitle": "Evaluating architectural navigation paradigms: Service-Centric vs. Person-Centric vs. Hybrid Bento Dashboard.",
        "layout": "col3",
        "cards": [
            {
                "bg": "slate", "title": "Concept 1: Service-Centric", "badge": "EXPLORATION A",
                "items": ["Model: Organized around individual platforms (Google, Apple, Meta).", "Wireframe Pattern: Vertical list of apps with individual permission toggles.", "Usability Friction: Forces users to replicate privacy rules across 10+ accounts.", "Verdict: High mental fatigue; fails to provide a cohesive continuity overview."]
            },
            {
                "bg": "slate", "title": "Concept 2: Person-Centric", "badge": "EXPLORATION B",
                "items": ["Model: Organized around nominated individuals (Partner, Sibling).", "Wireframe Pattern: Custodian profile cards with attached asset folders.", "Usability Friction: Obscures unassigned digital assets and service health.", "Verdict: Fails to help users understand their total digital footprint."]
            },
            {
                "bg": "dark", "title": "Concept 3: Hybrid Bento Dashboard", "badge": "SELECTED ARCHITECTURE",
                "items": ["Model: Unified overview balancing service health, categories, and custodians.", "Wireframe Pattern: Modular bento grid with readiness score and privacy shield.", "Key Advantage: Immediate visual clarity on what is protected vs what needs attention.", "Design Selection: Reduces cognitive anxiety while maintaining rigorous control."]
            }
        ]
    },
    # 09
    {
        "num": 9,
        "is_dark": False,
        "tag": "08 • ROUND 1 TESTING",
        "title": "Low-Fidelity Usability Testing Protocol (Planned)",
        "subtitle": "A structured, hypothesis-driven testing protocol designed for low-fidelity concept validation.",
        "layout": "col3",
        "cards": [
            {
                "bg": "white", "title": "Core Usability Tasks", "badge": "EVALUATION SCENARIOS",
                "items": ["Task 1: Scoped Cloud Connect — Connect Google Drive while ensuring WhatsApp backups and personal emails remain unlinked.", "Task 2: Selective Nomination — Designate a sibling as 'Memory Custodian' with access strictly limited to family photos.", "Task 3: Permission Audit & Revoke — Identify which external services are active and revoke access for a previously nominated contact."]
            },
            {
                "bg": "dark", "title": "Research Hypotheses", "badge": "RESEARCH QUESTIONS",
                "items": ["RQ1: Mental Model Clarity — Do users intuitively differentiate between connecting a cloud service and granting custodian access?", "RQ2: Exclusion Reassurance — Does the 'Locked by Default' visual badge reduce hesitation during setup?", "H1: Ambiguity Hypothesis — Users will hesitate if permission scopes are described in technical OAuth terminology rather than plain human terms."]
            },
            {
                "bg": "sage", "title": "Evidence Capture Template", "badge": "EVALUATION METRICS",
                "items": ["Task Completion Rate — Target Benchmark: > 85% unassisted completion across tasks.", "Single Ease Question (SEQ) — Target: > 5.5 / 7 post-task difficulty rating.", "System Usability Scale (SUS) — Target: > 75 on low-fidelity wireframe walkthrough.", "Qualitative Logging — Capturing think-aloud verbalisations, hesitation cues, and privacy doubts."]
            }
        ]
    },
    # 10
    {
        "num": 10,
        "is_dark": False,
        "tag": "09 • ITERATION",
        "title": "Evidence-Driven Design Refinements & Iterations",
        "subtitle": "Anticipating critical user friction points and resolving core ambiguities prior to high-fidelity design.",
        "layout": "col3",
        "cards": [
            {
                "bg": "slate", "title": "Iteration 01: Connection vs Access", "badge": "STRUCTURAL CLARITY",
                "items": ["Initial Friction: Users feared connecting Google Drive instantly shared their files with family.", "Root Cause: Visual conflation of service authentication and custodian delegation.", "Design Refinement: Separated into two distinct visual phases: Step 1 (Private Service Sync) and Step 2 (Independent Custodian Scoping).", "Reassurance Tag: Added explicit badge: 'Connecting a service does not share files with anyone.'"]
            },
            {
                "bg": "dark", "title": "Iteration 02: Zero-Trust Exclusions", "badge": "PRIVACY PROTECTION",
                "items": ["Initial Friction: Open checklists created decision paralysis and anxiety over accidental over-sharing.", "Root Cause: Users had to manually remember to uncheck private items.", "Design Refinement: Implemented Zero-Trust Defaults. Private chats, SMS backups, and financial passwords are permanently locked with red padlock shields.", "Result: Drastically reduced privacy anxiety; user must explicitly unlock sensitive categories."]
            },
            {
                "bg": "sage", "title": "Iteration 03: Plain-Language Triggers", "badge": "COGNITIVE EASE",
                "items": ["Initial Friction: Users were bewildered by technical jargon like 'Inactivity OAuth Expiration Epoch'.", "Root Cause: Platform-centric engineering language alienated non-technical users.", "Design Refinement: Replaced with transparent conversational conditions: 'Access is released ONLY after 90 days of inactivity AND 3 unacknowledged notifications.'", "Result: Clear, predictable mental model of when continuity actually triggers."]
            }
        ]
    },
    # 11
    {
        "num": 11,
        "is_dark": False,
        "tag": "10 • DESIGN SYSTEM",
        "title": "Visual Identity, Design Tokens & Component Logic",
        "subtitle": "A calm, Swiss-modernist aesthetic engineered for clarity, dignity, and low cognitive anxiety.",
        "layout": "grid4_vert",
        "cards": [
            {
                "bg": "dark", "title": "Color Tokens", "badge": "SURFACE PALETTE",
                "items": ["Obsidian Dark #121212: Authority, precision, high-contrast focal points.", "Canvas Light #F8F9FA: Clean, calm, airy background ensuring maximum legibility.", "Soft Sage #E2EAE5: Reassurance, verified security, positive continuity state.", "Slate Mist #EEF0F2: Neutral containment, structural grouping.", "Emerald #10B981: Active status indicator.", "Crimson #EF4444: Protected boundary indicator."]
            },
            {
                "bg": "sage", "title": "Typography Scale", "badge": "NEO-GROTESQUE SYSTEM",
                "items": ["Display (36pt Bold): Impact headlines with -0.02em tracking.", "Section Head (20pt Bold): Clean structural signposts.", "Card Title (14pt Bold): Focal anchor for bento modules.", "Body Copy (10pt Regular): 1.4 line-height for high reading comfort.", "Pill Badges (8.5pt Bold): Uppercase +0.08em tracking for metadata tags."]
            },
            {
                "bg": "slate", "title": "Component Logic", "badge": "BENTO MODULARITY",
                "items": ["8pt Baseline Grid: Strict mathematical alignment across all cards.", "Pill Containers: 24pt height rounded capsules for category & status tags.", "16–24pt Card Radius: Soft, human-centred enclosure avoiding harsh rectangular corners.", "Micro-Borders: 1pt subtle borders providing crisp definition without heavy drop shadows."]
            },
            {
                "bg": "white", "title": "Accessibility & Ethics", "badge": "INCLUSIVE DESIGN",
                "items": ["WCAG AAA Contrast: All body text exceeds 7:1 contrast ratio.", "Focus Indicators: High-visibility focus rings for keyboard navigation.", "Non-Macabre Copy: Replaced death metaphors with calm continuity terms.", "Zero Dark Patterns: Clear cancel and revocation buttons on every screen."]
            }
        ]
    },
    # 12
    {
        "num": 12,
        "is_dark": False,
        "tag": "11 • FINAL SOLUTION",
        "title": "Screen 01 — Centralised Continuity Dashboard",
        "subtitle": "High-fidelity home interface offering instant footprint awareness, readiness scoring, and quick actions.",
        "layout": "dashboard",
        "cards": [
            {
                "bg": "dark", "title": "Continuity Readiness: 68%", "badge": "SYSTEM HEALTH METER",
                "items": ["Readiness Status: Good Foundation • 2 Actions Required", "Connected Accounts: 3 of 5 active cloud platforms synced", "Trusted Circle: 2 verified custodians assigned", "Unassigned Assets: Microsoft 365 requires category scoping", "Security Audit: Two-factor authentication verified active", "Quick Action: → Complete Google Photos Scoping"]
            },
            {
                "bg": "sage", "title": "Connected Platforms (3 Active)", "badge": "INTEGRATED ECOSYSTEM",
                "items": ["Google Cloud (Drive/Photos): Active • Scoped: Family Memories Only", "Apple iCloud (Docs/Vault): Active • Scoped: Scanned Certificates", "Microsoft 365 (Work/Study): Pending Configuration (Unscoped)"]
            },
            {
                "bg": "slate", "title": "Trusted Circle (2 Nominated)", "badge": "CUSTODIAN ROSTER",
                "items": ["Riya Ambade (Sister): Verified • Scoped: Family Photos & Memories", "Arjun Mehta (Partner): Verified • Scoped: Legal & Official Records", "Access State: Standby Mode (Zero active data access currently)"]
            },
            {
                "bg": "white", "title": "Continuous Audit Log", "badge": "IMMUTABLE ACTIVITY LOG",
                "items": ["Oct 24, 2026 • 14:20: Scoped permission granted to Riya Ambade for Family Photos.", "Oct 20, 2026 • 09:15: Biometric 2FA re-authenticated on primary device.", "Oct 12, 2026 • 18:30: WhatsApp backups marked Permanently Private & Locked.", "Sep 28, 2026 • 11:00: Google Account connected via scoped OAuth token.", "Privacy Guarantee: Every event is cryptographically timestamped and revocable."]
            }
        ]
    },
    # 13
    {
        "num": 13,
        "is_dark": False,
        "tag": "11 • FINAL SOLUTION",
        "title": "Screen 02 — Granular Service Connection & Scoping",
        "subtitle": "Familiar OAuth-style integration with transparent scope disclosures and zero credential storage.",
        "layout": "col3",
        "cards": [
            {
                "bg": "dark", "title": "Step-by-Step Connection Logic", "badge": "INTEGRATION PROTOCOL",
                "items": ["01. Provider Selection: User selects from supported ecosystems (Google, Apple, Microsoft, Cloudflare).", "02. Scope Disclosure: Interface itemizes exact folder metadata requested.", "03. 2FA Re-Authentication: Requires biometric verification before linking.", "04. Boundary Confirmation: Enforces exclusion of private chats before sync.", "05. Revoke-at-Will: Instant one-click disconnection available 24/7."]
            },
            {
                "bg": "sage", "title": "Modal UI: Google Cloud Link", "badge": "HIGH-FIDELITY MODAL MOCKUP",
                "items": ["Account Link: user@gmail.com (Verified Google ID)", "Requested Scopes: Read-only folder metadata for Google Photos and Drive /Documents.", "Architectural Exclusions: Gmail inbox, Chrome browsing history, saved passwords.", "Reassurance Notice: Continuity Hub will never store your login credentials, read file contents, or share data with third parties."]
            },
            {
                "bg": "slate", "title": "Zero-Trust System Guarantees", "badge": "SECURITY ARCHITECTURE",
                "items": ["No Master Passwords: Operates exclusively via revocable OAuth 2.0 access tokens.", "Ephemeral Tokens: Tokens expire and refresh automatically; revoked upon inactivity.", "Manual Account Fallback: Unsupported platforms can be documented as manual offline records.", "Zero Data Hoarding: Zero raw user files stored on Hub servers."]
            }
        ]
    },
    # 14
    {
        "num": 14,
        "is_dark": False,
        "tag": "11 • FINAL SOLUTION",
        "title": "Screen 03 — Category-Based Selective Permission Matrix",
        "subtitle": "Granular boundary controls separating personal memories, legal records, and private communications.",
        "layout": "grid4_vert",
        "cards": [
            {
                "bg": "sage", "title": "Family Memories", "badge": "CATEGORY 01 • SHARED",
                "items": ["Scope: Family photo albums, vacation videos, personal creative notes.", "Assigned Custodian: Riya Ambade (Sister)", "Privacy Level: Medium — Wholesome personal continuity.", "Conditions: Release upon verified inactivity trigger.", "Status: Active Delegation Policy"]
            },
            {
                "bg": "sage", "title": "Legal Documents", "badge": "CATEGORY 02 • SHARED",
                "items": ["Scope: Passport scans, property deeds, health records, insurance.", "Assigned Custodian: Arjun Mehta (Partner)", "Privacy Level: High — Practical life continuity.", "Conditions: Dual-custodian verification required.", "Status: Active Delegation Policy"]
            },
            {
                "bg": "dark", "title": "Private Messages", "badge": "CATEGORY 03 • LOCKED",
                "items": ["Scope: WhatsApp archives, Signal chats, personal email threads.", "Assigned Custodian: NONE (PERMANENTLY EXCLUDED)", "Privacy Level: MAXIMUM — Strict inviolable boundary.", "System Action: Auto-delete metadata upon inactivity.", "Status: 🔒 Default Locked Shield"]
            },
            {
                "bg": "slate", "title": "Financial Portals", "badge": "CATEGORY 04 • RESTRICTED",
                "items": ["Scope: Bank portal URLs, utility accounts, insurance contact info.", "Assigned Custodian: Informational Reference Only", "Privacy Level: Restricted — Zero PINs or passwords stored.", "Purpose: Informs family that account exists without granting financial access."]
            }
        ]
    },
    # 15
    {
        "num": 15,
        "is_dark": False,
        "tag": "11 • FINAL SOLUTION",
        "title": "Screen 04 — Nominated Custodians & Release Triggers",
        "subtitle": "Configuring trusted contacts, defining dual-gate triggers, and ensuring instant emergency revokability.",
        "layout": "col3",
        "cards": [
            {
                "bg": "dark", "title": "Custodian Dossier: Riya Ambade", "badge": "PRIMARY NOMINEE",
                "items": ["Relationship Role: Sister (Primary Family Custodian)", "Contact Verification: Email + Mobile 2FA Confirmed", "Permitted Categories: Family Memories & Travel Photography", "Excluded Categories: Work Drives, Legal Tax Files, Private Chats", "Current Status: STANDBY MODE (Zero Access Active)"]
            },
            {
                "bg": "sage", "title": "Dual-Gate Release Protocol", "badge": "TRIGGER CONDITIONS",
                "items": ["Gate 1: Inactivity Heartbeat: No owner login detected for 90 consecutive days.", "Gate 2: Verification Alerts: System sends 3 notifications via SMS/email over 30 days.", "Gate 3: Official Verification: Custodian must submit government photo ID and verified death/incapacity documentation.", "Fail-Safe Reassurance: Any user login immediately resets countdown to zero."]
            },
            {
                "bg": "slate", "title": "Owner Sovereignty & Audit", "badge": "REVOCATION CONTROLS",
                "items": ["Instant Heartbeat Reset: Logging in or tapping 'I Am Here' in email cancels all pending triggers.", "Silent Revocation: Remove or alter custodian scopes without sending uncomfortable notifications.", "Immutable Audit Log: Track every login, permission change, and simulated trigger ping."]
            }
        ]
    },
    # 16
    {
        "num": 16,
        "is_dark": False,
        "tag": "12 • ROUND 2 VALIDATION",
        "title": "High-Fidelity Validation Protocol & Verification Plan",
        "subtitle": "A structured empirical framework for measuring task success, cognitive workload, and visual hierarchy.",
        "layout": "col3",
        "cards": [
            {
                "bg": "sage", "title": "Target Usability Benchmarks", "badge": "QUANTITATIVE TARGETS",
                "items": ["System Usability Scale (SUS): Target > 80 (Grade A Usability rating on hi-fi prototype).", "Task Completion Rate: Target > 90% unassisted completion across 5 core workflows.", "Single Ease Question (SEQ): Target > 5.8 / 7 difficulty rating across tasks.", "Error Recovery Rate: Target 100% successful recovery from simulated accidental delegation."]
            },
            {
                "bg": "dark", "title": "Participant Stratification (n=6)", "badge": "EVALUATION COHORT",
                "items": ["Cohort A: Young Adults (18–25): Focus on privacy boundaries, chat exclusions, and emotional comfort.", "Cohort B: Working Professionals (30–45): Focus on multi-cloud storage sync, financial safety, and tax record handoff.", "Cohort C: Mature Adults (55+): Focus on interface legibility, cognitive load, and trusted custodian setup."]
            },
            {
                "bg": "white", "title": "Visual Attention & Heatmap Plan", "badge": "ATTENTION MAPPING",
                "items": ["Simulated Fixation Protocol: Tracking user eye gaze across the Centralised Dashboard.", "Hypothesis H2: Visual fixations will concentrate on the 68% Readiness Gauge and the Red Locked Chat shields.", "Validation Goal: Confirms that privacy boundaries are immediately recognizable within the first 5 seconds of scanning."]
            }
        ]
    },
    # 17
    {
        "num": 17,
        "is_dark": False,
        "tag": "13 • FINAL OUTCOME",
        "title": "Delivered Design Artefacts & Prototype Fidelity Scope",
        "subtitle": "Transparent accounting of resolved interface flows, demonstrated prototype capabilities, and boundaries.",
        "layout": "col3",
        "cards": [
            {
                "bg": "dark", "title": "Delivered Course Artefacts", "badge": "DELIVERABLES SUMMARY",
                "items": ["UX Case Study Deck: 19-Slide research-to-validation deck following faculty brief.", "Interactive Prototype: Figma prototype with 34 documented interaction states.", "Design System Token Library: Complete typography, bento grid, color tokens, and components.", "A1 Exhibition Display Panel: High-resolution print-ready exhibition poster."]
            },
            {
                "bg": "sage", "title": "Demonstrated Prototype Scope", "badge": "FUNCTIONAL CAPABILITIES",
                "items": ["Dynamic Readiness Meter: Interactive score recalibration as services are configured.", "Granular Connection Flow: Step-by-step OAuth simulation with scope disclosures.", "Category Permission Engine: Toggleable category permissions with instant feedback.", "Custodian Nomination Flow: Contact assignment, trigger setting, and revocation."]
            },
            {
                "bg": "slate", "title": "Deliberate Concept Boundaries", "badge": "TECHNICAL DEMARCATION",
                "items": ["Simulated Live APIs: Live OAuth endpoints to external servers are simulated for prototype stability.", "Zero Server Storage: Backend cryptographic architecture modeled as service blueprint specification.", "Legal Verification: Document verification treated as a human-in-the-loop manual service flow."]
            }
        ]
    },
    # 18
    {
        "num": 18,
        "is_dark": False,
        "tag": "14 • LEARNINGS & LIMITATIONS",
        "title": "Critical Reflections, Industry Walled Gardens & Future Scope",
        "subtitle": "Synthesising pedagogical insights, platform friction, and service design opportunities.",
        "layout": "col3",
        "cards": [
            {
                "bg": "dark", "title": "Pedagogical Reflections", "badge": "DESIGN TAKEAWAYS",
                "items": ["Privacy is the Precondition: In digital continuity, privacy is not a feature—it is the sole condition under which users agree to participate.", "Tone Shapes Engagement: Replacing dark death metaphors with calm continuity language reduces emotional avoidance by users.", "Honest Limits Build Trust: Explicitly admitting what the system cannot do fosters greater confidence than promising total automation."]
            },
            {
                "bg": "sage", "title": "Industry & Technical Constraints", "badge": "PLATFORM BARRIERS",
                "items": ["Walled Garden Monopolies: Major platforms (Apple, Google, Meta) deliberately restrict third-party data portability and cross-service delegation.", "Legal & Jurisdictional Maze: Digital property laws vary radically across nations, complicating uniform continuity protocols.", "Incapacity Detection: Detecting physical incapacity or death without invasive surveillance remains an unsolved service challenge."]
            },
            {
                "bg": "slate", "title": "Future Roadmap & Next Steps", "badge": "SERVICE EXTENSIONS",
                "items": ["Decentralised Identifiers (DID): Explore zero-knowledge proofs and self-sovereign identity for custodian authentication.", "Collaborative Guardian Circles: Implement multi-signature release (requiring 2 of 3 guardians to unlock sensitive folders).", "Jury & Exhibition Validation: Gather formal peer and faculty critique during the November 4 physical exhibition."]
            }
        ]
    },
    # 19
    {
        "num": 19,
        "is_dark": False,
        "tag": "15 • CREDITS & REFERENCES",
        "title": "Academic References, Tools & Acknowledgements",
        "subtitle": "Formal bibliography of peer-reviewed sources, platform technical documentation, and project credits.",
        "layout": "credits",
        "cards": [
            {
                "bg": "white", "title": "Peer-Reviewed Academic Bibliography", "badge": "PRIMARY CITATIONS",
                "items": ["ACM Systematic Literature Review (2023): Digital Legacy: A Systematic Literature Review, ACM Computing Surveys, doi: 10.1145/3610059.", "Digital Legacy Association (2024): Digital Death Survey 2024, London, UK. https://digitallegacyassociation.org/", "PubMed / Omega Journal (2025): How do People Use Social Media to Maintain Continuing Bonds in Bereavement?, PMID: 41215584.", "ScienceDirect (2026): Digital grief technology to support bereavement: A systematic review of benefits and risks, Computers in Human Behavior.", "The Indian Express (2026): Who Owns a Person's Digital Data After Their Death?, Gandhinagar Legal Precedent Analysis."]
            },
            {
                "bg": "sage", "title": "Platform Documentation", "badge": "TECHNICAL CITATIONS",
                "items": ["Apple Inc. (2026): How to Add a Legacy Contact for Your Apple ID. Apple Support Documentation HT212360.", "Google LLC (2026): About Inactive Account Manager & Data Sharing. Google Account Help ID 3036546.", "W3C & FIDO Alliance (2025): Web Authentication & Passkey Standards for Secure Delegated Access."]
            },
            {
                "bg": "dark", "title": "Project Recognition", "badge": "COURSE CREDITS",
                "items": ["Student Lead: Vidhi Ambade (Sem 7)", "Course: UEDP-5 (45 Marks)", "Faculty Lead: Prof. Kriti Kusum", "Tools: Figma, Python-pptx, Adobe Illustrator", "Institution: B.Des User Experience Design"]
            }
        ]
    }
]

def render_html_page(slide):
    is_dark = slide.get("is_dark", False)
    bg_color = "#121212" if is_dark else "#F8F9FA"
    title_color = "#FFFFFF" if is_dark else "#111827"
    sub_color = "#9CA3AF" if is_dark else "#6B7280"

    html = f"""<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  * {{ box-sizing: border-box; margin: 0; padding: 0; }}
  body {{
    width: 1920px;
    height: 1080px;
    background-color: {bg_color};
    font-family: -apple-system, BlinkMacSystemFont, "Helvetica Neue", Helvetica, Arial, sans-serif;
    padding: 70px 115px;
    position: relative;
    overflow: hidden;
  }}
  .header {{
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }}
  .tag-group {{
    display: flex;
    align-items: center;
    gap: 12px;
  }}
  .pill {{
    background: {'#181818' if is_dark else '#FFFFFF'};
    border: 1px solid {'#303030' if is_dark else '#E5E7EB'};
    border-radius: 999px;
    padding: 8px 18px;
    font-size: 13px;
    font-weight: 700;
    letter-spacing: 0.08em;
    color: {'#9CA3AF' if is_dark else '#6B7280'};
    text-transform: uppercase;
  }}
  .arrow-circle {{
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: {'#181818' if is_dark else '#FFFFFF'};
    border: 1px solid {'#303030' if is_dark else '#E5E7EB'};
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    color: {'#9CA3AF' if is_dark else '#6B7280'};
  }}
  .meta-right {{
    font-size: 13px;
    font-weight: 700;
    letter-spacing: 0.08em;
    color: {'#9CA3AF' if is_dark else '#6B7280'};
    text-transform: uppercase;
  }}
  .title-area {{
    margin-bottom: 40px;
  }}
  .main-title {{
    font-size: 34px;
    font-weight: 700;
    color: {title_color};
    line-height: 1.15;
    margin-bottom: 8px;
    letter-spacing: -0.02em;
  }}
  .main-subtitle {{
    font-size: 17px;
    color: {sub_color};
    line-height: 1.4;
    max-width: 1400px;
  }}
  
  /* Cards */
  .card {{
    border-radius: 20px;
    padding: 32px 30px;
    display: flex;
    flex-direction: column;
    box-shadow: 0 1px 3px rgba(0,0,0,0.02);
  }}
  .card.dark {{
    background: #181818;
    border: 1px solid #2E2E2E;
    color: #FFFFFF;
  }}
  .card.sage {{
    background: #E2EAE5;
    border: 1px solid #CDDAD2;
    color: #111827;
  }}
  .card.slate {{
    background: #EEF0F2;
    border: 1px solid #DCE0E4;
    color: #111827;
  }}
  .card.white {{
    background: #FFFFFF;
    border: 1px solid #E5E7EB;
    color: #111827;
  }}
  .card-badge {{
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    margin-bottom: 8px;
    opacity: 0.7;
  }}
  .card-title {{
    font-size: 21px;
    font-weight: 700;
    margin-bottom: 18px;
    line-height: 1.25;
  }}
  .card-list {{
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }}
  .card-list li {{
    font-size: 14.5px;
    line-height: 1.45;
    position: relative;
    padding-left: 18px;
  }}
  .card-list li::before {{
    content: "•";
    position: absolute;
    left: 0;
    font-weight: bold;
    opacity: 0.6;
  }}
  .lead-bold {{
    font-weight: 700;
  }}

  /* Layouts */
  .layout-cover {{
    display: grid;
    grid-template-columns: 1fr 1fr 1.05fr;
    gap: 24px;
    height: 520px;
  }}
  .layout-col3 {{
    display: grid;
    grid-template-columns: 1fr 1fr 1.05fr;
    gap: 24px;
    height: 680px;
  }}
  .layout-col2 {{
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 28px;
    height: 680px;
  }}
  .layout-grid4 {{
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    gap: 24px;
    height: 680px;
  }}
  .layout-grid4_vert {{
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    gap: 20px;
    height: 680px;
  }}
  .layout-credits {{
    display: grid;
    grid-template-columns: 1.4fr 1fr 0.9fr;
    gap: 24px;
    height: 680px;
  }}
  .layout-dashboard {{
    display: grid;
    grid-template-columns: 1fr 1fr 1.05fr;
    grid-template-rows: 1fr 1fr;
    gap: 24px;
    height: 680px;
  }}
  .layout-dashboard .hero-card {{
    grid-row: span 2;
  }}
  .layout-dashboard .audit-card {{
    grid-row: span 2;
  }}

  /* Metrics Layout */
  .metrics-container {{
    display: flex;
    flex-direction: column;
    gap: 24px;
    height: 680px;
  }}
  .metrics-top {{
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24px;
    height: 260px;
  }}
  .metrics-bottom {{
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    gap: 20px;
    height: 390px;
  }}
  .metric-card {{
    border-radius: 20px;
    padding: 30px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
  }}
  .metric-num {{
    font-size: 52px;
    font-weight: 700;
    line-height: 1;
    margin-bottom: 12px;
  }}
  .metric-label {{
    font-size: 16px;
    font-weight: 700;
    margin-bottom: 10px;
  }}
  .metric-sub {{
    font-size: 13.5px;
    line-height: 1.4;
    opacity: 0.8;
  }}
</style>
</head>
<body>
"""

    # Top Header
    html += f"""
  <div class="header">
    <div class="tag-group">
      <div class="pill">{slide['tag']}</div>
      <div class="arrow-circle">↘</div>
    </div>
    <div class="meta-right">UEDP-5 • SEMESTER 7 • PROF. KRITI KUSUM</div>
  </div>
"""

    if slide.get("layout") == "cover":
        html += f"""
  <div style="margin-top: 40px; margin-bottom: 50px;">
    <h1 style="font-size: 64px; font-weight: 800; letter-spacing: -0.03em; margin-bottom: 16px; color: #111827;">{slide['title']}</h1>
    <p style="font-size: 22px; color: #6B7280; max-width: 1400px; line-height: 1.4;">{slide['subtitle']}</p>
  </div>
  <div class="layout-cover">
"""
        for c in slide["cards"]:
            html += render_single_card(c)
        html += "  </div>"

    elif slide.get("layout") == "metrics":
        html += f"""
  <div class="title-area">
    <div class="main-title">{slide['title']}</div>
    <div class="main-subtitle">{slide['subtitle']}</div>
  </div>
  <div class="metrics-container">
    <div class="metrics-top">
"""
        for c in slide["top_cards"]:
            html += render_single_card(c)
        html += """
    </div>
    <div class="metrics-bottom">
"""
        for m in slide["metrics"]:
            c_cls = m["bg"]
            html += f"""
      <div class="card {c_cls} metric-card">
        <div class="metric-num">{m['num']}</div>
        <div class="metric-label">{m['label']}</div>
        <div class="metric-sub">{m['sub']}</div>
      </div>
"""
        html += """
    </div>
  </div>
"""
    elif slide.get("layout") == "dashboard":
        html += f"""
  <div class="title-area">
    <div class="main-title">{slide['title']}</div>
    <div class="main-subtitle">{slide['subtitle']}</div>
  </div>
  <div class="layout-dashboard">
"""
        cards = slide["cards"]
        html += render_single_card(cards[0], extra_cls="hero-card")
        html += render_single_card(cards[1])
        html += render_single_card(cards[3], extra_cls="audit-card")
        html += render_single_card(cards[2])
        html += "  </div>"

    else:
        l_cls = f"layout-{slide['layout']}"
        html += f"""
  <div class="title-area">
    <div class="main-title">{slide['title']}</div>
    <div class="main-subtitle">{slide['subtitle']}</div>
  </div>
  <div class="{l_cls}">
"""
        for c in slide["cards"]:
            html += render_single_card(c)
        html += "  </div>"

    html += """
</body>
</html>
"""
    return html

def render_single_card(c, extra_cls=""):
    bg = c.get("bg", "white")
    badge = c.get("badge", "")
    title = c.get("title", "")
    items = c.get("items", [])

    h = f'    <div class="card {bg} {extra_cls}">\n'
    if badge:
        h += f'      <div class="card-badge">{badge}</div>\n'
    if title:
        h += f'      <div class="card-title">{title}</div>\n'
    if items:
        h += '      <ul class="card-list">\n'
        for it in items:
            if ":" in it:
                parts = it.split(":", 1)
                h += f'        <li><span class="lead-bold">{parts[0]}:</span>{parts[1]}</li>\n'
            else:
                h += f'        <li>{it}</li>\n'
        h += '      </ul>\n'
    h += '    </div>\n'
    return h

def main():
    print("Rendering HTML slide previews and screenshots...")
    for idx, slide_data in enumerate(SLIDES_DATA):
        slide_num = idx + 1
        html_content = render_html_page(slide_data)
        html_path = os.path.join(OUTPUT_DIR, f"slide_{slide_num:02d}.html")
        png_path = os.path.join(OUTPUT_DIR, f"slide_{slide_num:02d}.png")

        with open(html_path, "w", encoding="utf-8") as f:
            f.write(html_content)

        # Chrome screenshot
        cmd = [
            CHROME_BIN,
            "--headless",
            "--disable-gpu",
            f"--screenshot={png_path}",
            "--window-size=1920,1080",
            f"file://{html_path}"
        ]
        res = subprocess.run(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
        if os.path.exists(png_path):
            print(f"Slide {slide_num:02d}: Rendered {png_path}")
        else:
            print(f"Slide {slide_num:02d}: Failed to render screenshot")

if __name__ == "__main__":
    main()
