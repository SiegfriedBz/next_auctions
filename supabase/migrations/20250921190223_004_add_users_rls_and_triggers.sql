alter table "public"."users" enable row level security;

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.enforce_user_role_update()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
BEGIN
  IF NEW.role <> OLD.role AND OLD.role <> 'ADMIN' THEN
    RAISE EXCEPTION 'Cannot change role';
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
using ((EXISTS ( SELECT 1
   FROM users u
  WHERE ((u.role = 'ADMIN'::user_role) AND (u.id = auth.uid())))));


create policy "admins_can_update_any_account"
on "public"."users"
as permissive
for update
to public
using ((EXISTS ( SELECT 1
   FROM users u
  WHERE ((u.role = 'ADMIN'::user_role) AND (u.id = auth.uid())))));


create policy "admins_can_view_all_accounts"
on "public"."users"
as permissive
for select
to public
using ((EXISTS ( SELECT 1
   FROM users u
  WHERE ((u.role = 'ADMIN'::user_role) AND (u.id = auth.uid())))));


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


