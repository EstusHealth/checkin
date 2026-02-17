import { Link, useLocation } from 'react-router-dom';

const NAV_ITEMS = [
  { path: '/', label: 'Dashboard' },
  { path: '/check-in', label: 'Check In' },
  { path: '/trends', label: 'Trends' },
  { path: '/history', label: 'History' },
];

interface LayoutProps {
  children: React.ReactNode;
  onSignOut?: () => void;
}

export function Layout({ children, onSignOut }: LayoutProps) {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-surface">
      <header className="border-b border-border bg-surface-light">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/" className="text-xl font-bold text-text no-underline">
            Vitals
          </Link>
          <div className="flex items-center gap-1">
            <nav className="flex gap-1">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-3 py-1.5 rounded-lg text-sm no-underline transition-colors ${
                    location.pathname === item.path
                      ? 'bg-primary text-white'
                      : 'text-text-muted hover:text-text hover:bg-surface-lighter'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            {onSignOut && (
              <button
                onClick={onSignOut}
                className="ml-2 px-3 py-1.5 rounded-lg text-sm text-text-muted hover:text-text hover:bg-surface-lighter transition-colors"
              >
                Sign Out
              </button>
            )}
          </div>
        </div>
      </header>
      <main className="max-w-6xl mx-auto px-4 py-6">{children}</main>
    </div>
  );
}
