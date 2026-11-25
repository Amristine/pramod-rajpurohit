import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = { width: "device-width", initialScale: 1, viewportFit: "cover" };

export const metadata: Metadata = {
  title: "Pramod Rajpurohit — Generative AI Artist",
  description: "Generative AI artist and content creator creating AI-generated images and videos.",
  metadataBase: new URL("https://pramodrajpurohit.com"),
  openGraph: {
    title: "Pramod Rajpurohit — Generative AI Artist",
    description: "Pramod Rajpurohit — Generative AI Artist.",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
