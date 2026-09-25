# FixFlow Liquid Crystal UI Redesign

## Goal
Transform the existing FixFlow interface into a cohesive, premium, highly curved “liquid crystal” product while preserving every route, page, workflow, field, calculation, mock record, and interaction exactly as-is.

## Visual direction
- Replace the rigid dashboard feel with a calm cool-gray canvas, subtle blue/lavender atmosphere, translucent white surfaces, and layered low-opacity shadows.
- Use the requested curved hierarchy: 24–32px for major surfaces, 20–24px for cards, 14–18px for controls, and pills for statuses and compact selections.
- Establish a restrained blue-to-purple accent gradient for primary actions, active navigation, progress, and selected states only.
- Refine light and dark themes independently so both retain depth, contrast, and comfortable long-session readability.

## Implementation
1. **Shared visual system**
   - Update semantic color, radius, shadow, glass, focus, and motion tokens in the global stylesheet.
   - Restyle shared buttons, tabs, menus, dialogs, toasts, inputs, pills, skeletons, empty/error/success states, and focus treatments.
2. **Application frame**
   - Turn the desktop sidebar and header into floating curved surfaces with softer active navigation, search, store, profile, and notification controls.
   - Restyle the mobile drawer and bottom navigation as lifted glass surfaces while retaining their current destinations and central New Job action.
3. **All product screens**
   - Apply the same hierarchy to Dashboard, Jobs, New Job, Job Details, Customers, Customer Details, Technicians, Technician Workspace, Inventory, Billing, Reports, Notifications, Messages, Stores, and Settings.
   - Preserve all text, tables, cards, tabs, dialogs, filters, charts, and current actions; only presentation changes.
4. **Responsive composition**
   - Refine desktop, tablet, and mobile spacing and card composition for 360px through wide desktop without horizontal clipping.
   - Keep mobile tables represented by the app’s existing cards and make forms, actions, tabs, and progress controls touch-friendly.
5. **Validation**
   - Check every route in light and dark appearance, verify representative interactions and dialogs, inspect key mobile widths, and confirm print output remains clean and non-glass.

## Technical boundaries
- CSS/token and presentational component styling only.
- No changes to routing, state architecture, mock data, calculations, forms, business rules, page responsibilities, or workflow behavior.
- Existing component markup will only be adjusted if a small presentational hook is required; no component rewrites.
