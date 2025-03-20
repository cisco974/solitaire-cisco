import type { Metadata } from "next";
import { Providers } from "@/lib/providers";
import "./globals.css";

export const metadata: Metadata = {
  title: "SLTR.com - Play Solitaire Online",
  description: "Play Solitaire, Spider Solitaire, and FreeCell online for free with no downloads required.",
  keywords: "solitaire, card games, online games, free solitaire, spider solitaire, freecell",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="overflow-y-auto">
        <Providers>
          <div className="min-h-screen flex flex-col">
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}