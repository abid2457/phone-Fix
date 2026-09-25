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
import { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
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
  const { jobs, customers, notifications } = useAppStore();
  const [collapsed, setCollapsed] = useState(false);
  const [drawer, setDrawer] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [query, setQuery] = useState('');
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('light');

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

  useEffect(() => {
    const dark =
      theme === 'dark' ||
      (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
    document.documentElement.classList.toggle('dark', dark);
  }, [theme]);

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

  const shareUrl = typeof window !== 'undefined' ? window.location.origin : 'https://github.com/abid2457/phone-Fix';
  const shareText = 'Check out FixFlow Pro — Modern Operating System & Management for Mobile Phone Repair Centers!';

  const handleCopy = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      toast.success('Link copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleTwitterShare = () => {
    const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      shareText,
    )}&url=${encodeURIComponent(shareUrl)}&hashtags=MobileRepair,FixFlow,ServiceManagement`;
    window.open(tweetUrl, '_blank', 'noopener,noreferrer');
  };

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
            <div className="theme-switch" aria-label="Theme">
              <button
                onClick={() => setTheme('light')}
                className={theme === 'light' ? 'selected' : ''}
                title="Light"
              >
                <Sun />
              </button>
              <button
                onClick={() => setTheme('dark')}
                className={theme === 'dark' ? 'selected' : ''}
                title="Dark"
              >
                <Moon />
              </button>
            </div>

            {/* Share / Twitter Cards Button */}
            <button
              onClick={() => setShareOpen(true)}
              className="icon-btn"
              aria-label="Share FixFlow Pro"
              title="Share FixFlow Pro & Twitter Card"
            >
              <Share2 />
            </button>

            <Link
              to="/notifications"
              className="icon-btn"
              aria-label="Notifications"
            >
              <Bell />
              <span className="notification-dot" />
            </Link>
            <button className="store-switch">
              <Store />
              <span>ABC Mobile Store</span>
              <ChevronDown />
            </button>
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

      {/* Share / Twitter Card Dialog */}
      <Dialog open={shareOpen} onOpenChange={setShareOpen}>
        <DialogContent className="max-w-md p-6">
          <DialogTitle className="text-lg font-bold flex items-center gap-2">
            <Share2 className="w-5 h-5 text-primary" />
            Share FixFlow Pro
          </DialogTitle>
          <p className="text-xs text-muted-foreground mt-1">
            Share FixFlow Pro on X (Twitter) or copy the link with rich Open Graph preview cards.
          </p>

          {/* Card Preview */}
          <div className="mt-4 rounded-xl border border-border bg-card overflow-hidden shadow-sm">
            <div className="relative aspect-video bg-muted overflow-hidden">
              <img
                src="/og-image.png"
                alt="FixFlow Pro Twitter Card Preview"
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/og-image.svg';
                }}
              />
              <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-md px-2 py-0.5 rounded text-[10px] font-semibold text-white">
                Twitter Card Preview
              </div>
            </div>
            <div className="p-3">
              <div className="text-[10px] text-primary font-bold uppercase tracking-wider">
                FixFlow Pro
              </div>
              <div className="text-sm font-semibold text-foreground mt-0.5">
                FixFlow Pro — Mobile Phone Repair & Service Management
              </div>
              <div className="text-xs text-muted-foreground mt-1 line-clamp-2">
                Complete operating system for mobile phone repair shops. Job card intake, technician bench, inventory & billing.
              </div>
            </div>
          </div>

          {/* Share Actions */}
          <div className="mt-5 flex flex-col gap-2.5">
            <Button
              onClick={handleTwitterShare}
              className="w-full bg-[#000000] hover:bg-[#18181b] text-white flex items-center justify-center gap-2 py-2.5 text-xs font-semibold rounded-lg"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
              Share on X (Twitter)
            </Button>

            <Button
              variant="outline"
              onClick={handleCopy}
              className="w-full flex items-center justify-center gap-2 py-2.5 text-xs font-semibold rounded-lg"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-500" />
                  Link Copied!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  Copy Share Link
                </>
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
