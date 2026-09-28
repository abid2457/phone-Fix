import { Link } from '@tanstack/react-router';
import { useState } from 'react';
import {
  Camera,
  CreditCard,
  BellRing,
  Check,
  CheckCircle2,
  ChevronDown,
  Clock,
  Download,
  IndianRupee,
  Mail,
  MessageCircle,
  MoreHorizontal,
  Phone,
  Plus,
  Printer,
  ShieldCheck,
  Smartphone,
  Upload,
  User,
  Wrench,
} from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAppStore, statusOptions } from '@/lib/app-store';
import { money } from '@/lib/formatters';
import { NextAction, StatusBadge } from './common';
import type { Job } from '@/lib/types';

export function JobDetails({ id }: { id: string }) {
  const { jobs, updateJob, parts } = useAppStore();
  const job = jobs.find((j) => j.id === id);
  const [payOpen, setPayOpen] = useState(false);
  const [statusOpen, setStatusOpen] = useState(false);
  const [partOpen, setPartOpen] = useState(false);
  const [photoOpen, setPhotoOpen] = useState(false);
  const [payment, setPayment] = useState('1000');
  const [payMethod, setPayMethod] = useState('UPI');
  const [selectedPartId, setSelectedPartId] = useState<string>('');

  if (!job) {
    return (
      <div className="empty-state p-12 text-center">
        <h2>Job not found</h2>
        <p className="text-muted-foreground my-4">
          The requested repair ticket <span className="font-mono font-bold">{id}</span> does not exist or may have been removed.
        </p>
        <Link className="btn btn-outline" to="/jobs">
          Back to all jobs
        </Link>
      </div>
    );
  }

  const balance = Math.max(0, job.amount - job.paid);
  const send = (channel: string) =>
    toast.success('Message Sent', {
      description: `${channel} notification to ${job.customer} (${job.phone}) simulated successfully.`,
    });

  const handleApproveEstimate = () => {
    updateJob(job.id, {
      status: 'Repairing',
      nextAction: 'Technician to commence hardware replacement',
    });
    toast.success('Estimate Approved', {
      description: `Job ${job.id} approved by customer. Moved to Repairing.`,
    });
  };

  const handleRecordPayment = () => {
    const payNum = Number(payment) || 0;
    if (payNum <= 0) {
      toast.error('Please enter a valid payment amount');
      return;
    }
    const newPaid = Math.min(job.amount, job.paid + payNum);
    const newPaymentStatus = newPaid >= job.amount ? 'Paid' : 'Partial';
    updateJob(job.id, {
      paid: newPaid,
      payment: newPaymentStatus,
    });
    setPayOpen(false);
    toast.success('Payment Recorded', {
      description: `${money(payNum)} via ${payMethod} recorded for ${job.id}. Remaining: ${money(
        Math.max(0, job.amount - newPaid),
      )}.`,
    });
  };

  const handleAddPartToJob = () => {
    const part = parts.find((p) => p.id === selectedPartId) || parts[0];
    if (part) {
      toast.success('Part Allocated', {
        description: `${part.name} (${part.sku}) allocated to job ${job.id}.`,
      });
    }
    setPartOpen(false);
  };

  return (
    <>
      <div className="detail-header">
        <div className="detail-title">
          <Link to="/jobs">Service Jobs</Link>
          <span>/</span>
          <span className="mono">{job.id}</span>
          <div className="detail-main">
            <div>
              <div className="detail-status">
                <StatusBadge status={job.status} />
                {job.warranty && (
                  <span className="warranty-badge">
                    <ShieldCheck className="h-3.5 w-3.5" />
                    Warranty job
                  </span>
                )}
              </div>
              <h1>{job.device}</h1>
              <p>
                {job.customer} · {job.phone}
              </p>
            </div>
            <div className="detail-price">
              <strong>{money(job.amount)}</strong>
              <span className={balance === 0 ? 'text-emerald-500 font-medium' : ''}>
                {balance === 0 ? 'Fully Paid' : `Balance ${money(balance)}`}
              </span>
            </div>
          </div>
        </div>
        <div className="detail-actions">
          <Button variant="outline" onClick={() => window.print()}>
            <Printer className="mr-1.5 h-4 w-4" />
            Print
          </Button>
          <Button variant="outline" onClick={() => send('WhatsApp')}>
            <MessageCircle className="mr-1.5 h-4 w-4" />
            Send Message
          </Button>
          <Button onClick={() => setStatusOpen(true)}>
            Update Status
            <ChevronDown className="ml-1.5 h-4 w-4" />
          </Button>
        </div>
      </div>

      <NextAction>{job.nextAction}</NextAction>

      {job.status === 'Ready for Collection' && (
        <section className="communication-banner">
          <div className="communication-icon">
            <BellRing />
          </div>
          <div>
            <strong>Customer hasn&apos;t been notified</strong>
            <span>Let {job.customer} know the repair is ready for collection at the counter.</span>
          </div>
          <button onClick={() => send('WhatsApp')}>
            <MessageCircle className="h-4 w-4 mr-1 inline" />
            Send WhatsApp
          </button>
          <button onClick={() => send('Email')}>
            <Mail className="h-4 w-4 mr-1 inline" />
            Send Email
          </button>
        </section>
      )}

      <div className="details-layout">
        <div>
          <section className="panel identity-card">
            <div className="identity-block">
              <div className="identity-icon">
                <User />
              </div>
              <div>
                <span>Customer</span>
                <h3>{job.customer}</h3>
                <p>
                  <Phone className="h-3.5 w-3.5 inline mr-1 text-muted-foreground" /> {job.phone}
                </p>
                <p>
                  <Mail className="h-3.5 w-3.5 inline mr-1 text-muted-foreground" />{' '}
                  {job.customer.toLowerCase().replace(/\s/g, '.')}@example.com
                </p>
              </div>
            </div>
            <div className="identity-block">
              <div className="identity-icon">
                <Smartphone />
              </div>
              <div>
                <span>Device Details</span>
                <h3>
                  {job.brand} {job.device}
                </h3>
                <p className="mono">IMEI {job.imei}</p>
                <p>Natural Titanium · 256 GB</p>
              </div>
            </div>
          </section>

          <Tabs defaultValue="overview" className="details-tabs">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="diagnosis">Diagnosis</TabsTrigger>
              <TabsTrigger value="parts">Parts</TabsTrigger>
              <TabsTrigger value="labour">Labour</TabsTrigger>
              <TabsTrigger value="estimate">Estimate</TabsTrigger>
              <TabsTrigger value="payments">Payments</TabsTrigger>
              <TabsTrigger value="photos">Photos</TabsTrigger>
              <TabsTrigger value="messages">Messages</TabsTrigger>
              <TabsTrigger value="activity">Activity</TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <Overview job={job} />
            </TabsContent>
            <TabsContent value="diagnosis">
              <InfoPanel
                title="Technician diagnosis"
                items={[
                  ['Reported problem', job.complaint],
                  ['Fault found', 'Charging port flex has corrosion and inconsistent voltage delivery.'],
                  ['Recommended solution', 'Replace charging port flex and perform a full power-cycle test.'],
                  ['Technician', `${job.technician} · 24 Sep 2026`],
                ]}
              />
            </TabsContent>
            <TabsContent value="parts">
              <Parts amount={job.amount} onAddPart={() => setPartOpen(true)} />
            </TabsContent>
            <TabsContent value="labour">
              <InfoPanel
                title="Labour & services"
                items={[
                  ['Charging port replacement', '₹800'],
                  ['Internal cleaning & diagnostics', '₹500'],
                  ['Labour total', '₹1,300'],
                ]}
              />
            </TabsContent>
            <TabsContent value="estimate">
              <Estimate amount={job.amount} onApprove={handleApproveEstimate} />
            </TabsContent>
            <TabsContent value="payments">
              <Payments job={job} onAdd={() => setPayOpen(true)} />
            </TabsContent>
            <TabsContent value="photos">
              <Photos onUpload={() => setPhotoOpen(true)} />
            </TabsContent>
            <TabsContent value="messages">
              <Messages send={send} />
            </TabsContent>
            <TabsContent value="activity">
              <Activity />
            </TabsContent>
          </Tabs>
        </div>

        <aside className="timeline-panel">
          <span className="section-kicker">Progress</span>
          <h2>Job timeline</h2>
          {[
            'Received',
            'Diagnosis',
            'Estimate Approved',
            'Repairing',
            'Quality Check',
            'Ready for Collection',
            'Delivered',
          ].map((s, i) => (
            <div className={`timeline-step ${i < 6 ? 'done' : ''}`} key={s}>
              <span>{i < 6 ? <Check className="h-3 w-3" /> : null}</span>
              <div>
                <strong>{s}</strong>
                <small>
                  {i < 6
                    ? '24 Sep 2026 · ' +
                      ['09:20 AM', '10:15 AM', '11:20 AM', '02:10 PM', '04:55 PM', '05:30 PM'][i]
                    : 'Pending'}
                </small>
                {i < 6 && <em>Updated by {i > 2 ? job.technician : 'Admin'}</em>}
              </div>
            </div>
          ))}
        </aside>
      </div>

      {/* Payment Modal */}
      <Dialog open={payOpen} onOpenChange={setPayOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Record Payment</DialogTitle>
            <DialogDescription>
              Job: <span className="font-mono font-bold">{job.id}</span> · Balance due: {money(balance)}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3 py-2">
            <label className="block text-xs font-medium text-muted-foreground">
              Amount (₹) *
              <input
                type="number"
                className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                value={payment}
                onChange={(e) => setPayment(e.target.value)}
              />
            </label>
            <label className="block text-xs font-medium text-muted-foreground">
              Payment Method
              <select
                className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                value={payMethod}
                onChange={(e) => setPayMethod(e.target.value)}
              >
                <option>UPI (Google Pay / PhonePe / Paytm)</option>
                <option>Cash</option>
                <option>Credit / Debit Card</option>
                <option>Bank Transfer / NEFT</option>
              </select>
            </label>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setPayOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleRecordPayment}>Record {money(Number(payment) || 0)}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Update Status Modal */}
      <Dialog open={statusOpen} onOpenChange={setStatusOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Job Status</DialogTitle>
            <DialogDescription>
              Move repair ticket <span className="font-mono font-bold">{job.id}</span> to the next workflow stage.
            </DialogDescription>
          </DialogHeader>
          <div className="status-options grid grid-cols-2 gap-2 py-3">
            {statusOptions.map((s) => (
              <button
                key={s}
                type="button"
                className={`p-3 rounded-lg border text-left flex items-center justify-between hover:bg-muted transition-colors ${
                  job.status === s ? 'border-primary bg-primary/5' : 'border-border'
                }`}
                onClick={() => {
                  let next = 'Review and continue workflow';
                  if (s === 'Ready for Collection') next = 'Customer Collection & Final Invoice';
                  if (s === 'Delivered') next = 'Repair completed & handed over';
                  if (s === 'Repairing') next = 'Technician performing repair work';
                  if (s === 'Waiting Parts') next = 'Awaiting spare parts arrival';
                  if (s === 'Quality Check') next = 'Final quality inspection and testing';

                  updateJob(job.id, {
                    status: s,
                    nextAction: next,
                  });
                  setStatusOpen(false);
                  toast.success('Status Updated', {
                    description: `${job.id} is now ${s}.`,
                  });
                }}
              >
                <StatusBadge status={s} />
                {job.status === s && <Check className="h-4 w-4 text-primary" />}
              </button>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      {/* Add Part Modal */}
      <Dialog open={partOpen} onOpenChange={setPartOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Allocate Inventory Part</DialogTitle>
            <DialogDescription>
              Select an available spare part from inventory for job {job.id}.
            </DialogDescription>
          </DialogHeader>
          <div className="py-2 space-y-3">
            <label className="block text-xs font-medium text-muted-foreground">
              Select Part SKU
              <select
                className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                value={selectedPartId}
                onChange={(e) => setSelectedPartId(e.target.value)}
              >
                {parts.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} ({p.sku}) — Stock: {p.stock} — {money(p.price)}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setPartOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddPartToJob}>Allocate to Job</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Upload Photo Modal */}
      <Dialog open={photoOpen} onOpenChange={setPhotoOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Upload Repair Photos</DialogTitle>
            <DialogDescription>
              Attach photographic evidence of physical condition, pre-service faults, or post-repair testing.
            </DialogDescription>
          </DialogHeader>
          <div className="p-6 border-2 border-dashed border-border rounded-lg text-center space-y-2">
            <Upload className="h-8 w-8 mx-auto text-muted-foreground" />
            <p className="text-sm font-medium">Drag and drop device photos here</p>
            <p className="text-xs text-muted-foreground">Supports JPG, PNG, WEBP up to 10MB</p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setPhotoOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                setPhotoOpen(false);
                toast.success('Photo Uploaded', {
                  description: 'Repair photo uploaded and attached to job history.',
                });
              }}
            >
              Upload Photo
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

function Overview({ job }: { job: Job }) {
  return (
    <div className="overview-grid">
      <InfoPanel
        title="Service summary"
        items={[
          ['Customer complaint', job.complaint],
          ['Technician diagnosis', 'Charging port assembly requires replacement.'],
          ['Device condition', 'Minor frame scratches; screen intact.'],
          ['Accessories', 'Charger, USB-C cable'],
        ]}
      />
      <InfoPanel
        title="Delivery & coverage"
        items={[
          ['Assigned technician', job.technician],
          ['Expected delivery', '24 Sep 2026 · 06:30 PM'],
          ['Warranty', '30 days service warranty'],
          ['Warranty until', '24 Oct 2026'],
        ]}
      />
      <section className="panel notes-card">
        <span>Technician notes</span>
        <p>
          Internal moisture indicators are clear. Battery health is at 86%. Complete charging cycle test
          before final counter handover.
        </p>
      </section>
    </div>
  );
}

function InfoPanel({ title, items }: { title: string; items: string[][] }) {
  return (
    <section className="panel info-panel">
      <div className="panel-head flex items-center justify-between">
        <h3>{title}</h3>
        <button
          type="button"
          className="icon-btn"
          onClick={() => toast.info(`${title} options`)}
        >
          <MoreHorizontal className="h-4 w-4" />
        </button>
      </div>
      {items.map(([a, b]) => (
        <div className="info-row" key={a}>
          <span>{a}</span>
          <strong>{b}</strong>
        </div>
      ))}
    </section>
  );
}

function Parts({ amount, onAddPart }: { amount: number; onAddPart: () => void }) {
  const partsAmount = Math.max(1000, amount - 1300);
  return (
    <section className="panel info-panel">
      <div className="panel-head flex items-center justify-between">
        <h3>Parts used</h3>
        <Button size="sm" onClick={onAddPart}>
          <Plus className="mr-1 h-3.5 w-3.5" />
          Add Part
        </Button>
      </div>
      <div className="parts-row">
        <div>
          <strong>Original Charging Port Flex</strong>
          <span className="mono">CHG-IP15P-001</span>
        </div>
        <span>1 × {money(partsAmount)}</span>
        <strong>{money(partsAmount)}</strong>
      </div>
      <div className="total-row">
        <span>Parts total</span>
        <strong>{money(partsAmount)}</strong>
      </div>
    </section>
  );
}

function Estimate({ amount, onApprove }: { amount: number; onApprove: () => void }) {
  const pre = Math.round(amount / 1.18);
  const gst = amount - pre;
  return (
    <section className="panel estimate-panel">
      <div className="panel-head flex items-center justify-between">
        <div>
          <span className="section-kicker">EST-2026-00982</span>
          <h3>Repair estimate</h3>
        </div>
        <StatusBadge status="Waiting Approval" />
      </div>
      <div className="bill-lines">
        <span>
          Parts <b>{money(pre - 1000)}</b>
        </span>
        <span>
          Labour <b>₹1,300</b>
        </span>
        <span>
          Discount <b>−₹300</b>
        </span>
        <span>
          Subtotal <b>{money(pre)}</b>
        </span>
        <span>
          GST 18% <b>{money(gst)}</b>
        </span>
        <strong>
          Total <b>{money(amount)}</b>
        </strong>
      </div>
      <div className="panel-actions flex items-center gap-2 mt-4">
        <Button variant="outline" onClick={() => window.print()}>
          <Printer className="mr-1.5 h-4 w-4" />
          Print Estimate
        </Button>
        <Button onClick={onApprove}>
          <CheckCircle2 className="mr-1.5 h-4 w-4" />
          Mark Approved
        </Button>
      </div>
    </section>
  );
}

function Payments({ job, onAdd }: { job: Job; onAdd: () => void }) {
  return (
    <section className="panel info-panel">
      <div className="payment-metrics">
        <div>
          <span>Total</span>
          <strong>{money(job.amount)}</strong>
        </div>
        <div>
          <span>Paid</span>
          <strong className="success-text">{money(job.paid)}</strong>
        </div>
        <div>
          <span>Balance</span>
          <strong className={job.amount - job.paid === 0 ? 'text-emerald-500' : ''}>
            {money(job.amount - job.paid)}
          </strong>
        </div>
        <Button onClick={onAdd}>
          <IndianRupee className="mr-1.5 h-4 w-4" />
          Add Payment
        </Button>
      </div>
      <div className="history-row">
        <div className="history-icon">
          <CreditCard />
        </div>
        <div>
          <strong>UPI payment</strong>
          <span>24 Sep 2026 · 03:42 PM</span>
        </div>
        <b>{money(job.paid)}</b>
      </div>
    </section>
  );
}

function Photos({ onUpload }: { onUpload: () => void }) {
  return (
    <section className="panel info-panel">
      <div className="panel-head flex items-center justify-between">
        <h3>Repair photos</h3>
        <Button size="sm" onClick={onUpload}>
          <Plus className="mr-1 h-3.5 w-3.5" />
          Upload Photos
        </Button>
      </div>
      <div className="photo-grid">
        {['Before repair', 'Device condition', 'During repair', 'After repair'].map((x, i) => (
          <button
            type="button"
            className="photo-card cursor-pointer hover:border-primary/50 transition-all"
            key={x}
            onClick={() => toast.info(`Viewing ${x} photo`, { description: 'Full resolution inspection view.' })}
          >
            <div>
              <Camera />
            </div>
            <strong>{x}</strong>
            <span>{i < 2 ? '24 Sep 2026 · Admin' : 'No photo yet'}</span>
          </button>
        ))}
      </div>
    </section>
  );
}

function Messages({ send }: { send: (c: string) => void }) {
  return (
    <section className="panel info-panel">
      <div className="panel-head flex items-center justify-between">
        <h3>Customer messages</h3>
        <Button size="sm" onClick={() => send('WhatsApp')}>
          <MessageCircle className="mr-1 h-3.5 w-3.5" />
          Send Message
        </Button>
      </div>
      {[
        ['WhatsApp', 'Your device has been received.', '09:25 AM'],
        ['Email', 'Your repair estimate is ready.', '11:32 AM'],
        ['WhatsApp', 'Your device is ready for collection.', 'Not sent'],
      ].map(([c, m, t], i) => (
        <div className="message-row" key={m}>
          <div className="message-icon">{c === 'Email' ? <Mail /> : <MessageCircle />}</div>
          <div>
            <strong>
              {c} {i < 2 && <em>✓ Sent</em>}
            </strong>
            <p>&ldquo;{m}&rdquo;</p>
          </div>
          <span>{t}</span>
        </div>
      ))}
    </section>
  );
}

function Activity() {
  return (
    <section className="panel info-panel">
      <h3>Activity Log</h3>
      {[
        'Admin marked job as Ready for Collection',
        'Technician completed quality check',
        'Technician completed repair',
        'Part added to job',
        'Estimate approved',
        'Job received at service counter',
      ].map((a, i) => (
        <div className="activity-row" key={a}>
          <Clock className="h-4 w-4 text-muted-foreground" />
          <div>
            <strong>{a}</strong>
            <span>
              {i < 5 ? 'Today' : 'Yesterday'} ·{' '}
              {['05:30 PM', '04:55 PM', '04:20 PM', '02:10 PM', '11:20 AM', '06:30 PM'][i]}
            </span>
          </div>
        </div>
      ))}
    </section>
  );
}
