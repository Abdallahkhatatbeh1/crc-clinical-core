-- =====================================================
-- COMPREHENSIVE CONTENT MIGRATION
-- Adding all missing content for About, Services, Contact, Why Us pages
-- =====================================================

-- =====================================================
-- ABOUT PAGE - Mission Section (Vision & Mission content)
-- =====================================================
INSERT INTO public.site_content (page, section, content_key, content_value, content_type) VALUES
('about', 'mission', 'vision_tag', 'Our Vision', 'text'),
('about', 'mission', 'vision_text', 'To be the most scientifically trusted and operationally reliable clinical study site in Jordan and the Middle East, serving as a preferred collaborator for Contract Research Organizations and global sponsors.', 'text'),
('about', 'mission', 'mission_tag', 'Our Mission', 'text'),
('about', 'mission', 'mission_text', 'To conduct ethically governed, protocol-driven, and scientifically validated research that accelerates drug development, ensures patient safety, and supports both early-stage and global late phase CRO studies.', 'text')
ON CONFLICT DO NOTHING;

-- =====================================================
-- SERVICES PAGE - Services List Section
-- =====================================================
INSERT INTO public.site_content (page, section, content_key, content_value, content_type) VALUES
-- Header
('services', 'services_list', 'tag', 'Our Services', 'text'),
('services', 'services_list', 'title', 'Comprehensive', 'text'),
('services', 'services_list', 'title_highlight', 'Clinical Trial', 'text'),
('services', 'services_list', 'title_suffix', 'Solutions', 'text'),
('services', 'services_list', 'description', 'End-to-end support for high-quality, audit-ready research execution', 'text'),
-- Service 1
('services', 'services_list', 'service1_title', 'Regulatory & Clinical Trial Ethics Support', 'text'),
('services', 'services_list', 'service1_description', 'CRC provides full regulatory and ethics management, ensuring that all clinical studies meet national and international compliance standards.', 'text'),
-- Service 2
('services', 'services_list', 'service2_title', 'Clinical Trial Start-Up Services', 'text'),
('services', 'services_list', 'service2_description', 'CRC supports sponsors and CROs through efficient, structured start-up processes optimized for rapid study activation.', 'text'),
-- Service 3
('services', 'services_list', 'service3_title', 'Patient Recruitment & Enrollment Solutions', 'text'),
('services', 'services_list', 'service3_description', 'CRC maintains highly reliable patient recruitment frameworks supported by validated screening methods and regional population access advantages.', 'text'),
-- Service 4
('services', 'services_list', 'service4_title', 'Clinical Trial Conduct & Patient Management', 'text'),
('services', 'services_list', 'service4_description', 'CRC conducts all clinical visits and procedural requirements with scientific accuracy and strict protocol adherence.', 'text'),
-- Service 5
('services', 'services_list', 'service5_title', 'Medical & Laboratory Support Services', 'text'),
('services', 'services_list', 'service5_description', 'CRC provides medically supervised clinical procedures, laboratory processing, and sample handling that meet international research standards.', 'text'),
-- Service 6
('services', 'services_list', 'service6_title', 'Clinical Data Management & Documentation', 'text'),
('services', 'services_list', 'service6_description', 'CRC ensures accurate, compliant, audit-ready data supporting dependable clinical evidence.', 'text'),
-- Service 7
('services', 'services_list', 'service7_title', 'Monitoring, Auditing & CRO Collaboration', 'text'),
('services', 'services_list', 'service7_description', 'CRC supports on-site and remote monitoring activities with full transparency and operational readiness.', 'text'),
-- Service 8
('services', 'services_list', 'service8_title', 'Investigational Product (IP) Management & Pharmacy Services', 'text'),
('services', 'services_list', 'service8_description', 'IP handling is performed by qualified pharmacists trained in blinded and unblinded drug management.', 'text'),
-- Service 9
('services', 'services_list', 'service9_title', 'Study Close-Out Services', 'text'),
('services', 'services_list', 'service9_description', 'CRC completes all final regulatory and operational requirements for study closure.', 'text')
ON CONFLICT DO NOTHING;

