import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import type { Protocol, TriggerRule } from '../types';

export function useProtocols() {
  const [protocols, setProtocols] = useState<Protocol[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProtocols = useCallback(async () => {
    setLoading(true);
    const { data, error: err } = await supabase
      .from('protocols')
      .select('*')
      .order('name');

    if (err) {
      setError(err.message);
    } else {
      setProtocols((data as Protocol[]) || []);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchProtocols();
  }, [fetchProtocols]);

  return { protocols, loading, error, refetch: fetchProtocols };
}

export function useTriggerRules(protocolId?: string) {
  const [rules, setRules] = useState<TriggerRule[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!protocolId) {
      setLoading(false);
      return;
    }

    async function fetch() {
      const { data } = await supabase
        .from('trigger_rules')
        .select('*')
        .eq('protocol_id', protocolId);

      setRules((data as TriggerRule[]) || []);
      setLoading(false);
    }

    fetch();
  }, [protocolId]);

  return { rules, loading };
}
