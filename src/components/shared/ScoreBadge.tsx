import { getScoreColor } from '../../lib/scoring';

interface ScoreBadgeProps {
  score: number | null;
  size?: 'sm' | 'md' | 'lg';
}

export function ScoreBadge({ score, size = 'md' }: ScoreBadgeProps) {
  const sizeClasses = {
    sm: 'w-6 h-6 text-xs',
    md: 'w-8 h-8 text-sm',
    lg: 'w-10 h-10 text-base',
  };

  return (
    <span
      className={`inline-flex items-center justify-center rounded-full font-bold text-white ${sizeClasses[size]}`}
      style={{ backgroundColor: getScoreColor(score) }}
    >
      {score ?? '–'}
    </span>
  );
}
