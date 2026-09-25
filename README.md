# FixFlow Pro

Build a premium, production-quality, highly polished frontend-only web application for a Mobile Phone Repair Shop Service Management System.

IMPORTANT:
THIS REQUEST IS FOR FRONTEND UI/UX ONLY.

Do NOT build a real backend.
Do NOT connect to a real database.
Do NOT implement real authentication.
Do NOT implement real WhatsApp API.
Do NOT implement real email API.
Do NOT implement real payment gateways.

Use realistic mock data and frontend state/local state wherever necessary so the complete application feels functional and interactive.

The frontend must be architected cleanly so that a real Node.js + Express + PostgreSQL + Prisma backend can be connected later without redesigning the UI.

The application should feel like a premium modern SaaS product used by a professional mobile repair/service business.

The UI must NOT look like a basic admin template.

It should feel elegant, modern, premium, intelligent, clean, fast, highly usable, and visually impressive.

====================================================
1. PRODUCT NAME
====================================================

Use a professional placeholder brand:

"FixFlow"

Subtitle:

"Mobile Service Management"

The branding should be easy to replace later.

Logo concept:
Create a simple elegant abstract mobile/device + repair/service inspired logo using CSS/iconography.

Do NOT use a generic colorful cartoon logo.

The visual identity should communicate:

- Trust
- Technology
- Precision
- Professional service
- Reliability
- Premium customer experience

====================================================
2. CORE PRODUCT PURPOSE
====================================================

This application manages the complete lifecycle of mobile phone repair jobs.

The complete workflow is:

Customer
↓
Mobile Received
↓
Create Job Card
↓
Generate Job ID
↓
Device Inspection
↓
Diagnosis
↓
Estimate
↓
Customer Approval
↓
Waiting for Parts
↓
Repair in Progress
↓
Quality Check
↓
Repair Completed
↓
Ready for Collection
↓
Customer Notification
↓
Payment
↓
OTP / Verification
↓
Device Delivered
↓
Job Completed

The UI must make this workflow extremely easy to understand.

The user should always know:

- What needs attention
- Which jobs are pending
- Which jobs are being repaired
- Which jobs are ready
- Which customers need to be contacted
- Which payments are pending
- Which devices are waiting for parts
- Which technicians are handling which jobs

====================================================
3. DESIGN PHILOSOPHY
====================================================

Create an extremely elegant enterprise-grade interface.

Visual direction:

- Premium SaaS
- Minimal
- Modern
- Professional
- Clean
- Spacious
- Refined
- Subtle glass effects
- Soft shadows
- Rounded cards
- Excellent typography
- Strong visual hierarchy
- Smooth micro-interactions
- Beautiful empty states
- Beautiful loading states
- Excellent responsive behavior

Avoid:

- Cheap-looking gradients
- Excessive colors
- Excessive rounded cards
- Huge text
- Cartoonish illustrations
- Overly colorful dashboards
- Cluttered tables
- Old-fashioned Bootstrap-style layouts
- Excessive animations
- Giant buttons
- Random decorative elements
- Excessive glassmorphism
- Neon colors

The design should look expensive and trustworthy.

====================================================
4. COLOR SYSTEM
====================================================

Primary visual direction:

White / Off-white / Cool Gray / Deep Navy / Blue accent.

Suggested palette:

Background:
#F6F8FB

Primary:
#2563EB

Dark:
#0F172A

Text:
#111827

Secondary text:
#64748B

Border:
#E2E8F0

Success:
#16A34A

Warning:
#F59E0B

Danger:
#DC2626

Info:
#0EA5E9

Use colors carefully.

Do not make the whole application blue.

Blue should primarily be used for:

- Primary actions
- Active navigation
- Links
- Important highlights
- Progress indicators

Use green for successful/completed states.

Use amber for waiting states.

Use red only for errors, failed payments, critical issues.

====================================================
5. TYPOGRAPHY
====================================================

Use a modern professional font such as:

Inter

or

Manrope

Use a strong typographic hierarchy.

Dashboard numbers should be bold but not oversized.

Headings should be elegant and readable.

Body text should be highly legible.

Use proper font weights:

400
500
600
700

Do not use too many font sizes.

====================================================
6. GLOBAL LAYOUT
====================================================

Create a responsive application shell.

Desktop:

Left sidebar
+
Top header
+
Main content

Example:

┌─────────────────────────────────────────────────────────────┐
│ Sidebar │ Header / Search / Notifications / Profile       │
│         ├───────────────────────────────────────────────────┤
│         │                                                   │
│         │               MAIN CONTENT                        │
│         │                                                   │
│         │                                                   │
└─────────────────────────────────────────────────────────────┘

