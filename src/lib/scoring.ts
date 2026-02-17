/**
 * Returns a CSS color string on the green-amber-red gradient based on score.
 */
export function getScoreColor(score: number | null): string {
  if (score === null) return '#4b5563';
  if (score >= 8) return '#22c55e';
  if (score >= 6) return '#84cc16';
  if (score >= 5) return '#f59e0b';
  if (score >= 3) return '#f97316';
  return '#ef4444';
}

/**
 * Compute the average score for a set of domain values.
 */
export function categoryAverage(scores: (number | null)[]): number | null {
  const valid = scores.filter((s): s is number => s !== null);
  if (valid.length === 0) return null;
  return Math.round((valid.reduce((a, b) => a + b, 0) / valid.length) * 10) / 10;
}

/**
 * Get the display value for a score, handling inverted scales.
 * For inverted domains, display value = 11 - score so bigger polygon = better.
 */
export function getDisplayScore(score: number | null, invertScale?: boolean): number | null {
  if (score === null) return null;
  if (invertScale) return 11 - score;
  return score;
}

/**
 * Format a week_start date string as a readable label.
 */
export function formatWeekLabel(weekStart: string): string {
  const d = new Date(weekStart + 'T00:00:00');
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

/**
 * Get the Monday of the current week.
 */
export function getCurrentWeekStart(): string {
  const now = new Date();
  const day = now.getDay();
  const diff = day === 0 ? -6 : 1 - day;
  const monday = new Date(now);
  monday.setDate(now.getDate() + diff);
  return monday.toISOString().split('T')[0];
}
