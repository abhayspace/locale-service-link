-- Create server-side profile creation to avoid RLS/signup race conditions
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  -- Insert a profile row for the new user using metadata
  INSERT INTO public.profiles (user_id, full_name, phone, user_type)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data ->> 'full_name', ''),
    COALESCE(NEW.raw_user_meta_data ->> 'phone', ''),
    COALESCE(NEW.raw_user_meta_data ->> 'user_type', 'user')
  )
  ON CONFLICT DO NOTHING;
  RETURN NEW;
END;
$$;

-- Create trigger if not exists
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger WHERE tgname = 'on_auth_user_created'
  ) THEN
    CREATE TRIGGER on_auth_user_created
      AFTER INSERT ON auth.users
      FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
  END IF;
END;$$;

-- Fix RLS policies to avoid referencing auth.users directly
-- PROFILES
DROP POLICY IF EXISTS "Enable profile creation during signup" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert their own profile" ON public.profiles;
CREATE POLICY "Users can insert their own profile"
ON public.profiles
FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Ensure select/update own remain intact (recreate idempotently)
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT USING (auth.uid() = user_id);
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = user_id);

-- PROFESSIONAL PROFILES
DROP POLICY IF EXISTS "Enable professional profile creation" ON public.professional_profiles;
DROP POLICY IF EXISTS "Professionals can insert their own profile" ON public.professional_profiles;
CREATE POLICY "Professionals can insert their own profile"
ON public.professional_profiles
FOR INSERT
WITH CHECK (auth.uid() = user_id);