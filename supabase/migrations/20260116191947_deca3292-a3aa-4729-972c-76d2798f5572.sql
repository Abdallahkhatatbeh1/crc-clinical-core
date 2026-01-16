-- =====================================================
-- المرحلة 1: إضافة محتوى الهيدر الديناميكي
-- =====================================================
INSERT INTO public.site_content (page, section, content_key, content_value, content_type) VALUES
-- روابط الهيدر
('global', 'header', 'nav_link1_text', 'Home', 'text'),
('global', 'header', 'nav_link1_url', '/', 'text'),
('global', 'header', 'nav_link2_text', 'About', 'text'),
('global', 'header', 'nav_link2_url', '/about', 'text'),
('global', 'header', 'nav_link3_text', 'Studies', 'text'),
('global', 'header', 'nav_link3_url', '/studies', 'text'),
('global', 'header', 'nav_link4_text', 'Services', 'text'),
('global', 'header', 'nav_link4_url', '/services', 'text'),
('global', 'header', 'nav_link5_text', 'Why Us', 'text'),
('global', 'header', 'nav_link5_url', '/why-us', 'text'),
('global', 'header', 'nav_link6_text', 'Contact', 'text'),
('global', 'header', 'nav_link6_url', '/contact', 'text'),
-- زر CTA
('global', 'header', 'cta_button_text', 'Get Started', 'text'),
('global', 'header', 'cta_button_url', '/why-us', 'text')
ON CONFLICT (page, section, content_key) DO NOTHING;

-- =====================================================
-- المرحلة 2: إضافة روابط الفوتر الديناميكية
-- =====================================================
INSERT INTO public.site_content (page, section, content_key, content_value, content_type) VALUES
-- عناوين الأقسام
('global', 'footer', 'section1_title', 'Company', 'text'),
('global', 'footer', 'section2_title', 'Services', 'text'),
('global', 'footer', 'section3_title', 'Contact', 'text'),
-- روابط قسم Company
('global', 'footer', 'company_link1_text', 'About CRC', 'text'),
('global', 'footer', 'company_link1_url', '/about', 'text'),
('global', 'footer', 'company_link2_text', 'Our Studies', 'text'),
('global', 'footer', 'company_link2_url', '/studies', 'text'),
('global', 'footer', 'company_link3_text', 'Services', 'text'),
('global', 'footer', 'company_link3_url', '/services', 'text'),
('global', 'footer', 'company_link4_text', 'Contact', 'text'),
('global', 'footer', 'company_link4_url', '/contact', 'text'),
-- روابط قسم Services
('global', 'footer', 'services_link1_text', 'Regulatory Support', 'text'),
('global', 'footer', 'services_link1_url', '/services', 'text'),
('global', 'footer', 'services_link2_text', 'Patient Recruitment', 'text'),
('global', 'footer', 'services_link2_url', '/services', 'text'),
('global', 'footer', 'services_link3_text', 'Data Management', 'text'),
('global', 'footer', 'services_link3_url', '/services', 'text'),
('global', 'footer', 'services_link4_text', 'IP Management', 'text'),
('global', 'footer', 'services_link4_url', '/services', 'text'),
-- روابط قسم Resources
('global', 'footer', 'resources_link1_text', 'Therapeutic Areas', 'text'),
('global', 'footer', 'resources_link1_url', '/studies', 'text'),
('global', 'footer', 'resources_link2_text', 'Why Choose CRC', 'text'),
('global', 'footer', 'resources_link2_url', '/why-us', 'text'),
('global', 'footer', 'resources_link3_text', 'Careers', 'text'),
('global', 'footer', 'resources_link3_url', '/contact', 'text'),
('global', 'footer', 'resources_link4_text', 'Partner With Us', 'text'),
('global', 'footer', 'resources_link4_url', '/contact', 'text'),
-- عنوان قسم Resources
('global', 'footer', 'section4_title', 'Resources', 'text'),
-- نصوص أسفل الصفحة
('global', 'footer', 'privacy_text', 'Privacy Policy', 'text'),
('global', 'footer', 'terms_text', 'Terms of Service', 'text')
ON CONFLICT (page, section, content_key) DO NOTHING;

-- =====================================================
-- المرحلة 3: إضافة روابط الأزرار في جميع المكونات
-- =====================================================
INSERT INTO public.site_content (page, section, content_key, content_value, content_type) VALUES
-- روابط Hero
('home', 'hero', 'button_url', '/why-us', 'text'),
-- روابط CTA Home
('home', 'cta', 'button_url', '/why-us', 'text'),
-- روابط Why Us Video
('whyus', 'video', 'calendly_url', 'https://calendly.com/sh-crc2021/30min', 'text'),
-- روابط Why Us CTA
('whyus', 'cta', 'button_url', 'https://calendly.com/sh-crc2021/30min', 'text'),
-- روابط Services CTA
('services', 'cta', 'button_primary_url', '/why-us', 'text'),
('services', 'cta', 'button_secondary_url', '/studies', 'text'),
-- روابط Studies CTA
('studies', 'cta', 'button_url', '/why-us', 'text'),
-- روابط About Commitment
('about', 'commitment', 'cta_button_url', '/why-us', 'text')
ON CONFLICT (page, section, content_key) DO NOTHING;

