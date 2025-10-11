-- Enable authenticated users to listen to broadcasts on notifications
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_policies
    WHERE schemaname = 'realtime'
      AND tablename = 'messages'
      AND policyname = 'Allow listening for broadcasts for authenticated users only'
  ) THEN
    CREATE POLICY "Allow listening for broadcasts for authenticated users only"
    ON "realtime"."messages"
    TO authenticated
    USING (extension = 'broadcast'::text);
  END IF;
END$$;
