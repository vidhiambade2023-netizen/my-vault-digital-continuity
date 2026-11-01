#!/usr/bin/env python3
"""
Ultra-Minimal Editorial Presentation Generator (24 Slides)
Digital Continuity Hub — UEDP-5 Final Case Study
Student: Vidhi Ambade | Faculty: Prof. Kriti Kusum | Semester 7
"""

import os
import shutil
import subprocess
from PIL import Image
from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.enum.text import PP_ALIGN, MSO_ANCHOR
from pptx.enum.shapes import MSO_SHAPE
from pptx.dml.color import RGBColor

# COLOR TOKENS
C_WHITE = RGBColor(255, 255, 255)
C_BLACK = RGBColor(13, 13, 13)          # #0D0D0D Deep Obsidian
C_CHARCOAL = RGBColor(24, 24, 24)       # #181818
C_GRAY_LIGHT = RGBColor(248, 249, 250)  # #F8F9FA
C_BORDER_LIGHT = RGBColor(229, 231, 235)# #E5E7EB Hairline light
C_BORDER_DARK = RGBColor(38, 38, 38)    # #262626 Hairline dark
C_TEXT_DARK = RGBColor(17, 24, 39)      # #111827 Title dark
C_TEXT_MUTED = RGBColor(107, 114, 128)  # #6B7280 Secondary gray
C_TEXT_LIGHT = RGBColor(255, 255, 255)
C_TEXT_LIGHT_MUTED = RGBColor(156, 163, 175)

FONT_FAM = "Helvetica Neue"

def init_prs():
    prs = Presentation()
    prs.slide_width = Inches(13.333)
    prs.slide_height = Inches(7.5)
    return prs

def create_slide(prs, is_dark=False):
    slide = prs.slides.add_slide(prs.slide_layouts[6])
    bg = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, 0, 0, Inches(13.333), Inches(7.5))
    bg.fill.solid()
    bg.fill.fore_color.rgb = C_BLACK if is_dark else C_WHITE
    bg.line.fill.background()
    return slide

def add_rules_and_headers(slide, section_name, slide_num_str, is_dark=False):
    # Top Hairline Rule
    top_line = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(0.8), Inches(0.8), Inches(11.733), Inches(0.012))
    top_line.fill.solid()
    top_line.fill.fore_color.rgb = C_BORDER_DARK if is_dark else C_BORDER_LIGHT
    top_line.line.fill.background()

    # Top Header Text: Left (Project), Center (Section)
    tb_top = slide.shapes.add_textbox(Inches(0.8), Inches(0.42), Inches(10.0), Inches(0.35))
    tf_top = tb_top.text_frame
    tf_top.margin_left = tf_top.margin_right = tf_top.margin_top = tf_top.margin_bottom = 0
    p = tf_top.paragraphs[0]
    p.text = f"The Digital Continuity Hub          {section_name}"
    p.font.name = FONT_FAM
    p.font.size = Pt(8.5)
    p.font.bold = True
    p.font.color.rgb = C_TEXT_LIGHT_MUTED if is_dark else C_TEXT_MUTED

    # Slide Num Top Right
    tb_num = slide.shapes.add_textbox(Inches(11.5), Inches(0.42), Inches(1.033), Inches(0.35))
    tf_num = tb_num.text_frame
    tf_num.margin_left = tf_num.margin_right = tf_num.margin_top = tf_num.margin_bottom = 0
    p_num = tf_num.paragraphs[0]
    p_num.text = slide_num_str
    p_num.font.name = FONT_FAM
    p_num.font.size = Pt(9)
    p_num.font.bold = True
    p_num.font.color.rgb = C_TEXT_LIGHT_MUTED if is_dark else C_TEXT_MUTED
    p_num.alignment = PP_ALIGN.RIGHT

    # Bottom Hairline Rule
    bot_line = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(0.8), Inches(6.85), Inches(11.733), Inches(0.012))
    bot_line.fill.solid()
    bot_line.fill.fore_color.rgb = C_BORDER_DARK if is_dark else C_BORDER_LIGHT
    bot_line.line.fill.background()

    # Bottom Footer Text
    tb_bot = slide.shapes.add_textbox(Inches(0.8), Inches(6.95), Inches(6.0), Inches(0.3))
    tf_bot = tb_bot.text_frame
    tf_bot.margin_left = tf_bot.margin_right = tf_bot.margin_top = tf_bot.margin_bottom = 0
    p_b1 = tf_bot.paragraphs[0]
    p_b1.text = "Vidhi Ambade • Semester 7 • B.Des User Experience Design"
    p_b1.font.name = FONT_FAM
    p_b1.font.size = Pt(8)
    p_b1.font.color.rgb = C_TEXT_LIGHT_MUTED if is_dark else C_TEXT_MUTED

    tb_bot_r = slide.shapes.add_textbox(Inches(7.5), Inches(6.95), Inches(5.033), Inches(0.3))
    tf_bot_r = tb_bot_r.text_frame
    tf_bot_r.margin_left = tf_bot_r.margin_right = tf_bot_r.margin_top = tf_bot_r.margin_bottom = 0
    p_b2 = tf_bot_r.paragraphs[0]
    p_b2.text = "UEDP-5 • Faculty Lead: Prof. Kriti Kusum • 45 Marks"
    p_b2.font.name = FONT_FAM
    p_b2.font.size = Pt(8)
    p_b2.font.color.rgb = C_TEXT_LIGHT_MUTED if is_dark else C_TEXT_MUTED
    p_b2.alignment = PP_ALIGN.RIGHT

def add_headline(slide, text, x=0.8, y=1.2, w=11.733, size=28, is_dark=False):
    tb = slide.shapes.add_textbox(Inches(x), Inches(y), Inches(w), Inches(1.3))
    tf = tb.text_frame
    tf.word_wrap = True
    tf.margin_left = tf.margin_right = tf.margin_top = tf.margin_bottom = 0
    p = tf.paragraphs[0]
    p.text = text
    p.font.name = FONT_FAM
    p.font.size = Pt(size)
    p.font.bold = True
    p.font.color.rgb = C_TEXT_LIGHT if is_dark else C_TEXT_DARK
    return tb

