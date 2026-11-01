#!/usr/bin/env python3
"""
Digital Continuity Hub — UEDP-5 Final Case Study Presentation Generator
Generates a fully editable widescreen (16:9) PowerPoint (.pptx) file adhering
strictly to the faculty's 15-section brief and the user's Swiss-modernist visual reference.
"""

import os
import sys
from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.enum.text import PP_ALIGN, MSO_ANCHOR
from pptx.enum.shapes import MSO_SHAPE
from pptx.dml.color import RGBColor

# ---------------------------------------------------------
# PALETTE & DESIGN SYSTEM TOKENS (from user reference image)
# ---------------------------------------------------------
C_BG_LIGHT = RGBColor(248, 249, 250)      # #F8F9FA Clean light background
C_BG_DARK = RGBColor(18, 18, 18)          # #121212 Obsidian section background
C_CARD_DARK = RGBColor(24, 24, 24)        # #181818 Deep charcoal card
C_CARD_DARK_BORDER = RGBColor(48, 48, 48) # #303030 Dark card border
C_CARD_SAGE = RGBColor(226, 234, 229)     # #E2EAE5 Reference soft sage
C_CARD_SAGE_BORDER = RGBColor(204, 217, 209)
C_CARD_SLATE = RGBColor(238, 240, 242)    # #EEF0F2 Reference slate mist
C_CARD_SLATE_BORDER = RGBColor(220, 224, 228)
C_CARD_WHITE = RGBColor(255, 255, 255)    # #FFFFFF Crisp white card
C_CARD_WHITE_BORDER = RGBColor(229, 231, 235)

C_TEXT_TITLE = RGBColor(17, 24, 39)       # #111827 Deep charcoal
C_TEXT_BODY = RGBColor(55, 65, 81)        # #374151 Primary body
C_TEXT_MUTED = RGBColor(107, 114, 128)    # #6B7280 Muted gray
C_TEXT_LIGHT = RGBColor(255, 255, 255)    # #FFFFFF
C_TEXT_LIGHT_MUTED = RGBColor(156, 163, 175) # #9CA3AF

C_ACCENT_EMERALD = RGBColor(16, 185, 129) # #10B981 Verified/Active
C_ACCENT_CRIMSON = RGBColor(239, 68, 68)  # #EF4444 Excluded/Restricted

FONT_FAMILY = "Helvetica Neue"

def init_presentation():
    prs = Presentation()
    prs.slide_width = Inches(13.333)
    prs.slide_height = Inches(7.5)
    return prs

def create_slide(prs, is_dark=False):
    blank_layout = prs.slide_layouts[6]
    slide = prs.slides.add_slide(blank_layout)
    bg = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, 0, 0, Inches(13.333), Inches(7.5))
    bg.fill.solid()
    bg.fill.fore_color.rgb = C_BG_DARK if is_dark else C_BG_LIGHT
    bg.line.fill.background()
    return slide

def add_header(slide, section_tag, title, subtitle="", is_dark=False):
    # Pill Badge (top left)
    pill_w = Inches(len(section_tag) * 0.11 + 0.6)
    pill = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(0.55), pill_w, Inches(0.32))
    pill.fill.solid()
    pill.fill.fore_color.rgb = C_CARD_DARK if is_dark else C_CARD_WHITE
    pill.line.color.rgb = C_CARD_DARK_BORDER if is_dark else C_CARD_WHITE_BORDER
    pill.line.width = Pt(1)
    tf_p = pill.text_frame
    tf_p.word_wrap = False
    tf_p.margin_left = Inches(0.12)
    tf_p.margin_right = Inches(0.12)
    tf_p.margin_top = Inches(0.04)
    tf_p.margin_bottom = Inches(0.04)
    p_p = tf_p.paragraphs[0]
    p_p.text = section_tag.upper()
    p_p.font.name = FONT_FAMILY
    p_p.font.size = Pt(8.5)
    p_p.font.bold = True
    p_p.font.color.rgb = C_TEXT_LIGHT_MUTED if is_dark else C_TEXT_MUTED
    p_p.alignment = PP_ALIGN.CENTER

    # Arrow circle badge
    arrow = slide.shapes.add_shape(MSO_SHAPE.OVAL, Inches(0.8) + pill_w + Inches(0.12), Inches(0.55), Inches(0.32), Inches(0.32))
    arrow.fill.solid()
    arrow.fill.fore_color.rgb = C_CARD_DARK if is_dark else C_CARD_WHITE
    arrow.line.color.rgb = C_CARD_DARK_BORDER if is_dark else C_CARD_WHITE_BORDER
    arrow.line.width = Pt(1)
    tf_a = arrow.text_frame
    tf_a.margin_left = tf_a.margin_right = tf_a.margin_top = tf_a.margin_bottom = 0
    p_a = tf_a.paragraphs[0]
    p_a.text = "↘"
    p_a.font.name = FONT_FAMILY
    p_a.font.size = Pt(10)
    p_a.font.color.rgb = C_TEXT_LIGHT_MUTED if is_dark else C_TEXT_MUTED
    p_a.alignment = PP_ALIGN.CENTER

    # Course / Meta Tag (top right)
    meta_box = slide.shapes.add_textbox(Inches(7.5), Inches(0.55), Inches(5.0), Inches(0.35))
    tf_m = meta_box.text_frame
    tf_m.margin_left = tf_m.margin_right = tf_m.margin_top = tf_m.margin_bottom = 0
    p_m = tf_m.paragraphs[0]
    p_m.text = "UEDP-5 • SEMESTER 7 • PROF. KRITI KUSUM"
    p_m.font.name = FONT_FAMILY
    p_m.font.size = Pt(8.5)
    p_m.font.bold = True
    p_m.font.color.rgb = C_TEXT_LIGHT_MUTED if is_dark else C_TEXT_MUTED
    p_m.alignment = PP_ALIGN.RIGHT

    # Slide Title
    title_box = slide.shapes.add_textbox(Inches(0.8), Inches(0.98), Inches(11.7), Inches(0.52))
    tf_t = title_box.text_frame
    tf_t.word_wrap = True
    tf_t.margin_left = tf_t.margin_right = tf_t.margin_top = tf_t.margin_bottom = 0
    p_t = tf_t.paragraphs[0]
    p_t.text = title
    p_t.font.name = FONT_FAMILY
    p_t.font.size = Pt(22)
    p_t.font.bold = True
    p_t.font.color.rgb = C_TEXT_LIGHT if is_dark else C_TEXT_TITLE

    # Subtitle
    if subtitle:
        sub_box = slide.shapes.add_textbox(Inches(0.8), Inches(1.52), Inches(11.7), Inches(0.38))
        tf_s = sub_box.text_frame
        tf_s.word_wrap = True
        tf_s.margin_left = tf_s.margin_right = tf_s.margin_top = tf_s.margin_bottom = 0
        p_s = tf_s.paragraphs[0]
        p_s.text = subtitle
        p_s.font.name = FONT_FAMILY
        p_s.font.size = Pt(11.5)
        p_s.font.color.rgb = C_TEXT_LIGHT_MUTED if is_dark else C_TEXT_MUTED

