-- Services page: Hero section (expanding existing)
INSERT INTO public.site_content (page, section, content_key, content_value, content_type) VALUES
('services', 'hero', 'description2', 'Our capabilities span regulatory support, study start-up, patient recruitment, clinical operations, data management, monitoring readiness, and investigational product management, ensuring high-quality, audit-ready research execution.', 'text'),
('services', 'hero', 'badge1', 'GCP Compliant', 'text'),
('services', 'hero', 'badge2', 'Audit-Ready', 'text'),
('services', 'hero', 'badge3', 'Phase I-IV', 'text')
ON CONFLICT DO NOTHING;

-- Services page: Services List section
INSERT INTO public.site_content (page, section, content_key, content_value, content_type) VALUES
('services', 'services_list', 'tag', 'Our Services', 'text'),
('services', 'services_list', 'title', 'Comprehensive', 'text'),
('services', 'services_list', 'title_highlight', 'Clinical Trial', 'text'),
('services', 'services_list', 'title_suffix', 'Solutions', 'text'),
('services', 'services_list', 'description', 'End-to-end support for high-quality, audit-ready research execution', 'text'),
('services', 'services_list', 'service1_title', 'Regulatory & Clinical Trial Ethics Support', 'text'),
('services', 'services_list', 'service1_description', 'CRC provides full regulatory and ethics management, ensuring that all clinical studies meet national and international compliance standards.', 'text'),
('services', 'services_list', 'service2_title', 'Clinical Trial Start-Up Services', 'text'),
('services', 'services_list', 'service2_description', 'CRC supports sponsors and CROs through efficient, structured start-up processes optimized for rapid study activation.', 'text'),
('services', 'services_list', 'service3_title', 'Patient Recruitment & Enrollment Solutions', 'text'),
('services', 'services_list', 'service3_description', 'CRC maintains highly reliable patient recruitment frameworks supported by validated screening methods and regional population access advantages.', 'text'),
('services', 'services_list', 'service4_title', 'Clinical Trial Conduct & Patient Management', 'text'),
('services', 'services_list', 'service4_description', 'CRC conducts all clinical visits and procedural requirements with scientific accuracy and strict protocol adherence.', 'text'),
('services', 'services_list', 'service5_title', 'Medical & Laboratory Support Services', 'text'),
('services', 'services_list', 'service5_description', 'CRC provides medically supervised clinical procedures, laboratory processing, and sample handling that meet international research standards.', 'text'),
('services', 'services_list', 'service6_title', 'Clinical Data Management & Documentation', 'text'),
('services', 'services_list', 'service6_description', 'CRC ensures accurate, compliant, audit-ready data supporting dependable clinical evidence.', 'text'),
('services', 'services_list', 'service7_title', 'Monitoring, Auditing & CRO Collaboration', 'text'),
('services', 'services_list', 'service7_description', 'CRC supports on-site and remote monitoring activities with full transparency and operational readiness.', 'text'),
('services', 'services_list', 'service8_title', 'Investigational Product (IP) Management & Pharmacy Services', 'text'),
('services', 'services_list', 'service8_description', 'IP handling is performed by qualified pharmacists trained in blinded and unblinded drug management.', 'text'),
('services', 'services_list', 'service9_title', 'Study Close-Out Services', 'text'),
('services', 'services_list', 'service9_description', 'CRC completes all final regulatory and operational requirements for study closure.', 'text')
ON CONFLICT DO NOTHING;

-- Services page: Facilities section
INSERT INTO public.site_content (page, section, content_key, content_value, content_type) VALUES
('services', 'facilities_section', 'tag', 'Infrastructure', 'text'),
('services', 'facilities_section', 'title', 'Clinical Trial', 'text'),
('services', 'facilities_section', 'title_highlight', 'Facilities', 'text'),
('services', 'facilities_section', 'title_suffix', '& Equipment', 'text'),
('services', 'facilities_section', 'description', 'CRC provides clinical-grade infrastructure suitable for multi-phase and complex clinical studies.', 'text'),
('services', 'facilities_section', 'facility1_name', 'Dedicated study rooms', 'text'),
('services', 'facilities_section', 'facility1_desc', 'For screening, randomization, and follow-ups', 'text'),
('services', 'facilities_section', 'facility2_name', 'ECG, ultrasound, spirometry', 'text'),
('services', 'facilities_section', 'facility2_desc', 'And vital-sign monitoring equipment', 'text'),
('services', 'facilities_section', 'facility3_name', 'Emergency equipment', 'text'),
('services', 'facilities_section', 'facility3_desc', 'Including crash carts and oxygen', 'text'),
('services', 'facilities_section', 'facility4_name', 'Secure archival storage', 'text'),
('services', 'facilities_section', 'facility4_desc', 'For long-term retention of essential documents', 'text'),
('services', 'facilities_section', 'facility5_name', 'Private, access-controlled rooms', 'text'),
('services', 'facilities_section', 'facility5_desc', 'For CRA monitoring visits', 'text'),
('services', 'facilities_section', 'facility6_name', 'Robust data security systems', 'text'),
('services', 'facilities_section', 'facility6_desc', 'For compliance with GCP and privacy standards', 'text')
ON CONFLICT DO NOTHING;

-- Services page: Gallery section
INSERT INTO public.site_content (page, section, content_key, content_value, content_type) VALUES
('services', 'gallery', 'tag', 'Our Facilities', 'text'),
('services', 'gallery', 'title', 'State-of-the-Art', 'text'),
('services', 'gallery', 'title_highlight', 'Research Facilities', 'text'),
('services', 'gallery', 'description', 'Explore our clinical-grade infrastructure designed for multi-phase and complex clinical studies', 'text')
ON CONFLICT DO NOTHING;

-- Services page: CTA section
INSERT INTO public.site_content (page, section, content_key, content_value, content_type) VALUES
('services', 'cta', 'title', 'Ready to Start Your', 'text'),
('services', 'cta', 'title_highlight', 'Clinical Trial', 'text'),
('services', 'cta', 'description', 'Partner with CRC for comprehensive, GCP-compliant clinical trial services in Jordan and the Middle East.', 'text'),
('services', 'cta', 'feature1', 'End-to-End Support', 'text'),
('services', 'cta', 'feature2', 'Fast Start-Up', 'text'),
('services', 'cta', 'feature3', 'Audit-Ready', 'text'),
('services', 'cta', 'button_primary', 'Get Started', 'text'),
('services', 'cta', 'button_secondary', 'View Our Studies', 'text')
ON CONFLICT DO NOTHING;