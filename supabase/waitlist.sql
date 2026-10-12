-- Alhamoked isolated namespace. Run once in the Supabase SQL Editor.
-- Compatible with a new project or an existing project; no existing objects changed.
begin;
create table public.alhamoked_admins (user_id uuid primary key references auth.users(id) on delete cascade);
create table public.alhamoked_events (event_id text primary key, enabled boolean not null default false);
create table public.alhamoked_waitlist (
 id uuid primary key default gen_random_uuid(), event_id text not null references public.alhamoked_events(event_id),
 name text not null check(length(trim(name)) between 1 and 120),
 email text not null check(length(email) <= 254 and email ~ '^[^[:space:]@]+@[^[:space:]@]+\.[^[:space:]@]+$'),
 phone text not null default '' check(length(phone)<=40), qty integer not null check(qty between 1 and 10),
 lang text not null check(lang in ('he','en','ar')), status text not null default 'waiting' check(status in ('waiting','offered','matched','removed')),
 token uuid not null unique default gen_random_uuid(), created_at timestamptz not null default now()
);
create table public.alhamoked_listings (
 id uuid primary key default gen_random_uuid(), event_id text not null references public.alhamoked_events(event_id),
 seller_name text not null check(length(trim(seller_name)) between 1 and 120),
 seller_contact jsonb not null check(jsonb_typeof(seller_contact)='object' and seller_contact ? 'email' and seller_contact ? 'lang' and seller_contact->>'email' is not null and seller_contact->>'lang' is not null and (seller_contact->>'lang') in ('he','en','ar') and length(seller_contact->>'email') between 3 and 254 and (seller_contact->>'email') ~ '^[^[:space:]@]+@[^[:space:]@]+\.[^[:space:]@]+$' and coalesce(length(seller_contact->>'phone'),0)<=40),
 qty integer not null check(qty between 0 and 10), lang text not null check(lang in ('he','en','ar')),
 status text not null default 'open' check(status in ('open','reserved','sold')),
 token uuid not null unique default gen_random_uuid(), created_at timestamptz not null default now()
);
create table public.alhamoked_matches (
 id uuid primary key default gen_random_uuid(), listing_id uuid not null references public.alhamoked_listings(id),
 waitlist_id uuid not null references public.alhamoked_waitlist(id), qty integer not null check(qty between 1 and 10),
 offered_at timestamptz not null default now(), expires_at timestamptz not null default (now()+interval '24 hours'),
 token uuid not null unique default gen_random_uuid(),
 status text not null default 'offered' check(status in ('offered','confirmed','sold','expired')), confirmed_at timestamptz
);
create unique index alhamoked_listing_active on public.alhamoked_matches(listing_id) where status in ('offered','confirmed');
create unique index alhamoked_buyer_active on public.alhamoked_matches(waitlist_id) where status in ('offered','confirmed');
create index alhamoked_fifo on public.alhamoked_waitlist(event_id,created_at,id) where status='waiting';
create unique index alhamoked_waiting_email on public.alhamoked_waitlist(event_id,lower(email)) where status in ('waiting','offered','matched');
create or replace function public.alhamoked_is_admin() returns boolean language sql stable security definer set search_path=public,pg_temp as $$
 select exists(select 1 from public.alhamoked_admins where user_id=auth.uid());
