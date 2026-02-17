import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { DomainGroup } from './DomainGroup';
import { ContextFields } from './ContextFields';
import {
  useLatestCheckIn,
  useCheckIn,
  getDefaultFormValues,
  saveCheckIn,
} from '../../hooks/useCheckIns';
import type { DomainKey } from '../../types';
import type { DomainCategory } from '../../lib/domains';
import { getCurrentWeekStart } from '../../lib/scoring';

const CATEGORIES: DomainCategory[] = [
  'foundational',
  'cognitive',
  'relational',
  'regulatory',
  'screen',
  'overall',
];

export function CheckInForm() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEditing = !!id;

  const { checkIn: latestCheckIn, loading: loadingLatest } = useLatestCheckIn();
  const { checkIn: editingCheckIn, loading: loadingEdit } = useCheckIn(id);

  const [domainValues, setDomainValues] = useState<Partial<Record<DomainKey, number>>>({});
  const [contextValues, setContextValues] = useState({
    life_events: '',
    barriers: '',
    notes: '',
    gaming_notes: '',
    week_type: 'normal',
  });
  const [weekStart, setWeekStart] = useState(getCurrentWeekStart());
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [initialized, setInitialized] = useState(false);

  // Initialize form values
  useEffect(() => {
    if (initialized) return;

    if (isEditing && editingCheckIn) {
      // Editing existing check-in
      const domains: Partial<Record<DomainKey, number>> = {};
      const allKeys: DomainKey[] = [
        'sleep_quality', 'sleep_quantity', 'movement', 'nutrition', 'hydration',
        'deep_work', 'executive_function', 'cognitive_load', 'creative_output',
        'social_connection', 'intimate_relationship', 'professional_relationships',
        'emotional_regulation', 'sensory_load', 'stimulation_seeking', 'avoidance_patterns',
        'gaming_recovery_vs_avoidance', 'screen_time_quality', 'overall_wellbeing',
      ];
      for (const key of allKeys) {
        domains[key] = (editingCheckIn[key] as number) ?? 5;
      }
      setDomainValues(domains);
      setWeekStart(editingCheckIn.week_start);
      setContextValues({
        life_events: editingCheckIn.life_events ?? '',
        barriers: editingCheckIn.barriers ?? '',
        notes: editingCheckIn.notes ?? '',
        gaming_notes: editingCheckIn.gaming_notes ?? '',
        week_type: editingCheckIn.week_type ?? 'normal',
      });
      setInitialized(true);
    } else if (!isEditing && !loadingLatest) {
      // New check-in — default to last week's scores
      const defaults = getDefaultFormValues(latestCheckIn);
      const { week_start, life_events, barriers, notes, gaming_notes, week_type, ...domains } = defaults;
      setDomainValues(domains);
      setWeekStart(week_start);
      setInitialized(true);
    }
  }, [isEditing, editingCheckIn, latestCheckIn, loadingLatest, initialized]);

  const handleDomainChange = (key: DomainKey, value: number) => {
    setDomainValues((prev) => ({ ...prev, [key]: value }));
  };

  const handleContextChange = (field: string, value: string) => {
    setContextValues((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    const data = {
      week_start: weekStart,
      ...domainValues,
      ...contextValues,
    };

    const { error: saveError } = await saveCheckIn(data, isEditing ? id : undefined);

    if (saveError) {
      setError(saveError.message);
      setSaving(false);
    } else {
      navigate('/');
    }
  };

  if ((isEditing && loadingEdit) || (!isEditing && loadingLatest && !initialized)) {
    return (
      <div className="flex items-center justify-center py-12 text-text-muted">
        Loading...
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-text">
          {isEditing ? 'Edit Check-In' : 'Weekly Check-In'}
        </h1>
        <div className="flex items-center gap-2">
          <label className="text-sm text-text-muted">Week of</label>
          <input
            type="date"
            value={weekStart}
            onChange={(e) => setWeekStart(e.target.value)}
            className="bg-surface-lighter border border-border rounded-lg px-3 py-1.5 text-text text-sm"
          />
        </div>
      </div>

      {CATEGORIES.map((category) => (
        <DomainGroup
          key={category}
          category={category}
          values={domainValues}
          onChange={handleDomainChange}
        />
      ))}

      <ContextFields values={contextValues} onChange={handleContextChange} />

      {error && (
        <div className="bg-red-900/30 border border-red-500/50 rounded-lg px-4 py-3 text-red-300 text-sm">
          {error}
        </div>
      )}

      <div className="flex gap-3 justify-end pb-8">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="px-4 py-2 rounded-lg bg-surface-lighter text-text-muted hover:text-text border border-border transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={saving}
          className="px-6 py-2 rounded-lg bg-primary text-white font-medium hover:bg-primary-dark disabled:opacity-50 transition-colors"
        >
          {saving ? 'Saving...' : isEditing ? 'Update' : 'Save Check-In'}
        </button>
      </div>
    </form>
  );
}
