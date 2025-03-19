import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SLTR.com - Play Solitaire Online",
  description:
    "Play Solitaire, Spider Solitaire, and FreeCell online for free with no downloads required.",
  keywords:
    "solitaire, card games, online games, free solitaire, spider solitaire, freecell",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
