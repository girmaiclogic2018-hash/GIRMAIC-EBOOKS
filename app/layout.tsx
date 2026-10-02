import type {Metadata} from 'next';
import './globals.css'; // Global styles
import { FirebaseProvider } from '@/lib/FirebaseContext';

export const metadata: Metadata = {
  title: 'Girmaic AI Global E-Book Studio | Founder: Girma Haile Bunaro',
  description: 'Next-generation AI publishing platform by Girma Haile Bunaro (Girmaic AI Technology & Innovation Center) for digital books, audiobooks, and multilingual commerce on Ye-Buna Digitals.',
  openGraph: {
    title: 'Girmaic AI Global E-Book Studio',
    description: 'Professional publishing platform for digital books & audiobooks by Girma Haile Bunaro.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Girmaic AI Global E-Book Studio',
    description: 'Professional publishing platform for digital books & audiobooks by Girma Haile Bunaro.',
  },
};

import { I18nProvider } from '@/lib/I18nContext';

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <I18nProvider>
          <FirebaseProvider>
            {children}
          </FirebaseProvider>
        </I18nProvider>
      </body>
    </html>
  );
}

