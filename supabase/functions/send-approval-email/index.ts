import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js";

// The Resend API key is stored in an environment variable from the Supabase dashboard
const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const handler = async (_request: Request): Promise<Response> => {
  const json = await _request.json();

  const record = json.record;

  // If the new value of approved is not true, do nothing
  if (!record?.approved)
    return new Response(
      JSON.stringify({
        message: "User not approved",
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

  try {
    const supabaseClient = createClient(
      // Supabase API URL - env var exported by default.
      Deno.env.get("SUPABASE_URL") ?? "",
      // Supabase API ANON KEY - env var exported by default.
      Deno.env.get("SUPABASE_ANON_KEY") ?? "",
      // Create client with Auth context of the user that called the function.
      // This way your row-level-security (RLS) policies are applied.
      {
        global: {
          headers: { Authorization: _request.headers.get("Authorization")! },
        },
      }
    );

    // Fetch the user's data from the auth.users table
    const { data: userData } = await supabaseClient.auth.admin.getUserById(
      record.user_id
    );

    const email = userData?.user?.email;

    // If the user doesn't have an email, do nothing
    if (!email)
      return new Response(
        JSON.stringify({
          message: "User not found",
        }),
        {
          status: 200,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // The user has an email, and is approved, send the email
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'onboarding@resend.dev',
        to: email,
        subject: "You've been accepted 🎉",
        html: "<strong>You're in!</strong>",
      }),
    });

    const data = await res.json();

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error(error);

    return new Response(JSON.stringify(error), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
};

serve(handler);