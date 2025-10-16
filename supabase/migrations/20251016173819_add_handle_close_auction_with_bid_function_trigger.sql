set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.handle_close_auction_with_bid()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
DECLARE
    auction_owner UUID;
    highest_bidder UUID;
    previous_bidders UUID[];
BEGIN
    IF (OLD.status IS DISTINCT FROM NEW.status)
        AND NEW.status = 'CLOSED'
        AND NEW.highest_bidder_id IS NOT NULL
    THEN
        -- Who is the auction owner
        auction_owner := NEW.owner_id;

        -- Who placed the highest bidder
        highest_bidder := NEW.highest_bidder_id;

        -- Notify the auction owner 
        INSERT INTO public.notifications (auction_id, recipient_id, type)
        VALUES (NEW.id, auction_owner, 'NEW_AUCTION_WON');

        -- Notify the highest bidder
        INSERT INTO public.notifications (auction_id, recipient_id, type)
        VALUES (NEW.id, highest_bidder, 'NEW_AUCTION_WON');

        -- OPTION - IF WE HAD A 'AUCTION_CLOSED' - LATER
        -- Find all previous bidders (excluding the highest_bidder)
        -- SELECT ARRAY_AGG(DISTINCT bidder_id)
        -- INTO previous_bidders
        -- FROM public.bids
        -- WHERE auction_id = NEW.id
        --     AND bidder_id <> highest_bidder;
        -- Notify all previous bidders
        -- IF previous_bidders IS NOT NULL THEN
        --     INSERT INTO public.notifications (auction_id, recipient_id, type)
        --     SELECT NEW.id, UNNEST(previous_bidders), 'AUCTION_CLOSED';
        -- END IF;

    END IF;
    RETURN NEW;
END;
$function$
;

CREATE TRIGGER on_close_auction_with_bid AFTER UPDATE ON public.auctions FOR EACH ROW EXECUTE FUNCTION handle_close_auction_with_bid();


