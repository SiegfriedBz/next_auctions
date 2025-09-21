create type user_role as enum ('ADMIN', 'USER');

create table users (
  id uuid not null references auth.users(id) on delete cascade,
  first_name text not null,
  last_name text not null,
  email text not null unique,
  avatar_url text,
  role user_role not null default 'USER'
);