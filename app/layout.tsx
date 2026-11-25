import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = { width: "device-width", initialScale: 1, viewportFit: "cover" };

export const metadata: Metadata = {
  title: "Pramod Rajpurohit — Generative AI Filmmaker",
  description: "Generative AI Filmmaker specializing in AI commercial ads, UGC, and AI agents.",
  metadataBase: new URL("https://pramodrajpurohit.com"),
  openGraph: {
    title: "Pramod Rajpurohit — Generative AI Filmmaker",
    description: "Pramod Rajpurohit — Generative AI Filmmaker.",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
