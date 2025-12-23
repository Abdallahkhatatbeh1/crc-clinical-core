-- About page: Hero section (expanding existing content)
INSERT INTO public.site_content (page, section, content_key, content_value, content_type) VALUES
('about', 'hero', 'description2', 'We deliver scientifically rigorous Phase I, Phase II, Phase III, and Phase IV clinical trials, supported by validated screening processes, robust clinical operations, and precise clinical trial management.', 'text')
ON CONFLICT DO NOTHING;

-- About page: Values section
INSERT INTO public.site_content (page, section, content_key, content_value, content_type) VALUES
('about', 'values', 'tag', 'Our Foundation', 'text'),
('about', 'values', 'title', 'Our Core', 'text'),
('about', 'values', 'title_highlight', 'Values', 'text'),
('about', 'values', 'subtitle', 'The principles that guide everything we do', 'text'),
('about', 'values', 'value1_title', 'Integrity', 'text'),
('about', 'values', 'value1_description', 'Adherence to ICH-GCP, local regulatory structures, and internationally harmonized clinical trials frameworks.', 'text'),
('about', 'values', 'value2_title', 'Quality', 'text'),
('about', 'values', 'value2_description', 'Accurate data generation supported by audit-ready documentation, controlled workflows, and scientific discipline across all clinical trials phases.', 'text'),
('about', 'values', 'value3_title', 'Efficiency', 'text'),
('about', 'values', 'value3_description', 'Streamlined trial management, strong patient recruitment, and operational excellence across all study visits.', 'text'),
('about', 'values', 'value4_title', 'Patient-Centered Care', 'text'),
('about', 'values', 'value4_description', 'A commitment to scientifically grounded monitoring of safety signals, adverse events, and clinical outcomes.', 'text'),
('about', 'values', 'value5_title', 'Partnership', 'text'),
('about', 'values', 'value5_description', 'Collaborative engagement with CRO partners, investigators, and global scientific institutions.', 'text')
ON CONFLICT DO NOTHING;

-- About page: Founder section
INSERT INTO public.site_content (page, section, content_key, content_value, content_type) VALUES
('about', 'founder', 'tag', 'Leadership', 'text'),
('about', 'founder', 'title', 'Founder & CEO –', 'text'),
('about', 'founder', 'title_highlight', 'Dr. Sabiha Malkawi', 'text'),
('about', 'founder', 'paragraph1', 'Dr. Malkawi has over 15 years of experience collaborating with contract research organizations, global CROs, and major industry sponsors.', 'text'),
('about', 'founder', 'paragraph2', 'She has overseen more than 40 Phase I–IV studies, including early development and drug development-supporting trials.', 'text'),
('about', 'founder', 'paragraph3', 'Her expertise spans protocol governance, patient safety, endpoint measurement, and advanced clinical trial management oversight.', 'text'),
('about', 'founder', 'highlight1', '15+ years collaborating with CROs and sponsors', 'text'),
('about', 'founder', 'highlight2', '40+ Phase I–IV studies overseen', 'text'),
('about', 'founder', 'highlight3', 'Protocol governance & patient safety expertise', 'text'),
('about', 'founder', 'highlight4', 'Advanced clinical trial management oversight', 'text')
ON CONFLICT DO NOTHING;

-- About page: Team section
INSERT INTO public.site_content (page, section, content_key, content_value, content_type) VALUES
('about', 'team', 'tag', 'Our People', 'text'),
('about', 'team', 'title', 'Our', 'text'),
('about', 'team', 'title_highlight', 'Multidisciplinary', 'text'),
('about', 'team', 'title_suffix', 'Team', 'text'),
('about', 'team', 'description', 'CRC''s multidisciplinary team supports protocol compliance, data validity, and the scientific rigor required for worldwide clinical trials and investigator site excellence.', 'text'),
('about', 'team', 'role1', 'Principal & Sub-Investigators', 'text'),
('about', 'team', 'role2', 'Clinical Research Coordinators', 'text'),
('about', 'team', 'role3', 'Research Nurses', 'text'),
('about', 'team', 'role4', 'Pharmacists & IP Specialists', 'text'),
('about', 'team', 'role5', 'Regulatory & Ethics Experts', 'text'),
('about', 'team', 'role6', 'Data & Quality Managers', 'text')
ON CONFLICT DO NOTHING;

-- About page: Team Photo section
INSERT INTO public.site_content (page, section, content_key, content_value, content_type) VALUES
('about', 'team_photo', 'tag', 'Meet Our Team', 'text'),
('about', 'team_photo', 'title', 'The', 'text'),
('about', 'team_photo', 'title_highlight', 'Dedicated Professionals', 'text'),
('about', 'team_photo', 'title_suffix', 'Behind CRC', 'text'),
('about', 'team_photo', 'description', 'Our multidisciplinary team brings together expertise in clinical research, patient care, and regulatory compliance', 'text'),
('about', 'team_photo', 'photo_title', 'Our Research Team', 'text'),
('about', 'team_photo', 'photo_description', 'A diverse team of clinical research professionals committed to advancing medical science', 'text'),
('about', 'team_photo', 'stat1_value', '20+', 'text'),
('about', 'team_photo', 'stat1_label', 'Team Members', 'text'),
('about', 'team_photo', 'stat2_value', '15+', 'text'),
('about', 'team_photo', 'stat2_label', 'Years Experience', 'text'),
('about', 'team_photo', 'stat3_value', '100+', 'text'),
('about', 'team_photo', 'stat3_label', 'Studies Completed', 'text'),
('about', 'team_photo', 'stat4_value', '24/7', 'text'),
('about', 'team_photo', 'stat4_label', 'Support Available', 'text')
ON CONFLICT DO NOTHING;

-- About page: Commitment section
INSERT INTO public.site_content (page, section, content_key, content_value, content_type) VALUES
('about', 'commitment', 'tag', 'Excellence', 'text'),
('about', 'commitment', 'title', 'Commitment to', 'text'),
('about', 'commitment', 'title_highlight', 'Excellence', 'text'),
('about', 'commitment', 'description', 'CRC integrates international scientific standards, rigorous feasibility assessment, calibrated equipment, and community-network-driven patient recruitment clinical trials to deliver ethical, high-quality research across the region.', 'text'),
('about', 'commitment', 'item1', 'Strict adherence to ICH-GCP guidelines', 'text'),
('about', 'commitment', 'item2', 'Transparent communication with sponsors', 'text'),
('about', 'commitment', 'item3', 'High-quality documentation and audit readiness', 'text'),
('about', 'commitment', 'item4', 'Continuous staff training and competency development', 'text'),
('about', 'commitment', 'item5', 'Efficient operational processes for timely milestone delivery', 'text'),
('about', 'commitment', 'item6', 'Robust patient recruitment driven by strong community networks', 'text'),
('about', 'commitment', 'cta_text', 'CRC strives to be a trusted, dependable, and high-performing research partner for global organizations seeking clinical trial sites in Jordan and the Middle East.', 'text'),
('about', 'commitment', 'cta_button', 'Partner With Us', 'text')
ON CONFLICT DO NOTHING;