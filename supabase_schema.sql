-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- NEWS & EVENTS
create table public.news (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  content text not null, -- Rich text HTML
  image_url text,
  category text check (category in ('news', 'event')),
  date date not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- MISSIONS
create table public.missions (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  description text not null, -- Rich text HTML
  location text not null,
  status text check (status in ('upcoming', 'ongoing', 'completed')),
  start_date date,
  end_date date,
  cover_image text,
  images text[] default '{}', -- Array of image URLs
  stats jsonb default '{}'::jsonb, -- JSON for flexible stats: { treated: 100, value: "1M", bibles: 50 }
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- GALLERY
create table public.gallery (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  image_url text not null,
  category text not null, -- e.g., 'missions', 'training', 'community'
  description text,
  featured boolean default false,
  mission_id uuid references public.missions(id) on delete set null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- TESTIMONIALS
create table public.testimonials (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  role text,
  content text not null,
  image_url text,
  rating integer default 5,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- HERO SLIDES (Homepage Controller)
create table public.hero_slides (
  id uuid default uuid_generate_v4() primary key,
  image text not null,
  title text not null,
  subtitle text,
  description text,
  order_index integer default 0,
  active boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- STORAGE BUCKETS
-- You will need to create a 'public' bucket in Supabase Storage
-- and add policies for public read access.