$$;
revoke all on function public.alhamoked_is_admin() from public;
grant execute on function public.alhamoked_is_admin() to authenticated;
alter table public.alhamoked_admins enable row level security;
alter table public.alhamoked_events enable row level security;
alter table public.alhamoked_waitlist enable row level security;
alter table public.alhamoked_listings enable row level security;
alter table public.alhamoked_matches enable row level security;
revoke all on public.alhamoked_admins,public.alhamoked_events,public.alhamoked_waitlist,public.alhamoked_listings,public.alhamoked_matches from anon,authenticated;
grant select(event_id,enabled) on public.alhamoked_events to anon,authenticated;
create policy alhamoked_events_public on public.alhamoked_events for select to anon,authenticated using(true);
grant insert(event_id,name,email,phone,qty,lang,token) on public.alhamoked_waitlist to anon,authenticated;
grant insert(event_id,seller_name,seller_contact,qty,lang,token) on public.alhamoked_listings to anon,authenticated;
create policy alhamoked_join on public.alhamoked_waitlist for insert to anon,authenticated with check(status='waiting' and exists(select 1 from public.alhamoked_events e where e.event_id=alhamoked_waitlist.event_id and e.enabled));
create policy alhamoked_sell on public.alhamoked_listings for insert to anon,authenticated with check(status='open' and qty between 1 and 10 and exists(select 1 from public.alhamoked_events e where e.event_id=alhamoked_listings.event_id and e.enabled));
grant select on public.alhamoked_waitlist,public.alhamoked_listings,public.alhamoked_matches to authenticated;
create policy alhamoked_admin_waitlist on public.alhamoked_waitlist for select to authenticated using(public.alhamoked_is_admin());
create policy alhamoked_admin_listings on public.alhamoked_listings for select to authenticated using(public.alhamoked_is_admin());
create policy alhamoked_admin_matches on public.alhamoked_matches for select to authenticated using(public.alhamoked_is_admin());
-- Expiry is enforced on every operational read/write. No cron is required.
create function public.alhamoked_expire() returns void language plpgsql security definer set search_path=public,pg_temp as $$
declare m record;
begin
 for m in select * from public.alhamoked_matches where status='offered' and expires_at<=now() for update skip locked loop
  update public.alhamoked_listings set status='open' where id=m.listing_id and status='reserved';
  update public.alhamoked_waitlist set status='removed' where id=m.waitlist_id and status='offered';
  update public.alhamoked_matches set status='expired' where id=m.id;
 end loop;
end; $$;
revoke all on function public.alhamoked_expire() from public,anon,authenticated;
create function public.alhamoked_admin_snapshot() returns jsonb language plpgsql security definer set search_path=public,pg_temp as $$
begin
 if not public.alhamoked_is_admin() then raise exception 'Not authorized'; end if;
 perform public.alhamoked_expire();
 return jsonb_build_object('listings',(select coalesce(jsonb_agg(l order by created_at,id),'[]'::jsonb) from public.alhamoked_listings l), 'waitlist',(select coalesce(jsonb_agg(w order by created_at,id),'[]'::jsonb) from public.alhamoked_waitlist w), 'matches',(select coalesce(jsonb_agg(m order by offered_at desc),'[]'::jsonb) from public.alhamoked_matches m));
end; $$;
create function public.alhamoked_offer(p_listing uuid) returns jsonb language plpgsql security definer set search_path=public,pg_temp as $$
declare l public.alhamoked_listings; w public.alhamoked_waitlist; m public.alhamoked_matches;
begin
 if not public.alhamoked_is_admin() then raise exception 'Not authorized'; end if;
 perform public.alhamoked_expire();
 -- Serializes offers for the same event, including across different listings.
 select * into l from public.alhamoked_listings where id=p_listing;
 if not found then raise exception 'Listing missing'; end if;
 perform pg_advisory_xact_lock(hashtextextended(l.event_id,0));
 select * into l from public.alhamoked_listings where id=p_listing for update;
 if l.status <> 'open' then raise exception 'Listing unavailable'; end if;
 select * into w from public.alhamoked_waitlist where event_id=l.event_id and status='waiting' order by created_at,id limit 1 for update;
 if not found then raise exception 'Queue empty'; end if;
 if w.qty>l.qty then raise exception 'First buyer needs more tickets; do not skip FIFO'; end if;
 insert into public.alhamoked_matches(listing_id,waitlist_id,qty) values(l.id,w.id,w.qty) returning * into m;
 update public.alhamoked_waitlist set status='offered' where id=w.id;
 update public.alhamoked_listings set status='reserved' where id=l.id;
 return jsonb_build_object('match',to_jsonb(m),'buyer',to_jsonb(w),'listing',to_jsonb(l));
end; $$;
-- Token links are bearer credentials. Responses disclose only this offer, never the queue.
create function public.alhamoked_offer_view(p_token uuid) returns jsonb language plpgsql security definer set search_path=public,pg_temp as $$
declare w public.alhamoked_waitlist; m public.alhamoked_matches; l public.alhamoked_listings;
begin
 perform public.alhamoked_expire();
 select * into m from public.alhamoked_matches where token=p_token and status in ('offered','confirmed');
 if not found then return null; end if;
 select * into w from public.alhamoked_waitlist where id=m.waitlist_id;
 select * into l from public.alhamoked_listings where id=m.listing_id;
 return jsonb_build_object('event_id',w.event_id,'qty',m.qty,'status',m.status,'expires_at',m.expires_at,'seller',case when m.status='confirmed' then jsonb_build_object('name',l.seller_name,'email',l.seller_contact->>'email','phone',l.seller_contact->>'phone') else null end);
