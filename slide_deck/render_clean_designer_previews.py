#!/usr/bin/env python3
"""
Renders 1920x1080 high-res preview screenshots for all 24 slides
matching the user's uploaded Swiss-modernist editorial reference image.
"""

import os
import shutil
import subprocess
from PIL import Image

OUT_DIR = "/Users/vidhi/Desktop/uni/MIA a3/slide_previews_clean"
os.makedirs(OUT_DIR, exist_ok=True)

CHROME_BIN = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"

SLIDES = [
    # 01
    {
        "num": 1, "is_dark": True, "section": "01 Cover",
        "type": "cover",
        "title": "Digital Continuity Hub",
        "subtitle": "Designing intentional continuity, privacy boundaries, and selective delegation for personal digital lives."
    },
    # 02
    {
        "num": 2, "is_dark": False, "section": "02 Project Snapshot",
        "type": "split_snapshot",
        "headline": "Governing personal digital footprints<br>across siloed cloud platforms.",
        "left_col": {
            "sub": "INQUIRY SCOPE", "title": "Domain & Role",
            "bullets": ["Domain: Digital Legacy, Personal Data Governance & Service Continuity",
                        "Role: End-to-End UX/UI Researcher, Service Designer & Prototyper",
                        "Duration: Semester 7 (Oct – Nov 2026) | Course: UEDP-5 (45 Marks)"]
        },
        "right_col": {
            "sub": "PRODUCT PROPOSAL", "title": "The Core Deliverable",
            "bullets": ["Concept: Centralised Digital Continuity Dashboard ('Continuity Hub')",
                        "Core Paradigm: Understand → Organise → Decide → Communicate → Continue",
                        "Outcome: 34-state interactive prototype and structured validation framework"]
        },
        "bottom_banner": {
            "sub": "EXPLICIT CONSTRAINTS", "title": "Architectural Boundaries & Non-Goals",
            "text": "Not a legal estate-tax will. Not a master password manager. Operates strictly via user-consented OAuth metadata scopes without hoarding private files."
        }
    },
    # 03
    {
        "num": 3, "is_dark": False, "section": "03 Problem Space",
        "type": "col2",
        "headline": "Our digital lives are scattered across dozens of services.<br>When crisis strikes, access is fragmented and opaque.",
        "col1": {
            "sub": "ACCUMULATION PATTERNS", "title": "The Everyday Footprint",
            "text": "People accumulate thousands of assets across isolated services with zero unified overview.",
            "bullets": ["Memories: Photos and videos locked in iCloud and Google Photos",
                        "Legal Records: Tax documents and deeds scattered in cloud drives",
                        "Communications: Decades of conversations in WhatsApp and Gmail",
                        "Financial Portals: Banking portals, utility accounts, and subscriptions"]
        },
        "col2": {
            "sub": "ECOSYSTEM FRICTION", "title": "The Silent Impasse",
            "text": "Current platform policies force families into painful dilemmas during incapacity or loss.",
            "bullets": ["Platform Silos: Apple, Google, and Meta have disconnected legacy rules",
                        "Binary Access Trap: Platforms either lock everyone out or hand over master keys",
                        "Emotional Avoidance: Macabre death-oriented tools induce user paralysis",
                        "Procedural Deadlock: Families face months of expensive court bureaucracy"]
        }
    },
    # 04
    {
        "num": 4, "is_dark": False, "section": "03 Problem & Opportunity",
        "type": "cards2_contrast",
        "headline": "Initial Assumption vs. Research-Led Reality",
        "card1": {
            "is_dark": False, "sub": "HYPOTHESIS A", "title": "Initial Academic Assumption",
            "text": "People need a 'digital will' to transfer all online accounts after death.",
            "bullets": ["Assumes digital legacy is purely a post-mortem legal event",
                        "Assumes users want to hand over full master credentials to family",
                        "Treats personal data as financial property to be inherited as a monolith"]
        },
        "card2": {
            "is_dark": True, "sub": "EVIDENCE-LED REALITY", "title": "Observed Research Reality",
            "text": "People reject blanket transfer. They demand selective delegation with strict boundaries.",
            "bullets": ["The gap appears before death: users cannot organize what they cannot see",
                        "Users want family to access photos, but dread exposing private chats",
                        "Access is not binary: users demand granular, category-level scoping",
                        "Privacy and revocability are absolute preconditions for user trust"]
        }
    },
    # 05
    {
        "num": 5, "is_dark": False, "section": "04 Secondary Research",
        "type": "col3",
        "headline": "Academic Literature & Platform Silos",
        "cards": [
            {
                "sub": "RESEARCH CITATION (2023)", "title": "ACM Systematic Review",
                "text": "Digital legacy is not password inheritance; it encompasses identity, ongoing relationships, and affective memory (doi: 10.1145/3610059).",
                "bullets": ["Identity preservation over raw assets", "Continuing emotional bonds", "Contextual boundary controls"]
            },
            {
                "sub": "INDUSTRY AUDIT (2026)", "title": "Platform Silo Analysis",
                "text": "Existing platform legacy tools are isolated within proprietary walled gardens.",
                "bullets": ["Apple Legacy Contact: Requires 256-bit key & death certificate",
                            "Google Inactive Account: Triggers solely by inactivity timer",
                            "Zero cross-platform visibility across ecosystems"]
            },
            {
                "sub": "ETHICS & RISKS (2026)", "title": "ScienceDirect Review",
                "text": "Bereavement technologies create severe risks of privacy violation and grief manipulation if consent is absent (doi: 10.1016/j.chb.2026).",
                "bullets": ["Risk of misrepresenting deceased", "Need for explicit, least-privilege consent", "Emotional boundary protection"]
            }
        ]
    },
    # 06
    {
        "num": 6, "is_dark": False, "section": "04 Secondary Research",
        "type": "col2_custom",
        "headline": "Judicial Precedent: The Gandhinagar Court Dispute",
        "left": {
            "sub": "CIVIL COURT CASE (2026)", "title": "The Real-World Crisis",
            "text": "In 2026, The Indian Express reported on a Gandhinagar civil court case where a deceased man's family petitioned for access to his locked iPhone and iCloud repository containing crucial family documents.",
            "bullets": ["Platform Refusal: Apple refused access citing user privacy policies",
                        "Procedural Deadlock: Family endured months of costly legal hearings",
                        "Cryptographic Wall: Without pre-configured keys, access was impossible",
                        "Takeaway: Digital continuity is a real-world emergency, not a theory."]
        },
        "right": {
            "is_dark": True, "sub": "CRITICAL TAKEAWAY", "title": "Design Implication",
            "text": "Without pre-configured continuity, technical encryption and corporate bureaucracy create an insurmountable wall for families.",
            "bullets": ["Access must be planned proactively",
                        "Platform-agnostic coordination is required",
                        "Emergency verification must be dignified"]
        }
    },
    # 07
    {
        "num": 7, "is_dark": False, "section": "04 Primary Research",
        "type": "cards2_contrast",
        "headline": "Investigating Digital Mental Models Across Generations",
        "card1": {
            "is_dark": False, "sub": "METHODOLOGY & SAMPLING", "title": "Primary Research Instruments",
            "text": "A mixed-methods inquiry exploring storage habits, retrieval friction, and custodian trust.",
            "bullets": ["Quantitative Instrument: 15-question Google Form surveying account volume, storage habits, and privacy thresholds",
                        "Qualitative Protocol: 6 cross-generational interview profiles: Student (15y), College (22y), Professional (36y), Doctor (47y), Academic (52y), Senior (75y)",
                        "Core Inquiry: What would you want trusted people to access, and what must remain permanently private?"]
        },
        "card2": {
            "is_dark": True, "sub": "ACADEMIC HONESTY", "title": "Research Transparency Disclosure",
            "text": "The quantitative figures presented in this case study reflect the structured exploratory pilot dataset (n=100) established for pattern analysis.",
            "bullets": ["Pilot data guides hypothesis formulation and workflow architecture",
                        "Distinguished from live usability testing protocols",
                        "Zero fabricated user participants or artificial test results",
                        "Preserves absolute research integrity as required by the brief"]
        }
    },
    # 08 — 2x2 Black Grid matching reference image!
    {
        "num": 8, "is_dark": False, "section": "04 Primary Research",
        "type": "grid2x2_split",
        "headline": "People value their digital records, but postpone planning<br>because current tools feel overwhelming.",
        "narrative": {
            "sub": "PILOT PATTERN SYNTHESIS", "title": "Cognitive Overload is Real",
            "text": "A fragmented digital life creates paralysis. Users value memories and legal documents, but dread exposing private chats.",
            "bullets": ["15+ unlinked digital accounts per user on average",
                        "Zero unified overview of connected cloud services",
                        "Fear of accidental over-sharing causes total avoidance",
                        "Users lack a clear, calm starting point for continuity"]
        },
        "grid": [
            {"num": "82%", "label": "Multi-Platform Storage", "sub": "Store files across 3+ unlinked cloud services."},
            {"num": "78%", "label": "Unaware of Concept", "sub": "Had never heard of the term 'digital legacy'."},
            {"num": "71%", "label": "Privacy as Barrier", "sub": "Cite private chat disclosure as their #1 obstacle."},
            {"num": "70%", "label": "Retrieval Friction", "sub": "Struggle finding important files from 3+ years ago."}
        ]
    },
    # 09
    {
        "num": 9, "is_dark": False, "section": "05 Design Direction",
        "type": "col4",
        "headline": "Four Guiding Pillars for Intentional Continuity",
        "cards": [
            {"sub": "PILLAR 01", "title": "Selective Delegation", "text": "Access is never binary. Users configure permissions per category (e.g. photos vs legal certificates)."},
            {"sub": "PILLAR 02", "title": "Privacy-by-Default", "text": "Private chats, SMS backups, and passwords are permanently locked and excluded by default."},
            {"sub": "PILLAR 03", "title": "Plain Scoping", "text": "Transparent explanations of what connecting a service or designating a contact enables."},
            {"is_dark": True, "sub": "PILLAR 04", "title": "Instant Revocation", "text": "Users maintain absolute sovereignty to edit, freeze, or cancel permissions at any time."}
        ]
    },
    # 10
    {
        "num": 10, "is_dark": False, "section": "05 Design Direction",
        "type": "col3",
        "headline": "Why a Centralised Dashboard?",
        "cards": [
            {
                "sub": "REJECTED", "title": "Concept A: Browser Extension",
                "text": "A lightweight extension managing browser tabs.",
                "bullets": ["Fails to connect native mobile clouds", "Session-dependent and easily bypassed", "Increases fragmentation rather than resolving it"]
            },
            {
                "sub": "REJECTED", "title": "Concept B: Physical USB Vault",
                "text": "A physical hardware key stored in a safe deposit box.",
                "bullets": ["High risk of hardware loss or damage", "Rapidly becomes obsolete as accounts change", "Requires manual re-flashing of files"]
            },
            {
                "is_dark": True, "sub": "SELECTED DIRECTION", "title": "Concept C: Continuity Hub",
                "text": "A centralised identity & permission coordinator.",
                "bullets": ["Unifies multi-cloud visibility in one view", "Operates via secure OAuth metadata tokens", "Zero raw user file hoarding on servers"]
            }
        ]
    },
    # 11
    {
        "num": 11, "is_dark": False, "section": "06 Experience Structure",
        "type": "col2",
        "headline": "System Information Architecture",
        "col1": {
            "sub": "SYSTEM TOPOLOGY", "title": "Core Architecture Modules",
            "bullets": ["1. Overview & Health: Readiness score, service status, security alerts",
                        "2. Connected Services: Google Drive, Apple iCloud, OneDrive, Subscriptions",
                        "3. Content Categories: Family Memories, Official Documents, Financial Portals",
                        "4. Trusted Circle: Nominated custodians, contact verification, role assignment",
                        "5. Permission Matrix: Category-to-person access scopes and lock rules",
                        "6. Trigger Engine: Inactivity countdowns and dual-verification gates",
                        "7. Security & 2FA: Biometric passkeys and immutable cryptographic audit log"]
        },
        "col2": {
            "sub": "DESIGN LOGIC", "title": "Architecture Rationale",
            "text": "The IA separates account connection from custodian access to eliminate privacy anxiety.",
            "bullets": ["High visual hierarchy prioritizes unconfigured services",
                        "Category separation prevents accidental blanket access",
                        "Dedicated audit trail provides continuous reassurance",
                        "Calm navigation structure minimizes cognitive fatigue"]
        }
    },
    # 12
    {
        "num": 12, "is_dark": False, "section": "06 Experience Structure",
        "type": "steps6",
        "headline": "From Onboarding to Continuity Release",
        "steps": [
            ("STEP 01", "01. Secure Onboard", "Biometric 2FA establishes primary ownership."),
            ("STEP 02", "02. Connect Services", "Scoped OAuth links Google, Apple, or OneDrive."),
            ("STEP 03", "03. Set Boundaries", "Lock sensitive folders (chats/passwords) by default."),
            ("STEP 04", "04. Nominate Custodian", "Assign verified contact details and family role."),
            ("STEP 05", "05. Configure Triggers", "Select inactivity period (e.g. 90 days) & verification."),
            ("STEP 06", "06. Audit & Revoke", "Periodic health checks with one-click revocation.")
        ]
    },
    # 13
    {
        "num": 13, "is_dark": False, "section": "07 Early Exploration",
        "type": "col3",
        "headline": "Evaluating Navigation Mental Models",
        "cards": [
            {
                "sub": "WIREFRAME EXPLORATION A", "title": "Model 1: Service-First",
                "text": "Organized around individual platform accounts.",
                "bullets": ["Vertical list of connected cloud apps", "User sets rules inside each service", "High cognitive load replicating rules 10+ times", "Fails to provide a holistic continuity view"]
            },
            {
                "sub": "WIREFRAME EXPLORATION B", "title": "Model 2: Person-First",
                "text": "Organized around nominated trusted individuals.",
                "bullets": ["Custodian profile cards with attached folders", "Leaves unassigned personal assets invisible", "Risk of forgetting crucial cloud services", "Inadequate for overall footprint audit"]
            },
            {
                "is_dark": True, "sub": "SELECTED WIREFRAME", "title": "Model 3: Hybrid Dashboard",
                "text": "A unified bento dashboard balancing health, assets, and circle.",
                "bullets": ["Instant glanceability of readiness score", "Separates services from permission grants", "Permanent privacy shield for sensitive data"]
            }
        ]
    },
    # 14
    {
        "num": 14, "is_dark": False, "section": "08 Round 1 Testing",
        "type": "col3",
        "headline": "Low-Fidelity Testing Protocol & Hypotheses (Planned)",
        "cards": [
            {
                "sub": "TASK PROTOCOL", "title": "Core Usability Tasks",
                "bullets": ["Task 1: Scoped Cloud Connect — Connect Google Drive while ensuring private chats and emails remain excluded.",
                            "Task 2: Selective Custodian Nomination — Designate a sibling with access strictly limited to family photos.",
                            "Task 3: Permission Audit & Revoke — Identify active connections and revoke access for an existing contact."]
            },
            {
                "sub": "INQUIRY GOALS", "title": "Research Hypotheses",
                "bullets": ["RQ1: Do users differentiate between linking a service and granting custodian access?",
                            "RQ2: Does the 'Locked by Default' shield alleviate privacy hesitation?",
                            "H1: Users will hesitate if permission scopes use technical OAuth terms instead of human language."]
            },
            {
                "is_dark": True, "sub": "EVALUATION METRICS", "title": "Target Benchmarks",
                "bullets": ["Task Completion Rate: Target > 85% unassisted",
                            "Single Ease Question (SEQ): Target > 5.5 / 7",
                            "System Usability Scale (SUS): Target > 75",
                            "Qualitative: Log hesitation cues and privacy doubts"]
            }
        ]
    },
    # 15
    {
        "num": 15, "is_dark": False, "section": "09 Iteration",
        "type": "col3",
        "headline": "Evidence-Driven Design Refinements",
        "cards": [
            {
                "sub": "REFINEMENT 01", "title": "1. Link vs Share",
                "text": "Initial Friction: Users feared linking Google Drive immediately shared files with family.",
                "bullets": ["Issue: Conflation of authentication and delegation", "Response: Re-architected into 2 distinct steps", "Added badge: 'Connecting does not share files'"]
            },
            {
                "is_dark": True, "sub": "REFINEMENT 02", "title": "2. Zero-Trust Defaults",
                "text": "Initial Friction: Open checklists created anxiety over accidental over-sharing.",
                "bullets": ["Issue: Manual exclusion induces fear and fatigue", "Response: Chats and passwords locked by default", "User must explicitly unlock private categories"]
            },
            {
                "sub": "REFINEMENT 03", "title": "3. Plain Triggers",
                "text": "Initial Friction: Users were bewildered by technical OAuth timeout jargon.",
                "bullets": ["Issue: Technical terms alienated non-technical users", "Response: Replaced with conversational conditions", "'Access released only after 90 days inactivity'"]
            }
        ]
    },
    # 16
    {
        "num": 16, "is_dark": False, "section": "10 Design System",
        "type": "col4",
        "headline": "Visual Identity Tokens & Swiss Typography",
        "cards": [
            {"sub": "SURFACE TOKENS", "title": "Color Palette", "bullets": ["Obsidian #0D0D0D: Contrast & focus", "Canvas #FFFFFF: Airy readability", "Slate Mist #EEF0F2: Subtle structure", "Emerald #10B981: Active status", "Crimson #EF4444: Boundary lock"]},
            {"sub": "NEO-GROTESQUE SCALE", "title": "Typography", "bullets": ["Display (44pt Bold): Impact titles", "Section Head (24pt): Signposts", "Card Header (14pt Bold): Anchors", "Body (10pt Regular): 1.4 line-height", "Running Meta (8.5pt): Uppercase"]},
            {"sub": "LAYOUT LOGIC", "title": "Grid & Hairlines", "bullets": ["8pt Baseline Grid alignment", "Hairline 0.5pt divider rules", "Rectangular containers with sharp edges", "Generous negative space throughout"]},
            {"is_dark": True, "sub": "ETHICAL STANDARDS", "title": "Calm Tone", "bullets": ["WCAG AAA Contrast compliance", "Zero macabre death metaphors", "Reassuring, dignified microcopy", "No dark patterns or forced signups"]}
        ]
    },
    # 17
    {
        "num": 17, "is_dark": False, "section": "11 Final Solution",
        "type": "col3",
        "headline": "Screen 01 — Centralised Continuity Dashboard",
        "cards": [
            {
                "is_dark": True, "sub": "SYSTEM HEALTH METER", "title": "Continuity Readiness: 68%",
                "text": "Overview of digital footprint protection.",
                "bullets": ["3 of 5 connected accounts configured", "2 verified custodians nominated", "Microsoft 365 pending category scoping", "2FA biometric security active", "→ Action: Complete Google Photos Scoping"]
            },
            {
                "sub": "3 PLATFORMS ACTIVE", "title": "Connected Services",
                "bullets": ["Google Cloud (Drive/Photos): Active • Scoped to Photos", "Apple iCloud (Docs/Vault): Active • Scoped to IDs", "Microsoft 365: Pending Scoping", "One-click disconnect available 24/7"]
            },
            {
                "sub": "2 CUSTODIANS ASSIGNED", "title": "Trusted Circle",
                "bullets": ["Riya Ambade (Sister): Scoped to Family Memories", "Arjun Mehta (Partner): Scoped to Legal Records", "Current State: Standby Mode (Zero active data access)", "Audit log records every verification event"]
            }
        ]
    },
    # 18
    {
        "num": 18, "is_dark": False, "section": "11 Final Solution",
        "type": "cards2_contrast",
        "headline": "Screen 02 — Granular Service Connection Flow",
        "card1": {
            "is_dark": False, "sub": "INTEGRATION PROTOCOL", "title": "Step-by-Step Connection Logic",
            "bullets": ["1. Select Provider: Choose Google, Apple, or Microsoft",
                        "2. Scope Disclosure: System explains exact folder metadata read",
                        "3. 2FA Re-Authentication: Biometric check confirms identity",
                        "4. Boundary Confirmation: Lock excluded content before saving",
                        "5. Instant Revocation: One-click disconnect from dashboard"]
        },
        "card2": {
            "is_dark": True, "sub": "HIGH-FIDELITY MODAL MOCKUP", "title": "Modal UI: Google Cloud Link",
            "text": "Account Link: user@gmail.com (Verified Google ID)",
            "bullets": ["Requested Scopes: Read-only metadata for Photos & Docs",
                        "Architectural Exclusions: Gmail inbox, Chrome history, passwords",
                        "Zero-Trust Guarantee: Continuity Hub will never store passwords, read file contents, or share data with third parties."]
        }
    },
    # 19
    {
        "num": 19, "is_dark": False, "section": "11 Final Solution",
        "type": "col4",
        "headline": "Screen 03 — Category-Based Selective Permission Matrix",
        "cards": [
            {"sub": "CATEGORY 01 • SHARED", "title": "Family Memories", "text": "Scope: Family photos, albums, creative notes.", "bullets": ["Custodian: Sister", "Privacy: Medium", "Release: Inactivity trigger"]},
            {"sub": "CATEGORY 02 • SHARED", "title": "Legal Documents", "text": "Scope: Passport scans, deeds, health insurance.", "bullets": ["Custodian: Partner", "Privacy: High", "Release: Dual verification"]},
            {"is_dark": True, "sub": "CATEGORY 03 • LOCKED", "title": "Private Chats", "text": "Scope: WhatsApp, Signal, SMS, personal emails.", "bullets": ["Custodian: NONE", "Privacy: MAXIMUM", "Auto-delete on trigger"]},
            {"sub": "CATEGORY 04 • RESTRICTED", "title": "Financial Portals", "text": "Scope: Bank names, utility links, account existence.", "bullets": ["Custodian: Reference Only", "Privacy: Zero PINs stored", "Informs that account exists"]}
        ]
    },
    # 20
    {
        "num": 20, "is_dark": False, "section": "11 Final Solution",
        "type": "cards2_contrast",
        "headline": "Screen 04 — Nominated Custodians & Release Triggers",
        "card1": {
            "is_dark": False, "sub": "PRIMARY NOMINEE", "title": "Custodian Dossier: Riya Ambade",
            "bullets": ["Relationship: Sister (Primary Family Custodian)",
                        "Contact: Verified Email & Mobile 2FA Confirmed",
                        "Permitted Scopes: Family Memories & Travel Photography",
                        "Excluded Scopes: Work Drives, Tax Files, Private Chats",
                        "Current Status: Standby Mode (Zero access active)"]
        },
        "card2": {
            "is_dark": True, "sub": "TRIGGER CONDITIONS", "title": "Dual-Gate Release Protocol",
            "bullets": ["Gate 1: Inactivity Heartbeat (90 days with no owner login)",
                        "Gate 2: Verification Alerts (3 warning pings sent over 30 days)",
                        "Gate 3: Official Verification (Custodian submits verified ID)",
                        "Fail-Safe: Any user login immediately resets the countdown to zero",
                        "Silent Revocation: Alter scopes without awkward notifications"]
        }
    },
    # 21
    {
        "num": 21, "is_dark": False, "section": "12 Round 2 Validation",
        "type": "col3",
        "headline": "High-Fidelity Validation Protocol & Verification Plan",
        "cards": [
            {
                "sub": "QUANTITATIVE TARGETS", "title": "Target Usability Benchmarks",
                "bullets": ["System Usability Scale: Target > 80 (Grade A Usability)",
                            "Task Completion Rate: Target > 90% unassisted",
                            "Single Ease Question (SEQ): Target > 5.8 / 7 difficulty rating",
                            "Error Recovery Rate: 100% recovery from accidental delegation"]
            },
            {
                "sub": "EVALUATION COHORT (N=6)", "title": "Participant Stratification",
                "bullets": ["Young Adults (18–25): Focus on chat exclusions & privacy comfort",
                            "Working Adults (30–45): Focus on multi-cloud sync & tax handoff",
                            "Mature Adults (55+): Focus on legibility & custodian setup"]
            },
            {
                "is_dark": True, "sub": "ATTENTION MAPPING", "title": "Visual Attention & Heatmap",
                "bullets": ["Eye-tracking fixation tracking on the Centralised Dashboard",
                            "Hypothesis: Attention clusters on Readiness Score & Locked Chats",
                            "Goal: Validate that privacy boundaries are recognized in <5 seconds"]
            }
        ]
    },
    # 22
    {
        "num": 22, "is_dark": False, "section": "13 Final Outcome",
        "type": "col3",
        "headline": "Delivered Artefacts & Prototype Fidelity Scope",
        "cards": [
            {
                "is_dark": True, "sub": "DELIVERABLES SUMMARY", "title": "Delivered Course Artefacts",
                "bullets": ["24-Slide UX Case Study Deck following brief",
                            "Interactive Figma Prototype (34 documented states)",
                            "Design System Token Library & Component Rules",
                            "A1 Large-Format Exhibition Display Panel"]
            },
            {
                "sub": "FUNCTIONAL CAPABILITIES", "title": "Demonstrated Prototype Scope",
                "bullets": ["Dynamic readiness meter with interactive recalculation",
                            "Granular OAuth service connection simulation",
                            "Category permission engine with real-time feedback",
                            "Custodian nomination and trigger setting flow"]
            },
            {
                "sub": "TECHNICAL DEMARCATION", "title": "Deliberate Boundaries",
                "bullets": ["Live third-party cloud APIs simulated for testing",
                            "Backend cryptography modeled via architecture spec",
                            "Document verification treated as a human-in-the-loop flow"]
            }
        ]
    },
    # 23
    {
        "num": 23, "is_dark": False, "section": "14 Learnings & Limitations",
        "type": "col3",
        "headline": "Critical Reflections & Industry Walled Gardens",
        "cards": [
            {
                "is_dark": True, "sub": "DESIGN TAKEAWAYS", "title": "Pedagogical Reflections",
                "bullets": ["Privacy is the Precondition: Privacy is the condition for participation",
                            "Tone Shapes Engagement: Calm language eliminates emotional avoidance",
                            "Honest Limits Build Trust: Clear boundaries foster user confidence"]
            },
            {
                "sub": "PLATFORM BARRIERS", "title": "Industry Constraints",
                "bullets": ["Walled Gardens: Tech giants restrict third-party data portability",
                            "Legal Fragmentation: Digital property laws vary drastically by nation",
                            "Incapacity Detection: Detecting death without surveillance is hard"]
            },
            {
                "sub": "SERVICE EXTENSIONS", "title": "Future Roadmap",
                "bullets": ["Decentralised ID (DID) with zero-knowledge proofs",
                            "Collaborative multi-signature guardian circles (2 of 3)",
                            "Exhibition peer & faculty critique on November 4"]
            }
        ]
    },
    # 24
    {
        "num": 24, "is_dark": False, "section": "15 Credits & References",
        "type": "col3_credits",
        "headline": "Academic References & Project Credits",
        "card1": {
            "sub": "PRIMARY CITATIONS", "title": "Peer-Reviewed Bibliography",
            "bullets": ["ACM Review (2023): Digital Legacy: A Systematic Review, doi: 10.1145/3610059",
                        "Digital Legacy Association (2024): Digital Death Survey, London, UK",
                        "PubMed / Omega (2025): Social Media & Continuing Bonds, PMID: 41215584",
                        "ScienceDirect (2026): Digital Grief Technology Review, Computers in Human Behavior",
                        "The Indian Express (2026): Digital Data After Death Legal Report"]
        },
        "card2": {
            "sub": "TECHNICAL CITATIONS", "title": "Platform Documentation",
            "bullets": ["Apple Inc. (2026): Legacy Contact Guide HT212360",
                        "Google LLC (2026): Inactive Account Manager ID 3036546",
                        "W3C & FIDO Alliance (2025): WebAuthn Standards"]
        },
        "card3": {
            "is_dark": True, "sub": "PROJECT RECOGNITION", "title": "Course Credits",
            "bullets": ["Student Lead: Vidhi Ambade (Sem 7)",
                        "Course: UEDP-5 (45 Marks)",
                        "Faculty Lead: Prof. Kriti Kusum",
                        "Tools: Figma, Python-pptx, Illustrator",
                        "Programme: B.Des User Experience Design"]
        }
    }
]

