-- Drop and recreate the view without SECURITY DEFINER to fix the security warning
DROP VIEW IF EXISTS public.professional_public_profiles;

-- Create a secure view that excludes sensitive information for professional listings
-- Using default SECURITY INVOKER mode (safer than SECURITY DEFINER)
CREATE VIEW public.professional_public_profiles AS 
SELECT 
  p.id,
  p.user_id,
  p.full_name,
  p.avatar_url,
  p.location,
  p.user_type,
  p.created_at,
  p.updated_at,
  pp.service_type,
  pp.bio,
  pp.hourly_rate,
  pp.rating,
  pp.total_jobs,
  pp.skills,
  pp.availability,
  pp.photos
FROM public.profiles p
JOIN public.professional_profiles pp ON p.user_id = pp.user_id
WHERE p.user_type = 'professional';