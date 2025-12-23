-- Add more footer content for social links and other data
INSERT INTO public.site_content (page, section, content_key, content_value, content_type)
VALUES
  ('global', 'footer', 'linkedin_url', 'https://www.linkedin.com/company/crc-2021/', 'text'),
  ('global', 'footer', 'youtube_url', 'https://www.youtube.com/@CRCJo', 'text'),
  ('global', 'footer', 'instagram_url', 'https://www.instagram.com/_crcjo', 'text'),
  ('global', 'footer', 'x_url', 'https://x.com/_crcjo', 'text'),
  ('global', 'footer', 'facebook_url', 'https://www.facebook.com/people/Crcjo/61584550395082/', 'text'),
  ('global', 'footer', 'copyright_text', 'Clinical Research Center. All rights reserved.', 'text')
ON CONFLICT DO NOTHING;

-- Add image entries for About page team photo
INSERT INTO public.site_content (page, section, content_key, content_value, content_type, image_url)
VALUES
  ('about', 'team_photo', 'main_team_image', 'Team Photo', 'image', NULL)
ON CONFLICT DO NOTHING;

-- Add image entries for Home page team preview section
INSERT INTO public.site_content (page, section, content_key, content_value, content_type, image_url)
VALUES
  ('home', 'team_preview', 'team_photo_image', 'Team Photo', 'image', NULL),
  ('home', 'team_preview', 'director_office_image', 'Director Office', 'image', NULL)
ON CONFLICT DO NOTHING;

-- Add text content for team preview section
INSERT INTO public.site_content (page, section, content_key, content_value, content_type)
VALUES
  ('home', 'team_preview', 'tag', 'Our Team', 'text'),
  ('home', 'team_preview', 'title', 'Meet Our', 'text'),
  ('home', 'team_preview', 'title_highlight', 'Expert Team', 'text'),
  ('home', 'team_preview', 'description', 'Our dedicated team of clinical research professionals brings together decades of combined experience in conducting high-quality clinical trials.', 'text'),
  ('home', 'team_preview', 'button_text', 'Meet Our Team', 'text')
ON CONFLICT DO NOTHING;

-- Add image entries for Why Us page facilities showcase
INSERT INTO public.site_content (page, section, content_key, content_value, content_type, image_url)
VALUES
  ('whyus', 'facilities_showcase', 'showcase_image1', 'Patient Rooms', 'image', NULL),
  ('whyus', 'facilities_showcase', 'showcase_image2', 'Procedure Room', 'image', NULL),
  ('whyus', 'facilities_showcase', 'showcase_image3', 'Patient Examination', 'image', NULL),
  ('whyus', 'facilities_showcase', 'showcase_image4', 'Lab Equipment', 'image', NULL),
  ('whyus', 'facilities_showcase', 'showcase_image5', 'Lab Equipment 2', 'image', NULL),
  ('whyus', 'facilities_showcase', 'showcase_image6', 'Lab Equipment 3', 'image', NULL),
  ('whyus', 'facilities_showcase', 'showcase_image7', 'IP Pharmacy Storage', 'image', NULL),
  ('whyus', 'facilities_showcase', 'showcase_image8', 'Freezer -70C', 'image', NULL),
  ('whyus', 'facilities_showcase', 'showcase_image9', 'Lab Kits Storage', 'image', NULL),
  ('whyus', 'facilities_showcase', 'showcase_image10', 'Vital Signs', 'image', NULL),
  ('whyus', 'facilities_showcase', 'showcase_image11', 'ECG Equipment', 'image', NULL),
  ('whyus', 'facilities_showcase', 'showcase_image12', 'Examination Equipment', 'image', NULL)
ON CONFLICT DO NOTHING;

-- Add text content for facilities showcase section
INSERT INTO public.site_content (page, section, content_key, content_value, content_type)
VALUES
  ('whyus', 'facilities_showcase', 'tag', 'Our Facilities', 'text'),
  ('whyus', 'facilities_showcase', 'title', 'State-of-the-Art', 'text'),
  ('whyus', 'facilities_showcase', 'title_highlight', 'Research Environment', 'text'),
  ('whyus', 'facilities_showcase', 'description', 'Our dedicated 250m² clinical research facility is purpose-built to support high-quality Phase I-IV trials with advanced equipment and comfortable patient areas.', 'text')
ON CONFLICT DO NOTHING;

-- Add image entries for Studies page therapeutic areas
INSERT INTO public.site_content (page, section, content_key, content_value, content_type, image_url)
VALUES
  ('studies', 'therapeutic_areas', 'area_image1', 'Gastroenterology', 'image', NULL),
  ('studies', 'therapeutic_areas', 'area_image2', 'Cardiovascular', 'image', NULL),
  ('studies', 'therapeutic_areas', 'area_image3', 'Neurology', 'image', NULL),
  ('studies', 'therapeutic_areas', 'area_image4', 'Urology', 'image', NULL),
  ('studies', 'therapeutic_areas', 'area_image5', 'Rheumatology', 'image', NULL),
  ('studies', 'therapeutic_areas', 'area_image6', 'Vaccines', 'image', NULL),
  ('studies', 'therapeutic_areas', 'area_image7', 'Genetic Diseases', 'image', NULL),
  ('studies', 'therapeutic_areas', 'area_image8', 'Metabolic Disorders', 'image', NULL),
  ('studies', 'therapeutic_areas', 'area_image9', 'Musculoskeletal', 'image', NULL),
  ('studies', 'therapeutic_areas', 'area_image10', 'Endocrinology', 'image', NULL),
  ('studies', 'therapeutic_areas', 'area_image11', 'Ophthalmology', 'image', NULL),
  ('studies', 'therapeutic_areas', 'area_image12', 'ENT', 'image', NULL),
  ('studies', 'therapeutic_areas', 'area_image13', 'Pediatrics', 'image', NULL),
  ('studies', 'therapeutic_areas', 'area_image14', 'Geriatrics', 'image', NULL),
  ('studies', 'therapeutic_areas', 'area_image15', 'Maternity & Womens Health', 'image', NULL),
  ('studies', 'therapeutic_areas', 'area_image16', 'Psychiatry', 'image', NULL),
  ('studies', 'therapeutic_areas', 'area_image17', 'Dermatology', 'image', NULL)
ON CONFLICT DO NOTHING;