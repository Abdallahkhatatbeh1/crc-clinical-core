-- Add all Therapeutic Areas content (titles, short titles, conditions)
INSERT INTO public.site_content (page, section, content_key, content_value, content_type) VALUES
-- Area 1: Gastroenterology
('studies', 'therapeutic_areas', 'area1_title', 'Gastroenterology (GI)', 'text'),
('studies', 'therapeutic_areas', 'area1_short_title', 'GI', 'text'),
('studies', 'therapeutic_areas', 'area1_conditions', 'Inflammatory Bowel Disease (IBD)|Crohn''s Disease|Ulcerative Colitis|Irritable Bowel Syndrome (IBS)|Celiac Disease|GERD / Acid Reflux|Liver Diseases (e.g., NAFLD, Hepatitis)|Pancreatitis|GI Motility Disorders|Colorectal Conditions', 'text'),

-- Area 2: Cardiovascular
('studies', 'therapeutic_areas', 'area2_title', 'Cardiovascular (Cardio)', 'text'),
('studies', 'therapeutic_areas', 'area2_short_title', 'Cardio', 'text'),
('studies', 'therapeutic_areas', 'area2_conditions', 'Hypertension|Coronary Artery Disease|Heart Failure|Arrhythmias|Atherosclerosis|Peripheral Artery Disease|Hyperlipidemia / Dyslipidemia|Stroke Prevention|Pulmonary Hypertension|Cardiomyopathy', 'text'),

-- Area 3: Neurology
('studies', 'therapeutic_areas', 'area3_title', 'Neurology (Neuro)', 'text'),
('studies', 'therapeutic_areas', 'area3_short_title', 'Neuro', 'text'),
('studies', 'therapeutic_areas', 'area3_conditions', 'Alzheimer''s Disease|Parkinson''s Disease|Multiple Sclerosis|Epilepsy|Migraine & Chronic Headache|Amyotrophic Lateral Sclerosis (ALS)|Neuropathic Pain|Stroke Recovery|Huntington''s Disease|Neuromuscular Disorders', 'text'),

-- Area 4: Urology
('studies', 'therapeutic_areas', 'area4_title', 'Urology', 'text'),
('studies', 'therapeutic_areas', 'area4_short_title', 'Urology', 'text'),
('studies', 'therapeutic_areas', 'area4_conditions', 'Benign Prostatic Hyperplasia (BPH)|Overactive Bladder (OAB)|Urinary Incontinence|Chronic Prostatitis|Kidney Stones|Bladder Cancer|Prostate Cancer|Urinary Tract Infections (UTIs)|Interstitial Cystitis|Erectile Dysfunction', 'text'),

-- Area 5: Rheumatology
('studies', 'therapeutic_areas', 'area5_title', 'Rheumatology (Rheum)', 'text'),
('studies', 'therapeutic_areas', 'area5_short_title', 'Rheum', 'text'),
('studies', 'therapeutic_areas', 'area5_conditions', 'Rheumatoid Arthritis|Psoriatic Arthritis|Ankylosing Spondylitis|Lupus (SLE)|Sjögren''s Syndrome|Gout|Osteoarthritis|Fibromyalgia|Vasculitis|Scleroderma', 'text'),

-- Area 6: Vaccines
('studies', 'therapeutic_areas', 'area6_title', 'Vaccines', 'text'),
('studies', 'therapeutic_areas', 'area6_short_title', 'Vaccines', 'text'),
('studies', 'therapeutic_areas', 'area6_conditions', 'COVID-19 Vaccines|Influenza Vaccines|Pneumococcal Vaccines|RSV Vaccines|HPV Vaccines|Hepatitis Vaccines|Meningococcal Vaccines|Shingles Vaccines|Travel Vaccines|Pediatric Immunizations', 'text'),

-- Area 7: Genetic Diseases
('studies', 'therapeutic_areas', 'area7_title', 'Genetic Diseases (Genetic)', 'text'),
('studies', 'therapeutic_areas', 'area7_short_title', 'Genetic', 'text'),
('studies', 'therapeutic_areas', 'area7_conditions', 'Cystic Fibrosis|Sickle Cell Disease|Thalassemia|Duchenne Muscular Dystrophy|Spinal Muscular Atrophy (SMA)|Hemophilia|Phenylketonuria (PKU)|Familial Hypercholesterolemia|Hereditary Angioedema|Lysosomal Storage Disorders', 'text'),

-- Area 8: Metabolic Disorders
('studies', 'therapeutic_areas', 'area8_title', 'Metabolic Disorders (Metabolic)', 'text'),
('studies', 'therapeutic_areas', 'area8_short_title', 'Metabolic', 'text'),
('studies', 'therapeutic_areas', 'area8_conditions', 'Type 2 Diabetes|Type 1 Diabetes|Obesity|Metabolic Syndrome|Hyperthyroidism|Hypothyroidism|PCOS (Polycystic Ovary Syndrome)|Adrenal Disorders|Pituitary Disorders|Lipid Metabolism Disorders', 'text'),