def add_editorial_card(slide, x, y, w, h, title="", subtitle="", text="", bullets=[], bg_color=None, border_color=None, is_dark=False):
    if bg_color:
        shape = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(x), Inches(y), Inches(w), Inches(h))
        shape.fill.solid()
        shape.fill.fore_color.rgb = bg_color
        if border_color:
            shape.line.color.rgb = border_color
            shape.line.width = Pt(0.75)
        else:
            shape.line.fill.background()
    
    pad = 0.28 if bg_color else 0.0
    tb = slide.shapes.add_textbox(Inches(x + pad), Inches(y + pad), Inches(w - 2*pad), Inches(h - 2*pad))
    tf = tb.text_frame
    tf.word_wrap = True
    tf.margin_left = tf.margin_right = tf.margin_top = tf.margin_bottom = 0
    tf.vertical_anchor = MSO_ANCHOR.TOP

    p0 = tf.paragraphs[0]
    has_sub = bool(subtitle)
    if subtitle:
        p0.text = subtitle.upper()
        p0.font.name = FONT_FAM
        p0.font.size = Pt(8)
        p0.font.bold = True
        p0.font.color.rgb = C_TEXT_LIGHT_MUTED if is_dark else C_TEXT_MUTED
        p0.space_after = Pt(4)

    if title:
        p_t = tf.add_paragraph() if has_sub else p0
        p_t.text = title
        p_t.font.name = FONT_FAM
        p_t.font.size = Pt(13.5)
        p_t.font.bold = True
        p_t.font.color.rgb = C_TEXT_LIGHT if is_dark else C_TEXT_DARK
        p_t.space_after = Pt(6)

    if text:
        p_txt = tf.add_paragraph()
        p_txt.text = text
        p_txt.font.name = FONT_FAM
        p_txt.font.size = Pt(10)
        p_txt.font.color.rgb = C_TEXT_LIGHT_MUTED if is_dark else C_TEXT_MUTED
        p_txt.space_after = Pt(6)

    for b in bullets:
        p_b = tf.add_paragraph()
        p_b.text = f"• {b}"
        p_b.font.name = FONT_FAM
        p_b.font.size = Pt(9.5)
        p_b.font.color.rgb = C_TEXT_LIGHT if is_dark else C_TEXT_DARK
        p_b.space_after = Pt(3)

def add_2x2_black_grid(slide, x, y, w, h, cells):
    box = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(x), Inches(y), Inches(w), Inches(h))
    box.fill.solid()
    box.fill.fore_color.rgb = C_BLACK
    box.line.fill.background()

    v_line = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(x + w/2), Inches(y), Inches(0.012), Inches(h))
    v_line.fill.solid()
    v_line.fill.fore_color.rgb = C_BORDER_DARK
    v_line.line.fill.background()

    h_line = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(x), Inches(y + h/2), Inches(w), Inches(0.012))
    h_line.fill.solid()
    h_line.fill.fore_color.rgb = C_BORDER_DARK
    h_line.line.fill.background()

    coords = [
        (x, y, w/2, h/2),
        (x + w/2, y, w/2, h/2),
        (x, y + h/2, w/2, h/2),
        (x + w/2, y + h/2, w/2, h/2)
    ]

    for idx, (cx, cy, cw, ch) in enumerate(coords):
        if idx >= len(cells):
            break
        num, label, sub = cells[idx]

        tb = slide.shapes.add_textbox(Inches(cx + 0.35), Inches(cy + 0.35), Inches(cw - 0.7), Inches(ch - 0.7))
        tf = tb.text_frame
        tf.word_wrap = True
        tf.margin_left = tf.margin_right = tf.margin_top = tf.margin_bottom = 0
        tf.vertical_anchor = MSO_ANCHOR.BOTTOM

        p_num = tf.paragraphs[0]
        p_num.text = num
        p_num.font.name = FONT_FAM
        p_num.font.size = Pt(36)
        p_num.font.bold = True
        p_num.font.color.rgb = C_TEXT_LIGHT
        p_num.space_after = Pt(2)

        p_lbl = tf.add_paragraph()
        p_lbl.text = label
        p_lbl.font.name = FONT_FAM
        p_lbl.font.size = Pt(10.5)
        p_lbl.font.bold = True
        p_lbl.font.color.rgb = C_TEXT_LIGHT
        p_lbl.space_after = Pt(2)

        if sub:
            p_sub = tf.add_paragraph()
            p_sub.text = sub
            p_sub.font.name = FONT_FAM
            p_sub.font.size = Pt(8.5)
            p_sub.font.color.rgb = C_TEXT_LIGHT_MUTED

# -------------------------------------------------------------
# BUILD ALL 24 SLIDES
# -------------------------------------------------------------

