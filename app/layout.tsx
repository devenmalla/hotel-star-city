import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/sonner';

const geist = Geist({ subsets: ['latin'], variable: '--font-geist' });
const geistMono = Geist_Mono({ subsets: ['latin'], variable: '--font-geist-mono' });

export const metadata: Metadata = {
  title: {
    default: 'Hotel Star City - Lodging & Fooding | Dimapur, Nagaland',
    template: '%s | Hotel Star City',
  },
  icons: {
    icon: '/hotel_star_city_logo_v1.png',
    apple: '/hotel_star_city_logo_v1.png',
  },
  description:
    'Hotel Star City offers clean, comfortable and affordable AC and Non-AC rooms in Dimapur, Nagaland. Book directly for best rates. Located on M.P. Road, Murgi Patti.',
  keywords: [
    'Hotel Star City',
    'Hotels in Dimapur',
    'Budget Hotels in Dimapur',
    'Lodging in Dimapur',
    'Hotel Star City Dimapur',
    'Accommodation Nagaland',
    'Cheap Hotels Dimapur',
  ],
  authors: [{ name: 'Hotel Star City' }],
  creator: 'Hotel Star City',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://hotelstarcity.com',
    siteName: 'Hotel Star City',
    title: 'Hotel Star City - Lodging & Fooding | Dimapur, Nagaland',
    description:
      'Comfortable and affordable hotel in Dimapur, Nagaland. AC and Non-AC rooms available. Book now for best rates.',
    images: [
      {
        url: '/hotel_star_city_logo_v1.png',
        width: 800,
        height: 600,
        alt: 'Hotel Star City',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hotel Star City - Lodging & Fooding | Dimapur, Nagaland',
    description: 'Comfortable and affordable hotel in Dimapur, Nagaland.',
    images: ['/hotel_star_city_logo_v1.png'],
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
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${geist.variable} ${geistMono.variable} antialiased`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}