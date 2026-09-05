DROP POLICY IF EXISTS "Allow public access to hosts" ON public.hosts;
ALTER TABLE public.hosts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hosts FORCE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public access to users" ON public.users;
DROP POLICY IF EXISTS "Allow admin select users" ON public.users;
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.users FORCE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public access to crm_clients" ON public.crm_clients;
ALTER TABLE public.crm_clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.crm_clients FORCE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public access to crm_activities" ON public.crm_activities;
ALTER TABLE public.crm_activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.crm_activities FORCE ROW LEVEL SECURITY;
