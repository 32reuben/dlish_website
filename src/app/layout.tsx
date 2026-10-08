import type { Metadata } from "next";
import { Fredoka, Quicksand } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

const fredoka = Fredoka({
  variable: "--font-fredoka",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const quicksand = Quicksand({
  variable: "--font-quicksand",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://dilishnorthampton.com"),
  title: "D'Lish | Fresh flavours. Serious cravings.",
  description: "D'LISH: Street Food • Bubble Tea • Karak • Desserts • Protein Meals in Northampton, UK.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${fredoka.variable} ${quicksand.variable} antialiased`}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('scrollRestoration' in history) {
                history.scrollRestoration = 'manual';
              }
              window.onbeforeunload = function () {
                window.scrollTo(0, 0);
              };
              window.scrollTo(0, 0);
            `,
          }}
        />
      </head>
      <body className="font-sans bg-brand-light text-brand-dark min-h-screen flex flex-col selection:bg-brand-accent selection:text-white">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
