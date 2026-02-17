import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import type { ProtocolDeployment } from '../types';

export function useDeployments(status?: 'active' | 'completed' | 'abandoned') {
  const [deployments, setDeployments] = useState<ProtocolDeployment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDeployments = useCallback(async () => {
    setLoading(true);
    let query = supabase
      .from('protocol_deployments')
      .select('*, protocols(name)')
      .order('activated_at', { ascending: false });

    if (status) {
      query = query.eq('status', status);
    }

    const { data, error: err } = await query;
    if (err) {
      setError(err.message);
    } else {
      setDeployments((data as ProtocolDeployment[]) || []);
    }
    setLoading(false);
  }, [status]);

  useEffect(() => {
    fetchDeployments();
  }, [fetchDeployments]);

  return { deployments, loading, error, refetch: fetchDeployments };
}
