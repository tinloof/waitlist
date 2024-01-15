"use client";

import { usePathname } from "next/navigation";
import DashboardButton from "./DashboardButton";

function Navbar({ authButton }: { authButton: React.ReactNode }) {
  const pathname = usePathname();

  if (pathname === "/login") {
    return null;
  }

  return (
    <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
      <div className="w-full max-w-4xl flex flex-row-reverse gap-5 items-center p-3 text-sm">
        <DashboardButton />
        {authButton}
      </div>
    </nav>
  );
}

export default Navbar;
