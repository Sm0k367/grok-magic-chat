import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Epic Tech AI • Aether",
  description: "The ultimate cosmic interface to Aether — Epic Tech AI's flagship visionary intelligence. Real-time streaming, voice interaction, and groundbreaking insights. Built for those shaping the future of technology.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-black">
        {children}
      </body>
    </html>
  );
}