end; $$;
create function public.alhamoked_confirm(p_token uuid) returns jsonb language plpgsql security definer set search_path=public,pg_temp as $$
declare w public.alhamoked_waitlist; m public.alhamoked_matches;
begin
 perform public.alhamoked_expire();
 select * into m from public.alhamoked_matches where token=p_token and status in ('offered','confirmed') for update;
 select * into w from public.alhamoked_waitlist where id=m.waitlist_id;
 if m.id is null or w.id is null or (m.status='offered' and m.expires_at<=now()) then raise exception 'Invalid offer'; end if;
 if m.status='offered' then
  update public.alhamoked_matches set status='confirmed',confirmed_at=now() where id=m.id;
  update public.alhamoked_waitlist set status='matched' where id=w.id;
 end if;
 return public.alhamoked_offer_view(p_token);
end; $$;
create function public.alhamoked_seller_view(p_token uuid) returns jsonb language plpgsql security definer set search_path=public,pg_temp as $$
declare l public.alhamoked_listings; w public.alhamoked_waitlist; m public.alhamoked_matches;
begin
 perform public.alhamoked_expire();
 select * into l from public.alhamoked_listings where token=p_token;
 if not found then return null; end if;
 select * into m from public.alhamoked_matches where listing_id=l.id and status='confirmed';
 if found then select * into w from public.alhamoked_waitlist where id=m.waitlist_id; end if;
 return jsonb_build_object('event_id',l.event_id,'qty',l.qty,'status',l.status,'match_id',m.id,'matched_qty',m.qty,'buyer',case when w.id is not null then jsonb_build_object('name',w.name,'email',w.email,'phone',w.phone) else null end);
end; $$;
create function public.alhamoked_sold(p_token uuid,p_match uuid) returns jsonb language plpgsql security definer set search_path=public,pg_temp as $$
declare l public.alhamoked_listings; m public.alhamoked_matches;
begin
 select * into l from public.alhamoked_listings where token=p_token for update;
 if not found then raise exception 'Invalid listing'; end if;
 select * into m from public.alhamoked_matches where id=p_match and listing_id=l.id for update;
 if not found or m.status not in ('confirmed','sold') then raise exception 'No confirmed sale'; end if;
 if m.status='confirmed' then
  update public.alhamoked_listings set qty=qty-m.qty,status=case when qty-m.qty=0 then 'sold' else 'open' end where id=l.id;
  update public.alhamoked_matches set status='sold' where id=m.id;
  update public.alhamoked_waitlist set status='removed' where id=m.waitlist_id;
 end if;
 return jsonb_build_object('status','sold');
end; $$;
create function public.alhamoked_remove(p_waitlist uuid) returns void language plpgsql security definer set search_path=public,pg_temp as $$
begin
 if not public.alhamoked_is_admin() then raise exception 'Not authorized'; end if;
 update public.alhamoked_waitlist set status='removed' where id=p_waitlist and status='waiting';
 if not found then raise exception 'Only waiting entries can be removed'; end if;
end; $$;
revoke all on function public.alhamoked_admin_snapshot(),public.alhamoked_offer(uuid),public.alhamoked_offer_view(uuid),public.alhamoked_confirm(uuid),public.alhamoked_seller_view(uuid),public.alhamoked_sold(uuid,uuid),public.alhamoked_remove(uuid) from public;
grant execute on function public.alhamoked_admin_snapshot(),public.alhamoked_offer(uuid),public.alhamoked_remove(uuid) to authenticated;
grant execute on function public.alhamoked_offer_view(uuid),public.alhamoked_confirm(uuid),public.alhamoked_seller_view(uuid),public.alhamoked_sold(uuid,uuid) to anon,authenticated;
-- Current known event IDs, inactive until the organizer opens the waiting list.
insert into public.alhamoked_events(event_id) values ('future_superate_gorenment'),('public_broadcasting'),('gender_segregation_academia');
commit;