def add_bento_card(slide, x, y, w, h, bg_rgb, border_rgb, title="", badge_text="", items=[], is_dark=False):
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
    tf.margin_left = Inches(0.24)
    tf.margin_right = Inches(0.24)
    tf.margin_top = Inches(0.22)
    tf.margin_bottom = Inches(0.22)
    tf.vertical_anchor = MSO_ANCHOR.TOP

    # Title & Badge
    first_p = tf.paragraphs[0]
    if badge_text:
        first_p.text = badge_text.upper() + "\n"
        first_p.font.name = FONT_FAMILY
        first_p.font.size = Pt(8.5)
        first_p.font.bold = True
        first_p.font.color.rgb = C_TEXT_LIGHT_MUTED if is_dark else C_TEXT_MUTED
        first_p.space_after = Pt(2)

        if title:
            p_t = tf.add_paragraph()
            p_t.text = title
            p_t.font.name = FONT_FAMILY
            p_t.font.size = Pt(14)
            p_t.font.bold = True
            p_t.font.color.rgb = C_TEXT_LIGHT if is_dark else C_TEXT_TITLE
            p_t.space_after = Pt(8)
    else:
        if title:
            first_p.text = title
            first_p.font.name = FONT_FAMILY
            first_p.font.size = Pt(14)
            first_p.font.bold = True
            first_p.font.color.rgb = C_TEXT_LIGHT if is_dark else C_TEXT_TITLE
            first_p.space_after = Pt(8)

    for it in items:
        p = tf.add_paragraph()
        if isinstance(it, tuple):
            lead, body = it
            p.text = f"• {lead}: {body}" if lead else f"• {body}"
        else:
            p.text = f"• {it}" if not it.startswith("—") else it
        p.font.name = FONT_FAMILY
        p.font.size = Pt(10)
        p.font.color.rgb = C_TEXT_LIGHT if is_dark else C_TEXT_BODY
        p.space_after = Pt(4)

    return shape

def add_metric_card(slide, x, y, w, h, bg_rgb, border_rgb, metric_num, metric_label, subtext="", is_dark=False):
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
    tf.margin_left = Inches(0.24)
    tf.margin_right = Inches(0.24)
    tf.margin_top = Inches(0.22)
    tf.margin_bottom = Inches(0.22)
    tf.vertical_anchor = MSO_ANCHOR.TOP

    p0 = tf.paragraphs[0]
    p0.text = metric_num
    p0.font.name = FONT_FAMILY
    p0.font.size = Pt(36)
    p0.font.bold = True
    p0.font.color.rgb = C_TEXT_LIGHT if is_dark else C_TEXT_TITLE
    p0.space_after = Pt(4)

    p1 = tf.add_paragraph()
    p1.text = metric_label
    p1.font.name = FONT_FAMILY
    p1.font.size = Pt(11)
    p1.font.bold = True
    p1.font.color.rgb = C_TEXT_LIGHT if is_dark else C_TEXT_TITLE
    p1.space_after = Pt(4)

    if subtext:
        p2 = tf.add_paragraph()
        p2.text = subtext
        p2.font.name = FONT_FAMILY
        p2.font.size = Pt(9.5)
        p2.font.color.rgb = C_TEXT_LIGHT_MUTED if is_dark else C_TEXT_MUTED

    return shape

print("Presentation builder modules configured.")
EOF
python3 /tmp/test_helper.py
