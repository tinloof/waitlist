"use client";

import { createClient } from "@/utils/supabase/client";
import Link from "next/link";
import { usePathname } from "next/navigation";

async function DashboardButton() {
  const supabase = createClient();
  const pathname = usePathname();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user || pathname !== "/") {
    return null;
  }

  return <Link href="/dashboard">Dashboard</Link>;
}

export default DashboardButton;
