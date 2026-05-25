import type { Metadata } from "next";
import { Playfair_Display, Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Elite Interiors | Luxury Interior Design Studio",
  description:
    "Where vision meets elegance. Elite Interiors crafts extraordinary living spaces that redefine luxury. Award-winning interior design studio creating timeless masterpieces.",
  keywords: [
    "luxury interior design",
    "elite interiors",
    "premium design studio",
    "architectural design",
    "home decor",
  ],
  icons: {
    icon: "/images/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${playfair.variable} ${cormorant.variable} ${inter.variable} antialiased bg-[#0a0a0a] text-foreground overflow-x-hidden`}
      >
        {children}
      </body>
    </html>
  );
}
