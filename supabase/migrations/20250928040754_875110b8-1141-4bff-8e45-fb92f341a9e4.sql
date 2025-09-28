-- Create storage bucket for professional photos
INSERT INTO storage.buckets (id, name, public) VALUES ('professional-photos', 'professional-photos', true);

-- Create policies for professional photos
CREATE POLICY "Professional photos are publicly accessible" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'professional-photos');

CREATE POLICY "Professionals can upload their own photos" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'professional-photos' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Professionals can update their own photos" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'professional-photos' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Professionals can delete their own photos" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'professional-photos' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Add photos column to professional_profiles
ALTER TABLE professional_profiles ADD COLUMN photos TEXT[] DEFAULT '{}';

-- Drop activities table as it's no longer needed
DROP TABLE IF EXISTS activities;