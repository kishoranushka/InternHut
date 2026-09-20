import type { Metadata } from "next";
import { Manrope, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "InternCert | Verified Internship Certificates for UG & PG Students",
    template: "%s | InternCert",
  },
  description:
    "Real, project based internships for BBA, B.Com, BCA, BSc, MBA and other UG and PG students. Complete mentor reviewed work and get a certificate anyone can verify online.",
  keywords: [
    "online internship for college students",
    "verified internship certificate",
    "internship for BBA BCom BCA BSc students",
    "internship with certificate India",
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
