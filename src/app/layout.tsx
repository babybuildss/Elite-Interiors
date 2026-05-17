import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Elite Interiors | Luxury Interior Design",
  description: "Where vision meets elegance. Elite Interiors crafts extraordinary living spaces.",
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body style={{margin:0,padding:0,background:'#0a0a0a',overflowX:'hidden'}}>
        {children}
      </body>
    </html>
  );
}
