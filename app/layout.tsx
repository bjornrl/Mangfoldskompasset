import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mangfoldskompasset — kommunale tiltak finansiert av Bufdir",
  description:
    "En kuratert samling av kommunale tiltak finansiert gjennom Bufdirs tilskuddsordninger, til inspirasjon for andre kommuner.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="nb" className={inter.variable}>
      <body>{children}</body>
    </html>
  );
}
