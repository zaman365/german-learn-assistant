import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "Deutsch, Schritt für Schritt", template: "%s · German Learn Assistant" },
  description: "Your personal course from the B2–C1 bridge to professional German and DTB C1 preparation.",
  icons: { icon: "/favicon.svg" },
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body>{children}</body></html>;
}
