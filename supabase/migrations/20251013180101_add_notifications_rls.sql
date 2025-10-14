alter table "public"."notifications" enable row level security;

create policy "select_own_notifications"
on "public"."notifications"
as permissive
for select
to public
using ((recipient_id = auth.uid()));


create policy "update_own_notifications"
on "public"."notifications"
as permissive
for update
to public
using ((recipient_id = auth.uid()));



