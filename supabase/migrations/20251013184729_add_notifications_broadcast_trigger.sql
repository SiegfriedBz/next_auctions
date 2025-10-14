-- Function to broadcast notification changes for realtime
CREATE OR REPLACE FUNCTION public.broadcast_notifications_changes()
RETURNS TRIGGER AS $$
BEGIN
  PERFORM realtime.broadcast_changes(
    'user:' || NEW.recipient_id || ':notifications',
    TG_OP,
    TG_OP,
    TG_TABLE_NAME,
    TG_TABLE_SCHEMA,
    NEW,
    OLD
  );
  RETURN NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Drop existing trigger if any
DROP TRIGGER IF EXISTS notifications_broadcast_trigger ON public.notifications;

-- Create trigger on notifications table
CREATE TRIGGER notifications_broadcast_trigger
AFTER INSERT OR UPDATE OR DELETE ON public.notifications
FOR EACH ROW EXECUTE FUNCTION public.broadcast_notifications_changes();
