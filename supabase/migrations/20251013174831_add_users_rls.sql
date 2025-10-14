alter table "public"."users" enable row level security;

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.enforce_user_role_update()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
DECLARE
  caller_is_admin boolean;
BEGIN
  -- only check if role is changing
  IF NEW.role <> OLD.role THEN
    -- check if the user performing the update is admin
    SELECT is_admin(auth.uid()) INTO caller_is_admin;
    IF NOT caller_is_admin THEN
      RAISE EXCEPTION 'Only admin can change user roles';
    END IF;
  END IF;

  RETURN NEW;
END;
$function$
;

create policy "admins_can_delete_any_account"
on "public"."users"
as permissive
for delete
to public
using (is_admin(auth.uid()));


create policy "admins_can_update_any_account"
on "public"."users"
as permissive
for update
to public
using (is_admin(auth.uid()));


create policy "admins_can_view_all_accounts"
on "public"."users"
as permissive
for select
to public
using (is_admin(auth.uid()));


create policy "users_can_create_account"
on "public"."users"
as permissive
for insert
to public
with check ((id = auth.uid()));


create policy "users_can_delete_own_account"
on "public"."users"
as permissive
for delete
to public
using ((id = auth.uid()));


create policy "users_can_update_own_account"
on "public"."users"
as permissive
for update
to public
using ((id = auth.uid()))
with check ((id = auth.uid()));


create policy "users_can_view_own_account"
on "public"."users"
as permissive
for select
to public
using ((id = auth.uid()));


CREATE TRIGGER trigger_enforce_user_role_update BEFORE UPDATE ON public.users FOR EACH ROW EXECUTE FUNCTION enforce_user_role_update();


