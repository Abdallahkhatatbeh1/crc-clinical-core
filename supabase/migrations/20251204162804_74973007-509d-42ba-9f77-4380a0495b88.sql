-- Allow first admin creation (only if no admin exists)
CREATE OR REPLACE FUNCTION public.is_first_admin()
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT NOT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE role = 'admin'
  )
$$;

-- Policy to allow creating first admin
CREATE POLICY "Allow first admin creation"
ON public.user_roles
FOR INSERT
TO authenticated
WITH CHECK (
  public.is_first_admin() AND role = 'admin' AND user_id = auth.uid()
);