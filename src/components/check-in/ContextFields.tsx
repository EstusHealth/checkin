interface ContextFieldsProps {
  values: {
    life_events: string;
    barriers: string;
    notes: string;
    gaming_notes: string;
    week_type: string;
  };
  onChange: (field: string, value: string) => void;
}

const WEEK_TYPES = [
  { value: 'normal', label: 'Normal' },
  { value: 'high_load', label: 'High Load' },
  { value: 'recovery', label: 'Recovery' },
  { value: 'transition', label: 'Transition' },
  { value: 'crisis', label: 'Crisis' },
];

export function ContextFields({ values, onChange }: ContextFieldsProps) {
  return (
    <div className="bg-surface-light rounded-xl p-4 border border-border space-y-4">
      <h3 className="text-sm font-semibold uppercase tracking-wider text-text-muted">
        Context (optional)
      </h3>

      <div>
        <label className="block text-sm font-medium text-text mb-1">Week Type</label>
        <select
          value={values.week_type}
          onChange={(e) => onChange('week_type', e.target.value)}
          className="w-full bg-surface-lighter border border-border rounded-lg px-3 py-2 text-text text-sm"
        >
          {WEEK_TYPES.map((wt) => (
            <option key={wt.value} value={wt.value}>
              {wt.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-text mb-1">Life Events</label>
        <textarea
          value={values.life_events}
          onChange={(e) => onChange('life_events', e.target.value)}
          placeholder="Major events, disruptions, wins..."
          rows={2}
          className="w-full bg-surface-lighter border border-border rounded-lg px-3 py-2 text-text text-sm placeholder:text-text-muted resize-none"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-text mb-1">Barriers</label>
        <textarea
          value={values.barriers}
          onChange={(e) => onChange('barriers', e.target.value)}
          placeholder="What got in the way this week..."
          rows={2}
          className="w-full bg-surface-lighter border border-border rounded-lg px-3 py-2 text-text text-sm placeholder:text-text-muted resize-none"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-text mb-1">Gaming Notes</label>
        <textarea
          value={values.gaming_notes}
          onChange={(e) => onChange('gaming_notes', e.target.value)}
          placeholder="What you played, how it felt, what it displaced..."
          rows={2}
          className="w-full bg-surface-lighter border border-border rounded-lg px-3 py-2 text-text text-sm placeholder:text-text-muted resize-none"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-text mb-1">Notes</label>
        <textarea
          value={values.notes}
          onChange={(e) => onChange('notes', e.target.value)}
          placeholder="Anything else worth logging..."
          rows={2}
          className="w-full bg-surface-lighter border border-border rounded-lg px-3 py-2 text-text text-sm placeholder:text-text-muted resize-none"
        />
      </div>
    </div>
  );
}
