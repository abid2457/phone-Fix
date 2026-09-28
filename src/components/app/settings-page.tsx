import { useState } from 'react';
import {
  Bell,
  Building2,
  Check,
  ClipboardList,
  FileText,
  Key,
  Lock,
  Mail,
  MessageCircle,
  Palette,
  Phone,
  Plus,
  Printer,
  QrCode,
  RefreshCw,
  Send,
  Settings2,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Store,
  Trash2,
  Users,
  Wrench,
} from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { PageIntro } from './common';

export type SettingSectionId =
  | 'Business Profile'
  | 'Store Details'
  | 'Notifications'
  | 'WhatsApp'
  | 'Email'
  | 'SMS'
  | 'Invoice Settings'
  | 'Job Card Settings'
  | 'Users & Roles'
  | 'Security'
  | 'Appearance';

interface SectionMeta {
  id: SettingSectionId;
  label: string;
  description: string;
  icon: typeof Settings2;
}

const SECTIONS: SectionMeta[] = [
  { id: 'Business Profile', label: 'Business Profile', description: 'Store identity, branding, taxation, and legal details.', icon: Building2 },
  { id: 'Store Details', label: 'Store Details', description: 'Physical branch address, contact persons, opening hours, and repair capacity.', icon: Store },
  { id: 'Notifications', label: 'Notifications', description: 'Customer event triggers, staff alerts, and automated follow-up schedules.', icon: Bell },
  { id: 'WhatsApp', label: 'WhatsApp', description: 'Customer WhatsApp automation, templates, live repair tracker link, and cloud API integration.', icon: MessageCircle },
  { id: 'Email', label: 'Email', description: 'Outgoing mail server, sender credentials, automated PDF invoices, and daily reports.', icon: Mail },
  { id: 'SMS', label: 'SMS', description: 'DLT-registered sender ID, SMS gateway credits, OTP verification, and template approvals.', icon: Phone },
  { id: 'Invoice Settings', label: 'Invoice Settings', description: 'GST calculation, invoice sequence numbering, bank transfer details, and thermal print formats.', icon: FileText },
  { id: 'Job Card Settings', label: 'Job Card Settings', description: 'Intake checklist requirements, diagnostic defaults, warranty terms, and turnaround SLAs.', icon: ClipboardList },
  { id: 'Users & Roles', label: 'Users & Roles', description: 'Manage store personnel, technician logins, access privileges, and security permissions.', icon: Users },
  { id: 'Security', label: 'Security', description: 'Authentication rules, multi-factor login, IP whitelisting, session timeouts, and audit trails.', icon: ShieldCheck },
  { id: 'Appearance', label: 'Appearance', description: 'Visual styling, color themes, display density, and sound notifications.', icon: Palette },
];

