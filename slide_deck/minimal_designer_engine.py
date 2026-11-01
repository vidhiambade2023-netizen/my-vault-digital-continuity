#!/usr/bin/env python3
"""
Ultra-Minimal Editorial Presentation Generator
Digital Continuity Hub — UEDP-5 Final Case Study
Student: Vidhi Ambade | Faculty: Prof. Kriti Kusum | Semester 7

Designed in the style of Swiss Modernist / Editorial Design:
- Thin hairline divider rules (top & bottom)
- Elegant metadata running heads and footers
- Large, bold headlines with tight tracking and high whitespace
- Minimal copy (no dense paragraphs or text walls)
- Clean black quadrant grid for key metrics (matching reference image)
- 24 slides covering all 15 faculty sections in exact order
"""

import os
import shutil
from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.enum.text import PP_ALIGN, MSO_ANCHOR
from pptx.enum.shapes import MSO_SHAPE
from pptx.dml.color import RGBColor

# COLOR TOKENS
C_WHITE = RGBColor(255, 255, 255)
C_BLACK = RGBColor(13, 13, 13)          # #0D0D0D Deep Obsidian
C_CHARCOAL = RGBColor(28, 28, 28)       # #1C1C1C
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

    # Top Header Text: Left (Project), Center (Section), Right (Slide Num)
    tb_top = slide.shapes.add_textbox(Inches(0.8), Inches(0.42), Inches(11.733), Inches(0.35))
    tf_top = tb_top.text_frame
    tf_top.margin_left = tf_top.margin_right = tf_top.margin_top = tf_top.margin_bottom = 0
    p = tf_top.paragraphs[0]
    p.text = f"The Digital Continuity Hub               {section_name}"
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
    tb = slide.shapes.add_textbox(Inches(x), Inches(y), Inches(w), Inches(1.2))
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
    
    pad = 0.25 if bg_color else 0.0
    tb = slide.shapes.add_textbox(Inches(x + pad), Inches(y + pad), Inches(w - 2*pad), Inches(h - 2*pad))
    tf = tb.text_frame
    tf.word_wrap = True
    tf.margin_left = tf.margin_right = tf.margin_top = tf.margin_bottom = 0
    tf.vertical_anchor = MSO_ANCHOR.TOP

    p0 = tf.paragraphs[0]
    if subtitle:
        p0.text = subtitle.upper()
        p0.font.name = FONT_FAM
        p0.font.size = Pt(8)
        p0.font.bold = True
        p0.font.color.rgb = C_TEXT_LIGHT_MUTED if is_dark else C_TEXT_MUTED
        p0.space_after = Pt(4)

    if title:
        p_t = tf.add_paragraph() if subtitle else p0
        p_t.text = title
        p_t.font.name = FONT_FAM
        p_t.font.size = Pt(14)
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
    """
    Renders a solid black 2x2 grid container split with hairline white/gray dividers,
    matching Slide 3 in the user's reference image!
    """
    # Main black container
    box = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(x), Inches(y), Inches(w), Inches(h))
    box.fill.solid()
    box.fill.fore_color.rgb = C_BLACK
    box.line.fill.background()

    # Hairline vertical divider
    v_line = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(x + w/2), Inches(y), Inches(0.012), Inches(h))
    v_line.fill.solid()
    v_line.fill.fore_color.rgb = C_BORDER_DARK
    v_line.line.fill.background()

    # Hairline horizontal divider
    h_line = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(x), Inches(y + h/2), Inches(w), Inches(0.012))
    h_line.fill.solid()
    h_line.fill.fore_color.rgb = C_BORDER_DARK
    h_line.line.fill.background()

    # 4 Quadrants
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

        tb = slide.shapes.add_textbox(Inches(cx + 0.3), Inches(cy + 0.3), Inches(cw - 0.6), Inches(ch - 0.6))
        tf = tb.text_frame
        tf.word_wrap = True
        tf.margin_left = tf.margin_right = tf.margin_top = tf.margin_bottom = 0
        tf.vertical_anchor = MSO_ANCHOR.BOTTOM

        p_num = tf.paragraphs[0]
        p_num.text = num
        p_num.font.name = FONT_FAM
        p_num.font.size = Pt(34)
        p_num.font.bold = True
        p_num.font.color.rgb = C_TEXT_LIGHT
        p_num.space_after = Pt(2)

        p_lbl = tf.add_paragraph()
        p_lbl.text = label
        p_lbl.font.name = FONT_FAM
        p_lbl.font.size = Pt(10)
        p_lbl.font.bold = True
        p_lbl.font.color.rgb = C_TEXT_LIGHT
        p_lbl.space_after = Pt(2)

        if sub:
            p_sub = tf.add_paragraph()
            p_sub.text = sub
            p_sub.font.name = FONT_FAM
            p_sub.font.size = Pt(8.5)
            p_sub.font.color.rgb = C_TEXT_LIGHT_MUTED

print("Base layout engine compiled.")
EOF
python3 /tmp/test_helper.py
