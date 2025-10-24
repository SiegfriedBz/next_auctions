// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

// Setup type definitions for built-in Supabase Runtime APIs
import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";

Deno.serve(async (_req) => {
  try {
    // Service Role Key - required to bypass RLS
    const SUPABASE_URL = Deno.env.get("SUPABASE_URL") ?? "";
    const SUPABASE_SERVICE_ROLE_KEY =
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    // Find all non-closed auctions that have ended
    const { data: auctions, error } = await supabase
      .from("auctions")
      .select("id")
      .neq("status", "CLOSED")
      .lt("end_at", new Date().toISOString())
      .not("end_at", "is", null);

    if (error) throw error;
    if (!auctions || auctions.length === 0) {
      return new Response("No auctions to close.", { status: 200 });
    }

    const ids = auctions.map((a) => a.id);

    // Close the auctions
    const { error: updateError } = await supabase
      .from("auctions")
      .update({ status: "CLOSED", updated_at: new Date().toISOString() })
      .in("id", ids);

    if (updateError) throw updateError;

    console.log(`Closed auctions with IDs: ${ids.join(" - ")}`);

    return new Response(`Closed ${ids.length} auctions.`, { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ message: err?.message ?? err }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
});

/* To invoke locally:

  1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
  2. Make an HTTP request:

  curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/close-auctions' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
    --header 'Content-Type: application/json' \
    --data '{"name":"Functions"}'

*/
