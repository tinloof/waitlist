import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import AuthButton from "@/components/AuthButton";
import Navbar from "@/components/Navbar";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Tinloof - wailist demo",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={fontSans.variable}>
      <body className="bg-background text-foreground">
        <div className="min-h-screen flex-1 w-full flex flex-col gap-20 items-center">
          <Navbar authButton={<AuthButton />} />

          <main className="flex-1 flex gap-5 items-center">{children}</main>

          <footer className="w-full border-t border-t-foreground/10 p-8 flex justify-center text-center text-xs">
            <p>
              Created by{" "}
              <a
                href="https://tinloof.com"
                target="_blank"
                className="font-bold hover:underline"
                rel="noreferrer"
              >
                Tinloof
              </a>
            </p>
          </footer>
        </div>
      </body>
    </html>
  );
}
