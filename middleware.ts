import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/utils/supabase/middleware";

export async function middleware(req: NextRequest) {
  const { supabase, response } = createClient(req);

  const { data } = await supabase.auth.getSession();

  //If the user is accessing a page other than dashboard, do nothing
  if (req.nextUrl.pathname !== "/dashboard") return response;

  const userLoggedIn = !!data?.session?.user;

  // If user is not logged in, redirect to login page
  if (!userLoggedIn) {
    return NextResponse.redirect(req.nextUrl.origin + "/login");
  }

  // If user is logged in.

  //Fetch the user's waitlist entry
  const { data: waitlistEntry } = await supabase
    .from("waitlist")
    .select("approved")
    .eq("user_id", data.session?.user.id)
    .single();

  // The user is approved, allow access to dashboard
  if (waitlistEntry?.approved) return response;

  // The user is not approved, redirect to waitlist page
  return NextResponse.redirect(req.nextUrl.origin + "/waitlist");
}
