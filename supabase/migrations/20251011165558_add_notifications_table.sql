create table "public"."notifications" (
    "id" uuid not null default gen_random_uuid(),
    "auction_id" uuid not null,
    "recipient_id" uuid not null,
    "created_at" timestamp with time zone default now(),
    "updated_at" timestamp with time zone default now(),
    "read" boolean default false
);


CREATE INDEX idx_notifications_auction_id ON public.notifications USING btree (auction_id);

CREATE INDEX idx_notifications_created_at ON public.notifications USING btree (created_at DESC);

CREATE INDEX idx_notifications_recipient_id ON public.notifications USING btree (recipient_id);

CREATE UNIQUE INDEX notifications_pkey ON public.notifications USING btree (id);

alter table "public"."notifications" add constraint "notifications_pkey" PRIMARY KEY using index "notifications_pkey";

alter table "public"."notifications" add constraint "notifications_auction_id_fkey" FOREIGN KEY (auction_id) REFERENCES auctions(id) ON DELETE CASCADE not valid;

alter table "public"."notifications" validate constraint "notifications_auction_id_fkey";

alter table "public"."notifications" add constraint "notifications_recipient_id_fkey" FOREIGN KEY (recipient_id) REFERENCES users(id) ON DELETE CASCADE not valid;

alter table "public"."notifications" validate constraint "notifications_recipient_id_fkey";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.handle_new_bid()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
DECLARE
    auction_owner UUID;
    bidder UUID;
    previous_bidders UUID[];
BEGIN
    -- Who placed the bid
    bidder := NEW.bidder_id;

    -- Find the auction owner
    SELECT owner_id INTO auction_owner
    FROM public.auctions
    WHERE id = NEW.auction_id;

    -- Find all previous bidders (excluding the current bidder)
    SELECT ARRAY_AGG(DISTINCT bidder_id)
    INTO previous_bidders
    FROM public.bids
    WHERE auction_id = NEW.auction_id
        AND bidder_id <> bidder;

    -- Notify the auction owner if not the bidder
    IF auction_owner <> bidder THEN
        INSERT INTO public.notifications (auction_id, recipient_id)
        VALUES (NEW.auction_id, auction_owner);
    END IF;

    -- Notify all previous bidders
    IF previous_bidders IS NOT NULL THEN
        INSERT INTO public.notifications (auction_id, recipient_id)
        SELECT NEW.auction_id, UNNEST(previous_bidders);
    END IF;

    RETURN NEW;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.update_notifications_updated_at()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
BEGIN
    NEW.updated_at := NOW();
    RETURN NEW;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.update_auction_current_bid()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
DECLARE
  max_bid NUMERIC;
BEGIN
  SELECT MAX(amount) INTO max_bid
  FROM bids
  WHERE auction_id = NEW.auction_id;

  UPDATE auctions
  SET current_bid = max_bid,
      updated_at = NOW()
  WHERE id = NEW.auction_id;

  RETURN NEW;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.update_current_bid_after_delete()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
DECLARE
  max_bid NUMERIC;
BEGIN
  SELECT MAX(amount) INTO max_bid
  FROM bids
  WHERE auction_id = OLD.auction_id;

  UPDATE auctions
  SET current_bid = max_bid,
      updated_at = NOW()
  WHERE id = OLD.auction_id;

  RETURN OLD;
END;
$function$
;

grant delete on table "public"."notifications" to "anon";

grant insert on table "public"."notifications" to "anon";

grant references on table "public"."notifications" to "anon";

grant select on table "public"."notifications" to "anon";

grant trigger on table "public"."notifications" to "anon";

grant truncate on table "public"."notifications" to "anon";

grant update on table "public"."notifications" to "anon";

grant delete on table "public"."notifications" to "authenticated";

grant insert on table "public"."notifications" to "authenticated";

grant references on table "public"."notifications" to "authenticated";

grant select on table "public"."notifications" to "authenticated";

grant trigger on table "public"."notifications" to "authenticated";

grant truncate on table "public"."notifications" to "authenticated";

grant update on table "public"."notifications" to "authenticated";

grant delete on table "public"."notifications" to "service_role";

grant insert on table "public"."notifications" to "service_role";

grant references on table "public"."notifications" to "service_role";

grant select on table "public"."notifications" to "service_role";

grant trigger on table "public"."notifications" to "service_role";

grant truncate on table "public"."notifications" to "service_role";

grant update on table "public"."notifications" to "service_role";

CREATE TRIGGER on_bid_insert AFTER INSERT ON public.bids FOR EACH ROW EXECUTE FUNCTION handle_new_bid();

CREATE TRIGGER trigger_update_notifications_updated_at BEFORE UPDATE ON public.notifications FOR EACH ROW EXECUTE FUNCTION update_notifications_updated_at();


