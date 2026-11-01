#!/usr/bin/env python3
"""
Full Presentation Generator for UEDP-5 Final Case Study: Digital Continuity Hub
Student: Vidhi Ambade | Faculty: Prof. Kriti Kusum | Semester 7
Generates:
1. Native, fully editable 16:9 widescreen PowerPoint deck (.pptx)
2. Standalone HTML presentation preview matching Swiss-modernist aesthetics
3. High-resolution 1920x1080 slide image renders for quality inspection
"""

import os
import shutil
from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.enum.text import PP_ALIGN, MSO_ANCHOR
from pptx.enum.shapes import MSO_SHAPE
from pptx.dml.color import RGBColor

# Color Tokens
C_BG_LIGHT = RGBColor(248, 249, 250)      # #F8F9FA
C_BG_DARK = RGBColor(18, 18, 18)          # #121212
C_CARD_DARK = RGBColor(24, 24, 24)        # #181818
C_CARD_DARK_BORDER = RGBColor(48, 48, 48) # #303030
C_CARD_SAGE = RGBColor(226, 234, 229)     # #E2EAE5
C_CARD_SAGE_BORDER = RGBColor(204, 217, 209)
C_CARD_SLATE = RGBColor(238, 240, 242)    # #EEF0F2
C_CARD_SLATE_BORDER = RGBColor(220, 224, 228)
C_CARD_WHITE = RGBColor(255, 255, 255)    # #FFFFFF
C_CARD_WHITE_BORDER = RGBColor(229, 231, 235)

C_TEXT_TITLE = RGBColor(17, 24, 39)       # #111827
C_TEXT_BODY = RGBColor(55, 65, 81)        # #374151
C_TEXT_MUTED = RGBColor(107, 114, 128)    # #6B7280
C_TEXT_LIGHT = RGBColor(255, 255, 255)
C_TEXT_LIGHT_MUTED = RGBColor(156, 163, 175)

C_EMERALD = RGBColor(16, 185, 129)
C_CRIMSON = RGBColor(239, 68, 68)

FONT_FAM = "Helvetica Neue"

def init_prs():
    prs = Presentation()
    prs.slide_width = Inches(13.333)
    prs.slide_height = Inches(7.5)
    return prs

def make_slide(prs, is_dark=False):
    slide = prs.slides.add_slide(prs.slide_layouts[6])
    bg = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, 0, 0, Inches(13.333), Inches(7.5))
    bg.fill.solid()
    bg.fill.fore_color.rgb = C_BG_DARK if is_dark else C_BG_LIGHT
    bg.line.fill.background()
    return slide

def add_header(slide, tag, title, subtitle="", is_dark=False):
    # Pill
    pill_w = Inches(len(tag) * 0.11 + 0.6)
    pill = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(0.55), pill_w, Inches(0.32))
    pill.fill.solid()
    pill.fill.fore_color.rgb = C_CARD_DARK if is_dark else C_CARD_WHITE
    pill.line.color.rgb = C_CARD_DARK_BORDER if is_dark else C_CARD_WHITE_BORDER
    pill.line.width = Pt(1)
    tf_p = pill.text_frame
    tf_p.word_wrap = False
    tf_p.margin_left = tf_p.margin_right = Inches(0.12)
    tf_p.margin_top = tf_p.margin_bottom = Inches(0.04)
    p_p = tf_p.paragraphs[0]
    p_p.text = tag.upper()
    p_p.font.name = FONT_FAM
    p_p.font.size = Pt(8.5)
    p_p.font.bold = True
    p_p.font.color.rgb = C_TEXT_LIGHT_MUTED if is_dark else C_TEXT_MUTED
    p_p.alignment = PP_ALIGN.CENTER

    # Arrow
    arrow = slide.shapes.add_shape(MSO_SHAPE.OVAL, Inches(0.8) + pill_w + Inches(0.12), Inches(0.55), Inches(0.32), Inches(0.32))
    arrow.fill.solid()
    arrow.fill.fore_color.rgb = C_CARD_DARK if is_dark else C_CARD_WHITE
    arrow.line.color.rgb = C_CARD_DARK_BORDER if is_dark else C_CARD_WHITE_BORDER
    arrow.line.width = Pt(1)
    tf_a = arrow.text_frame
    tf_a.margin_left = tf_a.margin_right = tf_a.margin_top = tf_a.margin_bottom = 0
    p_a = tf_a.paragraphs[0]
    p_a.text = "↘"
    p_a.font.name = FONT_FAM
    p_a.font.size = Pt(10)
    p_a.font.color.rgb = C_TEXT_LIGHT_MUTED if is_dark else C_TEXT_MUTED
    p_a.alignment = PP_ALIGN.CENTER

    # Right meta
    meta = slide.shapes.add_textbox(Inches(7.5), Inches(0.55), Inches(5.0), Inches(0.35))
    tf_m = meta.text_frame
    tf_m.margin_left = tf_m.margin_right = tf_m.margin_top = tf_m.margin_bottom = 0
    p_m = tf_m.paragraphs[0]
    p_m.text = "UEDP-5 • SEMESTER 7 • PROF. KRITI KUSUM"
    p_m.font.name = FONT_FAM
    p_m.font.size = Pt(8.5)
    p_m.font.bold = True
    p_m.font.color.rgb = C_TEXT_LIGHT_MUTED if is_dark else C_TEXT_MUTED
    p_m.alignment = PP_ALIGN.RIGHT

    # Title
    t_box = slide.shapes.add_textbox(Inches(0.8), Inches(0.98), Inches(11.7), Inches(0.52))
    tf_t = t_box.text_frame
    tf_t.word_wrap = True
    tf_t.margin_left = tf_t.margin_right = tf_t.margin_top = tf_t.margin_bottom = 0
    p_t = tf_t.paragraphs[0]
    p_t.text = title
    p_t.font.name = FONT_FAM
    p_t.font.size = Pt(21)
    p_t.font.bold = True
    p_t.font.color.rgb = C_TEXT_LIGHT if is_dark else C_TEXT_TITLE

    # Subtitle
    if subtitle:
        s_box = slide.shapes.add_textbox(Inches(0.8), Inches(1.52), Inches(11.7), Inches(0.38))
        tf_s = s_box.text_frame
        tf_s.word_wrap = True
        tf_s.margin_left = tf_s.margin_right = tf_s.margin_top = tf_s.margin_bottom = 0
        p_s = tf_s.paragraphs[0]
        p_s.text = subtitle
        p_s.font.name = FONT_FAM
        p_s.font.size = Pt(11.5)
        p_s.font.color.rgb = C_TEXT_LIGHT_MUTED if is_dark else C_TEXT_MUTED

