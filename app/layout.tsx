import type { Metadata } from "next";
import "./globals.css";
import Script from "next/script";

export const metadata: Metadata = {
  title: "grok magic - the one i actually use every day",
  description: "i got tired of ugly grok interfaces so i built this one. streaming, voice that works, cosmic background because i like it. $29 one time if you want it too.",
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
      <body>
        {children}
        <Script
          async
          src="https://js.stripe.com/v3/buy-button.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
