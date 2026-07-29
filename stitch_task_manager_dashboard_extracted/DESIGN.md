---
name: Serene Productivity
colors:
  surface: '#f8f9ff'
  surface-dim: '#cbdbf5'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e5eeff'
  surface-container-high: '#dce9ff'
  surface-container-highest: '#d3e4fe'
  on-surface: '#0b1c30'
  on-surface-variant: '#414755'
  inverse-surface: '#213145'
  inverse-on-surface: '#eaf1ff'
  outline: '#717786'
  outline-variant: '#c1c6d7'
  surface-tint: '#005bc1'
  primary: '#0058bc'
  on-primary: '#ffffff'
  primary-container: '#0070eb'
  on-primary-container: '#fefcff'
  inverse-primary: '#adc6ff'
  secondary: '#526069'
  on-secondary: '#ffffff'
  secondary-container: '#d3e2ed'
  on-secondary-container: '#56656e'
  tertiary: '#595c5e'
  on-tertiary: '#ffffff'
  tertiary-container: '#727577'
  on-tertiary-container: '#fbfdff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d8e2ff'
  primary-fixed-dim: '#adc6ff'
  on-primary-fixed: '#001a41'
  on-primary-fixed-variant: '#004493'
  secondary-fixed: '#d6e5ef'
  secondary-fixed-dim: '#bac9d3'
  on-secondary-fixed: '#0f1d25'
  on-secondary-fixed-variant: '#3b4951'
  tertiary-fixed: '#e0e3e5'
  tertiary-fixed-dim: '#c4c7c9'
  on-tertiary-fixed: '#191c1e'
  on-tertiary-fixed-variant: '#444749'
  background: '#f8f9ff'
  on-background: '#0b1c30'
  surface-variant: '#d3e4fe'
typography:
  headline-lg:
    fontFamily: Open Sans
    fontSize: 30px
    fontWeight: '700'
    lineHeight: 38px
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Open Sans
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
  headline-md:
    fontFamily: Open Sans
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Open Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Open Sans
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-md:
    fontFamily: Open Sans
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 4px
  xs: 8px
  sm: 16px
  md: 24px
  lg: 40px
  xl: 64px
  gutter: 20px
  margin: 24px
---

## Brand & Style

The brand personality of the design system is centered on clarity, mental breathing room, and effortless organization. It targets professionals and students who feel overwhelmed by cluttered interfaces and seek a "digital sanctuary" for their tasks. The emotional response should be one of immediate calm and regained control.

The design style is **Minimalism** with a soft, modern touch. It prioritizes heavy whitespace to reduce cognitive load and uses a limited, airy color palette. High-quality typography and subtle depth through soft shadows replace heavy borders or loud decorative elements, ensuring the user's content remains the sole focus.

## Colors

The palette is anchored by a functional **Light Blue** (#E3F2FD) used for secondary surfaces and highlights, while a more vibrant **Action Blue** (#007AFF) is reserved for primary interactive elements to ensure high contrast and accessibility. 

- **Primary**: Used for high-emphasis actions and active states.
- **Secondary**: Used for large background areas, cards, or subtle emphasis.
- **Tertiary/Surface**: A near-white off-grey used for the main application background to reduce eye strain compared to pure white.
- **Neutral**: Slate tones used for body text, icons, and deactivated states to maintain a professional, grounded feel.

## Typography

This design system uses **Open Sans** exclusively to maintain a cohesive, approachable, and highly readable environment. The typographic hierarchy is strictly enforced to guide the user's eye from high-level categories to specific task details.

- **Headlines**: Use SemiBold or Bold weights with slightly tightened letter spacing to create a sturdy, professional look for page titles.
- **Body Text**: Uses a generous line height (1.5x) to ensure task lists remain legible even when densely populated.
- **Labels**: Small caps or bold weights are used for metadata like dates, tags, or status indicators to provide contrast without increasing font size.

## Layout & Spacing

The layout follows a **Fluid Grid** model with fixed maximum widths for desktop to prevent task lines from becoming too long and unreadable. 

- **Desktop**: 12-column grid, max-width 1200px, centered.
- **Tablet**: 8-column grid with 24px margins.
- **Mobile**: 4-column grid with 16px margins.

Spacing is based on a 4px/8px baseline rhythm. Generous vertical spacing (32px-40px) is used between major sections to emphasize the "minimalist" feel. Task items should have a minimum height of 56px to ensure a comfortable touch/click target and a sense of "airiness" within lists.

## Elevation & Depth

Depth is communicated through **Ambient Shadows** and **Tonal Layers** rather than borders. This creates a "soft" interface that feels tactile but clean.

- **Level 0 (Background)**: The main app surface uses the Tertiary color (#F8FAFC).
- **Level 1 (Cards/Lists)**: White surfaces with a very soft, diffused shadow (0px 4px 20px rgba(0, 0, 0, 0.04)).
- **Level 2 (Modals/Active Popovers)**: Higher elevation with a more pronounced shadow (0px 10px 30px rgba(0, 0, 0, 0.08)) to focus attention.
- **Interactions**: On hover, cards should subtly lift (shadow deepens) to provide immediate feedback.

## Shapes

The design system utilizes **Rounded** corners (8px base) to evoke a friendly and "tidy" aesthetic. This softness helps the interface feel less mechanical and more like a personal assistant.

- **Standard Elements**: Buttons, input fields, and checkboxes use the base 8px radius.
- **Containers**: Large cards or task groups use `rounded-lg` (16px).
- **Special Elements**: Search bars and "Add Task" buttons may use `rounded-xl` (24px) or pill shapes to distinguish them from the standard grid-like task items.

## Components

### Buttons
Primary buttons are large (minimum height 48px), using the Action Blue background with White text. They feature a subtle 8px corner radius. Secondary buttons should be Ghost-style (clear background with blue text) or use the Light Blue secondary color to maintain hierarchy.

### Input Fields
Inputs are styled with a White background and a very light 1px border (#E2E8F0). Focus states transition the border to Action Blue and add a soft blue outer glow (3px spread). Labels always sit above the field in `label-md` style.

### Task Lists
Tasks are presented as clean rows with no horizontal borders. Separation is achieved through vertical whitespace or very faint dividers (#F1F5F9). Each row features a custom-styled circular checkbox that fills with Light Blue when completed.

### Chips & Tags
Used for task categories (e.g., "Work", "Personal"). These use the `secondary_color_hex` for the background and `primary_color_hex` for text to create a high-legibility, low-vibrancy tag system.

### Cards
Cards are the primary container for grouping tasks. They are always White, with 16px rounded corners and an ambient shadow. Internal padding should be a minimum of 24px (md spacing) to maintain the minimalist breathability.