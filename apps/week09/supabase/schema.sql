-- Where Should I Live? — Melbourne suburb data
-- Run this in the Supabase SQL editor.

create table if not exists public.melbourne_suburbs (
  id bigserial primary key,
  name text not null,
  region text not null,
  median_house_price integer not null,
  property_mix text not null check (
    property_mix in ('apartments', 'townhouses', 'houses', 'mixed', 'acreage')
  ),
  beach_score smallint not null check (beach_score between 1 and 10),
  hills_score smallint not null check (hills_score between 1 and 10),
  cbd_distance_km smallint not null,
  transport_score smallint not null check (transport_score between 1 and 10),
  cafe_score smallint not null check (cafe_score between 1 and 10),
  nightlife_score smallint not null check (nightlife_score between 1 and 10),
  green_space_score smallint not null check (green_space_score between 1 and 10),
  walkability_score smallint not null check (walkability_score between 1 and 10),
  school_score smallint not null check (school_score between 1 and 10),
  family_score smallint not null check (family_score between 1 and 10),
  cultural_communities text[] not null default '{}',
  hipster_score smallint not null check (hipster_score between 1 and 10),
  bogan_score smallint not null check (bogan_score between 1 and 10),
  afl_culture boolean not null default false,
  new_estate boolean not null default false,
  dog_friendly_score smallint not null check (dog_friendly_score between 1 and 10),
  inserted_at timestamptz not null default now()
);

-- Allow public read so the frontend's anon key can query suburbs.
alter table public.melbourne_suburbs enable row level security;

drop policy if exists "Public can read suburbs" on public.melbourne_suburbs;
create policy "Public can read suburbs"
  on public.melbourne_suburbs
  for select
  using (true);
