import { Link, useNavigate } from '@tanstack/react-router';
import {
  AlertTriangle,
  ArrowUpRight,
  CalendarDays,
  CheckCircle2,
  ClipboardPlus,
  Clock3,
  CreditCard,
  IndianRupee,
  Package,
  Plus,
  Smartphone,
  Users,
  Wrench,
} from 'lucide-react';
import { useMemo, useState } from 'react';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { Button } from '@/components/ui/button';
import { MetricCard, PageIntro, StatusBadge } from './common';
import { money } from '@/lib/formatters';
import { useAppStore } from '@/lib/app-store';
import { toast } from 'sonner';

const chart7Days = [
  ['18 Sep', 8, 5, 4],
  ['19 Sep', 11, 7, 6],
  ['20 Sep', 9, 8, 7],
  ['21 Sep', 14, 9, 8],
  ['22 Sep', 12, 11, 9],
  ['23 Sep', 16, 12, 11],
  ['24 Sep', 12, 10, 9],
].map(([day, received, completed, delivered]) => ({ day, received, completed, delivered }));

const chart30Days = [
  ['Week 1', 48, 42, 38],
  ['Week 2', 56, 51, 47],
  ['Week 3', 62, 58, 52],
  ['Week 4', 71, 65, 60],
].map(([day, received, completed, delivered]) => ({ day, received, completed, delivered }));

const chart90Days = [
  ['Jul', 195, 180, 172],
  ['Aug', 230, 215, 204],
  ['Sep', 268, 252, 240],
].map(([day, received, completed, delivered]) => ({ day, received, completed, delivered }));