Sidebar width approximately:

250px–270px.

The sidebar should be elegant and compact.

Use Lucide icons.

====================================================
7. SIDEBAR
====================================================

Sidebar structure:

LOGO

FixFlow
Mobile Service Management

NAVIGATION

Overview

Jobs
Customers
Technicians
Inventory
Billing
Reports

COMMUNICATION

Notifications
Message Templates

MANAGEMENT

Stores
Settings

At bottom:

Help & Support

User profile mini-card.

Example:

Admin
Store Manager
● Online

The active menu item should have:

- Soft blue background
- Blue icon
- Dark text
- Small left/right visual indicator

Sidebar should support collapse.

Collapsed mode:

icons only.

Expanded mode:

icons + labels.

On mobile:

sidebar becomes a beautiful slide-over drawer.

====================================================
8. TOP HEADER
====================================================

Top header should contain:

Left:

Page title
Small contextual breadcrumb

Center/right:

Global search

Search placeholder:

"Search jobs, customers, IMEI..."

Right:

Notification icon

Help icon

Store selector

User profile

Example:

ABC Mobile Store ▼

User:

Admin
Store Manager

Add a subtle avatar.

Header should remain sticky on desktop.

====================================================
9. GLOBAL SEARCH
====================================================

Create a premium command-style search.

When clicked:

Open a large search overlay/modal.

Search:

Job ID
Customer name
Mobile number
IMEI
Device model
Invoice number

Example:

Search:
"9876543210"

Results:

Customer
Mohd Fayaz

iPhone 15 Pro

Job:
JOB-2026-001245

Status:
Ready for Collection

Use keyboard-friendly interactions.

Show:

⌘ K

or

Ctrl K

shortcut visually.

====================================================
10. DASHBOARD / OVERVIEW
====================================================

Create a beautiful professional dashboard.

Header:

Good morning, Admin

"Here's what's happening with your service center today."

Right side:

Date selector

[Today ▼]

[+ New Job]

----------------------------------------------------

STATISTICS

Create 5 or 6 premium statistic cards.

1.

Today's Jobs
12

+18.2%
vs yesterday

2.

In Repair
8

3.

Ready for Collection
5

4.

Waiting for Parts
3

5.

Pending Payments
₹18,450

6.

Today's Revenue
₹35,500

Each card should include:

- Small icon
- Number
- Label
- Trend
- subtle visual indicator

Do not overdecorate.

----------------------------------------------------

JOB PIPELINE

Create a beautiful horizontal/vertical job pipeline.

Received
12

Diagnosis
4

Estimate
3

Waiting Parts
3

Repairing
8

Quality Check
2

Ready
5

Delivered
17

Each stage should be clickable.

----------------------------------------------------

REPAIR ACTIVITY CHART

Create a professional chart showing:

Jobs Received
Jobs Completed
Jobs Delivered

Use a clean line/area chart.

Allow:

7 Days
30 Days
90 Days

Use Recharts or another lightweight chart library if available.

Charts should look professional.

----------------------------------------------------

TODAY'S JOBS

Create a modern table/list:

Job ID
Customer
Device
Technician
Status
Amount
Updated

Example:

JOB-2026-001245
Mohd Fayaz
iPhone 15 Pro
Arif
Ready
₹5,310

JOB-2026-001246
Rahman
Samsung S24
Sameer
Repairing
₹3,200

Use status badges.

Rows should have subtle hover effects.

Clicking a row opens the Job Details page.

----------------------------------------------------

QUICK ACTIONS

Create:

+ New Job Card

Add Customer

Add Device

Create Estimate

Record Payment

These should be elegant action buttons.

====================================================
11. NEW JOB CARD
====================================================

This is one of the most important screens.

Create a beautiful multi-step form.

Do NOT create one huge ugly form.

Use a stepper:

01 Customer
02 Device
03 Inspection
04 Complaint
05 Estimate
06 Review

Top progress indicator.

----------------------------------------------------
STEP 1 — CUSTOMER
----------------------------------------------------

Title:

Customer Information

Fields:

Customer Name *
Mobile Number *
Alternate Number
Email
Address
City
State
Postal Code

Add option:

"Existing Customer"

Search existing customer.

If found:

Display customer history.

Example:

Customer History

Total Jobs: 4
Completed: 4
Last Visit: 12 Aug 2026

----------------------------------------------------
STEP 2 — DEVICE
----------------------------------------------------

Fields:

Brand
Model
IMEI
Serial Number
Colour
Storage
Device Password / Pattern

Accessories Received:

Checkboxes:

Charger
Cable
SIM
Memory Card
Box
Earphones
Other

Device ownership:

