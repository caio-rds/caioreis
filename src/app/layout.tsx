import React from 'react';
import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import Providers from '@/components/Providers';
import { Analytics } from '@vercel/analytics/react';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap',
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
});

// Base metadata for better SEO
export const metadata: Metadata = {
  title: {
    template: '%s | Caio Reis - Backend Developer',
    default: 'Caio Reis - Backend Developer',
  },
  description:
    'Professional portfolio of Caio Reis, specialized in backend development, Node.js, Python and system architecture.',
  keywords: [
    'backend developer',
    'node.js',
    'python',
    'golang',
    'system architecture',
    'Caio Reis',
    'full-stack developer',
  ],
  authors: [{ name: 'Caio Reis', url: 'https://github.com/caio-rds' }],
  creator: 'Caio Reis',
  publisher: 'Caio Reis',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://caioreisdev.com'),
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/en',
      'pt-BR': '/pt',
    },
  },
  openGraph: {
    title: 'Caio Reis - Backend Developer',
    description:
      'Professional portfolio showcasing backend development, Node.js, Python and system architecture expertise.',
    url: 'https://caioreisdev.com',
    siteName: 'Caio Reis Portfolio',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/images/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Caio Reis - Backend Developer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Caio Reis - Backend Developer',
    description:
      'Professional portfolio showcasing backend development expertise',
    images: ['/images/twitter-image.png'],
  },
};

// Viewport configuration
export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#18181b' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const storageTheme = localStorage.getItem('theme');
                  if (storageTheme === 'dark') {
                    document.documentElement.classList.add('dark');
                  } else if (storageTheme === 'light') {
                    document.documentElement.classList.remove('dark');
                  } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="bg-white dark:bg-zinc-900 text-zinc-800 dark:text-zinc-100 transition-colors">
        <Analytics />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
