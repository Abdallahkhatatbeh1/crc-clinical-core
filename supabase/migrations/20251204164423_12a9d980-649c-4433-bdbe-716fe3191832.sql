-- Create storage bucket for site images
INSERT INTO storage.buckets (id, name, public) VALUES ('site-images', 'site-images', true);

-- Allow public read access to site images
CREATE POLICY "Anyone can view site images"
ON storage.objects FOR SELECT
USING (bucket_id = 'site-images');

-- Allow admins to upload site images
CREATE POLICY "Admins can upload site images"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'site-images' AND has_role(auth.uid(), 'admin'));

-- Allow admins to update site images
CREATE POLICY "Admins can update site images"
ON storage.objects FOR UPDATE
USING (bucket_id = 'site-images' AND has_role(auth.uid(), 'admin'));

-- Allow admins to delete site images
CREATE POLICY "Admins can delete site images"
ON storage.objects FOR DELETE
USING (bucket_id = 'site-images' AND has_role(auth.uid(), 'admin'));

-- Add more content entries for all sections
INSERT INTO public.site_content (page, section, content_key, content_value, content_type) VALUES
-- Home page - Features section
('home', 'features', 'feature1_title', 'Therapeutic Expertise', 'text'),
('home', 'features', 'feature1_description', 'Specialized experience across Dermatology, Rheumatology, Gastroenterology, and Respiratory therapeutic areas.', 'text'),
('home', 'features', 'feature2_title', 'Regulatory Excellence', 'text'),
('home', 'features', 'feature2_description', 'Full compliance with ICH-GCP, FDA, EMA guidelines and local regulatory requirements.', 'text'),
('home', 'features', 'feature3_title', 'Quality Assurance', 'text'),
('home', 'features', 'feature3_description', 'Rigorous quality management systems ensuring data integrity and patient safety.', 'text'),

-- Footer content
('global', 'footer', 'company_description', 'Your trusted partner in clinical research excellence. Delivering reliable, high-quality clinical trials across Jordan and the MENA region.', 'text'),
('global', 'footer', 'phone', '+962 6 XXX XXXX', 'text'),
('global', 'footer', 'email', 'info@crc-jordan.com', 'text'),
('global', 'footer', 'address', 'Amman, Jordan', 'text'),

-- About page - Team section
('about', 'team', 'section_title', 'Our Leadership Team', 'text'),
('about', 'team', 'section_subtitle', 'Meet the experts driving clinical research excellence', 'text'),

-- About page - Values section
('about', 'values', 'section_title', 'Our Core Values', 'text'),
('about', 'values', 'value1_title', 'Integrity', 'text'),
('about', 'values', 'value1_description', 'We uphold the highest ethical standards in all our research activities.', 'text'),
('about', 'values', 'value2_title', 'Excellence', 'text'),
('about', 'values', 'value2_description', 'We strive for excellence in every aspect of clinical research.', 'text'),
('about', 'values', 'value3_title', 'Innovation', 'text'),
('about', 'values', 'value3_description', 'We embrace innovative approaches to advance clinical research.', 'text'),

-- Services page - List section
('services', 'list', 'section_title', 'Our Services', 'text'),
('services', 'list', 'service1_title', 'Phase I-IV Clinical Trials', 'text'),
('services', 'list', 'service1_description', 'Comprehensive clinical trial management from early phase to post-marketing studies.', 'text'),
('services', 'list', 'service2_title', 'Site Management', 'text'),
('services', 'list', 'service2_description', 'Expert site management ensuring efficient trial execution and patient recruitment.', 'text'),
('services', 'list', 'service3_title', 'Regulatory Affairs', 'text'),
('services', 'list', 'service3_description', 'Navigate complex regulatory requirements with our experienced team.', 'text'),

-- Studies page - Areas section
('studies', 'areas', 'section_title', 'Therapeutic Areas', 'text'),
('studies', 'areas', 'area1_title', 'Dermatology', 'text'),
('studies', 'areas', 'area1_description', 'Extensive experience in dermatological clinical trials.', 'text'),
('studies', 'areas', 'area2_title', 'Rheumatology', 'text'),
('studies', 'areas', 'area2_description', 'Specialized expertise in rheumatology research.', 'text'),
('studies', 'areas', 'area3_title', 'Gastroenterology', 'text'),
('studies', 'areas', 'area3_description', 'Advanced capabilities in GI clinical studies.', 'text'),
('studies', 'areas', 'area4_title', 'Respiratory', 'text'),
('studies', 'areas', 'area4_description', 'Comprehensive respiratory disease research programs.', 'text'),

-- Why Us page sections
('whyus', 'features', 'section_title', 'Why Choose CRC?', 'text'),
('whyus', 'features', 'feature1_title', 'Experienced Team', 'text'),
('whyus', 'features', 'feature1_description', 'Our team brings decades of combined clinical research experience.', 'text'),
('whyus', 'features', 'feature2_title', 'Strategic Location', 'text'),
('whyus', 'features', 'feature2_description', 'Located in Jordan, gateway to the MENA region with diverse patient populations.', 'text'),
('whyus', 'features', 'feature3_title', 'Quality Standards', 'text'),
('whyus', 'features', 'feature3_description', 'Adherence to international quality standards and best practices.', 'text')

ON CONFLICT DO NOTHING;