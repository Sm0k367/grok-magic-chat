import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Grok Magic",
  description: "Real Grok-4 Chat",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