export function SettingsPage() {
  const [activeTab, setActiveTab] = useState<SettingSectionId>('Business Profile');

  // Business Profile State
  const [businessName, setBusinessName] = useState('ABC Mobile Store');
  const [tagline, setTagline] = useState('Mobile Phone Repair & Care Solutions');
  const [supportPhone, setSupportPhone] = useState('+91 98765 43210');
  const [email, setEmail] = useState('service@abcmobile.example');
  const [gstin, setGstin] = useState('33ABCDE1234F1Z5');
  const [website, setWebsite] = useState('https://abcmobile.example');
  const [currency, setCurrency] = useState('INR');
  const [timezone, setTimezone] = useState('Asia/Kolkata');
  const [address, setAddress] = useState('42, Katpadi Main Road, Vellore, Tamil Nadu 632007');
  const [showWarranty, setShowWarranty] = useState(true);
  const [showGstBreakdown, setShowGstBreakdown] = useState(true);
  const [printLogo, setPrintLogo] = useState(true);

  // Store Details State
  const [storeName, setStoreName] = useState('ABC Mobile Store - Central Branch');
  const [storeCode, setStoreCode] = useState('ST-01 (Vellore Central)');
  const [storeManager, setStoreManager] = useState('Admin (Store Manager)');
  const [storeHelpline, setStoreHelpline] = useState('+91 98765 43211');
  const [storeCity, setStoreCity] = useState('Vellore');
  const [storeState, setStoreState] = useState('Tamil Nadu');
  const [storePincode, setStorePincode] = useState('632007');
  const [weekdayHours, setWeekdayHours] = useState('09:30 AM - 08:30 PM');
  const [sundayHours, setSundayHours] = useState('10:00 AM - 02:00 PM');
  const [benchSlots, setBenchSlots] = useState('15 concurrent repair slots');
  const [multiStoreSync, setMultiStoreSync] = useState(true);

  // Notifications State
  const [notifyNewJob, setNotifyNewJob] = useState({ whatsapp: true, sms: true, email: true, app: true });
  const [notifyDiagnostic, setNotifyDiagnostic] = useState({ whatsapp: true, sms: false, email: false, app: true });
  const [notifyEstimate, setNotifyEstimate] = useState({ whatsapp: true, sms: true, email: true, app: true });
  const [notifyReady, setNotifyReady] = useState({ whatsapp: true, sms: true, email: true, app: true });
  const [notifyPayment, setNotifyPayment] = useState({ whatsapp: true, sms: false, email: true, app: true });
  const [notifyOverdue, setNotifyOverdue] = useState({ whatsapp: false, sms: false, email: false, app: true });
  const [quietHours, setQuietHours] = useState(true);

  // WhatsApp State
  const [waNumber, setWaNumber] = useState('+91 98765 43210');
  const [waDisplayName, setWaDisplayName] = useState('ABC Mobile Store Care');
  const [waWelcomeMsg, setWaWelcomeMsg] = useState(true);
  const [waTrackLink, setWaTrackLink] = useState(true);
  const [waApprovalBtn, setWaApprovalBtn] = useState(true);
  const [waInvoicePdf, setWaInvoicePdf] = useState(true);
  const [testWaNumber, setTestWaNumber] = useState('+91 98765 43210');

  // Email State
  const [emailSenderName, setEmailSenderName] = useState('FixFlow Service Desk');
  const [emailSenderAddr, setEmailSenderAddr] = useState('service@abcmobile.example');
  const [emailReplyTo, setEmailReplyTo] = useState('support@abcmobile.example');
  const [emailAttachPdf, setEmailAttachPdf] = useState(true);
  const [emailDailySummary, setEmailDailySummary] = useState(true);
  const [testEmailAddr, setTestEmailAddr] = useState('manager@abcmobile.example');

  // SMS State
  const [smsEntityId, setSmsEntityId] = useState('1401582910000034');
  const [smsSenderId, setSmsSenderId] = useState('FIXFLW');
  const [smsOnJobCreate, setSmsOnJobCreate] = useState(true);
  const [smsOnReady, setSmsOnReady] = useState(true);
  const [smsOtpVerification, setSmsOtpVerification] = useState(true);
  const [testSmsNumber, setTestSmsNumber] = useState('+91 98765 43210');

  // Invoice Settings State
  const [invoicePrefix, setInvoicePrefix] = useState('INV-2026-');
  const [invoiceNextNum, setInvoiceNextNum] = useState('1049');
  const [invoiceGstRate, setInvoiceGstRate] = useState('18%');
  const [hsnCode, setHsnCode] = useState('998713');
  const [bankName, setBankName] = useState('HDFC Bank');
  const [bankAccount, setBankAccount] = useState('50200012345678');
  const [bankIfsc, setBankIfsc] = useState('HDFC0001234');
  const [bankUpi, setBankUpi] = useState('abcmobile@okhdfcbank');
  const [invoiceTerms, setInvoiceTerms] = useState(
    '1. 90 days service warranty on replaced parts.\n2. Warranty does not cover physical or liquid damage.\n3. Uncollected devices will be retained up to 60 days.',
  );
  const [thermalFormat, setThermalFormat] = useState('thermal80');
  const [showQrOnBill, setShowQrOnBill] = useState(true);

  // Job Card Settings State
  const [jobPrefix, setJobPrefix] = useState('JOB-');
  const [defaultTurnaround, setDefaultTurnaround] = useState('24 Hours');
  const [defaultWarrantyDays, setDefaultWarrantyDays] = useState('90 Days');
  const [requireSignature, setRequireSignature] = useState(true);
  const [requireImei, setRequireImei] = useState(true);
  const [requirePasscode, setRequirePasscode] = useState(true);
  const [autoAssignTech, setAutoAssignTech] = useState(true);

  // Users & Roles State
  const [staffList, setStaffList] = useState([
    { id: 'USR-1', name: 'Admin User', email: 'admin@abcmobile.example', phone: '+91 98765 43210', role: 'Store Manager', status: 'Active' },
    { id: 'USR-2', name: 'Rahul Verma', email: 'rahul.v@abcmobile.example', phone: '+91 98765 43212', role: 'Senior Technician', status: 'Active' },
    { id: 'USR-3', name: 'Priya Sharma', email: 'priya.s@abcmobile.example', phone: '+91 98765 43213', role: 'Front Desk & Billing', status: 'Active' },
    { id: 'USR-4', name: 'Suresh Kumar', email: 'suresh.k@abcmobile.example', phone: '+91 98765 43214', role: 'Junior Technician', status: 'Active' },
  ]);
  const [addStaffOpen, setAddStaffOpen] = useState(false);
  const [newStaffName, setNewStaffName] = useState('');
  const [newStaffEmail, setNewStaffEmail] = useState('');
  const [newStaffPhone, setNewStaffPhone] = useState('');
  const [newStaffRole, setNewStaffRole] = useState('Senior Technician');

  // Security State
  const [sessionTimeout, setSessionTimeout] = useState('30 Minutes');
  const [twoFactorAuth, setTwoFactorAuth] = useState(true);
  const [ipLock, setIpLock] = useState(false);
  const [auditLog, setAuditLog] = useState(true);
  const [requirePinForRefund, setRequirePinForRefund] = useState(true);

  // Appearance State
  const [themeMode, setThemeMode] = useState<'light' | 'dark' | 'system'>('light');
  const [accentColor, setAccentColor] = useState('emerald');
  const [layoutDensity, setLayoutDensity] = useState('comfortable');
  const [soundChime, setSoundChime] = useState(true);
  const [smoothTransitions, setSmoothTransitions] = useState(true);

  const currentSection = SECTIONS.find((s) => s.id === activeTab) || SECTIONS[0];
  const CurrentIcon = currentSection.icon;

  const handleSave = (sectionName: string) => {
    toast.success(`${sectionName} saved successfully!`, {
      description: 'Your workspace preferences have been updated.',
    });
  };

  const handleAddStaff = () => {
    if (!newStaffName.trim()) {
      toast.error('Please enter staff name');
      return;
    }
    const newStaff = {
      id: `USR-${staffList.length + 1}`,
      name: newStaffName,
      email: newStaffEmail || `${newStaffName.toLowerCase().replace(/\s+/g, '.')}@abcmobile.example`,
      phone: newStaffPhone || '+91 98765 43219',
      role: newStaffRole,
      status: 'Active',
    };
    setStaffList([...staffList, newStaff]);
    setNewStaffName('');
    setNewStaffEmail('');
    setNewStaffPhone('');
    setAddStaffOpen(false);
    toast.success(`${newStaff.name} added as ${newStaff.role}!`);
  };

  const handleDeleteStaff = (id: string, name: string) => {
    if (staffList.length <= 1) {
      toast.error('Cannot remove the last remaining admin account.');
      return;
    }
    setStaffList(staffList.filter((s) => s.id !== id));
    toast.success(`Removed ${name} from team.`);
  };

  return (
    <>
      <PageIntro
        eyebrow="Workspace preferences"
        title="Settings"
        description="Configure how FixFlow works across your service centers."
      />

      <div className="settings-layout">
        {/* Left Settings Sidebar */}
        <aside className="space-y-1">
          {SECTIONS.map((s) => {
            const Icon = s.icon;
            const isActive = activeTab === s.id;
            return (
              <button
                key={s.id}
                onClick={() => setActiveTab(s.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all text-left ${
                  isActive
                    ? 'bg-accent text-primary shadow-xs font-bold'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                }`}
              >
                <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-primary' : 'text-muted-foreground'}`} />
                <span className="truncate">{s.label}</span>
              </button>
            );
          })}
        </aside>

        {/* Right Settings Content Panel */}
        <section className="panel settings-panel space-y-6">
          {/* Header */}
          <div className="settings-heading flex items-start gap-3.5 pb-4 border-b border-border">
            <div className="settings-icon p-2.5 rounded-xl bg-accent text-primary shrink-0">
              <CurrentIcon className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-foreground">{currentSection.label}</h2>
              <p className="text-xs text-muted-foreground mt-0.5">{currentSection.description}</p>
            </div>
          </div>

          {/* 1. BUSINESS PROFILE */}
          {activeTab === 'Business Profile' && (
            <div className="space-y-6">
              <div className="field-grid">
                <label>
                  Business Name
                  <input value={businessName} onChange={(e) => setBusinessName(e.target.value)} />
                </label>
                <label>
                  Brand Tagline
                  <input value={tagline} onChange={(e) => setTagline(e.target.value)} />
                </label>
                <label>
                  Support Phone
                  <input value={supportPhone} onChange={(e) => setSupportPhone(e.target.value)} />
                </label>
                <label>
                  Support Email
                  <input value={email} onChange={(e) => setEmail(e.target.value)} />
                </label>
                <label>
                  GSTIN / Tax ID
                  <input value={gstin} onChange={(e) => setGstin(e.target.value)} />
                </label>
                <label>
                  Website
                  <input value={website} onChange={(e) => setWebsite(e.target.value)} />
                </label>
                <label>
                  Primary Currency
                  <select value={currency} onChange={(e) => setCurrency(e.target.value)}>
                    <option value="INR">₹ INR (Indian Rupee)</option>
                    <option value="USD">$ USD (US Dollar)</option>
                    <option value="EUR">€ EUR (Euro)</option>
                    <option value="GBP">£ GBP (British Pound)</option>
                    <option value="AED">د.إ AED (UAE Dirham)</option>
                  </select>
                </label>
                <label>
                  Default Timezone
                  <select value={timezone} onChange={(e) => setTimezone(e.target.value)}>
                    <option value="Asia/Kolkata">Asia/Kolkata (IST +05:30)</option>
                    <option value="Asia/Dubai">Asia/Dubai (GST +04:00)</option>
                    <option value="Asia/Singapore">Asia/Singapore (SGT +08:00)</option>
                    <option value="Europe/London">Europe/London (GMT/BST)</option>
                    <option value="America/New_York">America/New_York (EST/EDT)</option>
                  </select>
                </label>
                <label className="full">
                  Store Address
                  <textarea rows={3} value={address} onChange={(e) => setAddress(e.target.value)} />
                </label>
              </div>

              <div className="space-y-3 pt-2">
                <div className="setting-toggle">
                  <div>
                    <strong>Show warranty coverage on job cards</strong>
                    <span>Display exact warranty validity dates on customer receipts and printouts.</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={showWarranty}
                    onChange={(e) => setShowWarranty(e.target.checked)}
                    className="w-4 h-4"
                  />
                </div>

                <div className="setting-toggle">
                  <div>
                    <strong>Include GST breakdown in receipts</strong>
                    <span>Separate CGST and SGST line items on customer invoices.</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={showGstBreakdown}
                    onChange={(e) => setShowGstBreakdown(e.target.checked)}
                    className="w-4 h-4"
                  />
                </div>

                <div className="setting-toggle">
                  <div>
                    <strong>Display repair shop logo on printouts</strong>
                    <span>Include store branding on printable receipts and claim slips.</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={printLogo}
                    onChange={(e) => setPrintLogo(e.target.checked)}
                    className="w-4 h-4"
                  />
                </div>
              </div>

              <Button onClick={() => handleSave('Business Profile')}>Save Changes</Button>
            </div>
          )}

          {/* 2. STORE DETAILS */}
          {activeTab === 'Store Details' && (
            <div className="space-y-6">
              <div className="field-grid">
                <label>
                  Store / Branch Name
                  <input value={storeName} onChange={(e) => setStoreName(e.target.value)} />
                </label>
                <label>
                  Store Code / Identifier
                  <input value={storeCode} onChange={(e) => setStoreCode(e.target.value)} />
                </label>
                <label>
                  Store Manager
                  <input value={storeManager} onChange={(e) => setStoreManager(e.target.value)} />
                </label>
                <label>
                  Direct Helpline
                  <input value={storeHelpline} onChange={(e) => setStoreHelpline(e.target.value)} />
                </label>
                <label>
                  City
                  <input value={storeCity} onChange={(e) => setStoreCity(e.target.value)} />
                </label>
                <label>
                  State
                  <input value={storeState} onChange={(e) => setStoreState(e.target.value)} />
                </label>
                <label>
                  Pin / Postal Code
                  <input value={storePincode} onChange={(e) => setStorePincode(e.target.value)} />
                </label>
                <label>
                  Active Workbench Slots
                  <input value={benchSlots} onChange={(e) => setBenchSlots(e.target.value)} />
                </label>
                <label>
                  Mon - Sat Operating Hours
                  <input value={weekdayHours} onChange={(e) => setWeekdayHours(e.target.value)} />
                </label>
                <label>
                  Sunday Operating Hours
                  <input value={sundayHours} onChange={(e) => setSundayHours(e.target.value)} />
                </label>
              </div>

              <div className="setting-toggle">
                <div>
                  <strong>Multi-store cloud synchronization</strong>
                  <span>Synchronize parts inventory and customer profiles across all branches automatically.</span>
                </div>
                <input
                  type="checkbox"
                  checked={multiStoreSync}
                  onChange={(e) => setMultiStoreSync(e.target.checked)}
                  className="w-4 h-4"
                />
              </div>

              <Button onClick={() => handleSave('Store Details')}>Save Store Details</Button>
            </div>
          )}

          {/* 3. NOTIFICATIONS */}
          {activeTab === 'Notifications' && (
            <div className="space-y-6">
              <div className="rounded-xl border border-border overflow-hidden">
                <table className="w-full text-xs">
                  <thead className="bg-muted text-muted-foreground font-bold">
                    <tr>
                      <th className="text-left p-3">Event Trigger</th>
                      <th className="text-center p-3">WhatsApp</th>
                      <th className="text-center p-3">SMS</th>
                      <th className="text-center p-3">Email</th>
                      <th className="text-center p-3">In-App</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    <tr>
                      <td className="p-3 font-semibold text-foreground">Job Card Created (Intake)</td>
                      <td className="text-center p-3"><input type="checkbox" checked={notifyNewJob.whatsapp} onChange={(e) => setNotifyNewJob({ ...notifyNewJob, whatsapp: e.target.checked })} /></td>
                      <td className="text-center p-3"><input type="checkbox" checked={notifyNewJob.sms} onChange={(e) => setNotifyNewJob({ ...notifyNewJob, sms: e.target.checked })} /></td>
                      <td className="text-center p-3"><input type="checkbox" checked={notifyNewJob.email} onChange={(e) => setNotifyNewJob({ ...notifyNewJob, email: e.target.checked })} /></td>
                      <td className="text-center p-3"><input type="checkbox" checked={notifyNewJob.app} onChange={(e) => setNotifyNewJob({ ...notifyNewJob, app: e.target.checked })} /></td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-foreground">Diagnostic Completed & Estimate Ready</td>
                      <td className="text-center p-3"><input type="checkbox" checked={notifyDiagnostic.whatsapp} onChange={(e) => setNotifyDiagnostic({ ...notifyDiagnostic, whatsapp: e.target.checked })} /></td>
                      <td className="text-center p-3"><input type="checkbox" checked={notifyDiagnostic.sms} onChange={(e) => setNotifyDiagnostic({ ...notifyDiagnostic, sms: e.target.checked })} /></td>
                      <td className="text-center p-3"><input type="checkbox" checked={notifyDiagnostic.email} onChange={(e) => setNotifyDiagnostic({ ...notifyDiagnostic, email: e.target.checked })} /></td>
                      <td className="text-center p-3"><input type="checkbox" checked={notifyDiagnostic.app} onChange={(e) => setNotifyDiagnostic({ ...notifyDiagnostic, app: e.target.checked })} /></td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-foreground">Customer Approval Request</td>
                      <td className="text-center p-3"><input type="checkbox" checked={notifyEstimate.whatsapp} onChange={(e) => setNotifyEstimate({ ...notifyEstimate, whatsapp: e.target.checked })} /></td>
                      <td className="text-center p-3"><input type="checkbox" checked={notifyEstimate.sms} onChange={(e) => setNotifyEstimate({ ...notifyEstimate, sms: e.target.checked })} /></td>
                      <td className="text-center p-3"><input type="checkbox" checked={notifyEstimate.email} onChange={(e) => setNotifyEstimate({ ...notifyEstimate, email: e.target.checked })} /></td>
                      <td className="text-center p-3"><input type="checkbox" checked={notifyEstimate.app} onChange={(e) => setNotifyEstimate({ ...notifyEstimate, app: e.target.checked })} /></td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-foreground">Device Repaired & Ready for Pickup</td>
                      <td className="text-center p-3"><input type="checkbox" checked={notifyReady.whatsapp} onChange={(e) => setNotifyReady({ ...notifyReady, whatsapp: e.target.checked })} /></td>
                      <td className="text-center p-3"><input type="checkbox" checked={notifyReady.sms} onChange={(e) => setNotifyReady({ ...notifyReady, sms: e.target.checked })} /></td>
                      <td className="text-center p-3"><input type="checkbox" checked={notifyReady.email} onChange={(e) => setNotifyReady({ ...notifyReady, email: e.target.checked })} /></td>
                      <td className="text-center p-3"><input type="checkbox" checked={notifyReady.app} onChange={(e) => setNotifyReady({ ...notifyReady, app: e.target.checked })} /></td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-foreground">Payment Received & Digital Bill</td>
                      <td className="text-center p-3"><input type="checkbox" checked={notifyPayment.whatsapp} onChange={(e) => setNotifyPayment({ ...notifyPayment, whatsapp: e.target.checked })} /></td>
                      <td className="text-center p-3"><input type="checkbox" checked={notifyPayment.sms} onChange={(e) => setNotifyPayment({ ...notifyPayment, sms: e.target.checked })} /></td>
                      <td className="text-center p-3"><input type="checkbox" checked={notifyPayment.email} onChange={(e) => setNotifyPayment({ ...notifyPayment, email: e.target.checked })} /></td>
                      <td className="text-center p-3"><input type="checkbox" checked={notifyPayment.app} onChange={(e) => setNotifyPayment({ ...notifyPayment, app: e.target.checked })} /></td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-foreground">Overdue / Delayed Repair Alert</td>
                      <td className="text-center p-3"><input type="checkbox" checked={notifyOverdue.whatsapp} onChange={(e) => setNotifyOverdue({ ...notifyOverdue, whatsapp: e.target.checked })} /></td>
                      <td className="text-center p-3"><input type="checkbox" checked={notifyOverdue.sms} onChange={(e) => setNotifyOverdue({ ...notifyOverdue, sms: e.target.checked })} /></td>
                      <td className="text-center p-3"><input type="checkbox" checked={notifyOverdue.email} onChange={(e) => setNotifyOverdue({ ...notifyOverdue, email: e.target.checked })} /></td>
                      <td className="text-center p-3"><input type="checkbox" checked={notifyOverdue.app} onChange={(e) => setNotifyOverdue({ ...notifyOverdue, app: e.target.checked })} /></td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="setting-toggle">
                <div>
                  <strong>Quiet Hours (Do Not Disturb)</strong>
                  <span>Mute promotional SMS/WhatsApp alerts between 10:00 PM and 08:00 AM.</span>
                </div>
                <input
                  type="checkbox"
                  checked={quietHours}
                  onChange={(e) => setQuietHours(e.target.checked)}
                  className="w-4 h-4"
                />
              </div>

              <Button onClick={() => handleSave('Notification Preferences')}>Save Notification Settings</Button>
            </div>
          )}

          {/* 4. WHATSAPP */}
          {activeTab === 'WhatsApp' && (
            <div className="space-y-6">
              <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-emerald-500 text-white grid place-items-center font-bold">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <strong className="text-sm font-bold text-emerald-700 dark:text-emerald-400">Meta Cloud API: Connected</strong>
                    <span className="block text-xs text-muted-foreground">Gateway status: Online & Ready for Instant Messaging</span>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-600 dark:text-emerald-400">Active</span>
              </div>

              <div className="field-grid">
                <label>
                  WhatsApp Business Number
                  <input value={waNumber} onChange={(e) => setWaNumber(e.target.value)} />
                </label>
                <label>
                  Display Name
                  <input value={waDisplayName} onChange={(e) => setWaDisplayName(e.target.value)} />
                </label>
              </div>

              <div className="space-y-3">
                <div className="setting-toggle">
                  <div>
                    <strong>Welcome message & tracking link</strong>
                    <span>Automatically send job card number and live repair tracking link upon intake.</span>
                  </div>
                  <input type="checkbox" checked={waWelcomeMsg} onChange={(e) => setWaWelcomeMsg(e.target.checked)} className="w-4 h-4" />
                </div>
                <div className="setting-toggle">
                  <div>
                    <strong>Interactive 1-Click estimate approval</strong>
                    <span>Provide "Approve" and "Reject" quick buttons on estimate messages.</span>
                  </div>
                  <input type="checkbox" checked={waApprovalBtn} onChange={(e) => setWaApprovalBtn(e.target.checked)} className="w-4 h-4" />
                </div>
                <div className="setting-toggle">
                  <div>
                    <strong>Send PDF invoice via WhatsApp</strong>
                    <span>Deliver printable digital invoice directly upon payment completion.</span>
                  </div>
                  <input type="checkbox" checked={waInvoicePdf} onChange={(e) => setWaInvoicePdf(e.target.checked)} className="w-4 h-4" />
                </div>
              </div>

              {/* Test Simulator */}
              <div className="p-4 rounded-xl border border-border bg-card/60 space-y-3">
                <strong className="text-xs font-bold text-foreground">Send Test WhatsApp Message</strong>
                <div className="flex gap-2">
                  <input
                    value={testWaNumber}
                    onChange={(e) => setTestWaNumber(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="flex-1"
                  />
                  <Button
                    onClick={() => {
                      toast.success(`Test WhatsApp message sent to ${testWaNumber}!`, {
                        description: 'Simulated WhatsApp template dispatch successful.',
                      });
                    }}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white gap-2 text-xs"
                  >
                    <Send className="w-3.5 h-3.5" /> Send Test
                  </Button>
                </div>
              </div>

              <Button onClick={() => handleSave('WhatsApp Settings')}>Save WhatsApp Settings</Button>
            </div>
          )}

          {/* 5. EMAIL */}
          {activeTab === 'Email' && (
            <div className="space-y-6">
              <div className="p-4 rounded-xl bg-primary/10 border border-primary/25 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-primary text-primary-foreground grid place-items-center">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <strong className="text-sm font-bold text-primary">SMTP Relay: Active & Verified</strong>
                    <span className="block text-xs text-muted-foreground">Connected via smtp.fixflow-mail.io:587</span>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-primary/20 text-primary">Verified</span>
              </div>

              <div className="field-grid">
                <label>
                  From Name
                  <input value={emailSenderName} onChange={(e) => setEmailSenderName(e.target.value)} />
                </label>
                <label>
                  From Email Address
                  <input value={emailSenderAddr} onChange={(e) => setEmailSenderAddr(e.target.value)} />
                </label>
                <label>
                  Reply-To Email Address
                  <input value={emailReplyTo} onChange={(e) => setEmailReplyTo(e.target.value)} />
                </label>
                <label>
                  SMTP Server Host
                  <input defaultValue="smtp.fixflow-mail.io:587" readOnly className="bg-muted opacity-80" />
                </label>
              </div>

              <div className="space-y-3">
                <div className="setting-toggle">
                  <div>
                    <strong>Attach branded PDF Invoices</strong>
                    <span>Automatically generate and attach itemized PDF receipts to customer emails.</span>
                  </div>
                  <input type="checkbox" checked={emailAttachPdf} onChange={(e) => setEmailAttachPdf(e.target.checked)} className="w-4 h-4" />
                </div>
                <div className="setting-toggle">
                  <div>
                    <strong>Daily store revenue summary email</strong>
                    <span>Send store manager an automated daily closure report at 09:00 PM.</span>
                  </div>
                  <input type="checkbox" checked={emailDailySummary} onChange={(e) => setEmailDailySummary(e.target.checked)} className="w-4 h-4" />
                </div>
              </div>

              {/* Test Simulator */}
              <div className="p-4 rounded-xl border border-border bg-card/60 space-y-3">
                <strong className="text-xs font-bold text-foreground">Send Test Email</strong>
                <div className="flex gap-2">
                  <input
                    value={testEmailAddr}
                    onChange={(e) => setTestEmailAddr(e.target.value)}
                    placeholder="manager@abcmobile.example"
                    className="flex-1"
                  />
                  <Button
                    onClick={() => {
                      toast.success(`Test email dispatched to ${testEmailAddr}!`, {
                        description: 'HTML service email delivered successfully.',
                      });
                    }}
                    className="gap-2 text-xs"
                  >
                    <Send className="w-3.5 h-3.5" /> Send Test Email
                  </Button>
                </div>
              </div>

              <Button onClick={() => handleSave('Email Settings')}>Save Email Settings</Button>
            </div>
          )}

          {/* 6. SMS */}
          {activeTab === 'SMS' && (
            <div className="space-y-6">
              <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/25 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-amber-500 text-white grid place-items-center font-bold">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <strong className="text-sm font-bold text-amber-700 dark:text-amber-400">SMS Gateway Balance: 4,850 Credits</strong>
                    <span className="block text-xs text-muted-foreground">DLT Approved Header: FIXFLW</span>
                  </div>
                </div>
                <Button variant="outline" size="sm" onClick={() => toast.success('5,000 SMS credits recharged!')}>
                  Recharge
                </Button>
              </div>

              <div className="field-grid">
                <label>
                  DLT Principal Entity ID
                  <input value={smsEntityId} onChange={(e) => setSmsEntityId(e.target.value)} />
                </label>
                <label>
                  Approved Sender ID / Header
                  <input value={smsSenderId} onChange={(e) => setSmsSenderId(e.target.value)} />
                </label>
              </div>

              <div className="space-y-3">
                <div className="setting-toggle">
                  <div>
                    <strong>SMS on Job Card creation</strong>
                    <span>Send SMS containing Job Card ID and pickup date immediately.</span>
                  </div>
                  <input type="checkbox" checked={smsOnJobCreate} onChange={(e) => setSmsOnJobCreate(e.target.checked)} className="w-4 h-4" />
                </div>
                <div className="setting-toggle">
                  <div>
                    <strong>SMS on device ready for collection</strong>
                    <span>Notify customer when final quality testing is completed.</span>
                  </div>
                  <input type="checkbox" checked={smsOnReady} onChange={(e) => setSmsOnReady(e.target.checked)} className="w-4 h-4" />
                </div>
                <div className="setting-toggle">
                  <div>
                    <strong>OTP verification before handset handover</strong>
                    <span>Generate a 4-digit verification code to ensure device is delivered to the rightful owner.</span>
                  </div>
                  <input type="checkbox" checked={smsOtpVerification} onChange={(e) => setSmsOtpVerification(e.target.checked)} className="w-4 h-4" />
                </div>
              </div>

              {/* Test Simulator */}
              <div className="p-4 rounded-xl border border-border bg-card/60 space-y-3">
                <strong className="text-xs font-bold text-foreground">Send Test SMS</strong>
                <div className="flex gap-2">
                  <input
                    value={testSmsNumber}
                    onChange={(e) => setTestSmsNumber(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="flex-1"
                  />
                  <Button
                    onClick={() => {
                      toast.success(`Test SMS delivered to ${testSmsNumber}!`, {
                        description: `Sent via DLT Sender ID: ${smsSenderId}`,
                      });
                    }}
                    className="gap-2 text-xs"
                  >
                    <Send className="w-3.5 h-3.5" /> Send Test SMS
                  </Button>
                </div>
              </div>

              <Button onClick={() => handleSave('SMS Settings')}>Save SMS Settings</Button>
            </div>
          )}

          {/* 7. INVOICE SETTINGS */}
          {activeTab === 'Invoice Settings' && (
            <div className="space-y-6">
              <div className="field-grid">
                <label>
                  Invoice Prefix
                  <input value={invoicePrefix} onChange={(e) => setInvoicePrefix(e.target.value)} />
                </label>
                <label>
                  Next Invoice Number
                  <input value={invoiceNextNum} onChange={(e) => setInvoiceNextNum(e.target.value)} />
                </label>
                <label>
                  Default GST Rate
                  <select value={invoiceGstRate} onChange={(e) => setInvoiceGstRate(e.target.value)}>
                    <option value="18%">18% (9% CGST + 9% SGST)</option>
                    <option value="12%">12% (6% CGST + 6% SGST)</option>
                    <option value="5%">5% (2.5% CGST + 2.5% SGST)</option>
                    <option value="0%">0% (Exempt / Non-GST)</option>
                  </select>
                </label>
                <label>
                  Services SAC Code
                  <input value={hsnCode} onChange={(e) => setHsnCode(e.target.value)} />
                </label>
                <label>
                  Bank Name
                  <input value={bankName} onChange={(e) => setBankName(e.target.value)} />
                </label>
                <label>
                  Account Number
                  <input value={bankAccount} onChange={(e) => setBankAccount(e.target.value)} />
                </label>
                <label>
                  IFSC Code
                  <input value={bankIfsc} onChange={(e) => setBankIfsc(e.target.value)} />
                </label>
                <label>
                  UPI ID / VPA
                  <input value={bankUpi} onChange={(e) => setBankUpi(e.target.value)} />
                </label>
                <label className="full">
                  Terms & Conditions (Printed on Invoice)
                  <textarea rows={3} value={invoiceTerms} onChange={(e) => setInvoiceTerms(e.target.value)} />
                </label>
              </div>

              <div className="space-y-3">
                <div className="setting-toggle">
                  <div>
                    <strong>Print Dynamic UPI Payment QR Code on Bills</strong>
                    <span>Allow customers to scan and pay directly via GPay / PhonePe / Paytm.</span>
                  </div>
                  <input type="checkbox" checked={showQrOnBill} onChange={(e) => setShowQrOnBill(e.target.checked)} className="w-4 h-4" />
                </div>
                <div className="setting-toggle">
                  <div>
                    <strong>Default Print Layout</strong>
                    <span>Choose between 80mm Thermal Receipt or Full A4 Tax Invoice.</span>
                  </div>
                  <select value={thermalFormat} onChange={(e) => setThermalFormat(e.target.value)} className="w-auto text-xs py-1.5 px-3">
                    <option value="thermal80">80mm Thermal POS Receipt</option>
                    <option value="a4">Standard A4 Tax Invoice</option>
                  </select>
                </div>
              </div>

              <Button onClick={() => handleSave('Invoice Settings')}>Save Invoice Settings</Button>
            </div>
          )}

          {/* 8. JOB CARD SETTINGS */}
          {activeTab === 'Job Card Settings' && (
            <div className="space-y-6">
              <div className="field-grid">
                <label>
                  Job Card Prefix
                  <input value={jobPrefix} onChange={(e) => setJobPrefix(e.target.value)} />
                </label>
                <label>
                  Default Target Turnaround Time
                  <select value={defaultTurnaround} onChange={(e) => setDefaultTurnaround(e.target.value)}>
                    <option value="2 Hours">2 Hours (Express Service)</option>
                    <option value="4 Hours">4 Hours (Same Day)</option>
                    <option value="24 Hours">24 Hours (Standard)</option>
                    <option value="48 Hours">48 Hours (Complex Repair)</option>
                  </select>
                </label>
                <label>
                  Standard Service Warranty
                  <select value={defaultWarrantyDays} onChange={(e) => setDefaultWarrantyDays(e.target.value)}>
                    <option value="30 Days">30 Days</option>
                    <option value="90 Days">90 Days (Recommended)</option>
                    <option value="180 Days">180 Days (6 Months)</option>
                    <option value="365 Days">365 Days (1 Year)</option>
                  </select>
                </label>
              </div>

              <div className="space-y-3">
                <div className="setting-toggle">
                  <div>
                    <strong>Require customer signature on intake</strong>
                    <span>Record physical or touchscreen signature before starting inspection.</span>
                  </div>
                  <input type="checkbox" checked={requireSignature} onChange={(e) => setRequireSignature(e.target.checked)} className="w-4 h-4" />
                </div>
                <div className="setting-toggle">
                  <div>
                    <strong>Require IMEI / Serial Number validation</strong>
                    <span>Mandatory 15-digit IMEI verification before job submission.</span>
                  </div>
                  <input type="checkbox" checked={requireImei} onChange={(e) => setRequireImei(e.target.checked)} className="w-4 h-4" />
                </div>
                <div className="setting-toggle">
                  <div>
                    <strong>Require Device Passcode / Unlock Pattern</strong>
                    <span>Prompt for device password during physical intake.</span>
                  </div>
                  <input type="checkbox" checked={requirePasscode} onChange={(e) => setRequirePasscode(e.target.checked)} className="w-4 h-4" />
                </div>
                <div className="setting-toggle">
                  <div>
                    <strong>Auto-assign jobs to least-busy technician</strong>
                    <span>Automatically route newly created job cards to available workbench staff.</span>
                  </div>
                  <input type="checkbox" checked={autoAssignTech} onChange={(e) => setAutoAssignTech(e.target.checked)} className="w-4 h-4" />
                </div>
              </div>

              <Button onClick={() => handleSave('Job Card Settings')}>Save Job Card Settings</Button>
            </div>
          )}

          {/* 9. USERS & ROLES */}
          {activeTab === 'Users & Roles' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <strong className="text-sm font-bold text-foreground">Service Center Team ({staffList.length})</strong>
                  <span className="block text-xs text-muted-foreground">Manage active personnel logins and roles.</span>
                </div>
                <Button size="sm" onClick={() => setAddStaffOpen(true)} className="gap-1.5 text-xs">
                  <Plus className="w-3.5 h-3.5" /> Add Staff Member
                </Button>
              </div>

              <div className="rounded-xl border border-border overflow-hidden">
                <table className="w-full text-xs">
                  <thead className="bg-muted text-muted-foreground font-bold">
                    <tr>
                      <th className="text-left p-3">Staff Name</th>
                      <th className="text-left p-3">Email</th>
                      <th className="text-left p-3">Role</th>
                      <th className="text-left p-3">Status</th>
                      <th className="text-right p-3">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {staffList.map((staff) => (
                      <tr key={staff.id}>
                        <td className="p-3">
                          <strong className="text-foreground">{staff.name}</strong>
                          <small className="block text-[10px] text-muted-foreground">{staff.phone}</small>
                        </td>
                        <td className="p-3 text-muted-foreground">{staff.email}</td>
                        <td className="p-3">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            staff.role === 'Store Manager'
                              ? 'bg-primary/15 text-primary'
                              : staff.role.includes('Technician')
                                ? 'bg-blue-500/15 text-blue-600 dark:text-blue-400'
                                : 'bg-amber-500/15 text-amber-600 dark:text-amber-400'
                          }`}>
                            {staff.role}
                          </span>
                        </td>
                        <td className="p-3">
                          <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-semibold">
                            <span className="w-2 h-2 rounded-full bg-emerald-500" />
                            {staff.status}
                          </span>
                        </td>
                        <td className="p-3 text-right">
                          <button
                            onClick={() => handleDeleteStaff(staff.id, staff.name)}
                            className="text-destructive hover:opacity-80 p-1.5 rounded"
                            title="Remove staff member"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <Button onClick={() => handleSave('Users & Roles')}>Save Roles & Permissions</Button>
            </div>
          )}

          {/* 10. SECURITY */}
          {activeTab === 'Security' && (
            <div className="space-y-6">
              <div className="field-grid">
                <label>
                  Inactivity Session Timeout
                  <select value={sessionTimeout} onChange={(e) => setSessionTimeout(e.target.value)}>
                    <option value="15 Minutes">15 Minutes</option>
                    <option value="30 Minutes">30 Minutes (Recommended)</option>
                    <option value="2 Hours">2 Hours</option>
                    <option value="8 Hours">8 Hours (Full Shift)</option>
                  </select>
                </label>
              </div>

              <div className="space-y-3">
                <div className="setting-toggle">
                  <div>
                    <strong>Two-Factor Authentication (2FA)</strong>
                    <span>Require OTP verification for Store Manager logins and price alterations.</span>
                  </div>
                  <input type="checkbox" checked={twoFactorAuth} onChange={(e) => setTwoFactorAuth(e.target.checked)} className="w-4 h-4" />
                </div>
                <div className="setting-toggle">
                  <div>
                    <strong>Restrict dashboard to Store Wi-Fi / IP subnet</strong>
                    <span>Prevent unauthorized access from outside the physical workshop premises.</span>
                  </div>
                  <input type="checkbox" checked={ipLock} onChange={(e) => setIpLock(e.target.checked)} className="w-4 h-4" />
                </div>
                <div className="setting-toggle">
                  <div>
                    <strong>Audit Trail logging</strong>
                    <span>Track and record timestamped logs of every job price change, status edit, and refund.</span>
                  </div>
                  <input type="checkbox" checked={auditLog} onChange={(e) => setAuditLog(e.target.checked)} className="w-4 h-4" />
                </div>
                <div className="setting-toggle">
                  <div>
                    <strong>Require Manager PIN for invoice cancellation or discount</strong>
                    <span>Guard against unauthorized revenue overrides at the billing desk.</span>
                  </div>
                  <input type="checkbox" checked={requirePinForRefund} onChange={(e) => setRequirePinForRefund(e.target.checked)} className="w-4 h-4" />
                </div>
              </div>

              <div className="p-4 rounded-xl border border-border bg-card/60 flex items-center justify-between">
                <div>
                  <strong className="text-xs font-bold text-foreground">Active Login Sessions</strong>
                  <span className="block text-[11px] text-muted-foreground mt-0.5">Chrome on Windows · Vellore, India (Current session)</span>
                </div>
                <Button variant="outline" size="sm" onClick={() => toast.success('Revoked all other active sessions.')}>
                  Logout Other Devices
                </Button>
              </div>

              <Button onClick={() => handleSave('Security Preferences')}>Save Security Settings</Button>
            </div>
          )}

          {/* 11. APPEARANCE */}
          {activeTab === 'Appearance' && (
            <div className="space-y-6">
              <div className="space-y-3">
                <strong className="text-xs font-bold text-foreground">System Theme</strong>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { id: 'light' as const, label: 'Light Mode', desc: 'Clean white aesthetic' },
                    { id: 'dark' as const, label: 'Dark Mode', desc: 'Liquid Crystal dark UI' },
                    { id: 'system' as const, label: 'Auto (System)', desc: 'Match OS preference' },
                  ].map((t) => (
                    <button
                      key={t.id}
                      onClick={() => {
                        setThemeMode(t.id);
                        const isDark = t.id === 'dark' || (t.id === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
                        document.documentElement.classList.toggle('dark', isDark);
                        toast.success(`Switched theme to ${t.label}`);
                      }}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        themeMode === t.id
                          ? 'border-primary bg-accent/60 shadow-xs'
                          : 'border-border bg-card hover:bg-muted'
                      }`}
                    >
                      <strong className="text-xs font-bold text-foreground block">{t.label}</strong>
                      <span className="text-[10px] text-muted-foreground block mt-0.5">{t.desc}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <strong className="text-xs font-bold text-foreground">Accent Color Theme</strong>
                <div className="flex gap-3">
                  {[
                    { id: 'emerald', label: 'FixFlow Emerald', bg: 'bg-[#8FBF5C]' },
                    { id: 'blue', label: 'Sapphire Blue', bg: 'bg-blue-500' },
                    { id: 'violet', label: 'Cyber Violet', bg: 'bg-violet-500' },
                    { id: 'amber', label: 'Sunset Amber', bg: 'bg-amber-500' },
                  ].map((c) => (
                    <button
                      key={c.id}
                      onClick={() => {
                        setAccentColor(c.id);
                        toast.success(`Selected ${c.label} color theme`);
                      }}
                      className={`flex items-center gap-2 px-3 py-2 rounded-xl border text-xs font-semibold ${
                        accentColor === c.id ? 'border-primary bg-accent' : 'border-border bg-card'
                      }`}
                    >
                      <span className={`w-3.5 h-3.5 rounded-full ${c.bg}`} />
                      {c.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <strong className="text-xs font-bold text-foreground">Workbench Density</strong>
                <div className="flex gap-3">
                  {['comfortable', 'compact'].map((d) => (
                    <button
                      key={d}
                      onClick={() => {
                        setLayoutDensity(d);
                        toast.success(`Density set to ${d}`);
                      }}
                      className={`capitalize px-4 py-2 rounded-xl border text-xs font-semibold ${
                        layoutDensity === d ? 'border-primary bg-accent' : 'border-border bg-card'
                      }`}
                    >
                      {d} Layout
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <div className="setting-toggle">
                  <div>
                    <strong>Audio chime on milestone completion</strong>
                    <span>Play a subtle notification chime when a job is marked "Ready for Collection".</span>
                  </div>
                  <input type="checkbox" checked={soundChime} onChange={(e) => setSoundChime(e.target.checked)} className="w-4 h-4" />
                </div>
                <div className="setting-toggle">
                  <div>
                    <strong>Liquid UI smooth transitions</strong>
                    <span>Enable fluid animations and glassmorphism hover effects.</span>
                  </div>
                  <input type="checkbox" checked={smoothTransitions} onChange={(e) => setSmoothTransitions(e.target.checked)} className="w-4 h-4" />
                </div>
              </div>

              <Button onClick={() => handleSave('Appearance Preferences')}>Save Appearance Settings</Button>
            </div>
          )}
        </section>
      </div>

      {/* Add Staff Dialog */}
      <Dialog open={addStaffOpen} onOpenChange={setAddStaffOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Team Member</DialogTitle>
            <DialogDescription>Create a new staff account with specific store access privileges.</DialogDescription>
          </DialogHeader>
          <div className="modal-fields space-y-3">
            <label>
              Full Name
              <input value={newStaffName} onChange={(e) => setNewStaffName(e.target.value)} placeholder="e.g. Ramesh Chandra" />
            </label>
            <label>
              Email Address
              <input value={newStaffEmail} onChange={(e) => setNewStaffEmail(e.target.value)} placeholder="e.g. ramesh@abcmobile.example" />
            </label>
            <label>
              Mobile Number
              <input value={newStaffPhone} onChange={(e) => setNewStaffPhone(e.target.value)} placeholder="e.g. +91 98765 43215" />
            </label>
            <label>
              Role & Permissions
              <select value={newStaffRole} onChange={(e) => setNewStaffRole(e.target.value)}>
                <option value="Senior Technician">Senior Technician (Repairs & Parts)</option>
                <option value="Junior Technician">Junior Technician (Diagnostics Bench)</option>
                <option value="Front Desk & Billing">Front Desk & Billing (Intake & POS)</option>
                <option value="Store Manager">Store Manager (Full Admin Privileges)</option>
              </select>
            </label>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAddStaffOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddStaff}>Add Staff</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