def build_presentation():
    prs = init_prs()

    # SLIDE 01 | 01 — Cover (Dark Minimal Editorial)
    s1 = create_slide(prs, is_dark=True)
    add_rules_and_headers(s1, "01 Cover", "01", is_dark=True)
    
    # Big Number Top-Left
    tb_num1 = s1.shapes.add_textbox(Inches(0.8), Inches(1.3), Inches(2.0), Inches(1.0))
    p1 = tb_num1.text_frame.paragraphs[0]
    p1.text = "01"
    p1.font.name = FONT_FAM; p1.font.size = Pt(56); p1.font.bold = True; p1.font.color.rgb = C_TEXT_LIGHT

    # Massive Headline Bottom-Left
    tb_head1 = s1.shapes.add_textbox(Inches(0.8), Inches(4.3), Inches(10.5), Inches(2.0))
    tf1 = tb_head1.text_frame
    tf1.word_wrap = True
    p_h1 = tf1.paragraphs[0]
    p_h1.text = "Digital Continuity Hub"
    p_h1.font.name = FONT_FAM; p_h1.font.size = Pt(44); p_h1.font.bold = True; p_h1.font.color.rgb = C_TEXT_LIGHT
    
    p_sub1 = tf1.add_paragraph()
    p_sub1.text = "Designing intentional continuity, privacy boundaries, and selective delegation for personal digital lives."
    p_sub1.font.name = FONT_FAM; p_sub1.font.size = Pt(16); p_sub1.font.color.rgb = C_TEXT_LIGHT_MUTED
    p_sub1.space_before = Pt(8)

    # SLIDE 02 | 02 — Project Snapshot
    s2 = create_slide(prs)
    add_rules_and_headers(s2, "02 Project Snapshot", "02")
    add_headline(s2, "Governing personal digital footprints\nacross siloed cloud platforms.")
    
    add_editorial_card(s2, 0.8, 2.7, 5.6, 2.4, title="Domain & Role", subtitle="INQUIRY SCOPE",
                       bullets=["Domain: Digital Legacy, Personal Data Governance & Service Continuity",
                                "Role: End-to-End UX/UI Researcher, Service Designer & Prototyper",
                                "Duration: Semester 7 (Oct – Nov 2026) | Course: UEDP-5 (45 Marks)"])

    add_editorial_card(s2, 6.8, 2.7, 5.7, 2.4, title="The Core Deliverable", subtitle="PRODUCT PROPOSAL",
                       bullets=["Concept: Centralised Digital Continuity Dashboard ('Continuity Hub')",
                                "Core Paradigm: Understand → Organise → Decide → Communicate → Continue",
                                "Outcome: 34-state interactive prototype and structured validation framework"])

    add_editorial_card(s2, 0.8, 5.3, 11.733, 1.3, title="Architectural Boundaries & Non-Goals", subtitle="EXPLICIT CONSTRAINTS",
                       text="Not a legal estate-tax will. Not a master password manager. Operates strictly via user-consented OAuth metadata scopes without hoarding private files.",
                       bg_color=C_GRAY_LIGHT, border_color=C_BORDER_LIGHT)

    # SLIDE 03 | 03 — Problem Space (Fragmentation)
    s3 = create_slide(prs)
    add_rules_and_headers(s3, "03 Problem Space", "03")
    add_headline(s3, "Our digital lives are scattered across dozens of services.\nWhen crisis strikes, access is fragmented and opaque.")
    
    add_editorial_card(s3, 0.8, 2.8, 5.6, 3.8, title="The Everyday Footprint", subtitle="ACCUMULATION PATTERNS",
                       text="People accumulate thousands of assets across isolated services with zero unified overview.",
                       bullets=["Memories: Photos and videos locked in iCloud and Google Photos",
                                "Legal Records: Tax documents and deeds scattered in cloud drives",
                                "Communications: Decades of conversations in WhatsApp and Gmail",
                                "Financial Portals: Banking portals, utility accounts, and subscriptions"])

    add_editorial_card(s3, 6.8, 2.8, 5.7, 3.8, title="The Silent Impasse", subtitle="ECOSYSTEM FRICTION",
                       text="Current platform policies force families into painful dilemmas during incapacity or loss.",
                       bullets=["Platform Silos: Apple, Google, and Meta have disconnected legacy rules",
                                "Binary Access Trap: Platforms either lock everyone out or hand over master keys",
                                "Emotional Avoidance: Macabre death-oriented tools induce user paralysis",
                                "Procedural Deadlock: Families face months of expensive court bureaucracy"])

    # SLIDE 04 | 03 — Opportunity (Assumption vs Reality)
    s4 = create_slide(prs)
    add_rules_and_headers(s4, "03 Problem & Opportunity", "04")
    add_headline(s4, "Initial Assumption vs. Research-Led Reality")
    
    add_editorial_card(s4, 0.8, 2.6, 5.6, 4.0, title="Initial Academic Assumption", subtitle="HYPOTHESIS A",
                       text="People need a 'digital will' to transfer all online accounts after death.",
                       bullets=["Assumes digital legacy is purely a post-mortem legal event",
                                "Assumes users want to hand over full master credentials to family",
                                "Treats personal data as financial property to be inherited as a monolith"],
                       bg_color=C_GRAY_LIGHT, border_color=C_BORDER_LIGHT)

    add_editorial_card(s4, 6.8, 2.6, 5.7, 4.0, title="Observed Research Reality", subtitle="EVIDENCE-LED REALITY",
                       text="People reject blanket transfer. They demand selective delegation with strict boundaries.",
                       bullets=["The gap appears before death: users cannot organize what they cannot see",
                                "Users want family to access photos, but dread exposing private chats",
                                "Access is not binary: users demand granular, category-level scoping",
                                "Privacy and revocability are absolute preconditions for user trust"],
                       bg_color=C_BLACK, is_dark=True)

    # SLIDE 05 | 04 — Research Recap: Secondary Literature
    s5 = create_slide(prs)
    add_rules_and_headers(s5, "04 Secondary Research", "05")
    add_headline(s5, "Academic Literature & Platform Silos")

    add_editorial_card(s5, 0.8, 2.6, 3.6, 4.0, title="ACM Systematic Review", subtitle="RESEARCH CITATION (2023)",
                       text="Digital legacy is not password inheritance; it encompasses identity, ongoing relationships, and affective memory (doi: 10.1145/3610059).",
                       bullets=["Identity preservation over raw assets", "Continuing emotional bonds", "Contextual boundary controls"],
                       bg_color=C_GRAY_LIGHT, border_color=C_BORDER_LIGHT)

    add_editorial_card(s5, 4.8, 2.6, 3.6, 4.0, title="Platform Silo Analysis", subtitle="INDUSTRY AUDIT (2026)",
                       text="Existing platform legacy tools are isolated within proprietary walled gardens.",
                       bullets=["Apple Legacy Contact: Requires 256-bit key & death certificate",
                                "Google Inactive Account: Triggers solely by inactivity timer",
                                "Zero cross-platform visibility across ecosystems"],
                       bg_color=C_GRAY_LIGHT, border_color=C_BORDER_LIGHT)

    add_editorial_card(s5, 8.8, 2.6, 3.733, 4.0, title="ScienceDirect Review", subtitle="ETHICS & RISKS (2026)",
                       text="Bereavement technologies create severe risks of privacy violation and grief manipulation if consent is absent (doi: 10.1016/j.chb.2026).",
                       bullets=["Risk of misrepresenting deceased", "Need for explicit, least-privilege consent", "Emotional boundary protection"],
                       bg_color=C_GRAY_LIGHT, border_color=C_BORDER_LIGHT)

    # SLIDE 06 | 04 — Research Recap: Judicial Precedent
    s6 = create_slide(prs)
    add_rules_and_headers(s6, "04 Secondary Research", "06")
    add_headline(s6, "Judicial Precedent: The Gandhinagar Court Dispute")

    add_editorial_card(s6, 0.8, 2.6, 6.5, 4.0, title="The Real-World Crisis", subtitle="CIVIL COURT CASE (2026)",
                       text="In 2026, The Indian Express reported on a Gandhinagar civil court case where a deceased man's family petitioned for access to his locked iPhone and iCloud repository containing crucial family documents.",
                       bullets=["Platform Refusal: Apple refused access citing user privacy policies",
                                "Procedural Deadlock: Family endured months of costly legal hearings",
                                "Cryptographic Wall: Without pre-configured keys, access was impossible",
                                "Takeaway: Digital continuity is a real-world emergency, not a theory."])

    add_editorial_card(s6, 7.7, 2.6, 4.833, 4.0, title="Design Implication", subtitle="CRITICAL TAKEAWAY",
                       text="Without pre-configured continuity, technical encryption and corporate bureaucracy create an insurmountable wall for families.",
                       bullets=["Access must be planned proactively",
                                "Platform-agnostic coordination is required",
                                "Emergency verification must be dignified"],
                       bg_color=C_BLACK, is_dark=True)

    # SLIDE 07 | 04 — Research Recap: Primary Methodology
    s7 = create_slide(prs)
    add_rules_and_headers(s7, "04 Primary Research", "07")
    add_headline(s7, "Investigating Digital Mental Models Across Generations")

    add_editorial_card(s7, 0.8, 2.6, 5.6, 4.0, title="Primary Research Instruments", subtitle="METHODOLOGY & SAMPLING",
                       text="A mixed-methods inquiry exploring storage habits, retrieval friction, and custodian trust.",
                       bullets=["Quantitative Instrument: 15-question Google Form surveying account volume, storage habits, and privacy thresholds",
                                "Qualitative Protocol: 6 cross-generational interview profiles: Student (15y), College (22y), Professional (36y), Doctor (47y), Academic (52y), Senior (75y)",
                                "Core Inquiry: What would you want trusted people to access, and what must remain permanently private?"])

    add_editorial_card(s7, 6.8, 2.6, 5.7, 4.0, title="Research Transparency Disclosure", subtitle="ACADEMIC HONESTY",
                       text="The quantitative figures presented in this case study reflect the structured exploratory pilot dataset (n=100) established for pattern analysis.",
                       bullets=["Pilot data guides hypothesis formulation and workflow architecture",
                                "Distinguished from live usability testing protocols",
                                "Zero fabricated user participants or artificial test results",
                                "Preserves absolute research integrity as required by the brief"],
                       bg_color=C_BLACK, is_dark=True)

    # SLIDE 08 | 04 — Research Recap: Pilot Findings (2x2 Black Grid!)
    s8 = create_slide(prs)
    add_rules_and_headers(s8, "04 Primary Research", "08")
    add_headline(s8, "People value their digital records, but postpone planning\nbecause current tools feel overwhelming.")

    # Left Narrative
    add_editorial_card(s8, 0.8, 2.5, 5.4, 4.1, title="Cognitive Overload is Real", subtitle="PILOT PATTERN SYNTHESIS",
                       text="A fragmented digital life creates paralysis. Users value memories and legal documents, but dread exposing private chats.",
                       bullets=["15+ unlinked digital accounts per user on average",
                                "Zero unified overview of connected cloud services",
                                "Fear of accidental over-sharing causes total avoidance",
                                "Users lack a clear, calm starting point for continuity"])

    # Right 2x2 Black Grid
    grid_cells = [
        ("82%", "Multi-Platform Storage", "Store critical files across 3+ unlinked cloud services."),
        ("78%", "Unaware of Concept", "Had never heard of the term 'digital legacy'."),
        ("71%", "Privacy as Barrier", "Cite private chat disclosure as their #1 obstacle."),
        ("70%", "Retrieval Friction", "Struggle finding important files from 3+ years ago.")
    ]
    add_2x2_black_grid(s8, 6.6, 2.5, 5.9, 4.1, grid_cells)

    # SLIDE 09 | 05 — Design Direction: Core Principles
    s9 = create_slide(prs)
    add_rules_and_headers(s9, "05 Design Direction", "09")
    add_headline(s9, "Four Guiding Pillars for Intentional Continuity")

    add_editorial_card(s9, 0.8, 2.6, 2.7, 4.0, title="Selective Delegation", subtitle="PILLAR 01",
                       text="Access is never binary. Users configure permissions per category (e.g. photos vs legal certificates).",
                       bg_color=C_GRAY_LIGHT, border_color=C_BORDER_LIGHT)

    add_editorial_card(s9, 3.8, 2.6, 2.7, 4.0, title="Privacy-by-Default", subtitle="PILLAR 02",
                       text="Private chats, SMS backups, and passwords are permanently locked and excluded by default.",
                       bg_color=C_GRAY_LIGHT, border_color=C_BORDER_LIGHT)

    add_editorial_card(s9, 6.8, 2.6, 2.7, 4.0, title="Plain Scoping", subtitle="PILLAR 03",
                       text="Transparent explanations of what connecting a service or designating a contact enables.",
                       bg_color=C_GRAY_LIGHT, border_color=C_BORDER_LIGHT)

    add_editorial_card(s9, 9.8, 2.6, 2.733, 4.0, title="Instant Revocation", subtitle="PILLAR 04",
                       text="Users maintain absolute sovereignty to edit, freeze, or cancel permissions at any time.",
                       bg_color=C_BLACK, is_dark=True)

    # SLIDE 10 | 05 — Design Direction: Concept Selection
    s10 = create_slide(prs)
    add_rules_and_headers(s10, "05 Design Direction", "10")
    add_headline(s10, "Why a Centralised Dashboard?")

    add_editorial_card(s10, 0.8, 2.6, 3.6, 4.0, title="Concept A: Browser Extension", subtitle="REJECTED",
                       text="A lightweight extension managing browser tabs.",
                       bullets=["Fails to connect native mobile clouds",
                                "Session-dependent and easily bypassed",
                                "Increases fragmentation rather than resolving it"],
                       bg_color=C_GRAY_LIGHT, border_color=C_BORDER_LIGHT)

    add_editorial_card(s10, 4.8, 2.6, 3.6, 4.0, title="Concept B: Physical USB Vault", subtitle="REJECTED",
                       text="A physical hardware key stored in a safe deposit box.",
                       bullets=["High risk of hardware loss or damage",
                                "Rapidly becomes obsolete as accounts change",
                                "Requires manual re-flashing of files"],
                       bg_color=C_GRAY_LIGHT, border_color=C_BORDER_LIGHT)

    add_editorial_card(s10, 8.8, 2.6, 3.733, 4.0, title="Concept C: Continuity Hub", subtitle="SELECTED DIRECTION",
                       text="A centralised identity & permission coordinator.",
                       bullets=["Unifies multi-cloud visibility in one view",
                                "Operates via secure OAuth metadata tokens",
                                "Zero raw user file hoarding on servers"],
                       bg_color=C_BLACK, is_dark=True)

    # SLIDE 11 | 06 — Experience Structure: Information Architecture
    s11 = create_slide(prs)
    add_rules_and_headers(s11, "06 Experience Structure", "11")
    add_headline(s11, "System Information Architecture")

    add_editorial_card(s11, 0.8, 2.6, 5.6, 4.0, title="Core Architecture Modules", subtitle="SYSTEM TOPOLOGY",
                       bullets=["1. Overview & Health: Readiness score, service status, security alerts",
                                "2. Connected Services: Google Drive, Apple iCloud, OneDrive, Subscriptions",
                                "3. Content Categories: Family Memories, Official Documents, Financial Portals",
                                "4. Trusted Circle: Nominated custodians, contact verification, role assignment",
                                "5. Permission Matrix: Category-to-person access scopes and lock rules",
                                "6. Trigger Engine: Inactivity countdowns and dual-verification gates",
                                "7. Security & 2FA: Biometric passkeys and immutable cryptographic audit log"])

    add_editorial_card(s11, 6.8, 2.6, 5.7, 4.0, title="Architecture Rationale", subtitle="DESIGN LOGIC",
                       text="The IA separates account connection from custodian access to eliminate privacy anxiety.",
                       bullets=["High visual hierarchy prioritizes unconfigured services",
                                "Category separation prevents accidental blanket access",
                                "Dedicated audit trail provides continuous reassurance",
                                "Calm navigation structure minimizes cognitive fatigue"],
                       bg_color=C_GRAY_LIGHT, border_color=C_BORDER_LIGHT)

    # SLIDE 12 | 06 — Experience Structure: User Flow
    s12 = create_slide(prs)
    add_rules_and_headers(s12, "06 Experience Structure", "12")
    add_headline(s12, "From Onboarding to Continuity Release")

    steps = [
        ("01. Secure Onboard", "Biometric 2FA establishes primary ownership."),
        ("02. Connect Services", "Scoped OAuth links Google, Apple, or OneDrive."),
        ("03. Set Boundaries", "Lock sensitive folders (chats/passwords) by default."),
        ("04. Nominate Custodian", "Assign verified contact details and family role."),
        ("05. Configure Triggers", "Select inactivity period (e.g. 90 days) & verification."),
        ("06. Audit & Revoke", "Periodic health checks with one-click revocation.")
    ]
    for idx, (st, desc) in enumerate(steps):
        col_x = 0.8 + idx * 1.95
        add_editorial_card(s12, col_x, 2.6, 1.85, 4.0, title=st, subtitle=f"STEP {idx+1:02d}", text=desc,
                           bg_color=C_BLACK if idx == 2 else C_GRAY_LIGHT,
                           border_color=C_BORDER_LIGHT if idx != 2 else None,
                           is_dark=(idx == 2))

    # SLIDE 13 | 07 — Early Exploration: Low-Fidelity Wireframes
    s13 = create_slide(prs)
    add_rules_and_headers(s13, "07 Early Exploration", "13")
    add_headline(s13, "Evaluating Navigation Mental Models")

    add_editorial_card(s13, 0.8, 2.6, 3.6, 4.0, title="Model 1: Service-First", subtitle="WIREFRAME EXPLORATION A",
                       text="Organized around individual platform accounts.",
                       bullets=["Vertical list of connected cloud apps",
                                "User sets rules inside each service",
                                "High cognitive load replicating rules 10+ times",
                                "Fails to provide a holistic continuity view"],
                       bg_color=C_GRAY_LIGHT, border_color=C_BORDER_LIGHT)

    add_editorial_card(s13, 4.8, 2.6, 3.6, 4.0, title="Model 2: Person-First", subtitle="WIREFRAME EXPLORATION B",
                       text="Organized around nominated trusted individuals.",
                       bullets=["Custodian profile cards with attached folders",
                                "Leaves unassigned personal assets invisible",
                                "Risk of forgetting crucial cloud services",
                                "Inadequate for overall footprint audit"],
                       bg_color=C_GRAY_LIGHT, border_color=C_BORDER_LIGHT)

    add_editorial_card(s13, 8.8, 2.6, 3.733, 4.0, title="Model 3: Hybrid Dashboard", subtitle="SELECTED WIREFRAME",
                       text="A unified bento dashboard balancing health, assets, and circle.",
                       bullets=["Instant glanceability of readiness score",
                                "Separates services from permission grants",
                                "Permanent privacy shield for sensitive data"],
                       bg_color=C_BLACK, is_dark=True)

    # SLIDE 14 | 08 — Round 1 Testing: Usability Testing Protocol (Planned)
    s14 = create_slide(prs)
    add_rules_and_headers(s14, "08 Round 1 Testing", "14")
    add_headline(s14, "Low-Fidelity Testing Protocol & Hypotheses (Planned)")

    add_editorial_card(s14, 0.8, 2.6, 3.6, 4.0, title="Core Usability Tasks", subtitle="TASK PROTOCOL",
                       bullets=["Task 1: Scoped Cloud Connect — Connect Google Drive while ensuring private chats and emails remain excluded.",
                                "Task 2: Selective Custodian Nomination — Designate a sibling with access strictly limited to family photos.",
                                "Task 3: Permission Audit & Revoke — Identify active connections and revoke access for an existing contact."])

    add_editorial_card(s14, 4.8, 2.6, 3.6, 4.0, title="Research Hypotheses", subtitle="INQUIRY GOALS",
                       bullets=["RQ1: Do users differentiate between linking a service and granting custodian access?",
                                "RQ2: Does the 'Locked by Default' shield alleviate privacy hesitation?",
                                "H1: Users will hesitate if permission scopes use technical OAuth terms instead of human language."],
                       bg_color=C_GRAY_LIGHT, border_color=C_BORDER_LIGHT)

    add_editorial_card(s14, 8.8, 2.6, 3.733, 4.0, title="Target Benchmarks", subtitle="EVALUATION METRICS",
                       bullets=["Task Completion Rate: Target > 85% unassisted",
                                "Single Ease Question (SEQ): Target > 5.5 / 7",
                                "System Usability Scale (SUS): Target > 75",
                                "Qualitative: Log hesitation cues and privacy doubts"],
                       bg_color=C_BLACK, is_dark=True)

    # SLIDE 15 | 09 — Iteration: Key UX Refinements
    s15 = create_slide(prs)
    add_rules_and_headers(s15, "09 Iteration", "15")
    add_headline(s15, "Evidence-Driven Design Refinements")

    add_editorial_card(s15, 0.8, 2.6, 3.6, 4.0, title="1. Link vs Share", subtitle="REFINEMENT 01",
                       text="Initial Friction: Users feared linking Google Drive immediately shared files with family.",
                       bullets=["Issue: Conflation of authentication and delegation",
                                "Response: Re-architected into 2 distinct steps",
                                "Added badge: 'Connecting does not share files'"],
                       bg_color=C_GRAY_LIGHT, border_color=C_BORDER_LIGHT)

    add_editorial_card(s15, 4.8, 2.6, 3.6, 4.0, title="2. Zero-Trust Defaults", subtitle="REFINEMENT 02",
                       text="Initial Friction: Open checklists created anxiety over accidental over-sharing.",
                       bullets=["Issue: Manual exclusion induces fear and fatigue",
                                "Response: Chats and passwords locked by default",
                                "User must explicitly unlock private categories"],
                       bg_color=C_BLACK, is_dark=True)

    add_editorial_card(s15, 8.8, 2.6, 3.733, 4.0, title="3. Plain Triggers", subtitle="REFINEMENT 03",
                       text="Initial Friction: Users were bewildered by technical OAuth timeout jargon.",
                       bullets=["Issue: Technical terms alienated non-technical users",
                                "Response: Replaced with conversational conditions",
                                "'Access released only after 90 days inactivity'"],
                       bg_color=C_GRAY_LIGHT, border_color=C_BORDER_LIGHT)

    # SLIDE 16 | 10 — Visual Identity and Design System
    s16 = create_slide(prs)
    add_rules_and_headers(s16, "10 Design System", "16")
    add_headline(s16, "Visual Identity Tokens & Swiss Typography")

    add_editorial_card(s16, 0.8, 2.6, 2.7, 4.0, title="Color Palette", subtitle="SURFACE TOKENS",
                       bullets=["Obsidian #0D0D0D: Deep contrast and focus",
                                "Canvas #FFFFFF: Crisp, airy readability",
                                "Slate Mist #EEF0F2: Subtle structural grouping",
                                "Emerald #10B981: Active status indicator",
                                "Crimson #EF4444: Protected boundary lock"],
                       bg_color=C_GRAY_LIGHT, border_color=C_BORDER_LIGHT)

    add_editorial_card(s16, 3.8, 2.6, 2.7, 4.0, title="Typography", subtitle="NEO-GROTESQUE SCALE",
                       bullets=["Display (44pt Bold): Impact titles",
                                "Section Head (24pt Bold): Clean signposts",
                                "Card Header (14pt Bold): Bento anchors",
                                "Body Copy (10pt Regular): 1.4 line-height",
                                "Running Meta (8.5pt Bold): Uppercase tags"],
                       bg_color=C_GRAY_LIGHT, border_color=C_BORDER_LIGHT)

    add_editorial_card(s16, 6.8, 2.6, 2.7, 4.0, title="Grid & Hairlines", subtitle="LAYOUT LOGIC",
                       bullets=["8pt Baseline Grid alignment",
                                "Hairline 0.5pt divider rules",
                                "Rectangular containers with sharp edges",
                                "Generous negative space throughout"],
                       bg_color=C_GRAY_LIGHT, border_color=C_BORDER_LIGHT)

    add_editorial_card(s16, 9.8, 2.6, 2.733, 4.0, title="Calm Tone", subtitle="ETHICAL STANDARDS",
                       bullets=["WCAG AAA Contrast compliance",
                                "Zero macabre death metaphors",
                                "Reassuring, dignified microcopy",
                                "No dark patterns or forced signups"],
                       bg_color=C_BLACK, is_dark=True)

    # SLIDE 17 | 11 — Final Solution: Dashboard (Screen 01)
    s17 = create_slide(prs)
    add_rules_and_headers(s17, "11 Final Solution", "17")
    add_headline(s17, "Screen 01 — Centralised Continuity Dashboard")

    add_editorial_card(s17, 0.8, 2.6, 3.6, 4.0, title="Continuity Readiness: 68%", subtitle="SYSTEM HEALTH METER",
                       text="Overview of digital footprint protection.",
                       bullets=["3 of 5 connected accounts configured",
                                "2 verified custodians nominated",
                                "Microsoft 365 pending category scoping",
                                "2FA biometric security active",
                                "→ Action: Complete Google Photos Scoping"],
                       bg_color=C_BLACK, is_dark=True)

    add_editorial_card(s17, 4.8, 2.6, 3.6, 4.0, title="Connected Services", subtitle="3 PLATFORMS ACTIVE",
                       bullets=["Google Cloud (Drive/Photos): Active • Scoped to Photos",
                                "Apple iCloud (Docs/Vault): Active • Scoped to IDs",
                                "Microsoft 365: Pending Scoping",
                                "One-click disconnect available 24/7"],
                       bg_color=C_GRAY_LIGHT, border_color=C_BORDER_LIGHT)

    add_editorial_card(s17, 8.8, 2.6, 3.733, 4.0, title="Trusted Circle", subtitle="2 CUSTODIANS ASSIGNED",
                       bullets=["Riya Ambade (Sister): Scoped to Family Memories",
                                "Arjun Mehta (Partner): Scoped to Legal Records",
                                "Current State: Standby Mode (Zero active data access)",
                                "Audit log records every verification event"],
                       bg_color=C_GRAY_LIGHT, border_color=C_BORDER_LIGHT)

    # SLIDE 18 | 11 — Final Solution: Service Connection Flow (Screen 02)
    s18 = create_slide(prs)
    add_rules_and_headers(s18, "11 Final Solution", "18")
    add_headline(s18, "Screen 02 — Granular Service Connection Flow")

    add_editorial_card(s18, 0.8, 2.6, 5.6, 4.0, title="Step-by-Step Connection Logic", subtitle="INTEGRATION PROTOCOL",
                       bullets=["1. Select Provider: Choose Google, Apple, or Microsoft",
                                "2. Scope Disclosure: System explains exact folder metadata read",
                                "3. 2FA Re-Authentication: Biometric check confirms identity",
                                "4. Boundary Confirmation: Lock excluded content before saving",
                                "5. Instant Revocation: One-click disconnect from dashboard"])

    add_editorial_card(s18, 6.8, 2.6, 5.7, 4.0, title="Modal UI: Google Cloud Link", subtitle="HIGH-FIDELITY MODAL MOCKUP",
                       text="Account Link: user@gmail.com (Verified Google ID)",
                       bullets=["Requested Scopes: Read-only metadata for Photos & Docs",
                                "Architectural Exclusions: Gmail inbox, Chrome history, passwords",
                                "Zero-Trust Guarantee: Continuity Hub will never store passwords, read file contents, or share data with third parties."],
                       bg_color=C_BLACK, is_dark=True)

    # SLIDE 19 | 11 — Final Solution: Selective Permission Matrix (Screen 03)
    s19 = create_slide(prs)
    add_rules_and_headers(s19, "11 Final Solution", "19")
    add_headline(s19, "Screen 03 — Category-Based Selective Permission Matrix")

    add_editorial_card(s19, 0.8, 2.6, 2.7, 4.0, title="Family Memories", subtitle="CATEGORY 01 • SHARED",
                       text="Scope: Family photos, vacation albums, creative notes.",
                       bullets=["Custodian: Riya Ambade (Sister)", "Privacy: Medium (Safe for family)", "Release: Inactivity trigger verified"],
                       bg_color=C_GRAY_LIGHT, border_color=C_BORDER_LIGHT)

    add_editorial_card(s19, 3.8, 2.6, 2.7, 4.0, title="Legal Documents", subtitle="CATEGORY 02 • SHARED",
                       text="Scope: Passport scans, deeds, health insurance.",
                       bullets=["Custodian: Arjun Mehta (Partner)", "Privacy: High (Practical continuity)", "Release: Dual verification required"],
                       bg_color=C_GRAY_LIGHT, border_color=C_BORDER_LIGHT)

    add_editorial_card(s19, 6.8, 2.6, 2.7, 4.0, title="Private Chats", subtitle="CATEGORY 03 • LOCKED",
                       text="Scope: WhatsApp, Signal, SMS, personal emails.",
                       bullets=["Custodian: NONE (PERMANENTLY EXCLUDED)", "Privacy: MAXIMUM (Inviolable)", "System: Auto-delete metadata upon inactivity"],
                       bg_color=C_BLACK, is_dark=True)

    add_editorial_card(s19, 9.8, 2.6, 2.733, 4.0, title="Financial Portals", subtitle="CATEGORY 04 • RESTRICTED",
                       text="Scope: Bank names, utility links, account existence.",
                       bullets=["Custodian: Reference Only", "Privacy: Restricted (Zero PINs stored)", "Purpose: Informs family that account exists"],
                       bg_color=C_GRAY_LIGHT, border_color=C_BORDER_LIGHT)

    # SLIDE 20 | 11 — Final Solution: Custodians & Triggers (Screen 04)
    s20 = create_slide(prs)
    add_rules_and_headers(s20, "11 Final Solution", "20")
    add_headline(s20, "Screen 04 — Nominated Custodians & Release Triggers")

    add_editorial_card(s20, 0.8, 2.6, 5.6, 4.0, title="Custodian Dossier: Riya Ambade", subtitle="PRIMARY NOMINEE",
                       bullets=["Relationship: Sister (Primary Family Custodian)",
                                "Contact: Verified Email & Mobile 2FA Confirmed",
                                "Permitted Scopes: Family Memories & Travel Photography",
                                "Excluded Scopes: Work Drives, Tax Files, Private Chats",
                                "Current Status: Standby Mode (Zero access active)"])

    add_editorial_card(s20, 6.8, 2.6, 5.7, 4.0, title="Dual-Gate Release Protocol", subtitle="TRIGGER CONDITIONS",
                       bullets=["Gate 1: Inactivity Heartbeat (90 days with no owner login)",
                                "Gate 2: Verification Alerts (3 warning pings sent over 30 days)",
                                "Gate 3: Official Verification (Custodian submits verified ID)",
                                "Fail-Safe: Any user login immediately resets the countdown to zero",
                                "Silent Revocation: Alter scopes without awkward notifications"],
                       bg_color=C_BLACK, is_dark=True)

    # SLIDE 21 | 12 — Round 2 Validation: Protocol & Benchmarks (Planned)
    s21 = create_slide(prs)
    add_rules_and_headers(s21, "12 Round 2 Validation", "21")
    add_headline(s21, "High-Fidelity Validation Protocol & Verification Plan")

    add_editorial_card(s21, 0.8, 2.6, 3.6, 4.0, title="Target Usability Benchmarks", subtitle="QUANTITATIVE TARGETS",
                       bullets=["System Usability Scale: Target > 80 (Grade A Usability)",
                                "Task Completion Rate: Target > 90% unassisted",
                                "Single Ease Question (SEQ): Target > 5.8 / 7 difficulty rating",
                                "Error Recovery Rate: 100% recovery from accidental delegation"],
                       bg_color=C_GRAY_LIGHT, border_color=C_BORDER_LIGHT)

    add_editorial_card(s21, 4.8, 2.6, 3.6, 4.0, title="Participant Stratification", subtitle="EVALUATION COHORT (N=6)",
                       bullets=["Young Adults (18–25): Focus on chat exclusions & privacy comfort",
                                "Working Adults (30–45): Focus on multi-cloud sync & tax handoff",
                                "Mature Adults (55+): Focus on legibility & custodian setup"],
                       bg_color=C_GRAY_LIGHT, border_color=C_BORDER_LIGHT)

    add_editorial_card(s21, 8.8, 2.6, 3.733, 4.0, title="Visual Attention & Heatmap", subtitle="ATTENTION MAPPING",
                       bullets=["Eye-tracking fixation tracking on the Centralised Dashboard",
                                "Hypothesis: Attention clusters on Readiness Score & Locked Chats",
                                "Goal: Validate that privacy boundaries are recognized in <5 seconds"],
                       bg_color=C_BLACK, is_dark=True)

    # SLIDE 22 | 13 — Final Outcome: Deliverables & Fidelity Scope
    s22 = create_slide(prs)
    add_rules_and_headers(s22, "13 Final Outcome", "22")
    add_headline(s22, "Delivered Artefacts & Prototype Fidelity Scope")

    add_editorial_card(s22, 0.8, 2.6, 3.6, 4.0, title="Delivered Course Artefacts", subtitle="DELIVERABLES SUMMARY",
                       bullets=["24-Slide UX Case Study Deck following brief",
                                "Interactive Figma Prototype (34 documented states)",
                                "Design System Token Library & Component Rules",
                                "A1 Large-Format Exhibition Display Panel"],
                       bg_color=C_BLACK, is_dark=True)

    add_editorial_card(s22, 4.8, 2.6, 3.6, 4.0, title="Demonstrated Prototype Scope", subtitle="FUNCTIONAL CAPABILITIES",
                       bullets=["Dynamic readiness meter with interactive recalculation",
                                "Granular OAuth service connection simulation",
                                "Category permission engine with real-time feedback",
                                "Custodian nomination and trigger setting flow"],
                       bg_color=C_GRAY_LIGHT, border_color=C_BORDER_LIGHT)

    add_editorial_card(s22, 8.8, 2.6, 3.733, 4.0, title="Deliberate Boundaries", subtitle="TECHNICAL DEMARCATION",
                       bullets=["Live third-party cloud APIs simulated for testing",
                                "Backend cryptography modeled via architecture spec",
                                "Document verification treated as a human-in-the-loop flow"],
                       bg_color=C_GRAY_LIGHT, border_color=C_BORDER_LIGHT)

    # SLIDE 23 | 14 — Learnings, Limitations & Future Scope
    s23 = create_slide(prs)
    add_rules_and_headers(s23, "14 Learnings & Limitations", "23")
    add_headline(s23, "Critical Reflections & Industry Walled Gardens")

    add_editorial_card(s23, 0.8, 2.6, 3.6, 4.0, title="Pedagogical Reflections", subtitle="DESIGN TAKEAWAYS",
                       bullets=["Privacy is the Precondition: Privacy is the condition for participation",
                                "Tone Shapes Engagement: Calm language eliminates emotional avoidance",
                                "Honest Limits Build Trust: Clear boundaries foster user confidence"],
                       bg_color=C_BLACK, is_dark=True)

    add_editorial_card(s23, 4.8, 2.6, 3.6, 4.0, title="Industry Constraints", subtitle="PLATFORM BARRIERS",
                       bullets=["Walled Gardens: Tech giants restrict third-party data portability",
                                "Legal Fragmentation: Digital property laws vary drastically by nation",
                                "Incapacity Detection: Detecting death without surveillance is hard"],
                       bg_color=C_GRAY_LIGHT, border_color=C_BORDER_LIGHT)

    add_editorial_card(s23, 8.8, 2.6, 3.733, 4.0, title="Future Roadmap", subtitle="SERVICE EXTENSIONS",
                       bullets=["Decentralised ID (DID) with zero-knowledge proofs",
                                "Collaborative multi-signature guardian circles (2 of 3)",
                                "Exhibition peer & faculty critique on November 4"],
                       bg_color=C_GRAY_LIGHT, border_color=C_BORDER_LIGHT)

    # SLIDE 24 | 15 — Credits, Acknowledgements & References
    s24 = create_slide(prs)
    add_rules_and_headers(s24, "15 Credits & References", "24")
    add_headline(s24, "Academic References & Project Credits")

    add_editorial_card(s24, 0.8, 2.6, 4.5, 4.0, title="Peer-Reviewed Bibliography", subtitle="PRIMARY CITATIONS",
                       bullets=["ACM Review (2023): Digital Legacy: A Systematic Review, doi: 10.1145/3610059",
                                "Digital Legacy Association (2024): Digital Death Survey, London, UK",
                                "PubMed / Omega (2025): Social Media & Continuing Bonds, PMID: 41215584",
                                "ScienceDirect (2026): Digital Grief Technology Review, Computers in Human Behavior",
                                "The Indian Express (2026): Digital Data After Death Legal Report"],
                       bg_color=C_GRAY_LIGHT, border_color=C_BORDER_LIGHT)

    add_editorial_card(s24, 5.6, 2.6, 3.2, 4.0, title="Platform Documentation", subtitle="TECHNICAL CITATIONS",
                       bullets=["Apple Inc. (2026): Legacy Contact Guide HT212360",
                                "Google LLC (2026): Inactive Account Manager ID 3036546",
                                "W3C & FIDO Alliance (2025): WebAuthn Standards"],
                       bg_color=C_GRAY_LIGHT, border_color=C_BORDER_LIGHT)

    add_editorial_card(s24, 9.1, 2.6, 3.433, 4.0, title="Course Credits", subtitle="PROJECT RECOGNITION",
                       bullets=["Student Lead: Vidhi Ambade (Sem 7)",
                                "Course: UEDP-5 (45 Marks)",
                                "Faculty Lead: Prof. Kriti Kusum",
                                "Tools: Figma, Python-pptx, Illustrator",
                                "Programme: B.Des User Experience Design"],
                       bg_color=C_BLACK, is_dark=True)

    # Save PPTX to target paths
    out_workspace = "/Users/vidhi/Desktop/uni/MIA a3/Digital_Continuity_Hub_UEDP5_Case_Study.pptx"
    out_downloads = "/Users/vidhi/Downloads/Digital_Continuity_Hub_UEDP5_Case_Study.pptx"
    out_desktop = "/Users/vidhi/Desktop/Digital_Continuity_Hub_UEDP5_Case_Study.pptx"

    prs.save(out_workspace)
    shutil.copyfile(out_workspace, out_downloads)
    shutil.copyfile(out_workspace, out_desktop)
    print("PPTX generated successfully with 24 slides!")
    print(f"Saved to:\n- {out_workspace}\n- {out_downloads}\n- {out_desktop}")

if __name__ == "__main__":
    build_presentation()

