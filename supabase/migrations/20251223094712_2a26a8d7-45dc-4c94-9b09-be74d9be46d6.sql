-- Add missing Why Us page content
INSERT INTO public.site_content (page, section, content_key, content_value, content_type) VALUES
-- Hero additional badges
('whyus', 'hero', 'description2', 'Our site is built upon internationally recognized research standards, precise operational workflows, controlled documentation systems, and an unwavering commitment to methodological accuracy.', 'text'),
('whyus', 'hero', 'trust_badge1', 'ICH-GCP Compliant', 'text'),
('whyus', 'hero', 'trust_badge2', 'Scientific Excellence', 'text'),
('whyus', 'hero', 'trust_badge3', 'Global Standards', 'text'),
('whyus', 'hero', 'location_badge', 'CRC – Irbid, Jordan', 'text'),

-- Video Section
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
('whyus', 'video', 'button_text', 'Book a Meeting', 'text'),

-- Partners Section
('whyus', 'partners', 'tag', 'Our Partners', 'text'),
('whyus', 'partners', 'title', 'CROs &', 'text'),
('whyus', 'partners', 'title_highlight', 'Sponsors', 'text'),
('whyus', 'partners', 'description', 'CRC collaborates with a broad network of Contract Research Organizations and pharmaceutical sponsors, reinforcing our position as a high-performing scientific research site capable of supporting global development programs.', 'text'),
('whyus', 'partners', 'cro_title', 'CRO Collaborations', 'text'),
('whyus', 'partners', 'cro_subtitle', 'Our Global CRO Partners', 'text'),
('whyus', 'partners', 'cro_partners', 'IQVIA,Parexel,Syneos Health,ICON,PPD,Labcorp,Medpace,PSI,MCT', 'text'),
('whyus', 'partners', 'cro_capabilities_label', 'These partnerships reflect CRC''s capacity to support:', 'text'),
('whyus', 'partners', 'cro_capability1', 'Multinational protocol execution', 'text'),
('whyus', 'partners', 'cro_capability2', 'High-complexity operational oversight', 'text'),
('whyus', 'partners', 'cro_capability3', 'Scientific, regulatory, and data-management alignment', 'text'),
('whyus', 'partners', 'cro_capability4', 'Both global late-phase CRO programs and early-phase feasibility assessments', 'text'),
('whyus', 'partners', 'pharma_title', 'Pharmaceutical Sponsors', 'text'),
('whyus', 'partners', 'pharma_subtitle', 'Leading Global Sponsors', 'text'),
('whyus', 'partners', 'pharma_sponsors', 'Johnson & Johnson,Janssen,New Amsterdam Pharma,Sparta Biomedical', 'text'),
('whyus', 'partners', 'pharma_demo_label', 'Our continued work with leading sponsors demonstrates:', 'text'),
('whyus', 'partners', 'pharma_demo1', 'Strong scientific reliability', 'text'),
('whyus', 'partners', 'pharma_demo2', 'Comprehensive clinical trial management', 'text'),
('whyus', 'partners', 'pharma_demo3', 'Proven patient recruitment performance', 'text'),
('whyus', 'partners', 'pharma_demo4', 'Consistent delivery of audit-ready, high-quality clinical data', 'text'),
('whyus', 'partners', 'bottom_text', 'CRC is fully equipped to support therapeutic innovation in Jordan, the Middle East, and beyond — providing global research organizations with a scientifically robust, ethically grounded, and operationally dependable clinical research partner.', 'text'),

-- Features Section
('whyus', 'features', 'tag', 'What Sets Us Apart', 'text'),
('whyus', 'features', 'title', 'CRC', 'text'),
('whyus', 'features', 'title_highlight', 'Combines', 'text'),
('whyus', 'features', 'description', 'As an investigator site partnering with global CROs and pharmaceutical sponsors, CRC ensures scientific rigor, operational precision, and complete adherence to ICH-GCP and international regulatory expectations.', 'text'),
('whyus', 'features', 'feature4_title', 'Highly Trained Teams', 'text'),
('whyus', 'features', 'feature4_description', 'Expert investigators and clinical operations professionals with extensive trial experience.', 'text'),
('whyus', 'features', 'feature5_title', 'Validated Recruitment Frameworks', 'text'),
('whyus', 'features', 'feature5_description', 'Proven patient recruitment strategies with access to treatment-naïve populations.', 'text'),
('whyus', 'features', 'feature6_title', 'Data Integrity & IP Control', 'text'),
('whyus', 'features', 'feature6_description', 'Reliable infrastructure for monitoring, IP management, and audit-ready documentation.', 'text'),
('whyus', 'features', 'bottom_text', 'Our capabilities enable us to support both early-phase development and large-scale, late-phase clinical programs requiring strict procedural compliance, comprehensive risk management, and high-fidelity data capture. CRC is strategically positioned to serve as a leading clinical research site for organizations seeking reliable research partners in Jordan.', 'text'),

-- CTA Section
('whyus', 'cta', 'title', 'Partner With', 'text'),
('whyus', 'cta', 'title_highlight', 'CRC', 'text'),
('whyus', 'cta', 'description', 'Collaborate with a scientifically driven, GCP-adherent clinical research site committed to high-quality execution and global research standards.', 'text'),
('whyus', 'cta', 'button_text', 'Start Partnership', 'text');

-- Update existing features with better titles
UPDATE public.site_content 
SET content_value = 'GCP-Compliant Scientific Governance'
WHERE page = 'whyus' AND section = 'features' AND content_key = 'feature1_title';

UPDATE public.site_content 
SET content_value = 'Complete adherence to ICH-GCP guidelines ensuring ethical and scientific integrity in every study.'
WHERE page = 'whyus' AND section = 'features' AND content_key = 'feature1_description';

UPDATE public.site_content 
SET content_value = 'Robust Clinical Trial Management'
WHERE page = 'whyus' AND section = 'features' AND content_key = 'feature2_title';

UPDATE public.site_content 
SET content_value = 'Advanced CTMS integration for seamless protocol execution and real-time study oversight.'
WHERE page = 'whyus' AND section = 'features' AND content_key = 'feature2_description';

UPDATE public.site_content 
SET content_value = 'Accurate Endpoint Assessment'
WHERE page = 'whyus' AND section = 'features' AND content_key = 'feature3_title';

UPDATE public.site_content 
SET content_value = 'Precise measurement processes ensuring reliable efficacy and safety data collection.'
WHERE page = 'whyus' AND section = 'features' AND content_key = 'feature3_description';

-- Update hero subtitle
UPDATE public.site_content 
SET content_value = 'The Clinical Research Center (CRC) provides a scientifically rigorous environment for high-quality clinical trials in Jordan and the Middle East.'
WHERE page = 'whyus' AND section = 'hero' AND content_key = 'subtitle';