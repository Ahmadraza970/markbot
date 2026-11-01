import type { Metadata, Viewport } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-space-grotesk",
});

export const metadata: Metadata = {
  title: "MarkBot — AI Chatbot by Ahmad Digital Studio",
  description: "MarkBot is a friendly AI chatbot built by Ahmad Raza of Ahmad Digital Studio. Ask anything — answers stream in with clean Markdown and highlighted code.",
  metadataBase: new URL("https://markbot-ahmad.vercel.app"),
  openGraph: {
    title: "MarkBot — AI Chatbot by Ahmad Digital Studio",
    description: "Ask anything — answers stream in with clean Markdown and highlighted code. Free, no sign-up, chats never stored.",
    url: "https://markbot-ahmad.vercel.app",
    siteName: "MarkBot",
    type: "website",
    images: [
      {
        url: "/og-banner.jpg",
        width: 1200,
        height: 630,
        type: "image/jpeg",
        alt: "MarkBot — AI chatbot by Ahmad Raza, Ahmad Digital Studio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MarkBot — AI Chatbot by Ahmad Digital Studio",
    description: "Ask anything — answers stream in with clean Markdown and highlighted code. Free, no sign-up, chats never stored.",
    images: ["/og-banner.jpg"],
  },
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "MarkBot",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover",
  themeColor: "#ffffff",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <head>
        <link rel="apple-touch-icon" href="/icon.svg" />
        <meta name="mobile-web-app-capable" content="yes" />
      </head>
      <body className={spaceGrotesk.variable}>{children}</body>
    </html>
  );
}
