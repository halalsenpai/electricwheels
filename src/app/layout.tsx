import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Header } from "@/components/Header";
import { CompareProvider } from "@/contexts/CompareContext";
import { FloatingCompareWidget } from "@/components/FloatingCompareWidget";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.electricwheels.pk"),
  title: { default: "Electric Wheels", template: "%s | Electric Wheels" },
  description: "Compare EV bikes in Pakistan. Prices, specs, dealers, guides.",
  other: { 'google-site-verification': 'TODO' },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <CompareProvider>
          <Header />
          <main>
            {children}
          </main>
          <FloatingCompareWidget />
        </CompareProvider>
      </body>
    </html>
  );
}