Customer Owned
Company Owned
Other

----------------------------------------------------
STEP 3 — DEVICE INSPECTION
----------------------------------------------------

Create a visually beautiful inspection checklist.

Sections:

DISPLAY

Screen
Touch
Brightness

CAMERA

Front Camera
Rear Camera

AUDIO

Speaker
Microphone
Earpiece

CONNECTIVITY

WiFi
Bluetooth
Mobile Network
GPS

POWER

Battery
Charging
Power Button
Volume Buttons

SECURITY

Face ID
Fingerprint

Each should have:

PASS
FAIL
NOT TESTED

Use compact segmented controls.

Also:

Physical Condition

Scratch
Crack
Dent
Water Damage
Back Glass Damage

Allow:

Upload Photos

Create a photo upload area:

Drag & Drop

or

Take / Upload Photo

Show thumbnails.

====================================================
12. CUSTOMER COMPLAINT
====================================================

Create a dedicated section.

Title:

What issue did the customer report?

Quick complaint chips:

Display
Battery
Charging
Camera
Speaker
Microphone
Network
Software
Water Damage
Motherboard
Other

Then large textarea:

"Describe the customer's complaint..."

Also include:

Customer expectation

Urgency:

Normal
Urgent
Express

====================================================
13. JOB CARD REVIEW
====================================================

Before creating:

Show a beautiful summary.

Customer:

Mohd Fayaz
9876543210

Device:

Apple iPhone 15 Pro
IMEI:
XXXXXXXXXXXXXXX

Complaint:

"Phone is not charging."

Condition:

Screen: Good
Body: Minor scratches
Charging: Failed

Accessories:

Charger
Cable

Button:

Create Job Card

After clicking:

Show elegant success animation.

Example:

✓

Job Card Created

JOB-2026-001245

Buttons:

View Job

Print Job Card

Share Job Card

Create Another

====================================================
14. JOBS PAGE
====================================================

Create a powerful job management page.

Header:

Service Jobs

"Manage and track every repair from intake to delivery."

Actions:

+ New Job

Filters

Export

----------------------------------------------------

SEARCH BAR

Search:

Job ID / Customer / Mobile / IMEI / Device

----------------------------------------------------

FILTERS

Status

All
Received
Diagnosis
Estimate
Waiting Approval
Waiting Parts
Repairing
Quality Check
Ready
Delivered
Cancelled

Technician

Date

Brand

Payment Status

----------------------------------------------------

TABLE

Columns:

Job ID
Customer
Device
Complaint
Technician
Status
Amount
Payment
Updated
Actions

Actions menu:

View
Edit
Assign Technician
Update Status
Create Estimate
Record Payment
Send Message
Print
Delete

Make table highly polished.

On mobile, transform rows into cards rather than forcing horizontal scrolling wherever possible.

====================================================
15. JOB DETAILS PAGE
====================================================

This should be one of the most impressive pages.

Header:

JOB-2026-001245

Status:
READY FOR COLLECTION

Actions:

Edit
Print
Send Message
More

----------------------------------------------------

CUSTOMER + DEVICE HEADER CARD

Customer:

Mohd Fayaz

9876543210

customer@gmail.com

Device:

iPhone 15 Pro

IMEI:
XXXXXXXXXXXX

Use a clean two-column layout.

----------------------------------------------------

JOB PROGRESS

Create a beautiful visual timeline:

● Received
│
● Diagnosis
│
● Estimate Approved
│
● Repairing
│
● Quality Check
│
● Ready for Collection
│
○ Delivered

Each step:

date
time
staff member

Example:

Ready for Collection
24 Sep 2026
05:30 PM
Updated by Admin

----------------------------------------------------

DETAIL TABS

Overview
Diagnosis
Parts
Labour
Estimate
Payments
Photos
Messages
Activity

====================================================
16. OVERVIEW TAB
====================================================

Show:

Customer Complaint

Technician Diagnosis

Device Condition

Accessories

Technician Notes

Warranty

Expected Delivery

----------------------------------------------------
17. DIAGNOSIS TAB
----------------------------------------------------

Display:

Reported Problem

Technician Diagnosis

Fault Found

Recommended Solution

Technician Notes

Diagnosis Date

Technician

Button:

Update Diagnosis

====================================================
18. PARTS TAB
====================================================

Beautiful parts table.

Part Name
Part Number
Qty
Unit Price
Total

Example:

Original Display
DISP-001
1
₹4,500
₹4,500

Battery
BAT-009
1
₹1,800
₹1,800

Show:

Parts Total

====================================================
19. LABOUR TAB
====================================================

Service:

Display Replacement

₹800

Motherboard Repair

₹1,500

