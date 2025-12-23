-- Add missing Contact page content (form and join_team sections)
INSERT INTO public.site_content (page, section, content_key, content_value, content_type) VALUES
-- Hero additional cards
('contact', 'hero', 'card1_label', 'Email Us', 'text'),
('contact', 'hero', 'card2_label', 'Call Us', 'text'),
('contact', 'hero', 'card3_label', 'Visit Us', 'text'),
('contact', 'hero', 'card4_label', '24/7 Support', 'text'),

-- Contact Form Section
('contact', 'form', 'tag', 'Contact Us', 'text'),
('contact', 'form', 'title', 'Let''s Start a', 'text'),
('contact', 'form', 'title_highlight', 'Conversation', 'text'),
('contact', 'form', 'description', 'CRC is a GCP-compliant clinical research center in Jordan, partnering with global CROs and sponsors to conduct high-quality Phase I–IV clinical trials.', 'text'),
('contact', 'form', 'email', 'info@crcjo.com', 'text'),
('contact', 'form', 'email_label', 'Email', 'text'),
('contact', 'form', 'location', 'Irbid, Jordan', 'text'),
('contact', 'form', 'location_detail', 'Clinical Research District', 'text'),
('contact', 'form', 'location_label', 'Location', 'text'),
('contact', 'form', 'badge1', 'GCP Compliant', 'text'),
('contact', 'form', 'badge2', 'Phase I-IV', 'text'),
('contact', 'form', 'badge3', 'Global Partners', 'text'),
('contact', 'form', 'form_title', 'Send Us a Message', 'text'),
('contact', 'form', 'submit_button', 'Send Message', 'text'),
('contact', 'form', 'success_title', 'Message Sent Successfully!', 'text'),
('contact', 'form', 'success_message', 'Thank you for contacting CRC. We''ll respond within 24-48 hours.', 'text'),

-- Join Team Section
('contact', 'join_team', 'tag', 'Careers', 'text'),
('contact', 'join_team', 'title', 'Join Our', 'text'),
('contact', 'join_team', 'title_highlight', 'Team', 'text'),
('contact', 'join_team', 'description', 'We welcome skilled professionals interested in becoming part of a scientifically advanced clinical operations team, including investigators, scientists, pharmacists, clinical research coordinators, and specialists in data management and clinical trials methodology.', 'text'),
('contact', 'join_team', 'position1_title', 'Investigators', 'text'),
('contact', 'join_team', 'position1_desc', 'Principal & Sub-Investigators', 'text'),
('contact', 'join_team', 'position2_title', 'Scientists', 'text'),
('contact', 'join_team', 'position2_desc', 'Research Scientists', 'text'),
('contact', 'join_team', 'position3_title', 'Pharmacists', 'text'),
('contact', 'join_team', 'position3_desc', 'Clinical Pharmacists', 'text'),
('contact', 'join_team', 'position4_title', 'Coordinators', 'text'),
('contact', 'join_team', 'position4_desc', 'Clinical Research Coordinators', 'text'),
('contact', 'join_team', 'position5_title', 'Data Specialists', 'text'),
('contact', 'join_team', 'position5_desc', 'Data Management Experts', 'text'),
('contact', 'join_team', 'position6_title', 'Clinical Staff', 'text'),
('contact', 'join_team', 'position6_desc', 'Research Nurses & Specialists', 'text'),
('contact', 'join_team', 'button_text', 'Our Rules', 'text'),
('contact', 'join_team', 'button_subtitle', 'Download our guidelines and policies', 'text');

-- Update hero subtitle with better content
UPDATE public.site_content 
SET content_value = 'Whether you represent a CRO, a pharmaceutical CRO, a biotech company, or a global sponsor seeking a scientifically robust clinical trial site in Jordan, our team is prepared to support compliant clinical trial management and evidence-driven research execution.'
WHERE page = 'contact' AND section = 'hero' AND content_key = 'subtitle';

-- Update hero title
UPDATE public.site_content 
SET content_value = 'Get in Touch With'
WHERE page = 'contact' AND section = 'hero' AND content_key = 'title';