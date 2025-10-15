create or replace view "public"."users_public" as  SELECT id,
    first_name,
    last_name,
    email,
    avatar_url
   FROM users;