Labour Total:

₹2,300

====================================================
20. ESTIMATE TAB
====================================================

Create a professional estimate UI.

Parts:
₹6,300

Labour:
₹2,300

Discount:
₹300

Subtotal:
₹8,300

GST:
₹1,494

TOTAL:
₹9,794

Status:

Pending Approval
Approved
Rejected

Buttons:

Send Estimate

Print Estimate

Mark Approved

====================================================
21. PAYMENT TAB
====================================================

Create elegant payment section.

Total:
₹9,794

Paid:
₹5,000

Balance:
₹4,794

Payment history.

Methods:

Cash
UPI
Card
Bank Transfer

Add Payment.

Payment status:

Paid
Partial
Pending
Failed

====================================================
22. PHOTOS TAB
====================================================

Create professional photo gallery.

Categories:

Before Repair
During Repair
After Repair
Device Condition

Use image cards with:

date
uploaded by

Clicking image opens beautiful lightbox.

====================================================
23. MESSAGES TAB
====================================================

This should simulate communication.

Channels:

WhatsApp
Email
SMS

Message timeline.

Example:

WhatsApp
✓ Sent

"Your device has been received."

Email
✓ Sent

"Your repair estimate is ready."

WhatsApp
✓ Sent

"Your device is ready for collection."

Provide:

Send Message

Message Template dropdown.

====================================================
24. ACTIVITY TIMELINE
====================================================

Create an elegant activity timeline.

Example:

Today

05:30 PM
Admin marked job as Ready for Collection

04:55 PM
Technician completed quality check

04:20 PM
Technician completed repair

02:10 PM
Part added

11:20 AM
Estimate approved

Yesterday

06:30 PM
Job received

This should look beautiful.

====================================================
25. READY FOR COLLECTION
====================================================

Create a dedicated beautiful status screen/modal.

Large success indicator.

"Repair Completed"

"Your device is ready for collection."

Show:

Customer
Device
Job ID
Amount
Balance
Store

Communication section:

WhatsApp ✓
Email ✓
SMS —

Buttons:

Send WhatsApp

Send Email

Print Collection Slip

Mark as Collected

Do not implement real API.

Simulate sending with UI state.

====================================================
26. CUSTOMER MANAGEMENT
====================================================

Customers page.

Header:

Customers

+ Add Customer

Search.

Table:

Name
Mobile
Email
Total Jobs
Active Jobs
Last Visit
Total Spent

Customer details page:

Profile

Contact details

Repair history

Payments

Communication history

Device history

====================================================
27. TECHNICIANS PAGE
====================================================

Create professional technician management.

Cards:

Technician avatar

Name

Specialization

Active Jobs

Completed Jobs

Completion Rate

Rating

Status:

Available
Busy
Offline

Example:

Arif Khan

iPhone / Apple Specialist

Active Jobs: 4

Completed: 182

Success Rate: 96%

Use elegant progress indicators.

====================================================
28. TECHNICIAN WORKSPACE
====================================================

Create a dedicated technician-friendly page.

Technician sees:

My Jobs

Today

Pending Diagnosis

Repairing

Quality Check

Completed

Each job card should show:

Job ID
Device
Problem
Priority
Due Time

Buttons:

Open Job

Start Repair

Update Diagnosis

Complete Repair

Move to QC

====================================================
29. INVENTORY PAGE
====================================================

Create a professional inventory management UI.

Statistics:

Total Parts

Low Stock

Out of Stock

Inventory Value

Table:

Part Name
SKU
Category
Stock
Minimum Stock
Cost
Selling Price
Supplier
Status

Status:

In Stock
Low Stock
Out of Stock

Add Part button.

====================================================
30. BILLING PAGE
====================================================

Create professional billing dashboard.

Statistics:

Today's Revenue

Pending Payments

Paid Invoices

Refunds

Invoice list.

Columns:

Invoice
Job ID
Customer
Amount
Payment
Date
Status

Actions:

View
Print
Download

====================================================
31. REPORTS PAGE
====================================================

Create premium analytics.

Report categories:

Daily Service Report

Monthly Revenue

Technician Performance

Repair Status

Parts Usage

Customer Growth

Payment Collection

Warranty Jobs

Cancelled Jobs

Create date range selector.

Charts:

Revenue

Jobs

Completion rate

Average repair value

Technician productivity

====================================================
32. NOTIFICATIONS CENTER
====================================================

Create a polished notification center.

Categories:

All

Jobs

Payments

Repairs

System

Example:

Repair completed

JOB-2026-001245 is ready for collection.

5 minutes ago

Payment received

₹5,310 received from Mohd Fayaz.

20 minutes ago