-- =====================================================
-- SERVICES PAGE - Facilities Section
-- =====================================================
INSERT INTO public.site_content (page, section, content_key, content_value, content_type) VALUES
-- Header
('services', 'facilities_section', 'tag', 'Infrastructure', 'text'),
('services', 'facilities_section', 'title', 'Clinical Trial', 'text'),
('services', 'facilities_section', 'title_highlight', 'Facilities', 'text'),
('services', 'facilities_section', 'title_suffix', '& Equipment', 'text'),
('services', 'facilities_section', 'description', 'CRC provides clinical-grade infrastructure suitable for multi-phase and complex clinical studies.', 'text'),
-- Facility 1
('services', 'facilities_section', 'facility1_name', 'Dedicated study rooms', 'text'),
('services', 'facilities_section', 'facility1_desc', 'For screening, randomization, and follow-ups', 'text'),
-- Facility 2
('services', 'facilities_section', 'facility2_name', 'ECG, ultrasound, spirometry', 'text'),
('services', 'facilities_section', 'facility2_desc', 'And vital-sign monitoring equipment', 'text'),
-- Facility 3
('services', 'facilities_section', 'facility3_name', 'Emergency equipment', 'text'),
('services', 'facilities_section', 'facility3_desc', 'Including crash carts and oxygen', 'text'),
-- Facility 4
('services', 'facilities_section', 'facility4_name', 'Secure archival storage', 'text'),
('services', 'facilities_section', 'facility4_desc', 'For long-term retention of essential documents', 'text'),
-- Facility 5
('services', 'facilities_section', 'facility5_name', 'Private, access-controlled rooms', 'text'),
('services', 'facilities_section', 'facility5_desc', 'For CRA monitoring visits', 'text'),
-- Facility 6
('services', 'facilities_section', 'facility6_name', 'Robust data security systems', 'text'),
('services', 'facilities_section', 'facility6_desc', 'For compliance with GCP and privacy standards', 'text')
ON CONFLICT DO NOTHING;

-- =====================================================
-- CONTACT PAGE - Hero Section
-- =====================================================
INSERT INTO public.site_content (page, section, content_key, content_value, content_type) VALUES
('contact', 'hero', 'badge', 'Let''s Connect', 'text'),
('contact', 'hero', 'title', 'Get in Touch With', 'text'),
('contact', 'hero', 'title_highlight', 'CRC', 'text'),
('contact', 'hero', 'subtitle', 'Whether you represent a CRO, a pharmaceutical CRO, a biotech company, or a global sponsor seeking a scientifically robust clinical trial site in Jordan, our team is prepared to support compliant clinical trial management and evidence-driven research execution.', 'text'),
('contact', 'hero', 'card1_label', 'Email Us', 'text'),
('contact', 'hero', 'card2_label', 'Call Us', 'text'),
('contact', 'hero', 'card3_label', 'Visit Us', 'text'),
('contact', 'hero', 'card4_label', '24/7 Support', 'text')
ON CONFLICT DO NOTHING;

-- =====================================================
-- CONTACT PAGE - Form Section
-- =====================================================
INSERT INTO public.site_content (page, section, content_key, content_value, content_type) VALUES
('contact', 'form', 'tag', 'Contact Us', 'text'),
('contact', 'form', 'title', 'Let''s Start a', 'text'),
('contact', 'form', 'title_highlight', 'Conversation', 'text'),
('contact', 'form', 'description', 'CRC is a GCP-compliant clinical research center in Jordan, partnering with global CROs and sponsors to conduct high-quality Phase I–IV clinical trials.', 'text'),
('contact', 'form', 'email_label', 'Email', 'text'),
('contact', 'form', 'email', 'info@crcjo.com', 'text'),
('contact', 'form', 'location_label', 'Location', 'text'),
('contact', 'form', 'location', 'Irbid, Jordan', 'text'),
('contact', 'form', 'location_detail', 'Clinical Research District', 'text'),
('contact', 'form', 'badge1', 'GCP Compliant', 'text'),
('contact', 'form', 'badge2', 'Phase I-IV', 'text'),
('contact', 'form', 'badge3', 'Global Partners', 'text'),
('contact', 'form', 'form_title', 'Send Us a Message', 'text'),
('contact', 'form', 'submit_button', 'Send Message', 'text')
ON CONFLICT DO NOTHING;

