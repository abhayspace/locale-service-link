-- Fix RLS policies - drop ALL existing policies and recreate them properly
DROP POLICY IF EXISTS "Users can insert their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Authenticated users can view professional basic info" ON public.profiles;
DROP POLICY IF EXISTS "Authenticated users can view professional profiles" ON public.profiles;

-- Create simplified, working policies for profiles
CREATE POLICY "Enable profile creation during signup" 
ON public.profiles 
FOR INSERT 
WITH CHECK (
  -- Allow during signup when user exists in auth.users
  EXISTS (SELECT 1 FROM auth.users WHERE id = user_id)
);

CREATE POLICY "Users can view own profile" 
ON public.profiles 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can update own profile" 
ON public.profiles 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Public can view professional basic info" 
ON public.profiles 
FOR SELECT 
USING (user_type = 'professional');

-- Also fix the professional_profiles policy
DROP POLICY IF EXISTS "Professionals can insert their own profile" ON public.professional_profiles;
DROP POLICY IF EXISTS "Enable professional profile creation during signup" ON public.professional_profiles;

CREATE POLICY "Enable professional profile creation" 
ON public.professional_profiles 
FOR INSERT 
WITH CHECK (
  EXISTS (SELECT 1 FROM auth.users WHERE id = user_id)
);