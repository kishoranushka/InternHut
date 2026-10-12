import type { Metadata } from "next";
import { Manrope, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "InternSetu | Guided Internships with Partner Companies",
    template: "%s | InternSetu",
  },
  description:
    "InternSetu connects college students with partner companies for guided, project-based internships — weekly milestones, mentor feedback and a certificate anyone can verify.",
  keywords: [
    "internship with partner companies",
    "verified internship certificate",
    "project based internship for college students",
    "college internship programme India",
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
