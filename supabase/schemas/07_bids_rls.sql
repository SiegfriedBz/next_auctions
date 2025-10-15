
-- ENABLE RLS
ALTER TABLE bids ENABLE ROW LEVEL SECURITY;

-- USERS RLS POLICIES
-- 1. VIEW ALL BIDS
CREATE POLICY "users_can_select_all_bids"
ON bids
FOR SELECT
USING (TRUE);

-- 2. INSERT BIDS (ONLY AUTHENTICATED USERS AND OPEN AUCTIONS)
CREATE POLICY "auth_users_can_insert_bids_on_open_auctions"
ON bids
FOR INSERT
WITH CHECK (
  bidder_id = auth.uid() AND
  EXISTS (
    SELECT 1
    FROM auctions a
    WHERE a.id = bids.auction_id
      AND a.status = 'OPEN'
  )
);

-- 3. UPDATE BIDS (ONLY OWN BIDS AND OPEN AUCTIONS)
CREATE POLICY "auth_users_can_update_own_bids_on_open_auctions"
ON bids
FOR UPDATE
USING (
  bidder_id = auth.uid() AND
  EXISTS (
    SELECT 1
    FROM auctions a
    WHERE a.id = bids.auction_id
      AND a.status = 'OPEN'
  )
)
WITH CHECK (
  bidder_id = auth.uid() AND
  EXISTS (
    SELECT 1
    FROM auctions a
    WHERE a.id = bids.auction_id
      AND a.status = 'OPEN'
  )
);

-- 4. DELETE BIDS (ONLY OWN BIDS AND OPEN AUCTIONS)
CREATE POLICY "auth_users_can_delete_own_bids_on_open_auctions"
ON bids
FOR DELETE
USING (
  bidder_id = auth.uid() AND
  EXISTS (
    SELECT 1
    FROM auctions a
    WHERE a.id = bids.auction_id
      AND a.status = 'OPEN'
  )
);

-- FUNCTIONS TO UPDATE highest_bidder_id & highest_bid IN AUCTIONS
-- 1. AFTER INSERT OR UPDATE ON BIDS
CREATE OR REPLACE FUNCTION update_auction_highest_bid()
RETURNS TRIGGER AS $$
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
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- TRIGGER AFTER INSERT OR UPDATE
DROP TRIGGER IF EXISTS trigger_update_current_bid_after_insert_update ON bids;
CREATE TRIGGER trigger_update_highest_bid_after_insert_update
AFTER INSERT OR UPDATE ON bids
FOR EACH ROW
EXECUTE FUNCTION update_auction_highest_bid();

-- 2. AFTER DELETE ON BIDS
CREATE OR REPLACE FUNCTION update_auction_highest_bid_after_delete()
RETURNS TRIGGER AS $$
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
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- TRIGGER AFTER DELETE
DROP TRIGGER IF EXISTS trigger_update_current_bid_after_delete ON bids;
CREATE TRIGGER trigger_update_highest_bid_after_delete
AFTER DELETE ON bids
FOR EACH ROW
EXECUTE FUNCTION update_auction_highest_bid_after_delete();
