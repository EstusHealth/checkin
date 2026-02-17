import { Link } from 'react-router-dom';
import { useCheckIns } from '../hooks/useCheckIns';
import { DOMAINS } from '../lib/domains';
import { getScoreColor, formatWeekLabel } from '../lib/scoring';
import type { DomainKey } from '../types';

export function HistoryPage() {
  const { checkIns, loading } = useCheckIns();

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12 text-text-muted">
        Loading...
      </div>
    );
  }

  if (checkIns.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-text-muted mb-4">No check-ins yet.</p>
        <Link
          to="/check-in"
          className="text-primary hover:text-primary-light no-underline"
        >
          Create your first check-in
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold text-text">Check-In History</h1>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-2 px-2 text-text-muted font-medium sticky left-0 bg-surface">
                Week
              </th>
              {DOMAINS.map((d) => (
                <th
                  key={d.key}
                  className="py-2 px-1 text-text-muted font-medium text-center whitespace-nowrap"
                  title={d.label}
                >
                  {d.shortLabel}
                </th>
              ))}
              <th className="py-2 px-2 text-text-muted font-medium">Type</th>
              <th className="py-2 px-2"></th>
            </tr>
          </thead>
          <tbody>
            {checkIns.map((ci) => (
              <tr key={ci.id} className="border-b border-border/50 hover:bg-surface-light">
                <td className="py-2 px-2 text-text whitespace-nowrap sticky left-0 bg-surface">
                  {formatWeekLabel(ci.week_start)}
                </td>
                {DOMAINS.map((d) => {
                  const score = ci[d.key as DomainKey] as number | null;
                  return (
                    <td key={d.key} className="py-2 px-1 text-center">
                      <span
                        className="inline-block w-6 text-center font-mono font-medium text-xs"
                        style={{ color: getScoreColor(score) }}
                      >
                        {score ?? '–'}
                      </span>
                    </td>
                  );
                })}
                <td className="py-2 px-2 text-text-muted text-xs">
                  {ci.week_type ?? 'normal'}
                </td>
                <td className="py-2 px-2">
                  <Link
                    to={`/check-in/${ci.id}/edit`}
                    className="text-primary hover:text-primary-light text-xs no-underline"
                  >
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
