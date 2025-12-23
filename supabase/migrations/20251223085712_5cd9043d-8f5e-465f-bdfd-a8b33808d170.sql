-- Add all missing content for Home page sections

-- Hero Section
INSERT INTO public.site_content (page, section, content_key, content_value, content_type)
VALUES 
  ('home', 'hero', 'badge', 'GCP-Compliant Research Center', 'text'),
  ('home', 'hero', 'title', 'Clinical Research Excellence', 'text'),
  ('home', 'hero', 'title_highlight', 'Trusted Phase I–IV Trial Site', 'text'),
  ('home', 'hero', 'button_text', 'Work With Us', 'text'),
  ('home', 'hero', 'trust_label', 'Trusted by leading organizations', 'text'),
  ('home', 'hero', 'trust_indicators', 'IQVIA,Parexel,ICON,PPD,Medpace', 'text')
ON CONFLICT DO NOTHING;

-- Who We Are Section
INSERT INTO public.site_content (page, section, content_key, content_value, content_type)
VALUES 
  ('home', 'who_we_are', 'tag', 'Who We Are', 'text'),
  ('home', 'who_we_are', 'title', 'A Specialized Clinical Study Site', 'text'),
  ('home', 'who_we_are', 'highlight1', 'Irbid, Jordan', 'text'),
  ('home', 'who_we_are', 'highlight2', 'ICH-GCP Compliant', 'text'),
  ('home', 'who_we_are', 'highlight3', 'Full Trial Support', 'text'),
  ('home', 'who_we_are', 'card1_text', 'CRC is a specialized clinical study site located in <highlight>Irbid, Jordan</highlight>, providing end-to-end support for clinical trials phases across diverse therapeutic areas.', 'text'),
  ('home', 'who_we_are', 'card2_text', 'Our investigators, sub-investigators, and clinical research coordinators work closely with Contract Research Organizations (CROs) and sponsors to ensure <highlight>methodological rigor</highlight>, accurate endpoint evaluation, and ethically sound execution.', 'text'),
  ('home', 'who_we_are', 'card3_text', 'As a scientifically driven investigator site, CRC integrates <highlight>validated workflows</highlight>, controlled documentation environments, and calibrated medical systems including a modern clinical trial management system.', 'text'),
  ('home', 'who_we_are', 'button_text', 'Learn More', 'text')
ON CONFLICT DO NOTHING;

-- Facilities Section
INSERT INTO public.site_content (page, section, content_key, content_value, content_type)
VALUES 
  ('home', 'facilities', 'tag', 'Our Facilities', 'text'),
  ('home', 'facilities', 'title', 'Our Research Environment', 'text'),
  ('home', 'facilities', 'subtitle', 'State-of-the-art facilities designed to support high-quality clinical research', 'text'),
  ('home', 'facilities', 'facility1_title', 'Patient Rooms', 'text'),
  ('home', 'facilities', 'facility1_description', 'Dedicated patient care and procedure rooms', 'text'),
  ('home', 'facilities', 'facility2_title', 'Lab Equipment', 'text'),
  ('home', 'facilities', 'facility2_description', 'Calibrated laboratory instruments', 'text'),
  ('home', 'facilities', 'facility3_title', 'IP & Pharmacy Storage', 'text'),
  ('home', 'facilities', 'facility3_description', 'Secure investigational product storage', 'text'),
  ('home', 'facilities', 'facility4_title', 'Examination Room', 'text'),
  ('home', 'facilities', 'facility4_description', 'Modern patient assessment areas', 'text'),
  ('home', 'facilities', 'facility5_title', 'Vital Signs Monitor', 'text'),
  ('home', 'facilities', 'facility5_description', 'Advanced patient monitoring systems', 'text'),
  ('home', 'facilities', 'facility6_title', 'Coordinators Offices', 'text'),
  ('home', 'facilities', 'facility6_description', 'Dedicated workspace for research coordinators', 'text')
ON CONFLICT DO NOTHING;

