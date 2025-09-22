-- PREVENT USERS WITH ACTIVE BIDS FROM DELETING THEIR ACCOUNT
CREATE POLICY "users_with_active_bids_cannot_delete"
ON users
FOR DELETE
USING (
  NOT EXISTS (
    SELECT 1 FROM bids b
    JOIN auctions a ON b.auction_id = a.id
    WHERE b.bidder_id = auth.uid()
      AND a.status = 'OPEN'
  )
);
