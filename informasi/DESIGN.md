# Design System Strategy: The Tactile Scholar

## 1. Overview & Creative North Star
The Creative North Star for this design system is **"The Tactile Scholar."** 

In designing a sign language dictionary, we are not merely building a database; we are creating a bridge between movement and meaning. This system rejects the sterile, "app-like" templates of modern SaaS in favor of a high-end editorial experience. It combines the authoritative weight of a physical encyclopedia with the fluid, kinetic energy of sign language.

To achieve this, we employ **Intentional Asymmetry** and **Tonal Depth**. By utilizing generous white space and overlapping elements (e.g., a video container bleeding slightly over a headline), we break the rigid digital grid. The result is a layout that feels curated, human, and deeply accessible—prioritizing visual clarity without sacrificing sophisticated aesthetics.

---

## 2. Color & Tonal Architecture
The palette is anchored in a deep, professional Indigo (`primary`) and punctuated by a vibrant, warm Amber (`secondary`). This creates a high-contrast environment essential for visual-heavy content like sign language demonstrations.

### The "No-Line" Rule
To maintain a premium, editorial feel, **1px solid borders are strictly prohibited for sectioning.** Boundaries must be defined solely through background color shifts. 
*   Use `surface-container-low` for large structural sections sitting on a `surface` background.
*   The transition between tones creates a cleaner, more modern separation than a "box" ever could.

### Surface Hierarchy & Nesting
Treat the UI as a series of physical layers. Use the surface-container tiers to define importance:
*   **Base:** `surface` (#faf8ff)
*   **Secondary Sections:** `surface-container-low` (#f2f3fd)
*   **Interactive Cards:** `surface-container-lowest` (#ffffff) to provide a soft, "lifted" feel.
*   **High-Priority Overlays:** `surface-container-high` (#e7e7f1)

### Signature Textures & Glassmorphism
To add "soul" to the interface:
*   **Gradients:** Use a subtle linear gradient from `primary` (#24389c) to `primary_container` (#3f51b5) for hero backgrounds and primary CTAs. This creates a sense of volume.
*   **Glassmorphism:** For floating navigation bars or video controls, use `surface_container_lowest` at 80% opacity with a `20px` backdrop blur. This ensures the vibrant background "bleeds" through, making the UI feel integrated rather than stuck on top.

---

## 3. Typography
We utilize a dual-typeface system to balance character with legibility.

*   **Display & Headlines (Plus Jakarta Sans):** These are our "Editorial" voices. Use `display-lg` and `headline-md` with slightly tighter letter-spacing to create an authoritative, modern look. The geometric nature of Plus Jakarta Sans provides a professional structure to the "warm" palette.
*   **Body & Labels (Public Sans):** Chosen for its exceptional legibility at small sizes. Public Sans is "friendly" but neutral, ensuring that the user’s focus remains on the sign language content. 

**Scale Strategy:** Always lead with a massive `display-sm` for page titles to establish a clear focal point, then drop immediately into a well-spaced `body-lg` for descriptions. This high-contrast scale prevents the "medium-size-everything" trap of generic designs.

---

## 4. Elevation & Depth
Depth in this system is achieved through **Tonal Layering** rather than traditional drop shadows.

*   **The Layering Principle:** Instead of a shadow, place a `surface-container-lowest` card on top of a `surface-container-low` background. The subtle shift in hex value creates a natural "lift."
*   **Ambient Shadows:** When a floating element (like a modal) requires a shadow, it must be an "Ambient Shadow." 
    *   **Blur:** 32px – 64px.
    *   **Opacity:** 4% – 8%.
    *   **Color:** Use a tinted shadow based on `on-surface` (#191b22) rather than pure black.
*   **The "Ghost Border" Fallback:** If a border is required for accessibility (e.g., in high-contrast modes), use the `outline-variant` token at **20% opacity**. Never use a 100% opaque border.

---

## 5. Components

### The Motion Frame (Video Containers)
The core of the dictionary. These must use the `xl` (1.5rem) roundedness. Avoid any borders; use `surface-container-highest` as a placeholder background to provide high contrast against the video content.

### Buttons
*   **Primary:** A gradient from `primary` to `primary_container`. Text should be `on_primary` (White). Use `full` (9999px) roundedness for a friendly, approachable feel.
*   **Secondary:** Use `secondary_container` (#feb300) with `on_secondary_container` (#6a4800). This provides the "Amber spark" and high-contrast visibility.
*   **States:** On hover, increase the elevation using an Ambient Shadow. On press, shift the background to the "dim" variant of the color.

### Chips (Category Tags)
Use `tertiary_container` for sign language categories (e.g., "Verbs," "Medical"). Use `md` (0.75rem) roundedness. Avoid borders; separate chips with 8px of whitespace.

### Input Fields
Search bars should feel like a premium "Glass" element. Use `surface_container_lowest` with a 10% `outline` ghost border. The cursor and focus state should utilize the `secondary` Amber to guide the eye.

### Cards & Lists
**Forbid the use of divider lines.** To separate list items, use the Spacing Scale (e.g., 16px vertical gap) or alternating tonal shifts between `surface` and `surface-container-low`.

---

## 6. Do’s and Don'ts

### Do:
*   **DO** use the `secondary` Amber sparingly as a "highlighter" for interactive feedback or critical search results.
*   **DO** embrace "White Space as a Grid." If an element feels crowded, increase the margin rather than adding a divider line.
*   **DO** use the `xl` (1.5rem) corner radius for large containers to emphasize the "warm" and "friendly" personality.

### Don’t:
*   **DON'T** use 1px solid borders. It shatters the high-end editorial feel and makes the UI look like a legacy form.
*   **DON'T** use pure black for text. Always use `on-surface` (#191b22) to maintain a soft, premium contrast.
*   **DON'T** crowd the Motion Frame. Sign language requires the viewer to see peripheral movement; give the video containers maximum breathing room.