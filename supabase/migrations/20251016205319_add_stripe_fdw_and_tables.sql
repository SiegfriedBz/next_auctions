-- https://supabase.com/docs/guides/database/extensions/wrappers/stripe

-- Enable the wrappers extension
create extension if not exists wrappers with schema extensions;

-- Create Stripe FDW (foreign data wrapper)
create foreign data wrapper stripe_wrapper
  handler stripe_fdw_handler
  validator stripe_fdw_validator;

-- Store Stripe API key in Vault (done in Dashboard)
-- select vault.create_secret(
--   '<Stripe API key>',
--   'stripe',
--   'Stripe API key for Wrappers'
-- );

-- Create a foreign server
create server stripe_server
  foreign data wrapper stripe_wrapper
  options (
    --api_key_id '<key_ID>', -- The Key ID from above, required if api_key_name is not specified.
    api_key_name 'STRIPE_SECRET_KEY', -- The Key Name from above, required if api_key_id is not specified.
    api_url 'https://api.stripe.com/v1/',  -- Stripe API base URL, optional. Default is 'https://api.stripe.com/v1/'
    api_version '2024-06-20'  -- Stripe API version, optional. Default is your Stripe account’s default API version.
  );

-- Create stripe schema
CREATE SCHEMA IF NOT EXISTS stripe;

-- Create Stripe tables
-- Customers
CREATE FOREIGN TABLE stripe.customers (
  id TEXT,
  email TEXT,
  name TEXT,
  description TEXT,
  created TIMESTAMP,
  attrs JSONB
)
  SERVER stripe_server
  OPTIONS (object 'customers', rowid_column 'id');

-- Checkout sessions
CREATE FOREIGN TABLE stripe.checkout_sessions (
  id TEXT,
  customer TEXT,
  payment_intent TEXT,
  subscription TEXT,
  attrs JSONB
)
  SERVER stripe_server
  OPTIONS (object 'checkout/sessions', rowid_column 'id');