-- Why Trust Section
INSERT INTO public.site_content (page, section, content_key, content_value, content_type)
VALUES 
  ('home', 'why_trust', 'tag', 'Our Expertise', 'text'),
  ('home', 'why_trust', 'title', 'Why Global CROs', 'text'),
  ('home', 'why_trust', 'title_highlight', 'Trust', 'text'),
  ('home', 'why_trust', 'title_suffix', 'CRC', 'text'),
  ('home', 'why_trust', 'subtitle', 'Delivering excellence at every stage of clinical research', 'text'),
  -- Card 1
  ('home', 'why_trust', 'card1_title', 'Proven Expertise', 'text'),
  ('home', 'why_trust', 'card1_subtitle', 'in Clinical Trials', 'text'),
  ('home', 'why_trust', 'card1_points', 'Extensive experience supporting worldwide clinical trials and multi-regional protocols.|Full alignment with ICH-GCP, clinicaltrials.gov requirements, and international regulatory standards.', 'text'),
  -- Card 2
  ('home', 'why_trust', 'card2_title', 'Fast & Reliable', 'text'),
  ('home', 'why_trust', 'card2_subtitle', 'Patient Recruitment', 'text'),
  ('home', 'why_trust', 'card2_points', 'Structured patient recruitment clinical trials algorithms.|Large, diverse, treatment-naïve patient populations across Jordan.|High show-up and retention rates aligned with best-practice trial management metrics.', 'text'),
  -- Card 3
  ('home', 'why_trust', 'card3_title', 'Robust Operational', 'text'),
  ('home', 'why_trust', 'card3_subtitle', 'Infrastructure', 'text'),
  ('home', 'why_trust', 'card3_points', 'Dedicated facilities equipped for protocol-driven research.|On-site laboratories, calibrated equipment, medical device CRO capability, and IP storage.|CRO-dedicated monitoring rooms to support oversight and contract research and development activities.', 'text'),
  -- Card 4
  ('home', 'why_trust', 'card4_title', 'Strategic Middle East', 'text'),
  ('home', 'why_trust', 'card4_subtitle', 'Location', 'text'),
  ('home', 'why_trust', 'card4_points', 'Cost-efficient regional access point for global late phase CRO programs.|Faster approval timelines compared to many regions.|High feasibility for emerging indications, including the latest clinical trials on COVID-19.', 'text')
ON CONFLICT DO NOTHING;

-- Partners Section
INSERT INTO public.site_content (page, section, content_key, content_value, content_type)
VALUES 
  ('home', 'partners', 'tag', 'Our Network', 'text'),
  ('home', 'partners', 'cro_title', 'CRO Partners', 'text'),
  ('home', 'partners', 'cro_description', 'CRC collaborates with major CRO partners, including IQVIA, Parexel, Syneos Health, ICON, PPD, Labcorp, Medpace, PSI, and MCT — demonstrating our capacity to align with top-tier contract research organizations and deliver high-quality data.', 'text'),
  ('home', 'partners', 'pharma_tag', 'Trusted By', 'text'),
  ('home', 'partners', 'pharma_title', 'Pharmaceutical Sponsor Partnerships', 'text'),
  ('home', 'partners', 'pharma_description', 'CRC supports research programs for global pharmaceutical leaders including Johnson & Johnson, New Amsterdam Pharma, Sarepta Therapeutics, Argenx, and Immunic Therapeutics, reflecting strong scientific reliability and alignment with rigorous clinical trial site expectations.', 'text')
ON CONFLICT DO NOTHING;

-- CTA Section
INSERT INTO public.site_content (page, section, content_key, content_value, content_type)
VALUES 
  ('home', 'cta', 'title', 'Work With', 'text'),
  ('home', 'cta', 'title_highlight', 'Us', 'text'),
  ('home', 'cta', 'description', 'Partner with CRC to conduct your next clinical study in Jordan with confidence, efficiency, and internationally aligned quality.', 'text'),
  ('home', 'cta', 'button_text', 'Partner With Us', 'text'),
  ('home', 'cta', 'email', 'info@crcjo.com', 'text'),
  ('home', 'cta', 'phone', '+962 123 456 789', 'text')
ON CONFLICT DO NOTHING;

-- Update Footer address to Irbid
UPDATE public.site_content 
SET content_value = 'Irbid, Jordan' 
WHERE page = 'global' AND section = 'footer' AND content_key = 'address';