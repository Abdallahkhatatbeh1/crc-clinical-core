-- 1) Backfill old contact submissions where company was stored in phone
UPDATE public.contact_submissions
SET company = phone,
    phone = NULL
WHERE company IS NULL
  AND phone IS NOT NULL;

-- 2) Backfill subject/message split for legacy rows: "Subject: ...\n\n..."
UPDATE public.contact_submissions
SET subject = NULLIF(regexp_replace(split_part(message, E'\n\n', 1), '^Subject:\\s*', ''), ''),
    message = regexp_replace(message, '^Subject:.*\r?\n\r?\n', '')
WHERE subject IS NULL
  AND message LIKE 'Subject:%';

-- 3) Tighten public INSERT policies (avoid WITH CHECK (true))
DROP POLICY IF EXISTS "Anyone can insert contact submissions" ON public.contact_submissions;
CREATE POLICY "Anyone can insert contact submissions"
ON public.contact_submissions
FOR INSERT
TO public
WITH CHECK (
  length(trim(full_name)) >= 2
  AND position('@' in email) > 1
  AND length(trim(message)) >= 1
);

DROP POLICY IF EXISTS "Anyone can insert job applications" ON public.job_applications;
CREATE POLICY "Anyone can insert job applications"
ON public.job_applications
FOR INSERT
TO public
WITH CHECK (
  length(trim(full_name)) >= 2
  AND position('@' in email) > 1
  AND length(trim(phone)) >= 6
  AND length(trim(position)) >= 2
);