def render_html(s):
    is_dark = s.get("is_dark", False)
    bg = "#0D0D0D" if is_dark else "#FFFFFF"
    fg = "#FFFFFF" if is_dark else "#111827"
    border = "#262626" if is_dark else "#E5E7EB"
    muted = "#9CA3AF" if is_dark else "#6B7280"

    html = f"""<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  * {{ box-sizing: border-box; margin: 0; padding: 0; }}
  body {{
    width: 1920px;
    height: 1080px;
    background: {bg};
    color: {fg};
    font-family: -apple-system, BlinkMacSystemFont, "Helvetica Neue", Arial, sans-serif;
    padding: 60px 115px;
    position: relative;
    overflow: hidden;
  }}
  .top-meta {{
    display: flex;
    justify-content: space-between;
    font-size: 13.5px;
    font-weight: 700;
    color: {muted};
    text-transform: uppercase;
    letter-spacing: 0.08em;
    padding-bottom: 16px;
    border-bottom: 1px solid {border};
    margin-bottom: 50px;
  }}
  .bot-meta {{
    position: absolute;
    bottom: 50px;
    left: 115px;
    right: 115px;
    display: flex;
    justify-content: space-between;
    font-size: 13px;
    color: {muted};
    padding-top: 16px;
    border-top: 1px solid {border};
  }}
  .headline {{
    font-size: 38px;
    font-weight: 700;
    line-height: 1.22;
    letter-spacing: -0.025em;
    margin-bottom: 44px;
    max-width: 1500px;
  }}
  .card {{
    background: #FAFAFA;
    border: 1px solid #EAEAEA;
    padding: 36px 32px;
    display: flex;
    flex-direction: column;
  }}
  .card.dark {{
    background: #0D0D0D;
    border: 1px solid #262626;
    color: #FFFFFF;
  }}
  .card-sub {{
    font-size: 11.5px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: {muted};
    margin-bottom: 8px;
  }}
  .card.dark .card-sub {{
    color: #888888;
  }}
  .card-title {{
    font-size: 21px;
    font-weight: 700;
    margin-bottom: 16px;
    line-height: 1.25;
  }}
  .card-text {{
    font-size: 14.5px;
    line-height: 1.5;
    color: {muted};
    margin-bottom: 16px;
  }}
  .card.dark .card-text {{
    color: #A0A0A0;
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
    color: {muted};
  }}
  .grid-2x2 {{
    background: #0D0D0D;
    border: 1px solid #262626;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    height: 520px;
    position: relative;
  }}
  .grid-cell {{
    padding: 36px 32px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    position: relative;
  }}
  .grid-cell:nth-child(1) {{ border-right: 1px solid #262626; border-bottom: 1px solid #262626; }}
  .grid-cell:nth-child(2) {{ border-bottom: 1px solid #262626; }}
  .grid-cell:nth-child(3) {{ border-right: 1px solid #262626; }}
  .grid-num {{
    font-size: 56px;
    font-weight: 700;
    color: #FFFFFF;
    line-height: 1;
    margin-bottom: 10px;
  }}
  .grid-label {{
    font-size: 15px;
    font-weight: 700;
    color: #FFFFFF;
    margin-bottom: 6px;
  }}
  .grid-sub {{
    font-size: 12.5px;
    color: #888888;
    line-height: 1.35;
  }}
</style>
</head>
<body>
  <div class="top-meta">
    <div>The Digital Continuity Hub &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {s['section']}</div>
    <div>{s['num']:02d}</div>
  </div>
"""

    stype = s.get("type")

    if stype == "cover":
        html += f"""
  <div style="font-size: 96px; font-weight: 700; color: #FFFFFF; margin-top: 40px; margin-bottom: 180px;">01</div>
  <div style="max-width: 1400px;">
    <div style="font-size: 64px; font-weight: 700; color: #FFFFFF; line-height: 1.12; letter-spacing: -0.03em; margin-bottom: 18px;">{s['title']}</div>
    <div style="font-size: 24px; color: #888888; line-height: 1.4; max-width: 1200px;">{s['subtitle']}</div>
  </div>
"""
    elif stype == "split_snapshot":
        html += f"""
  <div class="headline">{s['headline']}</div>
  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 32px; margin-bottom: 24px;">
    {render_card_html(s['left_col'])}
    {render_card_html(s['right_col'])}
  </div>
  {render_card_html(s['bottom_banner'])}
"""
    elif stype == "col2":
        html += f"""
  <div class="headline">{s['headline']}</div>
  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 32px; height: 500px;">
    {render_card_html(s['col1'])}
    {render_card_html(s['col2'])}
  </div>
"""
    elif stype == "cards2_contrast":
        html += f"""
  <div class="headline">{s['headline']}</div>
  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 32px; height: 520px;">
    {render_card_html(s['card1'])}
    {render_card_html(s['card2'])}
  </div>
"""
    elif stype == "col3":
        html += f"""
  <div class="headline">{s['headline']}</div>
  <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 28px; height: 520px;">
"""
        for c in s["cards"]:
            html += render_card_html(c)
        html += "  </div>"

    elif stype == "col4":
        html += f"""
  <div class="headline">{s['headline']}</div>
  <div style="display: grid; grid-template-columns: 1fr 1fr 1fr 1fr; gap: 24px; height: 520px;">
"""
        for c in s["cards"]:
            html += render_card_html(c)
        html += "  </div>"

    elif stype == "col2_custom":
        html += f"""
  <div class="headline">{s['headline']}</div>
  <div style="display: grid; grid-template-columns: 1.3fr 1fr; gap: 32px; height: 520px;">
    {render_card_html(s['left'])}
    {render_card_html(s['right'])}
  </div>
"""
    elif stype == "grid2x2_split":
        html += f"""
  <div class="headline">{s['headline']}</div>
  <div style="display: grid; grid-template-columns: 1.05fr 1fr; gap: 36px; height: 520px;">
    {render_card_html(s['narrative'])}
    <div class="grid-2x2">
"""
        for cell in s["grid"]:
            html += f"""
      <div class="grid-cell">
        <div class="grid-num">{cell['num']}</div>
        <div class="grid-label">{cell['label']}</div>
        <div class="grid-sub">{cell['sub']}</div>
      </div>
"""
        html += """
    </div>
  </div>
"""
    elif stype == "steps6":
        html += f"""
  <div class="headline">{s['headline']}</div>
  <div style="display: grid; grid-template-columns: repeat(6, 1fr); gap: 20px; height: 500px;">
"""
        for idx, (step_tag, step_title, step_desc) in enumerate(s["steps"]):
            dark_cls = "dark" if idx == 2 else ""
            html += f"""
    <div class="card {dark_cls}">
      <div class="card-sub">{step_tag}</div>
      <div class="card-title" style="font-size: 16px;">{step_title}</div>
      <div class="card-text" style="font-size: 13.5px;">{step_desc}</div>
    </div>
"""
        html += "  </div>"

    elif stype == "col3_credits":
        html += f"""
  <div class="headline">{s['headline']}</div>
  <div style="display: grid; grid-template-columns: 1.3fr 1fr 1fr; gap: 28px; height: 520px;">
    {render_card_html(s['card1'])}
    {render_card_html(s['card2'])}
    {render_card_html(s['card3'])}
  </div>
"""

    html += f"""
  <div class="bot-meta">
    <div>Vidhi Ambade • Semester 7 • B.Des User Experience Design</div>
    <div>UEDP-5 • Faculty Lead: Prof. Kriti Kusum • 45 Marks</div>
  </div>
</body>
</html>
"""
    return html