Use read/unread states.

====================================================
33. MESSAGE TEMPLATES
====================================================

Create template management.

Templates:

Device Received

Estimate Ready

Repair Started

Repair Completed

Ready for Collection

Payment Reminder

Thank You

Each template should show:

Channel

WhatsApp
Email
SMS

Preview button.

Edit template.

Use variables:

{{customer_name}}

{{job_id}}

{{device_model}}

{{store_name}}

{{total_amount}}

{{store_address}}

====================================================
34. STORES
====================================================

Support future multi-store capability.

Store cards:

ABC Mobile Store

Vellore

12 Active Jobs

5 Ready

₹35,500 Today

Allow:

Add Store

Edit Store

Set Active Store

====================================================
35. SETTINGS
====================================================

Create settings sections:

Business Profile

Store Details

Notifications

WhatsApp

Email

SMS

Invoice Settings

Job Card Settings

Users & Roles

Security

Appearance

Each should be clean and organized.

====================================================
36. JOB CARD / INVOICE PREVIEW
====================================================

Create a professional digital version of the uploaded paper job card.

The uploaded image is a reference for the concept of a traditional repair job card.

DO NOT copy the automotive-specific fields from it.

Use it only as inspiration for:

- Customer information
- Device information
- Complaint
- Diagnosis
- Labour
- Parts
- Charges
- Signature
- Terms

For mobile repair, replace vehicle fields with:

Device Brand
Device Model
IMEI
Serial Number
Accessories
Device Condition
Customer Complaint
Diagnosis
Parts
Labour
Payment
Warranty

Create a beautiful printable job card.

It should look professional when printed on A4.

Include:

FixFlow logo

Store name

Store address

Store phone

Job ID

Customer information

Device information

Complaint

Inspection

Diagnosis

Parts

Labour

Total

Payment

Warranty

Customer signature

Technician signature

Terms and conditions

====================================================
37. MOBILE RESPONSIVENESS
====================================================

THIS IS EXTREMELY IMPORTANT.

The application must be genuinely responsive.

Desktop:

Full sidebar
Multi-column layouts
Large tables

Tablet:

Collapsible sidebar
Responsive cards
Adaptive grids

Mobile:

Bottom navigation or compact navigation drawer.

Do NOT simply shrink the desktop UI.

Mobile dashboard:

Statistics should become horizontally scrollable cards or a 2-column grid.

Tables should transform into cards.

Forms should become single-column.

Buttons should be thumb-friendly.

Bottom fixed action button where appropriate:

+ New Job

====================================================
38. MOBILE NAVIGATION
====================================================

For mobile:

Bottom navigation:

Home
Jobs
Customers
Notifications
More

Floating action:

+

New Job

Do not overcrowd the bottom navigation.

====================================================
39. MICRO INTERACTIONS
====================================================

Use subtle animations.

Examples:

Button hover

Card hover

Sidebar transitions

Modal opening

Page transitions

Status changes

Toast notifications

Success animations

Skeleton loading

Dropdown transitions

Use Framer Motion where appropriate.

Animations must be subtle.

Do not make the application feel like a gaming website.

====================================================
40. TOAST SYSTEM
====================================================

Create beautiful toast notifications.

Examples:

✓ Job Card Created

Job ID MOB-2026-001245 created successfully.

✓ Message Sent

WhatsApp notification simulated successfully.

✓ Payment Recorded

₹5,310 payment recorded.

⚠ Low Stock

Original iPhone 15 display has only 2 units remaining.

====================================================
41. MODALS
====================================================

All modals should be premium.

Examples:

Confirm Delete

Confirm Status Change

Send Message

Add Payment

Add Part

Assign Technician

Mark Ready

Mark Delivered

Use:

Title
Description
Actions

Danger actions should be clearly differentiated.

====================================================
42. EMPTY STATES
====================================================

Never show ugly blank pages.

Examples:

No Jobs Found

"No repair jobs match your current filters."

Button:

Clear Filters

No Notifications

"You're all caught up."

No Photos

"No repair photos uploaded yet."

====================================================
43. LOADING STATES
====================================================

Create skeleton loaders.

Use:

Card skeleton

Table skeleton

Profile skeleton

Job details skeleton

Do not use a generic spinner everywhere.

====================================================
44. ERROR STATES
====================================================

Create professional error states.

Example:

Something went wrong.

"We couldn't load this information."

[Try Again]

====================================================
45. DARK MODE
====================================================

Include a polished dark mode.

Dark mode should not simply invert colors.

Use:

Deep navy / charcoal background

Dark cards

Readable text

Correct borders

Proper contrast

The UI must remain premium in dark mode.

Provide theme switcher:

Light
Dark
System

====================================================
46. ACCESSIBILITY
====================================================

Follow accessibility best practices.

Use:

Semantic HTML

Keyboard navigation

Visible focus states

Accessible labels

Good color contrast

ARIA labels where necessary

Do not rely only on color to communicate status.

For example:

Ready
✓ Ready

Failed
! Failed

====================================================
47. MOCK DATA
====================================================

Create realistic mock data.

At least:

20 customers

30 job cards

10 technicians

30 parts

20 invoices

20 notifications

Multiple statuses

Multiple brands:

Apple
Samsung
OnePlus
Xiaomi
Vivo
Oppo
Realme
Google
Nothing

Use realistic Indian customer data.

Use Indian phone number format.

Use ₹ currency.

Use dates in:

DD MMM YYYY

Example:

24 Sep 2026

====================================================
48. IMPORTANT JOB STATUSES
====================================================

Use consistent status colors and labels.

RECEIVED
blue

DIAGNOSIS
purple

ESTIMATE
indigo

WAITING APPROVAL
amber

WAITING PARTS
orange

REPAIRING
blue

QUALITY CHECK
cyan

READY FOR COLLECTION
green

DELIVERED
dark green

CANCELLED
red

Do not randomly change colors.

====================================================
49. DESIGN SYSTEM
====================================================

Create reusable components:

Button

Input

Select

Textarea

Checkbox

Radio

Tabs

Badge

Card

Modal

Drawer

Dropdown

Tooltip

Toast

Avatar

Table

Pagination

Date Picker

Search

Empty State

Skeleton

Timeline

Stepper

Stat Card

Status Badge

Photo Gallery

File Upload

Confirm Dialog

All components should have consistent spacing, radius, typography and interaction states.

====================================================
50. ICON SYSTEM
====================================================

Use Lucide React icons.

Examples:

LayoutDashboard
ClipboardList
Users
Wrench
Package
Receipt
BarChart3
Bell
Settings
Search
Plus
Smartphone
Mail
MessageCircle
Phone
Calendar
Clock
CheckCircle
AlertCircle
XCircle
Camera
Upload
Printer
Download
MoreHorizontal

Do NOT use emoji as primary UI icons.

Icons should be clean and consistent.

====================================================
51. INTERACTIVE BEHAVIOR
====================================================

Even though this is frontend-only, the application must feel real.

Implement frontend interactions:

- Create mock job
- Edit job
- Change status
- Assign technician
- Add parts
- Add labour
- Calculate totals
- Record mock payment
- Filter jobs
- Search jobs
- Sort tables
- Pagination
- Open details
- Send simulated message
- Mark notification as read
- Add customer
- Add technician
- Add inventory
- Toggle dark mode
- Toggle sidebar
- Open modals
- Upload image preview
- Delete mock records
- Show success/error toasts

Use local state or mock service layer.

====================================================
52. CALCULATION LOGIC
====================================================

The frontend should calculate:

Parts total

Labour total

Discount

Subtotal

GST

Grand total

Paid amount

Balance amount

Example:

Parts:
₹4,500

Labour:
₹800

Discount:
₹300

Subtotal:
₹5,000

GST 18%:
₹900

Total:
₹5,900

Paid:
₹3,000

Balance:
₹2,900

The UI should update calculations dynamically when values change.

====================================================
53. COMPONENT ARCHITECTURE
====================================================

Keep code modular.

Suggested structure:

src/

components/

layout/
Sidebar
Header
MobileNav

dashboard/
StatCard
JobPipeline
RevenueChart
RecentJobs

jobs/
JobTable
JobCard
JobStatusBadge
JobTimeline
JobStepper
JobDetails
JobForm
DeviceInspection
PartsTable
LabourTable
EstimateCard
PaymentCard
MessagePanel
PhotoGallery

customers/

technicians/

inventory/

billing/

reports/

notifications/

settings/

shared/

Modal
Toast
Button
Input
Select
Badge
Table
EmptyState
Skeleton

pages/

Dashboard
Jobs
NewJob
JobDetails
Customers
CustomerDetails
Technicians
TechnicianWorkspace
Inventory
Billing
Reports
Notifications
Settings

lib/

mockData
utils
formatters

====================================================
54. FRONTEND ROUTING
====================================================

Create routes:

/

 /dashboard

 /jobs

 /jobs/new

 /jobs/:id

 /customers

 /customers/:id

 /technicians

 /technicians/:id

 /inventory

 /billing

 /reports

 /notifications

 /messages

 /stores

 /settings

The application should use proper client-side routing.

====================================================
55. FUTURE BACKEND READINESS
====================================================

