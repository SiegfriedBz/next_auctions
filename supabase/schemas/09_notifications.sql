DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'notification_type') THEN
        CREATE TYPE notification_type AS ENUM ('NEW_BID', 'NEW_AUCTION_WON');
    END IF;
END$$;

CREATE TABLE IF NOT EXISTS public.notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    auction_id UUID NOT NULL REFERENCES public.auctions(id) ON DELETE CASCADE,
    recipient_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now(),
    read BOOLEAN DEFAULT false,
    type notification_type DEFAULT 'NEW_BID' NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_notifications_recipient_id
    ON public.notifications (recipient_id);

CREATE INDEX IF NOT EXISTS idx_notifications_auction_id
    ON public.notifications (auction_id);

CREATE INDEX IF NOT EXISTS idx_notifications_created_at
    ON public.notifications (created_at DESC);

-- TRIGGER FUNCTION TO UPDATE updated_at
CREATE FUNCTION update_notifications_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at := NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- TRIGGER BEFORE UPDATE
CREATE TRIGGER trigger_update_notifications_updated_at
BEFORE UPDATE ON notifications
FOR EACH ROW
EXECUTE FUNCTION update_notifications_updated_at();

-- TRIGGER FUNCTION to notify auction owner & previous bidders
CREATE OR REPLACE FUNCTION handle_new_bid()
RETURNS TRIGGER AS $$
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
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for AFTER INSERT on bids
DROP TRIGGER IF EXISTS on_bid_insert ON public.bids;

CREATE TRIGGER on_bid_insert
AFTER INSERT ON public.bids
FOR EACH ROW
EXECUTE FUNCTION handle_new_bid();