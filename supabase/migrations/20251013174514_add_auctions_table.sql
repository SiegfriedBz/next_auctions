create type "public"."auction_category" as enum ('ELECTRONICS', 'FASHION', 'COLLECTIBLES', 'ART', 'MUSIC', 'SPORTS', 'HOME', 'TOYS', 'AUTOMOTIVE');

create type "public"."auction_status" as enum ('DRAFT', 'OPEN', 'CLOSED');

create table "public"."auctions" (
    "id" uuid not null default gen_random_uuid(),
    "storage_id" uuid,
    "owner_id" uuid not null,
    "title" text not null,
    "description" text not null,
    "images" jsonb not null default '[]'::jsonb,
    "category" auction_category not null default 'MUSIC'::auction_category,
    "status" auction_status not null default 'DRAFT'::auction_status,
    "starting_price" numeric not null,
    "current_bid" numeric,
    "started_at" timestamp with time zone,
    "end_at" timestamp with time zone,
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone not null default now()
);


CREATE UNIQUE INDEX auctions_pkey ON public.auctions USING btree (id);

CREATE UNIQUE INDEX auctions_storage_id_key ON public.auctions USING btree (storage_id);

alter table "public"."auctions" add constraint "auctions_pkey" PRIMARY KEY using index "auctions_pkey";

alter table "public"."auctions" add constraint "auctions_check" CHECK (((current_bid >= starting_price) OR (current_bid IS NULL))) not valid;

alter table "public"."auctions" validate constraint "auctions_check";

alter table "public"."auctions" add constraint "auctions_check1" CHECK (((end_at > started_at) OR (started_at IS NULL))) not valid;

alter table "public"."auctions" validate constraint "auctions_check1";

alter table "public"."auctions" add constraint "auctions_owner_id_fkey" FOREIGN KEY (owner_id) REFERENCES users(id) not valid;

alter table "public"."auctions" validate constraint "auctions_owner_id_fkey";

alter table "public"."auctions" add constraint "auctions_starting_price_check" CHECK ((starting_price > (0)::numeric)) not valid;

alter table "public"."auctions" validate constraint "auctions_starting_price_check";

alter table "public"."auctions" add constraint "auctions_storage_id_key" UNIQUE using index "auctions_storage_id_key";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.before_update_auction()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
BEGIN
  -- Prevent opening without end_at
  IF NEW.status = 'OPEN' THEN
    IF NEW.end_at IS NULL THEN
      RAISE EXCEPTION 'Cannot open auction without end_at';
    END IF;

    -- If moving from DRAFT → OPEN, set started_at
    IF OLD.status = 'DRAFT' THEN
      NEW.started_at := NOW();
    END IF;
  END IF;

  -- Always update updated_at timestamp
  NEW.updated_at := NOW();

  RETURN NEW;
END;
$function$
;

grant delete on table "public"."auctions" to "anon";

grant insert on table "public"."auctions" to "anon";

grant references on table "public"."auctions" to "anon";

grant select on table "public"."auctions" to "anon";

grant trigger on table "public"."auctions" to "anon";

grant truncate on table "public"."auctions" to "anon";

grant update on table "public"."auctions" to "anon";

grant delete on table "public"."auctions" to "authenticated";

grant insert on table "public"."auctions" to "authenticated";

grant references on table "public"."auctions" to "authenticated";

grant select on table "public"."auctions" to "authenticated";

grant trigger on table "public"."auctions" to "authenticated";

grant truncate on table "public"."auctions" to "authenticated";

grant update on table "public"."auctions" to "authenticated";

grant delete on table "public"."auctions" to "service_role";

grant insert on table "public"."auctions" to "service_role";

grant references on table "public"."auctions" to "service_role";

grant select on table "public"."auctions" to "service_role";

grant trigger on table "public"."auctions" to "service_role";

grant truncate on table "public"."auctions" to "service_role";

grant update on table "public"."auctions" to "service_role";

CREATE TRIGGER trigger_before_update_auction BEFORE UPDATE ON public.auctions FOR EACH ROW EXECUTE FUNCTION before_update_auction();