def render_card_html(c):
    is_d = c.get("is_dark", False)
    cls = "card dark" if is_d else "card"
    sub = c.get("sub", "")
    title = c.get("title", "")
    text = c.get("text", "")
    bullets = c.get("bullets", [])

    h = f'    <div class="{cls}">\n'
    if sub:
        h += f'      <div class="card-sub">{sub}</div>\n'
    if title:
        h += f'      <div class="card-title">{title}</div>\n'
    if text:
        h += f'      <div class="card-text">{text}</div>\n'
    if bullets:
        h += '      <ul class="card-list">\n'
        for b in bullets:
            h += f'        <li>{b}</li>\n'
        h += '      </ul>\n'
    h += '    </div>\n'
    return h

def main():
    print("Generating HTML slide pages and rendering 1920x1080 screenshots...")
    png_list = []
    for s in SLIDES:
        num = s["num"]
        html_code = render_html(s)
        h_path = os.path.join(OUT_DIR, f"slide_{num:02d}.html")
        p_path = os.path.join(OUT_DIR, f"slide_{num:02d}.png")
        with open(h_path, "w", encoding="utf-8") as f:
            f.write(html_code)
        
        # Chrome render
        cmd = [
            CHROME_BIN,
            "--headless",
            "--disable-gpu",
            f"--screenshot={p_path}",
            "--window-size=1920,1080",
            f"file://{h_path}"
        ]
        subprocess.run(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
        if os.path.exists(p_path):
            png_list.append(p_path)
            print(f"Slide {num:02d}: Rendered {p_path}")
        else:
            print(f"Slide {num:02d}: Failed")

    # Compile into PDF
    if png_list:
        print("Compiling into consolidated PDF...")
        images = [Image.open(p).convert("RGB") for p in png_list]
        out_pdf_workspace = "/Users/vidhi/Desktop/uni/MIA a3/Digital_Continuity_Hub_UEDP5_Case_Study.pdf"
        out_pdf_downloads = "/Users/vidhi/Downloads/Digital_Continuity_Hub_UEDP5_Case_Study.pdf"
        out_pdf_desktop = "/Users/vidhi/Desktop/Digital_Continuity_Hub_UEDP5_Case_Study.pdf"

        images[0].save(out_pdf_workspace, save_all=True, append_images=images[1:], quality=95)
        shutil.copyfile(out_pdf_workspace, out_pdf_downloads)
        shutil.copyfile(out_pdf_workspace, out_pdf_desktop)
        print("PDF generated successfully!")

if __name__ == "__main__":
    main()