-- =====================================================
-- CONTACT PAGE - Join Team Section
-- =====================================================
INSERT INTO public.site_content (page, section, content_key, content_value, content_type) VALUES
('contact', 'join_team', 'tag', 'Careers', 'text'),
('contact', 'join_team', 'title', 'Join Our', 'text'),
('contact', 'join_team', 'title_highlight', 'Team', 'text'),
('contact', 'join_team', 'description', 'We welcome skilled professionals interested in becoming part of a scientifically advanced clinical operations team, including investigators, scientists, pharmacists, clinical research coordinators, and specialists in data management and clinical trials methodology.', 'text'),
-- Position 1
('contact', 'join_team', 'position1_title', 'Investigators', 'text'),
('contact', 'join_team', 'position1_desc', 'Principal & Sub-Investigators', 'text'),
-- Position 2
('contact', 'join_team', 'position2_title', 'Scientists', 'text'),
('contact', 'join_team', 'position2_desc', 'Research Scientists', 'text'),
-- Position 3
('contact', 'join_team', 'position3_title', 'Pharmacists', 'text'),
('contact', 'join_team', 'position3_desc', 'Clinical Pharmacists', 'text'),
-- Position 4
('contact', 'join_team', 'position4_title', 'Coordinators', 'text'),
('contact', 'join_team', 'position4_desc', 'Clinical Research Coordinators', 'text'),
-- Position 5
('contact', 'join_team', 'position5_title', 'Data Specialists', 'text'),
('contact', 'join_team', 'position5_desc', 'Data Management Experts', 'text'),
-- Position 6
('contact', 'join_team', 'position6_title', 'Clinical Staff', 'text'),
('contact', 'join_team', 'position6_desc', 'Research Nurses & Specialists', 'text'),
-- Button
('contact', 'join_team', 'button_text', 'Our Rules', 'text'),
('contact', 'join_team', 'button_subtitle', 'Download our guidelines and policies', 'text')
ON CONFLICT DO NOTHING;

-- =====================================================
-- WHY US PAGE - Video Section
-- =====================================================
INSERT INTO public.site_content (page, section, content_key, content_value, content_type) VALUES
('whyus', 'video', 'tag', 'Top Recruiters Around The World', 'text'),
('whyus', 'video', 'title', 'Guaranteed', 'text'),
('whyus', 'video', 'title_highlight', 'High Recruitment', 'text'),
('whyus', 'video', 'stat1_value', '500+', 'text'),
('whyus', 'video', 'stat1_label', 'Patients Enrolled', 'text'),
('whyus', 'video', 'stat2_value', '95%', 'text'),
('whyus', 'video', 'stat2_label', 'Retention Rate', 'text'),
('whyus', 'video', 'stat3_value', '15+', 'text'),
('whyus', 'video', 'stat3_label', 'Countries Served', 'text'),
('whyus', 'video', 'stat4_value', '100%', 'text'),
('whyus', 'video', 'stat4_label', 'On-Time Delivery', 'text'),
('whyus', 'video', 'video_url', 'https://www.youtube.com/embed/Yu9R_hJ9QZk?rel=0&modestbranding=1', 'text'),
('whyus', 'video', 'button_text', 'Book a Meeting', 'text')
ON CONFLICT DO NOTHING;

