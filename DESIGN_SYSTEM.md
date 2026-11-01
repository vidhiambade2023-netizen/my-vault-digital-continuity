# DESIGN SYSTEM — MY VAULT
## Editorial Modernist Security Interface | Design Tokens & Component Rules

---

## 1. Design Philosophy & Aesthetic Principles

*My Vault* is an editorial-style, premium security dashboard designed around trust, emotional composure, and cognitive clarity. It rejects flashy SaaS trends (gradients, neon glows, glassmorphism, rounded pill buttons, and noisy decorative analytics) in favor of crisp typography, disciplined 1px hairlines, generous whitespace, and restrained blue-grey accents.

### Core Tenets
1. **Calm Authority:** Interface communicates quiet confidence. No red alert banners or macabre death imagery.
2. **Intentional Hierarchy:** High typographical contrast between bold headlines and restrained supporting copy.
3. **Single Accent Rule:** Blue-grey (`#A2AEC6`) serves as the singular chromatic accent, used purposefully for active navigation, key checkboxes, and primary focus states.
4. **Zero-Trust Transparency:** Exclusions and locked states are presented with quiet clarity, ensuring the owner always knows what is protected.

---

## 2. Color Palette & Design Tokens

```css
:root {
  /* Surfaces */
  --bg-app: #F8F8F6;          /* Off-white canvas */
  --bg-surface: #FFFFFF;      /* Clean card and panel surface */
  --bg-surface-subtle: #F2F3F1;/* Secondary module background */
  --bg-dark: #0B0B0D;         /* Primary deep black */
  --bg-dark-hover: #1A1A1E;   /* Interactive dark hover */

  /* Accent Tokens (Blue-Grey Monochromatic System) */
  --accent-primary: #A2AEC6;  /* Blue-grey accent */
  --accent-soft: #E7EAF0;     /* Pale blue-grey for pills, selected tags, highlights */
  --accent-border: #C8D1E0;   /* Accent border */

  /* Typography Colors */
  --text-primary: #0B0B0D;    /* Main headlines and active labels */
  --text-secondary: #737680;  /* Secondary descriptions, meta text, timestamps */
  --text-muted: #9E9EA7;      /* Subtle placeholders and captions */
  --text-inverse: #FFFFFF;    /* Text on dark surfaces */

  /* Structural Borders */
  --border-light: #E1E2E5;    /* 1px subtle hairline borders */
  --border-subtle: #EEEEF0;   /* Inner divider lines */
  --border-dark: #232328;     /* Dark card hairline borders */

  /* Functional Status Colors (Restrained) */
  --status-active-bg: #EDF7EE;
  --status-active-text: #2E7D32;
  --status-active-border: #C5E6C8;

  --status-pending-bg: #FDF6E2;
  --status-pending-text: #8D6B00;
  --status-pending-border: #F7E4B5;

  --status-locked-bg: #FBEBEB;
  --status-locked-text: #C0392B;
  --status-locked-border: #F3C3C3;

  /* Typography */
  --font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  --radius-sm: 4px;
  --radius-md: 6px;
  --radius-lg: 8px;
  --radius-card: 10px;

  /* Spacing Scale (8pt Grid) */
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 20px;
  --space-6: 24px;
  --space-8: 32px;
  --space-10: 40px;
  --space-12: 48px;

  /* Shadows (Minimal, Non-Glassmorphic) */
  --shadow-sm: 0 1px 2px rgba(11, 11, 13, 0.04);
  --shadow-md: 0 4px 12px rgba(11, 11, 13, 0.06);
  --shadow-modal: 0 12px 32px rgba(11, 11, 13, 0.12);
}
```

---

## 3. Typography Scale & Editorial Rules

| Style | Size | Weight | Line Height | Tracking | Usage |
|---|---|---|---|---|---|
| **Display Header** | 30px (1.875rem) | 600 SemiBold | 1.2 | -0.025em | Primary Page Titles (`"Your digital life, organised."`) |
| **Section Title** | 20px (1.25rem) | 600 SemiBold | 1.3 | -0.015em | Module and Card Headings |
| **Card Header** | 16px (1rem) | 600 SemiBold | 1.35 | -0.01em | Service & Nominee Card Titles |
| **Body Regular** | 14px (0.875rem) | 400 Regular | 1.5 | normal | General interface copy and descriptions |
| **Body Medium** | 14px (0.875rem) | 500 Medium | 1.45 | normal | Interactive labels, table rows, button text |
| **Microcopy / Meta** | 12px (0.75rem) | 500 Medium | 1.4 | +0.02em | Timestamps, status pills, helper captions |
| **Eyebrow / Overline**| 11px (0.6875rem) | 600 SemiBold | 1.3 | +0.06em | Category tags and section overlines (Uppercase) |

---

## 4. Component Rules & Anatomy

### 1. AppShell & Layout
- **Target Resolution:** Designed for a 1440px desktop viewport; fluid down to 1024px tablet and 375px mobile breakpoint.
- **Sidebar (260px):** Fixed left navigation with brand logo ("My Vault"), 10 primary navigation items with clean Lucide icons, owner profile indicator at bottom, and a quick "New connection" shortcut.
- **Topbar (64px):** Fixed header featuring breadcrumbs/view title, global search bar, notification center bell (with badge), and owner security control status pill (`"Owner control active"`).
- **Main Canvas:** Centered content container (`max-width: 1180px`) on `--bg-app` with 32px padding and consistent vertical cadence.

### 2. Buttons & Actions
- **Primary Action:** Solid black `--bg-dark`, white text, 8px radius, 14px font, 10px 18px padding. Crisp hover to `--bg-dark-hover`.
- **Secondary Action:** White background `--bg-surface`, 1px border `--border-light`, text `--text-primary`.
- **Accent Action:** Pale blue-grey `--accent-soft`, text `--text-primary`, subtle border `--accent-border`.
- **Destructive Action:** Restrained white background with subtle red border and text `--status-locked-text`. Requires explicit confirmation modal.

### 3. Cards & Containers
- White background (`--bg-surface`), 1px solid border (`--border-light`), subtle 10px corner radius (`--radius-card`), and gentle shadow (`--shadow-sm`).
- Internal padding: 24px (`--space-6`).

### 4. Status Badges & Pills
- Small rounded rectangular badges (`border-radius: 4px`), 11px uppercase bold font, 3px 8px padding.
- Always combine a status color with explicit text label (never rely on color alone).

### 5. Modals & Overlays
- Centered modal dialogs with `--bg-surface`, 12px radius, hairline header divider, and dark backdrop (`rgba(11, 11, 13, 0.45)`).
- Escape key and backdrop click dismissal.