-- Area 9: Musculoskeletal
('studies', 'therapeutic_areas', 'area9_title', 'Musculoskeletal (MSK)', 'text'),
('studies', 'therapeutic_areas', 'area9_short_title', 'MSK', 'text'),
('studies', 'therapeutic_areas', 'area9_conditions', 'Osteoporosis|Chronic Back Pain|Tendinitis|Bursitis|Rotator Cuff Injuries|Carpal Tunnel Syndrome|Degenerative Disc Disease|Muscle Strains|Joint Injuries|Sports Injuries', 'text'),

-- Area 10: Endocrinology
('studies', 'therapeutic_areas', 'area10_title', 'Endocrinology (Endo)', 'text'),
('studies', 'therapeutic_areas', 'area10_short_title', 'Endo', 'text'),
('studies', 'therapeutic_areas', 'area10_conditions', 'Diabetes Management|Thyroid Disorders|Adrenal Insufficiency|Growth Hormone Deficiency|Cushing''s Syndrome|Hyperparathyroidism|Hypogonadism|Pheochromocytoma|Acromegaly|Calcium Disorders', 'text'),

-- Area 11: Ophthalmology
('studies', 'therapeutic_areas', 'area11_title', 'Ophthalmology (Ophthal)', 'text'),
('studies', 'therapeutic_areas', 'area11_short_title', 'Ophthal', 'text'),
('studies', 'therapeutic_areas', 'area11_conditions', 'Age-Related Macular Degeneration (AMD)|Diabetic Retinopathy|Glaucoma|Dry Eye Disease|Uveitis|Cataracts|Retinal Vein Occlusion|Corneal Diseases|Inherited Retinal Diseases|Ocular Surface Disorders', 'text'),

-- Area 12: ENT
('studies', 'therapeutic_areas', 'area12_title', 'ENT', 'text'),
('studies', 'therapeutic_areas', 'area12_short_title', 'ENT', 'text'),
('studies', 'therapeutic_areas', 'area12_conditions', 'Chronic Sinusitis|Allergic Rhinitis|Tinnitus|Hearing Loss|Sleep Apnea|Tonsillitis|Laryngitis|Meniere''s Disease|Nasal Polyps|Voice Disorders', 'text'),

-- Area 13: Pediatrics
('studies', 'therapeutic_areas', 'area13_title', 'Pediatrics (Peds)', 'text'),
('studies', 'therapeutic_areas', 'area13_short_title', 'Peds', 'text'),
('studies', 'therapeutic_areas', 'area13_conditions', 'Pediatric Asthma|Childhood Obesity|ADHD|Autism Spectrum Disorders|Pediatric Allergies|Juvenile Arthritis|Childhood Diabetes|Growth Disorders|Pediatric Infections|Developmental Delays', 'text'),

-- Area 14: Geriatrics
('studies', 'therapeutic_areas', 'area14_title', 'Geriatrics', 'text'),
('studies', 'therapeutic_areas', 'area14_short_title', 'Geriatrics', 'text'),
('studies', 'therapeutic_areas', 'area14_conditions', 'Dementia|Frailty Syndrome|Polypharmacy Management|Falls Prevention|Cognitive Decline|Sarcopenia|Urinary Incontinence|Chronic Pain Management|Nutritional Deficiencies|End-of-Life Care', 'text'),

-- Area 15: Maternity & Women's Health
('studies', 'therapeutic_areas', 'area15_title', 'Maternity & Women''s Health (Women''s)', 'text'),
('studies', 'therapeutic_areas', 'area15_short_title', 'Women''s', 'text'),
('studies', 'therapeutic_areas', 'area15_conditions', 'Gestational Diabetes|Preeclampsia|Postpartum Depression|Endometriosis|Uterine Fibroids|Menopause Management|Polycystic Ovary Syndrome|Fertility Treatments|Breast Cancer Prevention|Cervical Dysplasia', 'text'),

-- Area 16: Psychiatry
('studies', 'therapeutic_areas', 'area16_title', 'Psychiatry (Psych)', 'text'),
('studies', 'therapeutic_areas', 'area16_short_title', 'Psych', 'text'),
('studies', 'therapeutic_areas', 'area16_conditions', 'Major Depressive Disorder|Generalized Anxiety Disorder|Bipolar Disorder|Schizophrenia|PTSD|OCD|Panic Disorder|Social Anxiety Disorder|Eating Disorders|Substance Use Disorders', 'text'),

-- Area 17: Dermatology
('studies', 'therapeutic_areas', 'area17_title', 'Dermatology (Derm)', 'text'),
('studies', 'therapeutic_areas', 'area17_short_title', 'Derm', 'text'),
('studies', 'therapeutic_areas', 'area17_conditions', 'Psoriasis|Atopic Dermatitis (Eczema)|Acne|Rosacea|Vitiligo|Hidradenitis Suppurativa|Alopecia Areata|Chronic Urticaria|Skin Cancer Prevention|Wound Healing', 'text')

ON CONFLICT DO NOTHING;