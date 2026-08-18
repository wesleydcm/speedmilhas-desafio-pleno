import type { ReactNode } from "react";
import "./globals.css";

export const metadata = {
  title: "Speed Milhas — Desafio Técnico",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
