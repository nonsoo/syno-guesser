import "../styles/layout.css";
import { Nunito } from "next/font/google";
import Script from "next/script";
import type { Metadata } from "next";

import {
  METADATA_TITLE,
  METADATA_DESCRIPTION,
  METADATA_SOCIAL_IMG_URL,
} from "../utils/constants/consts";

const nunito = Nunito({ subsets: ["latin"] });

export const meta: Metadata = {
  title: METADATA_TITLE,
  description: METADATA_DESCRIPTION,
  openGraph: {
    title: METADATA_TITLE,
    description: METADATA_DESCRIPTION,
    images: METADATA_SOCIAL_IMG_URL,
  },
  twitter: {
    title: METADATA_TITLE,
    description: METADATA_DESCRIPTION,
    images: METADATA_SOCIAL_IMG_URL,
  },

  manifest: "/manifest.json",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "hsl(270, 17%, 98%)" },
    { media: "(prefers-color-scheme: dark)", color: "hsl(0, 0%, 8%)" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href={`https://fonts.googleapis.com/css2?family=Open+Sans:wght@500;700&family=Barlow:ital,wght@0,400;0,700;1,500&display=swap`}
          rel="stylesheet"
        />

        <link
          rel="shortcut icon"
          href="/favicon/favicon.ico"
          type="image/x-icon"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="favicon/favicon-16x16.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="favicon/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="192x192"
          href="favicon/android-chrome-192x192.png"
        />
        <link rel="apple-touch-icon" href="favicon/apple-touch-icon.png" />
      </head>
      <body className={`layoutDiv ${nunito.className}`}>
        {children}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_MEASUREMENT_ID}`}
          strategy="lazyOnload"
        />
        <Script id="google-analytics" strategy="lazyOnload">
          {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_MEASUREMENT_ID}');
        `}
        </Script>
      </body>
    </html>
  );
}
