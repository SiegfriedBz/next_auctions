-- drop_stripe_fdw: safely remove stripe wrapper and handlers if present

DO $$
BEGIN
  -- drop any known function or handler
  IF EXISTS (SELECT 1 FROM pg_proc WHERE proname = 'stripe_fdw_handler') THEN
    DROP FUNCTION IF EXISTS stripe_fdw_handler() CASCADE;
  END IF;

  -- drop stripe schema if exists
  DROP SCHEMA IF EXISTS stripe CASCADE;

  -- drop wrappers extension if exists (adjust name if different)
  DROP EXTENSION IF EXISTS wrappers CASCADE;

  -- remove any foreign data wrapper objects (generic cleanup)
  DROP SCHEMA IF EXISTS fdw_schema CASCADE;
EXCEPTION WHEN OTHERS THEN
  RAISE NOTICE 'ignored error while dropping stripe fdw objects: %', SQLERRM;
END$$;
