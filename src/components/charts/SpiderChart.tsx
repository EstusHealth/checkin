import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import { DOMAINS } from '../../lib/domains';
import { getDisplayScore } from '../../lib/scoring';
import type { CheckIn } from '../../types';

interface SpiderChartProps {
  current: CheckIn | null;
  previous?: CheckIn | null;
}

export function SpiderChart({ current, previous }: SpiderChartProps) {
  if (!current) {
    return (
      <div className="flex items-center justify-center h-80 text-text-muted">
        No check-in data yet
      </div>
    );
  }

  const data = DOMAINS.map((domain) => {
    const currentScore = current[domain.key] as number | null;
    const previousScore = previous?.[domain.key] as number | null;

    return {
      domain: domain.shortLabel,
      current: getDisplayScore(currentScore, domain.invertScale) ?? 0,
      previous: getDisplayScore(previousScore, domain.invertScale) ?? 0,
      rawCurrent: currentScore,
      rawPrevious: previousScore,
    };
  });

  return (
    <ResponsiveContainer width="100%" height={400}>
      <RadarChart data={data} cx="50%" cy="50%" outerRadius="70%">
        <PolarGrid stroke="#3f3f5f" />
        <PolarAngleAxis
          dataKey="domain"
          tick={{ fill: '#94a3b8', fontSize: 11 }}
        />
        <PolarRadiusAxis
          domain={[0, 10]}
          tick={{ fill: '#64748b', fontSize: 10 }}
          axisLine={false}
        />
        {previous && (
          <Radar
            name="Previous"
            dataKey="previous"
            stroke="#64748b"
            fill="#64748b"
            fillOpacity={0.15}
            strokeWidth={1}
            strokeDasharray="4 4"
          />
        )}
        <Radar
          name="Current"
          dataKey="current"
          stroke="#6366f1"
          fill="#6366f1"
          fillOpacity={0.25}
          strokeWidth={2}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: '#2a2a3e',
            border: '1px solid #3f3f5f',
            borderRadius: '8px',
            color: '#e2e8f0',
            fontSize: '13px',
          }}
          formatter={(_value: unknown, name: unknown, props: unknown) => {
            const p = props as { payload?: { rawCurrent?: number; rawPrevious?: number } };
            const raw = name === 'Current' ? p.payload?.rawCurrent : p.payload?.rawPrevious;
            return [raw ?? '–', String(name)];
          }}
        />
      </RadarChart>
    </ResponsiveContainer>
  );
}
