import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import type { CheckIn, DomainKey } from '../types';
import { ALL_DOMAIN_KEYS } from '../lib/domains';
import { getCurrentWeekStart } from '../lib/scoring';

export function useCheckIns(limit?: number) {
  const [checkIns, setCheckIns] = useState<CheckIn[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCheckIns = useCallback(async () => {
    setLoading(true);
    let query = supabase
      .from('check_ins')
      .select('*')
      .order('week_start', { ascending: false });

    if (limit) {
      query = query.limit(limit);
    }

    const { data, error: err } = await query;
    if (err) {
      setError(err.message);
    } else {
      setCheckIns((data as CheckIn[]) || []);
    }
    setLoading(false);
  }, [limit]);

  useEffect(() => {
    fetchCheckIns();
  }, [fetchCheckIns]);

  return { checkIns, loading, error, refetch: fetchCheckIns };
}

export function useCheckIn(id?: string) {
  const [checkIn, setCheckIn] = useState<CheckIn | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }

    async function fetch() {
      setLoading(true);
      const { data, error: err } = await supabase
        .from('check_ins')
        .select('*')
        .eq('id', id)
        .single();

      if (err) {
        setError(err.message);
      } else {
        setCheckIn(data as CheckIn);
      }
      setLoading(false);
    }

    fetch();
  }, [id]);

  return { checkIn, loading, error };
}

export function useLatestCheckIn() {
  const [checkIn, setCheckIn] = useState<CheckIn | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetch() {
      const { data } = await supabase
        .from('check_ins')
        .select('*')
        .order('week_start', { ascending: false })
        .limit(1)
        .single();

      setCheckIn(data as CheckIn | null);
      setLoading(false);
    }

    fetch();
  }, []);

  return { checkIn, loading };
}

export type CheckInFormData = Partial<Record<DomainKey, number>> & {
  week_start: string;
  life_events?: string;
  barriers?: string;
  notes?: string;
  gaming_notes?: string;
  week_type?: string;
};

export async function saveCheckIn(data: CheckInFormData, existingId?: string) {
  if (existingId) {
    const { error } = await supabase
      .from('check_ins')
      .update({ ...data, updated_at: new Date().toISOString() })
      .eq('id', existingId);
    return { error };
  }

  const { error } = await supabase.from('check_ins').insert(data);
  return { error };
}

/**
 * Build default form values: either from a previous check-in or all 5s.
 */
export function getDefaultFormValues(previous?: CheckIn | null): CheckInFormData {
  const weekStart = getCurrentWeekStart();
  const defaults: CheckInFormData = { week_start: weekStart };

  for (const key of ALL_DOMAIN_KEYS) {
    defaults[key] = previous?.[key] as number ?? 5;
  }

  return defaults;
}