-- =====================================================
-- المرحلة 4: إضافة نقاط تفاصيل الخدمات
-- =====================================================
INSERT INTO public.site_content (page, section, content_key, content_value, content_type) VALUES
('services', 'services_list', 'service1_points', 'Preparation and submission of IRB/EC applications|Managing regulatory submissions to health authorities such as the Jordan Food and Drug Administration (JFDA)|Maintaining and updating essential documents (TMF/ISF)|Comprehensive safety reporting, including AEs, SAEs, SUSARs, and expedited notifications|Ensuring alignment with clinicaltrials.gov and ICH-GCP requirements', 'text'),
('services', 'services_list', 'service2_points', 'Detailed feasibility assessments based on population availability, standard-of-care practices, and site capabilities|Budget development and contract negotiation|Site Qualification Visit (SQV) preparation and Site Initiation Visit (SIV) readiness|Protocol training, staff competency verification, and SOP-aligned onboarding|Activation support to achieve fast FPI (First Patient In)', 'text'),
('services', 'services_list', 'service3_points', 'Identification of eligible participants using targeted, protocol-specific criteria|(Where permitted) advertising, community outreach, and digital engagement strategies|Pre-screening and full clinical screening procedures|Informed consent management using IRB-approved documentation|Inclusion of patients across therapeutic areas including depression clinical trials, metabolic disorders, cardiology, GI, neurology, and latest clinical trials on COVID-19', 'text'),
('services', 'services_list', 'service4_points', 'Conducting full study visits in accordance with protocol, visit windows, and SOPs|Collecting safety and efficacy data, including vital signs, AE assessments, and endpoint measurements|Dispensing Investigational Product (IP) and performing full IP accountability|Managing IP storage under controlled conditions|Monitoring patient compliance and reporting deviations|Providing continuous patient support, retention management, and follow-up care', 'text'),
('services', 'services_list', 'service5_points', 'Comprehensive physical examinations and physician-led medical evaluations|ECGs, vital signs, imaging (where applicable), and pulmonary function testing|On-site laboratory sample collection|Sample processing, centrifugation, aliquoting, labeling, and temperature-controlled storage (including −80°C freezer)|Packaging and shipment of biological samples to central laboratories following IATA/ICH guidelines|Support for medical device CRO partners requiring device training and device-related procedures', 'text'),
('services', 'services_list', 'service6_points', 'Completion of eCRFs in sponsor-provided EDC systems|Query resolution and timely data cleaning|Comprehensive source documentation and verification|Maintaining secure, compliant electronic and paper patient records|Adherence to GCP standards for data integrity and archival|Integration with clinical trial management systems (CTMS)', 'text'),
('services', 'services_list', 'service7_points', 'Dedicated monitoring rooms for CRA visits|Remote monitoring support, including secure document sharing|Preparing and hosting sponsor audits|Regulatory inspection readiness, including JFDA compliance|Ongoing communication with global CRO teams for aligned trial oversight', 'text'),
('services', 'services_list', 'service8_points', 'Temperature-controlled storage (refrigerated, frozen, and ambient)|Daily temperature logs, alarm systems, and deviation management|IP dispensing, returns, reconciliation, and documentation|Destruction or return according to sponsor SOPs|Controlled access and double-verification for blinded studies', 'text'),
('services', 'services_list', 'service9_points', 'Final IP accountability, destruction, or return|Complete data reconciliation and query closure|Archiving essential documents per sponsor and regulatory guidelines|Site close-out with sponsor representatives and ethics committees|Transfer of archived data into secure long-term storage', 'text')
ON CONFLICT (page, section, content_key) DO NOTHING;

-- =====================================================
-- المرحلة 5: إنشاء جدول الشركاء للإدارة الديناميكية
-- =====================================================
CREATE TABLE IF NOT EXISTS public.partners (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  logo_url TEXT,
  category TEXT NOT NULL CHECK (category IN ('cro', 'pharma')),
  display_order INT DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  website_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.partners ENABLE ROW LEVEL SECURITY;

-- Public can view active partners
CREATE POLICY "Anyone can view active partners"
ON public.partners FOR SELECT
USING (is_active = true);

-- Only admins can manage partners
CREATE POLICY "Admins can manage partners"
ON public.partners FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = auth.uid() AND role = 'admin'
  )
);

