-- Create table for site settings
create table if not exists public.site_settings (
  id uuid default gen_random_uuid() primary key,
  site_title text not null default 'Veterinarians With a Mission Programme',
  contact_email text not null default 'info@kenyavetsmission.org',
  phone text not null default '0116-922-908',
  address text not null default 'Ultimate House, Oloolua Road, Ngong Town',
  social_links jsonb default '{"twitter": "https://twitter.com/vmp-org", "facebook": "https://facebook.com", "instagram": "https://instagram.com"}'::jsonb,
  theme text default 'light',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.site_settings enable row level security;

-- Create policy to allow everyone to read settings
create policy "Enable read access for all users"
  on public.site_settings for select
  using (true);

-- Create policy to allow authenticated users (admins) to update settings
create policy "Enable update for authenticated users only"
  on public.site_settings for update
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- Create policy to allow authenticated users to insert (only if table is empty ideally, but for now allow auth)
create policy "Enable insert for authenticated users only"
  on public.site_settings for insert
  with check (auth.role() = 'authenticated');

-- Create function to update updated_at timestamp
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- Create trigger for updated_at
create trigger handle_updated_at
  before update on public.site_settings
  for each row
  execute procedure public.handle_updated_at();

-- Insert default row if not exists
insert into public.site_settings (site_title, contact_email, phone, address, theme)
select 'Veterinarians With a Mission Programme', 'info@kenyavetsmission.org', '0116-922-908', 'Ultimate House, Oloolua Road, Ngong Town', 'light'
where not exists (select 1 from public.site_settings);