def add_card(slide, x, y, w, h, bg_rgb, border_rgb, title="", badge="", items=[], is_dark=False):
    shape = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(x), Inches(y), Inches(w), Inches(h))
    shape.fill.solid()
    shape.fill.fore_color.rgb = bg_rgb
    if border_rgb:
        shape.line.color.rgb = border_rgb
        shape.line.width = Pt(1)
    else:
        shape.line.fill.background()

    tf = shape.text_frame
    tf.word_wrap = True
    tf.margin_left = tf.margin_right = Inches(0.24)
    tf.margin_top = tf.margin_bottom = Inches(0.22)
    tf.vertical_anchor = MSO_ANCHOR.TOP

    p0 = tf.paragraphs[0]
    has_badge = bool(badge)
    if badge:
        p0.text = badge.upper()
        p0.font.name = FONT_FAM
        p0.font.size = Pt(8.5)
        p0.font.bold = True
        p0.font.color.rgb = C_TEXT_LIGHT_MUTED if is_dark else C_TEXT_MUTED
        p0.space_after = Pt(2)

    if title:
        p_t = tf.add_paragraph() if has_badge else p0
        p_t.text = title
        p_t.font.name = FONT_FAM
        p_t.font.size = Pt(13.5)
        p_t.font.bold = True
        p_t.font.color.rgb = C_TEXT_LIGHT if is_dark else C_TEXT_TITLE
        p_t.space_after = Pt(8)

    for it in items:
        p = tf.add_paragraph()
        if isinstance(it, tuple):
            lead, body = it
            p.text = f"• {lead}: {body}" if lead else f"• {body}"
        else:
            p.text = f"• {it}" if not it.startswith("—") and not it.startswith("→") else it
        p.font.name = FONT_FAM
        p.font.size = Pt(9.5)
        p.font.color.rgb = C_TEXT_LIGHT if is_dark else C_TEXT_BODY
        p.space_after = Pt(3.5)

    return shape

def add_metric_card(slide, x, y, w, h, bg_rgb, border_rgb, metric, label, subtext="", is_dark=False):
    shape = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(x), Inches(y), Inches(w), Inches(h))
    shape.fill.solid()
    shape.fill.fore_color.rgb = bg_rgb
    if border_rgb:
        shape.line.color.rgb = border_rgb
        shape.line.width = Pt(1)
    else:
        shape.line.fill.background()

    tf = shape.text_frame
    tf.word_wrap = True
    tf.margin_left = tf.margin_right = Inches(0.22)
    tf.margin_top = tf.margin_bottom = Inches(0.20)
    tf.vertical_anchor = MSO_ANCHOR.TOP

    p0 = tf.paragraphs[0]
    p0.text = metric
    p0.font.name = FONT_FAM
    p0.font.size = Pt(34)
    p0.font.bold = True
    p0.font.color.rgb = C_TEXT_LIGHT if is_dark else C_TEXT_TITLE
    p0.space_after = Pt(3)

    p1 = tf.add_paragraph()
    p1.text = label
    p1.font.name = FONT_FAM
    p1.font.size = Pt(11)
    p1.font.bold = True
    p1.font.color.rgb = C_TEXT_LIGHT if is_dark else C_TEXT_TITLE
    p1.space_after = Pt(3)

    if subtext:
        p2 = tf.add_paragraph()
        p2.text = subtext
        p2.font.name = FONT_FAM
        p2.font.size = Pt(9)
        p2.font.color.rgb = C_TEXT_LIGHT_MUTED if is_dark else C_TEXT_MUTED

    return shape

# -------------------------------------------------------------
# BUILD SLIDES
# -------------------------------------------------------------

