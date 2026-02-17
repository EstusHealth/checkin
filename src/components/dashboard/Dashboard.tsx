import { Link } from 'react-router-dom';
import { useCheckIns } from '../../hooks/useCheckIns';
import { SpiderChart } from '../charts/SpiderChart';
import { WeekSummary } from './WeekSummary';

export function Dashboard() {
  const { checkIns, loading } = useCheckIns(2);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12 text-text-muted">
        Loading...
      </div>
    );
  }

  const current = checkIns[0] ?? null;
  const previous = checkIns[1] ?? null;

  if (!current) {
    return (
      <div className="max-w-lg mx-auto text-center py-16">
        <h1 className="text-3xl font-bold text-text mb-4">Vitals Dashboard</h1>
        <p className="text-text-muted mb-8">
          No check-ins yet. Start your first weekly check-in to see your vitals.
        </p>
        <Link
          to="/check-in"
          className="inline-flex px-6 py-3 rounded-lg bg-primary text-white font-medium hover:bg-primary-dark transition-colors no-underline"
        >
          First Check-In
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-text">Dashboard</h1>
        <Link
          to="/check-in"
          className="px-4 py-2 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primary-dark transition-colors no-underline"
        >
          New Check-In
        </Link>
      </div>

      <WeekSummary checkIn={current} />

      <div className="bg-surface-light rounded-xl p-4 border border-border">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-lg font-semibold text-text">Radar Overview</h2>
          {previous && (
            <span className="text-xs text-text-muted">
              Dashed line = previous week
            </span>
          )}
        </div>
        <SpiderChart current={current} previous={previous} />
      </div>
    </div>
  );
}