-- Add trigger for updated_at
CREATE TRIGGER update_partners_updated_at
BEFORE UPDATE ON public.partners
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default partners
INSERT INTO public.partners (name, category, display_order, is_active) VALUES
-- CRO Partners
('IQVIA', 'cro', 1, true),
('Parexel', 'cro', 2, true),
('Syneos Health', 'cro', 3, true),
('ICON', 'cro', 4, true),
('PPD', 'cro', 5, true),
('Labcorp', 'cro', 6, true),
('Medpace', 'cro', 7, true),
('PSI', 'cro', 8, true),
('MCT', 'cro', 9, true),
-- Pharma Partners
('Johnson & Johnson', 'pharma', 1, true),
('New Amsterdam Pharma', 'pharma', 2, true),
('Sarepta Therapeutics', 'pharma', 3, true),
('Argenx', 'pharma', 4, true),
('Immunic Therapeutics', 'pharma', 5, true);

-- =====================================================
-- المرحلة 6: إنشاء جدول المجالات العلاجية
-- =====================================================
CREATE TABLE IF NOT EXISTS public.therapeutic_areas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  short_title TEXT NOT NULL,
  conditions TEXT NOT NULL,
  image_url TEXT,
  display_order INT DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.therapeutic_areas ENABLE ROW LEVEL SECURITY;

-- Public can view active areas
CREATE POLICY "Anyone can view active therapeutic areas"
ON public.therapeutic_areas FOR SELECT
USING (is_active = true);

-- Only admins can manage areas
CREATE POLICY "Admins can manage therapeutic areas"
ON public.therapeutic_areas FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = auth.uid() AND role = 'admin'
  )
);

-- Add trigger for updated_at
CREATE TRIGGER update_therapeutic_areas_updated_at
BEFORE UPDATE ON public.therapeutic_areas
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default therapeutic areas
INSERT INTO public.therapeutic_areas (title, short_title, conditions, display_order, is_active) VALUES
('Gastroenterology (GI)', 'GI', 'Inflammatory Bowel Disease (IBD)|Crohn''s Disease|Ulcerative Colitis|IBS|GERD', 1, true),
('Cardiovascular (Cardio)', 'Cardio', 'Hypertension|Coronary Artery Disease|Heart Failure|Arrhythmias', 2, true),
('Neurology (Neuro)', 'Neuro', 'Multiple Sclerosis|Epilepsy|Parkinson''s Disease|Migraine', 3, true),
('Urology', 'Urology', 'Overactive Bladder|BPH|Prostatitis', 4, true),
('Rheumatology (Rheum)', 'Rheum', 'Rheumatoid Arthritis|Osteoarthritis|Lupus', 5, true),
('Vaccines', 'Vaccines', 'COVID-19|Influenza|Pneumococcal', 6, true),
('Genetic Diseases (Genetic)', 'Genetic', 'Cystic Fibrosis|Sickle Cell|Muscular Dystrophy', 7, true),
('Metabolic Disorders (Metabolic)', 'Metabolic', 'Diabetes|Obesity|Metabolic Syndrome', 8, true),
('Musculoskeletal (MSK)', 'MSK', 'Osteoporosis|Chronic Pain|Sports Injuries', 9, true),
('Endocrinology (Endo)', 'Endo', 'Thyroid Disorders|Diabetes|Hormonal Imbalances', 10, true),
('Ophthalmology (Ophthal)', 'Ophthal', 'AMD|Glaucoma|Diabetic Retinopathy', 11, true),
('ENT', 'ENT', 'Chronic Sinusitis|Hearing Loss|Sleep Apnea', 12, true),
('Pediatrics (Peds)', 'Peds', 'Pediatric Asthma|ADHD|Childhood Obesity', 13, true),
('Geriatrics', 'Geriatrics', 'Dementia|Frailty|Polypharmacy', 14, true),
('Maternity & Women''s Health (Women''s)', 'Women''s', 'Gestational Diabetes|Endometriosis|Menopause', 15, true),
('Psychiatry (Psych)', 'Psych', 'Depression|Anxiety|Bipolar Disorder', 16, true),
('Dermatology (Derm)', 'Derm', 'Psoriasis|Atopic Dermatitis|Acne|Vitiligo', 17, true);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_partners_category ON public.partners(category);
CREATE INDEX IF NOT EXISTS idx_partners_active ON public.partners(is_active);
CREATE INDEX IF NOT EXISTS idx_partners_order ON public.partners(display_order);
CREATE INDEX IF NOT EXISTS idx_therapeutic_areas_active ON public.therapeutic_areas(is_active);
CREATE INDEX IF NOT EXISTS idx_therapeutic_areas_order ON public.therapeutic_areas(display_order);