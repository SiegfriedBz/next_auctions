-- BIDS TABLE
CREATE TABLE bids (
  id UUID PRIMARY KEY DEFAULT GEN_RANDOM_UUID(),
  auction_id UUID NOT NULL REFERENCES auctions(id) ON DELETE CASCADE,
  bidder_id UUID NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
  amount NUMERIC NOT NULL CHECK (amount > 0),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- UNIQUE CONSTRAINT TO PREVENT DUPLICATE BID AMOUNTS PER AUCTION
CREATE UNIQUE INDEX idx_unique_bid_amount_per_auction 
ON bids(auction_id, amount);

-- TRIGGER FUNCTION TO UPDATE updated_at ON UPDATE
CREATE FUNCTION update_bids_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at := NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- TRIGGER BEFORE UPDATE
CREATE TRIGGER trigger_update_bids_updated_at
BEFORE UPDATE ON bids
FOR EACH ROW
EXECUTE FUNCTION update_bids_updated_at();

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

-- FUNCTIONS TO UPDATE current_bid IN AUCTIONS
-- 1. AFTER INSERT OR UPDATE ON BIDS
CREATE FUNCTION update_auction_current_bid()
RETURNS TRIGGER AS $$
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
$$ LANGUAGE plpgsql;

-- TRIGGER AFTER INSERT OR UPDATE
CREATE TRIGGER trigger_update_current_bid_after_insert_update
AFTER INSERT OR UPDATE ON bids
FOR EACH ROW
EXECUTE FUNCTION update_auction_current_bid();

-- 2. AFTER DELETE ON BIDS
CREATE FUNCTION update_current_bid_after_delete()
RETURNS TRIGGER AS $$
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
$$ LANGUAGE plpgsql;

-- TRIGGER AFTER DELETE
CREATE TRIGGER trigger_update_current_bid_after_delete
AFTER DELETE ON bids
FOR EACH ROW
EXECUTE FUNCTION update_current_bid_after_delete();
