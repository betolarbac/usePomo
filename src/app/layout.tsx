import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: "usePomo | Técnica Pomodoro com Sistema de Níveis e Tarefas",
  description: "Aumente sua produtividade com usePomo - aplicativo de Pomodoro que combina gerenciamento de tarefas, sistema de níveis e acompanhamento de progresso para manter você motivado e focado.",
  keywords: ["pomodoro", "produtividade", "gerenciamento de tarefas", "técnica pomodoro", "foco", "sistema de níveis", "gamificação"],
  authors: [{ name: "usePomo" }],
  creator: "Roberto Cabral",
  publisher: "Roberto Cabral",
  applicationName: "usePomo",
  generator: "Next.js",
  referrer: "origin-when-cross-origin",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://usepomo.vercel.app"),
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-video-preview': -1,
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "/",
    title: "usePomo | Técnica Pomodoro com Sistema de Níveis e Tarefas",
    description: "Aumente sua produtividade com usePomo - aplicativo de Pomodoro que combina gerenciamento de tarefas, sistema de níveis e acompanhamento de progresso.",
    siteName: "usePomo",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "usePomo - Aplicativo de Pomodoro com Sistema de Níveis",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "usePomo | Técnica Pomodoro com Sistema de Níveis e Tarefas",
    description: "Aumente sua produtividade com usePomo - aplicativo de Pomodoro que combina gerenciamento de tarefas, sistema de níveis e acompanhamento de progresso.",
    images: ["/og-image.jpg"],
    creator: "@usepomo",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
  verification: {
    google: "google-site-verification-code",
  },
  category: "productivity",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} antialiased bg-zinc-900`}
      >
        {children}
      </body>
    </html>
  );
}
