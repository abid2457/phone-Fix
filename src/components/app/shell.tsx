import { useEffect, useState, type ReactNode } from 'react';
import { Link, useLocation, useNavigate } from '@tanstack/react-router';
import {
  BarChart3,
  Bell,
  Check,
  ChevronDown,
  CircleHelp,
  ClipboardList,
  Copy,
  CreditCard,
  ExternalLink,
  LayoutDashboard,
  Menu,
  MessageSquareText,
  Moon,
  Package,
  PanelLeftClose,
  PanelLeftOpen,
  Plus,
  Search,
  Settings,
  Share2,
  Smartphone,
  Store,
  Sun,
  Users,
  Wrench,
  X,
} from 'lucide-react';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { useAppStore } from '@/lib/app-store';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

const groups = [
  {
    label: 'Navigation',
    items: [
      ['Overview', '/', LayoutDashboard],
      ['Jobs', '/jobs', ClipboardList],
      ['Customers', '/customers', Users],
      ['Technicians', '/technicians', Wrench],
      ['Inventory', '/inventory', Package],
      ['Billing', '/billing', CreditCard],
      ['Reports', '/reports', BarChart3],
    ],
  },
  {
    label: 'Communication',
    items: [
      ['Notifications', '/notifications', Bell],
      ['Message Templates', '/messages', MessageSquareText],
    ],
  },
  {
    label: 'Management',
    items: [
      ['Stores', '/stores', Store],
      ['Settings', '/settings', Settings],
    ],
  },
] as const;

const titleMap: Record<string, string> = {
  '/': 'Overview',
  '/dashboard': 'Overview',
  '/jobs': 'Service Jobs',
  '/customers': 'Customers',
  '/technicians': 'Technicians',
  '/inventory': 'Inventory',
  '/billing': 'Billing',
  '/reports': 'Reports',
  '/notifications': 'Notifications',
  '/messages': 'Message Templates',
  '/stores': 'Stores',
  '/settings': 'Settings',
};

export function FixFlowIcon({ className = 'w-6 h-6' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="ff-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8FBF5C" />
          <stop offset="100%" stopColor="#22C55E" />
        </linearGradient>
      </defs>
      <rect width="36" height="36" rx="10" fill="url(#ff-grad)" />
      <rect x="9" y="5" width="18" height="26" rx="4" stroke="#FFFFFF" strokeWidth="1.8" fill="rgba(15, 23, 42, 0.35)" />
      <line x1="15" y1="7.5" x2="21" y2="7.5" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M19.5 11.5L14 19H19L16.5 25.5L23 17H18L19.5 11.5Z" fill="#FFFFFF" />
      <circle cx="18" cy="28.5" r="1.1" fill="#FFFFFF" />
    </svg>
  );
}

