import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = { width: "device-width", initialScale: 1, viewportFit: "cover" };

export const metadata: Metadata = {
  title: "Pramod Rajpurohit — Video Editor & Colorist",
  description: "Video editing and color grading by Pramod Rajpurohit.",
  metadataBase: new URL("https://github.com/Amristine/pramod-rajpurohit"),
  openGraph: {
    title: "Pramod Rajpurohit — Video Editor & Colorist",
    description: "Pramod Rajpurohit — Video Editor & Colorist.",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
