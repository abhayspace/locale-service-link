-- Fix remaining security issues (skip policies that already exist)

-- Create secure storage policies for professional photos if not already existing
DO $$ BEGIN
    -- Check and create policies that might not exist
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'objects' 
        AND policyname = 'Authenticated users can view professional photos'
    ) THEN
        CREATE POLICY "Authenticated users can view professional photos" 
        ON storage.objects 
        FOR SELECT 
        TO authenticated
        USING (bucket_id = 'professional-photos');
    END IF;
    
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'objects' 
        AND policyname = 'Professionals can update their own photos'
    ) THEN
        CREATE POLICY "Professionals can update their own photos" 
        ON storage.objects 
        FOR UPDATE 
        TO authenticated
        USING (
          bucket_id = 'professional-photos' 
          AND auth.uid()::text = (storage.foldername(name))[1]
        );
    END IF;
    
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'objects' 
        AND policyname = 'Professionals can delete their own photos'
    ) THEN
        CREATE POLICY "Professionals can delete their own photos" 
        ON storage.objects 
        FOR DELETE 
        TO authenticated
        USING (
          bucket_id = 'professional-photos' 
          AND auth.uid()::text = (storage.foldername(name))[1]
        );
    END IF;
END $$;

-- Add missing core features tables
CREATE TABLE IF NOT EXISTS public.service_requests (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid REFERENCES auth.users(id) NOT NULL,
    service_type text NOT NULL,
    title text NOT NULL,
    description text,
    location text NOT NULL,
    budget_min numeric,
    budget_max numeric,
    preferred_date date,
    preferred_time time,
    urgency text DEFAULT 'medium',
    status text DEFAULT 'open',
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- Enable RLS on service requests
ALTER TABLE public.service_requests ENABLE ROW LEVEL SECURITY;

-- Service request policies
CREATE POLICY "Users can view service requests" 
ON public.service_requests 
FOR SELECT 
TO authenticated
USING (true);

CREATE POLICY "Users can create their own service requests" 
ON public.service_requests 
FOR INSERT 
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own service requests" 
ON public.service_requests 
FOR UPDATE 
TO authenticated
USING (auth.uid() = user_id);

-- Add reviews table
CREATE TABLE IF NOT EXISTS public.reviews (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    reviewer_id uuid REFERENCES auth.users(id) NOT NULL,
    professional_id uuid NOT NULL,
    booking_id uuid REFERENCES public.bookings(id),
    rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
    title text,
    comment text,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- Enable RLS on reviews
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

-- Review policies
CREATE POLICY "Anyone can view reviews" 
ON public.reviews 
FOR SELECT 
TO authenticated
USING (true);

CREATE POLICY "Users can create reviews for their bookings" 
ON public.reviews 
FOR INSERT 
TO authenticated
WITH CHECK (auth.uid() = reviewer_id);

CREATE POLICY "Users can update their own reviews" 
ON public.reviews 
FOR UPDATE 
TO authenticated
USING (auth.uid() = reviewer_id);

-- Add triggers for updated_at
CREATE TRIGGER update_service_requests_updated_at
BEFORE UPDATE ON public.service_requests
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_reviews_updated_at
BEFORE UPDATE ON public.reviews
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Add function to update professional ratings based on reviews
CREATE OR REPLACE FUNCTION public.update_professional_rating()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    -- Update the professional's rating and total jobs
    UPDATE professional_profiles 
    SET 
        rating = (
            SELECT ROUND(AVG(rating)::numeric, 1) 
            FROM reviews 
            WHERE professional_id = 
                CASE 
                    WHEN TG_OP = 'DELETE' THEN OLD.professional_id
                    ELSE NEW.professional_id
                END
        ),
        total_jobs = (
            SELECT COUNT(*)
            FROM reviews 
            WHERE professional_id = 
                CASE 
                    WHEN TG_OP = 'DELETE' THEN OLD.professional_id
                    ELSE NEW.professional_id
                END
        )
    WHERE user_id = 
        CASE 
            WHEN TG_OP = 'DELETE' THEN OLD.professional_id
            ELSE NEW.professional_id
        END;
    
    RETURN COALESCE(NEW, OLD);
END;
$$;

-- Add trigger to update ratings when reviews change
CREATE TRIGGER update_professional_rating_trigger
AFTER INSERT OR UPDATE OR DELETE ON public.reviews
FOR EACH ROW
EXECUTE FUNCTION public.update_professional_rating();