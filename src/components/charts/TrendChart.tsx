import { useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { DOMAINS } from '../../lib/domains';
import { formatWeekLabel } from '../../lib/scoring';
import type { CheckIn, DomainKey } from '../../types';

interface TrendChartProps {
  checkIns: CheckIn[];
}

const RANGE_OPTIONS = [
  { label: '4w', weeks: 4 },
  { label: '12w', weeks: 12 },
  { label: '26w', weeks: 26 },
  { label: '52w', weeks: 52 },
  { label: 'All', weeks: 0 },
];

export function TrendChart({ checkIns }: TrendChartProps) {
  const [selectedDomains, setSelectedDomains] = useState<DomainKey[]>([
    'overall_wellbeing',
    'sleep_quality',
    'deep_work',
  ]);
  const [range, setRange] = useState(12);

  const toggleDomain = (key: DomainKey) => {
    setSelectedDomains((prev) =>
      prev.includes(key)
        ? prev.filter((d) => d !== key)
        : [...prev, key],
    );
  };

  // Reverse to chronological order, then slice
  const sorted = [...checkIns].reverse();
  const displayData = range === 0 ? sorted : sorted.slice(-range);

  const chartData = displayData.map((ci) => {
    const point: Record<string, string | number | null> = {
      week: formatWeekLabel(ci.week_start),
    };
    for (const key of selectedDomains) {
      point[key] = ci[key] as number | null;
    }
    return point;
  });

  return (
    <div className="space-y-4">
      {/* Range selector */}
      <div className="flex gap-2">
        {RANGE_OPTIONS.map((opt) => (
          <button
            key={opt.label}
            onClick={() => setRange(opt.weeks)}
            className={`px-3 py-1 rounded-lg text-sm transition-colors ${
              range === opt.weeks
                ? 'bg-primary text-white'
                : 'bg-surface-lighter text-text-muted hover:text-text'
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {/* Domain selector */}
      <div className="flex flex-wrap gap-2">
        {DOMAINS.map((domain) => (
          <button
            key={domain.key}
            onClick={() => toggleDomain(domain.key)}
            className={`px-2.5 py-1 rounded-full text-xs font-medium transition-colors border ${
              selectedDomains.includes(domain.key)
                ? 'border-transparent text-white'
                : 'border-border text-text-muted hover:text-text'
            }`}
            style={
              selectedDomains.includes(domain.key)
                ? { backgroundColor: domain.color }
                : {}
            }
          >
            {domain.shortLabel}
          </button>
        ))}
      </div>

      {/* Chart */}
      {displayData.length === 0 ? (
        <div className="flex items-center justify-center h-64 text-text-muted">
          No data in this range
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#3f3f5f" />
            <XAxis
              dataKey="week"
              tick={{ fill: '#94a3b8', fontSize: 11 }}
              tickLine={{ stroke: '#3f3f5f' }}
            />
            <YAxis
              domain={[1, 10]}
              tick={{ fill: '#94a3b8', fontSize: 11 }}
              tickLine={{ stroke: '#3f3f5f' }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#2a2a3e',
                border: '1px solid #3f3f5f',
                borderRadius: '8px',
                color: '#e2e8f0',
                fontSize: '13px',
              }}
            />
            <Legend />
            {selectedDomains.map((key) => {
              const domain = DOMAINS.find((d) => d.key === key);
              if (!domain) return null;
              return (
                <Line
                  key={key}
                  type="monotone"
                  dataKey={key}
                  name={domain.shortLabel}
                  stroke={domain.color}
                  strokeWidth={2}
                  dot={{ r: 3, fill: domain.color }}
                  connectNulls
                />
              );
            })}
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
