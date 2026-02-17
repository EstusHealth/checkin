import { useCheckIns } from '../hooks/useCheckIns';
import { TrendChart } from '../components/charts/TrendChart';

export function TrendsPage() {
  const { checkIns, loading } = useCheckIns();

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12 text-text-muted">
        Loading...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-text">Trend Explorer</h1>

      {checkIns.length === 0 ? (
        <div className="text-center py-16 text-text-muted">
          Need at least one check-in to display trends.
        </div>
      ) : (
        <div className="bg-surface-light rounded-xl p-4 border border-border">
          <TrendChart checkIns={checkIns} />
        </div>
      )}
    </div>
  );
}
