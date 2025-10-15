drop trigger if exists "trigger_update_current_bid_after_delete" on "public"."bids";

drop trigger if exists "trigger_update_current_bid_after_insert_update" on "public"."bids";

drop function if exists "public"."update_auction_current_bid"();

drop function if exists "public"."update_current_bid_after_delete"();

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.update_auction_highest_bid()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
DECLARE
  max_bid NUMERIC;
  max_bidder UUID;
BEGIN
  -- Find the max bid and the corresponding bidder
  SELECT amount, bidder_id
  INTO max_bid, max_bidder
  FROM bids
  WHERE auction_id = NEW.auction_id
  ORDER BY amount DESC, created_at ASC
  LIMIT 1;

  -- Update auction with highest_bid and highest_bidder_id
  UPDATE auctions
  SET highest_bid = max_bid,
      highest_bidder_id = max_bidder,
      updated_at = NOW()
  WHERE id = NEW.auction_id;

  RETURN NEW;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.update_auction_highest_bid_after_delete()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
DECLARE
  max_bid NUMERIC;
  max_bidder UUID;
BEGIN
  -- Find the new max bid and bidder after deletion
  SELECT amount, bidder_id
  INTO max_bid, max_bidder
  FROM bids
  WHERE auction_id = OLD.auction_id
  ORDER BY amount DESC, created_at ASC
  LIMIT 1;

  -- Update auction
  UPDATE auctions
  SET highest_bid = max_bid,
      highest_bidder_id = max_bidder,
      updated_at = NOW()
  WHERE id = OLD.auction_id;

  RETURN OLD;
END;
$function$
;

CREATE TRIGGER trigger_update_highest_bid_after_delete AFTER DELETE ON public.bids FOR EACH ROW EXECUTE FUNCTION update_auction_highest_bid_after_delete();

CREATE TRIGGER trigger_update_highest_bid_after_insert_update AFTER INSERT OR UPDATE ON public.bids FOR EACH ROW EXECUTE FUNCTION update_auction_highest_bid();


