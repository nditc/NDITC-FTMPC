import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "@/Components/Layout/Navbar";
import Footer from "@/Components/Layout/Footer";
import { ToastContainer } from "react-toastify";
import { Suspense } from "react";
import NextTopLoader from "nextjs-toploader";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NDITC FTMPC",
  description: "Prove Your Coding Skills",
  icons: { icon: "favicon.ico" },
  openGraph: {
    images: [
      {
        url: "/Images/opengraph-image.png",
        width: 512,
        height: 451,
        alt: "FTMPC Image",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextTopLoader color={"#279367"} />
        <Suspense>
          <Navbar />
          <div id="scrollToTop" className="w-0 h-0" />
          {children}
          <Footer />
          <ToastContainer bodyClassName={"Inter"} position="top-center" />
        </Suspense>
      </body>
    </html>
  );
}
