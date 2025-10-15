create type "public"."notification_type" as enum ('NEW_BID', 'NEW_AUCTION_WON');

alter table "public"."notifications" add column "type" notification_type not null default 'NEW_BID'::notification_type;

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
        INSERT INTO public.notifications (auction_id, recipient_id, type)
        VALUES (NEW.auction_id, auction_owner, 'NEW_BID');
    END IF;

    -- Notify all previous bidders
    IF previous_bidders IS NOT NULL THEN
        INSERT INTO public.notifications (auction_id, recipient_id, type)
        SELECT NEW.auction_id, UNNEST(previous_bidders), 'NEW_BID';
    END IF;

    RETURN NEW;
END;
$function$
;


