import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/theme/ThemeProvider";
import clsx from "clsx";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Le Foot",
  description: "Track your football team fixtures and their stats",
  icons: {
    icon: [
      {
        media: "(prefers-color-scheme: light)",
        url: "/lefoot_round-light.png",
        href: "/lefoot_round-light.png",
      },
      {
        media: "(prefers-color-scheme: dark)",
        url: "/lefoot_round-dark.png",
        href: "/lefoot_round-dark.png",
      },
    ],
  },
};

type LayoutProps = {
  children: React.ReactNode;
};

export default async function RootLayout({ children }: LayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning className="h-full">
      <body className={clsx(inter.className, "bg-background h-full")}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
