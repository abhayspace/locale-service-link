-- Drop the existing overly permissive policy that exposes phone numbers
DROP POLICY IF EXISTS "Users can view professional basic info" ON public.profiles;

-- Create a new policy that requires authentication to view professional basic info
CREATE POLICY "Authenticated users can view professional basic info" 
ON public.profiles 
FOR SELECT 
USING (
  auth.role() = 'authenticated' 
  AND user_type = 'professional' 
  AND EXISTS (
    SELECT 1 
    FROM professional_profiles 
    WHERE professional_profiles.user_id = profiles.user_id
  )
);

-- Create a secure view that excludes sensitive information for professional listings
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