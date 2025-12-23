-- Studies page: Hero section (expanding existing)
INSERT INTO public.site_content (page, section, content_key, content_value, content_type) VALUES
('studies', 'hero', 'description2', 'Our treatment-naïve populations support studies across numerous therapeutic areas, including depression clinical trials, metabolic disorders, and infectious diseases such as the latest clinical trials on COVID-19.', 'text'),
('studies', 'hero', 'description3', 'We maintain strong alignment with ICH-GCP and clinicaltrials.gov transparency standards.', 'text'),
('studies', 'hero', 'phase1_title', 'Phase I', 'text'),
('studies', 'hero', 'phase1_desc', 'Safety & Dosage', 'text'),
('studies', 'hero', 'phase2_title', 'Phase II', 'text'),
('studies', 'hero', 'phase2_desc', 'Efficacy Testing', 'text'),
('studies', 'hero', 'phase3_title', 'Phase III', 'text'),
('studies', 'hero', 'phase3_desc', 'Large-Scale Trials', 'text'),
('studies', 'hero', 'phase4_title', 'Phase IV', 'text'),
('studies', 'hero', 'phase4_desc', 'Post-Market Studies', 'text'),
('studies', 'hero', 'compliance1', 'ICH-GCP Compliant', 'text'),
('studies', 'hero', 'compliance2', 'ClinicalTrials.gov Registered', 'text')
ON CONFLICT DO NOTHING;

-- Studies page: Therapeutic Areas section
INSERT INTO public.site_content (page, section, content_key, content_value, content_type) VALUES
('studies', 'therapeutic_areas', 'tag', 'Research Areas', 'text'),
('studies', 'therapeutic_areas', 'title', 'Therapeutic Areas', 'text'),
('studies', 'therapeutic_areas', 'title_highlight', 'Covered', 'text'),
('studies', 'therapeutic_areas', 'description', 'CRC supports clinical operations across GI, cardiovascular, neurology, urology, rheumatology, vaccines, genetic diseases, metabolic disorders, musculoskeletal health, endocrinology, ophthalmology, ENT, pediatrics, geriatrics, maternity health, psychiatry, and dermatology, enabling both early development and contract research and development initiatives.', 'text'),
('studies', 'therapeutic_areas', 'stat1_value', '17+', 'text'),
('studies', 'therapeutic_areas', 'stat1_label', 'Therapeutic Areas', 'text'),
('studies', 'therapeutic_areas', 'stat2_value', '50+', 'text'),
('studies', 'therapeutic_areas', 'stat2_label', 'Conditions Covered', 'text'),
('studies', 'therapeutic_areas', 'stat3_value', 'I-IV', 'text'),
('studies', 'therapeutic_areas', 'stat3_label', 'All Trial Phases', 'text')
ON CONFLICT DO NOTHING;

-- Studies page: CTA section
INSERT INTO public.site_content (page, section, content_key, content_value, content_type) VALUES
('studies', 'cta', 'title', 'Partner with', 'text'),
('studies', 'cta', 'title_highlight', 'CRC', 'text'),
('studies', 'cta', 'description', 'A trusted clinical trial site for global CROs and sponsors.', 'text'),
('studies', 'cta', 'trust1', 'GCP Compliant', 'text'),
('studies', 'cta', 'trust2', 'Treatment-Naïve Populations', 'text'),
('studies', 'cta', 'trust3', 'Fast Recruitment', 'text'),
('studies', 'cta', 'button_text', 'Start a Study', 'text'),
('studies', 'cta', 'email', 'info@crcjo.com', 'text'),
('studies', 'cta', 'phone', '+962 123 456 789', 'text')
ON CONFLICT DO NOTHING;