export function Dashboard() {
  const navigate = useNavigate();
  const { jobs, currentStore } = useAppStore();
  const [timeRange, setTimeRange] = useState<'7' | '30' | '90'>('7');

  const pipeline = [
    'Received',
    'Diagnosis',
    'Estimate',
    'Waiting Parts',
    'Repairing',
    'Quality Check',
    'Ready for Collection',
    'Delivered',
  ];

  const activeChartData = useMemo(() => {
    if (timeRange === '30') return chart30Days;
    if (timeRange === '90') return chart90Days;
    return chart7Days;
  }, [timeRange]);

  const attentionItems = [
    {
      jobId: jobs[6]?.id ?? 'JOB-2026-000007',
      Icon: AlertTriangle,
      title: 'Estimate approval overdue',
      text: `${jobs[6]?.id ?? 'JOB-2026-000007'} · 4 hours awaiting response`,
      tone: 'warning',
    },
    {
      jobId: jobs[2]?.id ?? 'JOB-2026-000003',
      Icon: Package,
      title: 'Part order delayed',
      text: `${jobs[2]?.id ?? 'JOB-2026-000003'} · Display replacement part`,
      tone: 'orange',
    },
    {
      jobId: jobs[9]?.id ?? 'JOB-2026-000010',
      Icon: Clock3,
      title: 'Express job due soon',
      text: `${jobs[9]?.id ?? 'JOB-2026-000010'} · Due in 45 minutes`,
      tone: 'danger',
    },
    {
      jobId: jobs[0]?.id ?? 'JOB-2026-000001',
      Icon: Users,
      title: 'Customer not notified',
      text: `${jobs[0]?.id ?? 'JOB-2026-000001'} · Ready for collection`,
      tone: 'blue',
    },
  ];

  const inRepairCount = jobs.filter((j) => j.status === 'Repairing').length;
  const readyCount = jobs.filter((j) => j.status === 'Ready for Collection').length;
  const waitingPartsCount = jobs.filter((j) => j.status === 'Waiting Parts').length;
  const pendingPaymentsSum = jobs
    .filter((j) => j.paid < j.amount)
    .reduce((sum, j) => sum + (j.amount - j.paid), 0);
  const totalRevenueToday = jobs.reduce((sum, j) => sum + j.paid, 0);

  return (
    <>
      <PageIntro
        eyebrow={`Today's Service Overview · ${currentStore}`}
        title="Good morning, Admin"
        description={`Here's what is happening across your repair operations at ${currentStore}.`}
        actions={
          <>
            <button
              className="btn btn-outline"
              onClick={() => toast.info(`Viewing operations snapshot for ${currentStore}`)}
            >
              <CalendarDays className="w-4 h-4" /> Today
            </button>
            <Button asChild>
              <Link to="/jobs/new">
                <Plus className="w-4 h-4" /> New Job
              </Link>
            </Button>
          </>
        }
      />

      <section className="metrics-grid">
        <MetricCard label="Today's Jobs" value={String(jobs.length)} detail="↑ 18.2% vs yesterday" icon={ClipboardPlus} />
        <MetricCard label="In Repair" value={String(inRepairCount || 8)} detail="3 due before 5 PM" icon={Wrench} tone="violet" />
        <MetricCard label="Ready for Collection" value={String(readyCount || 5)} detail="Customer pickup ready" icon={CheckCircle2} tone="green" />
        <MetricCard label="Waiting for Parts" value={String(waitingPartsCount || 3)} detail="1 delayed shipment" icon={Package} tone="amber" />
        <MetricCard label="Pending Payments" value={money(pendingPaymentsSum || 18450)} detail="Across open balances" icon={CreditCard} tone="red" />
        <MetricCard label="Total Revenue Collected" value={money(totalRevenueToday || 35500)} detail="↑ ₹4,200 from yesterday" icon={IndianRupee} tone="cyan" />
      </section>

      <section className="panel pipeline-panel">
        <div className="panel-head">
          <div>
            <span className="section-kicker">Live workflow</span>
            <h2>Job pipeline</h2>
          </div>
          <Link to="/jobs" className="text-link">
            View all jobs <ArrowUpRight />
          </Link>
        </div>
        <div className="pipeline">
          {pipeline.map((stage, i) => {
            const count = i === 7 ? 17 : jobs.filter((j) => j.status === stage).length;
            return (
              <Link
                key={stage}
                to="/jobs"
                className="pipeline-stage hover:opacity-80 transition-opacity"
              >
                <div className="pipeline-count">{count}</div>
                <div>
                  <strong>{stage === 'Ready for Collection' ? 'Ready' : stage}</strong>
                  <span>{i < 7 ? 'Active jobs' : 'Today'}</span>
                </div>
                {i < pipeline.length - 1 && <div className="pipeline-line" />}
              </Link>
            );
          })}
        </div>
      </section>

      <div className="dashboard-grid">
        {/* Repair Activity Chart */}
        <section className="panel chart-panel">
          <div className="panel-head">
            <div>
              <span className="section-kicker">Performance Trend</span>
              <h2>Repair activity</h2>
            </div>
            <div className="segmented">
              <button
                className={timeRange === '7' ? 'active' : ''}
                onClick={() => setTimeRange('7')}
              >
                7 Days
              </button>
              <button
                className={timeRange === '30' ? 'active' : ''}
                onClick={() => setTimeRange('30')}
              >
                30 Days
              </button>
              <button
                className={timeRange === '90' ? 'active' : ''}
                onClick={() => setTimeRange('90')}
              >
                90 Days
              </button>
            </div>
          </div>
          <div className="chart-legend">
            <span>
              <i className="legend-primary" /> Received
            </span>
            <span>
              <i className="legend-success" /> Completed
            </span>
            <span>
              <i className="legend-muted" /> Delivered
            </span>
          </div>
          <div className="chart-wrap">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={activeChartData}>
                <defs>
                  <linearGradient id="received" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--primary)" stopOpacity={0.18} />
                    <stop offset="100%" stopColor="var(--primary)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="var(--border)" vertical={false} />
                <XAxis dataKey="day" axisLine={false} tickLine={false} fontSize={12} />
                <YAxis axisLine={false} tickLine={false} fontSize={12} />
                <Tooltip
                  contentStyle={{
                    background: 'var(--popover)',
                    border: '1px solid var(--border)',
                    borderRadius: 10,
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="received"
                  stroke="var(--primary)"
                  strokeWidth={2.5}
                  fill="url(#received)"
                />
                <Area
                  type="monotone"
                  dataKey="completed"
                  stroke="var(--success)"
                  strokeWidth={2}
                  fill="transparent"
                />
                <Area
                  type="monotone"
                  dataKey="delivered"
                  stroke="var(--muted-foreground)"
                  strokeWidth={2}
                  fill="transparent"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </section>

        {/* Priority Queue / Needs Attention with Deep-Linking */}
        <section className="panel attention-panel">
          <div className="panel-head">
            <div>
              <span className="section-kicker">Priority queue</span>
              <h2>Needs attention</h2>
            </div>
            <span className="count-chip">{attentionItems.length}</span>
          </div>
          {attentionItems.map(({ jobId, Icon, title, text, tone }) => (
            <Link
              to="/jobs/$id"
              params={{ id: jobId }}
              key={title}
              className="attention-row group block no-underline text-foreground hover:bg-accent/40 p-2 -mx-2 rounded-xl transition-colors cursor-pointer"
              title={`Click to view ${jobId} details`}
            >
              <div className="flex items-center gap-3 w-full">
                <div className={`attention-icon tone-${tone} shrink-0`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <strong className="block text-xs font-bold text-foreground group-hover:text-primary transition-colors">
                    {title}
                  </strong>
                  <span className="block text-[11px] text-muted-foreground truncate">{text}</span>
                </div>
                <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
              </div>
            </Link>
          ))}
        </section>
      </div>

      {/* Live Desk Table */}
      <section className="panel jobs-panel">
        <div className="panel-head">
          <div>
            <span className="section-kicker">Live desk</span>
            <h2>Today's jobs</h2>
          </div>
          <div className="quick-actions">
            <Button variant="outline" asChild>
              <Link to="/customers">
                <Users className="w-4 h-4" /> Add Customer
              </Link>
            </Button>
            <Button asChild>
              <Link to="/jobs/new">
                <Plus className="w-4 h-4" /> New Job Card
              </Link>
            </Button>
          </div>
        </div>
        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th>Job ID</th>
                <th>Customer</th>
                <th>Device</th>
                <th>Technician</th>
                <th>Status</th>
                <th>Amount</th>
                <th>Updated</th>
              </tr>
            </thead>
            <tbody>
              {jobs.slice(0, 6).map((job) => (
                <tr
                  key={job.id}
                  onClick={() => navigate({ to: '/jobs/$id', params: { id: job.id } })}
                  className="cursor-pointer hover:bg-accent/30"
                >
                  <td>
                    <strong className="mono text-primary">{job.id}</strong>
                  </td>
                  <td>
                    {job.customer}
                    <small>{job.phone}</small>
                  </td>
                  <td>
                    {job.device}
                    <small>{job.complaint}</small>
                  </td>
                  <td>{job.technician}</td>
                  <td>
                    <StatusBadge status={job.status} />
                  </td>
                  <td>{money(job.amount)}</td>
                  <td>{job.updated}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mobile-job-list">
          {jobs.slice(0, 5).map((job) => (
            <Link to="/jobs/$id" params={{ id: job.id }} className="mobile-job" key={job.id}>
              <div>
                <strong>{job.device}</strong>
                <span>
                  {job.customer} · {job.id}
                </span>
              </div>
              <StatusBadge status={job.status} />
              <b>{money(job.amount)}</b>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
