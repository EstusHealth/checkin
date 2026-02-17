import { getScoreColor } from '../../lib/scoring';
import type { DomainConfig } from '../../lib/domains';

interface DomainSliderProps {
  domain: DomainConfig;
  value: number;
  onChange: (value: number) => void;
}

export function DomainSlider({ domain, value, onChange }: DomainSliderProps) {
  return (
    <div className="py-2">
      <div className="flex items-center justify-between mb-1">
        <label className="text-sm font-medium text-text" title={domain.description}>
          {domain.label}
        </label>
        <span
          className="text-sm font-bold w-6 text-center rounded"
          style={{ color: getScoreColor(value) }}
        >
          {value}
        </span>
      </div>
      <input
        type="range"
        min={1}
        max={10}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full"
        style={{
          accentColor: getScoreColor(value),
        }}
      />
      <div className="flex justify-between text-xs text-text-muted mt-0.5">
        <span>1</span>
        <span>5</span>
        <span>10</span>
      </div>
    </div>
  );
}
