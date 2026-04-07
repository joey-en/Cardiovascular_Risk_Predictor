# Design System Specification: The Reassuring Guardian

## 1. Overview & Creative North Star

### Creative North Star: "The Digital Sanctuary"
In healthcare, the "template" look—characterized by sterile white boxes and harsh blue lines—often exacerbates patient anxiety. This design system rejects clinical coldness in favor of a **Digital Sanctuary**. We prioritize a high-end editorial feel that combines the authority of a medical journal with the serenity of a luxury wellness retreat.

The system breaks the rigid "dashboard" mold through **Intentional Asymmetry** and **Tonal Depth**. By moving away from traditional grids and using expansive breathing room, we guide the patient’s eye through a narrative flow rather than a data dump. Every interaction must feel guided, reassuring, and premium.

---

## 2. Colors & Surface Logic

Our palette is rooted in a spectrum of "Calming Blues" and "Linen Neutrals." The goal is to feel expansive and airy.

### The "No-Line" Rule
**Borders are strictly prohibited for sectioning.** To define space, designers must use background color shifts. A `surface-container-low` section sitting on a `surface` background creates a sophisticated boundary that feels organic, not technical.

### Surface Hierarchy & Nesting
Treat the UI as a series of physical layers—stacked sheets of fine paper.
*   **Base Layer:** `surface` (#f6fafe) – The primary canvas.
*   **Sectional Layer:** `surface-container-low` (#eef4fa) – Used for large grouped content areas.
*   **Interactive Layer:** `surface-container-lowest` (#ffffff) – Reserved for the "active" cards or white-space modules that require the most attention.
*   **Emphasis Layer:** `surface-container-highest` (#d9e4ec) – Used sparingly for "grounding" navigation or footers.

### The "Glass & Gradient" Rule
To avoid a flat, "cheap" digital feel:
*   **Glassmorphism:** Use `surface` at 80% opacity with a `24px` backdrop-blur for floating headers or modals. This keeps the patient connected to the context of the page behind the element.
*   **Signature Textures:** Main CTAs and Hero sections should utilize a subtle linear gradient: `primary` (#00649a) to `primary-container` (#67bafd) at a 135-degree angle. This adds a "jewel-toned" depth that feels high-end and authoritative.

---

## 3. Typography: Editorial Authority

We use a dual-typeface system to balance technical precision with human warmth.

*   **Display & Headlines (Manrope):** This geometric sans-serif provides the "Modern" edge. Use `display-lg` (3.5rem) with tighter tracking (-0.02em) for hero headlines to create a bold, editorial impact.
*   **Body & Titles (Public Sans):** A highly legible, government-grade sans-serif that ensures accessibility. Public Sans feels "Trustworthy" and "Stable." 

**The Hierarchy Strategy:**
*   **The Power of Scale:** Don’t be afraid of the `display-md` (2.75rem). In a sanctuary-style layout, large typography acts as a decorative element, reducing the need for cluttered iconography.
*   **Line Height:** Maintain a generous `1.6` leading for all body text to ensure patients in stressful situations can parse information without fatigue.

---

## 4. Elevation & Depth: Tonal Layering

Traditional drop shadows are often too "heavy" for a calm healthcare environment. We use **Tonal Layering** to communicate height.

*   **The Layering Principle:** Place a `surface-container-lowest` (#ffffff) card on a `surface-container-low` (#eef4fa) background. The 2% shift in brightness is enough for the human eye to perceive a "lift" without the visual noise of a shadow.
*   **Ambient Shadows:** If a floating element (like a FAB or Popover) is required, use a 3-layer shadow:
    *   `0px 4px 20px rgba(42, 52, 58, 0.04)`
    *   `0px 8px 40px rgba(42, 52, 58, 0.08)`
    *   This "On-Surface" tint mimics natural ambient light.
*   **The "Ghost Border" Fallback:** If a container must sit on a background of the same color, use a 1px border using `outline-variant` (#a9b3bb) at **15% opacity**. It should be felt, not seen.

---

## 5. Components

### Buttons: The Signature Touch
*   **Primary:** Gradient fill (`primary` to `primary-container`), `md` (0.75rem) roundedness. 
*   **Secondary:** `surface-container-highest` fill with `on-surface` text. No border.
*   **States:** On hover, the primary button should shift slightly in gradient angle rather than just darkening.

### Cards & Lists: The "No-Divider" Mandate
*   **Forbid divider lines.** Separate list items using `12px` of vertical white space and a subtle background change (`surface-container-low`) on hover.
*   **Patient Progress Cards:** Use `xl` (1.5rem) roundedness to make medical data feel approachable and soft.

### Input Fields: Guided Entry
*   **Style:** Minimalist. No bottom border or full box. Use a `surface-container-low` background with a `sm` (0.25rem) corner radius. 
*   **Focus State:** Transition the background to `surface-container-lowest` and add a `2px` `primary` "Ghost Border" at 20% opacity.

### Reassuring Progress Indicators
*   Avoid the "spinning loader." Use a "Soft Pulse" animation on the brand's `primary-container` color to indicate background activity, creating a heartbeat-like rhythm.

---

## 6. Do’s and Don’ts

### Do:
*   **Use Asymmetric Padding:** Allow text to breathe. Use a 2:1 ratio for top-bottom padding to create a "pushed down" editorial look.
*   **Embrace Negative Space:** If a screen feels empty, resist the urge to add a box. Let the typography stand alone.
*   **Use Roundedness Scalably:** Use `xl` (1.5rem) for large containers and `sm` (0.25rem) for small inputs to create a sophisticated "nested" look.

### Don't:
*   **Don't use Pure Black:** Always use `on-surface` (#2a343a) for text to maintain a soft, high-end feel.
*   **Don't use 100% Opaque Borders:** This shatters the "Digital Sanctuary" feel and creates technical clutter.
*   **Don't use Center-Alignment for Long Form:** Keep patient data left-aligned to `headline-sm` anchors to ensure rapid, trustworthy scanning.