export function AppShell({ children }: { children: ReactNode }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { jobs, customers, notifications, currentStore, setCurrentStore, stores } = useAppStore();
  const [collapsed, setCollapsed] = useState(false);
  const [drawer, setDrawer] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState('');

  useEffect(() => {
    const fn = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener('keydown', fn);
    return () => window.removeEventListener('keydown', fn);
  }, []);

  const results =
    query.length > 1
      ? [
          ...jobs
            .filter((j) =>
              `${j.id} ${j.customer} ${j.phone} ${j.device} ${j.imei}`
                .toLowerCase()
                .includes(query.toLowerCase()),
            )
            .slice(0, 5),
          ...customers
            .filter((c) =>
              `${c.name} ${c.phone}`.toLowerCase().includes(query.toLowerCase()),
            )
            .slice(0, 3),
        ]
      : [];

  const path = location.pathname;
  const pageTitle = path.startsWith('/jobs/')
    ? path === '/jobs/new'
      ? 'New Job Card'
      : 'Job Details'
    : path.startsWith('/customers/')
      ? 'Customer Profile'
      : path.startsWith('/technicians/')
        ? 'Technician Workspace'
        : titleMap[path] ?? 'FixFlow';

  return (
    <div className={cn('app-shell', collapsed && 'sidebar-collapsed')}>
      <aside className={cn('sidebar', drawer && 'sidebar-open')}>
        <div className="brand">
          {!collapsed ? (
            <div className="px-1">
              <strong className="text-[17px] font-bold tracking-tight text-foreground">FixFlow</strong>
              <small className="block text-[10px] text-muted-foreground font-medium mt-0.5">Mobile Service Management</small>
            </div>
          ) : (
            <div className="px-1">
              <strong className="text-base font-bold tracking-tight text-foreground">FF</strong>
            </div>
          )}
          <button
            className="mobile-close"
            onClick={() => setDrawer(false)}
            aria-label="Close navigation"
          >
            <X />
          </button>
        </div>
        <nav>
          {groups.map((group) => (
            <div className="nav-group" key={group.label}>
              {!collapsed && <div className="nav-label">{group.label}</div>}
              {group.items.map(([label, to, Icon]) => (
                <Link
                  key={label}
                  to={to}
                  onClick={() => setDrawer(false)}
                  className={cn(
                    'nav-item',
                    (to === '/'
                      ? path === '/' || path === '/dashboard'
                      : path.startsWith(to)) && 'active',
                  )}
                  title={collapsed ? label : undefined}
                >
                  <Icon />
                  <span>{label}</span>
                  {label === 'Notifications' &&
                    notifications.filter((n) => !n.read).length > 0 && (
                      <b>{notifications.filter((n) => !n.read).length}</b>
                    )}
                </Link>
              ))}
            </div>
          ))}
        </nav>
        <div className="sidebar-foot">
          <a className="nav-item" href="mailto:support@fixflow.example">
            <CircleHelp />
            <span>Help & Support</span>
          </a>
          {!collapsed && (
            <div className="user-mini">
              <div className="avatar">A</div>
              <div>
                <strong>Admin</strong>
                <small>
                  <i /> Store Manager
                </small>
              </div>
            </div>
          )}
          <button
            className="collapse-btn"
            onClick={() => setCollapsed(!collapsed)}
            aria-label="Toggle sidebar"
          >
            {collapsed ? <PanelLeftOpen /> : <PanelLeftClose />}
          </button>
        </div>
      </aside>
      <div className="workspace">
        <header className="topbar">
          <button
            className="menu-btn"
            onClick={() => setDrawer(true)}
            aria-label="Open navigation"
          >
            <Menu />
          </button>
          <div className="topbar-title">
            <small>FixFlow / {pageTitle}</small>
            <strong>{pageTitle}</strong>
          </div>
          <button
            className="search-trigger"
            onClick={() => setSearchOpen(true)}
          >
            <Search />
            <span>Search jobs, customers, IMEI...</span>
            <kbd>⌘ K</kbd>
          </button>
          <div className="header-tools">
            <Link
              to="/notifications"
              className="icon-btn"
              aria-label="Notifications"
            >
              <Bell />
              <span className="notification-dot" />
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="store-switch cursor-pointer" aria-label="Switch store location">
                  <Store className="w-4 h-4 text-primary" />
                  <span className="font-semibold">{currentStore}</span>
                  <ChevronDown className="w-3.5 h-3.5 opacity-70" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 p-1.5 shadow-lg">
                <DropdownMenuLabel className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground px-2 py-1.5">
                  Store Locations
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {stores.map((s) => (
                  <DropdownMenuItem
                    key={s.id}
                    onClick={() => {
                      setCurrentStore(s.name);
                      toast.success(`Active location switched to ${s.name}`, {
                        description: `Viewing operations for ${s.location} branch.`,
                      });
                    }}
                    className={`flex items-center justify-between px-2.5 py-2 rounded-lg cursor-pointer text-xs ${
                      currentStore === s.name ? 'bg-accent font-bold text-primary' : ''
                    }`}
                  >
                    <div>
                      <strong className="block text-foreground">{s.name}</strong>
                      <small className="block text-[10px] text-muted-foreground">{s.location} · {s.activeJobs} active jobs</small>
                    </div>
                    {currentStore === s.name && <Check className="w-4 h-4 text-primary" />}
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => navigate({ to: '/stores' })}
                  className="text-xs text-primary font-semibold px-2.5 py-2 cursor-pointer"
                >
                  Manage All Stores &rarr;
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <div className="header-user">
              <div className="avatar">A</div>
              <div>
                <strong>Admin</strong>
                <small>Store Manager</small>
              </div>
            </div>
          </div>
        </header>
        <main className="main-content">{children}</main>
      </div>
      <nav className="mobile-nav">
        {[
          { label: 'Home', to: '/' as const, Icon: LayoutDashboard },
          { label: 'Jobs', to: '/jobs' as const, Icon: ClipboardList },
          { label: 'Customers', to: '/customers' as const, Icon: Users },
          { label: 'Alerts', to: '/notifications' as const, Icon: Bell },
          { label: 'More', to: '/settings' as const, Icon: Menu },
        ].map(({ label, to, Icon }) => (
          <Link
            to={to}
            key={label}
            className={path === to ? 'active' : ''}
          >
            <Icon />
            <span>{label}</span>
          </Link>
        ))}
        <button
          className="mobile-fab"
          onClick={() => navigate({ to: '/jobs/new' })}
        >
          <Plus />
        </button>
      </nav>

      {/* Global Search Dialog */}
      <Dialog open={searchOpen} onOpenChange={setSearchOpen}>
        <DialogContent className="search-modal">
          <DialogTitle className="sr-only">Global Search</DialogTitle>
          <div className="command-input">
            <Search />
            <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search Job ID, customer, mobile, IMEI, device..."
            />
            <kbd>ESC</kbd>
          </div>
          <div className="command-results">
            {query.length < 2 ? (
              <div className="search-hint">
                <Search />
                <p>Find any repair record instantly</p>
                <span>Try “9876543210” or “iPhone 15 Pro”</span>
              </div>
            ) : results.length === 0 ? (
              <div className="search-hint">
                <p>No matching records</p>
              </div>
            ) : (
              results.map((r) =>
                'device' in r ? (
                  <button
                    key={r.id}
                    onClick={() => {
                      setSearchOpen(false);
                      navigate({ to: '/jobs/$id', params: { id: r.id } });
                    }}
                  >
                    <div className="result-icon">
                      <Smartphone />
                    </div>
                    <div>
                      <strong>{r.id}</strong>
                      <span>
                        {r.customer} · {r.device}
                      </span>
                    </div>
                    <em>{r.status}</em>
                  </button>
                ) : (
                  <button
                    key={r.id}
                    onClick={() => {
                      setSearchOpen(false);
                      navigate({ to: '/customers/$id', params: { id: r.id } });
                    }}
                  >
                    <div className="result-icon">
                      <Users />
                    </div>
                    <div>
                      <strong>{r.name}</strong>
                      <span>{r.phone} · Customer</span>
                    </div>
                  </button>
                ),
              )
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
