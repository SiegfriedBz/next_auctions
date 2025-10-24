-- ENABLE RLS
ALTER TABLE auctions ENABLE ROW LEVEL SECURITY;

-- 1. VIEW ALL AUCTIONS
CREATE POLICY "users_can_select_all_auctions"
ON auctions
FOR SELECT
USING (TRUE);

-- 2. CREATE AUCTION
CREATE POLICY "auth_users_can_create_auction"
ON auctions
FOR INSERT
WITH CHECK (
  owner_id = auth.uid()
);

-- 3. UPDATE DRAFT OR OPEN AUCTIONS - IF NO BID
-- Allow auction owners to update their auctions if they have no bids
-- Current status must be DRAFT or OPEN
-- New status can be DRAFT, OPEN, or CLOSED
-- This prevents updating auctions that already have bids
CREATE POLICY "auth_auction_owner_can_update_draft_open_auctions"
ON auctions
FOR UPDATE
USING (
  owner_id = auth.uid() AND status IN ('DRAFT', 'OPEN')
)
WITH CHECK (
  owner_id = auth.uid() AND status IN ('DRAFT', 'OPEN', 'CLOSED')
  AND NOT EXISTS (
    SELECT 1 FROM bids b WHERE b.auction_id = auctions.id
  )
);

-- 4. DELETE DRAFT, OPEN, OR CLOSED AUCTIONS - ONLY IF NO BID
CREATE POLICY "auth_auction_owner_can_delete_unbidded_auctions"
ON auctions
FOR DELETE
USING (
  owner_id = auth.uid() AND
  status IN ('DRAFT', 'OPEN', 'CLOSED') AND
  NOT EXISTS (
    SELECT 1 FROM bids b WHERE b.auction_id = auctions.id
  )
);