Although this is frontend-only, separate mock data from UI components.

Do not hard-code data directly inside every component.

Create a mock service/data layer.

For example conceptually:

jobService
customerService
technicianService
inventoryService
billingService
notificationService

Later these can be replaced with API calls.

Use clean TypeScript types/interfaces if the project is created in TypeScript.

Prefer TypeScript.

====================================================
56. FORM VALIDATION
====================================================

Implement frontend validation.

Required:

Customer Name

Mobile Number

Device Brand

Device Model

Customer Complaint

Show clean inline validation.

Examples:

"Customer name is required."

"Enter a valid mobile number."

"Device model is required."

Do not use ugly browser alerts.

====================================================
57. JOB NUMBER FORMAT
====================================================

Use:

JOB-2026-000001

JOB-2026-000002

JOB-2026-000003

Generate mock IDs consistently.

====================================================
58. CUSTOMER EXPERIENCE
====================================================

The interface should make staff feel:

"I know exactly what to do next."

Every job should clearly communicate:

CURRENT STATUS

NEXT ACTION

Example:

READY FOR COLLECTION

Next action:
"Customer needs to collect device."

Another:

WAITING FOR APPROVAL

Next action:
"Send estimate to customer."

Another:

WAITING FOR PARTS

Next action:
"Add/receive required part."

This "Next Action" concept should be used throughout the application.

====================================================
59. SMART JOB DETAILS HEADER
====================================================

At the top of every Job Details page:

JOB-2026-001245

READY FOR COLLECTION

iPhone 15 Pro

Mohd Fayaz

9876543210

₹5,310

Balance ₹0

[Send Message]

[Print]

[More]

Also show:

"Next Action: Customer Collection"

in a highlighted but elegant card.

====================================================
60. PREMIUM VISUAL DETAILS
====================================================

Use:

8px / 12px / 16px / 24px / 32px spacing system.

Border radius:

10px–16px for cards.

Use very subtle shadows.

Cards should have:

border: 1px solid subtle gray

Avoid heavy shadows.

Tables should have:

clean separators

hover state

sticky header where useful

Compact but readable row height.

====================================================
61. NO CLUTTER
====================================================

One of the most important requirements:

DO NOT put everything on one screen.

Use:

Tabs

Drawers

Modals

Expandable sections

Step forms

Detail pages

Progressive disclosure

The application should feel calm and organized.

====================================================
62. PROFESSIONAL EMPTY/ERROR/LOADING STATES
====================================================

Every major page must have:

Loading state

Empty state

Error state

Success state

Do not leave unfinished areas.

====================================================
63. PRINT EXPERIENCE
====================================================

Create print-friendly layouts for:

Job Card

Estimate

Invoice

Payment Receipt

Collection Receipt

When printing:

Hide sidebar

Hide header

Hide navigation

Show only document

Use A4-friendly styling.

====================================================
64. FINAL UI QUALITY STANDARD
====================================================

The finished UI must feel comparable to a high-quality modern SaaS product.

Think:

Stripe-level clarity

Linear-level polish

Vercel-level minimalism

Notion-level usability

But DO NOT copy their branding or exact UI.

Create an original design inspired by modern premium SaaS products.

====================================================
65. IMPORTANT VISUAL REFERENCE
====================================================

The uploaded image is the reference job-card document.

Analyze its structure conceptually.

It contains traditional fields such as:

Customer information
Contact information
Vehicle/device information
Complaint
Estimate
Labour
Parts
Charges
Signature
Terms

For this project, transform that traditional paper workflow into a modern mobile-service digital experience.

Do not reproduce the automotive vehicle-specific fields.

Do not use:

VIN
Miles In
Miles Out
Vehicle Year
Vehicle Tag

Instead use mobile-specific fields:

IMEI
Serial Number
Brand
Model
Storage
Colour
Accessories
Device Condition
Customer Complaint
Diagnosis
Parts
Labour
Warranty

====================================================
66. USER EXPERIENCE PRIORITY
====================================================

Prioritize these in this exact order:

1. Ease of use

2. Clarity

3. Speed

4. Professional appearance

5. Data visibility

6. Responsive design

7. Accessibility

8. Visual polish

Never sacrifice usability just to make something visually fancy.

====================================================
67. MOBILE-FIRST SERVICE COUNTER EXPERIENCE
====================================================

Remember that the staff may use this application while standing at a service counter.

Therefore:

Forms must be fast.

Use autocomplete.

Use dropdowns.

Use segmented controls.

Use large touch targets.

Minimize typing.

Provide quick complaint buttons.

Provide quick device brands.

Provide quick status actions.

Make "New Job" accessible from almost anywhere.

