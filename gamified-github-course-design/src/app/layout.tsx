import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { GameProvider } from "@/components/GameProvider";
import { PaletteProvider, paletteBootstrapScript } from "@/components/PaletteProvider";
import { Footer, SideRail, TopBar } from "@/components/Nav";
import { branding, course } from "@/lib/course";

export const metadata: Metadata = {
  title: `gitquest · ${branding.school} · GitHub 101 for absolute beginners`,
  description: course.promise,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=VT323&family=IBM+Plex+Mono:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen antialiased">
        <script dangerouslySetInnerHTML={{ __html: paletteBootstrapScript }} />
        <div className="crt-world" aria-hidden />
        <div className="crt-grid" aria-hidden />
        <PaletteProvider>
        <GameProvider>
          <div className="flex min-h-screen">
            <SideRail />
            <div className="flex min-w-0 flex-1 flex-col">
              <TopBar />
              <main className="w-full flex-1 px-3 pb-10 pt-6 sm:px-5 lg:px-8">
                <div className="mx-auto w-full max-w-6xl">{children}</div>
              </main>
              <Footer />
            </div>
          </div>
        </GameProvider>
        </PaletteProvider>
        <div className="crt-sweep" aria-hidden />
        <div className="crt-scan" aria-hidden />
        <div className="crt-vignette" aria-hidden />
      </body>
    </html>
  );
}
