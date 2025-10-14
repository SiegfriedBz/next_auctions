drop trigger if exists "notifications_broadcast_trigger" on "public"."notifications";

drop policy "auth_auction_owner_can_delete_draft_closed_auctions" on "public"."auctions";

drop policy "auth_auction_owner_can_update_draft_open_auctions" on "public"."auctions";

drop function if exists "public"."broadcast_notifications_changes"();

create policy "auth_auction_owner_can_delete_unbidded_auctions"
on "public"."auctions"
as permissive
for delete
to public
using (((owner_id = auth.uid()) AND (status = ANY (ARRAY['DRAFT'::auction_status, 'OPEN'::auction_status, 'CLOSED'::auction_status])) AND (NOT (EXISTS ( SELECT 1
   FROM bids b
  WHERE (b.auction_id = auctions.id))))));


create policy "auth_auction_owner_can_update_draft_open_auctions"
on "public"."auctions"
as permissive
for update
to public
using (((owner_id = auth.uid()) AND (status = ANY (ARRAY['DRAFT'::auction_status, 'OPEN'::auction_status]))))
with check (((owner_id = auth.uid()) AND (status = ANY (ARRAY['DRAFT'::auction_status, 'OPEN'::auction_status])) AND (NOT (EXISTS ( SELECT 1
   FROM bids b
  WHERE (b.auction_id = auctions.id))))));



