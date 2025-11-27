import React from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  weight: ['300', '400', '500', '600', '700', '800'],
});

export const metadata: Metadata = {
  title: 'Lungelo Sibisi | Digital Marketing Specialist',
  description: 'Portfolio of Lungelo Sibisi, a Digital Marketing Specialist specializing in SEO, paid social, and data-driven campaigns.',
  openGraph: {
    title: 'Lungelo Sibisi | Digital Marketing Specialist',
    description: 'Converting Ad spend into revenue. Explore my portfolio of high-impact digital campaigns.',
    type: 'website',
    locale: 'en_ZA',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="!scroll-smooth">
      <head>
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
      </head>
      <body className={`${inter.className} antialiased`} suppressHydrationWarning>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
