import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import 'react-toastify/dist/ReactToastify.css';

import Navbar from '@/Components/Layout/Navbar';
import Footer from '@/Components/Layout/Footer';
import { ToastContainer } from 'react-toastify';
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
        <ToastContainer bodyClassName={'Inter'} position="top-center" />
      </body>
    </html>
  );
}
