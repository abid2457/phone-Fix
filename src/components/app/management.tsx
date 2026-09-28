import { useMemo, useState } from 'react';
import { Link, useNavigate } from '@tanstack/react-router';
import {
  BarChart3,
  Bell,
  Box,
  Building2,
  Check,
  ChevronRight,
  CircleDollarSign,
  CreditCard,
  Download,
  FileSpreadsheet,
  IndianRupee,
  Mail,
  MessageCircle,
  Package,
  Phone,
  Plus,
  Search,
  Settings2,
  Smartphone,
  Store,
  TrendingUp,
  Users,
  Wrench,
} from 'lucide-react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
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
import { PageIntro, MetricCard, StatusBadge } from './common';
import { useAppStore } from '@/lib/app-store';
import { invoices } from '@/lib/mock-data';
import { money } from '@/lib/formatters';
import type { Customer, Part, StoreLocation, Technician } from '@/lib/types';

export function Customers() {
  const { customers, addCustomer } = useAppStore();
  const [q, setQ] = useState('');
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('Vellore');
  const navigate = useNavigate();

  const rows = customers.filter((c) =>
    `${c.name} ${c.phone} ${c.city} ${c.email}`.toLowerCase().includes(q.toLowerCase()),
  );

  const handleSave = () => {
    if (!name.trim()) {
      toast.error('Customer name is required');
      return;
    }
    const newCustomer: Customer = {
      id: `CUS-${String(customers.length + 1).padStart(3, '0')}`,
      name: name.trim(),
      phone: phone.startsWith('+91') ? phone.trim() : `+91 ${phone.trim() || '9876543210'}`,
      email: email.trim() || `${name.toLowerCase().replace(/\s+/g, '.')}@example.com`,
      city: city.trim() || 'Vellore',
      totalJobs: 0,
      activeJobs: 0,
      totalSpent: 0,
      lastVisit: 'Just now',
      devices: [],
    };
    addCustomer(newCustomer);
    setOpen(false);
    setName('');
    setPhone('');
    setEmail('');
    toast.success('Customer Added', {
      description: `${newCustomer.name} (${newCustomer.id}) has been added to customer directory.`,
    });
  };

  return (
    <>
      <PageIntro
        eyebrow="Relationships"
        title="Customers"
        description="View service history, devices, payments, and every conversation."
        actions={
          <Button onClick={() => setOpen(true)}>
            <Plus className="mr-1.5 h-4 w-4" />
            Add Customer
          </Button>
        }
      />
      <SearchBar q={q} setQ={setQ} placeholder="Search by name, mobile number, or city..." />
      <section className="panel table-panel">
        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th>Customer Name</th>
                <th>Mobile</th>
                <th>Email</th>
                <th>Total Jobs</th>
                <th>Active</th>
                <th>Last Visit</th>
                <th>Total Spent</th>
              </tr>
            </thead>
            <tbody>
              {rows.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-8 text-muted-foreground">
                    No customers match your search query.
                  </td>
                </tr>
              ) : (
                rows.map((c) => (
                  <tr
                    key={c.id}
                    className="cursor-pointer hover:bg-muted/40 transition-colors"
                    onClick={() => navigate({ to: '/customers/$id', params: { id: c.id } })}
                  >
                    <td>
                      <strong>{c.name}</strong>
                      <small className="block text-xs text-muted-foreground">{c.city}</small>
                    </td>
                    <td>{c.phone}</td>
                    <td>{c.email}</td>
                    <td>
                      <span className="font-semibold">{c.totalJobs}</span>
                    </td>
                    <td>
                      {c.activeJobs > 0 ? (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-amber-500/10 text-amber-500">
                          {c.activeJobs} Active
                        </span>
                      ) : (
                        <span className="text-muted-foreground text-xs">0</span>
                      )}
                    </td>
                    <td>{c.lastVisit}</td>
                    <td>
                      <strong>{money(c.totalSpent)}</strong>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Customer</DialogTitle>
            <DialogDescription>
              Create a customer profile for repair tracking and communication.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3 py-2">
            <label className="block text-xs font-medium text-muted-foreground">
              Full Name *
              <input
                className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                placeholder="e.g. Anand Kumar"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </label>
            <label className="block text-xs font-medium text-muted-foreground">
              Mobile Number *
              <input
                className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                placeholder="e.g. 98401 23456"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </label>
            <label className="block text-xs font-medium text-muted-foreground">
              Email Address
              <input
                className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                placeholder="e.g. anand@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
            <label className="block text-xs font-medium text-muted-foreground">
              City / Store Location
              <input
                className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                placeholder="e.g. Vellore"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </label>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>Create Customer</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

export function CustomerProfile({ id }: { id: string }) {
  const { customers, jobs } = useAppStore();
  const c = customers.find((x) => x.id === id) ?? customers[0];

  if (!c) return <div className="p-8 text-center">Customer not found</div>;
  const history = jobs.filter((j) => j.customerId === c.id || j.customer === c.name);

  return (
    <>
      <PageIntro
        eyebrow={c.id}
        title={c.name}
        description={`${c.phone} · ${c.email}`}
        actions={
          <Link to="/jobs/new" className="btn btn-primary inline-flex items-center gap-1.5">
            <Plus className="h-4 w-4" />
            New Job
          </Link>
        }
      />
      <section className="metrics-grid compact">
        <MetricCard label="Total Jobs" value={String(c.totalJobs || history.length)} detail="Lifetime visits" icon={Wrench} />
        <MetricCard
          label="Completed"
          value={String(Math.max(0, (c.totalJobs || history.length) - c.activeJobs))}
          detail="Successfully delivered"
          icon={Check}
          tone="green"
        />
        <MetricCard
          label="Active"
          value={String(c.activeJobs)}
          detail="Currently in service"
          icon={Smartphone}
          tone="amber"
        />
        <MetricCard
          label="Total Spent"
          value={money(c.totalSpent || history.reduce((a, j) => a + j.paid, 0))}
          detail={`Last visit ${c.lastVisit}`}
          icon={IndianRupee}
          tone="cyan"
        />
      </section>

      <div className="dashboard-grid">
        <section className="panel info-panel">
          <h3>Registered Devices</h3>
          {c.devices && c.devices.length > 0 ? (
            c.devices.map((d, i) => (
              <div className="device-history" key={d}>
                <Smartphone className="h-5 w-5 text-muted-foreground" />
                <div>
                  <strong>{d}</strong>
                  <span>IMEI •••• {4210 + i}</span>
                  <small>{i === 0 ? 'Charging Port Replacement · 24 Sep 2026' : 'Battery Replacement · 12 Mar 2026'}</small>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground ml-auto" />
              </div>
            ))
          ) : (
            <div className="p-4 text-sm text-muted-foreground">
              {history.length > 0 ? (
                history.map((j) => (
                  <div className="device-history" key={j.id}>
                    <Smartphone className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <strong>{j.device}</strong>
                      <span className="mono">IMEI {j.imei}</span>
                      <small>{j.complaint}</small>
                    </div>
                  </div>
                ))
              ) : (
                <p>No devices currently registered under this profile.</p>
              )}
            </div>
          )}
        </section>

        <section className="panel info-panel">
          <h3>Contact Details</h3>
          {[
            ['Mobile', c.phone],
            ['Email', c.email],
            ['City', c.city],
            ['Last service', c.lastVisit],
          ].map((x) => (
            <div className="info-row" key={x[0]}>
              <span>{x[0]}</span>
              <strong>{x[1]}</strong>
            </div>
          ))}
        </section>
      </div>

      <section className="panel info-panel">
        <h3>Repair History</h3>
        {history.length > 0 ? (
          history.map((j) => (
            <Link
              to="/jobs/$id"
              params={{ id: j.id }}
              className="history-row block hover:bg-muted/30 transition-colors p-3 rounded-lg"
              key={j.id}
            >
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-3">
                  <Smartphone className="h-5 w-5 text-primary" />
                  <div>
                    <strong>
                      {j.device} · {j.complaint}
                    </strong>
                    <span className="block text-xs text-muted-foreground">
                      {j.id} · {j.created} · Technician: {j.technician}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <strong className="text-sm">{money(j.amount)}</strong>
                  <StatusBadge status={j.status} />
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </div>
              </div>
            </Link>
          ))
        ) : (
          <p className="muted-copy py-4">No linked repair history in this customer record.</p>
        )}
      </section>
    </>
  );
}

export function Technicians() {
  const { technicians, addTechnician } = useAppStore();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [specialization, setSpecialization] = useState('iPhone & Apple Watch Specialist');

  const handleSave = () => {
    if (!name.trim()) {
      toast.error('Technician name is required');
      return;
    }
    const initials = name
      .trim()
      .split(' ')
      .map((w) => w[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);

    const newTech: Technician = {
      id: `TEC-${String(technicians.length + 1).padStart(3, '0')}`,
      name: name.trim(),
      initials: initials || 'TC',
      specialization: specialization.trim() || 'Smartphones & Tablets',
      activeJobs: 0,
      completed: 0,
      success: 100,
      rating: 5.0,
      status: 'Available',
    };
    addTechnician(newTech);
    setOpen(false);
    setName('');
    toast.success('Technician Added', {
      description: `${newTech.name} has been added to workshop roster.`,
    });
  };

  return (
    <>
      <PageIntro
        eyebrow="Workshop team"
        title="Technicians"
        description="Balance workloads, monitor repair benchmarks, and maintain high service quality."
        actions={
          <Button onClick={() => setOpen(true)}>
            <Plus className="mr-1.5 h-4 w-4" />
            Add Technician
          </Button>
        }
      />
      <div className="technician-grid">
        {technicians.map((t) => (
          <Link
            to="/technicians/$id"
            params={{ id: t.id }}
            className="technician-card block hover:border-primary/50 transition-all cursor-pointer"
            key={t.id}
          >
            <div className="technician-head">
              <div className="avatar large">{t.initials}</div>
              <StatusBadge
                status={
                  t.status === 'Available'
                    ? 'Paid'
                    : t.status === 'Busy'
                    ? 'Partial'
                    : 'Pending'
                }
              />
            </div>
            <h3>{t.name}</h3>
            <p>{t.specialization}</p>
            <div className="tech-stats">
              <span>
                <b>{t.activeJobs}</b>Active Jobs
              </span>
              <span>
                <b>{t.completed}</b>Completed
              </span>
              <span>
                <b>★ {t.rating}</b>Rating
              </span>
            </div>
            <div className="progress-label">
              <span>Completion rate</span>
              <b>{t.success}%</b>
            </div>
            <div className="progress">
              <i style={{ width: `${t.success}%` }} />
            </div>
          </Link>
        ))}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Technician</DialogTitle>
            <DialogDescription>
              Add a service engineer or repair technician to your active workshop team.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3 py-2">
            <label className="block text-xs font-medium text-muted-foreground">
              Technician Full Name *
              <input
                className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                placeholder="e.g. Suresh Kumar"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </label>
            <label className="block text-xs font-medium text-muted-foreground">
              Specialization / Skills
              <input
                className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                placeholder="e.g. Motherboard & Chip-Level Repair"
                value={specialization}
                onChange={(e) => setSpecialization(e.target.value)}
              />
            </label>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>Add Technician</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

export function TechnicianWorkspace({ id }: { id: string }) {
  const { technicians, jobs, updateJob } = useAppStore();
  const t = technicians.find((x) => x.id === id) ?? technicians[0];
  if (!t) return <div className="p-8 text-center">Technician not found</div>;

  const myJobs = jobs.filter((j) => j.technician === t.name);

  return (
    <>
      <PageIntro
        eyebrow="Technician workspace"
        title={t.name}
        description={`${t.specialization} · ${myJobs.length} active assignments · ★ ${t.rating} rating`}
      />
      <div className="workspace-stats">
        {[
          ['Assigned Jobs', myJobs.length],
          ['In Diagnosis', myJobs.filter((j) => j.status === 'Diagnosis').length],
          ['In Repair', myJobs.filter((j) => j.status === 'Repairing').length],
          ['Quality Check', myJobs.filter((j) => j.status === 'Quality Check').length],
          ['Completed', t.completed],
        ].map(([s, count]) => (
          <div key={s as string}>
            <span>{s}</span>
            <strong>{count}</strong>
          </div>
        ))}
      </div>
      <div className="technician-jobs">
        {myJobs.length === 0 ? (
          <div className="panel p-8 text-center text-muted-foreground col-span-full">
            No active repair tickets currently assigned to {t.name}.
          </div>
        ) : (
          myJobs.map((job) => (
            <article className="bench-card" key={job.id}>
              <div>
                <span className="mono">{job.id}</span>
                <StatusBadge status={job.status} />
              </div>
              <h3>{job.device}</h3>
              <p>{job.complaint}</p>
              <div className="bench-meta">
                <span>{job.priority} priority</span>
                <span>Due 05:30 PM</span>
              </div>
              <div className="flex items-center gap-2 mt-3">
                <Link
                  to="/jobs/$id"
                  params={{ id: job.id }}
                  className="btn btn-outline text-xs flex-1 text-center"
                >
                  Open Job
                </Link>
                {job.status !== 'Repairing' && job.status !== 'Completed' && job.status !== 'Delivered' && (
                  <Button
                    size="sm"
                    className="flex-1"
                    onClick={() => {
                      updateJob(job.id, {
                        status: 'Repairing',
                        nextAction: 'Perform hardware replacement and diagnosis',
                      });
                      toast.success('Repair Started', {
                        description: `${job.id} moved to Repairing stage.`,
                      });
                    }}
                  >
                    Start Repair
                  </Button>
                )}
                {job.status === 'Repairing' && (
                  <Button
                    size="sm"
                    variant="secondary"
                    className="flex-1"
                    onClick={() => {
                      updateJob(job.id, {
                        status: 'Quality Check',
                        nextAction: 'Final QC and function check before delivery',
                      });
                      toast.success('Moved to Quality Check', {
                        description: `${job.id} ready for final QC.`,
                      });
                    }}
                  >
                    Quality Check
                  </Button>
                )}
              </div>
            </article>
          ))
        )}
      </div>
    </>
  );
}

export function Inventory() {
  const { parts, addPart } = useAppStore();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [sku, setSku] = useState('');
  const [category, setCategory] = useState('Displays');
  const [stock, setStock] = useState('5');
  const [minimum, setMinimum] = useState('2');
  const [cost, setCost] = useState('1500');
  const [price, setPrice] = useState('2500');
  const [supplier, setSupplier] = useState('Direct OEM Supply');

  const handleSave = () => {
    if (!name.trim()) {
      toast.error('Part name is required');
      return;
    }
    const newPart: Part = {
      id: `PRT-${String(parts.length + 1).padStart(3, '0')}`,
      name: name.trim(),
      sku: sku.trim() || `SKU-${Date.now().toString().slice(-6)}`,
      category: category.trim() || 'General',
      stock: Number(stock) || 0,
      minimum: Number(minimum) || 2,
      cost: Number(cost) || 500,
      price: Number(price) || 800,
      supplier: supplier.trim() || 'Local Supplier',
    };
    addPart(newPart);
    setOpen(false);
    setName('');
    setSku('');
    toast.success('Inventory Part Added', {
      description: `${newPart.name} (${newPart.sku}) added with initial stock of ${newPart.stock}.`,
    });
  };

  const totalUnits = parts.reduce((a, p) => a + p.stock, 0);
  const lowStockCount = parts.filter((p) => p.stock > 0 && p.stock <= p.minimum).length;
  const outOfStockCount = parts.filter((p) => p.stock === 0).length;
  const totalValue = parts.reduce((a, p) => a + p.cost * p.stock, 0);

  return (
    <>
      <PageIntro
        eyebrow="Parts control"
        title="Inventory"
        description="Track stock levels, purchase costs, margins, and parts that need immediate reordering."
        actions={
          <Button onClick={() => setOpen(true)}>
            <Plus className="mr-1.5 h-4 w-4" />
            Add Part
          </Button>
        }
      />
      <section className="metrics-grid compact">
        <MetricCard
          label="Total Units"
          value={String(totalUnits)}
          detail={`Across ${parts.length} unique SKUs`}
          icon={Package}
        />
        <MetricCard
          label="Low Stock"
          value={String(lowStockCount)}
          detail="Reorder recommended"
          icon={Box}
          tone="amber"
        />
        <MetricCard
          label="Out of Stock"
          value={String(outOfStockCount)}
          detail="Immediate action needed"
          icon={Box}
          tone="red"
        />
        <MetricCard
          label="Inventory Valuation"
          value={money(totalValue)}
          detail="At landed purchase cost"
          icon={IndianRupee}
          tone="green"
        />
      </section>

      <section className="panel table-panel">
        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th>Part Description</th>
                <th>SKU</th>
                <th>Category</th>
                <th>Stock</th>
                <th>Min Reorder</th>
                <th>Unit Cost</th>
                <th>Selling Price</th>
                <th>Supplier</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {parts.map((p) => (
                <tr key={p.id}>
                  <td>
                    <strong>{p.name}</strong>
                  </td>
                  <td className="mono">{p.sku}</td>
                  <td>{p.category}</td>
                  <td>
                    <strong>{p.stock}</strong>
                  </td>
                  <td>{p.minimum}</td>
                  <td>{money(p.cost)}</td>
                  <td>
                    <strong>{money(p.price)}</strong>
                  </td>
                  <td>{p.supplier}</td>
                  <td>
                    <span
                      className={`status-badge ${
                        p.stock === 0
                          ? 'status-danger'
                          : p.stock <= p.minimum
                          ? 'status-warning'
                          : 'status-success'
                      }`}
                    >
                      <i className="status-dot" />
                      {p.stock === 0
                        ? 'Out of Stock'
                        : p.stock <= p.minimum
                        ? 'Low Stock'
                        : 'In Stock'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Inventory SKU</DialogTitle>
            <DialogDescription>
              Register a spare part, display, or battery into workshop stock.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3 py-2">
            <div className="grid grid-cols-2 gap-3">
              <label className="block text-xs font-medium text-muted-foreground">
                Part Name *
                <input
                  className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  placeholder="e.g. iPhone 15 Pro OLED Display"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </label>
              <label className="block text-xs font-medium text-muted-foreground">
                SKU / Part Number
                <input
                  className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm mono"
                  placeholder="e.g. DSP-IP15P-OEM"
                  value={sku}
                  onChange={(e) => setSku(e.target.value)}
                />
              </label>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <label className="block text-xs font-medium text-muted-foreground">
                Category
                <select
                  className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option>Displays</option>
                  <option>Batteries</option>
                  <option>Charging Ports</option>
                  <option>Cameras</option>
                  <option>Back Glass</option>
                  <option>IC & Motherboard</option>
                  <option>General</option>
                </select>
              </label>
              <label className="block text-xs font-medium text-muted-foreground">
                Initial Stock
                <input
                  type="number"
                  className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                />
              </label>
              <label className="block text-xs font-medium text-muted-foreground">
                Min Threshold
                <input
                  type="number"
                  className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  value={minimum}
                  onChange={(e) => setMinimum(e.target.value)}
                />
              </label>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <label className="block text-xs font-medium text-muted-foreground">
                Cost Price (₹)
                <input
                  type="number"
                  className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  value={cost}
                  onChange={(e) => setCost(e.target.value)}
                />
              </label>
              <label className="block text-xs font-medium text-muted-foreground">
                Selling Price (₹)
                <input
                  type="number"
                  className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </label>
              <label className="block text-xs font-medium text-muted-foreground">
                Supplier
                <input
                  className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  value={supplier}
                  onChange={(e) => setSupplier(e.target.value)}
                />
              </label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>Save Part</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

export function Billing() {
  const { jobs } = useAppStore();

  const handleExportInvoices = () => {
    const headers = ['Invoice ID', 'Job ID', 'Customer', 'Amount', 'Payment Method', 'Date', 'Status'];
    const rows = invoices.map((inv) => [
      inv.id,
      inv.jobId,
      inv.customer,
      inv.amount,
      inv.payment,
      inv.date,
      inv.status,
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((e) => e.map((val) => `"${String(val).replace(/"/g, '""')}"`).join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `fixflow-invoices-${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success('Invoices Exported', {
      description: `Downloaded ${invoices.length} billing records as CSV.`,
    });
  };

  return (
    <>
      <PageIntro
        eyebrow="Finance"
        title="Billing"
        description="Monitor daily cash collections, open balances, invoice statuses, and settlement channels."
        actions={
          <Button variant="outline" onClick={handleExportInvoices}>
            <Download className="mr-1.5 h-4 w-4" />
            Export Invoices
          </Button>
        }
      />
      <section className="metrics-grid compact">
        <MetricCard
          label="Today's Revenue"
          value="₹35,500"
          detail="12 payments received"
          icon={IndianRupee}
        />
        <MetricCard
          label="Pending Payments"
          value="₹18,450"
          detail="6 open customer balances"
          icon={CreditCard}
          tone="amber"
        />
        <MetricCard
          label="Paid Invoices"
          value="18"
          detail="This billing cycle"
          icon={Check}
          tone="green"
        />
        <MetricCard
          label="Refunds & Adjustments"
          value="₹1,200"
          detail="1 transaction"
          icon={CircleDollarSign}
          tone="red"
        />
      </section>

      <section className="panel table-panel">
        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th>Invoice #</th>
                <th>Job ID</th>
                <th>Customer</th>
                <th>Amount</th>
                <th>Payment Mode</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((x) => (
                <tr key={x.id}>
                  <td className="mono">
                    <strong>{x.id}</strong>
                  </td>
                  <td className="mono">{x.jobId}</td>
                  <td>{x.customer}</td>
                  <td>
                    <strong>{money(x.amount)}</strong>
                  </td>
                  <td>
                    <StatusBadge status={x.payment} />
                  </td>
                  <td>{x.date}</td>
                  <td>
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-primary/10 text-primary">
                      {x.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}

export function Reports() {
  const [viewMetric, setViewMetric] = useState<'revenue' | 'jobs'>('revenue');
  const [selectedReport, setSelectedReport] = useState<string | null>(null);

  const data = [
    { m: 'Apr', revenue: 23000, jobs: 42 },
    { m: 'May', revenue: 27200, jobs: 48 },
    { m: 'Jun', revenue: 31400, jobs: 54 },
    { m: 'Jul', revenue: 35600, jobs: 60 },
    { m: 'Aug', revenue: 39800, jobs: 66 },
    { m: 'Sep', revenue: 44000, jobs: 72 },
  ];

  const handleExportReports = () => {
    const headers = ['Month', 'Monthly Revenue (INR)', 'Service Jobs Completed', 'Avg Repair Value (INR)'];
    const rows = data.map((d) => [d.m + ' 2026', d.revenue, d.jobs, Math.round(d.revenue / d.jobs)]);

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [
        'FixFlow Pro — Monthly Business Intelligence Report',
        `Generated: ${new Date().toLocaleString('en-IN')}`,
        '',
        headers.join(','),
        ...rows.map((e) => e.join(',')),
      ].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `fixflow-reports-summary-${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success('Report Exported', {
      description: 'Downloaded business summary CSV report successfully.',
    });
  };

  const reportItems = [
    { title: 'Daily Service Report', desc: 'Daily job intake, completions, and technician assignments.' },
    { title: 'Monthly Revenue', desc: 'Breakdown of service fee, parts markup, and net income.' },
    { title: 'Technician Performance', desc: 'Turnaround time, repair success rates, and customer satisfaction.' },
    { title: 'Repair Status Distribution', desc: 'Bottleneck tracking across diagnostic and parts waiting states.' },
    { title: 'Parts Usage & Margins', desc: 'High-consumption parts, inventory depletion, and supplier costs.' },
    { title: 'Customer Growth', desc: 'New vs repeat customer visits and lifetime device history.' },
    { title: 'Payment Collection', desc: 'UPI, cash, card reconciliation, and pending balance breakdown.' },
    { title: 'Warranty Jobs', desc: 'Warranty re-repairs and replacement claim analysis.' },
    { title: 'Cancelled Jobs', desc: 'Quotation rejection reasons and unrepairable device rates.' },
  ];

  return (
    <>
      <PageIntro
        eyebrow="Business intelligence"
        title="Reports"
        description="Measure revenue trends, repair throughput velocity, technician productivity, and parts profitability."
        actions={
          <div className="flex items-center gap-2">
            <button className="btn btn-outline text-xs">01 Sep – 24 Sep 2026</button>
            <Button onClick={handleExportReports}>
              <Download className="mr-1.5 h-4 w-4" />
              Export Report
            </Button>
          </div>
        }
      />
      <section className="metrics-grid compact">
        <MetricCard label="Revenue (Sep)" value="₹4.82L" detail="↑ 12.4% vs last month" icon={TrendingUp} />
        <MetricCard
          label="Jobs Completed"
          value="286"
          detail="92% first-time completion rate"
          icon={Wrench}
          tone="green"
        />
        <MetricCard
          label="Average Repair"
          value="₹4,280"
          detail="↑ ₹320 higher ticket avg"
          icon={IndianRupee}
          tone="cyan"
        />
        <MetricCard
          label="Workshop Efficiency"
          value="94%"
          detail="Across 10 service engineers"
          icon={BarChart3}
          tone="violet"
        />
      </section>

      <section className="panel report-chart">
        <div className="panel-head flex items-center justify-between">
          <h2>Monthly Service & Financial Velocity</h2>
          <div className="segmented">
            <button
              type="button"
              className={viewMetric === 'revenue' ? 'active' : ''}
              onClick={() => setViewMetric('revenue')}
            >
              Revenue (₹)
            </button>
            <button
              type="button"
              className={viewMetric === 'jobs' ? 'active' : ''}
              onClick={() => setViewMetric('jobs')}
            >
              Jobs (#)
            </button>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={320}>
          <BarChart data={data}>
            <CartesianGrid vertical={false} stroke="var(--border)" />
            <XAxis dataKey="m" axisLine={false} tickLine={false} />
            <YAxis
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => (viewMetric === 'revenue' ? `₹${(v / 1000).toFixed(0)}k` : String(v))}
            />
            <Tooltip
              formatter={(val: any) => [
                viewMetric === 'revenue' ? `₹${Number(val).toLocaleString('en-IN')}` : `${val} repairs`,
                viewMetric === 'revenue' ? 'Monthly Revenue' : 'Repairs Completed',
              ]}
              contentStyle={{
                background: 'var(--popover)',
                border: '1px solid var(--border)',
                borderRadius: 10,
              }}
            />
            <Bar
              dataKey={viewMetric}
              fill={viewMetric === 'revenue' ? 'var(--primary)' : '#60a5fa'}
              radius={[6, 6, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </section>

      <div className="report-links">
        {reportItems.map((item) => (
          <button
            key={item.title}
            type="button"
            className="flex items-center justify-between text-left p-3.5 rounded-lg border border-border/60 hover:border-primary/50 hover:bg-muted/40 transition-all cursor-pointer"
            onClick={() => setSelectedReport(item.title)}
          >
            <div className="flex items-center gap-3">
              <BarChart3 className="h-4 w-4 text-primary" />
              <div>
                <span className="font-medium text-sm block">{item.title}</span>
                <span className="text-xs text-muted-foreground block">{item.desc}</span>
              </div>
            </div>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          </button>
        ))}
      </div>

      <Dialog open={!!selectedReport} onOpenChange={(open) => !open && setSelectedReport(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedReport}</DialogTitle>
            <DialogDescription>
              Detailed business intelligence preview and export options for {selectedReport?.toLowerCase()}.
            </DialogDescription>
          </DialogHeader>
          <div className="py-3 space-y-3">
            <div className="rounded-lg bg-muted/40 p-4 border border-border/60 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Reporting Period</span>
                <span className="font-medium">Current Quarter (Q3 2026)</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Sample Size</span>
                <span className="font-medium">286 repair records</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Generated Status</span>
                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-emerald-500/10 text-emerald-500">
                  Ready for Download
                </span>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setSelectedReport(null)}>
              Close
            </Button>
            <Button
              onClick={() => {
                toast.success('Report Downloaded', {
                  description: `${selectedReport} CSV export downloaded.`,
                });
                setSelectedReport(null);
              }}
            >
              <FileSpreadsheet className="mr-1.5 h-4 w-4" />
              Download Full CSV
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

export function Notifications() {
  const { notifications, markRead, markAllRead } = useAppStore();
  const [tab, setTab] = useState('All');
  const shown = notifications.filter((n) => tab === 'All' || n.kind === tab);

  return (
    <>
      <PageIntro
        eyebrow="Activity center"
        title="Notifications"
        description="Stay ahead of urgent repairs, payment receipts, inventory alerts, and customer follow-ups."
        actions={
          <Button variant="outline" onClick={() => { markAllRead(); toast.success('All marked as read'); }}>
            <Check className="mr-1.5 h-4 w-4" />
            Mark all read
          </Button>
        }
      />
      <div className="notification-tabs">
        {['All', 'Jobs', 'Payments', 'Repairs', 'System'].map((x) => (
          <button
            key={x}
            className={tab === x ? 'active' : ''}
            onClick={() => setTab(x)}
          >
            {x}
          </button>
        ))}
      </div>
      <section className="panel notification-list">
        {shown.length === 0 ? (
          <p className="p-8 text-center text-muted-foreground">No notifications in this category.</p>
        ) : (
          shown.map((n) => (
            <button
              className={!n.read ? 'unread' : ''}
              onClick={() => {
                markRead(n.id);
                toast.info(n.title, { description: n.message });
              }}
              key={n.id}
            >
              <div className="notification-icon">
                <Bell className="h-4 w-4" />
              </div>
              <div>
                <strong>{n.title}</strong>
                <p>{n.message}</p>
                <span>{n.time}</span>
              </div>
              {!n.read && <i />}
            </button>
          ))
        )}
      </section>
    </>
  );
}

export function MessagesPage() {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const templates = [
    { name: 'Device Received', msg: 'Hi {{customer_name}}, your {{device_model}} has been received for diagnosis at {{store_name}}. Job ID: {{job_id}}.' },
    { name: 'Estimate Ready', msg: 'Hi {{customer_name}}, the estimate for your {{device_model}} ({{job_id}}) is ready: {{estimate_amount}}. Please reply to approve.' },
    { name: 'Repair Started', msg: 'Hi {{customer_name}}, our technician has started repair on your {{device_model}} ({{job_id}}).' },
    { name: 'Repair Completed', msg: 'Hi {{customer_name}}, your {{device_model}} has passed quality inspection and repair is complete!' },
    { name: 'Ready for Collection', msg: 'Hi {{customer_name}}, your {{device_model}} is ready for pickup at {{store_name}}. Balance due: {{balance_due}}.' },
    { name: 'Payment Reminder', msg: 'Hi {{customer_name}}, reminder for pending balance {{balance_due}} on job {{job_id}} from {{store_name}}.' },
    { name: 'Thank You', msg: 'Thank you for choosing {{store_name}} for your {{device_model}} repair! Please reach out if you need anything else.' },
  ];

  return (
    <>
      <PageIntro
        eyebrow="Communication"
        title="Message Templates"
        description="Keep every customer WhatsApp, SMS, and Email update clear, timely, and brand-consistent."
        actions={
          <Button onClick={() => toast.success('Template Builder', { description: 'New custom template creator ready.' })}>
            <Plus className="mr-1.5 h-4 w-4" />
            New Template
          </Button>
        }
      />
      <div className="template-grid">
        {templates.map((x, i) => (
          <article className="template-card" key={x.name}>
            <div>
              <div className="template-icon">{i % 3 === 1 ? <Mail /> : <MessageCircle />}</div>
              <StatusBadge status={i % 3 === 0 ? 'Paid' : 'Pending'} />
            </div>
            <h3>{x.name}</h3>
            <p>{x.msg}</p>
            <div>
              <button
                type="button"
                className="btn btn-outline"
                onClick={() => setSelectedTemplate(x.name)}
              >
                Preview
              </button>
              <button
                type="button"
                className="btn btn-ghost"
                onClick={() => toast.info(`Editing template: ${x.name}`)}
              >
                Edit template
              </button>
            </div>
          </article>
        ))}
      </div>

      <Dialog open={!!selectedTemplate} onOpenChange={(open) => !open && setSelectedTemplate(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Template Preview: {selectedTemplate}</DialogTitle>
            <DialogDescription>
              Rendered dynamic preview with sample customer & device tags.
            </DialogDescription>
          </DialogHeader>
          <div className="p-4 rounded-lg bg-muted/40 border border-border text-sm space-y-2">
            <p className="font-mono text-xs text-muted-foreground">
              CHANNEL: WhatsApp & SMS Simulator
            </p>
            <p className="leading-relaxed">
              &quot;Hi Anand Kumar, your iPhone 15 Pro Max (JOB-2026-000001) update is ready from ABC Mobile Store, Vellore.&quot;
            </p>
          </div>
          <DialogFooter>
            <Button onClick={() => setSelectedTemplate(null)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

export function Stores() {
  const { stores, currentStore, setCurrentStore, setStores } = useAppStore();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');

  const handleAddStore = () => {
    if (!name.trim()) {
      toast.error('Store name is required');
      return;
    }
    const newStore: StoreLocation = {
      id: `STR-${String(stores.length + 1).padStart(3, '0')}`,
      name: name.trim(),
      location: location.trim() || 'Tamil Nadu',
      activeJobs: 0,
      readyJobs: 0,
      todayRevenue: 0,
    };
    setStores((prev) => [...prev, newStore]);
    setOpen(false);
    setName('');
    setLocation('');
    toast.success('Store Branch Added', {
      description: `${newStore.name} (${newStore.location}) added to multi-store network.`,
    });
  };

  return (
    <>
      <PageIntro
        eyebrow="Multi-store readiness"
        title="Stores"
        description="Switch active service locations, synchronize branches, and monitor cross-store intake."
        actions={
          <Button onClick={() => setOpen(true)}>
            <Plus className="mr-1.5 h-4 w-4" />
            Add Store
          </Button>
        }
      />
      <div className="store-grid">
        {stores.map((s) => {
          const isActive = currentStore === s.name;
          return (
            <article className={`store-card ${isActive ? 'active ring-2 ring-primary' : ''}`} key={s.id}>
              <div>
                <div className="store-icon">
                  <Building2 />
                </div>
                {isActive && (
                  <span className="active-store inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full bg-primary text-primary-foreground">
                    <Check className="h-3 w-3" />
                    Active store
                  </span>
                )}
              </div>
              <h3>{s.name}</h3>
              <p>{s.location}</p>
              <div className="store-stats">
                <span>
                  <b>{s.activeJobs}</b>Active jobs
                </span>
                <span>
                  <b>{s.readyJobs}</b>Ready
                </span>
                <span>
                  <b>{money(s.todayRevenue)}</b>Today
                </span>
              </div>
              <Button
                variant={isActive ? 'secondary' : 'outline'}
                className="w-full mt-3"
                onClick={() => {
                  setCurrentStore(s.name);
                  toast.success('Active Store Switched', {
                    description: `Working location set to ${s.name} (${s.location}).`,
                  });
                }}
              >
                {isActive ? 'Current Active Location' : 'Set Active Store'}
              </Button>
            </article>
          );
        })}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Store Branch</DialogTitle>
            <DialogDescription>
              Register a new service center or store location.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3 py-2">
            <label className="block text-xs font-medium text-muted-foreground">
              Store Name *
              <input
                className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                placeholder="e.g. FixFlow Express"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </label>
            <label className="block text-xs font-medium text-muted-foreground">
              City / Location *
              <input
                className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                placeholder="e.g. Coimbatore"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </label>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddStore}>Add Location</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

export { SettingsPage } from './settings-page';

function SearchBar({
  q,
  setQ,
  placeholder,
}: {
  q: string;
  setQ: (v: string) => void;
  placeholder: string;
}) {
  return (
    <div className="search-field standalone">
      <Search className="h-4 w-4 text-muted-foreground" />
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder={placeholder}
      />
    </div>
  );
}
