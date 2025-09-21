create table "public"."bids" (
    "id" uuid not null default gen_random_uuid(),
    "auction_id" uuid not null,
    "bidder_id" uuid not null,
    "amount" numeric not null,
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone not null default now()
);


CREATE UNIQUE INDEX bids_pkey ON public.bids USING btree (id);

CREATE UNIQUE INDEX idx_unique_bid_amount_per_auction ON public.bids USING btree (auction_id, amount);

alter table "public"."bids" add constraint "bids_pkey" PRIMARY KEY using index "bids_pkey";

alter table "public"."bids" add constraint "bids_amount_check" CHECK ((amount > (0)::numeric)) not valid;

alter table "public"."bids" validate constraint "bids_amount_check";

alter table "public"."bids" add constraint "bids_auction_id_fkey" FOREIGN KEY (auction_id) REFERENCES auctions(id) ON DELETE CASCADE not valid;

alter table "public"."bids" validate constraint "bids_auction_id_fkey";

alter table "public"."bids" add constraint "bids_bidder_id_fkey" FOREIGN KEY (bidder_id) REFERENCES users(id) ON DELETE RESTRICT not valid;

alter table "public"."bids" validate constraint "bids_bidder_id_fkey";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.update_bids_updated_at()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
BEGIN
  NEW.updated_at := NOW();
  RETURN NEW;
END;
$function$
;

grant delete on table "public"."bids" to "anon";

grant insert on table "public"."bids" to "anon";

grant references on table "public"."bids" to "anon";

grant select on table "public"."bids" to "anon";

grant trigger on table "public"."bids" to "anon";

grant truncate on table "public"."bids" to "anon";

grant update on table "public"."bids" to "anon";

grant delete on table "public"."bids" to "authenticated";

grant insert on table "public"."bids" to "authenticated";

grant references on table "public"."bids" to "authenticated";

grant select on table "public"."bids" to "authenticated";

grant trigger on table "public"."bids" to "authenticated";

grant truncate on table "public"."bids" to "authenticated";

grant update on table "public"."bids" to "authenticated";

grant delete on table "public"."bids" to "service_role";

grant insert on table "public"."bids" to "service_role";

grant references on table "public"."bids" to "service_role";

grant select on table "public"."bids" to "service_role";

grant trigger on table "public"."bids" to "service_role";

grant truncate on table "public"."bids" to "service_role";

grant update on table "public"."bids" to "service_role";

CREATE TRIGGER trigger_update_bids_updated_at BEFORE UPDATE ON public.bids FOR EACH ROW EXECUTE FUNCTION update_bids_updated_at();


