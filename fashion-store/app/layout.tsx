import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/providers";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "LUXE THREAD — Premium Fashion Store",
  description:
    "Where style speaks, trends resonate, fashion flourishes. Discover the latest collections in premium fashion.",
  keywords: "fashion, clothing, premium, luxury, streetwear, trending",
  openGraph: {
    title: "LUXE THREAD — Premium Fashion Store",
    description: "Discover curated premium fashion collections",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className="w-full min-w-full m-0 p-0 overflow-x-hidden">
      <body className="flex flex-col min-h-screen w-full min-w-full m-0 p-0 overflow-x-hidden">
        <Providers>
          <Navbar />
          <main className="flex-1 w-full flex flex-col">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
