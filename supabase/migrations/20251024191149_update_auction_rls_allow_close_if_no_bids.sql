drop policy "auth_auction_owner_can_update_draft_open_auctions" on "public"."auctions";

create policy "auth_auction_owner_can_update_draft_open_auctions"
on "public"."auctions"
as permissive
for update
to public
using (((owner_id = auth.uid()) AND (status = ANY (ARRAY['DRAFT'::auction_status, 'OPEN'::auction_status]))))
with check (((owner_id = auth.uid()) AND (status = ANY (ARRAY['DRAFT'::auction_status, 'OPEN'::auction_status, 'CLOSED'::auction_status])) AND (NOT (EXISTS ( SELECT 1
   FROM bids b
  WHERE (b.auction_id = auctions.id))))));



