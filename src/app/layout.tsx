import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

import Navbar from '@/Components/Layout/Navbar';
import Footer from '@/Components/Layout/Footer';
import { Toaster } from 'react-hot-toast';
import { Suspense } from 'react';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'NDITC',
  description: 'Love the light of Technology',
  icons: { icon: 'favicon.ico' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Suspense>
          <Navbar />
        </Suspense>
        <div id="scrollToTop" className="w-0 h-0" />
        {children}
        <Footer />
        <Toaster
          toastOptions={{
            success: {
              style: {
                background: '#dcfce7',
                color: '#16a34a',
              },
            },
            error: {
              style: {
                background: '#fee2e2',
                color: '#dc2626',
              },
            },
          }}
        />
      </body>
    </html>
  );
}
