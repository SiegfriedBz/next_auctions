alter table "public"."bids" enable row level security;

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.update_auction_current_bid()
 RETURNS trigger
 LANGUAGE plpgsql
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

create policy "auth_users_can_delete_own_bids_on_open_auctions"
on "public"."bids"
as permissive
for delete
to public
using (((bidder_id = auth.uid()) AND (EXISTS ( SELECT 1
   FROM auctions a
  WHERE ((a.id = bids.auction_id) AND (a.status = 'OPEN'::auction_status))))));


create policy "auth_users_can_insert_bids_on_open_auctions"
on "public"."bids"
as permissive
for insert
to public
with check (((bidder_id = auth.uid()) AND (EXISTS ( SELECT 1
   FROM auctions a
  WHERE ((a.id = bids.auction_id) AND (a.status = 'OPEN'::auction_status))))));


create policy "auth_users_can_update_own_bids_on_open_auctions"
on "public"."bids"
as permissive
for update
to public
using (((bidder_id = auth.uid()) AND (EXISTS ( SELECT 1
   FROM auctions a
  WHERE ((a.id = bids.auction_id) AND (a.status = 'OPEN'::auction_status))))))
with check (((bidder_id = auth.uid()) AND (EXISTS ( SELECT 1
   FROM auctions a
  WHERE ((a.id = bids.auction_id) AND (a.status = 'OPEN'::auction_status))))));


create policy "users_can_select_all_bids"
on "public"."bids"
as permissive
for select
to public
using (true);


CREATE TRIGGER trigger_update_current_bid_after_delete AFTER DELETE ON public.bids FOR EACH ROW EXECUTE FUNCTION update_current_bid_after_delete();

CREATE TRIGGER trigger_update_current_bid_after_insert_update AFTER INSERT OR UPDATE ON public.bids FOR EACH ROW EXECUTE FUNCTION update_auction_current_bid();


