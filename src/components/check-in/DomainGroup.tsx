import type { DomainCategory } from '../../lib/domains';
import { getDomainsByCategory, DOMAIN_CATEGORIES } from '../../lib/domains';
import { DomainSlider } from './DomainSlider';
import type { DomainKey } from '../../types';

interface DomainGroupProps {
  category: DomainCategory;
  values: Partial<Record<DomainKey, number>>;
  onChange: (key: DomainKey, value: number) => void;
}

export function DomainGroup({ category, values, onChange }: DomainGroupProps) {
  const domains = getDomainsByCategory(category);
  const categoryInfo = DOMAIN_CATEGORIES[category];

  return (
    <div className="bg-surface-light rounded-xl p-4 border border-border">
      <h3
        className="text-sm font-semibold uppercase tracking-wider mb-3"
        style={{ color: categoryInfo.color }}
      >
        {categoryInfo.label}
      </h3>
      <div className="space-y-1">
        {domains.map((domain) => (
          <DomainSlider
            key={domain.key}
            domain={domain}
            value={values[domain.key] ?? 5}
            onChange={(v) => onChange(domain.key, v)}
          />
        ))}
      </div>
    </div>
  );
}
