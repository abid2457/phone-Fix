# FixFlow Frontend Application Plan

## Goal
Build a polished, frontend-only mobile repair service management application that opens on the dashboard, uses realistic Indian repair-shop data, and feels complete across desktop, tablet, mobile, dark mode, and print.

## Product foundation
- Establish FixFlow’s design system in the global theme: cool off-white surfaces, deep navy typography, restrained blue accents, precise status colors, subtle shadows, 10–16px radii, Manrope typography, and a purpose-built dark palette.
- Create the shared application shell with collapsible desktop sidebar, sticky contextual header, store/profile controls, command search, mobile drawer, bottom navigation, and persistent New Job access.
- Build reusable interface primitives for statuses, metrics, tables/cards, timelines, steppers, empty/loading/error states, dialogs, drawers, toasts, filters, pagination, photo views, and print documents.

## Frontend data and state
- Define strict TypeScript models for jobs, customers, devices, technicians, inventory, invoices, notifications, stores, messages, parts, labour, payments, and inspection records.
- Add a replaceable mock service layer with realistic Indian data at the requested volume and consistent `JOB-2026-000001` numbering.
- Use a shared frontend store for mutations and simulated actions: create/edit/delete, status updates, assignment, messages, payments, read states, theme, and sidebar preferences.
- Centralize currency, date, totals, GST, balance, status, and next-action calculations.

## Routes and screens
- Dashboard at `/` and `/dashboard`: six metrics, actionable pipeline, repair activity chart, attention queue, recent jobs, and quick actions.
- Jobs: responsive searchable/filterable/sortable/paginated list, multi-step New Job form, Quick Job mode, validation, photo previews, review/success state, and rich job details.
- Job details: smart summary header, next action, progress timeline, communication prompt, and tabs for overview, diagnosis, parts, labour, estimate, payments, photos, messages, and activity.
- Customer pages: customer directory and profile with repair, device, payment, and communication history.
- Technician pages: performance directory plus technician workspace with action-oriented job cards.
- Operations: inventory, billing, reports, notification center, message templates, stores, and organized settings.
- Printable routes/views for job card, estimate, invoice, payment receipt, and collection receipt with A4 print rules.
- Every content route receives unique product-specific metadata.

## Interactions
- Command search supports Job ID, customer, phone, IMEI, device, and invoice with keyboard navigation and Ctrl/⌘ K.
- Forms provide inline validation, quick chips, compact inspection controls, dynamic totals, and clear success feedback.
- Dialog workflows cover payment, technician assignment, status changes, messages, parts, delete confirmation, collection readiness, and delivery verification.
- Simulated WhatsApp/email/SMS actions, notification read states, photo lightbox, filters, sorting, pagination, and theme switching all update frontend state.

## Responsive and quality pass
- Desktop uses the full service-management workspace; tablet collapses navigation and adapts grids; mobile uses cards, drawer/bottom navigation, touch-sized controls, and compact fixed actions rather than compressed tables.
- Add route-level and section-level skeletons, useful empty states, retryable error states, restrained transitions, visible focus treatment, semantic labels, and reduced-motion support.
- Verify representative flows and every route at desktop and mobile sizes, validate chart rendering, print output, dark mode, keyboard search, calculations, forms, overlays, navigation, and console cleanliness.

## Technical notes
- TanStack Router file routes remain authoritative; dynamic detail paths use `$id` route files.
- Recharts powers analytics; existing Radix/shadcn primitives and Lucide icons power controls.
- Data stays entirely local and mock-driven with no backend, database, authentication, messaging API, email API, or payment gateway.
- UI modules consume service interfaces so a future Node.js, Express, PostgreSQL, and Prisma layer can replace mocks without restructuring screens.
