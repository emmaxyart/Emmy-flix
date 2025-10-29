import type { Metadata } from "next";
import { Inter } from 'next/font/google'
import "./globals.css";
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from '@/providers/ThemeProvider';
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: "Emmflix - Stream Movies Online",
  description: "Watch the latest movies and TV shows on Emmflix",
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/icon.svg', type: 'image/svg+xml' }
    ],
    apple: [
      { url: '/icon.svg', type: 'image/svg+xml' }
    ]
  },
  manifest: '/manifest.json',
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#dc2626',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={true}
          disableTransitionOnChange
        >
          <div className="flex-grow">
            {children}
          </div>
          <Footer />
          <Toaster position="bottom-center" />
        </ThemeProvider>
      </body>
    </html>
  );
}