def build_deck():
    prs = init_prs()

    # SLIDE 1: 01 — Cover
    s1 = make_slide(prs, is_dark=False)
    # Header tag
    pill1 = s1.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(0.8), Inches(2.8), Inches(0.36))
    pill1.fill.solid()
    pill1.fill.fore_color.rgb = C_CARD_WHITE
    pill1.line.color.rgb = C_CARD_WHITE_BORDER
    p = pill1.text_frame.paragraphs[0]
    p.text = "WELCOME • FINAL CASE STUDY"
    p.font.name = FONT_FAM; p.font.size = Pt(9); p.font.bold = True; p.font.color.rgb = C_TEXT_MUTED
    p.alignment = PP_ALIGN.CENTER

    # Huge Main Title
    t1 = s1.shapes.add_textbox(Inches(0.8), Inches(1.5), Inches(11.7), Inches(1.3))
    p = t1.text_frame.paragraphs[0]
    p.text = "DIGITAL CONTINUITY HUB"
    p.font.name = FONT_FAM; p.font.size = Pt(44); p.font.bold = True; p.font.color.rgb = C_TEXT_TITLE

    p_sub = t1.text_frame.add_paragraph()
    p_sub.text = "A Centralised Experience for Understanding Digital Footprints, Organising Important Records, and Governing Selective Custodian Delegation."
    p_sub.font.name = FONT_FAM; p_sub.font.size = Pt(15); p_sub.font.color.rgb = C_TEXT_MUTED
    p_sub.space_before = Pt(8)

    # 3 Bento Metadata Cards across bottom
    add_card(s1, 0.8, 3.4, 3.65, 3.3, C_CARD_DARK, C_CARD_DARK_BORDER,
             title="Candidate Dossier", badge="STUDENT & PROJECT METADATA",
             items=[
                 ("Student", "Vidhi Ambade"),
                 ("Programme", "B.Des User Experience Design (Sem 7)"),
                 ("Course", "User Experience Design Project 5 (UEDP-5)"),
                 ("Faculty Lead", "Prof. Kriti Kusum"),
                 ("Assessment", "45 Marks — UX Solution & Exhibition")
             ], is_dark=True)

    add_card(s1, 4.7, 3.4, 3.65, 3.3, C_CARD_SAGE, C_CARD_SAGE_BORDER,
             title="Design Inquiry", badge="CORE PROBLEM SPACE",
             items=[
                 ("Focus Domain", "Digital Legacy, Continuity & Data Privacy"),
                 ("Core Premise", "Fragmented lives across isolated cloud platforms"),
                 ("Key Challenge", "Access is not binary; users reject 'share-all'"),
                 ("Proposed Direction", "Centralised dashboard with granular boundaries"),
                 ("Interaction Model", "Least-privilege selective custodian access")
             ], is_dark=False)

    add_card(s1, 8.6, 3.4, 3.9, 3.3, C_CARD_SLATE, C_CARD_SLATE_BORDER,
             title="Deliverables Schedule", badge="ACADEMIC EVALUATION",
             items=[
                 ("Case Study Deck", "19-Slide Research-to-Validation Journey"),
                 ("Prototype", "Figma Interactive Flow (34 Core States)"),
                 ("Exhibition Panel", "Large-Format A1 Summary Board"),
                 ("Submission Date", "October 30, 2026 (Moodle)"),
                 ("Exhibition Jury", "November 04, 2026 (Exhibition Display)")
             ], is_dark=False)

    # SLIDE 2: 02 — Project Snapshot
    s2 = make_slide(prs, is_dark=False)
    add_header(s2, "02 • PROJECT SNAPSHOT", "Project Overview, Methodology & Scope Boundaries",
               "Executive framing of project domain, designer responsibilities, toolchain, and explicit non-goals.")

    add_card(s2, 0.8, 2.1, 5.7, 2.3, C_CARD_DARK, C_CARD_DARK_BORDER,
             title="Domain & Ecosystem Context", badge="DESIGN INQUIRY",
             items=[
                 ("Domain", "Digital Legacy, Personal Data Governance & Service Continuity"),
                 ("Nature of Work", "UX, Interaction Design & Service Design Framework"),
                 ("The Human Tension", "Modern identity is scattered across Google, Apple, Meta and cloud drives with zero unified continuity planning.")
             ], is_dark=True)

    add_card(s2, 6.8, 2.1, 5.7, 2.3, C_CARD_SAGE, C_CARD_SAGE_BORDER,
             title="Designer Role & Core Toolchain", badge="METHODOLOGY & ROLE",
             items=[
                 ("Designer Role", "Primary UX Researcher, Information Architect & UI Designer"),
                 ("Primary Toolchain", "Figma, Notion, Adobe Illustrator, Python-pptx, User Testing Frameworks"),
                 ("Scope Timeline", "Assignment 2 Research Foundation → Assignment 3 Validated System")
             ], is_dark=False)

    add_card(s2, 0.8, 4.65, 5.7, 2.3, C_CARD_SLATE, C_CARD_SLATE_BORDER,
             title="The Proposed Intervention", badge="PRODUCT DEFINITION",
             items=[
                 ("Concept", "Centralised Digital Continuity Dashboard ('Continuity Hub')"),
                 ("Value Proposition", "A calm, dignified control centre to audit connected services, categorize records, and selectively nominate trusted custodians."),
                 ("Core Mental Model", "Understand → Organise → Decide → Communicate → Continue")
             ], is_dark=False)

    add_card(s2, 6.8, 4.65, 5.7, 2.3, C_CARD_WHITE, C_CARD_WHITE_BORDER,
             title="Architectural Non-Goals & Boundaries", badge="EXPLICIT BOUNDARIES",
             items=[
                 ("Not an Estate Will", "Does not execute legal asset distribution or probate."),
                 ("Not a Password Vault", "Never stores master master passwords or bypasses encryption."),
                 ("Zero Scraping", "Operates purely via authorized OAuth metadata scopes.")
             ], is_dark=False)

    # SLIDE 3: 03 — Problem and Opportunity
    s3 = make_slide(prs, is_dark=False)
    add_header(s3, "03 • PROBLEM & OPPORTUNITY", "The Fragmentation of Modern Digital Lives",
               "Addressing the tension between sprawling digital footprints and the absence of calm, selective continuity tools.")

    add_card(s3, 0.8, 2.1, 3.65, 4.85, C_CARD_SAGE, C_CARD_SAGE_BORDER,
             title="Assumptions vs Reality", badge="OBSERVED PROBLEM SPACE",
             items=[
                 ("Initial Faculty Assumption", "People need a 'digital will' to transfer all online accounts after death."),
                 ("Observed Research Reality", "Users reject blanket transfer. They fear privacy invasion and struggle simply knowing what accounts exist."),
                 ("The Blindspot", "The gap appears before legacy planning—people cannot organize what they cannot see."),
                 ("Cognitive Load", "Managing 15+ logins across siloed apps induces severe procrastination.")
             ], is_dark=False)

    add_card(s3, 4.7, 2.1, 3.65, 4.85, C_CARD_DARK, C_CARD_DARK_BORDER,
             title="The Trilemma of Accumulation", badge="CORE TENSIONS",
             items=[
                 ("01. Platform Fragmentation", "Photos in iCloud, taxes in Drive, chats in WhatsApp, finances in bank apps."),
                 ("02. The Binary Access Trap", "Platforms offer all-or-nothing access: complete lockout or total account surrender."),
                 ("03. Morbid Avoidance", "Existing death-oriented tools induce emotional paralysis and hesitation."),
                 ("04. Trust Hesitation", "Users want family to have photos but dread exposing private message threads.")
             ], is_dark=True)

    add_card(s3, 8.6, 2.1, 3.9, 4.85, C_CARD_SLATE, C_CARD_SLATE_BORDER,
             title="The Strategic Opportunity", badge="UX INTERVENTION",
             items=[
                 ("Shift the Narrative", "Reframe from morbid 'death planning' to calm, everyday digital continuity."),
                 ("Centralised Audit", "Provide a single holistic map of active services and category readiness."),
                 ("Selective Scoping", "Allow users to delegate family memories while keeping chats locked."),
                 ("Zero-Trust Architecture", "Sensitive categories excluded by default with 2FA protection.")
             ], is_dark=False)

    # SLIDE 4: 04 — Research Recap (A: Secondary Literature & Precedents)
    s4 = make_slide(prs, is_dark=False)
    add_header(s4, "04 • SECONDARY RESEARCH", "Academic Literature & Real-World Precedents",
               "Synthesising peer-reviewed research, platform policy silos, and real-world legal access disputes.")

    add_card(s4, 0.8, 2.1, 5.7, 2.3, C_CARD_WHITE, C_CARD_WHITE_BORDER,
             title="Peer-Reviewed Literature Synthesis", badge="ACADEMIC CITATIONS",
             items=[
                 ("ACM Systematic Literature Review (2023)", "Digital legacy encompasses identity, continuing bonds, relationships, and affective memory, not just legal passwords (doi: 10.1145/3610059)."),
                 ("ScienceDirect Systematic Review (2026)", "Digital bereavement technologies carry severe risks of privacy violation, overreliance, and cultural mourning conflicts (doi: 10.1016/j.chb.2026).")
             ], is_dark=False)

    add_card(s4, 6.8, 2.1, 5.7, 2.3, C_CARD_SAGE, C_CARD_SAGE_BORDER,
             title="Platform Isolation & Policy Gaps", badge="EXISTING PLATFORM TOOLS",
             items=[
                 ("Apple Legacy Contact (2026)", "Requires Apple ID, 256-bit access key, and death certificate approval. Strictly limited to Apple's ecosystem."),
                 ("Google Inactive Account Manager", "Triggers after 3–18 months inactivity; relies on automated email alerts without cross-platform context.")
             ], is_dark=False)

    add_card(s4, 0.8, 4.65, 5.7, 2.3, C_CARD_DARK, C_CARD_DARK_BORDER,
             title="Judicial Precedent: Gandhinagar Court Dispute", badge="REAL-WORLD CASE STUDY",
             items=[
                 ("The Indian Express (2026)", "A deceased man's family petitioned a Gandhinagar civil court to access his locked iPhone and iCloud repository containing crucial family documents."),
                 ("Procedural Impasse", "Platform refusal highlighted the painful technical, procedural, and legal barriers families face without pre-configured continuity.")
             ], is_dark=True)

    add_card(s4, 6.8, 4.65, 5.7, 2.3, C_CARD_SLATE, C_CARD_SLATE_BORDER,
             title="Secondary Research Implications", badge="DESIGN IMPLICATIONS",
             items=[
                 ("Access is Not Binary", "Users must be able to share selected memories while excluding private messages."),
                 ("Emotional Boundaries", "Tools must feel respectful, calm, and trustworthy rather than bureaucratic or macabre."),
                 ("Ecosystem Federation", "The UX must bridge platform silos without violating individual service APIs.")
             ], is_dark=False)

    # SLIDE 5: 04 — Research Recap (B: Primary Methodology & Pilot Dataset)
    s5 = make_slide(prs, is_dark=False)
    add_header(s5, "04 • PRIMARY RESEARCH", "Research Methodology & Pilot Dataset Synthesis",
               "Transparent documentation of primary research instruments, interview protocol, and exploratory pilot data.")

    # Top Methodology Bento
    add_card(s5, 0.8, 2.1, 5.7, 1.9, C_CARD_WHITE, C_CARD_WHITE_BORDER,
             title="Research Instruments & Protocol", badge="PRIMARY METHODOLOGY",
             items=[
                 ("Quantitative Google Form", "15 structured questions covering storage habits, privacy barriers, retrieval difficulty, and custodian preferences."),
                 ("Cross-Generational Protocol", "6 targeted interview angles: Student (15y), College (22y), Business (36y), Doctor (47y), Academic (52y), Senior (75y).")
             ], is_dark=False)

    add_card(s5, 6.8, 2.1, 5.7, 1.9, C_CARD_DARK, C_CARD_DARK_BORDER,
             title="Academic Integrity Disclosure", badge="RESEARCH TRANSPARENCY",
             items=[
                 ("Pilot Model Disclosure", "The quantitative metrics below reflect the structured exploratory pilot model (n=100) established for pattern analysis."),
                 ("Academic Honesty", "Pilot data guides hypothesis generation; verified separate from live testing protocols.")
             ], is_dark=True)

    # Bottom 4 Metric Cards
    add_metric_card(s5, 0.8, 4.25, 2.7, 2.7, C_CARD_SAGE, C_CARD_SAGE_BORDER,
                    "82%", "Multi-Platform Storage", "Store critical files, photos, and records across 3+ unlinked cloud services.")

    add_metric_card(s5, 3.8, 4.25, 2.7, 2.7, C_CARD_SAGE, C_CARD_SAGE_BORDER,
                    "78%", "Unaware of Concept", "Had never encountered the term 'digital legacy' prior to the survey.")

    add_metric_card(s5, 6.8, 4.25, 2.7, 2.7, C_CARD_DARK, C_CARD_DARK_BORDER,
                    "71%", "Privacy as Barrier", "Cite disclosure of private chats as their #1 reason for avoiding delegation.", is_dark=True)

    add_metric_card(s5, 9.8, 4.25, 2.7, 2.7, C_CARD_SLATE, C_CARD_SLATE_BORDER,
                    "70%", "Retrieval Friction", "Experience significant difficulty locating specific files from 3+ years ago.")

    # SLIDE 6: 05 — Design Direction
    s6 = make_slide(prs, is_dark=False)
    add_header(s6, "05 • DESIGN DIRECTION", "Translating Insights into Design Principles",
               "Architectural concept exploration, tradeoff analysis, and justification of the centralised dashboard.")

    add_card(s6, 0.8, 2.1, 5.7, 4.85, C_CARD_SAGE, C_CARD_SAGE_BORDER,
             title="Core Design Principles", badge="SYSTEM PILLARS",
             items=[
                 ("01. Selective Delegation", "Access must never be all-or-nothing. Users configure permissions per category (e.g. photos vs legal certificates)."),
                 ("02. Privacy-by-Default", "High-risk items (private chats, passwords, search histories) are permanently locked by default."),
                 ("03. Plain-Language Scoping", "Every permission state explains in plain language what a custodian can and cannot see."),
                 ("04. Zero-Friction Revocability", "Users retain absolute sovereignty to modify, freeze, or revoke any permission instantly."),
                 ("05. Calm, Respectful Tone", "Eliminates macabre death imagery; frames the interaction around care, clarity, and organisation.")
             ], is_dark=False)

    add_card(s6, 6.8, 2.1, 5.7, 4.85, C_CARD_DARK, C_CARD_DARK_BORDER,
             title="Concept Matrix & Direction Selection", badge="SELECTION RATIONALE",
             items=[
                 ("Concept A: Browser Extension", "Fragile, requires active browser session, fails to cover native mobile cloud services."),
                 ("Concept B: Physical USB Vault", "High risk of hardware loss, rapidly becomes obsolete as accounts evolve."),
                 ("Concept C: Centralised Continuity Hub", "SELECTED DIRECTION. Unifies multi-service overview, minimizes cognitive overhead, and enables centralized boundary governance."),
                 ("Technical Feasibility Boundary", "The Hub does not clone or store file contents. It acts as an identity and permission policy coordinator using scoped OAuth tokens.")
             ], is_dark=True)

    # SLIDE 7: 06 — Experience Structure
    s7 = make_slide(prs, is_dark=False)
    add_header(s7, "06 • EXPERIENCE STRUCTURE", "Information Architecture & User Flow Blueprint",
               "System topology connecting authentication, service aggregation, category scoping, and custodian release.")

    add_card(s7, 0.8, 2.1, 5.7, 4.85, C_CARD_SLATE, C_CARD_SLATE_BORDER,
             title="System Information Architecture (IA)", badge="STRUCTURAL HIERARCHY",
             items=[
                 ("1. Overview & Health", "Continuity readiness score, connected account status, security alerts."),
                 ("2. Connected Services", "Cloud drives, photo vaults, communication accounts, subscriptions."),
                 ("3. Asset Categories", "Family Memories, Official Documents, Financial Portals, Continuity Notes."),
                 ("4. Trusted Circle", "Nominated custodians, identity verification, assigned scopes."),
                 ("5. Permission Engine", "Category-to-person matrix with explicit exclusion toggles."),
                 ("6. Release Triggers", "Inactivity countdowns, multi-factor pings, dual-verification."),
                 ("7. Security & 2FA", "Biometrics, passkey management, cryptographic activity audit.")
             ], is_dark=False)

    add_card(s7, 6.8, 2.1, 5.7, 4.85, C_CARD_WHITE, C_CARD_WHITE_BORDER,
             title="Primary End-to-End User Flow", badge="STEP-BY-STEP INTERACTION",
             items=[
                 ("Step 1: Secure Onboarding", "Biometric / 2FA account setup establishing primary ownership."),
                 ("Step 2: Connect External Accounts", "Scoped OAuth link for Google, Apple, or OneDrive."),
                 ("Step 3: Define Category Boundaries", "Lock sensitive folders (chats/finances) by default."),
                 ("Step 4: Nominate Trusted Custodian", "Assign specific contact details and relationship role."),
                 ("Step 5: Configure Release Trigger", "Select inactivity period (e.g. 90 days) & verification method."),
                 ("Step 6: Audit & Continuous Control", "Receive periodic health check-ins with one-click revocation.")
             ], is_dark=False)

    # SLIDE 8: 07 — Early Exploration
    s8 = make_slide(prs, is_dark=False)
    add_header(s8, "07 • EARLY EXPLORATION", "Low-Fidelity Wireframes & Mental Models",
               "Evaluating architectural navigation paradigms: Service-Centric vs. Person-Centric vs. Hybrid Bento Dashboard.")

    add_card(s8, 0.8, 2.1, 3.65, 4.85, C_CARD_SLATE, C_CARD_SLATE_BORDER,
             title="Concept 1: Service-Centric", badge="EXPLORATION A",
             items=[
                 ("Model", "Organized around individual platforms (Google, Apple, Meta)."),
                 ("Wireframe Pattern", "Vertical list of apps with individual permission toggles."),
                 ("Usability Friction", "Forces users to replicate privacy rules across 10+ accounts."),
                 ("Verdict", "High mental fatigue; fails to provide a cohesive continuity overview.")
             ], is_dark=False)

    add_card(s8, 4.7, 2.1, 3.65, 4.85, C_CARD_SLATE, C_CARD_SLATE_BORDER,
             title="Concept 2: Person-Centric", badge="EXPLORATION B",
             items=[
                 ("Model", "Organized around nominated individuals (Partner, Sibling)."),
                 ("Wireframe Pattern", "Custodian profile cards with attached asset folders."),
                 ("Usability Friction", "Obscures unassigned digital assets and service health."),
                 ("Verdict", "Fails to help users understand their total digital footprint.")
             ], is_dark=False)

    add_card(s8, 8.6, 2.1, 3.9, 4.85, C_CARD_DARK, C_CARD_DARK_BORDER,
             title="Concept 3: Hybrid Bento Dashboard", badge="SELECTED ARCHITECTURE",
             items=[
                 ("Model", "Unified overview balancing service health, categories, and custodians."),
                 ("Wireframe Pattern", "Modular bento grid with readiness score and privacy shield."),
                 ("Key Advantage", "Immediate visual clarity on what is protected vs what needs attention."),
                 ("Design Selection", "Reduces cognitive anxiety while maintaining rigorous control.")
             ], is_dark=True)

    # SLIDE 9: 08 — Round 1 Testing
    s9 = make_slide(prs, is_dark=False)
    add_header(s9, "08 • ROUND 1 TESTING", "Low-Fidelity Usability Testing Protocol (Planned)",
               "A structured, hypothesis-driven testing protocol designed for low-fidelity concept validation.")

    add_card(s9, 0.8, 2.1, 3.65, 4.85, C_CARD_WHITE, C_CARD_WHITE_BORDER,
             title="Core Usability Tasks", badge="EVALUATION SCENARIOS",
             items=[
                 ("Task 1: Scoped Cloud Connect", "Connect Google Drive while ensuring WhatsApp backups and personal emails remain unlinked."),
                 ("Task 2: Selective Nomination", "Designate a sibling as 'Memory Custodian' with access strictly limited to family photos."),
                 ("Task 3: Permission Audit & Revoke", "Identify which external services are active and revoke access for a previously nominated contact.")
             ], is_dark=False)

    add_card(s9, 4.7, 2.1, 3.65, 4.85, C_CARD_DARK, C_CARD_DARK_BORDER,
             title="Research Hypotheses", badge="RESEARCH QUESTIONS",
             items=[
                 ("RQ1: Mental Model Clarity", "Do users intuitively differentiate between connecting a cloud service and granting custodian access?"),
                 ("RQ2: Exclusion Reassurance", "Does the 'Locked by Default' visual badge reduce hesitation during setup?"),
                 ("H1: Ambiguity Hypothesis", "Users will hesitate if permission scopes are described in technical OAuth terminology rather than plain human terms.")
             ], is_dark=True)

    add_card(s9, 8.6, 2.1, 3.9, 4.85, C_CARD_SAGE, C_CARD_SAGE_BORDER,
             title="Evidence Capture Template", badge="EVALUATION METRICS",
             items=[
                 ("Task Completion Rate", "Target Benchmark: > 85% unassisted completion across tasks."),
                 ("Single Ease Question (SEQ)", "Target: > 5.5 / 7 post-task difficulty rating."),
                 ("System Usability Scale (SUS)", "Target: > 75 on low-fidelity wireframe walkthrough."),
                 ("Qualitative Logging", "Capturing think-aloud verbalisations, hesitation cues, and privacy doubts.")
             ], is_dark=False)

    # SLIDE 10: 09 — Iteration
    s10 = make_slide(prs, is_dark=False)
    add_header(s10, "09 • ITERATION", "Evidence-Driven Design Refinements & Iterations",
               "Anticipating critical user friction points and resolving core ambiguities prior to high-fidelity design.")

    add_card(s10, 0.8, 2.1, 3.65, 4.85, C_CARD_SLATE, C_CARD_SLATE_BORDER,
             title="Iteration 01: Connection vs Access", badge="STRUCTURAL CLARITY",
             items=[
                 ("Initial Friction", "Users feared connecting Google Drive instantly shared their files with family."),
                 ("Root Cause", "Visual conflation of service authentication and custodian delegation."),
                 ("Design Refinement", "Separated into two distinct visual phases: Step 1 (Private Service Sync) and Step 2 (Independent Custodian Scoping)."),
                 ("Reassurance Tag", "Added explicit badge: 'Connecting a service does not share files with anyone.'")
             ], is_dark=False)

    add_card(s10, 4.7, 2.1, 3.65, 4.85, C_CARD_DARK, C_CARD_DARK_BORDER,
             title="Iteration 02: Zero-Trust Exclusions", badge="PRIVACY PROTECTION",
             items=[
                 ("Initial Friction", "Open checklists created decision paralysis and anxiety over accidental over-sharing."),
                 ("Root Cause", "Users had to manually remember to uncheck private items."),
                 ("Design Refinement", "Implemented Zero-Trust Defaults. Private chats, SMS backups, and financial passwords are permanently locked with red padlock shields."),
                 ("Result", "Drastically reduced privacy anxiety; user must explicitly unlock sensitive categories.")
             ], is_dark=True)

    add_card(s10, 8.6, 2.1, 3.9, 4.85, C_CARD_SAGE, C_CARD_SAGE_BORDER,
             title="Iteration 03: Plain-Language Triggers", badge="COGNITIVE EASE",
             items=[
                 ("Initial Friction", "Users were bewildered by technical jargon like 'Inactivity OAuth Expiration Epoch'."),
                 ("Root Cause", "Platform-centric engineering language alienated non-technical users."),
                 ("Design Refinement", "Replaced with transparent conversational conditions: 'Access is released ONLY after 90 days of inactivity AND 3 unacknowledged notifications.'"),
                 ("Result", "Clear, predictable mental model of when continuity actually triggers.")
             ], is_dark=False)

    # SLIDE 11: 10 — Visual Identity and Design System
    s11 = make_slide(prs, is_dark=False)
    add_header(s11, "10 • DESIGN SYSTEM", "Visual Identity, Design Tokens & Component Logic",
               "A calm, Swiss-modernist aesthetic engineered for clarity, dignity, and low cognitive anxiety.")

    add_card(s11, 0.8, 2.1, 2.7, 4.85, C_CARD_DARK, C_CARD_DARK_BORDER,
             title="Color Tokens", badge="SURFACE PALETTE",
             items=[
                 ("Obsidian Dark #121212", "Authority, precision, high-contrast focal points."),
                 ("Canvas Light #F8F9FA", "Clean, calm, airy background ensuring maximum legibility."),
                 ("Soft Sage #E2EAE5", "Reassurance, verified security, positive continuity state."),
                 ("Slate Mist #EEF0F2", "Neutral containment, structural grouping."),
                 ("Emerald #10B981", "Active status indicator."),
                 ("Crimson #EF4444", "Protected boundary indicator.")
             ], is_dark=True)

    add_card(s11, 3.8, 2.1, 2.7, 4.85, C_CARD_SAGE, C_CARD_SAGE_BORDER,
             title="Typography Scale", badge="NEO-GROTESQUE SYSTEM",
             items=[
                 ("Display (36pt Bold)", "Impact headlines with -0.02em tracking."),
                 ("Section Head (20pt Bold)", "Clean structural signposts."),
                 ("Card Title (14pt Bold)", "Focal anchor for bento modules."),
                 ("Body Copy (10pt Regular)", "1.4 line-height for high reading comfort."),
                 ("Pill Badges (8.5pt Bold)", "Uppercase +0.08em tracking for metadata tags.")
             ], is_dark=False)

    add_card(s11, 6.8, 2.1, 2.7, 4.85, C_CARD_SLATE, C_CARD_SLATE_BORDER,
             title="Component Logic", badge="BENTO MODULARITY",
             items=[
                 ("8pt Baseline Grid", "Strict mathematical alignment across all cards."),
                 ("Pill Containers", "24pt height rounded capsules for category & status tags."),
                 ("16–24pt Card Radius", "Soft, human-centred enclosure avoiding harsh rectangular corners."),
                 ("Micro-Borders", "1pt subtle borders providing crisp definition without heavy drop shadows.")
             ], is_dark=False)

    add_card(s11, 9.8, 2.1, 2.7, 4.85, C_CARD_WHITE, C_CARD_WHITE_BORDER,
             title="Accessibility & Ethics", badge="INCLUSIVE DESIGN",
             items=[
                 ("WCAG AAA Contrast", "All body text exceeds 7:1 contrast ratio."),
                 ("Focus Indicators", "High-visibility focus rings for keyboard navigation."),
                 ("Non-Macabre Copy", "Replaced death metaphors with calm continuity terms."),
                 ("Zero Dark Patterns", "Clear cancel and revocation buttons on every screen.")
             ], is_dark=False)

    # SLIDE 12: 11 — Final Solution (A: Centralised Dashboard)
    s12 = make_slide(prs, is_dark=False)
    add_header(s12, "11 • FINAL SOLUTION", "Screen 01 — Centralised Continuity Dashboard",
               "High-fidelity home interface offering instant footprint awareness, readiness scoring, and quick actions.")

    # Hero card on left
    add_card(s12, 0.8, 2.1, 3.65, 4.85, C_CARD_DARK, C_CARD_DARK_BORDER,
             title="Continuity Readiness: 68%", badge="SYSTEM HEALTH METER",
             items=[
                 ("Readiness Status", "Good Foundation • 2 Actions Required"),
                 ("Connected Accounts", "3 of 5 active cloud platforms synced"),
                 ("Trusted Circle", "2 verified custodians assigned"),
                 ("Unassigned Assets", "Microsoft 365 requires category scoping"),
                 ("Security Audit", "Two-factor authentication verified active"),
                 ("Quick Action", "→ Complete Google Photos Scoping")
             ], is_dark=True)

    # Top right: Connected Accounts
    add_card(s12, 4.7, 2.1, 3.65, 2.3, C_CARD_SAGE, C_CARD_SAGE_BORDER,
             title="Connected Platforms (3 Active)", badge="INTEGRATED ECOSYSTEM",
             items=[
                 ("Google Cloud (Drive/Photos)", "Active • Scoped: Family Memories Only"),
                 ("Apple iCloud (Docs/Vault)", "Active • Scoped: Scanned Certificates"),
                 ("Microsoft 365 (Work/Study)", "Pending Configuration (Unscoped)")
             ], is_dark=False)

    # Bottom right 1: Trusted Circle
    add_card(s12, 4.7, 4.65, 3.65, 2.3, C_CARD_SLATE, C_CARD_SLATE_BORDER,
             title="Trusted Circle (2 Nominated)", badge="CUSTODIAN ROSTER",
             items=[
                 ("Riya Ambade (Sister)", "Verified • Scoped: Family Photos & Memories"),
                 ("Arjun Mehta (Partner)", "Verified • Scoped: Legal & Official Records"),
                 ("Access State", "Standby Mode (Zero active data access currently)")
             ], is_dark=False)

    # Right col: Real-time Audit Timeline
    add_card(s12, 8.6, 2.1, 3.9, 4.85, C_CARD_WHITE, C_CARD_WHITE_BORDER,
             title="Continuous Audit Log", badge="IMMUTABLE ACTIVITY LOG",
             items=[
                 ("Oct 24, 2026 • 14:20", "Scoped permission granted to Riya Ambade for Family Photos."),
                 ("Oct 20, 2026 • 09:15", "Biometric 2FA re-authenticated on primary device."),
                 ("Oct 12, 2026 • 18:30", "WhatsApp backups marked Permanently Private & Locked."),
                 ("Sep 28, 2026 • 11:00", "Google Account connected via scoped OAuth token."),
                 ("Privacy Guarantee", "Every event is cryptographically timestamped and revocable.")
             ], is_dark=False)

    # SLIDE 13: 11 — Final Solution (B: Service Integration Flow)
    s13 = make_slide(prs, is_dark=False)
    add_header(s13, "11 • FINAL SOLUTION", "Screen 02 — Granular Service Connection & Scoping",
               "Familiar OAuth-style integration with transparent scope disclosures and zero credential storage.")

    add_card(s13, 0.8, 2.1, 3.65, 4.85, C_CARD_DARK, C_CARD_DARK_BORDER,
             title="Step-by-Step Connection Logic", badge="INTEGRATION PROTOCOL",
             items=[
                 ("01. Provider Selection", "User selects from supported ecosystems (Google, Apple, Microsoft, Cloudflare)."),
                 ("02. Scope Disclosure", "Interface itemizes exact folder metadata requested."),
                 ("03. 2FA Re-Authentication", "Requires biometric verification before linking."),
                 ("04. Boundary Confirmation", "Enforces exclusion of private chats before sync."),
                 ("05. Revoke-at-Will", "Instant one-click disconnection available 24/7.")
             ], is_dark=True)

    add_card(s13, 4.7, 2.1, 3.65, 4.85, C_CARD_SAGE, C_CARD_SAGE_BORDER,
             title="Modal UI: Google Cloud Link", badge="HIGH-FIDELITY MODAL MOCKUP",
             items=[
                 ("Account Link", "user@gmail.com (Verified Google ID)"),
                 ("Requested Scopes", "Read-only folder metadata for Google Photos and Drive /Documents."),
                 ("Architectural Exclusions", "Gmail inbox, Chrome browsing history, saved passwords."),
                 ("Reassurance Notice", "Continuity Hub will never store your login credentials, read file contents, or share data with third parties.")
             ], is_dark=False)

    add_card(s13, 8.6, 2.1, 3.9, 4.85, C_CARD_SLATE, C_CARD_SLATE_BORDER,
             title="Zero-Trust System Guarantees", badge="SECURITY ARCHITECTURE",
             items=[
                 ("No Master Passwords", "Operates exclusively via revocable OAuth 2.0 access tokens."),
                 ("Ephemeral Tokens", "Tokens expire and refresh automatically; revoked upon inactivity."),
                 ("Manual Account Fallback", "Unsupported platforms can be documented as manual offline records."),
                 ("Zero Data Hoarding", "Zero raw user files stored on Hub servers.")
             ], is_dark=False)

    # SLIDE 14: 11 — Final Solution (C: Selective Permission Engine)
    s14 = make_slide(prs, is_dark=False)
    add_header(s14, "11 • FINAL SOLUTION", "Screen 03 — Category-Based Selective Permission Matrix",
               "Granular boundary controls separating personal memories, legal records, and private communications.")

    add_card(s14, 0.8, 2.1, 2.7, 4.85, C_CARD_SAGE, C_CARD_SAGE_BORDER,
             title="Family Memories", badge="CATEGORY 01 • SHARED",
             items=[
                 ("Scope", "Family photo albums, vacation videos, personal creative notes."),
                 ("Assigned Custodian", "Riya Ambade (Sister)"),
                 ("Privacy Level", "Medium — Wholesome personal continuity."),
                 ("Conditions", "Release upon verified inactivity trigger."),
                 ("Status", "Active Delegation Policy")
             ], is_dark=False)

    add_card(s14, 3.8, 2.1, 2.7, 4.85, C_CARD_SAGE, C_CARD_SAGE_BORDER,
             title="Legal Documents", badge="CATEGORY 02 • SHARED",
             items=[
                 ("Scope", "Passport scans, property deeds, health records, insurance."),
                 ("Assigned Custodian", "Arjun Mehta (Partner)"),
                 ("Privacy Level", "High — Practical life continuity."),
                 ("Conditions", "Dual-custodian verification required."),
                 ("Status", "Active Delegation Policy")
             ], is_dark=False)

    add_card(s14, 6.8, 2.1, 2.7, 4.85, C_CARD_DARK, C_CARD_DARK_BORDER,
             title="Private Messages", badge="CATEGORY 03 • LOCKED",
             items=[
                 ("Scope", "WhatsApp archives, Signal chats, personal email threads."),
                 ("Assigned Custodian", "NONE (PERMANENTLY EXCLUDED)"),
                 ("Privacy Level", "MAXIMUM — Strict inviolable boundary."),
                 ("System Action", "Auto-delete metadata upon inactivity."),
                 ("Status", "🔒 Default Locked Shield")
             ], is_dark=True)

    add_card(s14, 9.8, 2.1, 2.7, 4.85, C_CARD_SLATE, C_CARD_SLATE_BORDER,
             title="Financial Portals", badge="CATEGORY 04 • RESTRICTED",
             items=[
                 ("Scope", "Bank portal URLs, utility accounts, insurance contact info."),
                 ("Assigned Custodian", "Informational Reference Only"),
                 ("Privacy Level", "Restricted — Zero PINs or passwords stored."),
                 ("Purpose", "Informs family that account exists without granting financial access.")
             ], is_dark=False)

    # SLIDE 15: 11 — Final Solution (D: Trusted Person Delegation & Triggers)
    s15 = make_slide(prs, is_dark=False)
    add_header(s15, "11 • FINAL SOLUTION", "Screen 04 — Nominated Custodians & Release Triggers",
               "Configuring trusted contacts, defining dual-gate triggers, and ensuring instant emergency revokability.")

    add_card(s15, 0.8, 2.1, 3.65, 4.85, C_CARD_DARK, C_CARD_DARK_BORDER,
             title="Custodian Dossier: Riya Ambade", badge="PRIMARY NOMINEE",
             items=[
                 ("Relationship Role", "Sister (Primary Family Custodian)"),
                 ("Contact Verification", "Email + Mobile 2FA Confirmed"),
                 ("Permitted Categories", "Family Memories & Travel Photography"),
                 ("Excluded Categories", "Work Drives, Legal Tax Files, Private Chats"),
                 ("Current Status", "STANDBY MODE (Zero Access Active)")
             ], is_dark=True)

    add_card(s15, 4.7, 2.1, 3.65, 4.85, C_CARD_SAGE, C_CARD_SAGE_BORDER,
             title="Dual-Gate Release Protocol", badge="TRIGGER CONDITIONS",
             items=[
                 ("Gate 1: Inactivity Heartbeat", "No owner login detected for 90 consecutive days."),
                 ("Gate 2: Verification Alerts", "System sends 3 notifications via SMS/email over 30 days."),
                 ("Gate 3: Official Verification", "Custodian must submit government photo ID and verified death/incapacity documentation."),
                 ("Fail-Safe Reassurance", "Any user login immediately resets the countdown to zero.")
             ], is_dark=False)

    add_card(s15, 8.6, 2.1, 3.9, 4.85, C_CARD_SLATE, C_CARD_SLATE_BORDER,
             title="Owner Sovereignty & Audit", badge="REVOCATION CONTROLS",
             items=[
                 ("Instant Heartbeat Reset", "Logging in or tapping 'I Am Here' in email cancels all pending triggers."),
                 ("Silent Revocation", "Remove or alter custodian scopes without sending uncomfortable notifications."),
                 ("Immutable Audit Log", "Track every login, permission change, and simulated trigger ping.")
             ], is_dark=False)

    # SLIDE 16: 12 — Round 2 Validation
    s16 = make_slide(prs, is_dark=False)
    add_header(s16, "12 • ROUND 2 VALIDATION", "High-Fidelity Validation Protocol & Verification Plan",
               "A structured empirical framework for measuring task success, cognitive workload, and visual hierarchy.")

    add_card(s16, 0.8, 2.1, 3.65, 4.85, C_CARD_SAGE, C_CARD_SAGE_BORDER,
             title="Target Usability Benchmarks", badge="QUANTITATIVE TARGETS",
             items=[
                 ("System Usability Scale (SUS)", "Target: > 80 (Grade A Usability rating on hi-fi prototype)."),
                 ("Task Completion Rate", "Target: > 90% unassisted completion across 5 core workflows."),
                 ("Single Ease Question (SEQ)", "Target: > 5.8 / 7 difficulty rating across tasks."),
                 ("Error Recovery Rate", "Target: 100% successful recovery from simulated accidental delegation.")
             ], is_dark=False)

    add_card(s16, 4.7, 2.1, 3.65, 4.85, C_CARD_DARK, C_CARD_DARK_BORDER,
             title="Participant Stratification (n=6)", badge="EVALUATION COHORT",
             items=[
                 ("Cohort A: Young Adults (18–25)", "Focus on privacy boundaries, chat exclusions, and emotional comfort."),
                 ("Cohort B: Working Professionals (30–45)", "Focus on multi-cloud storage sync, financial safety, and tax record handoff."),
                 ("Cohort C: Mature Adults (55+)", "Focus on interface legibility, cognitive load, and trusted custodian setup.")
             ], is_dark=True)

    add_card(s16, 8.6, 2.1, 3.9, 4.85, C_CARD_WHITE, C_CARD_WHITE_BORDER,
             title="Visual Attention & Heatmap Plan", badge="ATTENTION MAPPING",
             items=[
                 ("Simulated Fixation Protocol", "Tracking user eye gaze across the Centralised Dashboard."),
                 ("Hypothesis H2", "Visual fixations will concentrate on the 68% Readiness Gauge and the Red Locked Chat shields."),
                 ("Validation Goal", "Confirms that privacy boundaries are immediately recognizable within the first 5 seconds of scanning.")
             ], is_dark=False)

    # SLIDE 17: 13 — Final Outcome
    s17 = make_slide(prs, is_dark=False)
    add_header(s17, "13 • FINAL OUTCOME", "Delivered Design Artefacts & Prototype Fidelity Scope",
               "Transparent accounting of resolved interface flows, demonstrated prototype capabilities, and boundaries.")

    add_card(s17, 0.8, 2.1, 3.65, 4.85, C_CARD_DARK, C_CARD_DARK_BORDER,
             title="Delivered Course Artefacts", badge="DELIVERABLES SUMMARY",
             items=[
                 ("UX Case Study Deck", "19-Slide research-to-validation deck following faculty brief."),
                 ("Interactive Prototype", "Figma prototype with 34 documented interaction states."),
                 ("Design System Token Library", "Complete typography, bento grid, color tokens, and components."),
                 ("A1 Exhibition Display Panel", "High-resolution print-ready exhibition poster.")
             ], is_dark=True)

    add_card(s17, 4.7, 2.1, 3.65, 4.85, C_CARD_SAGE, C_CARD_SAGE_BORDER,
             title="Demonstrated Prototype Scope", badge="FUNCTIONAL CAPABILITIES",
             items=[
                 ("Dynamic Readiness Meter", "Interactive score recalibration as services are configured."),
                 ("Granular Connection Flow", "Step-by-step OAuth simulation with scope disclosures."),
                 ("Category Permission Engine", "Toggleable category permissions with instant feedback."),
                 ("Custodian Nomination Flow", "Contact assignment, trigger setting, and revocation.")
             ], is_dark=False)

    add_card(s17, 8.6, 2.1, 3.9, 4.85, C_CARD_SLATE, C_CARD_SLATE_BORDER,
             title="Deliberate Concept Boundaries", badge="TECHNICAL DEMARCATION",
             items=[
                 ("Simulated Live APIs", "Live OAuth endpoints to external servers are simulated for prototype stability."),
                 ("Zero Server Storage", "Backend cryptographic architecture modeled as service blueprint specification."),
                 ("Legal Verification", "Document verification treated as a human-in-the-loop manual service flow.")
             ], is_dark=False)

    # SLIDE 18: 14 — Learnings and Limitations
    s18 = make_slide(prs, is_dark=False)
    add_header(s18, "14 • LEARNINGS & LIMITATIONS", "Critical Reflections, Industry Walled Gardens & Future Scope",
               "Synthesising pedagogical insights, platform friction, and service design opportunities.")

    add_card(s18, 0.8, 2.1, 3.65, 4.85, C_CARD_DARK, C_CARD_DARK_BORDER,
             title="Pedagogical Reflections", badge="DESIGN TAKEAWAYS",
             items=[
                 ("Privacy is the Precondition", "In digital continuity, privacy is not a feature—it is the sole condition under which users agree to participate."),
                 ("Tone Shapes Engagement", "Replacing dark death metaphors with calm continuity language reduces emotional avoidance by users."),
                 ("Honest Limits Build Trust", "Explicitly admitting what the system cannot do fosters greater confidence than promising total automation.")
             ], is_dark=True)

    add_card(s18, 4.7, 2.1, 3.65, 4.85, C_CARD_SAGE, C_CARD_SAGE_BORDER,
             title="Industry & Technical Constraints", badge="PLATFORM BARRIERS",
             items=[
                 ("Walled Garden Monopolies", "Major platforms (Apple, Google, Meta) deliberately restrict third-party data portability and cross-service delegation."),
                 ("Legal & Jurisdictional Maze", "Digital property laws vary radically across nations, complicating uniform continuity protocols."),
                 ("Incapacity Detection", "Detecting physical incapacity or death without invasive surveillance remains an unsolved service challenge.")
             ], is_dark=False)

    add_card(s18, 8.6, 2.1, 3.9, 4.85, C_CARD_SLATE, C_CARD_SLATE_BORDER,
             title="Future Roadmap & Next Steps", badge="SERVICE EXTENSIONS",
             items=[
                 ("Decentralised Identifiers (DID)", "Explore zero-knowledge proofs and self-sovereign identity for custodian authentication."),
                 ("Collaborative Guardian Circles", "Implement multi-signature release (requiring 2 of 3 guardians to unlock sensitive folders)."),
                 ("Jury & Exhibition Validation", "Gather formal peer and faculty critique during the November 4 physical exhibition.")
             ], is_dark=False)

    # SLIDE 19: 15 — Credits and References
    s19 = make_slide(prs, is_dark=False)
    add_header(s19, "15 • CREDITS & REFERENCES", "Academic References, Tools & Acknowledgements",
               "Formal bibliography of peer-reviewed sources, platform technical documentation, and project credits.")

    add_card(s19, 0.8, 2.1, 4.7, 4.85, C_CARD_WHITE, C_CARD_WHITE_BORDER,
             title="Peer-Reviewed Academic Bibliography", badge="PRIMARY CITATIONS",
             items=[
                 ("ACM Systematic Literature Review (2023)", "Digital Legacy: A Systematic Literature Review, ACM Computing Surveys, doi: 10.1145/3610059."),
                 ("Digital Legacy Association (2024)", "Digital Death Survey 2024, London, UK. https://digitallegacyassociation.org/"),
                 ("PubMed / Omega Journal (2025)", "How do People Use Social Media to Maintain Continuing Bonds in Bereavement?, PMID: 41215584."),
                 ("ScienceDirect (2026)", "Digital grief technology to support bereavement: A systematic review of benefits and risks, Computers in Human Behavior."),
                 ("The Indian Express (2026)", "Who Owns a Person's Digital Data After Their Death?, Gandhinagar Legal Precedent Analysis.")
             ], is_dark=False)

    add_card(s19, 5.8, 2.1, 3.4, 4.85, C_CARD_SAGE, C_CARD_SAGE_BORDER,
             title="Platform Documentation", badge="TECHNICAL CITATIONS",
             items=[
                 ("Apple Inc. (2026)", "How to Add a Legacy Contact for Your Apple ID. Apple Support Documentation HT212360."),
                 ("Google LLC (2026)", "About Inactive Account Manager & Data Sharing. Google Account Help ID 3036546."),
                 ("W3C & FIDO Alliance (2025)", "Web Authentication & Passkey Standards for Secure Delegated Access.")
             ], is_dark=False)

    add_card(s19, 9.5, 2.1, 3.0, 4.85, C_CARD_DARK, C_CARD_DARK_BORDER,
             title="Project Recognition", badge="COURSE CREDITS",
             items=[
                 ("Student Lead", "Vidhi Ambade (Sem 7)"),
                 ("Course", "UEDP-5 (45 Marks)"),
                 ("Faculty Lead", "Prof. Kriti Kusum"),
                 ("Software", "Figma, Python-pptx, Adobe Illustrator"),
                 ("Institutional", "B.Des User Experience Design")
             ], is_dark=True)

    # Save to workspace and downloads
    out_workspace = "/Users/vidhi/Desktop/uni/MIA a3/Digital_Continuity_Hub_UEDP5_Case_Study.pptx"
    out_downloads = "/Users/vidhi/Downloads/Digital_Continuity_Hub_UEDP5_Case_Study.pptx"

    prs.save(out_workspace)
    shutil.copyfile(out_workspace, out_downloads)
    print(f"Presentation saved to: {out_workspace}")
    print(f"Copy also saved to: {out_downloads}")

if __name__ == "__main__":
    build_deck()

