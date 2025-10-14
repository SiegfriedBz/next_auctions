create or replace view "public"."users_stats" as  SELECT count(*) AS total_users
   FROM users;