-- =====================================================
-- WHY US PAGE - Partners Section
-- =====================================================
INSERT INTO public.site_content (page, section, content_key, content_value, content_type) VALUES
('whyus', 'partners', 'tag', 'Our Partners', 'text'),
('whyus', 'partners', 'title', 'CROs &', 'text'),
('whyus', 'partners', 'title_highlight', 'Sponsors', 'text'),
('whyus', 'partners', 'description', 'CRC collaborates with a broad network of Contract Research Organizations and pharmaceutical sponsors, reinforcing our position as a high-performing scientific research site capable of supporting global development programs.', 'text'),
-- CRO Section
('whyus', 'partners', 'cro_title', 'CRO Collaborations', 'text'),
('whyus', 'partners', 'cro_subtitle', 'Our Global CRO Partners', 'text'),
('whyus', 'partners', 'cro_partners', 'IQVIA,Parexel,Syneos Health,ICON,PPD,Labcorp,Medpace,PSI,MCT', 'text'),
('whyus', 'partners', 'cro_capabilities_label', 'These partnerships reflect CRC''s capacity to support:', 'text'),
('whyus', 'partners', 'cro_capability1', 'Multinational protocol execution', 'text'),
('whyus', 'partners', 'cro_capability2', 'High-complexity operational oversight', 'text'),
('whyus', 'partners', 'cro_capability3', 'Scientific, regulatory, and data-management alignment', 'text'),
('whyus', 'partners', 'cro_capability4', 'Both global late-phase CRO programs and early-phase feasibility assessments', 'text'),
-- Pharma Section
('whyus', 'partners', 'pharma_title', 'Pharmaceutical Sponsors', 'text'),
('whyus', 'partners', 'pharma_subtitle', 'Leading Global Sponsors', 'text'),
('whyus', 'partners', 'pharma_sponsors', 'Johnson & Johnson,Janssen,New Amsterdam Pharma,Sparta Biomedical', 'text'),
('whyus', 'partners', 'pharma_demo_label', 'Our continued work with leading sponsors demonstrates:', 'text'),
('whyus', 'partners', 'pharma_demo1', 'Strong scientific reliability', 'text'),
('whyus', 'partners', 'pharma_demo2', 'Comprehensive clinical trial management', 'text'),
('whyus', 'partners', 'pharma_demo3', 'Proven patient recruitment performance', 'text'),
('whyus', 'partners', 'pharma_demo4', 'Consistent delivery of audit-ready, high-quality clinical data', 'text'),
-- Bottom Text
('whyus', 'partners', 'bottom_text', 'CRC is fully equipped to support therapeutic innovation in Jordan, the Middle East, and beyond — providing global research organizations with a scientifically robust, ethically grounded, and operationally dependable clinical research partner.', 'text')
ON CONFLICT DO NOTHING;

-- =====================================================
-- WHY US PAGE - CTA Section
-- =====================================================
INSERT INTO public.site_content (page, section, content_key, content_value, content_type) VALUES
('whyus', 'cta', 'title', 'Partner With', 'text'),
('whyus', 'cta', 'title_highlight', 'CRC', 'text'),
('whyus', 'cta', 'description', 'Collaborate with a scientifically driven, GCP-adherent clinical research site committed to high-quality execution and global research standards.', 'text'),
('whyus', 'cta', 'button_text', 'Start Partnership', 'text')
ON CONFLICT DO NOTHING;

-- =====================================================
-- GLOBAL - Footer Section
-- =====================================================
INSERT INTO public.site_content (page, section, content_key, content_value, content_type) VALUES
('global', 'footer', 'company_description', 'Clinical Research Center — A GCP-compliant clinical research site in Jordan, conducting high-quality Phase I–IV clinical trials for global CROs and sponsors.', 'text'),
('global', 'footer', 'address', 'Irbid, Jordan', 'text'),
('global', 'footer', 'phone', '+962 123 456 789', 'text'),
('global', 'footer', 'email', 'info@crcjo.com', 'text'),
('global', 'footer', 'linkedin_url', 'https://www.linkedin.com/company/crc-2021/', 'text'),
('global', 'footer', 'youtube_url', 'https://www.youtube.com/@CRCJo', 'text'),
('global', 'footer', 'instagram_url', 'https://www.instagram.com/_crcjo', 'text'),
('global', 'footer', 'x_url', 'https://x.com/_crcjo', 'text'),
('global', 'footer', 'facebook_url', 'https://www.facebook.com/people/Crcjo/61584550395082/', 'text'),
('global', 'footer', 'copyright_text', 'Clinical Research Center. All rights reserved.', 'text')
ON CONFLICT DO NOTHING;