====================================================
68. QUICK JOB CREATION
====================================================

Create a "Quick Job" mode.

Staff enters:

Customer Name

Mobile Number

Brand

Model

Complaint

Then:

[CREATE JOB]

The application generates:

JOB-2026-001245

The remaining information can be completed later.

This is important for busy service counters.

====================================================
69. CUSTOMER COMMUNICATION UX
====================================================

Whenever a job reaches important milestones, display a communication suggestion.

Example:

READY FOR COLLECTION

"Customer hasn't been notified."

[Send WhatsApp]

[Send Email]

After simulated sending:

"Customer notified 2 minutes ago."

This should be visually clear.

====================================================
70. WARRANTY
====================================================

Add warranty information.

Example:

Warranty:

30 Days

Warranty Until:

24 Oct 2026

Warranty Status:

Active

If a customer returns with the same device:

Show:

"WARRANTY JOB"

This should be clearly visible.

====================================================
71. CUSTOMER HISTORY
====================================================

On customer profile:

Total Jobs: 8

Completed: 7

Active: 1

Total Spent: ₹38,500

Last Service:

24 Sep 2026

Devices:

iPhone 15 Pro

Samsung S23

OnePlus 12

This helps service staff understand customer history immediately.

====================================================
72. DEVICE HISTORY
====================================================

Each device should have service history.

Example:

iPhone 15 Pro

IMEI:
XXXXXXXXXXXX

Service History:

24 Sep 2026
Charging Port Replacement

12 Mar 2026
Battery Replacement

05 Jan 2026
Software Service

Make it easy to understand.

====================================================
73. FINAL IMPLEMENTATION REQUIREMENT
====================================================

Do not generate a basic landing page.

This is an APPLICATION.

Build the actual application interface with:

- Multiple pages
- Navigation
- Routing
- Mock data
- Functional interactions
- Forms
- Tables
- Filters
- Search
- Modals
- Drawers
- Tabs
- Charts
- Timelines
- Status management
- Responsive mobile UI
- Dark mode
- Toast notifications
- Loading states
- Empty states
- Error states

The application should feel complete.

====================================================
74. STARTING PAGE
====================================================

Open the application on:

Dashboard

The first impression must be extremely polished.

At first glance the user should immediately understand:

Today's jobs

What is currently being repaired

What is ready

What requires attention

Today's revenue

Recent jobs

====================================================
75. FINAL QUALITY CHECK
====================================================

Before considering the implementation complete, check:

✓ Desktop responsive

✓ Tablet responsive

✓ Mobile responsive

✓ Sidebar works

✓ Mobile navigation works

✓ Search works

✓ Filters work

✓ Job creation works

✓ Job details works

✓ Status changes work

✓ Technician assignment works

✓ Parts calculation works

✓ Labour calculation works

✓ Payment calculation works

✓ Notifications work in mock mode

✓ WhatsApp simulation works

✓ Email simulation works

✓ Charts render correctly

✓ Tables are responsive

✓ Modals work

✓ Forms validate

✓ Toasts work

✓ Dark mode works

✓ Print preview works

✓ No broken routes

✓ No console errors

✓ No placeholder lorem ipsum

✓ No obviously unfinished sections

✓ No excessive animations

✓ No visual clutter

✓ Consistent typography

✓ Consistent spacing

✓ Consistent colors

✓ Consistent icons

====================================================
FINAL INSTRUCTION
====================================================

Build this as a premium, elegant, production-quality frontend application.

Do not make it look like a generic CRUD dashboard.

The application should communicate:

"Professional Mobile Repair Business"

from the first screen.

Focus heavily on:

UX

visual hierarchy

spacing

typography

responsive design

workflow clarity

micro-interactions

professional tables

beautiful forms

beautiful status indicators

excellent job details

customer communication

repair tracking

and overall polish.

Every screen should look intentionally designed.

Every interaction should feel deliberate.

Every important action should provide clear feedback.

Use realistic Indian mobile repair shop data and ₹ currency.

Keep the architecture clean and backend-ready.

Most importantly:

MAKE THE UI BEAUTIFUL, PREMIUM, ELEGANT, PROFESSIONAL, INTERACTIVE, FAST, SIMPLE TO USE, AND HIGHLY IMPRESSIVE WITHOUT BECOMING CLUTTERED.

---

## Getting Started

### Prerequisites
- Node.js (v18+)
- npm or pnpm or bun

### Installation & Development

```bash
# Clone the repository
git clone https://github.com/abid2457/phone-Fix.git

# Navigate into project directory
cd phone-Fix

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be accessible at [http://localhost:8080](http://localhost:8080).

### Production Build

```bash
npm run build
npm run preview
```

