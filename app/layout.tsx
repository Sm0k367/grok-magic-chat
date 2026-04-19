import type { Metadata } from "next";
import "./globals.css";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Grok Magic - Pay Once, Chat Forever",
  description: "Unlimited Grok-4 cosmic chat. Powered by xAI. Secured by Stripe.",
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
