-- Create profiles table for user information
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  full_name TEXT NOT NULL,
  nik TEXT,
  phone TEXT,
  date_of_birth DATE,
  address TEXT,
  province TEXT,
  city TEXT,
  postal_code TEXT,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Enable RLS on profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view their own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Create programs table (study programs)
CREATE TABLE public.programs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  faculty TEXT NOT NULL,
  degree_level TEXT NOT NULL,
  accreditation TEXT,
  quota INTEGER,
  tuition_fee DECIMAL(12, 2),
  description TEXT,
  requirements TEXT,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Enable RLS on programs (public read access)
ALTER TABLE public.programs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view programs"
  ON public.programs FOR SELECT
  USING (true);

-- Create applications table
CREATE TABLE public.applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  program_id UUID REFERENCES public.programs(id) NOT NULL,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'submitted', 'review', 'accepted', 'rejected')),
  registration_number TEXT UNIQUE,
  first_choice_program_id UUID REFERENCES public.programs(id),
  second_choice_program_id UUID REFERENCES public.programs(id),
  submission_date TIMESTAMPTZ,
  review_date TIMESTAMPTZ,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Enable RLS on applications
ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own applications"
  ON public.applications FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own applications"
  ON public.applications FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own draft applications"
  ON public.applications FOR UPDATE
  USING (auth.uid() = user_id AND status = 'draft');

-- Create documents table
CREATE TABLE public.documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  application_id UUID REFERENCES public.applications(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  document_type TEXT NOT NULL CHECK (document_type IN ('ktp', 'ijazah', 'transkrip', 'foto', 'surat_keterangan', 'other')),
  file_name TEXT NOT NULL,
  file_path TEXT NOT NULL,
  file_size INTEGER,
  mime_type TEXT,
  uploaded_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Enable RLS on documents
ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own documents"
  ON public.documents FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can upload their own documents"
  ON public.documents FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own documents"
  ON public.documents FOR DELETE
  USING (auth.uid() = user_id);

-- Create trigger for updating updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_applications_updated_at
  BEFORE UPDATE ON public.applications
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create function to auto-create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, full_name)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email)
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Create storage bucket for application documents
INSERT INTO storage.buckets (id, name, public) 
VALUES ('application-documents', 'application-documents', false);

-- Storage policies for application documents
CREATE POLICY "Users can view their own documents"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'application-documents' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can upload their own documents"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'application-documents' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can update their own documents"
  ON storage.objects FOR UPDATE
  USING (bucket_id = 'application-documents' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can delete their own documents"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'application-documents' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Insert sample programs
INSERT INTO public.programs (name, faculty, degree_level, accreditation, quota, tuition_fee, description, requirements) VALUES
('Teknik Informatika', 'Fakultas Teknik', 'S1', 'A', 120, 5000000, 'Program studi yang mempelajari ilmu komputer, pemrograman, dan teknologi informasi', 'Nilai rata-rata minimal 7.0, Nilai Matematika minimal 7.5'),
('Kedokteran', 'Fakultas Kedokteran', 'S1', 'A', 100, 15000000, 'Program studi kedokteran umum dengan pendidikan profesi dokter', 'Nilai rata-rata minimal 8.5, Nilai IPA minimal 8.0'),
('Akuntansi', 'Fakultas Ekonomi dan Bisnis', 'S1', 'A', 150, 4500000, 'Program studi yang mempelajari akuntansi, keuangan, dan perpajakan', 'Nilai rata-rata minimal 7.0, Nilai Matematika minimal 7.0'),
('Hukum', 'Fakultas Hukum', 'S1', 'A', 100, 4000000, 'Program studi yang mempelajari ilmu hukum dan sistem peradilan Indonesia', 'Nilai rata-rata minimal 7.0'),
('Psikologi', 'Fakultas Psikologi', 'S1', 'A', 80, 4500000, 'Program studi yang mempelajari perilaku manusia dan kesehatan mental', 'Nilai rata-rata minimal 7.5');
