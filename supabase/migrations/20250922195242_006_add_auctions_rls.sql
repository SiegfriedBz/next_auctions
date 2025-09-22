alter table "public"."auctions" enable row level security;

create policy "auth_auction_owner_can_delete_draft_closed_cancelled_auctions"
on "public"."auctions"
as permissive
for delete
to public
using (((owner_id = auth.uid()) AND (status = ANY (ARRAY['DRAFT'::auction_status, 'CLOSED'::auction_status, 'CANCELLED'::auction_status]))));


create policy "auth_auction_owner_can_update_draft_auctions"
on "public"."auctions"
as permissive
for update
to public
using (((owner_id = auth.uid()) AND (status = 'DRAFT'::auction_status)))
with check ((owner_id = auth.uid()));


create policy "auth_users_can_create_auction"
on "public"."auctions"
as permissive
for insert
to public
with check ((owner_id = auth.uid()));


create policy "users_can_select_all_auctions"
on "public"."auctions"
as permissive
for select
to public
using (true);



