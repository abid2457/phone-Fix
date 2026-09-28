import { Link, useNavigate } from '@tanstack/react-router';
import {
  Check,
  ChevronDown,
  Download,
  Filter,
  MessageCircle,
  MoreHorizontal,
  Plus,
  Search,
  SlidersHorizontal,
  Trash2,
  UserCheck,
  Wrench,
} from 'lucide-react';
import { useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { EmptyState, NextAction, PageIntro, StatusBadge } from './common';
import { statusOptions, useAppStore } from '@/lib/app-store';
import { money } from '@/lib/formatters';
import type { Job, JobStatus } from '@/lib/types';
import { toast } from 'sonner';

export function JobsList() {
  const navigate = useNavigate();
  const { jobs, technicians, deleteJob, updateJob } = useAppStore();

  // Filters State
  const [q, setQ] = useState('');
  const [status, setStatus] = useState('All');
  const [technician, setTechnician] = useState('All');
  const [payment, setPayment] = useState('All');
  const [page, setPage] = useState(1);
  const pageSize = 10;

  // Quick Action Dialogs
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [assignOpen, setAssignOpen] = useState(false);
  const [statusOpen, setStatusOpen] = useState(false);
  const [selectedTech, setSelectedTech] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<JobStatus>('Repairing');

  // Dynamic technician list from application state
  const techOptions = useMemo(() => {
    const list = Array.from(new Set(technicians.map((t) => t.name)));
    return ['All', 'Unassigned', ...list];
  }, [technicians]);

  // Combined composable filtering
  const filtered = useMemo(() => {
    return jobs.filter((j) => {
      // 1. Text search
      const query = q.trim().toLowerCase();
      const matchSearch =
        !query ||
        `${j.id} ${j.customer} ${j.phone} ${j.imei} ${j.device} ${j.complaint} ${j.brand}`
          .toLowerCase()
          .includes(query);

      // 2. Status filter
      const matchStatus = status === 'All' || j.status === status;

      // 3. Technician filter
      const matchTech =
        technician === 'All'
          ? true
          : technician === 'Unassigned'
            ? !j.technician || j.technician === 'Unassigned'
            : j.technician === technician;

      // 4. Payment filter
      const computedPayment =
        j.paid >= j.amount ? 'Paid' : j.paid > 0 ? 'Partial' : 'Pending';
      const matchPayment =
        payment === 'All'
          ? true
          : payment === 'Paid'
            ? j.payment === 'Paid' || computedPayment === 'Paid'
            : payment === 'Partial' || payment === 'Partially Paid'
              ? j.payment === 'Partial' || computedPayment === 'Partial'
              : payment === 'Pending'
                ? j.payment === 'Pending' || computedPayment === 'Pending'
                : true;

      return matchSearch && matchStatus && matchTech && matchPayment;
    });
  }, [jobs, q, status, technician, payment]);

  // Pagination calculation
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const paginatedJobs = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, page]);

  // Reset page when filters change
  const handleFilterChange = (setter: (v: string) => void, val: string) => {
    setter(val);
    setPage(1);
  };

  const clearAllFilters = () => {
    setQ('');
    setStatus('All');
    setTechnician('All');
    setPayment('All');
    setPage(1);
    toast.info('Filters cleared');
  };

  // CSV Export Functionality
  const exportToCSV = () => {
    if (!filtered.length) {
      toast.warning('No jobs available to export.', {
        description: 'Try adjusting your search or filters.',
      });
      return;
    }

    const headers = [
      'Job ID',
      'Customer Name',
      'Phone Number',
      'Brand',
      'Device Model',
      'IMEI Number',
      'Reported Issue / Complaint',
      'Assigned Technician',
      'Job Status',
      'Priority Level',
      'Total Amount (INR)',
      'Paid Amount (INR)',
      'Balance Due (INR)',
      'Payment Status',
      'Created Date',
      'Last Updated',
      'Next Action Required',
      'Warranty Status',
    ];

    const escapeCSV = (val: string | number | boolean | undefined) => {
      if (val === undefined || val === null) return '""';
      const str = String(val).replace(/"/g, '""');
      return `"${str}"`;
    };

    const csvRows = filtered.map((j) => {
      const balance = Math.max(0, j.amount - j.paid);
      return [
        escapeCSV(j.id),
        escapeCSV(j.customer),
        escapeCSV(j.phone),
        escapeCSV(j.brand),
        escapeCSV(j.device),
        escapeCSV(j.imei),
        escapeCSV(j.complaint),
        escapeCSV(j.technician || 'Unassigned'),
        escapeCSV(j.status),
        escapeCSV(j.priority),
        escapeCSV(j.amount),
        escapeCSV(j.paid),
        escapeCSV(balance),
        escapeCSV(j.payment),
        escapeCSV(j.created),
        escapeCSV(j.updated),
        escapeCSV(j.nextAction),
        escapeCSV(j.warranty ? 'Warranty Active' : 'Standard'),
      ].join(',');
    });

    const csvContent = [headers.join(','), ...csvRows].join('\r\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    const dateStr = new Date().toISOString().slice(0, 10);
    link.href = url;
    link.setAttribute('download', `fixflow-jobs-${dateStr}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    toast.success('Jobs exported successfully!', {
      description: `Downloaded ${filtered.length} jobs to fixflow-jobs-${dateStr}.csv`,
    });
  };

  const handleAssignTech = () => {
    if (!selectedJob || !selectedTech) return;
    updateJob(selectedJob.id, { technician: selectedTech });
    setAssignOpen(false);
    toast.success(`Assigned ${selectedTech} to ${selectedJob.id}`);
  };

  const handleUpdateStatus = () => {
    if (!selectedJob) return;
    updateJob(selectedJob.id, { status: selectedStatus });
    setStatusOpen(false);
    toast.success(`Updated ${selectedJob.id} status to ${selectedStatus}`);
  };

  return (
    <>
      <PageIntro
        eyebrow="Repair operations"
        title="Service Jobs"
        description="Manage and track every repair from intake to delivery."
        actions={
          <>
            <button
              className="btn btn-outline cursor-pointer"
              onClick={exportToCSV}
              title="Export filtered jobs as CSV"
            >
              <Download className="w-4 h-4" /> Export CSV ({filtered.length})
            </button>
            <Button asChild>
              <Link to="/jobs/new">
                <Plus className="w-4 h-4" /> New Job
              </Link>
            </Button>
          </>
        }
      />

      {/* Toolbar & Composable Filters */}
      <div className="toolbar flex-wrap gap-2.5 mb-4">
        <div className="search-field min-w-[280px]">
          <Search className="w-4 h-4 text-muted-foreground" />
          <input
            value={q}
            onChange={(e) => handleFilterChange(setQ, e.target.value)}
            placeholder="Search Job ID, Customer, Mobile, IMEI, Device..."
          />
        </div>

        <div className="filter-row flex flex-wrap gap-2 items-center">
          <SlidersHorizontal className="w-4 h-4 text-muted-foreground hidden sm:block" />

          {/* Status Filter */}
          <select
            value={status}
            onChange={(e) => handleFilterChange(setStatus, e.target.value)}
            className="text-xs py-2 px-3 rounded-lg border border-input bg-card font-medium"
            title="Filter by Status"
          >
            <option value="All">All Statuses ({jobs.length})</option>
            {statusOptions.map((s) => (
              <option key={s} value={s}>
                {s} ({jobs.filter((j) => j.status === s).length})
              </option>
            ))}
          </select>

          {/* Technician Filter */}
          <select
            value={technician}
            onChange={(e) => handleFilterChange(setTechnician, e.target.value)}
            className="text-xs py-2 px-3 rounded-lg border border-input bg-card font-medium"
            title="Filter by Technician"
          >
            <option value="All">All Technicians</option>
            <option value="Unassigned">Unassigned</option>
            {technicians.map((t) => (
              <option key={t.id} value={t.name}>
                {t.name} ({jobs.filter((j) => j.technician === t.name).length})
              </option>
            ))}
          </select>

          {/* Payment Filter */}
          <select
            value={payment}
            onChange={(e) => handleFilterChange(setPayment, e.target.value)}
            className="text-xs py-2 px-3 rounded-lg border border-input bg-card font-medium"
            title="Filter by Payment Status"
          >
            <option value="All">All Payments</option>
            <option value="Paid">Paid</option>
            <option value="Partial">Partially Paid</option>
            <option value="Pending">Pending Balance</option>
          </select>

          {(q || status !== 'All' || technician !== 'All' || payment !== 'All') && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAllFilters}
              className="text-xs text-muted-foreground hover:text-foreground h-9"
            >
              Reset Filters
            </Button>
          )}
        </div>
      </div>

      {/* Main Table Panel */}
      <section className="panel table-panel">
        {filtered.length === 0 ? (
          <EmptyState
            title="No Jobs Found"
            text="No repair jobs match your current search and filter criteria."
            action={
              <Button variant="outline" onClick={clearAllFilters}>
                Clear All Filters
              </Button>
            }
          />
        ) : (
          <>
            <div className="table-wrap">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Job ID</th>
                    <th>Customer</th>
                    <th>Device / Complaint</th>
                    <th>Technician</th>
                    <th>Status</th>
                    <th>Amount</th>
                    <th>Payment</th>
                    <th>Updated</th>
                    <th className="w-10" />
                  </tr>
                </thead>
                <tbody>
                  {paginatedJobs.map((job) => (
                    <tr key={job.id}>
                      <td>
                        <Link className="mono table-link font-bold" to="/jobs/$id" params={{ id: job.id }}>
                          {job.id}
                        </Link>
                      </td>
                      <td>
                        <strong>{job.customer}</strong>
                        <small>{job.phone}</small>
                      </td>
                      <td>
                        <strong>{job.device}</strong>
                        <small className="truncate max-w-[200px]">{job.complaint}</small>
                      </td>
                      <td>
                        <span className="text-xs font-medium">
                          {job.technician || <em className="text-muted-foreground font-normal">Unassigned</em>}
                        </span>
                      </td>
                      <td>
                        <StatusBadge status={job.status} />
                      </td>
                      <td>
                        <strong>{money(job.amount)}</strong>
                      </td>
                      <td>
                        <StatusBadge status={job.payment} />
                      </td>
                      <td>{job.updated}</td>
                      <td>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-48 shadow-lg">
                            <DropdownMenuItem asChild>
                              <Link to="/jobs/$id" params={{ id: job.id }} className="cursor-pointer">
                                View Full Job Details
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => {
                                setSelectedJob(job);
                                setSelectedTech(job.technician || technicians[0]?.name || '');
                                setAssignOpen(true);
                              }}
                              className="cursor-pointer"
                            >
                              <UserCheck className="w-3.5 h-3.5 mr-2" /> Assign Technician
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => {
                                setSelectedJob(job);
                                setSelectedStatus(job.status);
                                setStatusOpen(true);
                              }}
                              className="cursor-pointer"
                            >
                              <Wrench className="w-3.5 h-3.5 mr-2" /> Update Status
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => {
                                toast.success(`Simulated WhatsApp update sent to ${job.customer} (${job.phone})`);
                              }}
                              className="cursor-pointer"
                            >
                              <MessageCircle className="w-3.5 h-3.5 mr-2 text-emerald-600" /> Send WhatsApp
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              className="text-destructive focus:text-destructive cursor-pointer"
                              onClick={() => {
                                deleteJob(job.id);
                                toast.success(`Deleted ${job.id}`);
                              }}
                            >
                              <Trash2 className="w-3.5 h-3.5 mr-2" /> Delete Job
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile View Cards */}
            <div className="job-cards">
              {paginatedJobs.map((job) => (
                <Link
                  to="/jobs/$id"
                  params={{ id: job.id }}
                  className="job-list-card no-underline text-foreground"
                  key={job.id}
                >
                  <div className="job-card-top">
                    <div>
                      <span className="mono font-bold text-primary">{job.id}</span>
                      <h3>{job.device}</h3>
                      <p>
                        {job.customer} · {job.phone}
                      </p>
                    </div>
                    <StatusBadge status={job.status} />
                  </div>
                  <p className="complaint">{job.complaint}</p>
                  <NextAction>{job.nextAction}</NextAction>
                  <div className="job-card-foot">
                    <span>{job.technician || 'Unassigned'}</span>
                    <strong>{money(job.amount)}</strong>
                  </div>
                </Link>
              ))}
            </div>

            {/* Working Pagination */}
            <div className="pagination-row flex items-center justify-between pt-4 border-t border-border mt-3 text-xs text-muted-foreground">
              <span>
                Showing {(page - 1) * pageSize + 1}–{Math.min(page * pageSize, filtered.length)} of{' '}
                {filtered.length} jobs
              </span>
              <div className="flex items-center gap-1">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={page <= 1}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  className="h-8 px-2.5 text-xs"
                >
                  Previous
                </Button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <Button
                    key={p}
                    variant={p === page ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setPage(p)}
                    className="h-8 w-8 p-0 text-xs"
                  >
                    {p}
                  </Button>
                ))}
                <Button
                  variant="outline"
                  size="sm"
                  disabled={page >= totalPages}
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  className="h-8 px-2.5 text-xs"
                >
                  Next
                </Button>
              </div>
            </div>
          </>
        )}
      </section>

      {/* Assign Technician Quick Dialog */}
      <Dialog open={assignOpen} onOpenChange={setAssignOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Assign Technician to {selectedJob?.id}</DialogTitle>
            <DialogDescription>
              Select workbench technician responsible for {selectedJob?.device} repair.
            </DialogDescription>
          </DialogHeader>
          <div className="modal-fields py-2">
            <label className="text-xs font-semibold">
              Technician
              <select
                value={selectedTech}
                onChange={(e) => setSelectedTech(e.target.value)}
                className="w-full mt-1.5 p-2 rounded-lg border border-input bg-card text-xs"
              >
                {technicians.map((t) => (
                  <option key={t.id} value={t.name}>
                    {t.name} ({t.specialization} · {t.activeJobs} active jobs)
                  </option>
                ))}
              </select>
            </label>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAssignOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAssignTech}>Save Assignment</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Update Status Quick Dialog */}
      <Dialog open={statusOpen} onOpenChange={setStatusOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Status for {selectedJob?.id}</DialogTitle>
            <DialogDescription>Move this repair to its next milestone.</DialogDescription>
          </DialogHeader>
          <div className="status-options grid grid-cols-2 gap-2 py-2">
            {statusOptions.map((s) => (
              <button
                key={s}
                onClick={() => setSelectedStatus(s)}
                className={`p-2.5 rounded-lg border text-left text-xs transition-all flex items-center justify-between ${
                  selectedStatus === s ? 'border-primary bg-accent font-bold' : 'border-border bg-card'
                }`}
              >
                <StatusBadge status={s} />
                {selectedStatus === s && <Check className="w-3.5 h-3.5 text-primary" />}
              </button>
            ))}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setStatusOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpdateStatus}>Update Status</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
