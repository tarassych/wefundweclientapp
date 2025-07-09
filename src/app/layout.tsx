import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";
import ThemeRegistry from "@/components/ThemeRegistry";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "WeFundWe Client App",
  description: "A Next.js application with Google authentication and protected dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <ThemeRegistry>
            {children}
          </ThemeRegistry>
        </Providers>
      </body>
    </html>
  );
}
