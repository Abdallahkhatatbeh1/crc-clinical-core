-- Create job_positions table
CREATE TABLE public.job_positions (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT true,
    display_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.job_positions ENABLE ROW LEVEL SECURITY;

-- Anyone can read active positions
CREATE POLICY "Anyone can read active positions"
ON public.job_positions
FOR SELECT
USING (is_active = true);

-- Admins can manage all positions
CREATE POLICY "Admins can manage positions"
ON public.job_positions
FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Create trigger for updated_at
CREATE TRIGGER update_job_positions_updated_at
BEFORE UPDATE ON public.job_positions
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default positions
INSERT INTO public.job_positions (title, display_order) VALUES
('Principal Investigator', 1),
('Sub-Investigator', 2),
('Clinical Research Coordinator', 3),
('Clinical Pharmacist', 4),
('Data Entry Specialist', 5),
('Lab Technician', 6),
('Quality Assurance Specialist', 7),
('Regulatory Affairs Specialist', 8),
('Nurse / Clinical Staff', 9),
('Other', 100);