-- Create app_role enum
CREATE TYPE public.app_role AS ENUM ('admin', 'editor');

-- Create user_roles table for admin management
CREATE TABLE public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    UNIQUE (user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- RLS policy for user_roles - only admins can view
CREATE POLICY "Admins can view all roles"
ON public.user_roles
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Create site_content table for dynamic content
CREATE TABLE public.site_content (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    page TEXT NOT NULL,
    section TEXT NOT NULL,
    content_key TEXT NOT NULL,
    content_value TEXT,
    content_type TEXT NOT NULL DEFAULT 'text',
    image_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    UNIQUE (page, section, content_key)
);

-- Enable RLS on site_content
ALTER TABLE public.site_content ENABLE ROW LEVEL SECURITY;

-- Everyone can read site content (public website)
CREATE POLICY "Anyone can read site content"
ON public.site_content
FOR SELECT
TO anon, authenticated
USING (true);

-- Only admins can insert/update/delete content
CREATE POLICY "Admins can manage site content"
ON public.site_content
FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_site_content_updated_at
BEFORE UPDATE ON public.site_content
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default content for home page
INSERT INTO public.site_content (page, section, content_key, content_value, content_type) VALUES
-- Hero Section
('home', 'hero', 'title', 'Your Trusted Partner in Clinical Research', 'text'),
('home', 'hero', 'subtitle', 'We conduct clinical trials with the highest standards of quality, safety, and scientific integrity to advance medical research and improve patient outcomes.', 'text'),
('home', 'hero', 'cta_text', 'Contact Us', 'text'),
-- Who We Are Section
('home', 'who_we_are', 'tag', 'ABOUT US', 'text'),
('home', 'who_we_are', 'title', 'Who We Are', 'text'),
('home', 'who_we_are', 'description', 'Clinical Research Center (CRC) is a premier clinical research facility dedicated to conducting high-quality clinical trials. Our state-of-the-art facilities and experienced team ensure the highest standards of research excellence.', 'text'),
-- Feature Cards
('home', 'features', 'card1_title', 'Expert Team', 'text'),
('home', 'features', 'card1_description', 'Our team of experienced researchers and medical professionals brings decades of combined expertise in clinical trials.', 'text'),
('home', 'features', 'card2_title', 'Quality Assurance', 'text'),
('home', 'features', 'card2_description', 'We maintain the highest standards of quality and compliance with international regulations and guidelines.', 'text'),
('home', 'features', 'card3_title', 'Patient Care', 'text'),
('home', 'features', 'card3_description', 'Patient safety and well-being are at the heart of everything we do, ensuring the best possible care throughout the trial process.', 'text'),
-- CTA Section
('home', 'cta', 'title', 'Ready to Partner With Us?', 'text'),
('home', 'cta', 'description', 'Contact us today to learn more about how we can support your clinical research needs.', 'text'),
('home', 'cta', 'button_text', 'Get in Touch', 'text');