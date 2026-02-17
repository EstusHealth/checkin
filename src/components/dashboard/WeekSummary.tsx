import type { CheckIn, DomainKey } from '../../types';
import { DOMAIN_CATEGORIES, getDomainsByCategory, type DomainCategory } from '../../lib/domains';
import { categoryAverage, getScoreColor, formatWeekLabel } from '../../lib/scoring';
import { ScoreBadge } from '../shared/ScoreBadge';

interface WeekSummaryProps {
  checkIn: CheckIn;
}

const CATEGORY_ORDER: DomainCategory[] = [
  'foundational',
  'cognitive',
  'relational',
  'regulatory',
  'screen',
  'overall',
];

export function WeekSummary({ checkIn }: WeekSummaryProps) {
  return (
    <div className="bg-surface-light rounded-xl p-4 border border-border">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-text">Week Summary</h2>
        <span className="text-sm text-text-muted">
          Week of {formatWeekLabel(checkIn.week_start)}
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {CATEGORY_ORDER.map((cat) => {
          const catInfo = DOMAIN_CATEGORIES[cat];
          const domains = getDomainsByCategory(cat);
          const scores = domains.map((d) => checkIn[d.key] as number | null);
          const avg = categoryAverage(scores);

          return (
            <div
              key={cat}
              className="bg-surface rounded-lg p-3 border border-border"
            >
              <div className="text-xs font-medium text-text-muted mb-1">
                {catInfo.label}
              </div>
              <div className="flex items-center gap-2">
                <span
                  className="text-2xl font-bold"
                  style={{ color: getScoreColor(avg) }}
                >
                  {avg ?? '–'}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {checkIn.week_type && checkIn.week_type !== 'normal' && (
        <div className="mt-3 px-3 py-1.5 bg-surface rounded-lg inline-block text-sm text-text-muted border border-border">
          Week type: <span className="text-text font-medium">{checkIn.week_type.replace('_', ' ')}</span>
        </div>
      )}
    </div>
  );
}
