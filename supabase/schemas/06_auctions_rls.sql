
-- ENABLE RLS
ALTER TABLE auctions ENABLE ROW LEVEL SECURITY;

-- USERS RLS POLICIES
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

-- 3. UPDATE DRAFT AUCTIONS
CREATE POLICY "auth_auction_owner_can_update_draft_auctions"
ON auctions
FOR UPDATE
USING (
  owner_id = auth.uid() AND status = 'DRAFT'
)
WITH CHECK (
  owner_id = auth.uid()
);

-- 4. DELETE DRAFT, CLOSED, CANCELLED
CREATE POLICY "auth_auction_owner_can_delete_draft_closed_cancelled_auctions"
ON auctions
FOR DELETE
USING (
  owner_id = auth.uid() AND status IN ('DRAFT', 'CLOSED', 'CANCELLED')
);
