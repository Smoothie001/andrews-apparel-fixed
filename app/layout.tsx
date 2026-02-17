import type { Metadata } from 'next';
import { Playfair_Display, Cinzel } from 'next/font/google';
import './globals.css';
import { SiteHeader } from '@/components/site/header';
import { SiteFooter } from '@/components/site/footer';
import { Toaster } from '@/components/ui/toaster';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

const cinzel = Cinzel({
  subsets: ['latin'],
  variable: '--font-cinzel',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Andrew's Apparel - Premium African Fashion",
  description:
    'Discover premium African fashion at Andrew\'s Apparel. Shop ready-made Agbada, Ankara, Jalabiya, and vintage outfits, or create custom-sewn masterpieces. Located in Lokoja, Kogi State.',
  keywords: [
    'African fashion',
    'Agbada',
    'Ankara',
    'Jalabiya',
    'custom sewing',
    'Nigerian fashion',
    'traditional attire',
    'fashion school',
    'Lokoja',
    'Kogi State',
  ],
  authors: [{ name: "Andrew's Apparel" }],
  openGraph: {
    title: "Andrew's Apparel - Premium African Fashion",
    description:
      'Premium African fashion, custom sewing services, and fashion education.',
    url: 'https://andrewsapparel.com',
    siteName: "Andrew's Apparel",
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_NG',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Andrew's Apparel - Premium African Fashion",
    description:
      'Premium African fashion, custom sewing services, and fashion education.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${cinzel.variable}`}>
      <body className={`${playfair.variable} ${cinzel.variable} antialiased bg-background text-foreground`}>
        <SiteHeader />
        {children}
        <SiteFooter />
        <Toaster />
      </body>
    </html>
  );
}
