import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface Professional {
  id: string;
  user_id: string;
  full_name: string | null;
  avatar_url: string | null;
  location: string | null;
  service_type: string;
  bio: string | null;
  hourly_rate: number | null;
  rating: number | null;
  total_jobs: number | null;
  skills: string[] | null;
  availability: string | null;
  photos: string[] | null;
}

export const useProfessionals = () => {
  const [professionals, setProfessionals] = useState<Professional[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProfessionals = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch from the secure view that excludes sensitive information like phone numbers
      const { data, error: fetchError } = await supabase
        .from('professional_public_profiles')
        .select('*')
        .order('rating', { ascending: false });

      if (fetchError) {
        throw fetchError;
      }

      setProfessionals(data || []);
    } catch (err) {
      console.error('Error fetching professionals:', err);
      setError(err instanceof Error ? err.message : 'Failed to load professionals');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfessionals();
  }, []);

  return { professionals, loading, error, refetch: fetchProfessionals };
};