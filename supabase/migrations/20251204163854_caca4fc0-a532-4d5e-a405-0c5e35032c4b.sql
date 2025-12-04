-- Add more content for all pages
INSERT INTO public.site_content (page, section, content_key, content_value, content_type) VALUES
-- About Page
('about', 'hero', 'title', 'About Clinical Research Center', 'text'),
('about', 'hero', 'subtitle', 'Leading clinical research in Jordan since establishment', 'text'),
('about', 'vision', 'title', 'Our Vision', 'text'),
('about', 'vision', 'description', 'To be a leading clinical research center in the Middle East', 'text'),
('about', 'mission', 'title', 'Our Mission', 'text'),
('about', 'mission', 'description', 'To advance medical science through high-quality clinical trials', 'text'),
-- Services Page
('services', 'hero', 'title', 'Our Services', 'text'),
('services', 'hero', 'subtitle', 'Comprehensive clinical trial services from start to finish', 'text'),
('services', 'service1', 'title', 'Phase I-IV Clinical Trials', 'text'),
('services', 'service1', 'description', 'Full-service clinical trial management across all phases', 'text'),
('services', 'service2', 'title', 'Patient Recruitment', 'text'),
('services', 'service2', 'description', 'Efficient patient recruitment and enrollment strategies', 'text'),
('services', 'service3', 'title', 'Regulatory Support', 'text'),
('services', 'service3', 'description', 'Expert regulatory affairs and compliance support', 'text'),
-- Studies Page
('studies', 'hero', 'title', 'Our Studies', 'text'),
('studies', 'hero', 'subtitle', 'Explore our therapeutic areas and ongoing research', 'text'),
-- Contact Page
('contact', 'hero', 'title', 'Contact Us', 'text'),
('contact', 'hero', 'subtitle', 'Get in touch with our team', 'text'),
('contact', 'info', 'email', 'info@crc-jordan.com', 'text'),
('contact', 'info', 'phone', '+962 2 700 0000', 'text'),
('contact', 'info', 'address', 'Irbid, Jordan', 'text'),
-- Why Us Page
('whyus', 'hero', 'title', 'Why Choose CRC', 'text'),
('whyus', 'hero', 'subtitle', 'Your trusted partner in clinical research excellence', 'text')
ON CONFLICT (page, section, content_key) DO NOTHING;