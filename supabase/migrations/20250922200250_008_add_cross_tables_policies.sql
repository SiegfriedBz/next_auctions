create policy "users_with_active_bids_cannot_delete"
on "public"."users"
as permissive
for delete
to public
using ((NOT (EXISTS ( SELECT 1
   FROM (bids b
   JOIN auctions a ON ((b.auction_id = a.id)))
   WHERE ((b.bidder_id = auth.uid()) AND (a.status = 'OPEN'::auction_status))))));



