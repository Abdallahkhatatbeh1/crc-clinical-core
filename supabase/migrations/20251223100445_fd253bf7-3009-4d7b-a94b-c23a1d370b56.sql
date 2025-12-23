-- Add image entries for Home page facilities section
INSERT INTO public.site_content (page, section, content_key, content_value, content_type, image_url)
VALUES
  ('home', 'facilities', 'facility1_image', 'Patient Rooms', 'image', NULL),
  ('home', 'facilities', 'facility2_image', 'Lab Equipment', 'image', NULL),
  ('home', 'facilities', 'facility3_image', 'IP Pharmacy Storage', 'image', NULL),
  ('home', 'facilities', 'facility4_image', 'Examination Room', 'image', NULL),
  ('home', 'facilities', 'facility5_image', 'Vital Signs Monitor', 'image', NULL),
  ('home', 'facilities', 'facility6_image', 'Coordinators Offices', 'image', NULL)
ON CONFLICT DO NOTHING;

-- Add image entries for Services page gallery section
INSERT INTO public.site_content (page, section, content_key, content_value, content_type, image_url)
VALUES
  ('services', 'gallery', 'gallery_image1', 'Patient Rooms', 'image', NULL),
  ('services', 'gallery', 'gallery_image2', 'Patient Examination', 'image', NULL),
  ('services', 'gallery', 'gallery_image3', 'Examination Room', 'image', NULL),
  ('services', 'gallery', 'gallery_image4', 'Procedure Room', 'image', NULL),
  ('services', 'gallery', 'gallery_image5', 'Lab Centrifuge', 'image', NULL),
  ('services', 'gallery', 'gallery_image6', 'Lab Equipment MPW', 'image', NULL),
  ('services', 'gallery', 'gallery_image7', 'Lab Centrifuge LC-04L', 'image', NULL),
  ('services', 'gallery', 'gallery_image8', 'Vital Signs Monitor', 'image', NULL),
  ('services', 'gallery', 'gallery_image9', 'ECG Equipment', 'image', NULL),
  ('services', 'gallery', 'gallery_image10', 'Examination Equipment', 'image', NULL),
  ('services', 'gallery', 'gallery_image11', 'IP Pharmacy Storage', 'image', NULL),
  ('services', 'gallery', 'gallery_image12', '-70C Freezer', 'image', NULL),
  ('services', 'gallery', 'gallery_image13', 'Lab Kits Storage', 'image', NULL),
  ('services', 'gallery', 'gallery_image14', 'Emergency Trolley', 'image', NULL),
  ('services', 'gallery', 'gallery_image15', 'Coordinators Offices', 'image', NULL),
  ('services', 'gallery', 'gallery_image16', 'Team Photo', 'image', NULL)
ON CONFLICT DO NOTHING;

-- Add image entries for About page team photo section
INSERT INTO public.site_content (page, section, content_key, content_value, content_type, image_url)
VALUES
  ('about', 'team_photo', 'team_image', 'Team Photo', 'image', NULL)
ON CONFLICT DO NOTHING;

-- Add partner logo entries for Home page
INSERT INTO public.site_content (page, section, content_key, content_value, content_type, image_url)
VALUES
  ('home', 'partners', 'cro_logo1', 'IQVIA', 'image', NULL),
  ('home', 'partners', 'cro_logo2', 'Parexel', 'image', NULL),
  ('home', 'partners', 'cro_logo3', 'Syneos Health', 'image', NULL),
  ('home', 'partners', 'cro_logo4', 'ICON', 'image', NULL),
  ('home', 'partners', 'cro_logo5', 'PPD', 'image', NULL),
  ('home', 'partners', 'cro_logo6', 'Labcorp', 'image', NULL),
  ('home', 'partners', 'cro_logo7', 'Medpace', 'image', NULL),
  ('home', 'partners', 'cro_logo8', 'PSI', 'image', NULL),
  ('home', 'partners', 'cro_logo9', 'MCT', 'image', NULL),
  ('home', 'partners', 'pharma_logo1', 'Johnson & Johnson', 'image', NULL),
  ('home', 'partners', 'pharma_logo2', 'New Amsterdam Pharma', 'image', NULL),
  ('home', 'partners', 'pharma_logo3', 'Sarepta', 'image', NULL),
  ('home', 'partners', 'pharma_logo4', 'Argenx', 'image', NULL),
  ('home', 'partners', 'pharma_logo5', 'Immunic', 'image', NULL)
ON CONFLICT DO NOTHING;